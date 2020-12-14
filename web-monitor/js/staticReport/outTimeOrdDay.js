/**
 * 超时订单日通报表
 */
//报表标识
var reportKey;

//查询的URL地址
var searchUrl;

//查询日期
var reportDate

//线上总数据
var overTimeOnDayCount

//线上总数据
var overTimeOffDayCount
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//部门
var areaCode = "";

/*根据接口请求数据并展示*/

/*每个方法的调用不同，当有数据的时候数据的展示和数据的格式需要根据传入的进行调整*/
function dateTabel(reportKey, reportDate, searchUrl) {
    $("#" + reportKey + "Table").bootstrapTable('destroy')
    $("#" + reportKey + "Table").bootstrapTable({
        url: searchUrl
        /*向后台请求的方法接口*/
        //url:getOutUrl(getRootPath_web(), "/report/find?userParam="+getUrlParam("userParam")+"&reportDate="+reportDate+"&saleArea="+saleArea+"&reportKey="+reportKey)
        , toggle: "table"
        , height: 400
        , method: 'post'  //测试get 正式用post
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
        /*,async:false*/
        , searchAlign: "left"
        , queryParams: function (params) {
            return {
                reportDate: reportDate,
                userParam: getUrlParam("userParam"),
                reportKey: reportKey
            }
        }
        , onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
            $("#exportBtn").attr('disabled', false);
            $("#exportBtn2").attr('disabled', false);
        }
        , onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }
        , responseHandler: function (res) {//获取数据解析
            console.log(res);
            var obj = {total: 0, rows: []};//table表格需要
            console.log(res.state);
            obj.total = res.total;
            if (res.state == "0") {
                obj.total = "0";
            }
            if (reportKey == "overTimeOnDayCount") {
                overTimeOnDayCount = res;
                console.log("进入系统" + overTimeOnDayCount);
            } else {
                overTimeOffDayCount = res;
            }
            $("#" + reportKey + "Div").css('display', 'block');
            $("#" + reportKey + "Date").html(obj.total);
            obj.rows = res.rows;
            console.info("responseHandler:" + obj);
            return obj;
        }
    });
}

/*界面点击进来的展示*/
$(function () {

    if (fileName == null || fileName == "") {
        //普通查询
        var date = new Date();
        date.setDate(date.getDate() - 1); //设置天数 -1
        var searchDate = date.format("yyyy-MM-dd");
        $("#startDate").val(searchDate);
        $("#exportBtn").attr('disabled', true);//导出按钮不可用
        $(".totalDiv").css('display', 'none');//总共记录不显示
    } else {
        //var condition = {"areaCode":"","endDate":"2019-01-15","inmodeCatalog":"","prodCatalog":"","startDate":"2019-01-14","tradeCatalog":""}
        $("#startDate").val(condition.startDate);
        reportKey = getUrlParam("typeTable");
        //分类口径和销售线回显
        if (reportKey == "overTimeOnDayCount") {
            $($("#branchInfo ul li")[0]).addClass('searched');
            $($("#branchInfo ul li")[1]).removeClass('searched');
            var areaCodeBack = condition.areaCode;
            var areaArr0 = ["2", "3", "4", "5", "7", "8"];
            var areaArr1 = ["802", "801", "804", "806", "803"]
            var areaArr2 = ["809", "808", "805", "807", "810"]
            var areaArr3 = ["10", "9999"]
            if (areaArr1.indexOf(areaCodeBack) != -1) {
                $(".branchItem").hide().eq(1).show();
                $("#selectBranch").find("option[value='近郊']").attr("selected", true);
                $(".branchItem").eq(1).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            } else if (areaArr2.indexOf(areaCodeBack) != -1) {
                $(".branchItem").hide().eq(2).show();
                $("#selectBranch").find("option[value='远郊']").attr("selected", true);
                $(".branchItem").eq(2).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            } else if (areaArr3.indexOf(areaCodeBack) != -1) {
                $(".branchItem").hide().eq(3).show();
                $("#selectBranch").find("option[value='部门中心']").attr("selected", true);
                $(".branchItem").eq(3).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            } else if (areaArr0.indexOf(areaCodeBack) != -1) {
                $(".branchItem").hide().eq(0).show();
                $("#selectBranch").find("option[value='市区']").attr("selected", true);
                $(".branchItem").eq(0).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            }
            $(".developItem").hide();

        } else {
            $($("#branchInfo ul li")[1]).addClass('searched');
            $($("#branchInfo ul li")[0]).removeClass('searched');
            var areaCodeBack = condition.areaCode;
            var areaArr0 = ["225", "226", "211", "212", "213", "214"];
            var areaArr1 = ["217", "219", "220", "218", "216"]
            var areaArr2 = ["223", "221", "215", "222", "224"]
            var areaArr3 = ["227", "11a0al", "11a01s", "dkhzx", "11a01q", "11a08x"]
            if (areaArr1.indexOf(areaCodeBack) != -1) {
                $(".developItem").hide().eq(1).show();
                $("#selectBranch").find("option[value='近郊']").attr("selected", true);
                $(".developItem").eq(1).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            } else if (areaArr2.indexOf(areaCodeBack) != -1) {
                $(".developItem").hide().eq(2).show();
                $("#selectBranch").find("option[value='远郊']").attr("selected", true);
                $(".developItem").eq(2).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            } else if (areaArr3.indexOf(areaCodeBack) != -1) {
                $(".developItem").hide().eq(3).show();
                $("#selectBranch").find("option[value='部门中心']").attr("selected", true);
                $(".developItem").eq(3).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            } else if (areaArr0.indexOf(areaCodeBack) != -1) {
                $(".developItem").hide().eq(0).show();
                $("#selectBranch").find("option[value='市区']").attr("selected", true);
                $(".developItem").eq(0).find("option[value=" + areaCodeBack + "]").attr("selected", true);
            }
            $(".branchItem").hide();
        }
        reportId = getUrlParam("reportId");
        globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + locHref);
        dateTabel(globalUrl, reportId, reportKey, locHref);
    }
});

//分类口径
var clickFlag = 0;
$("#branchInfo ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');

    clickFlag = $(this).index();
    branchFlag = -1;
    $("#selectBranch option:first").prop("selected", 'selected');
    $(".branchItem").hide();
    $(".developItem").hide();

    //调用后台权限接口
    var queryValue = queryPermission(reportKey);

    //初始化销售线展示
    areaCode = intSaleLine(queryValue, reportKey, areaCode);
})

//部门选择
var branchFlag;
$("#selectBranch").change(function () {
    branchFlag = $(this).get(0).selectedIndex - 1;
    if (clickFlag == 0) {
        $(".branchItem").hide().eq(branchFlag).show();
    } else {
        $(".developItem").hide().eq(branchFlag).show();
    }
    if (branchFlag == -1) {
        $(".branchItem").hide();
        $(".developItem").hide();
    }
});

//获取areaCode
function getAreaCode() {
    if (branchFlag == -1 && !$("#selectBranch").prop("disabled")) {
        areaCode = "";
    } else {
        areaCode = $('.branchItem').eq(branchFlag).find("option:selected").val()
    }
}

/*历史查询*/
//打开历史查询表格
$("#historySearch").click(function () {
    $(".historyCommentTable").modal('show');
    var urlAddress = "../table.json";
    var table = $(".historyTable");
    reportKeyHis = "overTimeOnDayCount,overTimeOnDayByGrid";
    historyTable(table, reportKeyHis, reportId);
})
$("#historySearch1").click(function () {
    $(".historyCommentTable").modal('show');
    var urlAddress = "../table.json";
    var table = $(".historyTable");
    reportKeyHis = "overTimeOffDayCount,overTimeOffDayByGrid";
    historyTable(table, reportKeyHis, reportId);
})

//关闭历史查询表格
$('.close_table').click(function () {
    $('.historyCommentTable').modal('hide')
})

/*查询按钮点击方法*/
$("#searchBtn").click(function () {
    var startDate = $("#startDate").val();


    //线上
    reportKey = "overTimeOnDayCount";
    getAreaCode();
    if (areaCode != "" && areaCode != null && areaCode != undefined) {
        reportKey = "overTimeOnDayByGrid";
        $("#overTimeOnDateCount2").attr("style", "display:block;");
        $("#overTimeOffDateCount2").attr("style", "display:block;");
        $("#overTimeOnDateCount").attr("style", "display:none;");
        $("#overTimeOffDateCount").attr("style", "display:none;");
    } else {
        $("#overTimeOnDateCount").attr("style", "display:block;");
        $("#overTimeOffDateCount").attr("style", "display:block;");
        $("#overTimeOnDateCount2").attr("style", "display:none;");
        $("#overTimeOffDateCount2").attr("style", "display:none;");
    }
    searchUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + getUrlParam("userParam") + "&reportDate=" + startDate + "&areaCode=" + areaCode);
    /*调用数据展示的方法*/
    dateTabel(reportKey, reportDate, searchUrl);

    //线下
    reportKey = "overTimeOffDayCount";
    getAreaCode();
    if (areaCode != "" && areaCode != null && areaCode != undefined) {
        reportKey = "overTimeOffDayByGrid";
    }
    searchUrl = getOutUrl(getRootPath_web(), "/report/find?reportKey=" + reportKey + "&userParam=" + getUrlParam("userParam") + "&reportDate=" + startDate + "&areaCode=" + areaCode);
    /!*调用数据展示的方法*!/
    dateTabel(reportKey, reportDate, searchUrl);
})

//标题数据汇总
function titleShow(overTimeOnDayCount, overTimeOffDayCount, reportDate) {
    var titleName = "截至XXXX年XX月XX日16时，北京公司今日累计总订单量XXXX，在途量XXX，竣工量XXXX，超时量XXXX";
    var year = reportDate.substr(0, 4);
    var month = reportDate.substr(5, 2);
    var day = reportDate.substr(8, 2);
    //订单量
    var ordNum = "0";
    //在途量
    var processCount = "0";
    //超时量
    var overCount = "0";
    //竣工量
    var junGong = "0";

    //判断日月是否是不到两位
    if (month.substr(0, 1) == "0") {
        month = month.substr(1, 1);
    }

    if (day.substr(0, 1) == "0") {
        day = day.substr(1, 1);
    }
    console.log(overTimeOnDayCount.total);
    console.log(overTimeOffDayCount.total);

    //合并指标值
    if (overTimeOnDayCount.total > 0 && overTimeOffDayCount.total > 0) {
        var overTimeOnDay = overTimeOnDayCount.rows[overTimeOnDayCount.total - 1];
        var overTimeOffDay = overTimeOffDayCount.rows[overTimeOffDayCount.total - 1];
        ordNum = overTimeOnDay.incount + overTimeOffDay.incount;
        processCount = overTimeOnDay.processcount_a8 + overTimeOnDay.processcount_a9 + overTimeOnDay.processcount_a10 + overTimeOnDay.processcount_a11 + overTimeOffDay.processcount_a1 + overTimeOffDay.processcount_a2 + overTimeOffDay.processcount_a19;
        overCount = overTimeOnDay.overcount_8 + overTimeOnDay.overcount_9 + overTimeOnDay.overcount_10 + overTimeOnDay.overcount_11 + overTimeOffDay.overcount_1 + overTimeOffDay.overcount_2 + overTimeOffDay.overcount_19;
        junGong = overTimeOnDay.finishcount;
    } else if (overTimeOnDayCount.total > 0) {
        var overTimeOnDay = overTimeOnDayCount.rows[overTimeOnDayCount.total - 1];
        ordNum = overTimeOnDay.incount;
        processCount = overTimeOnDay.processcount_a8 + overTimeOnDay.processcount_a9 + overTimeOnDay.processcount_a10 + overTimeOnDay.processcount_a11;
        overCount = overTimeOnDay.overcount_8 + overTimeOnDay.overcount_9 + overTimeOnDay.overcount_10 + overTimeOnDay.overcount_11;
        junGong = overTimeOnDay.finishcount;
    } else if (overTimeOffDayCount.total > 0) {
        var overTimeOffDay = overTimeOffDayCount.rows[overTimeOffDayCount.total - 1];
        ordNum = overTimeOffDay.incount;
        processCount = overTimeOffDay.processcount_a1 + overTimeOffDay.processcount_a2 + overTimeOffDay.processcount_a19;
        overCount = overTimeOffDay.overcount_1 + overTimeOffDay.overcount_2 + overTimeOffDay.overcount_19;
    }

    $("#title").html("截至" + year + "年" + month + "月" + day + "日16时，北京公司今日累计总订单量" + ordNum + "，在途量" + processCount + "，竣工量" + junGong + "，超时量" + overCount + "");
}

/*//线下
$("#searchBtn1").click(function(){
    var reportDate = $("#overTimeOffDate").val();
    searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate);
    /!*调用数据展示的方法*!/
    reportKey="overTimeOffDayCount";
    dateTabel(reportKey,reportDate,searchUrl);
})*/

/*导出按钮点击方法*/

$("#exportBtn").click(function () {
    //线上
    var startDate = $("#startDate").val();

    /*调用后台导出的方法*/
    reportKey = "overTimeOnDayCount";
    getAreaCode();
    if (areaCode != "" && areaCode != null && areaCode != undefined) {
        reportKey = "overTimeOnDayByGrid";
    }
    $.download(getOutUrl(getRootPath_web(), "/report/export?reportKey=" + reportKey + "&userParam=" + getUrlParam("userParam") + "&reportDate=" + startDate + "&areaCode=" + areaCode), 'post');
})

$("#exportBtn1").click(function () {

    var startDate = $("#startDate").val();
    //线下
    /*调用后台导出的方法*/
    reportKey = "overTimeOffDayCount";
    getAreaCode();
    if (areaCode != "" && areaCode != null && areaCode != undefined) {
        reportKey = "overTimeOffDayByGrid";
    }
    $.download(getOutUrl(getRootPath_web(), "/report/export?reportKey=" + reportKey + "&userParam=" + getUrlParam("userParam") + "&reportDate=" + startDate + "&areaCode=" + areaCode), 'post');
})



