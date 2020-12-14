
/************手机 test**********/

$(document).ready(function(){
	//alert(2);
	
	//初始化【五星评价】
	testOjb.initRaty();
	
	//初始化【时间控件】
	testOjb.initDateplugin();
});

//定义变量
var testOjb = {
	//五星评价例子
	initRaty: function() {
		$('#function-demo').raty({
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/images/raty',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        //size: 24,
	        //width: 190,//五角星区域宽度
	        starOff: 'star-off-big.png',
	        starOn: 'star-on-big.png',
	        target: '#function-hint',// 目标div
	        scoreName: "serviceLevel",// 提交表单name
	        /*score: 2,//初始值
	        readOnly: true,//是否只读  */
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	            alert('ID: ' + $(this).attr('id') + "\nscore: " + score + "\nevent: " + evt.type);
	        }
	    });
	}
	//时间控件例子
	,initDateplugin: function() {
		$('#start-date').mobiscroll().date({
    		theme: 'android-ics',//皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】 
    		display: 'bottom',//显示方【modal】【inline】【bubble】【top】【bottom】 
	        mode: "scroller",//操作方式【scroller】【clickpick】【mixed】
	        dateFormat: 'yy-mm-dd', // 日期格式  
	        dateOrder: 'yymmdd', //面板中日期排列格式  
	        setText: '确定', //确认按钮名称  
	    		cancelText: '取消',//取消按钮名籍我  
	    		showNow: true, // [now]按钮是否显示
	        nowText: "今天",// [now]按钮中文显示
	        endYear:2050, //结束年份  
	        minWidth: 200,
	        height: 50,//行高
	        rows: 3,//可见行数
	        lang: 'zh',
		});
	    $('#end-date').mobiscroll().date({
	    	theme: 'android-ics',//皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】 
	    	display: 'bottom',//显示方【modal】【inline】【bubble】【top】【bottom】 
	        mode: "scroller",//操作方式【scroller】【clickpick】【mixed】
	        dateFormat: 'yy-mm-dd', // 日期格式  
	        dateOrder: 'yymmdd', //面板中日期排列格式  
	        setText: '确定', //确认按钮名称  
	    	cancelText: '取消',//取消按钮名籍我  
	    	showNow: true, // [now]按钮是否显示
	        nowText: "今天",// [now]按钮中文显示
	        endYear:2050, //结束年份  
	        minWidth: 200,
	        height: 50,//行高
	        rows: 3,//可见行数
	        lang: 'zh',
		});
	}
	
};

//弹出框按钮事件
$("#openBtn").click(function(){ 
	/*layer.open({
	  content: '123',
	  btn: '我知道了',
	  shadeClose: false,
	});*/
	layer.open({
	  content: '请选择评价内容'
	  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
	  ,time: 3
	});
});

//【重置】
$("input[type=reset]").click(function(){
	$('#loginForm').resetForm();
});
//【提交】验证
$("#loginForm").validate();


//【加载等待】例子
$("#loaderBtn").click(function(){ 
	$.ajax({
	       type : 'GET',
	       async : true,
	       //url: getRootPath_web()+"/test2/list_two?page="+page+"&rows="+limit+"&order=asc&sort=menuid",
	       url: getRootPath_web()+"/js/data/table.json",
	       dataType : 'json',
	       beforeSend: function () {         
				showLoader();
		   },
		   complete:function(){       
			    hideLoader();
		   },
		   /* 或者直接使用layer自带的加载
		   beforeSend: function () {         
			   //手机：layer.open({type: 2});//pc:layer.load(2);
		   },
		   complete:function(){       
			   layer.closeAll('loading');
		   },*/
	       success : function(resData) { 
	          if(resData == null) return;
	          var data = resData.rows;
	     	  alert(data);
	       }     
  });
	
	
	   
	   
});

/*身份证号输入框获得焦点*/
$("#IDNum").focus(function(){
	$("#jobIm2").show();
});
/*手机号输入框获得焦点*/
$("#phoneNum").focus(function(){
	$("#jobIm1").show();
});
/*点击删除图标清空数据*/
function dele(a,b){
	$("#"+b).val("");
	setTimeout(function(){
		$("#"+a).hide();
	},500);
}



