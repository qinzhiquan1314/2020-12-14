/**
 * 测试全流程监控总览
 */

//指标明细，如“互联网化来单”
var type = "btn1";

//指标大类 如“今日订单量”
var mainType = "IncountAreaTotal";

//展示类型选择（默认销售线）
var showSelect = "0";

//业务选择(默认宽带)
var businessSelect = "broadBand";

//施工类型选择（默认全部） 装机-1 移机-0 全部-all
var installSelect = "all";

//echars 表格类型
var tableType = 'p1';

//前台存储按销售线数据
var totalAreaDate;

//前台存储按小时数据
var totalTimeDate;

//业务大类（默认"宽带"）
var judgeBusiness = "kd";

var typeName = new Array();

//x轴显示
var barX;

//政企（非标准）查询表 day-日表，mouth-月表 year-年表
var timeSelect = "day";

var name;

var x = 10;
var y = 20;


/**
 * 界面加载
 */
$(function () {
	console.log("首页加载的时间是" + CurentTime());

    var liobj = $('#Lnav ul>li').eq(0);
    if(liobj.attr('id')==undefined){
    	return;
    }
	$('#Lnav ul>li').eq(0).addClass('Lcheck').siblings().removeClass('Lcheck');
    $('.tables>li').eq(0).addClass('on').siblings().removeClass('on');
    if(liobj.attr('id')=="overview"){
    	//初始化
    	overviewOnload();
    	tabOnload(intervalOverview);
    }else{
    	liobj.trigger("click");
    }
});

function overviewOnload() {
	//加载时，echar的宽度设置为body的75%
	$("#barTable").css('width', $(document.body).width() * 0.72);

	//标题时间和数据量处理
	titleCountAll(businessSelect, installSelect);

	//获取后台数据并给前台赋值
	getShowDate(businessSelect, installSelect ,timeSelect);

	//判断报表类型和标签类型
	tableType = judgeTableType(type, showSelect);

	if(judgeBusiness !="fb"){ //政企（非标准）没有时间维度
		//获取时间全部数据
		getTimeDate(type, showSelect, businessSelect, installSelect, mainType);
	}

	//获取销售线全部数据
	getAreaDate(type, showSelect, businessSelect, installSelect, mainType,timeSelect);

	//echars数据
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

	//绘制echars
	createEchars(tableType, data);
}

/**
 * 刷新数据
 */
function reloadData() {
	console.log("首页加载的时间是" + CurentTime());

	//标题时间和数据量处理(默认展示全部)
	titleCountAll(businessSelect, installSelect);

	//获取后台数据并给前台赋值
	getShowDate(businessSelect, installSelect,timeSelect);

	if(judgeBusiness !="fb"){
		//获取时间全部数据
		getTimeDate(type, showSelect, businessSelect, installSelect, mainType);
	}

	//获取销售线全部数据
	getAreaDate(type, showSelect, businessSelect, installSelect, mainType,timeSelect);
}


/**
 * 判断所选业务大类及对应总览显示
 * @param time
 */
function judgeBusinessSelect(businessSelect) {
	if (businessSelect == "broadBand" || businessSelect == "CP" || businessSelect == "40") { //宽带
		$("div .topText").eq(0).removeClass("hide").addClass("show");
		$("div .topText").eq(1).removeClass("show").addClass("hide");
		$("div .topText").eq(2).removeClass("show").addClass("hide");
		$("div .topText").eq(3).removeClass("show").addClass("hide");
		judgeBusiness = "kd";
	} else if (businessSelect == "mobile" || businessSelect == "2I" || businessSelect == "2C") { //移网
		$("div .topText").eq(0).removeClass("show").addClass("hide");
		$("div .topText").eq(1).removeClass("hide").addClass("show");
		$("div .topText").eq(2).removeClass("show").addClass("hide");
		$("div .topText").eq(3).removeClass("show").addClass("hide");
		judgeBusiness = "yw";
	} else if (businessSelect == "enterprise" || businessSelect == "67" || businessSelect == "41") { //政企（标准化）
		$("div .topText").eq(0).removeClass("show").addClass("hide");
		$("div .topText").eq(1).removeClass("show").addClass("hide");
		$("div .topText").eq(2).removeClass("hide").addClass("show");
		$("div .topText").eq(3).removeClass("show").addClass("hide");
		judgeBusiness = "zq";
	}else if(businessSelect == "offstand" || businessSelect == "68" || businessSelect == "69"){ //政企（非标准）
		$("div .topText").eq(0).removeClass("show").addClass("hide");
		$("div .topText").eq(1).removeClass("show").addClass("hide");
		$("div .topText").eq(2).removeClass("show").addClass("hide");
		$("div .topText").eq(3).removeClass("hide").addClass("show");
		judgeBusiness = "fb";
	}
}

/**
 * 标题数据
 */
function titleCountAll(businessSelect, installSelect) {
	//判断业务大类， kd-宽带，yw-移网，zq-政企（标准化），fb-政企（非标准）
	judgeBusinessSelect(businessSelect);

	var business;
	if (judgeBusiness == "kd") {
		business = "broadBand";
	} else if (judgeBusiness == "yw") {
		business = "mobile";
	} else if (judgeBusiness == "zq") {
		business = "enterprise";
	} else if(judgeBusiness == "fb"){
		business = "offstand";
	}

	var context="北京公司今日累计总订单量";
	var data = {
		userParam: locHref,
		businessSelect: business,
		installSelect: installSelect,
		timestamp: Date.parse(new Date())
	}
	$.ajax({
		type: 'post',
		url: getOutUrl(getRootPath_web(), "/monitor/queryMonitorTotal?businessSelect=" + business + '&userParam=' + locHref + '&installSelect=' + installSelect + "&timestamp=" + Date.parse(new Date())),
		dataType: 'json',
		data: data,
		cache: false,
		success: function (data) {
			if (data.state == '1') {
				if (judgeBusiness == "kd") {
					$("#kd_total_ord_num").html(data.TodayTotal);
					$("#kd_finish_num").html(data.totalFinishcount);
					$("#kd_out_time_num").html(data.totalOvercount);
					$("#kd_last_day_num").html(data.YeatodayTotal);
				} else if (judgeBusiness == "yw") {
					$("#total_ord_num").html(data.vo.totalOrderNum);
					$("#ord_num").html(data.vo.orderNum);
					$("#yes_ord_num").html(data.vo.yesOrderNum);
					$("#deliver_num").html(data.vo.deliverNum);
					$("#active_num").html(data.vo.activeNum);
					$("#charge_num").html(data.vo.chargeNum);
					$("#sum_deliver_num").html(data.vo.sumDeliverNum);
				} else if (judgeBusiness == "zq") {
					$("#zq_total_ord_num").html(data.TodayTotal);
					$("#zq_finish_num").html(data.totalFinishcount);
					$("#zq_out_time_num").html(data.totalOvercount);
					$("#zq_last_day_num").html(data.YeatodayTotal);
				} else if (judgeBusiness == "fb"){
					$("#fb_total_order_num").html(data.vo.totalOrderNum);
					$("#fb_finish_num").html(data.vo.finishNum);
					$("#fb_deliver_num").html(data.vo.deliverNum);
					$("#fb_outTime_num").html(data.vo.outTimeNum);
					$("#fb_yesOrder_num").html(data.vo.yesOrderNum);
					context="北京分公司今日累计总受理量";
				}

				//显示数据加载时间
				reloadData1(data.time,context);
			}
		}
	});
}


/**
 * 加载日期并显示
 * @param time
 */
function reloadData1(time,context) {
	var timetextarr;
	timetextarr = time.split("");
	$(".datatag").text(
		"截至" + timetextarr[0] + timetextarr[1] + timetextarr[2] + timetextarr[3] + "年" + timetextarr[4] +
		timetextarr[5] + "月"
		+ timetextarr[6] + timetextarr[7] + "日" + timetextarr[8] + timetextarr[9] + ":"
		+ timetextarr[10] + timetextarr[11] + "，"+context); //TODO 获取日期
}

/**
 * 通过type判断echars表格类型，和数据大类
 * @param type
 * @param showSelect
 * @returns {string}
 */
function judgeTableType(type, showSelect) {
	var typeSubs = type.substring(0, 3);

	if (judgeBusiness == "yw") {
		//判断数据大类和
		if (typeSubs == "bg7" || type == "btn7") {
			mainType = 'mobileOrderArea';
			name = "今日订单量";
		} else if (typeSubs == "bg8" || type == "btn8") {
			mainType = 'mobileSumDeliverArea';
			name = "累计待交付量";
		} else if (typeSubs == "bg9" || type == "btn9") {
			mainType = 'mobileDeliverArea';
			name = "今日交付量";
		} else if (typeSubs == "bg10" || type == "btn10") {
			mainType = 'mobileActiveArea';
			name = "今日激活量";
		} else if (typeSubs == "bg11" || type == "btn11") {
			mainType = '';
			name = "今日首充量";
		} else if (typeSubs == "bg12" || type == "btn12") {
			mainType = 'mobileBackArea';
			name = "今日退单量";
		}

		//判断报表类型
		var typeEnd = type.substr(type.lastIndexOf("_") + 1, 2);
		console.log("获取的值是" + typeEnd);
		if (typeEnd == "sz") { //市区
			tableType = 'p17';
		} else if (typeEnd == "jj") { //近郊
			tableType = 'p18';
		} else if (typeEnd == "yj") {  //远郊
			tableType = 'p19';
		} else if (typeEnd == "qt") {  //中心
			tableType = 'p20';
		} else {
			tableType = 'p21';
		}
	} else if (judgeBusiness == "kd" || judgeBusiness == "zq") {
		//判断数据大类和
		if (typeSubs == "bg1" || type == "btn1") {
			mainType = 'IncountAreaTotal';
			name = "今日订单量";
		} else if (typeSubs == "bg2" || type == "btn2") {
			mainType = 'totalOrdercount';
			name = "今日受理量";
		} else if (typeSubs == "bg3" || type == "btn3") {
			mainType = 'totalProcesscountArea';
			name = "累计在途量";
		} else if (typeSubs == "bg4" || type == "btn4") {
			mainType = 'totalOvercount';
			name = "超时订单量";
		} else if (typeSubs == "bg5" || type == "btn5") {
			mainType = 'totalFinishcount';
			name = "今日竣工量";
		} else if (typeSubs == "bg6" || type == "btn6") {
			mainType = 'totalBackcountArea';
			name = "今日撤单量";
		}


		//判断报表类型
		if (typeSubs == "bg1" || typeSubs == "bg2" || type == "btn1" || type == "btn2") {
			tableType = 'p1';
		} else if (typeSubs == "bg3" || typeSubs == "bg4") {
			var typeEnd = type.substring(type.lastIndexOf("_") + 1);
			if (typeEnd == "city") {
				tableType = 'p5';
			} else if (typeEnd == "suburbs") {
				tableType = 'p8';
			} else if (typeEnd == "outskirts") {
				tableType = 'p9';
			} else if (typeEnd == "important") {
				tableType = 'p10';
			} else {
				tableType = 'p11';
			}
		} else if (type == "btn5") {
			tableType = 'p2';
		} else if (typeSubs == "bg6" || type == "btn3" || type == "btn4") {
			if (type == "bg6_ord" || type == "bg6_install") {
				tableType = 'p3';
			} else if (type == "bg6_rception") {
				tableType = 'p16';
			} else if (type == "bg6_on_line") {
				tableType = 'p1';
			} else {
				tableType = 'p4';
			}
		} else if (type == "btn6") {
			tableType = 'p6';
		} else if (typeSubs == "bg5") {
			var typeEnd = type.substring(type.lastIndexOf("_") + 1);
			if (typeEnd == "city") {
				tableType = 'p12';
			} else if (typeEnd == "suburbs") {
				tableType = 'p13';
			} else if (typeEnd == "outskirts") {
				tableType = 'p14';
			} else if (typeEnd == "important") {
				tableType = 'p15';
			}
		}
	}else if(judgeBusiness == "fb"){
		tableType = 'p1';
		//判断数据大类(导出使用)
		if (type == "btn13") {
			mainType = 'offstandOrderArea';
			name = "受理量";
		}else if(type == "btn14"){
			mainType = 'offstandWorkArea';
			name = "开通施工量";
		}else if(type == "btn15"){
			mainType = 'offstandBuildArea';
			name = "资源建设单";
		}else if(type == "btn16"){
			mainType = 'offstandFinishArea';
			name = "竣工量";
		}else if(type == "btn17"){
			mainType = 'offstandDeliverArea';
			name = "上账量";
		}else if(type == "btn18"){
			mainType = 'offstandCancelArea';
			name = "注销量";
		}
	}


	//如果是按小时展示，统一走一个echars展示类型
	if (showSelect == '1') {
		tableType = 'p7';
	}
	return tableType;
}

function getAreaDate(type, showSelect, businessSelect, installSelect, mainType,timeSelect) {
	$.ajax({
		type: 'post',
		url: getOutUrl(getRootPath_web(), "/monitor/queryMonitorByAreaEchart?userParam=" + locHref + '&showSelect='
			+ showSelect + '&businessSelect=' + businessSelect
			+ '&installSelect=' + installSelect
			+ '&mainType=' + mainType + "&timestamp=" + Date.parse(new Date())+ "&timeSelect=" + timeSelect),
		dataType: 'json',
		async: false,
		data: {
			"businessSelect": businessSelect,
			"installSelect": installSelect,
			"userParam": locHref,
			"showSelect": showSelect,
			"mainType": mainType,
			"timestamp": Date.parse(new Date()),
			"timeSelect": timeSelect
		},
		success: function (data) {
			totalAreaDate = data;
		}
	});
}


/**
 * 后台获取data值(按小时)
 * @param type
 * @param showSelect
 * @param businessSelect
 * @param installSelect
 * @param mainType
 */
function getTimeDate(type, showSelect, businessSelect, installSelect, mainType) {
	$.ajax({
		type: 'post',
		url: getOutUrl(getRootPath_web(), "/monitor/queryMonitorByTimeEchart?userParam=" + locHref + '&showSelect=' + showSelect + '&businessSelect=' + businessSelect + '&installSelect=' + installSelect + '&mainType=' + mainType + "&timestamp=" + Date.parse(new Date())),
		dataType: 'json',
		async: false,
		data: {
			"businessSelect": businessSelect,
			"installSelect": installSelect,
			"userParam": locHref,
			"showSelect": showSelect,
			"mainType": mainType,
			"timestamp": Date.parse(new Date())
		},
		success: function (data) {
			totalTimeDate = data;
		}
	});
}

/**
 * 根据表格类型和数据画出echar图像
 * @param tableType
 * @param data
 */
function createEchars(tableType, data) {
	if (tableType == "p1" || tableType == "p2" || tableType == "p3" || tableType == "p7" || tableType == "p12" || tableType == "p13" || tableType == "p14" || tableType == "p15" || tableType == "p16") {
		bar1(tableType, data);
	} else if (tableType == "p5" || tableType == "p8" || tableType == "p9" || tableType == "p10" || tableType == "p11" || tableType == "p4") {
		bar2(tableType, data);
	} else if (tableType == "p6") {
		bar3(tableType, data);
	} else if (tableType == "p17" || tableType == "p18" || tableType == "p19" || tableType == "p20" || tableType == "p21") {
		bar4(tableType, data);
	}
}

/**
 * 移网-今日订单量-指标明细二级分类显示切换
 */
function srcChage(srcArrNum){
	var srcArr = ["group2iNum","group2cNum","woNum","threePart","offLine1"];
	console.log("获取的srcArrNum值是"+srcArrNum);
	for(var i=0;i<srcArr.length;i++){
		if($("#"+srcArr[i]+"").hasClass("show")){
			//之前展示的隐藏
			$("#"+srcArr[i]+"").removeClass("show").addClass("hide");
			break;
		}
	}
	//对应的指标展示
	$("#"+srcArrNum+"").removeClass("hide").addClass("show");
}


/**
 * 点击移网-今日订单量-指标明细小三角
 */
$("#btn_bg7_d div .text1 img").click(function () {
	var srcId=$(this).attr("id");
	type = srcId.substring(0,srcId.lastIndexOf("_"));
	//选中变色
	bgDetailColor($("#"+type+""));
	var srcArrNum =type.substring(type.indexOf("_")+1);
	//二级分类显示切换
	srcChage(srcArrNum);

	//数据大类赋值、获取报表类型
	tableType = judgeTableType(type, showSelect);

	//报表数据获取
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

	//echars 标题
	$("#type_title").html($("#"+type+"").attr("name"));

	//报表创建
	createEchars(tableType, data);

});

/**
 * 施工类型切换
 */
$("#chooseDiv3_on span").click(function () {
	if (!$(this).hasClass("spcheck")) {
		$(this).siblings(".spcheck").removeClass("spcheck");
		$(this).addClass("spcheck");
	}
	installSelect = $(this).attr("type");

	//获取后台数据并给前台赋值
	getShowDate(businessSelect, installSelect,timeSelect);

	//判断报表类型
	tableType = judgeTableType(type, showSelect);

	//获取时间全部数据
	getTimeDate(type, showSelect, businessSelect, installSelect, mainType);

	//获取销售线全部数据
	getAreaDate(type, showSelect, businessSelect, installSelect, mainType,timeSelect);

	//echars数据
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

	//绘制echars
	createEchars(tableType, data);
});


/**
 * 当日、当月、当年切换
 */
$("#chooseDiv4_on span").click(function () {
	console.log("获取html值是"+$(this).html());
	if (!$(this).hasClass("spcheck")) {
		$(this).siblings(".spcheck").removeClass("spcheck");
		$(this).addClass("spcheck");
	}
	timeSelect = $(this).attr("type");

	//获取后台数据并给前台赋值
	getShowDate(businessSelect, installSelect,timeSelect);

	//判断报表类型
	tableType = judgeTableType(type, showSelect);

	//获取销售线全部数据
	getAreaDate(type, showSelect, businessSelect, installSelect, mainType,timeSelect);

	//echars数据
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

	//绘制echars
	createEchars(tableType, data);
})

/**
 * 按销售线展示、按小时展示切换
 */
$("#select11,#select22,#select55").click(function () {
	var id = $(this).attr("id");
	if(id=="select22"){
		showSelect = "1";
		$("#select11").removeClass("slcheck");
		$("#select22").addClass("slcheck");
	}else{
		showSelect = "0";
		if(id=="select11"){
			$("#select22").removeClass("slcheck");
			$("#select11").addClass("slcheck");
		}
	}
	tableType = judgeTableType(type, showSelect);
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);
	createEchars(tableType, data);
});


//导出
$("#select33,#select44,#select66").click(function () {
	var id = $(this).attr("id");
	if(id=="select44"){ //按小时
		$.download(
			getOutUrl(getRootPath_web(), "/monitor/exportMonitorByTime?mainType=" + mainType + "&userParam="
				+ locHref + "&businessSelect=" + businessSelect + "&installSelect=" + installSelect), 'post'); // 下载文件
	}else{ //按销售线
		$.download(getOutUrl
		(getRootPath_web(), "/monitor/exportMonitorByArea?mainType=" + mainType + "&userParam="
			+ locHref + "&businessSelect=" + businessSelect + "&installSelect=" + installSelect+ "&timeSelect=" + timeSelect), 'post');
	}
});
/*/!**
 * 请求后台，获取echars数据
 *!/
$("#select11").click(function () {
	$("#select22").removeClass("slcheck");
	$("#select11").addClass("slcheck");
	showSelect = "0";
	tableType = judgeTableType(type, showSelect);
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);
	createEchars(tableType, data);
});*/


/*/!**
 * 销售线与小时切换
 *!/
$("#select22").click(function () {
	$("#select11").removeClass("slcheck");
	$("#select22").addClass("slcheck");
	showSelect = "1";
	tableType = judgeTableType(type, showSelect);
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);
	createEchars(tableType, data);
});*/


/*/!**
 * 按销售线导出
 *!/
$("#select33").click(function () {
	$.download(getOutUrl
	(getRootPath_web(), "/monitor/exportMonitorByArea?mainType=" + mainType + "&userParam="
		+ locHref + "&businessSelect=" + businessSelect + "&installSelect=" + installSelect+ "&timeSelect=" + timeSelect), 'post'); // 下载文件
});

/!**
 * 按小时导出
 *!/
$("#select44").click(function () {
	$.download(
		getOutUrl(getRootPath_web(), "/monitor/exportMonitorByTime?mainType=" + mainType + "&userParam="
			+ locHref + "&businessSelect=" + businessSelect + "&installSelect=" + installSelect), 'post'); // 下载文件
});*/

/**
 * echars 图随界面放缩改变宽度
 */
$(window).resize(function () {
	$("#barTable div").css('width', $(document.body).width() * 0.72);
	$("#barTable div canvas").css('width', $(document.body).width() * 0.72);
});


/**
 * 获取展示数据
 * @param businessSelect
 * @param installSelect
 */
function getShowDate(businessSelect, installSelect ,timeSelect) {
	$.ajax({
		type: 'post', //测试get，正式post
		cache: false,
		dataType: 'json',
		async: false,
		url: getOutUrl(getRootPath_web(), "/monitor/queryMonitorByArea?userParam=" + locHref + "&businessSelect=" + businessSelect + "&installSelect=" + installSelect + "&timestamp=" + Date.parse(new Date())+ "&timeSelect=" + timeSelect),
		data: {
			"businessSelect": businessSelect,
			"installSelect": installSelect,
			"userParam": locHref,
			"timestamp": Date.parse(new Date()),
			"timeSelect": timeSelect
		},
		error: function () {
			console.error("出现异常");
		},
		success: function (data) {
			if (data.state == "1") {
				if (judgeBusiness == "kd" || judgeBusiness == "zq") { //-- 宽带或政企（标准化）
					$("#img1d").html(data.rows[0].incountAreaTotal);//订单量合计
					$("#bg1_internet").html(data.rows[0].totalInCountTotal); //互联网来单
					$("#bg1_one_stop").html(data.rows[0].onestationInCountTotal); //其中一站式交付：
					if (businessSelect == "41" || businessSelect == "67") {
						$("#bg1_wo").html(data.rows[0].woInCount); //沃易售
						$("#bg1_shop").html("-");//集团商城
						$("#bg1_inter").html(data.rows[0].hallInCount);//北京网厅
						$("#bg1_under_line").html(data.rows[0].outlineInCount);//线下实体来单
						$("#bg1_call").html("-");//电话营销
						$("#bg1_three").html("-");//第三方合作
						$("#bg1_other").html("-");//其他
					} else {
						$("#bg1_wo").html(data.rows[0].woInCount); //沃易售
						$("#bg1_shop").html(data.rows[0].groupInCount);//集团商城
						$("#bg1_inter").html(data.rows[0].hallInCount);//北京网厅
						$("#bg1_under_line").html(data.rows[0].outlineInCount);//线下实体来单
						$("#bg1_call").html(data.rows[0].telInCount);//电话营销
						$("#bg1_three").html(data.rows[0].thirdInCount);//第三方合作
						$("#bg1_other").html(data.rows[0].otherInCount);//其他
					}

					$("#bg1_business_hall").html(data.rows[0].busiInCount);//营业厅
					$("#bg1_society").html(data.rows[0].channelInCount);//社会渠道
					//console.log("今日订单量加载数据正常");

					$("#img2d").html(data.rows[0].totalOrdercount);//受理量合计
					$("#bg2_city1").html(data.rows[0].szOrderCount);//中台受理
					$("#bg2_call").html(data.rows[0].hjOrderCount);//客服中心
					$("#bg2_install").html(data.rows[0].zwOrderCount);//装维行销
					$("#bg2_business_hall").html(data.rows[0].yyOrderCount);//营业厅：
					$("#bg2_society").html(data.rows[0].sqOrderCount);//社会渠道
					//console.log("今日受理量加载数据正常");

					$("#img3d").html(data.rows[0].totalProcesscountArea);//在途量总计
					$("#bg3_city").html(data.rows[0].sqProcesscount);//市区
					$("#bg3_suburbs").html(data.rows[0].jqProcesscount); //近郊
					$("#bg3_outskirts").html(data.rows[0].yjProcesscount);//远郊
					$("#bg3_important").html(data.rows[0].ztProcesscount);//中通局
					$("#bg3_other").html(data.rows[0].otherProcesscount);//其他
					//console.log("累计在途量加载数据正常");

					if (businessSelect == "67") {
						$("#img4d").html("-");//超时订单量统计
						$("#bg4_city").html("-");//市区
						$("#bg4_suburbs").html("-"); //近郊
						$("#bg4_outskirts").html("-");//远郊
						$("#bg4_important").html("-");//中通局
						$("#bg4_other").html("-");//其他
					} else {
						$("#img4d").html(data.rows[0].totalOvercount);//超时订单量统计
						$("#bg4_city").html(data.rows[0].sqOvercount);//市区
						$("#bg4_suburbs").html(data.rows[0].jqOvercount); //近郊
						$("#bg4_outskirts").html(data.rows[0].yjOvercount);//远郊
						$("#bg4_important").html(data.rows[0].ztOvercount);//中通局
						$("#bg4_other").html(data.rows[0].otherOvercount);//其他
					}

					//console.log("累计超时量加载数据正常");

					$("#img5d").html(data.rows[0].totalFinishcount);//今日竣工量
					$("#bg5_city").html(data.rows[0].sqFinishcount);//市区
					$("#bg5_suburbs").html(data.rows[0].jqFinishcount); //近郊
					$("#bg5_outskirts").html(data.rows[0].yjFinishcount);//远郊
					$("#bg5_important").html(data.rows[0].ztFinishcount);//中通局
					//$("#bg5_other").html(data.rows[0].otherFinishcount);//中通局
					//console.log("今日竣工量加载数据正常");

					$("#img6d").html(data.rows[0].totalBackcountArea);//撤单量统计
					$("#bg6_rception").html(data.rows[0].qtBackCount);//撤单量--前台注销
					$("#bg6_install").html(data.rows[0].zwBackCount);//撤单量--装维退单
					//console.log("今日撤单量加载数据正常");
				} else if (judgeBusiness == "yw") {//--移网
					//今日订单量
					$("#orderNum").html(data.rows[0].orderNum);//订单量
					$("#bg7_group2iNum").html(data.rows[0].group2iNum);//集团2I
					$("#bg7_group2cNum").html(data.rows[0].group2cNum);//集团商城2C

					if (data.rows[0].top12iName != null && data.rows[0].top12iName != "") {
						$("#bg7_top12iName").html(data.rows[0].top12iName + "<span id='bg7_top12iNum' type='btn_detail' name=" + data.rows[0].top12iName + "  class='cursor yw'>" + data.rows[0].top12iNum + "</span>");//集团2i订单最多的名称
					} else {
						$("#bg7_top12iName").html("");//集团2i订单最多的名称
					}
					if (data.rows[0].top22iName != null && data.rows[0].top22iName != "") {
						$("#bg7_top22iName").html(data.rows[0].top22iName + "<span id='bg7_top22iNum' type='btn_detail' name=" + data.rows[0].top22iName + " class='cursor yw'>" + data.rows[0].top22iNum + "</span>");//集团2i订单最二多的名称
					} else {
						$("#bg7_top22iName").html("");//集团2i订单最二多的名称
					}
					if (data.rows[0].top32iName != null && data.rows[0].top32iName != "") {
						$("#bg7_top32iName").html(data.rows[0].top32iName + "<span id='bg7_top32iNum' type='btn_detail' name=" + data.rows[0].top32iName + "  class='cursor yw'>" + data.rows[0].top32iNum + "</span>");//集团2i订单最三多的名称
					} else {
						$("#bg7_top32iName").html("");//集团2i订单最三多的名称
					}

					$("#bg7_net2cNum").html(data.rows[0].net2cNum);//网厅
					$("#bg7_hall2cNum").html(data.rows[0].hall2cNum);//手厅
					$("#bg7_other2cNum").html(data.rows[0].other2cNum);//其他

					//存储集团2i订单前三多的英文名称
					$("#bg7_top12iCode").attr("type", data.rows[0].top12iCode);
					$("#bg7_top22iCode").attr("type", data.rows[0].top22iCode);
					$("#bg7_top32iCode").attr("type", data.rows[0].top32iCode);

					$("#bg7_woNum").html(data.rows[0].woNum); //沃易售
					$("#bg7_threePart").html(data.rows[0].thirdNum); //第三方
					$("#bg7_intentionNum").html(data.rows[0].intentionNum); //意向单
					$("#bg7_mNum").html(data.rows[0].mNum); //码销
					$("#bg7_schoolNum").html(data.rows[0].schoolNum); //校园
					$("#bg7_otherNum").html(data.rows[0].otherNum); // 其他

					//累计待交付量
					$("#sumDeliverNum").html(data.rows[0].sumDeliverNum);//累计交付量
					$("#bg8_szSumDeliverNum").html(data.rows[0].szSumDeliverNum);//市区
					$("#bg8_jjSumDeliverNum").html(data.rows[0].jjSumDeliverNum);//近郊
					$("#bg8_yjSumDeliverNum").html(data.rows[0].yjSumDeliverNum);//远郊
					$("#bg8_qtSumDeliverNum").html(data.rows[0].qtSumDeliverNum);//中心

					//今日交付量
					$("#deliverNum").html(data.rows[0].deliverNum);//今日交付量
					$("#bg9_szDeliverNum").html(data.rows[0].szDeliverNum);//市区
					$("#bg9_jjDeliverNum").html(data.rows[0].jjDeliverNum);//近郊
					$("#bg9_yjDeliverNum").html(data.rows[0].yjDeliverNum);//远郊
					$("#bg9_qtDeliverNum").html(data.rows[0].qtDeliverNum);//中心

					//今日激活量
					$("#activeNum").html(data.rows[0].activeNum);//激活量
					$("#bg10_szActiveNum").html(data.rows[0].szActiveNum);//市区
					$("#bg10_jjActiveNum").html(data.rows[0].jjActiveNum);//近郊
					$("#bg10_yjActiveNum").html(data.rows[0].yjActiveNum);//远郊
					$("#bg10_qtActiveNum").html(data.rows[0].qtActiveNum);//中心

					//今日退单量
					$("#backNum").html(data.rows[0].backNum);//退单量
					$("#bg12_ztNum").html(data.rows[0].ztNum);//中台退单
					$("#bg12_wlNum").html(data.rows[0].wlNum);//物流退件退单
					$("#bg12_yxNum").html(data.rows[0].yxNum);//意向单退单
					$("#bg12_jtNum").html(data.rows[0].jtNum);//集团商城退单
					$("#bg12_dayNum").html(data.rows[0].dayNum);//25天未激活退单
				}else if(judgeBusiness == "fb"){ //政企（非标准）
					$("#img13d").html(data.rows[0].orderNum); //受理量
					$("#img14d").html(data.rows[0].workNum); //开通施工量
					$("#img15d").html(data.rows[0].buildNum); //资源建设单
					$("#img16d").html(data.rows[0].finishNum); //竣工量
					$("#img17d").html(data.rows[0].deliverNum); //上账量
					$("#img18d").html(data.rows[0].cancelNum); //注销量
				}
			} else {
				console.error("出现异常");
			}
		}
	});
}


/**
 * 获取指标与后台对应的名称
 * @param type
 */
function getTypeValueTypeName(type) {
	//清空数组
	typeName.length = 0;

	//--政企（标准化）、宽带
	//今日订单量
	if (type == "bg1_internet") { //互联网来单
		typeName[0] = "total_in_count";
	} else if (type == "bg1_one_stop") { //其中一站式交付：
		typeName[0] = "onestation_in_count";
	} else if (type == "bg1_wo") { //沃易售
		typeName[0] = "wo_in_count";
	} else if (type == "bg1_shop") { //集团商城
		typeName[0] = "group_in_count";
	} else if (type == "bg1_inter") { //北京网厅
		typeName[0] = "hall_in_count";
	} else if (type == "bg1_call") { //电话营销
		typeName[0] = "tel_in_count";
	} else if (type == "bg1_three") { //第三方合作
		typeName[0] = "third_in_count";
	} else if (type == "bg1_other") { //其他
		typeName[0] = "other_in_count";
	} else if (type == "bg1_business_hall") { //营业厅
		typeName[0] = "busi_in_count";
	} else if (type == "bg1_society") { //社会渠道
		typeName[0] = "channel_in_count";
	} else if (type == "btn1") { //今日订单量
		typeName[0] = "total_count";
	} else if (type == "bg1_under_line") { //线下实体来单
		typeName[0] = "outline_in_count";
	}

	//今日受理量
	else if (type == "bg2_city1") { //中台受理
		typeName[0] = "sz_order_count";
	} else if (type == "bg2_call") { //客服中心
		typeName[0] = "hj_order_count";
	} else if (type == "bg2_install") { //装维行销
		typeName[0] = "zw_order_count";
	} else if (type == "bg2_business_hall") { //营业厅：
		typeName[0] = "yy_order_count";
	} else if (type == "bg2_society") { //社会渠道
		typeName[0] = "sq_order_count";
	} else if (type == "btn2") { //今日受理量
		typeName[0] = "total_count";
	}

	//累计在途量
	else if (type == "bg3_city") { //市区
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg3_suburbs") { //近郊
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg3_outskirts") { //远郊
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg3_important") { //中通局
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg3_other") { //其他
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "btn3") { //累计在途量
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	}

	//累计超时量
	else if (type == "bg4_city") { //市区
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg4_suburbs") { //近郊
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg4_outskirts") { //远郊
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg4_important") { //中通局
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "bg4_other") { //其他
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	} else if (type == "btn4") { //累计超时量
		typeName[0] = "count_3";
		typeName[1] = "count_14";
		typeName[2] = "count_other";
	}

	//今日竣工量
	else if (type == "bg5_city") { //市区
		typeName[0] = "finish_count";
	} else if (type == "bg5_suburbs") { //近郊
		typeName[0] = "finish_count";
	} else if (type == "bg5_outskirts") { //远郊
		typeName[0] = "finish_count";
	} else if (type == "bg5_important") { //中通局
		typeName[0] = "finish_count";
	} else if (type == "btn5") { //今日竣工量
		typeName[0] = "finish_count";
	}

	//撤单量
	else if (type == "bg6_rception") { //前台注销
		typeName[0] = "qt_back_count";
	} else if (type == "bg6_install") { //中台处理退单
		typeName[0] = "zw_back_count";
	} else if (type == "bg6_ord") { //意向单
		typeName[0] = "yy_back_count";
	} else if (type == "bg6_on_line") { //线上订单取消
		typeName[0] = "td_back_count";
	} else if (type == "btn6") { //撤单量
		typeName[0] = "qt_back_count";
		typeName[1] = "zw_back_count";
	}

	//-- 政企(非标准)
	else if(type == "btn13"){
		typeName[0] ="order_num";
	}else if(type == "btn14"){
		typeName[0] ="work_num";
	}else if(type == "btn15"){
		typeName[0] ="build_num";
	}else if(type == "btn16"){
		typeName[0] ="finish_num";
	}else if(type == "btn17"){
		typeName[0] ="deliver_num";
	}else if(type == "btn18"){
		typeName[0] ="cancel_num";
	}

	//--移网
	if (judgeBusiness == "yw") {
		//交付节点
		typeName[0] = "00"; //物流上门
		typeName[1] = "01"; //装维
		typeName[2] = "02"; //营业厅
		typeName[3] = "03"; //综合网格
		typeName[4] = "04"; //电商自有
		typeName[5] = "05"; //电商交付2队
		typeName[6] = "06"; //分公司团队
		typeName[7] = "99"; //退单管理
		typeName[8] = "999"; //其他
	}
}


function dealbarAreaBack(barX, dealdata, newdata) {
	for (var n = 0; n < typeName.length; n++) {
		for (var i = 0; i < newdata.length; i++) {
			for (var j = 0; j < barX.length; j++) {
				if (barX[j] == newdata[i].develop_sale_name) {
					dealdata[n].splice(j, 1, newdata[i][typeName[n]]);
				}
			}
		}
	}
	return dealdata;
}

function dealbarArea2(barX, dealdata, num, dateType, value, p) {
	console.log("获取的value是  " + value);
	for (var i = 0; i < totalAreaDate.rows[num].length; i++) {
		for (var j = 0; j < barX.length; j++) {
			if (barX[j] == totalAreaDate.rows[num][i].develop_sale_name) {
				for (var n = 0; n < typeName.length; n++) {
					{
						if (totalAreaDate.rows[num][i][p] == value) {
							if (totalAreaDate.rows[num][i].point_type == "") { //如果值为"",算其他
								var temp = dealdata[5][j];
								dealdata[5].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
								dealdata[5][j] = dealdata[5][j] + temp;
								break;
							} else if (totalAreaDate.rows[num][i].point_type == typeName[n]) {
								var temp = dealdata[n][j];
								dealdata[n].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
								dealdata[n][j] = dealdata[n][j] + temp;
							}
						}
					}
				}
			}
		}
	}
	return dealdata;
}


function dealbarArea3(barX, dealdata, num, dateType, value, p, c) {
	console.log("获取的value是  " + value);
	for (var i = 0; i < totalAreaDate.rows[num].length; i++) {
		for (var j = 0; j < barX.length; j++) {
			if (barX[j] == totalAreaDate.rows[num][i].develop_sale_name) {
				for (var n = 0; n < typeName.length; n++) {
					{
						if (value == "OTHER") {
							if (totalAreaDate.rows[num][i][p] != "EMAL" && totalAreaDate.rows[num][i][p] != "MOBILE" && totalAreaDate.rows[num][i].prod_catalog == c) {
								if (totalAreaDate.rows[num][i].point_type == "") { //如果值为"",算其他
									var temp = dealdata[5][j];
									dealdata[5].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
									dealdata[5][j] = dealdata[5][j] + temp;
									break;
								} else if (totalAreaDate.rows[num][i].point_type == typeName[n]) {
									var temp = dealdata[n][j];
									dealdata[n].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
									dealdata[n][j] = dealdata[n][j] + temp;
									break;
								}
							}
						} else {
							if (totalAreaDate.rows[num][i][p] == value && totalAreaDate.rows[num][i].prod_catalog == c) {
								if (totalAreaDate.rows[num][i].point_type == "") { //如果值为"",算其他
									var temp = dealdata[5][j];
									dealdata[5].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
									dealdata[5][j] = dealdata[5][j] + temp;
									break;
								} else if (totalAreaDate.rows[num][i].point_type == typeName[n]) {
									var temp = dealdata[n][j];
									dealdata[n].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
									dealdata[n][j] = dealdata[n][j] + temp;
									break;
								}
							}
						}
					}
				}
			}
		}
	}
	return dealdata;
}

function dealbarArea(barX, dealdata, num, judgeBusiness, dateType) {
	for (var i = 0; i < totalAreaDate.rows[num].length; i++) {
		for (var j = 0; j < barX.length; j++) {
			if (barX[j] == totalAreaDate.rows[num][i].develop_sale_name) {
				for (var n = 0; n < typeName.length; n++) {
					if (judgeBusiness != "yw") {
						var temp = dealdata[n][j];
						dealdata[n].splice(j, 1, totalAreaDate.rows[num][i][typeName[n]]);
						dealdata[n][j] = dealdata[n][j] + temp;
					} else {
						if (totalAreaDate.rows[num][i].point_type == "") { //如果值为"",算其他
							var temp = dealdata[8][j];
							dealdata[8].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
							dealdata[8][j] = dealdata[8][j] + temp;
							break;
						} else if (totalAreaDate.rows[num][i].point_type == typeName[n]) {
							var temp = dealdata[n][j];
							dealdata[n].splice(j, 1, totalAreaDate.rows[num][i][dateType]);
							dealdata[n][j] = dealdata[n][j] + temp;
						}
					}
				}
			}
		}
	}
	return dealdata;
}

function dealbarQtArea(dealdata, num) {
	var barXVal = ["sz_back_count", "hj_back_count", "busi_back_count", "sq_back_count"];
	for (var n = 0; n < barXVal.length; n++) {
		dealdata[barXVal[n]] = 0;
		console.log("获取的值是" + barXVal[n]);
		for (var i = 0; i < totalAreaDate.rows[num].length; i++) {
			console.log(totalAreaDate.rows[num][i][barXVal[n]]);
			dealdata[barXVal[n]] = totalAreaDate.rows[num][i][barXVal[n]] + dealdata[barXVal[n]];
		}
	}
	dealdata[0] = [dealdata["sz_back_count"], dealdata["hj_back_count"], dealdata["busi_back_count"], dealdata["sq_back_count"]];
	return dealdata;
}

function dealbarTime(barX1, dealdata, num) {
	for (var i = 0; i < totalTimeDate.rows[num].length; i++) {
		for (var j = 0; j < barX1.length; j++) {
			if (barX1[j] == totalTimeDate.rows[num][i].time_area.substr(totalTimeDate.rows[num][i].time_area.length - 2)) {
				dealdata[0].splice(j, 1, totalTimeDate.rows[num][i][typeName[0]]);
			}
		}
	}
	return dealdata;
}

function dealbarTime1(areaSq, num, total, dateName, judgeBusiness) {
	if (judgeBusiness != "yw" && num == 4) {
		total = "finish_count";
	}

	var timeList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
	var datedeal = new Array();
	for (var i = 0; i < timeList.length; i++) {
		for (var j = 0; j < totalTimeDate.rows[num].length; j++) {
			if (totalTimeDate.rows[num][j].time_area.substr(totalTimeDate.rows[num][j].time_area.length - 2) != timeList[i]) {
				continue;
			}
			var currentDate = totalTimeDate.rows[num][j][dateName];
			for (var h = 0; h < areaSq.length; h++) {
				if (type == "bg7_top12iNum" || type == "bg7_top22iNum" || type == "bg7_top32iNum") {
					if (currentDate == areaSq[h] && totalTimeDate.rows[num][j].prod_catalog == "2I") {
						if (datedeal[timeList[i]] == undefined) {
							datedeal[timeList[i]] = 0;
						}
						datedeal[timeList[i]] = datedeal[timeList[i]] + totalTimeDate.rows[num][j][total];
					}
				} else if (type == "bg7_net2cNum" || type == "bg7_hall2cNum") {
					if (currentDate == areaSq[h] && totalTimeDate.rows[num][j].prod_catalog == "2C") {
						if (datedeal[timeList[i]] == undefined) {
							datedeal[timeList[i]] = 0;
						}
						datedeal[timeList[i]] = datedeal[timeList[i]] + totalTimeDate.rows[num][j][total];
					}
				} else if (type == "bg7_other2cNum") {
					var index = $.inArray(currentDate, areaSq);
					if (index < 0 && totalTimeDate.rows[num][j].prod_catalog == "2C") {
						if (datedeal[timeList[i]] == undefined) {
							datedeal[timeList[i]] = 0;
						}
						datedeal[timeList[i]] = datedeal[timeList[i]] + totalTimeDate.rows[num][j][total];
					}
				} else {
					if (currentDate == areaSq[h]) {
						if (datedeal[timeList[i]] == undefined) {
							datedeal[timeList[i]] = 0;
						}
						datedeal[timeList[i]] = datedeal[timeList[i]] + totalTimeDate.rows[num][j][total];
					}
				}
			}
		}
	}
	var result = new Array();

	for (var i = 0; i < timeList.length; i++) {
		if (datedeal[timeList[i]] == undefined) {
			result.push(0);
		} else {
			result.push(datedeal[timeList[i]]);
		}
	}
	return result;
}


function dealbarTime2( num, total) {
	var timeList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
	var datedeal = new Array();
	for (var i = 0; i < timeList.length; i++) {
		for (var j = 0; j < totalTimeDate.rows[num].length; j++) {
			if (totalTimeDate.rows[num][j].time_area.substr(totalTimeDate.rows[num][j].time_area.length - 2) != timeList[i]) {
				continue;
			}
			if (datedeal[timeList[i]] == undefined) {
				datedeal[timeList[i]] = 0;
			}
			datedeal[timeList[i]] = datedeal[timeList[i]] + totalTimeDate.rows[num][j][total];
		}
	}
	var result = new Array();

	for (var i = 0; i < timeList.length; i++) {
		if (datedeal[timeList[i]] == undefined) {
			result.push(0);
		} else {
			result.push(datedeal[timeList[i]]);
		}
	}
	return result;
}

/**
 * 处理echars数据
 * @param type
 * @param showSelect
 * @param businessSelect
 * @param installSelect
 * @param tableType
 * @param mainType
 * @returns {any[]}
 */
function datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType) {
	var data = new Array();
	data.length = 0;
	getTypeValueTypeName(type);

	//订单量数据对应后台数组第0个，后面依次类推
	var num;
	if (mainType == 'IncountAreaTotal' || mainType == 'mobileOrderArea' || judgeBusiness == "fb") { //政企（非标准）对应数组第一条
		num = 0;
	} else if (mainType == 'totalOrdercount' || mainType == 'mobileSumDeliverArea') {
		num = 1;
	} else if (mainType == 'totalProcesscountArea' || mainType == 'mobileDeliverArea') {
		num = 2;
	} else if (mainType == 'totalOvercount' || mainType == 'mobileActiveArea') {
		num = 3;
	} else if (mainType == 'totalFinishcount' || mainType == 'mobileBackArea') {
		num = 4;
	} else if (mainType == 'totalBackcountArea' || mainType == '') {
		num = 5;
	}

	//按小时展示
	if (showSelect == "1") {
		barX = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
		if (judgeBusiness == "yw") { //移网
			var typeEnd = type.substr(type.lastIndexOf("_") + 1, 2);
			var dateType = getDateType(num);
			if (typeEnd == "sz") { //市区
				var areaSq = ["225", "226", "211", "212", "213", "214"];
				data[0] = dealbarTime1(areaSq, num, dateType, "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "jj") { //近郊
				var areaSq = ["217", "219", "220", "218", "216"];
				data[0] = dealbarTime1(areaSq, num, dateType, "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "yj") {  //远郊
				var areaSq = ["223", "221", "215", "222", "224"];
				data[0] = dealbarTime1(areaSq, num, dateType, "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "qt") {  //中心
				var areaSq = ["227", "11a0al", "11a01s", "dkhzx", "11a01q", "11a08x"];
				data[0] = dealbarTime1(areaSq, num, dateType, "develop_sale_area", judgeBusiness);
			} else if (type == "btn7") {//今日订单量
				data[0] = dealbarTime2(num, dateType);
			}else if(type == "bg7_woNum"){
				data[0] = dealbarTime2(num, "wo_num");
			}else if(type == "bg7_threePart"){
				data[0] = dealbarTime2(num, "third_num");
			}else if(type == "bg7_intentionNum"){
				data[0] = dealbarTime2(num, "intention_num");
			}else if(type == "bg7_mNum"){
				data[0] = dealbarTime2(num, "m_num");
			}else if(type == "bg7_schoolNum"){
				data[0] = dealbarTime2(num, "school_num");
			}else if(type == "bg7_otherNum"){
				data[0] = dealbarTime2(num, "other_num");
			}else if(type == "bg7_woNum"){
				data[0] = dealbarTime2(num, "wo_num");
			}else if(type == "btn12"){
				data[0] = dealbarTime2(num, dateType);
			}else if(type == "bg12_ztNum"){
				data[0] = dealbarTime2(num, "zt_num");
			}else if(type == "bg12_wlNum"){
				data[0] = dealbarTime2(num, "wl_num");
			}else if(type == "bg12_yxNum"){
				data[0] = dealbarTime2(num, "yx_num");
			}else if(type == "bg12_jtNum"){
				data[0] = dealbarTime2(num, "jt_num");
			}else if(type == "bg12_dayNum"){
				data[0] = dealbarTime2(num, "day_num");
			}else if (type == "bg7_group2iNum") { //集团2I
				data[0] = dealbarTime2(num, "group2i_num");
				/*var areaSq = ["2I"];
                data[0] = dealbarTime1(areaSq, num, dateType, "prod_catalog", judgeBusiness);*/
			} else if (type == "bg7_group2cNum") { //集团商城2C
				data[0] = dealbarTime2(num, "group2c_num");
				/* var areaSq = ["2C"];
                 data[0] = dealbarTime1(areaSq, num, dateType, "prod_catalog", judgeBusiness);*/
			} else if (type == "bg7_top12iNum") { //集团2I最多
				var areaSq = [$("#bg7_top12iCode").attr("type")];
				data[0] = dealbarTime1(areaSq, num, dateType, "ex_trade_source", judgeBusiness);
			} else if (type == "bg7_top22iNum") { //集团2I第二多
				var areaSq = [$("#bg7_top22iCode").attr("type")];
				data[0] = dealbarTime1(areaSq, num, dateType, "ex_trade_source", judgeBusiness);
			} else if (type == "bg7_top32iNum") { //集团2I第三多
				var areaSq = [$("#bg1_top32iCode").attr("type")];
				data[0] = dealbarTime1(areaSq, num, dateType, "ex_trade_source", judgeBusiness);
			} else if (type == "bg7_net2cNum") { //网厅
				var areaSq = ["EMAL"];
				data[0] = dealbarTime1(areaSq, num, dateType, "ex_trade_source", judgeBusiness);
			} else if (type == "bg7_hall2cNum") { //手厅
				var areaSq = ["MOBILE"];
				data[0] = dealbarTime1(areaSq, num, dateType, "ex_trade_source", judgeBusiness);
			} else if (type == "bg7_other2cNum") { //其他
				/*var areaSq = ["EMAL", "MOBILE"];
				data[0] = dealbarTime1(areaSq, num, dateType, "ex_trade_source", judgeBusiness);*/

				data[0] = dealbarTime2(num, "other2c_num");
			} else if (type == "btn8" || type == "btn9" || type == "btn10" ) {
				var areaSq = ["225", "226", "211", "212", "213", "214", "217", "219", "220", "218", "216", "223", "221", "215", "222", "224", "227", "11a0al", "11a01s", "dkhzx", "11a01q", "11a08x"];
				data[0] = dealbarTime1(areaSq, num, dateType, "develop_sale_area", judgeBusiness);
			} else { //今日退单量下面分项没有口径，默认空值
				data[0] = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
			}

			if (num == 5) { //今日首充量暂时没有开发，默认是空数据
				data[0] = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
			}
		} else if (judgeBusiness == "kd" || judgeBusiness == "zq") { //政企（标准化）、宽带
			var typeEnd = type.substring(type.lastIndexOf("_") + 1);
			if (typeEnd == "city") {
				var areaSq = ["2", "3", "4", "5", "7", "8"];
				data[0] = dealbarTime1(areaSq, num, "total_count", "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "suburbs") {
				var areaJj = ["802", "801", "804", "806", "803"]; //近郊
				data[0] = dealbarTime1(areaJj, num, "total_count", "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "outskirts") {
				var areaYj = ["809", "808", "805", "807", "810"];  //远郊
				data[0] = dealbarTime1(areaYj, num, "total_count", "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "important") {
				var arrZT = ["10"]; //重通局
				data[0] = dealbarTime1(arrZT, num, "total_count", "develop_sale_area", judgeBusiness);
			} else if (typeEnd == "other") {
				var arrQt = ["104"]; //其他
				data[0] = dealbarTime1(arrQt, num, "total_count", "develop_sale_area", judgeBusiness);
			} else if (type == "btn4" || type == "btn3") {
				var arr = ["2", "3", "4", "5", "7", "8", "10", "802", "801", "804", "806", "803", "809", "808", "805", "807", "810", "104"];
				data[0] = dealbarTime1(arr, num, "total_count", "develop_sale_area", judgeBusiness);
			} else if (type == "btn5") {
				var arr = ["2", "3", "4", "5", "7", "8", "10", "802", "801", "804", "806", "803", "809", "808", "805", "807", "810"];
				data[0] = dealbarTime1(arr, num, "total_count", "develop_sale_area", judgeBusiness);
			} else {
				if (type == "btn6") {
					typeName[0] = "back_count";
				}
				var barX1 = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
				data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				data = dealbarTime(barX1, data, num);
			}
		}
	} else { //按销售线
		var newdata = [];
		//撤单量特殊处理
		if (type == "btn6" || tableType == "p3" || tableType == "p4" || tableType == "p6"/*||tableType=="p20"||tableType=="p21"*/) {
			//将获取的“其他”、“其它”统计量合并到“其他”中
			var arr = totalAreaDate.rows[num];
			for (var i = 0; i < totalAreaDate.rows[num].length; i++) {
				if (totalAreaDate.rows[num][i].develop_sale_name == "其他") {
					for (var j = 0; j < arr.length; j++) {
						if (arr[j].develop_sale_name == "其它") {
							totalAreaDate.rows[num][i].qt_back_count = totalAreaDate.rows[num][i].qt_back_count + arr[j].qt_back_count;
							totalAreaDate.rows[num][i].zw_back_count = totalAreaDate.rows[num][i].zw_back_count + arr[j].zw_back_count;
							totalAreaDate.rows[num][i].yy_back_count = totalAreaDate.rows[num][i].yy_back_count + arr[j].yy_back_count;
							totalAreaDate.rows[num][i].td_back_count = totalAreaDate.rows[num][i].td_back_count + arr[j].td_back_count;
						}
					}
				}
			}

			var temp = {};
			for (var i in totalAreaDate.rows[num]) {
				var develop_sale_name = totalAreaDate.rows[num][i].develop_sale_name;
				var qt_back_count = totalAreaDate.rows[num][i].qt_back_count;
				var zw_back_count = totalAreaDate.rows[num][i].zw_back_count;
				var yy_back_count = totalAreaDate.rows[num][i].yy_back_count;
				var td_back_count = totalAreaDate.rows[num][i].td_back_count;
				var order_num = totalAreaDate.rows[num][i].order_num;
				var sum_deliver_num = totalAreaDate.rows[num][i].sum_deliver_num;
				var deliver_num = totalAreaDate.rows[num][i].deliver_num;
				var active_num = totalAreaDate.rows[num][i].active_num;
				var charge_num = totalAreaDate.rows[num][i].charge_num;
				if (temp[develop_sale_name]) {
					temp[develop_sale_name].develop_sale_name = temp[develop_sale_name].develop_sale_name;
					temp[develop_sale_name].qt_back_count = temp[develop_sale_name].qt_back_count + qt_back_count;
					temp[develop_sale_name].zw_back_count = temp[develop_sale_name].zw_back_count + zw_back_count;
					temp[develop_sale_name].yy_back_count = temp[develop_sale_name].yy_back_count + yy_back_count;
					temp[develop_sale_name].td_back_count = temp[develop_sale_name].td_back_count + td_back_count;
				} else {
					temp[develop_sale_name] = {};
					temp[develop_sale_name].develop_sale_name = totalAreaDate.rows[num][i].develop_sale_name;
					temp[develop_sale_name].qt_back_count = qt_back_count;
					temp[develop_sale_name].zw_back_count = zw_back_count;
					temp[develop_sale_name].yy_back_count = yy_back_count;
					temp[develop_sale_name].td_back_count = td_back_count;
				}
			}

			for (var k in temp) {
				newdata.push(temp[k])
			}
		}


		if (tableType == "p1") {
			data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			if (type == "btn6") {
				barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其他"];
				//撤单量
				data = dealbarAreaBack(barX, data, newdata);
			} else {
				barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其它"];
				data = dealbarArea(barX, data, num, judgeBusiness, "");
			}
		} else if (tableType == "p2") {
			barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "其他"];
			data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p3") {
			barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "其他"];
			data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			//撤单量
			data = dealbarAreaBack(barX, data, newdata);
		} else if (tableType == "p4") {
			barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "其他"];
			data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p5") {
			barX = ["二区", "三区", "四区", "五区", "七区", "八区"];
			data[0] = [0, 0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p6") {
			barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其他"];
			data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			//撤单量
			data = dealbarAreaBack(barX, data, newdata);
		} else if (tableType == "p8") {
			barX = ["通州", "昌平", "大兴", "顺义", "房山"];
			data[0] = [0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p9") {
			barX = ["密云", "怀柔", "门头沟", "平谷", "延庆"];
			data[0] = [0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p10") {
			barX = ["重通局"];
			data[0] = [0];
			data[1] = [0];
			data[2] = [0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p11") {
			barX = ["其他"];
			data[0] = [0];
			data[1] = [0];
			data[2] = [0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p12") {
			barX = ["二区", "三区", "四区", "五区", "七区", "八区"];
			data[0] = [0, 0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p13") {
			barX = ["通州", "昌平", "大兴", "顺义", "房山"];
			data[0] = [0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p14") {
			barX = ["密云", "怀柔", "门头沟", "平谷", "延庆"];
			data[0] = [0, 0, 0, 0, 0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p15") {
			barX = ["重通局"];
			data[0] = [0];
			data = dealbarArea(barX, data, num, judgeBusiness, "");
		} else if (tableType == "p16") {
			barX = ["中台受理", "电话营销", "营业厅", "社会渠道"];
			data[0] = [0, 0, 0, 0];
			//前台注销
			data = dealbarQtArea(data, num);
		} else if (tableType == "p17") {
			var dateType = getDateType(num);
			barX = ["二区", "三区", "四区", "五区", "七区", "八区"];
			data[0] = [0, 0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0, 0];
			data[3] = [0, 0, 0, 0, 0, 0];
			data[4] = [0, 0, 0, 0, 0, 0];
			data[5] = [0, 0, 0, 0, 0, 0];
			data[6] = [0, 0, 0, 0, 0, 0];
			data[7] = [0, 0, 0, 0, 0, 0];
			data[8] = [0, 0, 0, 0, 0, 0];
			if (num != 5) {
				data = dealbarArea(barX, data, num, "yw", dateType);
			}
		} else if (tableType == "p18") {
			var dateType = getDateType(num);
			barX = ["通州", "昌平", "大兴", "顺义", "房山"];
			data[0] = [0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0];
			data[3] = [0, 0, 0, 0, 0];
			data[4] = [0, 0, 0, 0, 0];
			data[5] = [0, 0, 0, 0, 0];
			data[6] = [0, 0, 0, 0, 0];
			data[7] = [0, 0, 0, 0, 0];
			data[8] = [0, 0, 0, 0, 0];
			if (num != 5) {
				data = dealbarArea(barX, data, num, "yw", dateType);
			}
		} else if (tableType == "p19") {
			var dateType = getDateType(num);
			barX = ["密云", "怀柔", "门头沟", "平谷", "延庆"];
			data[0] = [0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0];
			data[3] = [0, 0, 0, 0, 0];
			data[4] = [0, 0, 0, 0, 0];
			data[5] = [0, 0, 0, 0, 0];
			data[6] = [0, 0, 0, 0, 0];
			data[7] = [0, 0, 0, 0, 0];
			data[8] = [0, 0, 0, 0, 0];
			if (num != 5) {
				data = dealbarArea(barX, data, num, "yw", dateType);
			}
		} else if (tableType == "p20") {
			var dateType = getDateType(num);
			barX = ["重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其它"];
			data[0] = [0, 0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0, 0];
			data[3] = [0, 0, 0, 0, 0, 0];
			data[4] = [0, 0, 0, 0, 0, 0];
			data[5] = [0, 0, 0, 0, 0, 0];
			data[6] = [0, 0, 0, 0, 0, 0];
			data[7] = [0, 0, 0, 0, 0, 0];
			data[8] = [0, 0, 0, 0, 0, 0];
			if (num != 5) {
				data = dealbarArea(barX, data, num, "yw", dateType);
			}
			barX = ["重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其他"];
		} else if (tableType == "p21") {
			var dateType = getDateType(num);
			console.log("获取的type" + type);
			console.log("获取的dateType" + dateType);
			barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其它"];
			data[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			data[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			if (type == "btn7" || type == "btn8" || type == "btn9" || type == "btn10" || type == "btn12") {
				console.log("获取的type值是" + type);
				data = dealbarArea(barX, data, num, "yw", dateType);
			} else if (type == "bg7_group2iNum") {
				data = dealbarArea(barX, data, num, "yw", "group2i_num");
				//data = dealbarArea2(barX, data, num, dateType, "2I", "prod_catalog");
			} else if (type == "bg7_group2cNum") {
				data = dealbarArea(barX, data, num, "yw", "group2c_num");
				//data = dealbarArea2(barX, data, num, dateType, "2C", "prod_catalog");
			} else if (type == "bg7_top12iNum") {
				data = dealbarArea3(barX, data, num, dateType, $("#bg7_top12iCode").attr("type"), "ex_trade_source", "2I");
			} else if (type == "bg7_top22iNum") {
				data = dealbarArea3(barX, data, num, dateType, $("#bg7_top22iCode").attr("type"), "ex_trade_source", "2I");
			} else if (type == "bg7_top32iNum") {
				data = dealbarArea3(barX, data, num, dateType, $("#bg7_top32iCode").attr("type"), "ex_trade_source", "2I");
			} else if (type == "bg7_net2cNum") {
				data = dealbarArea3(barX, data, num, dateType, "EMAL", "ex_trade_source", '2C');
			} else if (type == "bg7_hall2cNum") {
				data = dealbarArea3(barX, data, num, dateType, "MOBILE", "ex_trade_source", '2C');
			} else if (type == "bg7_other2cNum") {
				//data = dealbarArea3(barX, data, num, dateType, "OTHER", "ex_trade_source", '2C');
				data = dealbarArea(barX, data, num, "yw", "other2c_num");
			} else if(type == "bg7_woNum"){
				data = dealbarArea(barX, data, num, "yw", "wo_num");
			} else if(type == "bg7_threePart"){
				data = dealbarArea(barX, data, num, "yw", "third_num");
			} else if(type == "bg7_intentionNum"){
				data = dealbarArea(barX, data, num, "yw", "intention_num");
			} else if(type == "bg7_mNum"){
				data = dealbarArea(barX, data, num, "yw", "m_num");
			} else if(type == "bg7_schoolNum"){
				data = dealbarArea(barX, data, num, "yw", "school_num");
			} else if(type == "bg7_otherNum"){
				data = dealbarArea(barX, data, num, "yw", "other_num");
			} else if(type == "bg12_ztNum"){
				data = dealbarArea(barX, data, num, "yw", "zt_num");
			} else if(type == "bg12_wlNum"){
				data = dealbarArea(barX, data, num, "yw", "wl_num");
			} else if(type == "bg12_yxNum"){
				data = dealbarArea(barX, data, num, "yw", "yx_num");
			} else if(type == "bg12_jtNum"){
				data = dealbarArea(barX, data, num, "yw", "jt_num");
			} else if(type == "bg12_dayNum"){
				data = dealbarArea(barX, data, num, "yw", "day_num");
			}
			barX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其他"];
		}
	}
	return data;
}


/**
 * 获取移网后台数据属性名称
 * @param num
 */
function getDateType(num) {
	if (num == 0) {
		return "order_num";
	} else if (num == 1) {
		return "sum_deliver_num";
	} else if (num == 2) {
		return "deliver_num";
	} else if (num == 3) {
		return "active_num";
	} else if (num == 4) {
		return "back_num";
	}
}


/**
 * 点击侧边栏
 * iselect0-宽带
 * iselect1-融合业务
 * iselect2-单宽业务
 * iselect3-专线业务（云/光）
 * iselect4-快线业务（云/光）
 * iselect5-政企（标准化）
 * iselect6-移网
 * iselect7-2I
 * iselect8-2C
 * iselect9-政企（非标准）
 * iselect10-数据网元
 * iselect11-互联网专线
 */
$("#iselect0,#iselect1,#iselect2,#iselect3,#iselect4,#iselect5,#iselect6,#iselect7,#iselect8,#iselect9,#iselect10,#iselect11").click(function () {
	businessSelect = $(this).attr("type");
	//所有的业务类型
	var businessSelects = new Array("宽带",
		"融合业务", "单宽业务", "专线业务（云/光）",
		"快线业务（云/光）", "政企（标准化）", "移网",
		"2I", "2C","政企（非标准）","数据网元","互联网专线");
	for (var i in businessSelects) {
		if ($(this).attr("name") == businessSelects[i]) {

			//业务类型明细 颜色还原白色
			$("ul .selectA div  li").css("color", "#ffffff");
			$("ul .selectA div li img").css("display", "none");

			//业务大类，还原绿色背景图片
			$("ul .selectA a li img").attr("src", "../images/stat/tit_bg_index.png");


			if (businessSelects[i] == "移网" || businessSelects[i] == "2I"
				|| businessSelects[i] == "2C" ) {//移网业务类型，没有施工类型

				//时间还原“当日”
				timeSelect="day";

				//施工类型还原初始值
				installSelect = "all";

				$("#chooseDiv3_on").css("display", "none");
				$("#chooseDiv3_on").children("span").removeClass("spcheck");
				$("#select6").addClass("spcheck");

				//指标显示移网
				$("div .selectMain").children().eq(0).css("display", "none");
				$("div .selectMain").children().eq(1).css("display", "block");
				$("div .selectMain").children().eq(2).css("display", "none");

				//按小时导出、展示可展示
				$("div.btmr.fr").removeClass("hidden").addClass("show");
				$("div.chooseDiv3.fr").removeClass("show").addClass("hidden");
				/*$("#select22").removeClass("cursorNot").addClass("cursor");
				$("#select44").removeClass("cursorNot").addClass("cursor");*/

				//日期（当日、当月、当年）隐藏
				$("#chooseDiv4_on").addClass("hide");
				$("#chooseDiv4_on").children("span").removeClass("spcheck");
				$("#chooseDiv4_on").children("span").eq(0).addClass("spcheck");

			} else if(businessSelects[i] =="政企（非标准）"
			||businessSelects[i] =="数据网元" || businessSelects[i] =="互联网专线") {

				//施工类型还原初始值
				installSelect = "all";

				$("#chooseDiv3_on").css("display", "none");
				$("#chooseDiv3_on").children("span").removeClass("spcheck");
				$("#select6").addClass("spcheck");

				//日期（当日、当月、当年）展示
				$("#chooseDiv4_on").removeClass("hide");
				/*$("#chooseDiv4_on").children("span").removeClass("spcheck");
				$("#chooseDiv4_on").children("span").eq(0).addClass("spcheck");*/

				$("div .selectMain").children().eq(0).css("display", "none");
				$("div .selectMain").children().eq(1).css("display", "none");
				$("div .selectMain").children().eq(2).css("display", "block");

				//按小时导出、展示不可点击
				$("div.btmr.fr").removeClass("show").addClass("hidden");
				$("div.chooseDiv3.fr").removeClass("hidden").addClass("show");
				/*$("#select22").removeClass("cursor").addClass("cursorNot");
				$("#select44").removeClass("cursor").addClass("cursorNot");*/

			}else if ($("#chooseDiv3_on").css("display") == "none") {
				$("#chooseDiv3_on").css("display", "block");

				//时间还原“当日”
				timeSelect="day";

				//日期（当日、当月、当年）隐藏
				$("#chooseDiv4_on").addClass("hide");
				$("#chooseDiv4_on").children("span").removeClass("spcheck");
				$("#chooseDiv4_on").children("span").eq(0).addClass("spcheck");

				//指标显示宽带、政企
				$("div .selectMain").children().eq(0).css("display", "block");
				$("div .selectMain").children().eq(1).css("display", "none");
				$("div .selectMain").children().eq(2).css("display", "none");

				//按小时导出、展示可点击
				$("div.btmr.fr").removeClass("hidden").addClass("show");
				$("div.chooseDiv3.fr").removeClass("show").addClass("hidden");
				/*$("#select22").removeClass("cursorNot").addClass("cursor");
				$("#select44").removeClass("cursorNot").addClass("cursor");*/
			}

			if ($(this).attr("name") != "宽带" && $(this).attr("name") != "移网" && $(this).attr("name") != "政企（标准化）"&& $(this).attr("name") != "政企（非标准）") { //选中业务类型明细
				//选中的字体变成蓝色，显示背景图片
				$(this).css("color", "#25EFE2");
				$(this).children("img").css("display", "block");
			} else { //选中业务大类
				$(this).children("img").attr("src", "../images/stat/tit_bg_index1.png");
			}
		}
	}

	//刷新标题总览
	titleCountAll(businessSelect, installSelect);

	//所有选中数据还原白色
	$(".details span[type='btn_detail']").each(function () {
		$(this).css("color", "#ffffff");
	});

	if (judgeBusiness == "yw") {
		type = "btn7";
		mainType = "mobileOrderArea";
	} else if(judgeBusiness == "fb")  {
		type = "btn13";
		mainType = "offstandOrderArea";
	} else {
		type = "btn1";
		mainType = "IncountAreaTotal";
	}
	$("div.btmr.fr").children().eq(0).addClass("slcheck");
	$("div.btmr.fr").children().eq(1).removeClass("slcheck");
	showSelect = "0";

	//界面右侧刷新
	frashRight();

});

/**
 * 左侧IPTV业务
 */
$("#iselect20").click(function () {
	$(this).siblings("li").children("img").css("display", "none");
})

/**
 * 界面右侧刷新
 */
function frashRight() {
	//按销售线、小时，导出栏还原
	$(".btmr span").each(function () {
		if ($(this).hasClass("slcheck")) {
			$(this).removeClass("slcheck");
		}
	})
	$("#select11").addClass("slcheck");


	$("#type_title").html($("#"+type).attr("name"));

	//大指标栏还原
	$(".btn1_bg img[type='pic1']").each(function () {
		if ($(this).hasClass("show")) {
			$(this).removeClass("show");
			$(this).addClass("hide");
		}
	})
	if ($(".btn_bg1").hasClass("hide")) {
		$(".btn_bg1").removeClass("hide");
		$(".btn_bg1").addClass("show");
	}

	//指标栏还原
	$(".details div[type='det']").each(function () {
		if ($(this).hasClass("show")) {
			$(this).removeClass("show");
			$(this).addClass("hide");
		}
	})
	if ($(".btn_bg1_d").hasClass("hide")) {
		$(".btn_bg1_d").removeClass("hide");
		$(".btn_bg1_d").addClass("show");
	}

	$(".rightBtn img[type='pic2']").each(function () {
		if ($(this).hasClass("hidden1")) {
			$(this).removeClass("hidden1");
			$(this).addClass("visible1");
		}
	})
	if ($(".btn1").hasClass("visible1")) {
		$(this).removeClass("visible1").addClass("hidden1");
		;
	}

	//获取后台数据并给前台赋值
	getShowDate(businessSelect, installSelect,timeSelect);

	//判断报表类型
	tableType = judgeTableType(type, showSelect);

	if(judgeBusiness !="fb"){
		//获取时间全部数据
		getTimeDate(type, showSelect, businessSelect, installSelect, mainType);
	}

	//获取销售线全部数据
	getAreaDate(type, showSelect, businessSelect, installSelect, mainType,timeSelect);

	//echars数据
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

	//绘制echars
	createEchars(tableType, data);
}


/**
 * 点击指标明细项
 */
$(document).on("click", ".details span[type='btn_detail']", function () {
	type = $(this).attr("id");
	//选中变色
	bgDetailColor($(this));

	console.log("获取的type的值是" + type);

	//移网 点击今日订单量-指标明细一级分类
	var bg7=["bg7_group2iNum","bg7_group2cNum","bg7_woNum","bg7_threePart","bg7_offLine1"];
	if(bg7.indexOf(type)>=0){
		var srcArrNum =type.substring(type.indexOf("_")+1);
		//二级分类显示切换
		srcChage(srcArrNum);
	}



	//数据大类赋值、获取报表类型
	tableType = judgeTableType(type, showSelect);

	//报表数据获取
	var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

	$("#type_title").html($(this).attr("name"));

	//报表创建
	createEchars(tableType, data);
});

/**
 * 点击指标
 */
$(".staticPic div").click(function () {
	//全部指标id数字后缀
	var numList = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
		'10', '11', '12', '13', '14', '15', '16', '17', '18'];

	//除去政企（非标准）指标id数字后缀
	var List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	//选中元素对象
	var staticPic = $(this);

	//点击移网今日订单量，还原初始界面显示
	if (staticPic.attr("id") == "btn7") {
		$("#group2iNum").removeClass("hide").addClass("show");
		$("#group2cNum").removeClass("show").addClass("hide");
	}

	//选中元素id中对应的数字
	var num = staticPic.attr("id").substring(staticPic.attr("id").indexOf("n") + 1);
	for (var item = 1; item <= numList.length; item++) {
		if (item == num) {
			$(".details span[type='btn_detail']").each(function () {
				$(this).css("color", "#ffffff");
			});
			if($.inArray(item,List)>=0){
				// 选中的图片隐藏
				$("#img" + item + "").removeClass("visible1").addClass("hidden1");
				// 对应的背景图片和文字样式显示
				$("#btn_bg" + item + "").removeClass("hide").addClass("show");
				$("#btn_bg" + item + "_d").removeClass("hide").addClass("show");
			}

			//修改echar图标题
			$("#type_title").html($("#btn" + item + "").attr("name"));

			type = staticPic.attr("id");
			//数据大类赋值、获取报表类型
			tableType = judgeTableType(type, showSelect);

			//报表数据获取
			var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);

			//报表创建
			createEchars(tableType, data);
		} else {
			// 未选中的图片显示
			if ($("#img" + item + "").hasClass("hidden1")) {
				$("#img" + item + "").removeClass("hidden1").addClass("visible1");
			}

			if($.inArray(item,List)>=0){
				//对应的背景图片和文字样式隐藏
				if ($("#btn_bg" + item + "").hasClass("show")) {
					$("#btn_bg" + item + "").removeClass("show").addClass("hide");
				}
				if ($("#btn_bg" + item + "_d").hasClass("show")) {
					$("#btn_bg" + item + "_d").removeClass("show").addClass("hide");
				}
			}
		}
	}
})

/**
 * 详情选中变色
 * @param obj
 */
function bgDetailColor(obj) {
	$(".details span[type='btn_detail']").each(function () {
		$(this).css("color", "#ffffff");
	});
	obj.css("color", "#25EFE2");
}

/**
 * 鼠标移动到IPTV业务，提示信息
 */
$(function () {
	var x = 10;
	var y = 20;
	$("#iselect20").mouseover(function (e) {
		this.myTitle = this.title;
		this.title = "";
		var tooltip = "<div id='tooltip'>" + this.myTitle + "<\/div>"; //创建 div 元素
		$("body").append(tooltip);	//把它追加到文档中
		$("#tooltip")
			.css({
				"top": (e.pageY + y) + "px",
				"left": (e.pageX + x) + "px"
			}).show("fast");	  //设置x坐标和y坐标，并且显示
	}).mouseout(function () {
		this.title = this.myTitle;
		$("#tooltip").remove();   //移除
	}).mousemove(function (e) {
		$("#tooltip")
			.css({
				"top": (e.pageY + y) + "px",
				"left": (e.pageX + x) + "px"
			});
	});
})

/**
 * 鼠标移动指标名称，显示指标解释
 */
$("div .num").mouseover(function (e) {
	this.myTitle = this.title;
	this.title = "";
	var tooltip = "<div id='tooltip'>" + this.myTitle + "<\/div>"; //创建 div 元素
	$("body").append(tooltip);	//把它追加到文档中
	$("#tooltip")
		.css({
			"top": (e.pageY + y) + "px",
			"left": (e.pageX + x) + "px"
		}).show();	  //设置x坐标和y坐标，并且显示
}).mouseout(function () {
	this.title = this.myTitle;
	$("#tooltip").remove();   //移除
}).mousemove(function (e) {
	$("#tooltip")
		.css({
			"top": (e.pageY + y) + "px",
			"left": (e.pageX + x) + "px"
		});
});

//echar 层叠柱状（每种情况一种颜色）
function bar4(bartype, data) {
	//echars 柱状图对象
	var bar = echarts.init(document.getElementById('barTable'));
	var dateShow = ['物流上门','装维', '营业厅', '综合网格', '电商自有','电商交付2队','分公司团队', '退单管理', '其他'];
	var dateShow1 = ['其他', '退单管理','分公司团队','电商交付2队', '电商自有', '综合网格', '营业厅','装维', '物流上门'];
	var barWidth = 24;
	var data4 = function () {
		var datas = [];
		for (var i = 0; i < data[0].length; i++) {
			datas.push(data[0][i] + data[1][i] + data[2][i] + data[3][i] + data[4][i] + data[5][i]+ data[6][i]+ data[7][i]+ data[8][i]);
		}
		return datas;
	}();

	var data5 = data4;
	var max = Math.round(Math.max.apply(null, data5) / 0.8);
	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			position:function(position){
				//获取容器的宽度
				var chartsWidth = $("#barTable").width();
				//判断悬停点落在容器的哪测
				if(position[0] < (chartsWidth/2)){
					position[0] = position[0];
				}else{
					position[0] = position[0] - 130;
				}
				//return [position[0], $("#barTable").height()/6];
				return [position[0], $("#barTable").height()/10];
			}
		},

		color: ['#5abfde'],  // 柱子颜色
		legend: {  // 图例
			show: true,
			right: '2%',
			data: dateShow1,
			textStyle: {//图例文字的样式
				color: '#ffffff'
			}
		},

		grid: {  // 可控制图标大小和位置
			width: 'auto',
			height: 'auto',
			top: '30px', // 距离容器顶部
			bottom: '80px',  // X轴位置距离容器底部
			x: '50px',  // 距离容器X方向距离

			x2: 5,
			//y2:20,
			borderColor: 'transparent',
		},
		xAxis: {
			type: 'category',
			data: barX,
			nameTextStyle: {
				fontSize: 8

			},
			axisLabel: {
				interval: 0,
				rotate: 60,
				formatter: function (value, index) {
					var rt = "";
					for (var i = 0; i < value.length; i++) {
						rt += value.substr(i, 1) + "\n";

					}
					rt = value;
					return rt;

				},
				textStyle: {
					fontSize: 10 // 让字体变大
				}

			},
			axisLine: {
				show: true, // X轴坐标线
				lineStyle: {
					color: '#ffffff',
					width: 1
				}
			},
		},
		yAxis: [
			{
				max: max,
				type: 'value',
				axisLabel: {    // 轴线
					textStyle: {
						color: '#ffffff',
						fontStyle: 'normal',
						fontFamily: '微软雅黑'
					}
				},
				splitLine: {
					show: 'true',
					lineStyle: {
						color: '#5a66bd',
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: true, // Y轴坐标线
					lineStyle: {
						color: '#ffffff',
						width: 1
					}
				}
			},
		],
		series: [
			{
				name: dateShow[8],
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: barWidth,  //柱子宽度
				stack: 'sum',
				data: data[8],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#048c85'
						}, {
							offset: 1,
							color:  '#90edea'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			},
			{
				name: dateShow[7],
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: barWidth,  //柱子宽度
				stack: 'sum',
				data: data[7],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#40c560'
						}, {
							offset: 1,
							color: '#b1edb0'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			}, {
				name: dateShow[6],
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: barWidth,  //柱子宽度
				stack: 'sum',
				data: data[6],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#8c0907'
						}, {
							offset: 1,
							color: '#ed7a77'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			}, {
				name: dateShow[5],
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: barWidth,  //柱子宽度
				stack: 'sum',
				data: data[5],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#8c5644'
						}, {
							offset: 1,
							color: '#ed9345'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			}, {
				name: dateShow[4],
				type: 'bar',
				stack: 'sum',
				data: data[4],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#5b15b9'
						}, {
							offset: 1,
							color: '#737bfd'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			}, {
				name: dateShow[3],
				type: 'bar',
				stack: 'sum',
				data: data[3],
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#9d4b99'
						}, {
							offset: 1,
							color: '#dc5a8e'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			},
			{
				name: dateShow[2],
				type: 'bar',
				stack: 'sum',
				data: data[2],
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#977C00'
						}, {
							offset: 1,
							color: '#FFD306'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			}, {
				name: dateShow[1],
				type: 'bar',
				stack: 'sum',
				data: data[1],
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#006000'
						}, {
							offset: 1,
							color: '#93FF93'
						}])
					},
				}
			}, {
				name: dateShow[0],
				type: 'bar',
				stack: 'sum',
				data: data[0],
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#288EBE'
						}, {
							offset: 1,
							color: '#6DC0E2'
						}])
					},
				}
			},
			{
				name: '总计',
				type: 'bar',
				stack: 'sum',
				label: {
					normal: {
						show: true,
						position: 'insideBottom',
						formatter: '{c}',
						textStyle: {     //数值样式
							color: '#ffffff',
							fontSize: 12
						}

					}
				},
				itemStyle: {
					normal: {
						color: 'rgba(128, 128, 128, 0)'
					}
				},
				data: data4
			}
		]
	};
	bar.setOption(option, true);
}

function bar3(bartype, data) {
	//echars 柱状图对象
	var bar = echarts.init(document.getElementById('barTable'));
	var dateShow;
	dateShow = ['前台注销', '中台处理退单'];
	var data5 = function () {
		var datas = [];
		for (var i = 0; i < data[0].length; i++) {
			datas.push(data[0][i] + data[1][i] + data[2][i] + data[3][i]);
		}
		return datas;
	}();


	var data6 = data5;
	var max = Math.round(Math.max.apply(null, data6) / 0.8);
	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
		},

		color: ['#5abfde'],  // 柱子颜色
		legend: {  // 图例
			show: true,
			right: '2%',
			data: dateShow,
			textStyle: {//图例文字的样式
				color: '#ffffff'
			}
		},

		grid: {  // 可控制图标大小和位置
			width: 'auto',
			height: 'auto',
			top: '30px', // 距离容器顶部
			bottom: '80px',  // X轴位置距离容器底部
			x: '50px',  // 距离容器X方向距离

			x2: 5,
			//y2:20,
			borderColor: 'transparent',
		},
		xAxis: {
			type: 'category',
			data: barX,
			nameTextStyle: {
				fontSize: 8

			},
			axisLabel: {
				interval: 0,
				rotate: 60,
				formatter: function (value, index) {
					var rt = "";
					for (var i = 0; i < value.length; i++) {
						rt += value.substr(i, 1) + "\n";

					}
					rt = value;
					return rt;

				},
				textStyle: {
					fontSize: 10 // 让字体变大
				}

			},
			axisLine: {
				show: true, // X轴坐标线
				lineStyle: {
					color: '#ffffff',
					width: 1
				}
			},
		},
		yAxis: [
			{
				max: max,
				type: 'value',
				axisLabel: {    // 轴线
					textStyle: {
						color: '#ffffff',
						fontStyle: 'normal',
						fontFamily: '微软雅黑'
					}
				},
				splitLine: {
					show: 'true',
					lineStyle: {
						color: '#5a66bd',
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: true, // Y轴坐标线
					lineStyle: {
						color: '#ffffff',
						width: 1
					}
				}
			},
		],
		series: [
			{
				name: dateShow[0],
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: 24,  //柱子宽度
				stack: 'sum',
				data: data[0],
				itemStyle: {
					normal: {/*color:"#191970",*/
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#288EBE'
						}, {
							offset: 1,
							color: '#6DC0E2'
						}])

					},
				}
			},
			{
				name: dateShow[1],
				type: 'bar',
				stack: 'sum',
				data: data[1],
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#9C67B5'
						}, {
							offset: 1,
							color: '#CE78C3'
						}])

					},
				}
			},
			{
				name: '总计',
				type: 'bar',
				stack: 'sum',
				label: {
					normal: {
						show: true,
						position: 'insideBottom',
						formatter: '{c}',
						textStyle: {     //数值样式
							color: '#ffffff',
							fontSize: 12
						}

					}
				},
				itemStyle: {
					normal: {
						color: 'rgba(128, 128, 128, 0)'
					}
				},
				data: data5
			}
		]
	};
	bar.setOption(option, true);
}

//echar 层叠柱状（每种情况一种颜色）
function bar2(bartype, data) {
	//echars 柱状图对象
	var bar = echarts.init(document.getElementById('barTable'));
	var dateShow = ['3天以内', '3-14天', '14天以上'];
	var barWidth = 24;
	var data4 = function () {
		var datas = [];
		for (var i = 0; i < data[0].length; i++) {
			datas.push(data[0][i] + data[1][i] + data[2][i]);
		}
		return datas;
	}();

	var data5 = data4;
	var max = Math.round(Math.max.apply(null, data5) / 0.8);
	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
		},

		color: ['#5abfde'],  // 柱子颜色
		legend: {  // 图例
			show: true,
			right: '2%',
			data: dateShow,
			textStyle: {//图例文字的样式
				color: '#ffffff'
			}
		},

		grid: {  // 可控制图标大小和位置
			width: 'auto',
			height: 'auto',
			top: '30px', // 距离容器顶部
			bottom: '80px',  // X轴位置距离容器底部
			x: '50px',  // 距离容器X方向距离

			x2: 5,
			//y2:20,
			borderColor: 'transparent',
		},
		xAxis: {
			type: 'category',
			data: barX,
			nameTextStyle: {
				fontSize: 8

			},
			axisLabel: {
				interval: 0,
				rotate: 60,
				formatter: function (value, index) {
					var rt = "";
					for (var i = 0; i < value.length; i++) {
						rt += value.substr(i, 1) + "\n";

					}
					rt = value;
					return rt;

				},
				textStyle: {
					fontSize: 10 // 让字体变大
				}

			},
			axisLine: {
				show: true, // X轴坐标线
				lineStyle: {
					color: '#ffffff',
					width: 1
				}
			},
		},
		yAxis: [
			{
				max: max,
				type: 'value',
				axisLabel: {    // 轴线
					textStyle: {
						color: '#ffffff',
						fontStyle: 'normal',
						fontFamily: '微软雅黑'
					}
				},
				splitLine: {
					show: 'true',
					lineStyle: {
						color: '#5a66bd',
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: true, // Y轴坐标线
					lineStyle: {
						color: '#ffffff',
						width: 1
					}
				}
			},
		],
		series: [
			{
				name: dateShow[0],
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: barWidth,  //柱子宽度
				stack: 'sum',
				data: data[0],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#288EBE'
						}, {
							offset: 1,
							color: '#6DC0E2'
						}])
					},
				}
			},
			{
				name: dateShow[1],
				type: 'bar',
				stack: 'sum',
				data: data[1],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#9C67B5'
						}, {
							offset: 1,
							color: '#CE78C3'
						}])
					},
				}
			}, {
				name: dateShow[2],
				type: 'bar',
				stack: 'sum',
				data: data[2],
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#558551'
						}, {
							offset: 1,
							color: '#68B686'
						}]),
						barBorderRadius: [4, 4, 0, 0]
					},
				}
			},
			{
				name: '总计',
				type: 'bar',
				stack: 'sum',
				label: {
					normal: {
						show: true,
						position: 'insideBottom',
						formatter: '{c}',
						textStyle: {     //数值样式
							color: '#ffffff',
							fontSize: 12
						}

					}
				},
				itemStyle: {
					normal: {
						color: 'rgba(128, 128, 128, 0)'
					}
				},
				data: data4
			}
		]
	};
	bar.setOption(option, true);
}

//echar 简单柱状（颜色渐变）
function bar1(bartype, data) {
	console.log(data);
	//echars 柱状图对象
	var bar = echarts.init(document.getElementById('barTable'));
	//柱状宽度
	var barWidth = 24;

	var option = {
		tooltip: {},
		color: ['#5abfde'],  // 柱子颜色
		legend: {  // 图例
			show: false,
			textStyle: {},
			right: '3%'
		},
		grid: {  // 可控制图标大小和位置
			width: 'auto',  // 宽 & 高
			height: 'auto',
			top: '30px', // 距离容器顶部
			bottom: '80px',  // X轴位置距离容器底部
			x: '50px',  // 距离容器X方向距离
			x2: 5,
			borderColor: 'transparent',
		},
		xAxis: {
			type: 'category',
			data: barX,
			nameTextStyle: {
				fontSize: 8
			},
			axisLabel: {
				interval: 0,
				rotate: 60,
				formatter: function (value, index) {
					var rt = "";
					for (var i = 0; i < value.length; i++) {
						rt += value.substr(i, 1) + "\n";
					}
					rt = value;
					return rt;
				},
				textStyle: {
					fontSize: 10 // 让字体变大
				}
			},
			axisLine: {
				show: true, // X轴坐标线
				lineStyle: {
					color: '#ffffff',
					width: 1
				}
			},
		},
		yAxis: [

			{
				type: 'value',
				axisLabel: {    // 轴线
					textStyle: {
						color: '#ffffff',
						fontStyle: 'normal',
						fontFamily: '微软雅黑'
					}
				},
				splitLine: {
					show: 'true',
					lineStyle: {
						color: '#5a66bd',
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: true, // Y轴坐标线

					lineStyle: {
						color: '#ffffff',
						width: 1
					}
				}
			},
		],
		series: [
			{
				name: name,
				type: 'bar',
				barGap: 0,//柱间距离
				barWidth: barWidth,  //柱子宽度
				itemStyle: {
					emphasis: {
						barBorderRadius: 4    //显示圆角
					},
					normal: {
						barBorderRadius: 4,
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
							offset: 0,
							color: '#99d9ea'
						}, {
							offset: 1,
							color: '#3fa7dc'
						}]),
						label: {
							show: true,      //开启显示
							position: 'top', //在上方显示
							textStyle: {     //数值样式
								color: '#ffffff',
								fontSize: 12
							}
						}
					},
				},
				data: data[0]
			},
		]
	};
	bar.setOption(option, true);
}


/**
 * 在线反馈界面跳转
 */
$("#feedBack").click(function () {
	$(location).attr('href', "/queryCenter/web-monitor/page/feedBack.html?userParam="+ locHref);
});



/**
 * 管理员界面跳转
 */
/*
$("#admin").click(function () {
	// $(location).attr('href', "/queryCenter/web-monitor/page/feedBackManage.html?userParam="+ locHref);
	window.open = 'http://10.124.158.248/springboot'
});*/
