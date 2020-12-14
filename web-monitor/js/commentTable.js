//校验标识
var locHref = getUrlParam("userParam");
//报表标识
var reportKey = getUrlParam("typeTable");
//查询开始日期
var startDate = "";
//查询结束日期
var endDate = "";
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//创建时间
var createDate = getUrlParam("createDate");
//表格要加载的url
var globalUrl;
//时间戳
var reportId;
//表格标识
var tableId;
//非实时表的查询日期
var searchDate;
//产品种类
var prodCatalog = "2I,2C,2E";
//订单来源
var from = "3,4,5,8";
//订单来源二级
var inmodeCatalog = "";

console.info(reportKey);
$(function () {
    var list = $('ul li.chose');
    if (reportKey == "commentStatistic1") {
        $(list[1]).addClass("on");
        $("#tableHead").text("宽融上门问卷评价统计表");
        $("title").html("宽融上门问卷评价统计表");
        $("#wideStartDate").val(new Date().format("yyyy-MM-dd"));
        $("#wideEndDate").val(new Date().format("yyyy-MM-dd")); //默认显示当前日期
        $(".commentExport").attr('disabled', true);
        $(".totalDiv").css('display', 'none');//总共记录不显示
        $("#Lnav").css('width', '201%');
        tableId = $("#wideTable");
        reportKey = "commentStatistic1";
        /*commentTable(tableId,globalUrl,"","");*/
        if (fileName != null && fileName != "") {   //历史查询
            $(".commentExport").attr('disabled', false);
            var date = fileName.split('_');
            $("#wideStartDate").val(date[1]);
            $("#wideEndDate").val(date[2]);
            reportId = getUrlParam("reportId");
            globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + locHref);
            commentTable(globalUrl, tableId);
        }
    }
    if (reportKey == "commentStatistic2") {
        $(list[2]).addClass("on");
        $("#tableHead").text("订单评价统计表（移网业务）");
        $("title").html("订单评价统计表（移网业务）");
        $(".commentExport").attr('disabled', true);
        $(".totalDiv").css('display', 'none');//总共记录不显示
        $("#mobileStartDate").val(new Date().format("yyyy-MM-dd"));
        $("#mobileEndDate").val(new Date().format("yyyy-MM-dd")); //默认显示当前日期
        tableId = $("#mobileTable");
        reportKey = "commentStatistic2";
        if (fileName != null && fileName != "") {   //历史查询
            $(".commentExport").attr('disabled', false);
            var date = fileName.split('_');
            $("#mobileStartDate").val(date[1]);
            $("#mobileEndDate").val(date[2]);

            //订单来源回显
            from = date[3];
            console.log("from " + from);
            if (from == "3,4,5,8") {
                $($("#orderInfo ul li")[0]).addClass('searched');
                $($("#orderInfo ul li")[0]).siblings('li').removeClass('searched');
            } else if (from == "3") {  //集团商城
                $($("#orderInfo ul li")[1]).addClass('searched');
                $($("#orderInfo ul li")[1]).siblings('li').removeClass('searched');
                $("#internet").css("display", "block");
                $("#woYiSale").css("display", "none");
                $("#thirdParty").css("display", "none");
                $("#entityInfo").css("display", "none");
            } else if (from == "4,5,8") { //沃易售
                $($("#orderInfo ul li")[2]).addClass('searched');
                $($("#orderInfo ul li")[2]).siblings('li').removeClass('searched');
                $("#internet").css("display", "none");
                $("#woYiSale").css("display", "block");
                $("#thirdParty").css("display", "none");
                $("#entityInfo").css("display", "none");
            } else if (from == "5,8") {
                $($("#orderInfo ul li")[3]).addClass('searched');
                $($("#orderInfo ul li")[3]).siblings('li').removeClass('searched');
                $("#internet").css("display", "none");
                $("#woYiSale").css("display", "none");
                $("#thirdParty").css("display", "block");
                $("#entityInfo").css("display", "none");
            }

            //产品种类回显
            prodCatalog = date[4];
            console.log("prodCatalog " + prodCatalog);
            switch (prodCatalog) {
                case "2I,2C,2E":
                    $($("#businessInfo ul li")[0]).addClass('searched');
                    $($("#businessInfo ul li")[0]).siblings('li').removeClass('searched');
                    break;
                case "2I,2E":
                case "2I":
                    $($("#businessInfo ul li")[1]).addClass('searched');
                    $($("#businessInfo ul li")[1]).siblings('li').removeClass('searched');
                    break;
                case "2C":
                    $($("#businessInfo ul li")[2]).addClass('searched');
                    $($("#businessInfo ul li")[2]).siblings('li').removeClass('searched');
                    break;
                default:
                    break;
            }

            inmodeCatalog = date[5];
            reportId = getUrlParam("reportId");
            globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + locHref);
            commentTable(globalUrl, tableId);
        }
    }
    if (reportKey == "commentStatistic3") {
        $(list[3]).addClass("on");
        $("#tableHead").text("订单评价统计表（快线&专线）");
        $("title").html("订单评价统计表（快线&专线）");
        //$("#lineEndDate").val(new Date().format("yyyy-MM-dd"));
        $(".Lcheck").css('font-size', '13px');
        $(".commentExport").attr('disabled', true);
        $(".totalDiv").css('display', 'none');//总共记录不显示
        $("#lineStartDate").val(new Date().format("yyyy-MM-dd"));
        $("#lineEndDate").val(new Date().format("yyyy-MM-dd")); //默认显示当前日期
        tableId = $("#lineTable");
        reportKey = "commentStatistic3";
        if (fileName != null && fileName != "") {   //历史查询
            $(".commentExport").attr('disabled', false);
            var fileNameItem = sessionStorage.getItem("fileName");
            var date = fileNameItem.split('_');
            $("#lineStartDate").val(date[1]);
            $("#lineEndDate").val(date[2]);
            reportId = getUrlParam("reportId");
            globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + locHref);
            commentTable(globalUrl, tableId);
        }
    }
    if (reportKey == "commentDetail1") {
        $(list[4]).addClass("on");
        $("#Lnav").css('width', '251%');
        $("#tableHead").text("宽融上门问卷评价明细表");
        $("title").html("宽融上门问卷评价明细表");
        $(".totalDiv").css('display', 'none');
        searchDate = getPreMonth(new Date().format("yyyy-MM"));
        $("#wideMouthDate").val(getPreMonth(new Date().format("yyyy-MM")));
        tableId = $("#wideDetailTable");
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate)
        commentTable(globalUrl, tableId);
    }
    if (reportKey == "commentDetail2") {
        $(list[5]).addClass("on");
        $("#tableHead").text("订单评价明细表（移网业务）");
        $("title").html("订单评价明细表（移网业务）");
        $(".totalDiv").css('display', 'none');
        $("#mobileMouthDate").val(getPreMonth(new Date().format("yyyy-MM")));
        searchDate = getPreMonth(new Date().format("yyyy-MM"));
        tableId = $("#mobileDetailTable");
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate + "&from=" + from + "&prodCatalog=" + prodCatalog + "&inmodeCatalog=" + inmodeCatalog)
        commentTable(globalUrl, tableId);
    }
    if (reportKey == "commentDetail3") {
        $(list[6]).addClass("on");
        $("#tableHead").text("订单评价明细表（快线&专线）");
        $("title").html("订单评价明细表（快线&专线）");
        $(".totalDiv").css('display', 'none');
        $("#lineMouthDate").val(getPreMonth(new Date().format("yyyy-MM")));
        $(".Lcheck").css('font-size', '13px');
        tableId = $("#lineDetailTable");
        searchDate = getPreMonth(new Date().format("yyyy-MM"));
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate)
        commentTable(globalUrl, tableId);
    }
    if (reportKey == "commentDetail4") {
        $(list[7]).addClass("on");
        $("#tableHead").text("订单建议明细");
        $("title").html("订单建议明细");
        $(".totalDiv").css('display', 'none');
        $("#adviceMouthDate").val(new Date().format("yyyy-MM"));
        tableId = $("#adviceDetailTable");
        searchDate = new Date().format("yyyy-MM");
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate)
        commentTable(globalUrl, tableId);
        /*refreshTable();*/
    }
    if (reportKey == "ocOrderReserved") {
        $(list[8]).addClass("on");
        $("#tableHead").text("订单中心乱序订单");
        $("title").html("订单中心乱序订单");
        $(".totalDiv").css('display', 'none');
        tableId = $("#ocOrderReservedTable");
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref)
        commentTable(globalUrl, tableId);
        /*refreshTable();*/
    }
    /*if(flag==1){
    	$("#tableHead").text("订单建议明细");
    	var table = $("#adviceDetailTable");
    	var url = "table.json";
    	commentTable(table,url,"","");
    }
    */
    /* $(".wideCommentTable").css('display','none');*/

});
$(".submitBtn").click(function () {

    if (reportKey == "commentStatistic1") {   //宽融业务
        tableId = $("#wideTable");
        globalUrl = "table.json";
        reportKey = "commentStatistic1";
        var startDate = $("#wideStartDate").val();
        var endDate = $("#wideEndDate").val();
        var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
        $("#Lnav").after(fakeLoader);
        /*$(".commentExport").attr('disabled',true);*/
        firstReresh(startDate, endDate, reportKey, locHref);
    }
    if (reportKey == "commentStatistic2") {   //移网业务

        tableId = $("#mobileTable");
        globalUrl = "table.json";
        reportKey = "commentStatistic2";
        var startDate = $("#mobileStartDate").val();
        var endDate = $("#mobileEndDate").val();
        var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
        $("#Lnav").after(fakeLoader);
        /*$(".commentExport").attr('disabled',true);*/
        //订单来源二级处理
        inmodeCatalog = dealInmodeCatalog(from);
        prodCatalog = unitShopDeal(prodCatalog, from);
        firstReresh(startDate, endDate, reportKey, locHref);
    }
    if (reportKey == "commentStatistic3") {  //快线和专线
        tableId = $("#lineTable");
        globalUrl = "table.json";
        reportKey = "commentStatistic3";
        var startDate = $("#lineStartDate").val();
        var endDate = $("#lineEndDate").val();
        var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
        $("#Lnav").after(fakeLoader);
        /*$(".commentExport").attr('disabled',true);*/
        firstReresh(startDate, endDate, reportKey, locHref);
    }
    if (reportKey == "commentDetail1") {  //评价明细（宽融业务）
        tableId = $("#wideDetailTable");
        searchDate = $("#wideMouthDate").val();
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate)
        commentTable(globalUrl, tableId);
    }
    if (reportKey == "commentDetail2") {  //评价明细（移网业务）
        tableId = $("#mobileDetailTable");
        searchDate = $("#mobileMouthDate").val();
        inmodeCatalog = dealInmodeCatalog(from);
        prodCatalog = unitShopDeal(prodCatalog, from);
        console.log("获取的inmodeCatalog值是" + inmodeCatalog);
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate + "&from=" + from + "&prodCatalog=" + prodCatalog + "&inmodeCatalog=" + inmodeCatalog)
        commentTable(globalUrl, tableId);
    }
    if (reportKey == "commentDetail3") {  //评价明细（快线&专线）
        tableId = $("#lineDetailTable");
        searchDate = $("#lineMouthDate").val();
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate)
        commentTable(globalUrl, tableId);
    }
    if (reportKey == "commentDetail4") {  //建议明细
        tableId = $("#adviceDetailTable");
        searchDate = $("#adviceMouthDate").val();
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate)
        commentTable(globalUrl, tableId);
        /*refreshTable();*/
    }
    if (reportKey == "ocOrderReserved") {  //订单中心乱序
        tableId = $("#lineTable");
        reportKey = "ocOrderReserved";
        var startDate = $("#lineStartDate").val();
        var endDate = $("#lineEndDate").val();
        var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
        $("#Lnav").after(fakeLoader);
        globalUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + locHref + "&reportDate=" + searchDate + "&from=" + from + "&prodCatalog=" + prodCatalog + "&inmodeCatalog=" + inmodeCatalog)
        commentTable(globalUrl, tableId);
    }
    /*   if(flag==1){
           var table = $("#adviceDetailTable");
           var url = "table.json";
           var searchDate = $("#adviceMouthDate").val();
           commentTable(table,url,searchDate,"");
       }*/
})

/*首次进入时页面交互 实时表*/
function firstReresh(startDate, endDate, reportKey, locHref) {
    //存储传入参数到配置表
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate=" + startDate + "&endDate=" + endDate + "&reportKey=" + reportKey + "&userParam=" + locHref + "&from=" + from + "&prodCatalog=" + prodCatalog + "&inmodeCatalog=" + inmodeCatalog),
        //url : "../staticReport/result.json",
        data: {
            "startDate": startDate,
            "endDate": endDate,
            "reportKey": reportKey,
            "userParam": locHref
        },
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            reportId = data.rows[0].report_id;
            if (data.rows[0].flag == '0' || data.rows[0].flag == '1') {
                console.log("第一次" + Date.parse(new Date()));
                $("#fakeLoader").fakeLoader({
                    timeToHide: 600000,
                    zIndex: "999",//
                    spinner: "spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
                    bgColor: "#000000",
                });
                console.log("第二次" + Date.parse(new Date()));
                getReportState(reportKey, reportId);
                //前台表格显示数据
                console.log('定时任务执行成功');
            } else if (data.rows[0].flag == '2') {
                globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey=" + reportKey + "&userParam=" + locHref + "&reportId=" + reportId)
                commentTable(globalUrl, tableId);
                $("#exportBtn").attr('disabled', false);
            } else if (data.rows[0].flag == '4') {
                layer.msg('请查看历史数据！', {
                    time: 2000 //2s后自动关闭
                });
            } else if (data.rows[0].flag == '3') {
                layer.msg(data.rows[0].exception, {
                    time: 2000 //2s后自动关闭
                });
            } else {
                console.log("出现异常1");
            }
        }
    });
}

/*调用第二个接口，每隔两秒判断返回状态*/
function getReportState(reportKey, reportId) {
    console.log("第三次" + Date.parse(new Date()));
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/find?reportId=" + reportId + "&reportKey=" + reportKey + "&userParam=" + locHref),
        //url : "../staticReport/result2.json",
        data: {
            "reportKey": reportKey,
            "reportId": reportId,
            "userParam": locHref
        },
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            if (data.state == "1" && data.rows[0].flag == '2') {
                //去除弹窗层
                $("#fakeLoader").remove();
                //前台表格显示数据
                globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey=" + reportKey + "&userParam=" + locHref + "&reportId=" + reportId);
                commentTable(globalUrl, tableId);
                $(".commentExport").attr('disabled', false);
            } else {
                //继续调用定时任务
                setTimeout("getReportState(reportKey,reportId)", 2000);
            }
        }
    });
}

/*导出按钮点击方法(实时表）*/
$(".commentExport").click(function () {
    $.download(getOutUrl(getRootPath_web(), "/reportdetail/export?reportId=" + reportId + "&userParam=" + locHref), 'post');
})

/*导出按钮点击方法(非实时表）*/
$(".exportBtn").click(function () {
    inmodeCatalog = dealInmodeCatalog(from);
    prodCatalog = unitShopDeal(prodCatalog, from); //集团商城且订单来源不是2C，添加2E来源
    $.download(getOutUrl(getRootPath_web(), "/report/export?reportDate=" + searchDate + "&reportKey=" + reportKey + "&userParam=" + locHref + "&from=" + from + "&prodCatalog=" + prodCatalog + "&inmodeCatalog=" + inmodeCatalog), 'post');
})
/*历史查询*/
//打开历史查询表格
$(".historySearch").click(function () {
    $(".historyCommentTable").modal('show');
    var urlAddress = "../table.json";
    var table = $(".historyTable");
    historyTable(table, reportKey, reportId);
})

//关闭历史查询表格
$('.close_table').click(function () {
    $('.historyCommentTable').modal('hide')
})

/*表格数据加载*/
function commentTable(globalUrl, tableId) {
    tableId.bootstrapTable('destroy')
    tableId.bootstrapTable({
        //url: "http://localhost:8080/testSpringMvc/test/list.do"
        url: globalUrl
        /* url:getOutUrl(getRootPath_web(), "/report/find?type=9A&userParam="+locHref+"&reportDate="+reportDate+"&saleArea="+saleArea)*/
        /*,toggle: "table"*/
        , height: 400
        , method: "post"  //测试get
        , contentType: "application/x-www-form-urlencoded"
        , queryParams: "queryParams"
        , pagination: false
        , sidePagination: "server"
        , pageNumber: "1"
        , pageSize: "10"
        /*,pageList: "[5, 10, 20, 50 ]"*/
        , showRefresh: false
        , showToggle: false
        , showPaginationSwitch: false
        , showColumns: false
        , search: false
        , searchAlign: "left"
        , sortName: "menuid"
        , sortOrder: "asc"
        , queryParams: function (params) {
            return {}
        }
        , onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
            /*$(".fixed-table-body").css('height','400');*/
        }
        , onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }
        , responseHandler: function (res) {//获取数据解析

            var obj = {total: 0, rows: []};//table表格需要
            obj.total = res.total;
            if (res.state == "0") {
                obj.total = "0";
            }
            $(".totalDiv").css('display', 'block');
            $(".totalDate").html(obj.total);
            if (res.state != "0" && res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {   //针对建议表进行特殊处理
                    if (res.rows[i].ex_trade_id == undefined) {
                        res.rows[i].ex_trade_id = "";
                    }
                    if (res.rows[i].bss_subscribe_id == undefined) {
                        res.rows[i].bss_subscribe_id = "";
                    }
                    if (res.rows[i].comment == undefined) {
                        res.rows[i].comment = "";
                    }
                    if (res.rows[i].develop_area_name == undefined) {
                        res.rows[i].develop_area_name = "";
                    }
                    if (res.rows[i].area_name_name == undefined) {
                        res.rows[i].area_name_name = "";
                    }
                    if (res.rows[i].product_name == undefined) {
                        res.rows[i].product_name = "";
                    }
                    if (res.rows[i].serial_number == undefined) {
                        res.rows[i].serial_number = "";
                    }
                    if (res.rows[i].addr_name == undefined) {
                        res.rows[i].addr_name = "";
                    }
                    if (res.rows[i].customer_name == undefined) {
                        res.rows[i].customer_name = "";
                    }
                    if (res.rows[i].accept_date == undefined) {
                        res.rows[i].accept_date = "";
                    }
                }
            }

            obj.rows = res.rows;
            console.log(obj.rows)
            return obj;
        }
    });
}

/*获取上个月*/
function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}

/*获取下个月*/
function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}

var dataArr = [];
/*function refreshTable( ){
	console.log($("#adviceDetailTable tbody tr"))
	$("#adviceDetailTable tbody tr").forEach(function(index,item){
		dataArr.push(item);
		console.log(dataArr)
		var a = $(this).html();
		//var a = $(this)[2].html();
		//console.log($(this));
		
	})
}
*/

//点击订单来源栏
$("#orderInfo ul li").click(function () {
    from = "3,4,5,8";
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    if ($(this).index() == 1) { //集团商城
        $("#internet").css("display", "block");
        $("#woYiSale").css("display", "none");
        $("#thirdParty").css("display", "none");
        $("#entityInfo").css("display", "none");
        var liList = $("#internet ul li");
        $(liList[0]).addClass("searched")
        for (var i = 1; i < liList.length; i++) {
            $(liList[i]).removeClass("searched");
        }
        from = "3";
    } else if ($(this).index() == 2) { //沃易售
        $("#internet").css("display", "none");
        $("#woYiSale").css("display", "block");
        $("#thirdParty").css("display", "none");
        $("#entityInfo").css("display", "none");
        var liList = $("#woYiSale ul li");
        $(liList[0]).addClass("searched")
        for (var i = 1; i < liList.length; i++) {
            $(liList[i]).removeClass("searched");
        }
        from = "4,5,8";
    } else if ($(this).index() == 3) { //第三方
        $("#internet").css("display", "none");
        $("#woYiSale").css("display", "none");
        $("#thirdParty").css("display", "block");
        $("#entityInfo").css("display", "none");
        var liList = $("#thirdParty ul li");
        $(liList[0]).addClass("searched")
        for (var i = 1; i < liList.length; i++) {
            $(liList[i]).removeClass("searched");
        }
        from = "5,8";
    } else if ($(this).index() == 4) { //线下实体（预留）
        $("#internet").css("display", "none");
        $("#woYiSale").css("display", "none");
        $("#thirdParty").css("display", "none");
        $("#entityInfo").css("display", "block");
        var liList = $("#entityInfo ul li");
        $(liList[0]).addClass("searched")
        for (var i = 1; i < liList.length; i++) {
            $(liList[i]).removeClass("searched");
        }
    } else { //全部
        $("#internet").css("display", "none");
        $("#woYiSale").css("display", "none");
        $("#thirdParty").css("display", "none");
        $("#entityInfo").css("display", "none");
    }
});

//点击产品种类
$("#businessInfo ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    prodCatalog = $(this).attr("value1")
})


//集团商城特殊处理
function unitShopDeal(prodCatalog, from) {
    if ("2I" == prodCatalog && "3" == from) { //集团商城且订单来源不是2C，添加2E来源
        prodCatalog = "2I,2E";
    } else if ("2I,2E" == prodCatalog && "3,4,5,8" != from) {//选中2I且订单来源不是全部，产品类型只有2I
        prodCatalog = "2I";
    }
    return prodCatalog;
}

//订单来源二级处理
function dealInmodeCatalog(from) {
    if ("4,5,8" == from) { //沃易售
        inmodeCatalog = "A3,A4";
    } else if ("5,8" == from) { //第三方
        inmodeCatalog = "A1,A2,A5,A6,A7";
    } else {
        inmodeCatalog = "";
    }
    return inmodeCatalog;
}