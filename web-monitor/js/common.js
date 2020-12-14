//对外访问页面身份验证3个必须条件
var exCode = "";//系统编码
var userName = "";//用户账号
var callCode = "";//加密字符串


var onLineCount = 0;
var offLineCount = 0;
var sceneMonitorCount = 0;
var queryValues;

//属地对象数组
var areaArr1 =["2","3","4","5","7","8",
    "802","801","804","806","803",
    "809","808","805","807","810",
    "10","9999"];
//销售线对象数组
var developArr1 =["225","226","211","212","213","214",
    "217","219","220","218","216",
    "223","221","215","222","224",
    "227","11a0al","11a01s","dkhzx","11a01q","11a08x"];

var ReportKeyArr =["monitorDayByAreaNew","monitorMonthByAreaNew","flowMonitorTotal1","flowMonitorTotal2",
    "OrderConvertByArea","OrderOnProcessByArea", "overCountMonitor","OrderFinishByArea",
    "OrderBackByArea","orderDetailNewByArea","warnSmsSendDetailFromInternet","warnSmsSendDetailFromTradition",
    "monitorDayByDevelopAreaNew","monitorMonthByDevelopAreaNew","flowMonitorTotalDev1","flowMonitorTotalDev2",
    "OrderConvertByDevelop","OrderOnProcessByDevelop", "overCountMonitorDev","OrderFinishByDevelop",
    "OrderBackByDevelop","orderDetailNewByDevelop","orderDetailMobile", "warnSmsSendDetailFromMobile","warnSmsSendCountFromInternet","warnSmsSendCountFromTradition","warnSmsSendCountFromMobile","overTimeOnDayCount","overTimeOffDayCount","overTimeOnDayByGrid","overTimeOffDayByGrid"];

//定时任务执行后返回结果
var pageTimer = {}; //定义计算器全局变量


var messageCodeMinute = 60;//短信验证码倒计时 60秒

(function () {
    //页面初始加载时执行
    initSaveOutParams();

    //调用后台权限接口
    queryValues = queryPermissionIndex("1");
    console.log("获取的初始化值是"+queryValues);
})();

/**
 * 根据用户权限，判断能否查询、下载
 * queryvalue -查询权限判断值
 * exportValue -导出权限判断值
 * queryId -前台查询按钮id
 * exportId -前台导出按钮id
 */
/*function intQueryExport(queryValue,exportValue,queryId,exportId) {
    if(""==queryValue|| queryValue == null){
        $("#"+queryId+"").attr("disabled","disabled")
    }

    if("ok"==exportValue || exportValue== null){
        $("#"+exportId+"").attr("disabled","disabled")
    }
}*/

/**
 * 初始化首页销售线
 */
function intSaleLineIndex(value,Key,rst,id,dataId,dataValueName) {
    var num=-1;//默认选中全部销售线
    console.log("进入方法！");
    if(Key=="1"){//属地
         num =$.inArray(value,areaArr1 );
         console.log("areaArr的值是"+areaArr1);
    }else{//发展
         num =$.inArray(value,developArr1 );
    }

    if(num!=-1) { //权限不是全部销售线
        //销售线
        $("#"+id+"").val(value);
        $("#"+id+"").attr("disabled",true);
        rst=value;
    }else {
        $("#"+id+"").attr("disabled",false);
    }
    return rst;
}


/**
 * 根据用户归属，页面销售线初始化（重点销售指标）
 * value - 权限判断值
 */
function intSaleLine(value,reportKey,rst) {
    var num=-1;//默认选中全部销售线
    var arr;//对应口径数组

    var obj = new Object();

    var flagNum =$.inArray(reportKey,ReportKeyArr );

    var itemId="branchItem";
    if(flagNum<= 11){
        arr=areaArr1; //属地
    }else {
        arr=developArr1; //销售线
        itemId="developItem";
    }
    var num =$.inArray(value,arr );
    if(num!=-1){ //权限不是全部销售线
        $("#selectBranch").attr("disabled",true);
        //初始化一级销售线
        var selectBranchVal;
        if(num<=5){
            $("#selectBranch option").eq(1).attr("selected",true);
            selectBranchVal=$("#selectBranch option").eq(1).val();
            $("."+itemId+"").hide().eq(0).show().val(value).attr("disabled",true);
        }else if(num<=10){
            $("#selectBranch option").eq(2).attr("selected",true);
            selectBranchVal=$("#selectBranch option").eq(2).val();
            $("."+itemId+"").hide().eq(1).show().val(value).attr("disabled",true);
        }else if(num<=15){
            $("#selectBranch option").eq(3).attr("selected",true);
            selectBranchVal=$("#selectBranch option").eq(3).val();
            $("."+itemId+"").hide().eq(2).show().val(value).attr("disabled",true);
        }else{
            $("#selectBranch option").eq(4).attr("selected",true);
            selectBranchVal=$("#selectBranch option").eq(4).val();
            $("."+itemId+"").hide().eq(3).show().val(value).attr("disabled",true);
        }

        $("#selectBranch").val(selectBranchVal);
        rst=value;

    }else{
        $("#branchItem").attr("disabled",false);
        $("#selectBranch").attr("disabled",false);
        rst="";
    }
    return rst;
}

/**
 * 获取当前时间
 */
function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();			//秒

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;


    return (clock);
}

/**
 * 刷新界面内容
 */
$("#Lnav ul>li").on("click", function () {

    if($(this).attr('id')==undefined){
    	return;
    }
    //选中的内容页展示，其他隐藏
    var _index = $(this).index();
    $(this).addClass('Lcheck').siblings().removeClass('Lcheck');
    $('.tables>li').eq(_index).addClass('on').siblings().removeClass('on');

    if ($("#keyIndex").hasClass('Lcheck')) { //统计及重点指标
        queryValues = queryPermissionIndex('1');
        tabOnload("");
    } else if ($("#overview").hasClass('Lcheck')) { //全流程监控总览
        tabOnload(intervalOverview);
    } else if ($("#onLine").hasClass('Lcheck')) { //互联网化一站式交付全流程监控
        if (onLineCount == 0) {
            queryValues = queryPermissionIndex("1");
            onLineOnload();
            onLineCount++;
        }
        tabOnload(onLineOnload);

    } else if ($("#offLine").hasClass('Lcheck')) { //传统集中受理交付全流程监控
        if (offLineCount == 0) {
            queryValues = queryPermissionIndex("1");
            offLineOnload();
            offLineCount++;
        }
        tabOnload(offLineOnload);
    } else if ($("#sceneMonitor").hasClass('Lcheck')) {  //场景化流程监控
        queryValues = queryPermissionIndex("2");
        if (sceneMonitorCount == 0) {
            scene("", "", "", "", "0",  '1', userParam,sceneMonitorCount,"all","0");
            sceneMonitorCount++;
        }
        tabOnload(sceneMonitor);
    }
})


/**
 * Tab栏页面加载
 */
function tabOnload(method) {
    if (method == "") {
        stopInterval();
        // keyIndexLoad();
    } else {
        //判断定时器对象是否存在
        if (!window.intervalObjs) {
            //不存在，创建空数组对象
            window.intervalObjs = new Array();
        }
        var has = false;
        for (var i = 0; i < window.intervalObjs.length; i++) {
            var intervalObj = window.intervalObjs[i];
            //判断对象是否已经存在
            if (intervalObj.method == method) {
                intervalObj.run();
                has = true;
            } else {
                intervalObj.stop();
            }
        }
        //对象不存在，创建对象
        if (!has) {
            window.intervalObjs[window.intervalObjs.length] = factoryInterval(method);
        }


    }
}

/**
 * 自动调用定时器
 */
function factoryInterval(method) {
    var object = new Object();
    object.method = method;
    object.isStop = false;
    object.startTimestamp = (new Date()).getTime();

    object.doIt = function () {
        if (object.isStop) {
            return;
        } else {
            var currentTimestamp = (new Date()).getTime();
            if (currentTimestamp - object.startTimestamp >= 120000) {
                object.startTimestamp = currentTimestamp;
                method();
            }
        }
    }

    object.run = function () {
        object.isStop = false;
    }

    object.stop = function () {
        object.isStop = true;
    }

    object.iIntervalID = window.setInterval(object.doIt, 1000);

    return object;
}


/**
 * 停止所有定时任务
 */
function stopInterval() {
    if (window.intervalObjs) {
        for (var i = 0; i < window.intervalObjs.length; i++) {
            window.intervalObjs[i].stop();
        }
    }
}

/**
 * 全流程监控总览刷新
 */
function intervalOverview() {
    reloadData();
    var data = datadeal(type, showSelect, businessSelect, installSelect, tableType, mainType);
    createEchars(tableType, data);
}

/**
 * 初始保存对外访问url传的参数
 */
function initSaveOutParams() {
    exCode = getUrlParam("exCode");
    userName = getUrlParam("userName");
    callCode = getUrlParam("callCode");
}

/**
 * 对外访问接口url组装
 *
 * 【页面跳转html】与【ajax】都需要使用该方法
 *
 * 例如：getOutUrl(getRootPath_web(),"/test/test1?flag=out&orderNum=1001");
 *
 * 输入格式：http://localhost:8090/QueryCenterWeb/test/test1?flag=out&orderNum=1001&exCode=....
 *
 * @param uri
 * @param query
 * @returns {String}
 */
function getOutUrl(uri, query) {
    var str = "exCode=" + exCode + "&userName=" + userName + "&callCode=" + callCode;
    if (query.indexOf("?") > 0) {
        str = '&' + str;
    } else {
        str = '?' + str;
    }
    var url = uri + query + str;
    return url;
}


/**
 * 获取url中的参数
 * @param name 参数名称
 * @returns
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值 encodeURI()编码/decodeURI()解码
}

/**
 * 获取主机名+项目名
 * @returns
 */
function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

/**
 * 图片最大化，最小化切换
 * @param obj img对象
 */
function changeImgSize(obj) {
    var divId = obj.id;
    $("#" + divId).toggleClass('minImg');
    $("#" + divId).toggleClass('maxImg');
}

//加载等待 显示
function showLoader() {
    $(".fakeloader").show();
    $(".fakeloader").fakeLoader({
        timeToHide: 60000,
        bgColor: "rgba(0,0,0,.2)",
        pos: 'absolute',// fakeloader Position
        top: '50%',  // fakeloader Top value
        left: '50%', // fakeloader Left value
        width: '100px', // fakeloader width
        height: '60px', // fakeloader Height
        marginTop: '-30px',//
        marginLeft: '-50px',//
        borderRadius: '10px',//
        spinner: "spinner2"//使用类型
    });
}

//加载等待 关闭
function hideLoader() {
    $(".fakeloader").hide();
}

//加载table隔行变色
function Interlaced(namId) {
    var trs = document.getElementById(namId).getElementsByTagName("tr");//获取table中所有tr的信息

    for (var i = 0; i < trs.length; i++) {
        if (i % 2 == 0) {
            trs[i].className = "tr1";
        } else {
            trs[i].className = "tr2";
        }
    }
}

/*报表历史数据表格加载*/
function historyTable(table, reportKey, reportId) {
    table.bootstrapTable('destroy')
    table.bootstrapTable({
        //url: "table.json"
        url: getOutUrl(getRootPath_web(), "/reportdetail/findhistoricaldata?userParam=" + getUrlParam("userParam") + "&reportKey=" + reportKey + "&reportId=" + reportId)
        /*,toggle: "table"*/
        /* ,height: 400*/
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
        , queryParams: function (params) {
            return {
                "reportKey": reportKey
            }
        }
        , onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
        }
        , onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }
        , responseHandler: function (res) {//获取数据解析
            console.info(res)
            var obj = {total: 0, rows: []};//table表格需要
            obj.total = res.total;
            obj.rows = res.rows;
            console.info(obj.rows)
            var resData = obj.rows;
            for (var i = 0; i < resData.length; i++) {
                if (resData[i].flag == '1') {
                    resData[i].flag = '处理中';
                } else if (resData[i].flag == '2') {
                    resData[i].flag = '已完成';
                } else if (resData[i].flag == '3') {
                    resData[i].flag = '报表生成失败';
                }
            }
            return obj;
        }
    });
}

/*报表历史查看表格操作展示*/
function oprationFormatter(value, row, index) {
    var e;
    //处理状态为成功
    if (row.flag == "已完成") {
        e = '<buttton  style="background-color: #F8B62D; color: #000000; padding:2px 0px; border-radius: 5px; cursor:pointer; text-align: center; display: inline-block; width: 40px;" id=' + row.num1 + ' onclick="findHistory(\'' + row.file_name + '\',\'' + row.create_date + '\',\'' + row.type + '\',\'' + row.report_id + '\',\'' + encodeURI(JSON.stringify(row.condition)) + '\')">查看</buttton> '
            + '<buttton  style="background-color: #F8B62D; color: #000000; padding:2px 0px; border-radius: 5px; cursor:pointer; text-align: center; display: inline-block; width: 40px;" id=' + row.num1 + ' onclick="historyExport(\'' + row.type + '\',\'' + row.report_id + '\')">导出</buttton> ';
    }
    return e;
}

/*报表历史查看导出*/
function historyExport(reportKey, reportId) {
    $.download(getOutUrl(getRootPath_web(), "/reportdetail/historicaldetailexport?userParam=" + getUrlParam("userParam") + "&reportKey=" + reportKey + "&reportId=" + reportId), 'post');
}


//历史查看--查看
function findHistory(fileName, createDate, type, reportId, condition) {
    switch (type) {
        //评价统计
        case "commentStatistic1":
            window.open("commentTable.html?typeTable=commentStatistic1&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "commentStatistic2":
            window.open("commentTable.html?typeTable=commentStatistic2&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "commentStatistic3":
            sessionStorage.setItem("fileName", fileName);
            window.open("commentTable.html?typeTable=commentStatistic3&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //评价详情
        case "commentDetail1":
            window.open("commentTable.html?typeTable=commentDetail1&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "commentDetail2":
            window.open("commentTable.html?typeTable=commentDetail2&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "commentDetail3":
            window.open("commentTable.html?typeTable=commentDetail3&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //订单详情明细
        case "orderDetail":
            window.open("../monitorReport/orderlistdetail.html?typeTable=orderDetail&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //按分公司统计
        case "BranchCompanyStatisticInArea":
            window.open("../staticReport/branchStatic.html?typeTable=BranchCompanyStatisticInArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "BranchCompanyStatisticInDevelop":
            window.open("../staticReport/branchStatic.html?typeTable=BranchCompanyStatisticInDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //订单统计表
        case "OrderStatisticInAccept":
            window.open("../staticReport/orderStatic.html?typeTable=OrderStatisticInAccept&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "OrderStatisticInArea":
            window.open("../staticReport/orderStatic.html?typeTable=OrderStatisticInArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        case "OrderStatisticInDevelop":
            window.open("../staticReport/orderStatic.html?typeTable=OrderStatisticInDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //按订单来源统计
        case "TradeSourceStatistic":
            window.open("../staticReport/sourceOrd.html?typeTable=TradeSourceStatistic&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //退单原因详情
        case "orderBackDetail":
            window.open("../monitorReport/backcount.html?typeTable=orderBackDetail&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId)
            break;
        //竣工情况监控表
        case "OrderFinishByArea":
            window.open("../orderFlowTable/orderCompleted.html?typeTable=OrderFinishByArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        case "OrderFinishByDevelop":
            window.open("../orderFlowTable/orderCompleted.html?typeTable=OrderFinishByDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //订单转化表
        case "OrderConvertByArea":
            window.open("../orderFlowTable/orderTransform.html?typeTable=OrderConvertByArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "OrderConvertByDevelop":
            window.open("../orderFlowTable/orderTransform.html?typeTable=OrderConvertByDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //撤单情况监控表
        case "OrderBackByArea":
            window.open("../orderFlowTable/orderCancel.html?typeTable=OrderBackByArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "OrderBackByDevelop":
            window.open("../orderFlowTable/orderCancel.html?typeTable=OrderBackByDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //全流程监控总表（整体）
        case "flowMonitorTotal2":
            window.open("../orderFlowTable/orderFlowTable.html?typeTable=flowMonitorTotal2&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "flowMonitorTotalDev2":
            window.open("../orderFlowTable/orderFlowTable.html?typeTable=flowMonitorTotalDev2&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //全流程监控总表（包含）
        case "flowMonitorTotal1":
            window.open("../orderFlowTable/orderFlowByDate.html?typeTable=flowMonitorTotal1&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "flowMonitorTotalDev1":
            window.open("../orderFlowTable/orderFlowByDate.html?typeTable=flowMonitorTotalDev1&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //超时工单监控表
        case "overCountMonitor":
            window.open("../orderFlowTable/orderOverTime.html?typeTable=overCountMonitor&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "overCountMonitorDev":
            window.open("../orderFlowTable/orderOverTime.html?typeTable=overCountMonitorDev&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //在途工单监控表
        case "OrderOnProcessByArea":
            window.open("../orderFlowTable/orderOnPassage.html?typeTable=OrderOnProcessByArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "OrderOnProcessByDevelop":
            window.open("../orderFlowTable/orderOnPassage.html?typeTable=OrderOnProcessByDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //订单详情明细表
        case "orderDetailNewByArea":
            window.open("../orderFlowTable/orderlistDetailNew.html?typeTable=orderDetailNewByArea&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        case "orderDetailNewByDevelop":
            window.open("../orderFlowTable/orderlistDetailNew.html?typeTable=orderDetailNewByDevelop&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
            //订单详情明细表(移网) 2019/5/30 姬祥增
        case "orderDetailMobile":
            window.open("../orderFlowTable/orderlistDetailNewYw.html?typeTable=orderDetailMobile&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition)
            break;
        //    告警短信发送明细(互联网)
        case "warnSmsSendDetailFromInternet":
            window.open("../warnMsg/warnMsgDetail.html?typeTable=warnSmsSendDetailFromInternet&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        //    告警短信发送明细(传统)
        case "warnSmsSendDetailFromTradition":
            window.open("../warnMsg/warnMsgDetail.html?typeTable=warnSmsSendDetailFromTradition&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        //    告警短信发送明细(移网)
        case "warnSmsSendDetailFromMobile":
            window.open("../warnMsg/warnMsgDetail.html?typeTable=warnSmsSendDetailFromMobile&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        //    告警短信发送情况汇总（互联网）
        case "warnSmsSendCountFromInternet":
            window.open("../warnMsg/warnMsgSumNet.html?typeTable=warnSmsSendCountFromInternet&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        //    告警短信发送情况汇总（传统）
        case "warnSmsSendCountFromTradition":
            window.open("../warnMsg/warnMsgSumTra.html?typeTable=warnSmsSendCountFromTradition&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        //    告警短信发送情况汇总（移网）
        case "warnSmsSendCountFromMobile":
            window.open("../warnMsg/warnMsgSumMob.html?typeTable=warnSmsSendCountFromMobile&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition);
            break;
        default:
        	window.open(getOutUrl(getRootPath_web(), "/report/index?reportKey=" + type + "&fileName=" + fileName + "&createDate=" + createDate + "&userParam=" + getUrlParam("userParam") + "&reportId=" + reportId + "&condition=" + condition + "&rand=" + new Date().getTime()));
        	break;
    }
}

//时间格式转换
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};

//设置时间+1
function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}

function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}


function getCurrentDate(format) {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = "";
    //精确到天
    if (format == 1) {
        time = year + "-" + month + "-" + date;
    }
    //精确到分
    else if (format == 2) {
        time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
    }
    if (format == 3) {
        time = year + month + date;
    }
    return time;
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount + 1);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}

/**
 * 获取用户权限信息(报表)
 */
function  queryPermission(reportKey) {
    if(reportKey=="monitorDayByDevelopAreaNew"){
        reportKey="monitorMonthByDevelopAreaNew";
    }
    if(reportKey=="monitorDayByAreaNew"){
        reportKey="monitorMonthByAreaNew";
    }

    var queryValue;

    $.ajax({
        type : 'post', //测试get，正式post
        cache : false,
        async:false,
        dataType: 'json',
        url : getOutUrl(getRootPath_web(), "/reportdetail/getauth?userParam="+getUrlParam("userParam")+"&reportKey="+reportKey),
        data :  {
            reportKey:reportKey,
            userParam:getUrlParam("userParam")
        },
        error : function(){
            console.error("出现异常");
        },
        success : function(data){
            console.log(data);
            queryValue=data.rows[0].queryValue;
        }
    });
    return queryValue;
}

/**
 * 获取用户权限信息（首页）
 */
function  queryPermissionIndex(onlineType) {
    var queryValue;
    var userParam = getUrlParam("userParam");
    if(userParam==undefined || userParam==null){
    	userParam = window.location.href.substr(window.location.href.indexOf("?")+1);
    }
    $.ajax({
        type : 'post', //测试get，正式post
        cache : false,
        async:false,
        dataType: 'json',
        url : getOutUrl(getRootPath_web(), "/monitor/getauth?userParam="+userParam+"&onlineType="+onlineType),
        data :  {
            onlineType:onlineType,
            userParam:getUrlParam("userParam")
        },
        error : function(){
            console.error("出现异常");
        },
        success : function(data){
            console.log(data);
            queryValue=data.rows[0].queryValue;
        }
    });
    return queryValue;
}

