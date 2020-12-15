
/*------------------------
 * 
 * JAVASCRIPT "flowplugin.js"
 * 
 * show flow on date
 *
 * 左边统一图标
 * 右边增加open close区域
 * 
 ----------------------------------*/

(function($){
	$.fn.flowplugin = function(opt) {
		console.log(opt);
		opt = $.extend({
			jsonDate:[],//json数据
			imgPath:"img/", //img/f1.png
			imgType:"png", //图片后缀名
			drawerFun:function(){}// 回调函数
		}, opt);

		

		let dateStr = '2020-09-25 17:30' //预约上门的时间
		var dt=new Date(dateStr.replace(/-/,"/"));//将传入的日期格式的字符串转换为date对象 兼容ie
		// var dt=new Date(dateStr);//将传入的日期格式的字符串转换为date对象 非ie
		var ndt=new Date(dt.getTime() - 30 * 60 * 1000);//预约上门开始前30分钟的时间
		let nowData = new Date().valueOf()

		console.log('现在的时间：' + nowData);
		console.log('预约上门前30分钟：' + ndt.valueOf());

		let btnStr = ''

		// 如果当前时间大于等于预约上门前30分钟 显示按钮 后续要增加判断订单是否结束
		if( nowData >= ndt.valueOf() ){
			btnStr = `<button class="lookPersonBtn" style="background-color:#fe9900;color: white;margin-left: 5%">查看专员位置</button>

					<IFRAME id="mapIframe" style="background-color:#fe9900;color: white;margin-left: 5%;display: none" height=100 src="map.html" width=300></IFRAME>  `
		}

		var flowHtml =
			'<div class="flowSwrap">'
			 + btnStr +
			'<div class="hidden-line flow-line"></div></div>';
        var cellHtml = '<div id="CELL_ID" class="flowCell"><div class="cell-center"></div><div class="cell-right"></div></div>';
        
        //组织流程内容区域
        function _makeContent(obj) {
        	if (opt.jsonDate == null) return;
        	if (opt.jsonDate.data == null) return;
        	if (opt.jsonDate.data.length == 0) return;
        	
        	var data = opt.jsonDate.data;//流程节点数组数据
        	var cellSize = data.length;//定义流程节点的个数
        	
        	//创建外层框架
            obj.append(flowHtml);
        	
        	//遍历生成一行一行 流程信息
        	$.each(data,function(index,item){
        		//var v_date = (item.createDate == undefined || item.createDate == null) ? "" : item.createDate.split(/\s/)[0];
        		var v_time = (item.createDate == undefined || item.createDate == null) ? "" : item.createDate;
        		var v_name = (item.jobName == undefined || item.jobName == null) ? "" : item.jobName;
        		//var v_other_arr = item.jobOther == undefined ? [] : item.jobOther;// 判空处理
        		// var v_other_arr = (item.jobOther == undefined || item.jobOther == null) ? "" : item.jobOther.split(/,/);// 判空处理
        		var v_imgname = (item.jobImgName == undefined || item.jobImgName == null || item.jobImgName == "") ? "f1" : item.jobImgName;
        		var imgurl = opt.imgPath + v_imgname + "." + opt.imgType;
        		
        		//console.log(index+" "+v_date+" "+v_time);
        		
        		//添加cell外层元素
        		var cell_id = "cell_"+index;
        		var flowCellHtml = cellHtml.replace("CELL_ID",cell_id);
        		$(".flowSwrap").append(flowCellHtml);
        		
        		//左边时间
        		/*var cellLeftHtml = '<p class="t1">'+v_time+'</p><p class="t2">'+v_date+'</p>';
        		var $cellLeft = $("#"+cell_id+" .cell-left");
        		$cellLeft.append(cellLeftHtml);*/
        		
        		//中间节点图片
        		var cellCenterHtml = '<img id="img' + index + '" src="' + imgurl + '"/>';
        		$("#"+cell_id+" .cell-center").append(cellCenterHtml);
        		
        		
        		//右边内容 span元素 id="0" id="1" ...直接记录数组下标
        		var cellRightHtml = index ==0 ? '<p class="t1_start fc-close">' +v_time+ ' ' +v_name+ '</p>' : '<p class="t1 fc-close">' +v_time+ ' ' +v_name+ '</p>' ;
        		cellRightHtml = cellRightHtml + '<span id="' + index + '" class="drawer span-open"></span>'
								+ '<div class="draw-detail draw-detail-hide"></div>';
								
								console.log(item);
				// if(item.jobCode == "I9990"){
				// 	cellRightHtml += `<button class="lookPersonBtn" style="background-color:#fe9900;color: white">查看专员位置</button>`
				// }
        		var $cellRight = $("#"+cell_id+" .cell-right")
				$cellRight.append(cellRightHtml);
				
				
        		
        		/*$cellRight.on('click','span',function(event){// on 子元素span添加click事件
        			// 抽屉中内容
	                var spanId = event.currentTarget.id; 
	                var $this = $("#"+spanId);
	                var strHtml = drawerHtml(opt.jsonDate.data[spanId]);
			
					$this.toggleClass('open close');//自身样式 .open  .close 之间切换
					$this.prev().toggleClass('fc-close fc-open');//相邻上一个元素 .t1 切换
					$this.next().html(strHtml).toggle();//相邻下一个元素 .draw-detail 增加内容

					//重构节点之间线
					$(".flow-line:not('.hidden-line')").remove();//
					toMakeLine();
	            });*/


	            $cellRight.on('click',function(event){// on 父级元素添加click事件
	        		// 抽屉中内容
	                var $this = $("#"+index);// 获取span元素
	                var strHtml = drawerHtml(opt.jsonDate.data[index]);
			
					$this.toggleClass('span-open span-close');//自身样式 .open  .close 之间切换
					$this.prev().toggleClass('fc-close fc-open');//相邻上一个元素 .t1 切换
					$this.next().html(strHtml).toggle();//相邻下一个元素 .draw-detail 增加内容

					//重构节点之间线
					$(".flow-line:not('.hidden-line')").remove();//
					toMakeLine();
	            });
	            
	            /*// span 抽屉事件
	            $("#"+index).on('click',function(event){// on 父级元素添加click事件
	        		// 抽屉中内容
	                var $this = $(this);// 获取span元素
	                var strHtml = drawerHtml(opt.jsonDate.data[index]);
			
					$this.toggleClass('open close');//自身样式 .open  .close 之间切换
					$this.prev().toggleClass('fc-close fc-open');//相邻上一个元素 .t1 切换
					$this.next().html(strHtml).toggle();//相邻下一个元素 .draw-detail 增加内容

					//重构节点之间线
					$(".flow-line:not('.hidden-line')").remove();//
					toMakeLine();
	            });*/
        	        		
        		//字体颜色设置
        		//index == 0 ? $cellLeft.addClass("fc-orange") : $cellLeft.addClass("fc-grey");
        		index == 0 ? $cellRight.addClass("fc-orange") : $cellRight.addClass("fc-grey");
        		
        	});
        	
        	// 两个以上节点才画线
        	if (cellSize > 1) {
        		//生成的流程节点画线
        		toMakeLine();
        	}
        	
        }
        
        //抽屉内容
		function drawerHtml(v) {
			var v_sysCode = (v.sysCode == undefined || v.sysCode == null) ? "" : v.sysCode;
        	var v_staffName = (v.staffName == undefined || v.staffName == null) ? "" : v.staffName;
        	var v_staffTel = (v.staffTel == undefined || v.staffTel == null) ? "" : v.staffTel;
        	var v_endDate = (v.endDate == undefined || v.endDate == null) ? "" : v.endDate;
        	var v_jobState = (v.jobState == undefined || v.jobState == null) ? "" : v.jobState;
        	var v_jobAction = (v.jobAction == undefined || v.jobAction == null) ? "" : v.jobAction;

			var str = ' <p class="t3">归属系统：'+v_sysCode+'</p>'
					+' <p class="t3">处理人：'+v_staffName+'</p>'
					+' <p class="t3">处理人电话：'+v_staffTel+'</p>'
					+' <p class="t3">处理时间：'+v_endDate+'</p>'
					+' <p class="t3">环节状态：'+v_jobState+'</p>'
					+' <p class="t3">备注：'+v_jobAction+'</p>'
			return str;
		}

        //jobOther其中电话转换<a></a>
        function parsePhoneStr(str){
			return str==null? "": str.replace(/@[0-9]*@/, function(word){
				var callNum = word.substring(1, word.length-1);
				return "<a href='tel:" + callNum + "'>" + callNum + "</a>";
			}); 
		}

        //获取所有左列图片
		function toMakeLine(){
			var $imgs =	$(".cell-center img");
			//console.log($imgs.length);
			if($imgs.length > 1) {
				var fromObj//下面图片对象
					,toObj;//上面图片对象
				$.each($imgs, function(index,obj) {
					//console.log(index,obj);
					var imgId = obj.id;
					if (index!=0) {
						fromObj = getImgPosition(imgId);
						makeLine(".flowSwrap",fromObj,toObj);
					} 
					
					toObj = getImgPosition(imgId);
				});
			}
			
		}
		
		/**
		 * 获取imgId对象位置
		 * @param {Object} imgId
		 */
		function getImgPosition(imgId){
			//获取相对(父元素)位置  class="flowSwrap"
			var x = $('#'+imgId).position().left;
			var y = $('#'+imgId).position().top;
			var w = $('#'+imgId).width();// 第一个图片尚未加载成功时，取值为0，所以需要设置第一个img的height,width
			var h = $('#'+imgId).height();
			return {x:x,y:y,w:w,h:h}
		}
		
		/**
		 * 两个对象间画线
		 * 
		 * @param {Object} parentDiv
		 * @param {Object} formObj  下面对象
		 * @param {Object} toObj	上面对象
		 */
		function makeLine(parentDiv,formObj,toObj) {
			var lineDiv = document.createElement("div");
			$(lineDiv).addClass("flow-line");//外面设计宽度、颜色
			var lineWidth = $(".hidden-line").width(),//隐藏线，为动态获取线宽度
				lineHeight = formObj.y - toObj.y - toObj.h,
				lineTop = toObj.y + toObj.h,
				lineLeft = toObj.x + toObj.w/2 - lineWidth/2;
			$(lineDiv).css({
				position:"absolute"
				,height:lineHeight
				,top:lineTop
				,left:lineLeft
			});
			$(lineDiv).appendTo(parentDiv);
		}
		
		/*var thisTestDate = {
			  "data": [
			    {
			      "jobName":"订单已竣工"//t1
			      ,"jobOther":"感谢"//t2 【","英文逗号分隔换行】
			      ,"createDate":"2018-01-01 22:00"//t3
			      ,"jobImgName":"job_logistics"//图片名称
			    }]
			};
		var thisTestOpt = {
			"jsonDate":thisTestDate,//json数据
			"imgPath":"img/",//图片路径
			"imgType":"png"
		};*/
				
				
		//最后返回
        return $.each(this,function () {
            var obj = $(this);//必须
           
            // 根据数据内容填充html
			_makeContent(obj);

			
            
        });
	}
})(jQuery);
