/**
 * 
 * 
 */
var vp = null;
//销售线数据导出
//定义导出数据
//销售线数据导出
$('#salesexport').click(function(){
	$(this).addClass("pactive");
	$(this).siblings().removeClass("pactive");
	if(from=="0" || from=="1"){
		$.download(getOutUrl
				(getRootPath_web(), "/monitor/exportMonitorByArea?prodCatalog="+vp.busiType+"&from="+from+"&userParam="+locHref+"&type="+vp.cal), 'post'); // 下载文件
	}
	else{
		$.download(getOutUrl
				(getRootPath_web(), "/monitor/exportMonitorByArea?prodCatalog="+vp.busiType+"&userParam="+locHref+"&type="+vp.cal), 'post'); // 下载文件
	}
})
//小时数据导出
$('#hourexport').click(function(){

	$(this).addClass("pactive");
	$(this).siblings().removeClass("pactive");

	if(from=="0" || from=="1"){
		$.download(
				getOutUrl(getRootPath_web(), "/monitor/exportMonitorByTime?prodCatalog="+vp.busiType+"&from="+from+"&userParam="+locHref+"&type="+vp.cal), 'post');
	}
	else{
		$.download(
				getOutUrl(getRootPath_web(), "/monitor/exportMonitorByTime?prodCatalog="+vp.busiType+"&userParam="+locHref+"&type="+vp.cal), 'post'); // 下载文件
	}
})
//今日订单总量
var todayInCount = 0;
//今日竣工总量
var todayFinishCount = 0;

//标题数据展示
function titleCount(type){
	var data={
		type:type,
		userParam:locHref,
	}
	$.ajax({
		type: 'post',
		url : getOutUrl(getRootPath_web(), "/monitor/queryMonitorOneLine?type="+type+'&userParam='+locHref),
		dataType: 'json',
		data: data,
		cache: false,
		success: function(data) {
			//console.log(data)
			if(data.state=='1'){
				/*$("#totalcount").text("北京公司今日累计总订单" +todayInCount  + " 竣工订单量" + todayFinishCount + " 超时订单量"+data.rows[2]+ " 昨日总订单量" + data.rows[3] ); */
				//jinfd 修改
				$("#totalcount").remove();
				var totalcount="<label id='totalcount' class='lable_title' style='font-size: 18px;color:rgb(255,255,255);'>北京公司今日累计总订单<span style='background:#4352B5;border-radius:3px 3px;color:#00FFFD;padding:3px;'>"+todayInCount+"</span>，竣工订单量<span style='background:#4352B5;border-radius:3px 3px;color:#00FFFD;padding:3px;'>"+todayFinishCount+"</span>，超时订单量<span style='background:#4352B5;border-radius:3px 3px;color:#00FFFD;padding:3px;'>"+data.rows[2]+"</span>，昨日总订单量<span style='background:#4352B5;border-radius:3px 3px;color:#00FFFD;padding:3px;'>"+data.rows[3]+"</span>。</label>"
				$("#datatag").after(totalcount);
			}
			
		}
	});
}
titleCount(2)

var mingxiType=null;
//点击头部展示给mingxiType空值
$('.title_sp').click(function(){
	mingxiType = $(this).data("type");
})
//订单量线上展示
$('#spanup1box').click(function(){
	$('#spanup1box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})
//订单量线下展示
$('#spandown1box').click(function(){
	$('#spandown1box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})
$('#spanup11').click(function(event){
	mingxiType = $(this).data("type");
	
})
$('#spanup12').click(function(){
	mingxiType = $(this).data("type");	
})
$('#spanup13').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown11').click(function(){
	mingxiType = $(this).data("type");
})
$('#spandown12').click(function(){
	mingxiType = $(this).data("type");
})
//工单量线上线下展示
$('#spanup2box').click(function(){
	$('#spanup2box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})
$('#spandown2box').click(function(){
	$('#spandown2box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})

$('#spanup21').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup22').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup23').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown21').click(function(){
	mingxiType = $(this).data("type");
})
$('#spandown22').click(function(){
	mingxiType = $(this).data("type");
})
//在途量线上线下展示
$('#spanup3box').click(function(){
	$('#spanup3box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})

$('#spanup31').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup32').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup33').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown31').click(function(){
	mingxiType = $(this).data("type");
})
$('#spandown32').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown3box').click(function(){
	$('#spandown3box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})
//竣工量线上线下展示
$('#spanup4box').click(function(){
	$('#spanup4box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})

$('#spanup41').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup42').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup43').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown41').click(function(){
	mingxiType = $(this).data("type");
})
$('#spandown42').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown4box').click(function(){
	$('#spandown4box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})
//退单量线上线下展示
$('#spanup5box').click(function(){
	$('#spanup5box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})

$('#spanup51').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup52').click(function(){
	mingxiType = $(this).data("type");
})
$('#spanup53').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown51').click(function(){
	mingxiType = $(this).data("type");
})
$('#spandown52').click(function(){
	mingxiType = $(this).data("type");
})

$('#spandown5box').click(function(){
	$('#spandown5box1').toggle('show');
	$(this).children('.sj').toggleClass('trs')
	mingxiType = $(this).data("type");
})




//界面点击的各种类型说明
//默认值的查询参数问题
function viewparam() {
	var tvp = new Object();
	tvp.busiType = "all"; //业务类型  全部 宽带 融合 光快线+ 光专线+ 云快线 云专线
	tvp.orderType = "inCount"; //订单类型：订单量		工单量		竣工量		退单量	
	tvp.dataType = "all"; //来源：全部，线上，线下
	tvp.chartType = "area";//线图类型：按销售线展示，按小时展示
	tvp.cal=2;//受理路径默认是从发展口径开始 ，默认为2
	return tvp;
}
//定义全局变量日期用来实现页面的刷新
var time;
//定义线上线下区分
var from;
//对线上线下参数的查询进行设定
$(document).ready(
		function() {
			showChildMenu();
			vp = new viewparam();
			//业务类型点击事件
			$("#ywmenu li").click(function(event) {
				//将下拉列表的css样式清除
				$(".mleft li").removeClass("active");
				//为点击的li添加css样式
				$(this).addClass("active");
				//业务类型参数的赋值
				vp.busiType = $(this).attr("val");
				//点击事件时，调用方法将数据进行展示
				reloadData();
			}).eq(0).click();
			//当点击span处时出发的js函数
			$("#ordertable div div span").click(function(event) {
				//点击后清除css样式
				$(this).parents("#ordertable").find("span").removeClass("spancolor");
				//点击添加css样式
				$(this).addClass("spancolor");
				//业务类型参数的赋值
				vp.orderType = $(this).attr("orderType");
				//线上线下参数的赋值
				/*vp.dataType1 = $(this).attr("val");
				from=vp.dataType1;*/
				from= $(this).attr("val");
				if(dataType1="undefined"){
					vp.dataType1 ="all";
				}
				$("#chart_title").html($(this).attr('name'));
				qryChartup();
			});

			//点击按小时按销售线时颜色发生变化
			$(".chartBtns p[type='chart']").click(function(event) {
				$(".chartBtns p[type='chart']").removeClass("pactive");
				$(this).siblings().removeClass("pactive");
				$(this).addClass("pactive");
				vp.chartType = $(this).attr("chartType");
				qryChartup();
			});

			//受理路径点击展示颜色发生变化
			$(".chartBtns1 p[type='1']").click(function(event) {
				$(".chartBtns1 p[type='2']").removeClass("pactive");
				$(this).siblings().removeClass("pactive");
				$(this).addClass("pactive");
				vp.cal = 1;
				//总数据查询   线上线下保持柱状图联动
				titleCount(1)
				//数据的展示
				reloadData();
			});
			$(".chartBtns1 p[type='2']").click(function(event) {
				$(".chartBtns1 p[type='1']").removeClass("pactive");
				$(this).siblings().removeClass("pactive");
				$(this).addClass("pactive");
				vp.cal = 2;
				//总数据查询    线上线下保持柱状图联动
				titleCount(2)
				reloadData();
			});
			
			
			
			//定时刷新
			setInterval(function() {
				
				//处理总计展示不刷新的情况（2018-10-11）
				if(vp.cal == 1){
					titleCount(1)
				}else{
					titleCount(2)
				}
				
				//刷新数据，将数据重新加载
				reloadData();
			}, 2 * 60 * 1000);

		});

//子菜单的显示
function showChildMenu() {
	$(".ywcheck img").attr("show", "1")
	$(".ywcheck").click(function() {
		if ($(".ywcheck img").attr("show") == "1") {
			$(".ywcheck img").attr("show", "0")
			$(".ywcheck img").addClass("imgclose");
			$(".ywcheck img").removeClass("imgshow");
			$("#ywmenu li:gt(0)").hide();
			$("#ywmenu li:eq(0)").css("border-radius", "10px 10px 10px 10px");
		} else {
			$("#ywmenu li:eq(0)").css("border-radius", "10px 10px 0px 0px");
			$(".ywcheck img").removeClass("imgclose");
			$(".ywcheck img").addClass("imgshow");
			$(".ywcheck img").attr("show", "1")
			$("#ywmenu li:gt(0)").show();
		}
	});
}



//重新加载数据
function reloadData() {
	
	
	
	loadTable();
	qryChartup();
}

//加载日期并显示
function reloadData1(time) {
	var timetextarr;
	if(time==null){
		var data = new Date();
		$("#datatag").text(
				"截至" + data.getFullYear() + "年" + (data.getMonth() + 1) + "月"
				+ data.getDate() + "日" + data.getHours() + ":"
				+ data.getMinutes()+"，"); //TODO 获取日期
	}
	else{
		timetextarr=time.split("");
		if(timetextarr[4]>0){
			$("#datatag").text(
					"截至" + timetextarr[0]+timetextarr[1]+timetextarr[2]+timetextarr[3] + "年" +timetextarr[4]+ 
					timetextarr[5] + "月"
					+ timetextarr[6]+timetextarr[7] + "日" + timetextarr[8]+timetextarr[9] + ":"
					+ timetextarr[10]+timetextarr[11]+"，"); //TODO 获取日期
		}else{
			$("#datatag").text(
					"截至" + timetextarr[0]+timetextarr[1]+timetextarr[2]+timetextarr[3] + "年" + 
					timetextarr[5] + "月"
					+ timetextarr[6]+timetextarr[7] + "日" + timetextarr[8]+timetextarr[9] + ":"
					+ timetextarr[10]+timetextarr[11]+"，"); //TODO 获取日期
		}
	}


}

//加载数据总量数的显示
function loadTable() {
	//将线下值设置问0
	$("#spanup1").html(0);
	$("#spanup2").html(0);
	$("#spanup3").html(0);
	$("#spanup4").html(0);
	$("#spanup5").html(0);
	$("#spandown1").html(0);
	$("#spandown2").html(0);
	$("#spandown3").html(0);
	$("#spandown4").html(0);
	$("#spandown5").html(0);
	$("#in_count div:eq(" + 0 + ") span").html(0);
	$("#order_count div:eq(" + 0 + ") span").html(0);
	$("#finish_count div:eq(" + 0 + ") span").html(0);
	$("#back_count div:eq(" + 0 + ") span").html(0);
	$.ajax({
		type : 'post',// 测试 GET 生产POST
		async : true,
		//url : getOutUrl(getRootPath_web(), "/monitor/queryMonitorTotal?prodCatalog="+vp.busiType), //TODO
		url : getOutUrl(getRootPath_web(), "/monitor/queryMonitorTotal?prodCatalog="+vp.busiType+"&userParam="+locHref+"&type="+vp.cal), //TODO
		dataType : 'json',
		//data为获取的数据
		success : function(data) {
			if (data.rows == null){
				return;
			}

			//获取时间用来刷新数据
			time= data.time;
			//首页显示时间加载
			reloadData1(time);

			//5中订单总和
			var backCount=0;
			var processCount=0;
			var inCount=0;
			var orderCount=0;
			var finishCount=0;
			//线上
			var backCountspanup1=0;
			var processCountspanup1=0;
			var inCountspanup1=0;
			var orderCountspanup1=0;
			var finishCountspanup1=0;
			//线下统计
			var backCountspandown11=0;
			var processCountspandown11=0;
			var inCountspandown11=0;
			var orderCountspandown11=0;
			var finishCountspandown11=0;

			//线上明细
			var backCountspanup0=0;
			var backCountspanup3=0;
			var backCountspanup4=0;

			var processCountspanup0=0;
			var processCountspanup3=0;
			var processCountspanup4=0;

			var inCountspanup0=0;
			var inCountspanup3=0;
			var inCountspanup4=0;

			var orderCountspanup0=0;
			var orderCountspanup3=0;
			var orderCountspanup4=0;

			var finishCountspanup0=0;
			var finishCountspanup3=0;
			var finishCountspanup4=0;

			//线下明细
			var backCountspandown1=0;
			var backCountspandown2=0;
			var processCountspandown1=0;
			var processCountspandown2=0;
			var inCountspandown1=0;
			var inCountspandown2=0;
			var orderCountspandown1=0;
			var orderCountspandown2=0;
			var finishCountspandown1=0;
			var finishCountspandown2=0;

			//统计总数
			//后台返回5条数据，将数据进行解析展示
			for(var i=0;i<data.rows.length;i++){
				//总量的计算
				//console.log(data.rows[i].backCount);
				backCount+=data.rows[i].backCount;
				processCount+=data.rows[i].processCount;
				inCount+=data.rows[i].inCount;
				orderCount+=data.rows[i].orderCount;
				finishCount+=data.rows[i].finishCount;
				//线上统计计算
				if(data.rows[i].from=="0" || data.rows[i].from=="3" || data.rows[i].from=="4"){
					backCountspanup1+=data.rows[i].backCount;
					processCountspanup1+=data.rows[i].processCount;
					inCountspanup1+=data.rows[i].inCount;
					orderCountspanup1+=data.rows[i].orderCount;
					finishCountspanup1+=data.rows[i].finishCount;
				}else{
					backCountspandown11+=data.rows[i].backCount;
					processCountspandown11+=data.rows[i].processCount;
					inCountspandown11+=data.rows[i].inCount;
					orderCountspandown11+=data.rows[i].orderCount;
					finishCountspandown11+=data.rows[i].finishCount;
				}
				
				
				
				
			}
			
			for(var i=0;i<data.rows.length;i++){
				//线上统计计算
				//统计线上线下明细
				if(data.rows[i].from=="0" ){
					backCountspanup0=data.rows[i].backCount;
					processCountspanup0=data.rows[i].processCount;
					inCountspanup0=data.rows[i].inCount;
					orderCountspanup0=data.rows[i].orderCount;
					finishCountspanup0=data.rows[i].finishCount;
				}else if(data.rows[i].from=="3" ){
					backCountspanup3=data.rows[i].backCount;
					processCountspanup3=data.rows[i].processCount;
					inCountspanup3=data.rows[i].inCount;
					orderCountspanup3=data.rows[i].orderCount;
					finishCountspanup3=data.rows[i].finishCount;
				}
				else if(data.rows[i].from=="4"){
					console.log(data.rows[i].backCount);
					backCountspanup4=data.rows[i].backCount;
					processCountspanup4=data.rows[i].processCount;
					inCountspanup4=data.rows[i].inCount;
					orderCountspanup4=data.rows[i].orderCount;
					finishCountspanup4=data.rows[i].finishCount;
				}
				//线下的内容
				else if(data.rows[i].from=="1"){
					backCountspandown1=data.rows[i].backCount;
					processCountspandown1=data.rows[i].processCount;
					inCountspandown1=data.rows[i].inCount;
					orderCountspandown1=data.rows[i].orderCount;
					finishCountspandown1=data.rows[i].finishCount;
				}
				else{
					backCountspandown2=data.rows[i].backCount;
					processCountspandown2=data.rows[i].processCount;
					inCountspandown2=data.rows[i].inCount;
					orderCountspandown2=data.rows[i].orderCount;
					finishCountspandown2=data.rows[i].finishCount;
				}	
			}
			
			if("all" == vp.busiType){
				todayInCount = inCount;
				todayFinishCount = finishCount;
			}
			$("#in_count div span").html(inCount);
			$("#order_count div span").html(orderCount);
			$("#finish_count div span").html(finishCount);
			$("#back_count div span").html(backCount);
			$("#process_count div span").html(processCount);

			//昨日订单总量
			var yesterdaytotal=data.rows[0].backCount+data.rows[0].finishCount+data.rows[0].inCount+data.rows[0].orderCount
			+data.rows[0].processCount;
			//统计线上线下
			
			$("#spanup1box").find("span").html(inCountspanup1);
			$("#spanup2box").find("span").html(orderCountspanup1);
			$("#spanup3box").find("span").html(processCountspanup1);
			$("#spanup4box").find("span").html(finishCountspanup1);
			$("#spanup5box").find("span").html(backCountspanup1);
			$("#spandown1box").find("span").html(inCountspandown11);
			$("#spandown2box").find("span").html(orderCountspandown11);
			$("#spandown3box").find("span").html(processCountspandown11);
			$("#spandown4box").find("span").html(finishCountspandown11);
			$("#spandown5box").find("span").html(backCountspandown11);

			
			//console.log(inCountspanup0);
			//0=意向单、1=营业厅、2=社会渠道、3=客服中心、4=订单中心， 其中0、3、4算线上，1、2算线下
			$("#spanup1box1").find("#spanup11").html(inCountspanup4);
			$("#spanup1box1").find("#spanup12").html(inCountspanup3);
			$("#spanup1box1").find("#spanup13").html(inCountspanup0);

			$("#spanup2box1").find("#spanup21").html(orderCountspanup4);
			$("#spanup2box1").find("#spanup22").html(orderCountspanup3);
			$("#spanup2box1").find("#spanup23").html(orderCountspanup0);

			$("#spanup3box1").find("#spanup31").html(processCountspanup4);
			$("#spanup3box1").find("#spanup32").html(processCountspanup3);
			$("#spanup3box1").find("#spanup33").html(processCountspanup0);

			$("#spanup4box1").find("#spanup41").html(finishCountspanup4);
			$("#spanup4box1").find("#spanup42").html(finishCountspanup3);
			$("#spanup4box1").find("#spanup43").html(finishCountspanup0);

			$("#spanup5box1").find("#spanup51").html(backCountspanup4);
			$("#spanup5box1").find("#spanup52").html(backCountspanup3);
			$("#spanup5box1").find("#spanup53").html(backCountspanup0);


			$("#spandown1box1").find("#spandown11").html(inCountspandown1);
			$("#spandown1box1").find("#spandown12").html(inCountspandown2);

			$("#spandown2box1").find("#spandown21").html(orderCountspandown1);
			$("#spandown2box1").find("#spandown22").html(orderCountspandown2);

			$("#spandown3box1").find("#spandown31").html(processCountspandown1);
			$("#spandown3box1").find("#spandown32").html(processCountspandown2);

			$("#spandown4box1").find("#spandown41").html(finishCountspandown1);
			$("#spandown4box1").find("#spandown42").html(finishCountspandown2);

			$("#spandown5box1").find("#spandown51").html(backCountspandown1);
			$("#spandown5box1").find("#spandown52").html(backCountspandown2);


			$.each(data.rows, function(index, r) {
//				if (r.from == "a") {
//				ri = 0;
//				} else if (r.from == "0") {
//				ri = 2;
//				} else if (r.from == "1") {
//				ri = 3;
//				}
				if(index==0){
					ri = 0;
				}
				else{
					ri = index+1;
				}
				//累计数据
				//$("#in_count div:eq进行遍历
				/*$("#in_count div :eq(" + ri + ") span").html(r.inCount);
					$("#order_count div:eq(" + ri + ") span").html(r.orderCount);
					$("#finish_count div:eq(" + ri + ") span").html(r.finishCount);
					$("#back_count div:eq(" + ri + ") span").html(r.backCount);
				 */					
				$("#in_count div:eq(" + ri + ") span").attr("orderType", "inCount");
				$("#order_count div:eq(" + ri + ") span").attr("orderType", "orderCount");
				$("#process_count div:eq(" + ri + ") span").attr("orderType", "processCount");
				$("#finish_count div:eq(" + ri + ") span").attr("orderType", "finishCount");
				$("#back_count div:eq(" + ri + ") span").attr("orderType", "backCount");
				$("#in_count div:eq(" + ri + ") span").attr("dataType", r.inCount);
				$("#order_count div:eq(" + ri + ") span").attr("dataType", r.orderCount);
				$("#process_count div:eq(" + ri + ") span").attr("dataType", r.processCount);
				$("#finish_count div:eq(" + ri + ") span").attr("dataType", r.finishCount);
				$("#back_count div:eq(" + ri + ") span").attr("dataType", r.backCount);

			});	
		}
	});
}
//<span>标签中的点击-  时间地区线上线下汇总展示
function qryChartup(order) {
	//线上线下数据展示进入这里
	var charturl;
	var order1=order;
	if(from=="0" || from=="1"){
		charturl="?prodCatalog="+vp.busiType+"&userParam="+locHref+"&type="+vp.cal/*+"&from="+from*/;
	}
	else{
		charturl = "?prodCatalog="+vp.busiType+"&userParam="+locHref+"&type="+vp.cal;
	}
	
	//vp.busiType业务类型
	//from是线上还是线下
	//vp.orderType订单类型
	//var charturl = "?prodCatalog="+vp.busiType;vp.orderType
	if (vp.chartType == "area") {
		//chartdata = lineAdata();
		charturl = getOutUrl(getRootPath_web(), "/monitor/queryMonitorByArea"+charturl);
		//将查询的界面返回前台
		$.ajax({
			type : 'post',// 测试 GET 生产POST
			async : true,
			url : charturl,
			dataType : 'json',
			data:{
				prodCatalog:vp.busiType,
				userParam:locHref,
				type:vp.cal
			},
			success : function(chartdata) {
				if (chartdata.rows == null)
					return;
					loadchartright(chartdata);
			}

		});
	} 
	else if (vp.chartType == "hour") {
		//chartdata = lineHdata();
		charturl = getOutUrl(getRootPath_web(), "/monitor/queryMonitorByTime"+charturl);
		//console.log(charturl);
		//将查询的界面返回前台
		$.ajax({
			type : 'post',// 测试 GET 生产POST
			async : true,
			url : charturl,
			dataType : 'json',
			data:{
				prodCatalog:vp.busiType,
				userParam:locHref,
				type:vp.cal
			},
			success : function(chartdata) {
				if (chartdata.rows == null){
					return;
				}
				loadTimerightchart(chartdata);
			}
		});

	}
}

//加载销售线柱状图右侧
//加载销售线柱状图，并对柱状图进行格式控制
function loadchartright(chartdata) {
	var serieses = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var data_rows=chartdata.rows;
	//分区的数组
	var Area=["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云", "怀柔","门头沟","平谷","延庆","大客户中心","市支中心","客服中心","重通局","国际业务中心","集团客户","电子渠道","其它"]
	
	for(var i=0;i<data_rows.length;i++){
		if(data_rows[i].backCount==null)  data_rows[i].backCount=0;
		if(data_rows[i].finishCount==null)  data_rows[i].finishCount=0;
		if(data_rows[i].inCount==null)  data_rows[i].inCount=0;
		if(data_rows[i].orderCount==null)  data_rows[i].orderCount=0;
		if(data_rows[i].processCount==null)  data_rows[i].processCount=0;
	}
	
	var AreaPos = {};
	for (var i = 0; i < Area.length; i++){
		AreaPos[Area[i]] = i;
	}
	
	if(from=="0" & mingxiType==null){
		//线上点击
		for(var i=0;i<data_rows.length;i++){
			if(data_rows[i].from=="0" || data_rows[i].from=="3" || data_rows[i].from=="4"){
				serieses[AreaPos[data_rows[i].developerAreaName]] += data_rows[i][vp.orderType];
			}
		}
		
	} else if(from=="1" & mingxiType==null){
		//线下点击
		for(var i=0;i<data_rows.length;i++){
			if(data_rows[i].from=="1" || data_rows[i].from=="2"){
				serieses[AreaPos[data_rows[i].developerAreaName]] += data_rows[i][vp.orderType];
			}
		}
	}else if(mingxiType==null){
		for(var i=0;i<data_rows.length;i++){
			serieses[AreaPos[data_rows[i].developerAreaName]] += data_rows[i][vp.orderType];
		}
	}else{
		var vFrom = mingxiType.charAt(mingxiType.length-1);
		var vType = mingxiType.indexOf("inCount")>=0? "inCount": 
			(mingxiType.indexOf("orderCount")>=0? "orderCount":
				(mingxiType.indexOf("processCount")>=0? "processCount":
					(mingxiType.indexOf("finishCount")>=0? "finishCount":
						(mingxiType.indexOf("backCount")>=0? "backCount":"ERROR"))));
		for(var i=0;i<data_rows.length;i++){
			if(data_rows[i].from==vFrom){
				serieses[AreaPos[data_rows[i].developerAreaName]] += data_rows[i][vType];
			}
		}
	}
	
	EchartFunction(Area, serieses);
}

//加载时间柱状图，并对柱状图进行格式控制
function loadTimerightchart(chartdata) {
	var serieses =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var data_rows=chartdata.rows;
	//判断线上线下与子逻辑    falsemeup   falsemedown
	var linetypeon = $('#spanup1box').attr('typemeup')
	var  linetypedown = $('#spandown1box').attr('typemedown')
	//分区的数组
	var Area=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

	for(var i=0;i<data_rows.length;i++){
		if(data_rows[i].backCount==null)  data_rows[i].backCount=0;
		if(data_rows[i].finishCount==null)  data_rows[i].finishCount=0;
		if(data_rows[i].inCount==null)  data_rows[i].inCount=0;
		if(data_rows[i].orderCount==null)  data_rows[i].orderCount=0;
		if(data_rows[i].processCount==null)  data_rows[i].processCount=0;
		
		var timeArea = data_rows[i].timeArea
		if(timeArea.substr(timeArea.length-2,1)==0){
			data_rows[i].timeArea = timeArea.substr(timeArea.length-1,1)
		}
		else{
			data_rows[i].timeArea = timeArea.substr(timeArea.length-2,2) 
		}
	}

	var timePos = {};
	for (var i = 0; i < Area.length; i++){
		timePos[Area[i]] = i; 
	}
	
	if(from=="0" & mingxiType==null){
		//线上点击
		for(var i=0;i<data_rows.length;i++){
			if(data_rows[i].from=="0" || data_rows[i].from=="3" || data_rows[i].from=="4"){
				serieses[timePos[data_rows[i].timeArea]] += data_rows[i][vp.orderType];
			}
		}
		
	} else if(from=="1" & mingxiType==null){
		//线下点击
		for(var i=0;i<data_rows.length;i++){
			if(data_rows[i].from=="1" || data_rows[i].from=="2"){
				serieses[timePos[data_rows[i].timeArea]] += data_rows[i][vp.orderType];
			}
		}
	}else if(mingxiType==null){
		for(var i=0;i<data_rows.length;i++){
			serieses[timePos[data_rows[i].timeArea]] += data_rows[i][vp.orderType];
		}
	}else{
		var vFrom = mingxiType.charAt(mingxiType.length-1);
		var vType = mingxiType.indexOf("inCount")>=0? "inCount": 
			(mingxiType.indexOf("orderCount")>=0? "orderCount":
				(mingxiType.indexOf("processCount")>=0? "processCount":
					(mingxiType.indexOf("finishCount")>=0? "finishCount":
						(mingxiType.indexOf("backCount")>=0? "backCount":"ERROR"))));
		for(var i=0;i<data_rows.length;i++){
			if(data_rows[i].from==vFrom){
				serieses[timePos[data_rows[i].timeArea]] += data_rows[i][vType];
			}
		}
	}
	//console.log(serieses);
	EchartFunction(Area, serieses);
}

//画图展示方法函数
function EchartFunction(Area, serieses) {
	//获取柱形图区域ID
	var dom = document.getElementById("datachart");
	//初始化图表
	var myChart = echarts.init(dom);
	var app = {};
	option = {
			grid : {
				x : 100,
				x2 : 120,
				y2 : 100
			},

			tooltip : {

				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},

			color : '#F8B62D',
			xAxis : {
				type : 'category',
				data : Area,
				nameTextStyle : {
					fontSize : 10
				},
				axisLabel : {
					interval : 0,
					rotate : -60,
					formatter : function(value, index) {
						var rt = "";
						for (var i = 0; i < value.length; i++) {
							rt += value.substr(i, 1) + "\n";
						}
						rt = value;
						return rt;
					}
				}
			},
			yAxis : {
				type : 'value'
			},
			series : [ {
				data : serieses,
				type : 'bar'
			} ]
	};

	if (option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}