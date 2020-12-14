//报表标识
//告警短信发送情况汇总（移网）
var reportKey = "warnSmsSendCountFromMobile";
//校验标识
var locHref = getUrlParam("userParam");
//开始时间、结束时间
var startDate;
var endDate;
//订单来源
var inmodeCatalog = "";
//业务类型
var prodCatalog = "";
//服务类型
var tradeCatalog = "0,1";
//部门
var areaCode = "";
//时间戳
var reportId;
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//历史查询的筛选条件
var condition = JSON.parse(JSON.parse(decodeURI(getUrlParam("condition"))));
/*界面点击进来的展示*/
$(function () {
    $("#Lnav_text").text("告警短信发送情况汇总(移网)");
    if (fileName == null || fileName == "") {
        var curDate = new Date();
        $("#endAcceptDate").val(new Date(curDate.getTime() - 24 * 60 * 60 * 1000).format("yyyy-MM-dd"));
        $("#startAcceptDate").val(new Date(curDate.getTime() - 24 * 60 * 60 * 1000).format("yyyy-MM-dd"));
        $("#exportBtn").attr('disabled', true);//导出按钮不可用
        $(".totalDiv").css('display', 'none');//总共记录不显示
    } else {
        $("#startAcceptDate").val(condition.startDate);
        $("#endAcceptDate").val(condition.endDate);
        reportKey = getUrlParam("typeTable");
        $(".developItem").hide();
        reportId = getUrlParam("reportId");
        globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + locHref);
        dateTabel(globalUrl, reportId, reportKey, locHref);
    }

    //调用后台权限接口
    var queryValue = queryPermission(reportKey);

    //初始化销售线展示
    areaCode = intSaleLine(queryValue, reportKey, areaCode);
});

/*查询按钮点击方法*/
$("#searchBtn").click(function () {
    var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
    $("#Lnav").after(fakeLoader);
    startDate = $("#startAcceptDate").val();
    endDate = $("#endAcceptDate").val();
    var date = DateDiff(startDate, endDate);
    if (date > 31) {
        layer.msg("最大查询时间为31天", {
            time: 2000
        });
        return false;
    }
    firstReresh(startDate, endDate);
});
/*导出按钮点击方法*/
$("#exportBtn").click(function () {
    $.download(getOutUrl(getRootPath_web(), "/reportdetail/export?reportId=" + reportId + "&userParam=" + locHref), 'post');
});
/*历史查询*/
//打开历史查询表格
$("#historySearch").click(function () {
    $(".historyCommentTable").modal('show');
    var urlAddress = "../table.json";
    var table = $(".historyTable");
    reportKeyHis = "warnSmsSendCountFromMobile";
    historyTable(table, reportKeyHis, reportId);
});

//关闭历史查询表格
$('.close_table').click(function () {
    $('.historyCommentTable').modal('hide')
});

/*首次进入时页面交互 实时表*/
function firstReresh(startDate, endDate) {
    //存储传入参数到配置表
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate=" + startDate + "&endDate=" + endDate + "&reportKey=" + reportKey + "&userParam=" + locHref),
        data: {
            "startDate": startDate,
            "endDate": endDate
        },
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            reportId = data.rows[0].report_id;
            if (data.rows[0].flag == '0' || data.rows[0].flag == '1') {
                $("#fakeLoader").fakeLoader({
                    timeToHide: 600000,
                    zIndex: "999",//
                    spinner: "spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
                    bgColor: "#000000",
                });
                getReportState(reportKey, reportId);
            } else if (data.rows[0].flag == '2') {
                globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey=" + reportKey + "&userParam=" + locHref + "&reportId=" + reportId)
                dateTabel(globalUrl, searchDate, reportKey, locHref);
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
                dateTabel(globalUrl, reportKey, locHref, reportId);
                $("#exportBtn").attr('disabled', false);
            } else {
                //继续调用定时任务
                setTimeout("getReportState(reportKey,reportId)", 2000);
            }
        }
    });
}

function dateTabel(globalUrl, reportId, reportKey, locHref) {
    $("#orderFlowTable").bootstrapTable('destroy');
    $('#orderFlowTable').bootstrapTable({
        url: globalUrl
        //url:"backcount.json"
        , toggle: "table"
        , height: 300
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
        , searchAlign: "left"
        , sortName: "menuid"
        , sortOrder: "asc"
        , queryParams: function (params) {
            return {
                userParam: locHref
            }
        }
        , onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
        }
        , onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }
        , responseHandler: function (res) {//获取数据解析
            //根据数据的返回格式解析这里可能需要修改
            var obj = {total: 0, rows: []};//table表格需要
            obj.total = res.total;
            $(".totalDiv").css('display', 'block');
            $("#totalDate").html(obj.total);
            obj.rows = res.rows;
            for (var i = 0; i < res.rows.length; i++) {
                if (res.rows[i].back_type == undefined) {
                    res.rows[i].back_type = "";
                }
            }
            console.info("responseHandler:" + obj);
            //$("#searchDate").val("-----");//查看历史时赋值
            return obj;
        }
    });
}


function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为12-18-2002格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);//把相差的毫秒数转换为天数
    return iDays
}