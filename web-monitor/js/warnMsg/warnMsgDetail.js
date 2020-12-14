 //报表标识
var reportKey;
var reportKeyByArea;
var reportKeyByDevelop;
var reportName = "warnSmsSendDetailFromInternet";
//校验标识
var locHref = getUrlParam("userParam");
//开始时间、结束时间
var startDate;
//订单来源
var inmodeCatalog = "";
//产品种类
var prodCatalog = "";
//部门不需要参数
var department;
//时间戳
var reportId;
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//历史查询的筛选条件
var condition = JSON.parse(JSON.parse(decodeURI(getUrlParam("condition"))));
//后台返回的前端配置条件
var tableColumns;
//场景
var spectacle;
//告警级别
var sublist;
// 短信
 var sendWay='true,false', sendResult='false,true,0,1'
//  切换场景 切换不同的报表
$("#spectacle li").click(function () {
    dataReport();
});
/*界面点击进来的展示*/
$(function () {
//从后台获取前端配置信息
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        async: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/report/getWebConfig?reportKey=" + reportName + "&userParam=" + locHref),
        data: {
            "reportKey": reportName
        },
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            console.log(data)
            reportKeyByArea = data["configInfo"].reportKeyByArea;
            reportKeyByDevelop = data["configInfo"].reportKeyByDevelop;
            var conditionArr = data["configInfo"].condition.split(",");
            tableColumns = data["configInfo"].columns;
            tableColumns = columnsDisplay(tableColumns, reportName);
            $("#Lnav_text").text(data["configInfo"].reportName);
            for (var i = 0; i < conditionArr.length; i++) {   //展现查询条件
                $("#" + conditionArr[i]).show();
            }
            $("#orderFlowTable").bootstrapTable({    //展现表格数据
                columns: tableColumns
            })
            $("#orderFlowTable").find("tbody").hide();  //首次加载时不显示 查询不到数据
        }
    });

    if (fileName == null || fileName == "") {
        dataReport();
        //普通查询
        reportKey = reportKeyByArea;
        var date = new Date();
        var searchDate = date.format("yyyy-MM-dd");
        $("#startDate").val(searchDate);
        $("#exportBtn").attr('disabled', true);//导出按钮不可用
        $(".totalDiv").css('display', 'none');//总共记录不显示
    } else {
        $("#startDate").val(condition.startDate);
        reportName = getUrlParam("typeTable");
        var areaCodeBack = condition.areaName;
        var fromBack = condition.from;
        //销售线回显
        if (fromBack == "3,4,5,8") {
            var areaArr0 = ["225", "226", "211", "212", "213", "214"];
            var areaArr1 = ["217", "219", "220", "218", "216"];
            var areaArr2 = ["223", "221", "215", "222", "224"];
            var areaArr3 = ["227", "11a0al", "11a01s", "dkhzx", "11a01q", "11a08x"];
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
        }else if(fromBack == "0,7" || fromBack == "1") {
            var areaArr0 = ["2", "3", "4", "5", "7", "8"];
            var areaArr1 = ["802", "801", "804", "806", "803"];
            var areaArr2 = ["809", "808", "805", "807", "810"];
            var areaArr3 = ["10", "9999"];
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
        }

        //场景回显
        if (fromBack == "1") {
            $($("#spectacle ul li")[1]).addClass('searched');
            $($("#spectacle ul li")[1]).siblings('li').removeClass('searched');
        } else if (fromBack == "0,7") {  //互联网
            $($("#spectacle ul li")[0]).addClass('searched');
            $($("#spectacle ul li")[0]).siblings('li').removeClass('searched');
        } else if (fromBack == "3,4,5,8") { //移网
            $($("#spectacle ul li")[2]).addClass('searched');
            $($("#spectacle ul li")[2]).siblings('li').removeClass('searched');
        }
        //告警级别回显
        var warnLevelBack = condition.warnLevel;
        var warnLevelBackArr = warnLevelBack.split(",");
        if (warnLevelBackArr[warnLevelBackArr.length - 1] != "") {
            $($("#sublist ul li")[0]).addClass('searched');
        } else {
            $($("#sublist ul li")[0]).removeClass('searched');
            for (var j = 0; j < warnLevelBackArr.length; j++) {
                var arr = warnLevelBackArr[j];
                if(arr != ""){
                    for (var i = ($("#sublist ul li").length-1); i >0; i--) {
                        if ($("#sublist ul li")[i].getAttribute("value") == arr) {
                            $($("#sublist ul li")[i]).addClass('searched');
                        }
                    }
                }
            }
        }
        reportId = getUrlParam("reportId");
        globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportName + "&reportId=" + reportId + "&userParam=" + locHref);
        dateTabel(globalUrl, reportId, reportName, locHref);
    }
    //调用后台权限接口
    var queryValue = queryPermission(reportName);

    //初始化销售线展示
    department = intSaleLine(queryValue, reportName, department);
});

function dataReport() {
        $("#spectacle li").click(function () {
            if ($(this).attr('data-value') == "NET") {
                reportName = "warnSmsSendDetailFromInternet";
                branchFlag = -1;
            }
            if ($(this).attr('data-value') =="CT") {
                reportName = "warnSmsSendDetailFromTradition";
                branchFlag = -1;
            } else if ($(this).attr('data-value') =="YW") {
                reportName = "warnSmsSendDetailFromMobile";
                branchFlag = -1;
            }

    })
}

//场景多选
$("#spectacle ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    $("#selectBranch option:first").prop("selected", 'selected');
    $(".branchItem").hide();
    $(".developItem").hide();

    if ($(this).attr('data-value') == "NET") {
        reportName = "warnSmsSendDetailFromInternet";
        branchFlag = -1;
    }
    if ($(this).attr('data-value') =="CT") {
        reportName = "warnSmsSendDetailFromTradition";
        branchFlag = -1;
    } else if ($(this).attr('data-value') =="YW") {
        reportName = "warnSmsSendDetailFromMobile";
        branchFlag = -1;
    }
    //调用后台权限接口
    var queryValue = queryPermission(reportName);

    //初始化销售线展示
    department = intSaleLine(queryValue, reportName, department);
});
//告警级别多选
$("#sublist ul li").click(function () {
    if ($(this).hasClass("searched")) {
        $(this).removeClass("searched")
    } else {
        if ($(this).index() == 0) {
            $(this).siblings('li').removeClass('searched');
            $(this).addClass('searched');
        } else {
            $(this).addClass('searched');
            $(this).siblings('li').eq(0).removeClass('searched');
        }
    }
});
// 短信发送
 $("#sendWay ul li").click(function () {
     if ($(this).hasClass("searched")) {
         $(this).removeClass("searched")
         sendWay=''
     } else {
         if ($(this).index() == 0) {
             $(this).siblings('li').removeClass('searched');
             $(this).addClass('searched');
             sendWay='true,false'
         } else {
             $(this).addClass('searched').siblings('li').removeClass('searched');
             $(this).siblings('li').eq(0).removeClass('searched');
             sendWay=$(this).prop('value');
             sendWay = sendWay == 1 ? 'true':'false';
         }
     }
 });
 $("#sendResult ul li").click(function () {
     if ($(this).hasClass("searched")) {
         $(this).removeClass("searched")
         sendResult=''
     } else {
         if ($(this).index() == 0) {
             $(this).siblings('li').removeClass('searched');
             $(this).addClass('searched');
             sendResult='true,false,0,1'

         } else {
             $(this).addClass('searched').siblings('li').removeClass('searched');
             $(this).siblings('li').eq(0).removeClass('searched');
             sendResult=$(this).prop('value');
             if(sendResult == 2){
                 sendResult = 'true';
             }else if(sendResult == 3) {
                 sendResult = 'false';
             }

         }
     }
 });
//部门选择
var branchFlag;
//分类口径
var clickFlag = 0;
$("#selectBranch").change(function () {
    branchFlag = $(this).get(0).selectedIndex - 1;
    if ($("#NET").hasClass("searched") || $("#CT").hasClass("searched")) {
        $(".branchItem").hide().eq(branchFlag).show();
    } else if ($("#YW").hasClass("searched")) {
        $(".developItem").hide().eq(branchFlag).show();
    }
    if (branchFlag == -1) {
        $(".branchItem").hide();
        $(".developItem").hide();
    }
    if ($($("#spectacle ul li")[2]).hasClass("searched")) {
        $(".zt").css("display", "block");
        $(".ds").css("display", "block");
        $(".sq").css("display", "block");
        $(".kh").css("display", "block");
        $(".hj").css("display", "block");
    } else {
        $(".zt").css("display", "none");
        $(".ds").css("display", "none");
        $(".sq").css("display", "none");
        $(".kh").css("display", "none");
        $(".hj").css("display", "none");
    }
});
/*查询按钮点击方法*/
$("#searchBtn").click(function () {
    //判断部门信息是否点选
    if (branchFlag == -1 && $("#selectBranch").prop("disabled")) {

    } else if ($('#selectBranch').find("option:selected").val() != "" && $('.developItem').eq(branchFlag).find("option:selected").val() == ""
        && $('.branchItem').eq(branchFlag).find("option:selected").val() == "") {
        var selectBranch = $('#selectBranch').find("option:selected").val();
        if (selectBranch.indexOf("中心") != -1) {
            layer.msg('请选择部门中心！', {
                time: 2000 //2s后自动关闭
            });
        } else {
            layer.msg('请选择' + selectBranch + '部门！', {
                time: 2000 //2s后自动关闭
            });
        }
        return;
    }
    var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
    $("#Lnav").after(fakeLoader);
    $("#exportBtn").attr('disabled', true);
    //销售线
    if (branchFlag == -1 && !$("#selectBranch").prop("disabled")) {
        department = "";
    } else {
        if ($("#NET").hasClass("searched") || $("#CT").hasClass("searched")) {
            if ($('.branchItem').eq(branchFlag).find("option:selected").val()) {  //获取部门信息
                department = $('.branchItem').eq(branchFlag).find("option:selected").val()
            }
        } else if ($("#YW").hasClass("searched")) {
            if ($('.developItem').eq(branchFlag).find("option:selected").val()) {  //获取部门信息
                department = $('.developItem').eq(branchFlag).find("option:selected").val()
            }
        }
    }

    startDate = $("#startDate").val();
    // 场景
    if($("#NET").hasClass("searched")){
        spectacle="0,7"
    }else if($("#CT").hasClass("searched")){
        spectacle="1";
    }else if ($("#YW").hasClass("searched")){
        spectacle="3,4,5,8";
    }
    // 告警级别
    var sublistList = $("#sublist ul li");
    if ($(sublistList[0]).hasClass("searched")) {
        sublist = "6,5,4,3,2,1";
    } else {
        sublist = "";
        for (var i = 1; i < sublistList.length; i++) {
            if ($(sublistList[i]).hasClass("searched")) {
                sublist = sublist + $(sublistList[i]).attr("value") + ","
            }
        }
    }
    firstReresh(spectacle, sublist, startDate, department);

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
    reportKeyHis = "warnSmsSendDetailFromInternet,warnSmsSendDetailFromTradition,warnSmsSendDetailFromMobile";
    historyTable(table, reportKeyHis, reportId);
});

//关闭历史查询表格
$('.close_table').click(function () {
    $('.historyCommentTable').modal('hide')
});


/*首次进入时页面交互 实时表*/
function firstReresh(spectacle, sublist, startDate, department) {
    dataReport();
    //存储传入参数到配置表
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate=" + startDate + "&endDate=" + startDate + "&reportKey=" + reportName + "&userParam=" + locHref +
            "&from=" + spectacle + "&warnLevel=" + sublist + "&areaCode=" + department + "&sendResult=" + sendResult + "&sendWay=" + sendWay),
        data: {
            "startDate": startDate,
            "endDate": startDate,
            "from": spectacle,
            "warnLevel": sublist,
            "areaName": department,
            "sendResult": sendResult,
            "sendWay": sendWay

        },
        error: function () {
            console.error("出现异常");
        },
        success: function (data) {
            console.log(data)
            reportId = data.rows[0].report_id;
            if (data.rows[0].flag == '0' || data.rows[0].flag == '1') {
                $("#fakeLoader").fakeLoader({
                    timeToHide: 600000,
                    zIndex: "999",//
                    spinner: "spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
                    bgColor: "#000000",
                });
                getReportState(reportName, reportId);
            } else if (data.rows[0].flag == '2') {
                globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey=" + reportName + "&userParam=" + locHref + "&reportId=" + reportId)
                dateTabel(globalUrl, searchDate, reportName, locHref);
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
function getReportState(reportName, reportId) {
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/find?reportId=" + reportId + "&reportKey=" + reportName + "&userParam=" + locHref),
        //url : "../staticReport/result2.json",
        data: {
            "reportKey": reportName,
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
                globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey=" + reportName + "&userParam=" + locHref + "&reportId=" + reportId);
                dateTabel(globalUrl, reportId, reportName, locHref);
                $("#exportBtn").attr('disabled', false);
            } else {
                //继续调用定时任务
                setTimeout("getReportState(reportName,reportId)", 2000);
            }
        }
    });
}

function dateTabel(globalUrl, reportId, reportName, locHref) {
    $("#orderFlowTable").bootstrapTable('destroy');
    tableColumns = columnsDisplay(tableColumns, reportName);
    $('#orderFlowTable').bootstrapTable({
        url: globalUrl
        //url:"backcount.json"
        , toggle: "table"
        , height: 300
        , columns: tableColumns
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
            columns:tableColumns;
        }
        , onLoadError: function () {  //加载失败时执行
            columns:tableColumns
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
            //$("#searchDate").val("-----");//查看历史时赋值
            return obj;
        }
    });
}


function columnsDisplay(columns, reportName) {
    for (var i = 0; i < columns.length; i++) {   //展现查询条件
        if (columns[i].visibleReport == undefined || columns[i].visibleReport == reportName) {
            columns[i].visible = true;
        } else {
            columns[i].visible = false;
        }
    }
    return columns;
}
