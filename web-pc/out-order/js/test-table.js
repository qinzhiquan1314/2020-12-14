	
/************************对外-PC-订单查询***************************/

//页面加载成功后 初始化事件
$(function(){
	//设置面板高度
	setScreenHeight(".panel_2","60");//40+10+10
	
	//设置宽高放在advert.js与广告一起

	//初始化表格
	orderTableObj.initTable();
});

/******************************本页面对象*******************************/

//本页面对象
var orderTableObj = {
	url: getRootPath_web()+"/js/data/order-list.json"
	////初始化table数据
	,initTable: function(){	
	
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	    	url: orderTableObj.url,
	    	onLoadSuccess:function(data){
		    		//console.log(data);
	    		 orderTableObj.z_initlaced(data);
    	    }
	    });
	  
	}
	//订单编号-单元格样式
	,tdFormatter1: function(value, row, index) {
		var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" :  row.exTradeId;
		var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" :  row.bssSubscribeId;
	    if(exTradeId!==""){	//营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
	    	return '<p>'+checkLen(exTradeId)+'</p>';
		}else{
			return '<p>'+checkLen(bssSubscribeId)+'</p>';
		}
	}
	//装机地址-单元格样式
	,tdFormatter2: function(value, row, index) {
		return '<p class="td-address">'+value+'</p>';
	}
	//表格超链接  订单状态
	,actionFormatter: function(value, row, index) { //表格超链接  订单状态
		if(row.statusFlag=="已完成"){                   
			if(row.commentState==1){
				return '<p class="a-p1 finish">已完成</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showHistory apa2">查看评价</a></p>';     //订单已完成已评价
			}else{
				return '<p class="a-p1 finish">已完成</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAssess apa2">立即评价</a></p>'; //订单已完成未评价
			}
		}else if (row.statusFlag=="已取消"){
			if(row.commentState==1){
				return '<p class="a-p1 finish">已取消</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAdviseHistory apa2">查看建议</a></p>';     //订单已完成已评价
			}else{
				return '<p class="a-p1 finish">已取消</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAdvise apa2">您的建议</a></p>'; //订单已完成未评价
			}
		}
		return '<p class="a-p1">'+row.statusFlag+'</p><p class="a-p1"><a class="showFlow apa5">订单详情</a></p>';
	}
	//ie8兼容隔行变色
	,z_initlaced: function(resData){
		  if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
		      var z_num  =  resData.rows.length;
		      var z_tim = 0;
		      if(z_num>20){
		    	  z_tim=500;
		      }else{
		    	  z_tim=200;
		      };
		      setTimeout(function(){
	    			Interlaced('table');
	    		},z_tim);
		  }
	}
	,showRightLayer_assess: function(layerId,layerTitle,layerUrl) {
		layer.open({
			  type: 2,
			  id: layerId, //设定一个id，防止重复弹出
			  title: layerTitle,//title: false, //不显示标题栏 
			  shadeClose: true,
			  shade: 0,//背景  shade: 0.8
			  area: ['490px', '98%'],
			  offset: 'r',
			  skin: 'a-layer', //
			  content: layerUrl //iframe的url
			  ,end: function () {
				  $('#table').bootstrapTable("destroy");
			      $('#table').bootstrapTable({
			    	  url: orderListObj.urlSearch  
			      });
	          }
	    });
	    
	}
}

/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
	 //展示流程
	'click .showFlow': function(e, value, row, index) {      
	      var orderNum = row.orderNum;
	      var orderNum2;
	      var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" :  row.bssSubscribeId;
		  var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" :  row.exTradeId;
		  if(exTradeId!==""){	//营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
			  orderNum2 = exTradeId;
		  }else{
			  orderNum2 = bssSubscribeId;
		  }
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/flow-list.html?orderNum="+orderNum+"&orderNum2="+orderNum2);
	      showRightLayer("flow"+orderNum,"订单详情",htmlUrl);
	},
	//展示评价
	'click .showAssess' : function(e, value, row, index) {
		  var expNo = checkNullOrEmptyStr(row.expNo)  ? "" :  row.expNo;
	      var orderNum = row.orderNum;	   
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess.html?orderNum="+orderNum+"&expNo="+expNo);
	      //showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
	      orderTableObj.showRightLayer_assess("assess"+orderNum,"订单评价",htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
	},
	//展示已评价数据
	'click .showHistory' : function(e, value, row, index) {
	      var orderNum = row.orderNum;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-show.html?orderNum="+orderNum);
	      showRightLayer("assess-show"+orderNum,"我的评价",htmlUrl);
	},
	 //提出建议
	'click .showAdvise' : function(e, value, row, index) {
		  var expNo = checkNullOrEmptyStr(row.expNo)  ? "" :  row.expNo;
	      var orderNum = row.orderNum;	   
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-advise.html?orderNum="+orderNum+"&expNo="+expNo);
	      //showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
	      orderTableObj.showRightLayer_assess("assess"+orderNum,"您的建议",htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
	},
	//展示已提交建议
	'click .showAdviseHistory' : function(e, value, row, index) {
	      var orderNum = row.orderNum;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-advise-show.html?orderNum="+orderNum);
	      showRightLayer("assess-show"+orderNum,"我的建议",htmlUrl);
	}
}


 