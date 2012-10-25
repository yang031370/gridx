//>>built
define("dojox/gantt/GanttTaskControl","dijit/focus,dojo/_base/declare,dojo/_base/array,dojo/_base/lang,dojo/date/locale,dojo/request,dojo/on,dojo/dom,dojo/dom-class,dojo/dom-construct,dojo/dom-style,dojo/dom-attr,dojo/dom-geometry,dojo/keys,dojo/domReady!".split(","),function(q,r,l,g,t,u,i,v,j,h,f,p,s,m){return r("dojox.gantt.GanttTaskControl",[],{constructor:function(a,b,c){this.ganttChart=c;this.project=b;this.taskItem=a;this.moveChild=this.checkResize=this.checkMove=!1;this.minWidthResize=this.maxWidthResize=
this.minPosXMove=this.maxPosXMove=-1;this.taskItemWidth=this.mouseX=this.posY=this.posX=0;this.isHide=!1;this.hideTasksHeight=0;this.isExpanded=!0;this.predTask=this.parentTask=this.cTaskNameItem=this.cTaskItem=this.descrTask=null;this.childTask=[];this.childPredTask=[];this.previousParentTask=this.nextParentTask=this.previousChildTask=this.nextChildTask=null},createConnectingLinesPN:function(){var a=[],b=h.create("div",{innerHTML:"&nbsp;",className:"ganttTaskLineVerticalLeft"},this.ganttChart.panelNames.firstChild),
c=this.cTaskNameItem[0],d=this.parentTask.cTaskNameItem[0];f.set(b,{height:c.offsetTop-d.offsetTop+"px",top:d.offsetTop+5+"px",left:d.offsetLeft-9+"px"});var e=h.create("div",{noShade:!0,color:"#000000",className:"ganttTaskLineHorizontalLeft"},this.ganttChart.panelNames.firstChild);f.set(e,{left:d.offsetLeft-9+"px",top:c.offsetTop+5+"px",height:"1px",width:c.offsetLeft-d.offsetLeft+4+"px"});a.push(b);a.push(e);return a},createConnectingLinesDS:function(){var a=this.ganttChart.contentData.firstChild,
b=[],c=h.create("div",{className:"ganttImageArrow"}),d=document.createElement("div"),e=document.createElement("div"),k=f.set(this.predTask.cTaskItem[0],"left"),n=f.set(this.predTask.cTaskItem[0],"top"),o=f.set(this.cTaskItem[0],"left"),g=this.posY+2,i=parseInt(this.predTask.cTaskItem[0].firstChild.firstChild.width);n<g?(j.add(d,"ganttTaskLineVerticalRight"),f.set(d,{height:g-this.ganttChart.heightTaskItem/2-n-3+"px",width:"1px",left:k+i-20+"px",top:n+this.ganttChart.heightTaskItem+"px"}),j.add(e,
"ganttTaskLineHorizontal"),f.set(e,{width:15+(o-(i+k))+"px",left:k+i-20+"px",top:g+2+"px"}),j.add(c,"ganttTaskArrowImg")):(j.add(d,"ganttTaskLineVerticalRightPlus"),f.set(d,{height:n+2-g+"px",width:"1px",left:k+i-20+"px",top:g+2+"px"}),j.add(e,"ganttTaskLineHorizontalPlus"),f.set(e,{width:15+(o-(i+k))+"px",left:k+i-20+"px",top:g+2+"px"}),j.add(c,"ganttTaskArrowImgPlus"));f.set(c,{left:o-7+"px",top:g-1+"px"});a.appendChild(d);a.appendChild(e);a.appendChild(c);b.push(d);b.push(c);b.push(e);return b},
showChildTasks:function(a,b){if(b)for(var c=0;c<a.childTask.length;c++){var d=a.childTask[c],e=d.cTaskItem[0],k=d.cTaskNameItem[0],f=d.cTaskItem[1],g=d.cTaskNameItem[1],h=d.cTaskNameItem[2];if("none"==e.style.display){e.style.display="inline";k.style.display="inline";d.showDescTask();a.isHide=!1;if(h)h.style.display="inline",b=d.isExpanded;for(e=0;e<f.length;e++)f[e].style.display="inline";for(e=0;e<g.length;e++)g[e].style.display="inline";d.taskIdentifier&&(d.taskIdentifier.style.display="inline");
this.hideTasksHeight+=this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;0<d.childTask.length&&this.showChildTasks(d,b)}}},hideChildTasks:function(a){for(var b=0;b<a.childTask.length;b++){var c=a.childTask[b],d=c.cTaskItem[0],e=c.cTaskNameItem[0],k=c.cTaskItem[1],f=c.cTaskNameItem[1],g=c.cTaskNameItem[2];if("none"!=d.style.display){d.style.display="none";e.style.display="none";c.hideDescTask();a.isHide=!0;if(g)g.style.display="none";for(d=0;d<k.length;d++)k[d].style.display="none";
for(d=0;d<f.length;d++)f[d].style.display="none";c.taskIdentifier&&(c.taskIdentifier.style.display="none");this.hideTasksHeight+=this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;0<c.childTask.length&&this.hideChildTasks(c)}}},shiftCurrentTasks:function(a,b){this.shiftNextTask(this,b);a.project.shiftNextProject(a.project,b)},shiftTask:function(a,b){a.posY+=b;var c=a.cTaskItem[0],d=a.cTaskNameItem[0],e=a.cTaskItem[1],k=a.cTaskNameItem[1],f=a.cTaskNameItem[2];d.style.top=parseInt(d.style.top)+
b+"px";if(f)f.style.top=parseInt(f.style.top)+b+"px";if(a.parentTask)parseInt(this.cTaskNameItem[0].style.top)>parseInt(a.parentTask.cTaskNameItem[0].style.top)&&"none"!=k[0].style.display?k[0].style.height=parseInt(k[0].style.height)+b+"px":k[0].style.top=parseInt(k[0].style.top)+b+"px",k[1].style.top=parseInt(k[1].style.top)+b+"px";c.style.top=parseInt(c.style.top)+b+"px";a.descrTask.style.top=parseInt(a.descrTask.style.top)+b+"px";if(a.predTask)(parseInt(this.cTaskItem[0].style.top)>parseInt(a.predTask.cTaskItem[0].style.top)||
this.cTaskItem[0].id==a.predTask.taskItem.id)&&"none"!=e[0].style.display?e[0].style.height=parseInt(e[0].style.height)+b+"px":e[0].style.top=parseInt(e[0].style.top)+b+"px",e[1].style.top=parseInt(e[1].style.top)+b+"px",e[2].style.top=parseInt(e[2].style.top)+b+"px"},shiftNextTask:function(a,b){a.nextChildTask?(this.shiftTask(a.nextChildTask,b),this.shiftChildTask(a.nextChildTask,b),this.shiftNextTask(a.nextChildTask,b)):a.parentTask?this.shiftNextTask(a.parentTask,b):a.nextParentTask&&(this.shiftTask(a.nextParentTask,
b),this.shiftChildTask(a.nextParentTask,b),this.shiftNextTask(a.nextParentTask,b))},shiftChildTask:function(a,b){l.forEach(a.childTask,function(a){this.shiftTask(a,b);0<a.childTask.length&&this.shiftChildTask(a,b)},this)},endMove:function(){var a=this.cTaskItem[0],b=f.set(a,"left")-this.posX,b=this.getDateOnPosition(f.set(a,"left")),b=this.checkPos(b);this.checkMove&&(b=this.ganttChart.getPosOnDate(b)-this.posX,this.moveCurrentTaskItem(b,this.moveChild),this.project.shiftProjectItem());this.checkMove=
!1;this.posX=0;this.minPosXMove=this.maxPosXMove=-1;a.childNodes[1].firstChild.rows[0].cells[0].innerHTML="";this.adjustPanelTime();this.ganttChart.resource&&this.ganttChart.resource.refresh()},checkPos:function(a){var b=this.cTaskItem[0],c=a.getHours();12<=c?(a.setDate(a.getDate()+1),a.setHours(0),parseInt(b.firstChild.firstChild.width)+this.ganttChart.getPosOnDate(a)>this.maxPosXMove&&-1!=this.maxPosXMove&&(a.setDate(a.getDate()-1),a.setHours(0))):12>c&&0!=c&&(a.setHours(0),this.ganttChart.getPosOnDate(a)<
this.minPosXMove&&a.setDate(a.getDate()+1));b.style.left=this.ganttChart.getPosOnDate(a)+"px";return a},getMaxPosPredChildTaskItem:function(){for(var a=0,b=0,c=0;c<this.childPredTask.length;c++)b=this.getMaxPosPredChildTaskItemInTree(this.childPredTask[c]),b>a&&(a=b);return a},getMaxPosPredChildTaskItemInTree:function(a){var b=a.cTaskItem[0],b=parseInt(b.firstChild.firstChild.width)+f.set(b,"left"),c=0,d=0;l.forEach(a.childPredTask,function(a){d=this.getMaxPosPredChildTaskItemInTree(a);d>c&&(c=d)},
this);return c>b?c:b},moveCurrentTaskItem:function(a,b){var c=this.cTaskItem[0];this.taskItem.startTime=new Date(this.ganttChart.startDate);this.taskItem.startTime.setHours(this.taskItem.startTime.getHours()+parseInt(c.style.left)/this.ganttChart.pixelsPerHour);this.showDescTask();c=this.cTaskItem[1];if(0<c.length)c[2].style.width=parseInt(c[2].style.width)+a+"px",c[1].style.left=parseInt(c[1].style.left)+a+"px";l.forEach(this.childTask,function(c){c.predTask||this.moveChildTaskItems(c,a,b)},this);
l.forEach(this.childPredTask,function(c){this.moveChildTaskItems(c,a,b)},this)},moveChildTaskItems:function(a,b,c){var d=a.cTaskItem[0];if(c){d.style.left=parseInt(d.style.left)+b+"px";a.adjustPanelTime();a.taskItem.startTime=new Date(this.ganttChart.startDate);a.taskItem.startTime.setHours(a.taskItem.startTime.getHours()+parseInt(d.style.left)/this.ganttChart.pixelsPerHour);var e=a.cTaskItem[1];l.forEach(e,function(a){a.style.left=parseInt(a.style.left)+b+"px"},this);l.forEach(a.childTask,function(a){a.predTask||
this.moveChildTaskItems(a,b,c)},this);l.forEach(a.childPredTask,function(a){this.moveChildTaskItems(a,b,c)},this)}else if(e=a.cTaskItem[1],0<e.length)d=e[0],e=e[2],e.style.left=parseInt(e.style.left)+b+"px",e.style.width=parseInt(e.style.width)-b+"px",d.style.left=parseInt(d.style.left)+b+"px";a.moveDescTask()},adjustPanelTime:function(){var a=this.cTaskItem[0],a=parseInt(a.style.left)+parseInt(a.firstChild.firstChild.width)+this.ganttChart.panelTimeExpandDelta,a=a+this.descrTask.offsetWidth;this.ganttChart.adjustPanelTime(a)},
getDateOnPosition:function(a){var b=new Date(this.ganttChart.startDate);b.setHours(b.getHours()+a/this.ganttChart.pixelsPerHour);return b},moveItem:function(a){var a=this.posX+(a.screenX-this.mouseX),b=parseInt(this.cTaskItem[0].childNodes[0].firstChild.width);this.checkMove&&this.minPosXMove<=a&&(a+b<=this.maxPosXMove||-1==this.maxPosXMove)&&this.moveTaskItem(a)},moveTaskItem:function(a){var b=this.cTaskItem[0];b.style.left=a+"px";b.childNodes[1].firstChild.rows[0].cells[0].innerHTML=this.getDateOnPosition(a).getDate()+
"."+(this.getDateOnPosition(a).getMonth()+1)+"."+this.getDateOnPosition(a).getUTCFullYear()},resizeItem:function(a){this.checkResize&&(a=this.taskItemWidth+(a.screenX-this.mouseX),a>=this.taskItemWidth?a<=this.maxWidthResize||-1==this.maxWidthResize?this.resizeTaskItem(a):-1!=this.maxWidthResize&&a>this.maxWidthResize&&this.resizeTaskItem(this.maxWidthResize):a<=this.taskItemWidth&&(a>=this.minWidthResize?this.resizeTaskItem(a):a<this.minWidthResize&&this.resizeTaskItem(this.minWidthResize)))},resizeTaskItem:function(a){var b=
this.cTaskItem[0],c=Math.round(a/this.ganttChart.pixelsPerWorkHour),d=b.childNodes[0].firstChild.rows[0],e=d.cells[0],d=d.cells[1];e&&(e.firstChild.style.width=parseInt(e.width)*a/100+"px");d&&(d.firstChild.style.width=parseInt(d.width)*a/100+"px");b.childNodes[0].firstChild.width=a+"px";b.childNodes[1].firstChild.width=a+"px";this.cTaskItem[0].childNodes[1].firstChild.rows[0].cells[0].innerHTML=c;b=b.childNodes[2];b.childNodes[0].style.width=a+"px";b.childNodes[1].style.left=a-10+"px"},endResizeItem:function(){var a=
this.cTaskItem[0];if(this.taskItemWidth!=parseInt(a.childNodes[0].firstChild.width)){var b=a.offsetLeft,c=a.offsetLeft+parseInt(a.childNodes[0].firstChild.width);this.taskItem.duration=Math.round((c-b)/this.ganttChart.pixelsPerWorkHour);if(0<this.childPredTask.length)for(b=0;b<this.childPredTask.length;b++){var d=this.childPredTask[b].cTaskItem[1],c=d[0],d=d[2],e=a.childNodes[0];d.style.width=parseInt(d.style.width)-(parseInt(e.firstChild.width)-this.taskItemWidth)+"px";d.style.left=parseInt(d.style.left)+
(parseInt(e.firstChild.width)-this.taskItemWidth)+"px";c.style.left=parseInt(c.style.left)+(parseInt(e.firstChild.width)-this.taskItemWidth)+"px"}}this.cTaskItem[0].childNodes[1].firstChild.rows[0].cells[0].innerHTML="";this.checkResize=!1;this.mouseX=this.taskItemWidth=0;this.showDescTask();this.project.shiftProjectItem();this.adjustPanelTime();this.ganttChart.resource&&this.ganttChart.resource.refresh()},startMove:function(a){this.moveChild=a.ctrlKey;this.mouseX=a.screenX;this.getMoveInfo();this.checkMove=
!0;this.hideDescTask()},showDescTask:function(){this.descrTask.style.left=parseInt(this.cTaskItem[0].style.left)+this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+10+"px";this.descrTask.innerHTML=this.objKeyToStr(this.getTaskOwner());this.descrTask.style.visibility="visible"},hideDescTask:function(){f.set(this.descrTask,"visibility","hidden")},buildResourceInfo:function(a){if(this.childTask&&0<this.childTask.length)for(var b=0;b<this.childTask.length;b++)this.childTask[b].buildResourceInfo(a);
if(0<g.trim(this.taskItem.taskOwner).length)for(var c=this.taskItem.taskOwner.split(";"),b=0;b<c.length;b++){var d=c[b];0>=g.trim(d).length||(a[d]?a[d].push(this):a[d]=[this])}},objKeyToStr:function(a,b){var c="",b=b||" ";if(a)for(var d in a)c+=b+d;return c},getTaskOwner:function(){var a={};if(0<g.trim(this.taskItem.taskOwner).length)for(var b=this.taskItem.taskOwner.split(";"),c=0;c<b.length;c++)a[b[c]]=1;l.forEach(this.childTask,function(b){g.mixin(a,b.getTaskOwner())},this);return a},moveDescTask:function(){this.descrTask.style.left=
parseInt(this.cTaskItem[0].style.left)+this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+10+"px"},getMoveInfo:function(){this.posX=parseInt(this.cTaskItem[0].style.left);var a=parseInt(this.cTaskItem[0].childNodes[0].firstChild.width),b=!this.parentTask?0:parseInt(this.parentTask.cTaskItem[0].style.left),c=!this.predTask?0:parseInt(this.predTask.cTaskItem[0].style.left)+parseInt(this.predTask.cTaskItem[0].childNodes[0].firstChild.width),d=!this.parentTask?0:parseInt(this.parentTask.cTaskItem[0].childNodes[0].firstChild.width),
e=0,f=0,g=0;if(0<this.childPredTask.length){var h=null;l.forEach(this.childPredTask,function(a){if(!h||h&&h>parseInt(a.cTaskItem[0].style.left))h=parseInt(a.cTaskItem[0].style.left)},this);e=h}if(0<this.childTask.length){var i=null;l.forEach(this.childTask,function(a){if(!i||i&&i>parseInt(a.cTaskItem[0].style.left))i=parseInt(a.cTaskItem[0].style.left)},this);g=i;h=null;l.forEach(this.childTask,function(a){if(!h||h&&h<parseInt(a.cTaskItem[0].style.left)+parseInt(a.cTaskItem[0].firstChild.firstChild.width))h=
parseInt(a.cTaskItem[0].style.left)+parseInt(a.cTaskItem[0].firstChild.firstChild.width)},this);f=h}if(this.moveChild){if(0<b&&0==c)this.minPosXMove=b,this.maxPosXMove=b+d;else if(0==b&&0==c)this.minPosXMove=this.ganttChart.initialPos,this.maxPosXMove=-1;else if(0<b&&0<c)this.minPosXMove=c,this.maxPosXMove=b+d;else if(0==b&&0<c)this.minPosXMove=c,this.maxPosXMove=-1;if(this.parentTask&&0<this.childPredTask.length)h=this.getMaxPosPredChildTaskItem(this),b=parseInt(this.parentTask.cTaskItem[0].style.left)+
parseInt(this.parentTask.cTaskItem[0].firstChild.firstChild.width),this.maxPosXMove=this.posX+a+b-h}else{if(0<this.childPredTask.length&&this.maxPosXMove<e)this.maxPosXMove=e;if(0<this.childTask.length){0<this.childPredTask.length&&this.maxPosXMove-a>g&&(this.maxPosXMove-=this.maxPosXMove-a-g);if(!(0<this.childPredTask.length))this.maxPosXMove=g+a;this.minPosXMove=f-a}if(0<b){if(!(0<this.childPredTask.length)&&0<this.childTask.length&&this.maxPosXMove>b+d)this.maxPosXMove=b+d;if(this.minPosXMove<=
b)this.minPosXMove=b;if(!(0<this.childTask.length)&&!(0<this.childPredTask.length))this.maxPosXMove=b+d;else if(!(0<this.childTask.length)&&0<this.childPredTask.length&&b+d>c)this.maxPosXMove=e}if(0<c&&this.minPosXMove<=c)this.minPosXMove=c;if(0==c&&0==b&&this.minPosXMove<=this.ganttChart.initialPos)this.minPosXMove=this.ganttChart.initialPos}},startResize:function(a){this.mouseX=a.screenX;this.getResizeInfo();this.hideDescTask();this.checkResize=!0;this.taskItemWidth=parseInt(this.cTaskItem[0].firstChild.firstChild.width)},
getResizeInfo:function(){var a=this.cTaskItem[0],b=!this.parentTask?0:parseInt(this.parentTask.cTaskItem[0].style.left),c=!this.parentTask?0:parseInt(this.parentTask.cTaskItem[0].childNodes[0].firstChild.width),a=parseInt(a.style.left),d=0,e=0;if(0<this.childPredTask.length){var f=null;l.forEach(this.childPredTask,function(a){if(!f||f&&f>parseInt(a.cTaskItem[0].style.left))f=parseInt(a.cTaskItem[0].style.left)},this);d=f}0<this.childTask.length&&(f=null,l.forEach(this.childTask,function(a){if(!f||
f&&f<parseInt(a.cTaskItem[0].style.left)+parseInt(a.cTaskItem[0].firstChild.firstChild.width))f=parseInt(a.cTaskItem[0].style.left)+parseInt(a.cTaskItem[0].firstChild.firstChild.width)},this),e=f);this.minWidthResize=this.ganttChart.pixelsPerDay;if(0<this.childTask.length)this.minWidthResize=e-a;if(0<this.childPredTask.length&&!this.parentTask)this.maxWidthResize=d-a;else if(0<this.childPredTask.length&&this.parentTask)this.maxWidthResize=Math.min(b+c-a,d-a);else if(0==this.childPredTask.length&&
this.parentTask)this.maxWidthResize=b+c-a},createTaskItem:function(){this.posX=this.ganttChart.getPosOnDate(this.taskItem.startTime);var a=h.create("div",{id:this.taskItem.id,className:"ganttTaskItemControl"});f.set(a,{left:this.posX+"px",top:this.posY+"px"});var b=h.create("div",{className:"ganttTaskDivTaskItem"},a),b=h.create("table",{cellPadding:"0",cellSpacing:"0",width:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+"px",className:"ganttTaskTblTaskItem"},b),b=b.insertRow(b.rows.length);
if(0!=this.taskItem.percentage){var c=h.create("td",{height:this.ganttChart.heightTaskItem+"px",width:this.taskItem.percentage+"%"},b);c.style.lineHeight="1px";c=h.create("div",{className:"ganttImageTaskProgressFilled"},c);f.set(c,{width:this.taskItem.percentage*this.taskItem.duration*this.ganttChart.pixelsPerWorkHour/100+"px",height:this.ganttChart.heightTaskItem+"px"})}if(100!=this.taskItem.percentage)c=h.create("td",{height:this.ganttChart.heightTaskItem+"px",width:100-this.taskItem.percentage+
"%"},b),c.style.lineHeight="1px",b=h.create("div",{className:"ganttImageTaskProgressBg"},c),f.set(b,{width:(100-this.taskItem.percentage)*this.taskItem.duration*this.ganttChart.pixelsPerWorkHour/100+"px",height:this.ganttChart.heightTaskItem+"px"});this.ganttChart.isContentEditable&&(b=h.create("div",{className:"ganttTaskDivTaskInfo"},a),h.create("table",{cellPadding:"0",cellSpacing:"0",height:this.ganttChart.heightTaskItem+"px",width:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+"px"},
b),c=h.create("div",{className:"ganttTaskDivTaskName"},a),b=h.create("div",{},c),h.create("input",{className:"ganttTaskDivMoveInput",type:"text"},b),f.set(b,{background:"#000000",opacity:0}),f.set(b,{height:this.ganttChart.heightTaskItem+"px",width:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+"px"}),c=h.create("div",{className:"ganttTaskDivResize"},c),h.create("input",{className:"ganttTaskDivResizeInput",type:"text"},c),f.set(c,{left:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour-
10+"px",height:this.ganttChart.heightTaskItem+"px",width:"10px"}),this.ganttChart._events.push(i(b,"mousedown",g.hitch(this,function(a){this.moveMoveConn=i(document,"mousemove",g.hitch(this,function(a){this.checkMove&&this.moveItem(a)}));this.moveUpConn=i(document,"mouseup",g.hitch(this,function(){if(this.checkMove)this.endMove(),this.ganttChart.isMoving=!1,document.body.releaseCapture&&document.body.releaseCapture(),this.moveMoveConn.remove(),this.moveUpConn.remove()}));this.startMove(a);this.ganttChart.isMoving=
!0;document.body.setCapture&&document.body.setCapture(!1)}))),this.ganttChart._events.push(i(b,"mouseover",g.hitch(this,function(a){a.target&&(a.target.style.cursor="move")}))),this.ganttChart._events.push(i(b,"mouseout",g.hitch(this,function(a){a.target.style.cursor=""}))),this.ganttChart._events.push(i(c,"mousedown",g.hitch(this,function(a){this.resizeMoveConn=i(document,"mousemove",g.hitch(this,function(a){this.checkResize&&this.resizeItem(a)}));this.resizeUpConn=i(document,"mouseup",g.hitch(this,
function(){if(this.checkResize)this.endResizeItem(),this.ganttChart.isResizing=!1,document.body.releaseCapture&&document.body.releaseCapture(),this.resizeMoveConn.remove(),this.resizeUpConn.remove()}));this.startResize(a);this.ganttChart.isResizing=!0;document.body.setCapture&&document.body.setCapture(!1)}))),this.ganttChart._events.push(i(c,"mouseover",g.hitch(this,function(a){!this.ganttChart.isMoving&&!this.ganttChart.isResizing&&a.target&&(a.target.style.cursor="e-resize")}))),this.ganttChart._events.push(i(c,
"mouseout",g.hitch(this,function(a){!this.checkResize&&a.target&&(a.target.style.cursor="")}))));return a},createTaskNameItem:function(){var a=h.create("div",{id:this.taskItem.id,className:"ganttTaskTaskNameItem",title:this.taskItem.name+", id: "+this.taskItem.id+" ",innerHTML:this.taskItem.name});f.set(a,"top",this.posY+"px");p.set(a,"tabIndex",0);this.ganttChart.isShowConMenu&&(this.ganttChart._events.push(i(a,"mouseover",g.hitch(this,function(b){j.add(a,"ganttTaskTaskNameItemHover");clearTimeout(this.ganttChart.menuTimer);
this.ganttChart.tabMenu.clear();this.ganttChart.tabMenu.show(b.target,this)}))),this.ganttChart._events.push(i(a,"keydown",g.hitch(this,function(a){a.keyCode==m.ENTER&&(this.ganttChart.tabMenu.clear(),this.ganttChart.tabMenu.show(a.target,this));this.ganttChart.tabMenu.isShow&&(a.keyCode==m.LEFT_ARROW||a.keyCode==m.RIGHT_ARROW)&&q(this.ganttChart.tabMenu.menuPanel.firstChild.rows[0].cells[0]);this.ganttChart.tabMenu.isShow&&a.keyCode==m.ESCAPE&&this.ganttChart.tabMenu.hide()}))),this.ganttChart._events.push(i(a,
"mouseout",g.hitch(this,function(){j.remove(a,"ganttTaskTaskNameItemHover");clearTimeout(this.ganttChart.menuTimer);this.ganttChart.menuTimer=setTimeout(g.hitch(this,function(){this.ganttChart.tabMenu.hide()}),200)}))),this.ganttChart._events.push(i(this.ganttChart.tabMenu.menuPanel,"mouseover",g.hitch(this,function(){clearTimeout(this.ganttChart.menuTimer)}))),this.ganttChart._events.push(i(this.ganttChart.tabMenu.menuPanel,"keydown",g.hitch(this,function(a){this.ganttChart.tabMenu.isShow&&a.keyCode==
m.ESCAPE&&this.ganttChart.tabMenu.hide()}))),this.ganttChart._events.push(i(this.ganttChart.tabMenu.menuPanel,"mouseout",g.hitch(this,function(){clearTimeout(this.ganttChart.menuTimer);this.ganttChart.menuTimer=setTimeout(g.hitch(this,function(){this.ganttChart.tabMenu.hide()}),200)}))));return a},createTaskDescItem:function(){var a=this.posX+this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+10,b=h.create("div",{innerHTML:this.objKeyToStr(this.getTaskOwner()),className:"ganttTaskDescTask"});
f.set(b,{left:a+"px",top:this.posY+"px"});return this.descrTask=b},checkWidthTaskNameItem:function(){if(this.cTaskNameItem[0].offsetWidth+this.cTaskNameItem[0].offsetLeft>this.ganttChart.maxWidthTaskNames){var a=this.taskItem.name.substring(0,this.cTaskNameItem[0].firstChild.length-Math.round((this.cTaskNameItem[0].offsetWidth+this.cTaskNameItem[0].offsetLeft-this.ganttChart.maxWidthTaskNames)/(this.cTaskNameItem[0].offsetWidth/this.cTaskNameItem[0].firstChild.length))-3);this.cTaskNameItem[0].innerHTML=
a+"..."}},refreshTaskItem:function(a){this.posX=this.ganttChart.getPosOnDate(this.taskItem.startTime);f.set(a,{left:this.posX+"px"});var b=a.childNodes[0].firstChild;b.width=(!this.taskItem.duration?1:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour)+"px";b=b.rows[0];if(0!=this.taskItem.percentage){var c=b.firstChild;c.height=this.ganttChart.heightTaskItem+"px";c.width=this.taskItem.percentage+"%";c.style.lineHeight="1px";f.set(c.firstChild,{width:(!this.taskItem.duration?1:this.taskItem.percentage*
this.taskItem.duration*this.ganttChart.pixelsPerWorkHour/100)+"px",height:this.ganttChart.heightTaskItem+"px"})}if(100!=this.taskItem.percentage)c=b.lastChild,c.height=this.ganttChart.heightTaskItem+"px",c.width=100-this.taskItem.percentage+"%",c.style.lineHeight="1px",f.set(c.firstChild,{width:(!this.taskItem.duration?1:(100-this.taskItem.percentage)*this.taskItem.duration*this.ganttChart.pixelsPerWorkHour/100)+"px",height:this.ganttChart.heightTaskItem+"px"});if(this.ganttChart.isContentEditable)b=
a.childNodes[1].firstChild,b.height=this.ganttChart.heightTaskItem+"px",b.width=(!this.taskItem.duration?1:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour)+"px",b.rows[0].firstChild.height=this.ganttChart.heightTaskItem+"px",b=a.childNodes[2],c=b.firstChild,c.style.height=this.ganttChart.heightTaskItem+"px",c.style.width=(!this.taskItem.duration?1:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour)+"px",b=b.lastChild,f.set(b,{left:this.taskItem.duration*this.ganttChart.pixelsPerWorkHour-
10+"px"}),b.style.height=this.ganttChart.heightTaskItem+"px",b.style.width="10px";return a},refreshTaskDesc:function(a){f.set(a,{left:this.posX+this.taskItem.duration*this.ganttChart.pixelsPerWorkHour+10+"px"});return a},refreshConnectingLinesDS:function(a){var b=a[1],c=a[0],d=a[2],e=f.set(this.predTask.cTaskItem[0],"left"),g=f.set(this.predTask.cTaskItem[0],"top"),h=f.set(this.cTaskItem[0],"left"),i=this.posY+2,j=parseInt(this.predTask.cTaskItem[0].firstChild.firstChild.width);g<i?f.set(c,{height:i-
this.ganttChart.heightTaskItem/2-g-3+"px",left:e+j-20+"px"}):f.set(c,{height:g+2-i+"px",left:e+j-20+"px"});f.set(d,{width:15+(h-(j+e))+"px",left:e+j-20+"px"});f.set(b,{left:h-7+"px"});return a},postLoadData:function(){},refresh:function(){this.childTask&&0<this.childTask.length&&l.forEach(this.childTask,function(a){a.refresh()},this);this.refreshTaskItem(this.cTaskItem[0]);this.refreshTaskDesc(this.cTaskItem[0].nextSibling);this.taskItem.previousTask&&this.predTask&&this.refreshConnectingLinesDS(this.cTaskItem[1]);
return this},create:function(){var a=this.ganttChart.contentData.firstChild,b=this.taskItem.previousTask,c=this.taskItem.parentTask,d=0<this.taskItem.cldTasks.length;this.cTaskItem=[];this.cTaskNameItem=[];if(!c)if(this.taskItem.previousParentTask){this.previousParentTask=this.project.getTaskById(this.taskItem.previousParentTask.id);var e=this.ganttChart.getLastChildTask(this.previousParentTask);this.posY=parseInt(e.cTaskItem[0].style.top)+this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;
this.previousParentTask.nextParentTask=this}else this.posY=parseInt(this.project.projectItem[0].style.top)+this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;if(c){var g=this.project.getTaskById(this.taskItem.parentTask.id);this.parentTask=g;this.taskItem.previousChildTask?(this.previousChildTask=this.project.getTaskById(this.taskItem.previousChildTask.id),e=this.ganttChart.getLastChildTask(this.previousChildTask),this.posY=f.set(e.cTaskItem[0],"top")+this.ganttChart.heightTaskItem+
this.ganttChart.heightTaskItemExtra,this.previousChildTask.nextChildTask=this):this.posY=f.set(g.cTaskItem[0],"top")+this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;g.childTask.push(this)}if(b)this.predTask=g=this.project.getTaskById(b.id),g.childPredTask.push(this);this.cTaskItem.push(this.createTaskItem());a.appendChild(this.cTaskItem[0]);this.ganttChart.panelNames&&(this.cTaskNameItem.push(this.createTaskNameItem()),this.ganttChart.panelNames.firstChild.appendChild(this.cTaskNameItem[0]));
a.appendChild(this.createTaskDescItem());a=[];b&&(a=this.createConnectingLinesDS());this.cTaskItem.push(a);if(this.ganttChart.panelNames){b=[];if(c)this.cTaskNameItem[0].style.left=f.set(this.parentTask.cTaskNameItem[0],"left")+15+"px",b=this.createConnectingLinesPN();this.checkWidthTaskNameItem();this.checkPosition();c=null;d&&(c=this.createTreeImg());this.cTaskNameItem.push(b);this.cTaskNameItem.push(c)}this.adjustPanelTime();return this},checkPosition:function(){if(this.ganttChart.withTaskId){var a=
s.getMarginBox(this.cTaskNameItem[0],!0);this.taskIdentifier?this.childTask&&0<this.childTask.length&&l.forEach(this.childTask,function(a){a.checkPosition()},this):this.taskIdentifier=h.create("div",{id:"TaskId_"+this.taskItem.id,className:"ganttTaskIdentifier",title:this.taskItem.id,innerHTML:this.taskItem.id},this.cTaskNameItem[0].parentNode);f.set(this.taskIdentifier,{left:a.l+a.w+4+"px",top:a.t-1+"px"})}},createTreeImg:function(){var a=h.create("div",{id:this.taskItem.id,className:"ganttImageTreeCollapse"});
p.set(a,"tabIndex",0);l.forEach(["onclick","onkeydown"],function(b){this.ganttChart._events.push(i(a,b,this,g.hitch(this,function(c){if(!("onkeydown"==b&&c.keyCode!=m.ENTER))this.isExpanded?(j.remove(a,"ganttImageTreeCollapse"),j.add(a,"ganttImageTreeExpand"),this.isExpanded=!1,this.hideChildTasks(this),this.shiftCurrentTasks(this,-this.hideTasksHeight)):(j.remove(a,"ganttImageTreeExpand"),j.add(a,"ganttImageTreeCollapse"),this.isExpanded=!0,this.shiftCurrentTasks(this,this.hideTasksHeight),this.showChildTasks(this,
!0),this.hideTasksHeight=0),this.ganttChart.checkPosition()})))},this);this.ganttChart.panelNames.firstChild.appendChild(a);j.add(a,"ganttTaskTreeImage");f.set(a,{left:f.set(this.cTaskNameItem[0],"left")-12+"px",top:f.set(this.cTaskNameItem[0],"top")+3+"px"});return a},setPreviousTask:function(a){if(""==a)this.clearPredTask();else{var b=this.taskItem;if(b.id==a)return!1;var c=this.project.getTaskById(a);if(!c)return!1;var d=c.taskItem,e=null==d.parentTask,f=null==b.parentTask;if(e&&!f||!e&&f||!e&&
!f&&d.parentTask.id!=b.parentTask.id)return!1;e=b.startTime.getTime();if(d.startTime.getTime()+864E5*d.duration/c.ganttChart.hsPerDay>e)return!1;this.clearPredTask();this.ganttChart.checkPosPreviousTask(d,b)||this.ganttChart.correctPosPreviousTask(d,b,this);b.previousTaskId=a;b.previousTask=d;this.predTask=c;c.childPredTask.push(this);this.cTaskItem[1]=this.createConnectingLinesDS()}return!0},clearPredTask:function(){if(this.predTask){for(var a=this.predTask.childPredTask,b=0;b<a.length;b++)if(a[b]==
this){a.splice(b,1);break}for(b=0;b<this.cTaskItem[1].length;b++)this.cTaskItem[1][b].parentNode.removeChild(this.cTaskItem[1][b]);this.cTaskItem[1]=[];this.taskItem.previousTaskId=null;this.predTask=this.taskItem.previousTask=null}},setStartTime:function(a,b){this.moveChild=b;this.getMoveInfo();var c=this.ganttChart.getPosOnDate(a);if(parseInt(this.cTaskItem[0].firstChild.firstChild.width)+c>this.maxPosXMove&&-1!=this.maxPosXMove||c<this.minPosXMove)return this.minPosXMove=this.maxPosXMove=-1,!1;
this.cTaskItem[0].style.left=c;this.moveCurrentTaskItem(c-this.posX,b);this.project.shiftProjectItem();this.descrTask.innerHTML=this.objKeyToStr(this.getTaskOwner());this.adjustPanelTime();this.posX=0;this.minPosXMove=this.maxPosXMove=-1;return!0},setDuration:function(a){this.getResizeInfo();a=this.ganttChart.getWidthOnDuration(a);if(a>this.maxWidthResize&&-1!=this.maxWidthResize||a<this.minWidthResize)return!1;this.taskItemWidth=parseInt(this.cTaskItem[0].firstChild.firstChild.width);this.resizeTaskItem(a);
this.endResizeItem();this.descrTask.innerHTML=this.objKeyToStr(this.getTaskOwner());return!0},setTaskOwner:function(a){this.taskItem.taskOwner=null==a||void 0==a?"":a;this.descrTask.innerHTML=this.objKeyToStr(this.getTaskOwner());return!0},setPercentCompleted:function(a){a=parseInt(a);if(isNaN(a)||100<a||0>a)return!1;var b=this.cTaskItem[0].childNodes[0].firstChild.rows[0],c=b.cells[0],d=b.cells[1];if(0!=a&&100!=a)if(0!=this.taskItem.percentage&&100!=this.taskItem.percentage)c.width=a+"%",d.width=
100-a+"%";else{if(0==this.taskItem.percentage||100==this.taskItem.percentage)c.parentNode.removeChild(c),c=h.create("td",{height:this.ganttChart.heightTaskItem+"px",width:a+"%"},b),c.style.lineHeight="1px",c=h.create("div",{className:"ganttImageTaskProgressFilled"},c),f.set(c,{width:a*this.taskItem.duration*this.ganttChart.pixelsPerWorkHour/100+"px",height:this.ganttChart.heightTaskItem+"px"}),c=h.create("td",{height:this.ganttChart.heightTaskItem+"px",width:100-a+"%"},b),c.style.lineHeight="1px",
c=h.create("div",{className:"ganttImageTaskProgressBg"},c),f.set(c,{width:(100-a)*this.taskItem.duration*this.ganttChart.pixelsPerWorkHour/100+"px",height:this.ganttChart.heightTaskItem+"px"})}else if(0==a)0!=this.taskItem.percentage&&100!=this.taskItem.percentage?(c.parentNode.removeChild(c),d.width="100%"):(j.remove(c.firstChild,"ganttImageTaskProgressFilled"),j.add(c.firstChild,"ganttImageTaskProgressBg"));else if(100==a)0!=this.taskItem.percentage&&100!=this.taskItem.percentage?(d.parentNode.removeChild(d),
c.width="100%"):(j.remove(c.firstChild,"ganttImageTaskProgressBg"),j.add(c.firstChild,"ganttImageTaskProgressFilled"));this.taskItem.percentage=a;this.taskItemWidth=parseInt(this.cTaskItem[0].firstChild.firstChild.width);this.resizeTaskItem(this.taskItemWidth);this.endResizeItem();this.descrTask.innerHTML=this.objKeyToStr(this.getTaskOwner());return!0},setName:function(a){if(a)this.taskItem.name=a,this.cTaskNameItem[0].innerHTML=a,this.cTaskNameItem[0].title=a,this.checkWidthTaskNameItem(),this.checkPosition(),
this.descrTask.innerHTML=this.objKeyToStr(this.getTaskOwner()),this.adjustPanelTime()}})});