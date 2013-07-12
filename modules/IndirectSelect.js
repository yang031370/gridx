define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/event",
	"dojo/_base/query",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/_base/Deferred",
	"dojo/keys",
	"../core/_Module",
	"../core/util",
	"dojo/i18n",
	"dojo/i18n!../nls/Body",
	"./RowHeader"
], function(declare, array, event, query, lang, domClass, Deferred, keys, _Module, util, i18n){

	return declare(/*===== "gridx.modules.IndirectSelect", =====*/_Module, {
		// summary:
		//		This module shows a checkbox(or radiobutton) on the row header when row selection is used.
		// description:
		//		This module relies on an implementation of the RowHeader module, and an implementation of
		//		the SelectRow module.
		//		This module will check whether the SelectRow module provides the functionality of "select rows by index" 
		//		(which means the "selectByIndex" method exists). If so, a "select all" checkbox can be provided 
		//		in the header node of the row header column.
		//		This module will also check whether the SelectRow module is configured to "single selection" mode
		//		(which means the "multiple" attribute is set to false). If so, radio button instead of checkbox
		//		will be used in row headers.

		name: 'indirectSelect',

		required: ['rowHeader', 'selectRow'],

		preload: function(){
			// tags:
			//		protected extension
			var t = this,
				g = t.grid,
				focus = g.focus,
				sr = g.select.row,
				rowHeader = g.rowHeader;
			t._nls = i18n.getLocalization('gridx', 'Body', g.lang);
			rowHeader.cellProvider = lang.hitch(t, t._createSelector);
			t.batchConnect(
				[sr,'onHighlightChange', '_onHighlightChange' ],
				[sr,'clear', '_onClear' ],
				[sr, 'onSelectionChange', '_onSelectionChange'],
				[g, 'onRowMouseOver', '_onMouseOver'],
				[g, 'onRowMouseOut', '_onMouseOut'],
				[g, 'onRowKeyDown', '_onKeyDown'],
				[g, 'onHeaderKeyDown', '_onKeyDown'],
				g.filter && [g.filter, 'onFilter', '_onSelectionChange'],
				focus && [focus, 'onFocusArea', function(name){
					if(name == 'rowHeader'){
						t._onMouseOver();
					}
				}],
				focus && [focus, 'onBlurArea', function(name){
					if(name == 'rowHeader'){
						t._onMouseOut();
					}
				}]);
			if(sr.selectByIndex && t.arg('all')){
				t._allSelected = {};
				rowHeader.headerProvider = lang.hitch(t, t._createSelectAllBox);
				rowHeader.loaded.then(function(){
					if(focus){
						t._initFocus();
					}
					t.connect(g, 'onRowHeaderHeaderMouseDown', '_onSelectAll');
					t.connect(g, 'onRowHeaderHeaderKeyDown', function(evt){
						if(evt.keyCode == keys.SPACE){
							event.stop(evt);
							t._onSelectAll();
						}
					});
				});
			}
		},

		// all: Boolean
		//		Whether the "select all" checkbox is allowed to appear.
		all: true,

		//Private----------------------------------------------------------
		_createSelector: function(row){
			var rowNode = row.node(),
				selected = rowNode && domClass.contains(rowNode, 'gridxRowSelected'),
				partial = rowNode && domClass.contains(rowNode, 'gridxRowPartialSelected');
			return this._createCheckBox(selected, partial);
		},

		_createCheckBox: function(selected, partial){
			var dijitClass = this._getDijitClass();
			return ['<span role="', this._isSingle() ? 'radio' : 'checkbox',
				'" class="gridxIndirectSelectionCheckBox dijitReset dijitInline ',
				dijitClass, ' ',
				selected ? dijitClass + 'Checked' : '',
				partial ? dijitClass + 'Partial' : '',
				'" aria-checked="', selected ? 'true' : partial ? 'mixed' : 'false',
				'"><span class="gridxIndirectSelectionCheckBoxInner">',
				selected ? '&#10003;' : partial ? '&#9646;' : '&#9744;',
				'</span></span>'
			].join('');
		},

		_createSelectAllBox: function(){
			var allSelected = this._allSelected[this._getPageId()];
			this.grid.rowHeader.headerCellNode.setAttribute('aria-label', allSelected ? this._nls.indirectDeselectAll : this._nls.indirectSelectAll);
			return this._createCheckBox(allSelected);
		},

		_getPageId: function(){
			return this.grid.body.rootStart + ',' + this.grid.body.rootCount;
		},

		_onClear: function(reservedRowId){
			var cls = this._getDijitClass() + 'Checked',
				g = this.grid;
			query('.' + cls, g.rowHeader.bodyNode).removeClass(cls);
			if(g.select.row.isSelected(reservedRowId)){
				query('[rowid="' + g._escapeId(reservedRowId) + '"].gridxRowHeaderRow .gridxIndirectSelectionCheckBox', g.rowHeader.bodyNode).addClass(cls);
			}
			query('.' + cls, g.rowHeader.headerCellNode).removeClass(cls).attr('aria-checked', 'false');
			this._allSelected = {};
		},

		_onHighlightChange: function(target, toHighlight){
			var node = query('[visualindex="' + target.row + '"].gridxRowHeaderRow .gridxIndirectSelectionCheckBox', this.grid.rowHeader.bodyNode)[0];
			if(node){
				var dijitClass = this._getDijitClass(),
					partial = toHighlight == 'mixed',
					selected = toHighlight && !partial;
				domClass.toggle(node, dijitClass + 'Checked', selected);
				domClass.toggle(node, dijitClass + 'Partial', partial);
				node.setAttribute('aria-checked', selected ? 'true' : partial ? 'mixed' : 'false');
				node.firstChild.innerHTML = selected ? '&#10003;' : partial ? '&#9646;' : '&#9744;';
			}
		},

		_onMouseOver: function(){
			var sr = this.grid.select.row;
			if(!sr.holdingCtrl){
				this._holdingCtrl = false;
				sr.holdingCtrl = true;
			}
		},

		_onMouseOut: function(){
			if(this.hasOwnProperty('_holdingCtrl')){
				this.grid.select.row.holdingCtrl = false;
				delete this._holdingCtrl;
			}
		},

		_getDijitClass: function(){
			return this._isSingle() ? 'dijitRadio' : 'dijitCheckBox';
		},

		_isSingle: function(){
			var select = this.grid.select.row;
			return select.hasOwnProperty('multiple') && !select.arg('multiple');
		},

		_onSelectAll: function(){
			var t = this,
				g = t.grid,
				body = g.body;
			g.select.row[t._allSelected[t._getPageId()] ? 
				'deselectByIndex' :
				'selectByIndex'
			]([0, body.visualCount - 1]);
		},

		_onSelectionChange: function(selected){
			var t = this, d,
				allSelected,
				body = t.grid.body,
				model = t.model,
				start = body.rootStart,
				count = body.rootCount;
			var selectedRoot = array.filter(selected || t.grid.select.row.getSelected(), function(id){
				return !model.treePath(id).pop();
			});
			if(count === model.size()){
				allSelected = count && count == selectedRoot.length;
			}else{
				d = new Deferred();
				model.when({
					start: start,
					count: count
				}, function(){
					var indexes = array.filter(array.map(selectedRoot, function(id){
						return model.idToIndex(id);
					}), function(index){
						return index >= start && index < start + count;
					});
					allSelected = count == indexes.length;
					d.callback();
				});
			}
			if(t.arg('all')){
				Deferred.when(d, function(){
					t._allSelected[t._getPageId()] = allSelected;
					var node = t.grid.rowHeader.headerCellNode.firstChild;
					if(node){
						domClass.toggle(node, t._getDijitClass() + 'Checked', allSelected);
						node.setAttribute('aria-checked', allSelected ? 'true' : 'false');
						t.grid.rowHeader.headerCellNode.setAttribute('aria-label',
							allSelected ? t._nls.indirectDeselectAll : t._nls.indirectSelectAll);
					}
				});
			}
		},

		//Focus------------------------------------------------------
		_initFocus: function(){
			var g = this.grid,
				rowHeader = g.rowHeader,
				headerCellNode = rowHeader.headerCellNode,
				focus = function(evt){
					g.focus.stopEvent(evt);
					domClass.add(headerCellNode, 'gridxHeaderCellFocus');
					headerCellNode.focus();
					return true;
				},
				blur = function(){
					domClass.remove(headerCellNode, 'gridxHeaderCellFocus');
					return true;
				};
			g.focus.registerArea({
				name: 'selectAll',
				priority: -0.1,
				focusNode: rowHeader.headerNode,
				doFocus: focus,
				doBlur: blur,
				onFocus: focus,
				onBlur: blur
			});
		},
		_onKeyDown: function(evt){
			if(evt.keyCode == 65 && evt.ctrlKey && !evt.shiftKey){
				if(!this._allSelected[this._getPageId()]){
					this._onSelectAll();
				}
				event.stop(evt);
			}
		}		
	});
});
