var reportKeyOnlineArea = "internetMonitorReportByArea"; //线上属地
var reportKeyOnlineDev = "internetMonitorReportByDev";   //线上发展

var reportKeyArea = "traditionMonitorReportByArea"; //线下属地
var reportKeyDev = "traditionMonitorReportByDev";   //线下发展

var reportKey='',reportId='',saleArea='',iomArea='',startDate='',endDate='',gridInfo='',tradeCatalog='',areaCode='';
//  产品类型
var firstLevel='',secondLevel='',threeLevel='',secondLevel='',flagProductType=true
var isFirstLoad = true;
var reportPermission = "";
var classType = 'all'
//服务类型
var serviceTypeVal = $('#serviceType li.searched').attr('value');
//分类口径
var caliberVal = $('#caliber li.searched').attr('value');

// 网格处理
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);
// iptv
$(document).on("change","#selectIPTV",function(){
    classType = $('#selectIPTV option:selected').val();
    // makeSvgUnderline(globalUrl,startDate,endDate,reportId,reportKey,locHref,tradeCatalogVal,areaCode,gridInfo,classType);
});
//初始化Ai数据
var statics_in = [];
    statics_in[0] = {workFlag:8,aCount:0,bCount:0},
    statics_in[1] = {workFlag:9,aCount:0,bCount:0},
    statics_in[2] = {workFlag:10,aCount:0,bCount:0},
    statics_in[3] = {workFlag:11,aCount:0,bCount:0},
    statics_in[4] = {workFlag:12,aCount:0,bCount:0},
    statics_in[5] = {workFlag:13,aCount:0,bCount:0},
    statics_in[6] = {workFlag:14,aCount:0,bCount:0},
    statics_in[7] = {workFlag:15,aCount:0,bCount:0},
    statics_in[8] = {workFlag:16,aCount:0,bCount:0},
    statics_in[9] = {workFlag:17,aCount:0,bCount:0},
    statics_in[10] = {workFlag:18,aCount:0,bCount:0};
    statics_in[11] = {workFlag:24,aCount:0,bCount:0};
//初始化Bi数据
var statics_out = [];
    statics_out[0] = {workFlag:1,aCount:0,bCount:0},
    statics_out[1] = {workFlag:19,aCount:0,bCount:0},
    statics_out[2] = {workFlag:2,aCount:0,bCount:0},
    statics_out[3] = {workFlag:3,aCount:0,bCount:0},
    statics_out[4] = {workFlag:4,aCount:0,bCount:0},
    statics_out[5] = {workFlag:5,aCount:0,bCount:0},
    statics_out[6] = {workFlag:6,aCount:0,bCount:0},
    statics_out[7] = {workFlag:7,aCount:0,bCount:0};
    statics_out[8] = {workFlag:20,aCount:0,bCount:0};
    statics_out[9] = {workFlag:23,aCount:0,bCount:0};
    statics_out[10] = {workFlag:21,aCount:0,bCount:0};
    statics_out[11] = {workFlag:22,aCount:0,bCount:0};
// var workCatalog=0;      // 0:线上   1,2:线下
//装机移机 线上
var tradeCatalog_on = 'all';
sessionStorage.setItem("tradeCatalog_on_value", tradeCatalog_on);
//装机移机 线下
var tradeCatalog_out = 'all';
sessionStorage.setItem("tradeCatalog_out_value", tradeCatalog_out);
//发展属地 线上
var onlineType_on ='1';
sessionStorage.setItem("onlineType_on", onlineType_on);
//发展属地 线下
var onlineType_out ='1';
sessionStorage.setItem("onlineType_out", onlineType_out);
//当日(0)、当月(1)、累计(all)
var dateType = "all";
var dateTypeOn ="all";//线上
var dateTypeOut = "all"; //线下
//判断浏览器版本
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}
var iev = IEVersion(); //浏览器版本
var lv_ie;
if(iev >= 9) {
    lv_ie = 16;
} else {
    lv_ie = 10;
}

$(document).ready(function(){

    // 取得所属分公司的权限并展现销售线列表
    queryReportPermission();
    // 获取网格销售线
    initGridDependenciesSelectBox();

    // 初始化日期条件
    var d=new Date();
    var dataTimeyear=d.getFullYear();
    var dataTimemonth=dateChanger(d.getMonth()+1);
    var dataTimeday=dateChanger(d.getDate());
    $('#startDate').val(dataTimeyear+'-'+dataTimemonth+'-'+dataTimeday);
    $('#endDate').val(dataTimeyear+'-'+dataTimemonth+'-'+dataTimeday);

    // 模拟点击查询按钮
    $('#searchBtn').click();
});

//服务类型
$('#serviceType li').click(function(){
    // serviceTypeVal = $(this).attr('value');
    $(this).addClass('searched').siblings().removeClass('searched');
    console.log(serviceTypeVal);
})
//分类口径
$('#caliber li').click(function(){
    caliberVal = $(this).attr('value');
    console.log(caliberVal);

    $(this).addClass('searched').siblings().removeClass('searched');
    $('#calibersd').hasClass('searched') ?  $('#grid').show() : $('#grid').hide();

    if (reportPermission == 'all') {
        if ($('#calibersd').hasClass("searched")) { //属地
            switch ($('#selectBranch option:selected').val()) {
                case '市区':
                    $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem')
                    break;
                case '近郊':
                    $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem')
                    break;
                case '远郊':
                    $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem')
                    break;
                case '部门中心':
                    $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem')
                    break;
                default:
                    $('#dependenciessq').addClass('developItem')
                    $('#dependenciesjj').addClass('developItem')
                    $('#dependencieszx').addClass('developItem')
                    $('#dependenciesyj').addClass('developItem')
                    break;
            }
        } else { // 发展
            switch ($('#selectBranch option:selected').val()) {
                case '市区':
                    $('#developsq').removeClass('developItem').siblings().addClass('developItem')
                    break;
                case '近郊':
                    $('#developjj').removeClass('developItem').siblings().addClass('developItem')
                    break;
                case '远郊':
                    $('#developyj').removeClass('developItem').siblings().addClass('developItem')
                    break;
                case '部门中心':
                    $('#developzx').removeClass('developItem').siblings().addClass('developItem')
                    break;
                default:
                    $('#developsq').addClass('developItem')
                    $('#developjj').addClass('developItem')
                    $('#developzx').addClass('developItem')
                    $('#developyj').addClass('developItem')
                    break;
            }
        }
    } else {
        queryReportPermission();
    }
})
//销售线逻辑处理
$(document).on("change","#selectBranch",function(){
    if ($('#calibersd').hasClass("searched")) { //属地
        switch ($('#selectBranch option:selected').val()) {
            case '市区':
                $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                break;
            case '近郊':
                $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                break;
            case '远郊':
                $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                break;
            case '部门中心':
                $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                break;
            default:
                $('#dependenciessq').addClass('developItem');
                $('#dependenciesjj').addClass('developItem');
                $('#dependencieszx').addClass('developItem');
                $('#dependenciesyj').addClass('developItem');
                break;
        }
    } else { // 发展
        switch ($('#selectBranch option:selected').val()) {
            case '市区':
                $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                break;
            case '近郊':
                $('#developjj').removeClass('developItem').siblings().addClass('developItem');
                break;
            case '远郊':
                $('#developyj').removeClass('developItem').siblings().addClass('developItem');
                break;
            case '部门中心':
                $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                break;
            default:
                $('#developsq').addClass('developItem');
                $('#developjj').addClass('developItem');
                $('#developzx').addClass('developItem');
                $('#developyj').addClass('developItem');
                break;
        }
    }
})

// 网格用: 属地销售线具体分公司逻辑处理
$(document).on("change","#gridDependenciesAll",function(){
    setGridSelectBox($('#gridDependenciesAll option:selected').val())
})

//查询按钮点击事件
$('#searchBtn').click(function(){
    // 产品类型
    /* if(flagProductType==true){
        firstLevel =  $('#productType').val()? $('#productType').val().join(',') : 'all'
        flagProductType = false
    }else {
        firstLevel =  $('#productType').val()? $('#productType').val().join(',') : ''
    }
    if(!$('#productType1_ms').hasClass('hide')){
        secondLevel =  $('#productType1').val() ? $('#productType1').val().join(',') :''
    }else {
        $('#productType1').val([])
    }
    if(!$('#productType2_ms').hasClass('hide')){
        threeLevel =  $('#productType2').val() ? $('#productType2').val().join(',') :''
    }else {
        $('#productType2').val([])
    }
   if(!$('#productType3_ms').hasClass('hide')){
        secondLevel =  $('#productType3').val() ? $('#productType3').val().join(',') :''
    }else {
        $('#productType3').val([])
    }*/
    secondLevel =  $('#productType3').val() ? $('#productType3').val().join(',') :''
    console.log(caliberVal)
    //判断部门信息是否点选
    if(caliberVal=='1'){ //属地口径
        if($('#selectBranch').find("option:selected").val() == '') {
            // layer.msg('请选择销售线！', {
            //     time: 2000 //2s后自动关闭
            // });
            // return;
        } else {
            switch ($('#selectBranch option:selected').val()) {
                case '市区':
                    if ($('#dependenciessq option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '近郊':
                    if ($('#dependenciesjj option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '远郊':
                    if ($('#dependenciesyj option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '部门中心':
                    if ($('#dependencieszx option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                default:
            }
        }

        if($('#gridDependenciesAll').find("option:selected").val() == '') {

        } else {
            if ($('#gridInfo option:selected').val() == ''){
                layer.msg('请选择网格！', {
                    time: 2000 //2s后自动关闭
                });
                return;
            }
        }
    }else if(caliberVal=='2'){ //发展口径

        if($('#selectBranch').find("option:selected").val() == '') {
            // layer.msg('请选择销售线！', {
            //     time: 2000 //2s后自动关闭
            // });
            // return;
        } else {
            switch ($('#selectBranch option:selected').val()) {
                case '市区':
                    if ($('#developsq option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '近郊':
                    if ($('#developjj option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '远郊':
                    if ($('#developyj option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '部门中心':
                    if ($('#developzx option:selected').val() == ''){
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                default:
            }
        }
    }

    if ($('#startDate').val() == '') {
        layer.msg('请指定来单日期！', {
            time: 2000 //2s后自动关闭
        });
        return;
    }

    if ($('#endDate').val() == '') {
        layer.msg('请指定退单日期！', {
            time: 2000 //2s后自动关闭
        });
        return;
    }

    var startAcceptDate = $('#startDate').val()
    var endAcceptDate = $('#endDate').val()
    var date = DateDiff(startAcceptDate, endAcceptDate);
    if (date > 31) {
        layer.msg("最大查询时间为31天", {
            time: 2000
        });
        return false;
    }

    var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
    $("#Lnav").after(fakeLoader);
    // $("#exportBtn").attr('disabled',true);

    areaCode = '';
    if ($('#calibersd').hasClass("searched")) { //属地
        switch ($('#selectBranch option:selected').val()) {
            case '市区':
                areaCode = $('#dependenciessq option:selected').val();
                break;
            case '近郊':
                areaCode = $('#dependenciesjj option:selected').val();
                break;
            case '远郊':
                areaCode = $('#dependenciesyj option:selected').val();
                break;
            case '部门中心':
                areaCode = $('#dependencieszx option:selected').val();
                break;
            default:
        }
    } else { // 发展
        switch ($('#selectBranch option:selected').val()) {
            case '市区':
                areaCode = $('#developsq option:selected').val();
                break;
            case '近郊':
                areaCode = $('#developjj option:selected').val();
                break;
            case '远郊':
                areaCode = $('#developyj option:selected').val();
                break;
            case '部门中心':
                areaCode = $('#developzx option:selected').val();
                break;
            default:
        }
    }

    caliberVal = $('#caliber li.searched').attr('value');
    serviceTypeVal = $('#serviceType li.searched').attr('value');

    // 服务类型
    tradeCatalog = serviceTypeVal;

    // 网格
    gridInfo = '';
    if(caliberVal=='1') { //属地口径
        gridInfo = $('#gridInfo option:selected').val();
    }

    startDate = $("#startDate").val();
    endDate = $("#endDate").val();

    firstReresh(tradeCatalog, areaCode, gridInfo, startDate, endDate);

});

/*首次进入时页面交互 实时表*/
function firstReresh(tradeCatalog, areaCode, gridInfo, startDate, endDate) {

    if (workCatalog == 0) { // 线上属地
        reportKey = reportKeyOnlineArea;
    } else if (workCatalog == 1) {  // 线下属地
        reportKey = reportKeyArea;
    }
    saleArea = areaCode;
    iomArea = null;

    if ($('#calibersd').hasClass("searched")) { //属地
    } else {    //发展
        if (workCatalog == 0) { // 线上发展
            reportKey = reportKeyOnlineDev;
        } else if (workCatalog == 1) {  // 线下发展
            reportKey = reportKeyDev;
        }
        saleArea = null;
        iomArea = areaCode;
    }

    if (tradeCatalog == 'all') {    // 此处查询需要置空, 明细中可带入all
        tradeCatalogVal = "";
    } else {
        tradeCatalogVal  = tradeCatalog;
    }

    //存储传入参数到配置表
    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        dataType: 'json',
        url : getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey+"&userParam="+locHref+
            "&integratedId="+gridInfo+"&tradeCatalog="+tradeCatalogVal+"&areaCode="+areaCode+"&saleArea="+areaCode+"&iomArea="+iomArea
            +"&firstLevel="+firstLevel
            +"&secondLevel="+secondLevel
            +"&threeLevel="+threeLevel
        ),
        data :  {
            "startDate":startDate,
            "endDate":endDate,
            "reportKey":reportKey,
            "userParam":decodeURI(locHref),
            "integratedId":gridInfo,
            "tradeCatalog":tradeCatalogVal,
            "areaCode":areaCode,
            "saleArea":saleArea,
            "iomArea":iomArea,
            "classType":classType,
            "firstLevel": firstLevel,
            "secondLevel": secondLevel,
            "threeLevel": threeLevel

        },
        error : function(){
            console.error("出现异常");
        },
        success : function(data){
            reportId = data.rows[0].report_id;
            if(data.rows[0].flag=='0'||data.rows[0].flag=='1'){
                $("#fakeLoader").fakeLoader({
                    timeToHide: 600000,
                    zIndex:"999",//
                    spinner:"spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
                    bgColor:"#000000",
                });
                getReportState(reportKey,reportId,areaCode,saleArea,iomArea,startDate,endDate,gridInfo,tradeCatalog);
            // }else if (data.rows[0].flag=='2') {
            //     globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey="+reportKey+"&userParam="+locHref+"&reportId="+reportId)
            //     dateTabel(globalUrl,searchDate,reportKey,locHref);
            // }else if(data.rows[0].flag=='4'){
            //     layer.msg('请查看历史数据！', {
            //         time: 2000 //2s后自动关闭
            //     });
            // }else if(data.rows[0].flag=='3'){
            //     layer.msg(data.rows[0].exception, {
            //         time: 2000 //2s后自动关闭
            //     });
            }else {
                console.log("出现异常1");
            }
        }
    });
}
/*调用第二个接口，每隔两秒判断返回状态*/
function getReportState(reportKey,reportId,areaCode,saleArea,iomArea,startDate,endDate,gridInfo,tradeCatalog){

    if (tradeCatalog == 'all') {    // 此处查询需要置空, 明细中可带入all
        tradeCatalogVal = "";
    } else {
        tradeCatalogVal  = tradeCatalog;
    }

    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        dataType: 'json',
        url : getOutUrl(getRootPath_web(), "/reportdetail/find?startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&userParam="+locHref+
            "&integratedId="+gridInfo+"&tradeCatalog="+tradeCatalogVal+"&areaCode="+areaCode+"&saleArea="+saleArea+"&iomArea="+iomArea
            +"&firstLevel="+firstLevel
            +"&secondLevel="+secondLevel
            +"&threeLevel="+threeLevel
        ),
        data :  {
            "startDate":startDate,
            "endDate":endDate,
            "reportId":reportId,
            "reportKey":reportKey,
            "userParam":decodeURI(locHref),
            "integratedId":gridInfo,
            "tradeCatalog":tradeCatalogVal,
            "areaCode":areaCode,
            "saleArea":saleArea,
            "iomArea":iomArea,
            "classType":classType,
            "firstLevel": firstLevel,
            "secondLevel": secondLevel,
            "threeLevel": threeLevel
        },
        error : function(){
            console.error("出现异常");
        },
        success : function(data){
            if(data.state=="1" && data.rows[0].flag=='2'){
                //去除弹窗层
                $("#fakeLoader").remove();

                //前台表格显示数据
                globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&userParam="+locHref+
                    "&integratedId="+gridInfo+"&tradeCatalog="+tradeCatalogVal+"&areaCode="+areaCode+"&saleArea="+saleArea+"&iomArea="+iomArea+"&classType="+classType);

                if (workCatalog == 0) { // 线上
                    makeSvgOnline(globalUrl,startDate,endDate,reportId,reportKey,locHref,tradeCatalogVal,areaCode,gridInfo,classType);
                } else if (workCatalog == 1) {  // 线下
                    makeSvgUnderline(globalUrl,startDate,endDate,reportId,reportKey,locHref,tradeCatalogVal,areaCode,gridInfo,classType);
                } else {
                    return;
                }
                // $("#exportBtn").attr('disabled',false);
            }else{
                //继续调用定时任务
                setTimeout("getReportState(reportKey,reportId,areaCode,saleArea,iomArea,startDate,endDate,gridInfo,tradeCatalog,classType)",2000);
            }
        }
    });
}

// 获取网格销售线
function initGridDependenciesSelectBox() {
    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        dataType: 'json',
        async: false,
        url : getOutUrl(getRootPath_web(), "/reportdetail/getfirstlevel?userParam="+locHref),
        data :  {
            "userParam":decodeURI(locHref)
        },
        error : function(){
            console.error("出现异常");
            layer.msg('未查询到网格销售线！', {
                time: 2000 //2s后自动关闭
            });
            $('#gridDependenciesAll').empty();
        },
        success : function(data){
            if (data.state == '1') {
                $('#gridDependenciesAll').empty();
                $('#gridDependenciesAll').append('<option value="">全部属地分公司</option>');
                for (var i = 0; i < data.total; i++) {
                    $('#gridDependenciesAll').append('<option value="'+ data.rows[i].sourceCode +'">' + data.rows[i].srouceName + '</option>');
                }
            } else {
                // alert(data.message);
                layer.msg('未查询到网格销售线！', {
                    time: 2000 //2s后自动关闭
                });
                $('#gridDependenciesAll').empty();
            }
        }
    });
}

// 属地口径, 根据areaCode检索并显示网格列表
function setGridSelectBox(areaCode) {
    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        dataType: 'json',
        url : getOutUrl(getRootPath_web(), "/reportdetail/getsecondlevel?firstLevel="+areaCode+"&userParam="+locHref),
        data :  {
            "areaCode":areaCode,
            "userParam":decodeURI(locHref)
        },
        error : function(){
            console.error("出现异常");
            layer.msg('未查询到网格！', {
                time: 2000 //2s后自动关闭
            });
            $('#gridInfo').empty();
        },
        success : function(data){
            if (data.state == '1') {
                $('#gridInfo').empty();
                $('#gridInfo').append('<option value="">请选择网格</option>');
                for (var i = 0; i < data.total; i++) {
                    $('#gridInfo').append('<option value="'+ data.rows[i].secondLevel +'">' + data.rows[i].secondLevelName + '</option>');
                }
            } else {
                // alert(data.message);
                if ($('#gridDependenciesAll').val() != '') {
                    layer.msg('未查询到网格！', {
                        time: 2000 //2s后自动关闭
                    });
                }
                $('#gridInfo').empty();
                $('#gridInfo').append('<option value="">请选择网格</option>');
            }
        }
    });
}

// 取得所属分公司的权限
function queryReportPermission(){

    if (workCatalog == 0) { // 线上属地
        reportKey = reportKeyOnlineArea;
    } else if (workCatalog == 1) {  // 线下属地
        reportKey = reportKeyArea;
    }

    if ($('#calibersd').hasClass("searched")) { //属地
    } else {    //发展
        if (workCatalog == 0) { // 线上发展
            reportKey = reportKeyOnlineDev;
        } else if (workCatalog == 1) {  // 线下发展
            reportKey = reportKeyDev;
        }
    }

    $.ajax({
        type: 'get', //测试get，正式post
        cache: false,
        async: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/getauth?userParam=" + locHref + "&reportKey=" + reportKey),
        data: {
            reportKey: reportKey,
            userParam: decodeURI(locHref)
        },
        error: function () {
            console.error("出现异常");
            $('#selectBranch').empty();
        },
        success: function (data) {
            reportPermission = data.rows[0].queryValue;
            if (reportPermission == 'all') {

            } else {
                $('#selectBranch').empty();
                if ($('#calibersd').hasClass("searched")) { //属地
                    $('#dependenciessq').empty();
                    $('#dependenciesjj').empty();
                    $('#dependencieszx').empty();
                    $('#dependenciesyj').empty();
                    switch (reportPermission) {
                        //市区
                        case '2':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#dependenciessq').append('<option value="2">二区</option>');
                            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '3':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#dependenciessq').append('<option value="3">三区</option>');
                            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '4':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#dependenciessq').append('<option value="4">四区</option>');
                            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '5':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#dependenciessq').append('<option value="5">五区</option>');
                            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '7':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#dependenciessq').append('<option value="7">七区</option>');
                            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '8':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#dependenciessq').append('<option value="8">八区</option>');
                            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        //近郊
                        case '802':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#dependenciesjj').append('<option value="802">通州</option>');
                            $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '801':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#dependenciesjj').append('<option value="801">昌平</option>');
                            $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '804':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#dependenciesjj').append('<option value="804">大兴</option>');
                            $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '806':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#dependenciesjj').append('<option value="806">顺义</option>');
                            $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '803':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#dependenciesjj').append('<option value="803">房山</option>');
                            $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        // 远郊
                        case '809':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#dependenciesyj').append('<option value="809">密云</option>');
                            $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '808':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#dependenciesyj').append('<option value="808">怀柔</option>');
                            $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '805':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#dependenciesyj').append('<option value="805">门头沟</option>');
                            $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '807':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#dependenciesyj').append('<option value="807">平谷</option>');
                            $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '810':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#dependenciesyj').append('<option value="810">延庆</option>');
                            $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        // 部门中心
                        case '10':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#dependencieszx').append('<option value="10">重通局</option>');
                            $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '9999':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#dependencieszx').append('<option value="9999">其他</option>');
                            $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        default:
                    }

                    if (isFirstLoad) {
                        // 更新网格列表数据
                        // setGridSelectBox(reportPermission);
                        isFirstLoad = false;
                    }
                } else {    //发展
                    $('#developsq').empty();
                    $('#developjj').empty();
                    $('#developzx').empty();
                    $('#developyj').empty();
                    switch (reportPermission) {
                        //市区
                        case '225':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#developsq').append('<option value="225">二区</option>');
                            $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '226':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#developsq').append('<option value="226">三区</option>');
                            $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '211':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#developsq').append('<option value="211">四区</option>');
                            $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '212':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#developsq').append('<option value="212">五区</option>');
                            $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '213':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#developsq').append('<option value="213">七区</option>');
                            $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '214':
                            $('#selectBranch').append('<option value="市区">市区</option>');
                            $('#developsq').append('<option value="214">八区</option>');
                            $('#developsq').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        //近郊
                        case '217':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#developjj').append('<option value="217">通州</option>');
                            $('#developjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '219':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#developjj').append('<option value="219">昌平</option>');
                            $('#developjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '220':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#developjj').append('<option value="220">大兴</option>');
                            $('#developjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '218':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#developjj').append('<option value="218">顺义</option>');
                            $('#developjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '216':
                            $('#selectBranch').append('<option value="近郊">近郊</option>');
                            $('#developjj').append('<option value="216">房山</option>');
                            $('#developjj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        // 远郊
                        case '223':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#developyj').append('<option value="223">密云</option>');
                            $('#developyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '221':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#developyj').append('<option value="221">怀柔</option>');
                            $('#developyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '215':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#developyj').append('<option value="215">门头沟</option>');
                            $('#developyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '222':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#developyj').append('<option value="222">平谷</option>');
                            $('#developyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '224':
                            $('#selectBranch').append('<option value="远郊">远郊</option>');
                            $('#developyj').append('<option value="224">延庆</option>');
                            $('#developyj').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        // 部门中心
                        case '227':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#developzx').append('<option value="227">重通局</option>');
                            $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '11a0al':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#developzx').append('<option value="11a0al">中台</option>');
                            $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '11a01s':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#developzx').append('<option value="11a01s">渠道中心</option>');
                            $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case 'dkhzx':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#developzx').append('<option value="dkhzx">大客户中心</option>');
                            $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '11a01q':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#developzx').append('<option value="11a01q">客服中心</option>');
                            $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        case '11a08x':
                            $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                            $('#developzx').append('<option value="11a08x">其他</option>');
                            $('#developzx').removeClass('developItem').siblings().addClass('developItem');
                            break;
                        default:
                    }
                }
            }
        }
    });
}

function makeSvgOnline(globalUrl,startDate,endDate,reportId,reportKey,userParam,tradeCatalog,areaCode,gridInfo) {

    // dateType : 0当日, 1当月, all累计
    // onlineType_on ='1'; 属地    onlineType_on ='2';发展      --线上
    // onlineType_out ='1'; 属地    onlineType_on ='2';发展     --线下

    var flowChart = $("#flowChart");
    var data = {
        "startDate":startDate,
        "endDate":endDate,
        "reportId":reportId,
        "reportKey":reportKey,
        "userParam":decodeURI(locHref),
        "integratedId":gridInfo,
        "tradeCatalog":tradeCatalog,
        "areaCode":areaCode,
        "saleArea":saleArea,
        "iomArea":iomArea
    };
    console.log(data);
    $.ajax({
        type: "get",// 测试 GET 生产POST
        url : globalUrl,
        async: true,
        dataType: 'json',
        data: data,
        success: function(res) {
            var picS = res.rows;

            for (var i = 0; i < statics_in.length; i++){
                statics_in[i].aCount = 0;
                statics_in[i].bCount = 0;
            }

            for (var i = 0; i < statics_in.length; i++){
                var num =0;

                for (var j = 0; j < picS.length; j++) {
                    if (statics_in[i].workFlag == picS[j].work_flag) {
                        num++;
                        statics_in[i].aCount = statics_in[i].aCount + parseInt(picS[j].a_count);
                        statics_in[i].bCount = statics_in[i].bCount + parseInt(picS[j].b_count);
                    }
                }
            }
            console.log(statics_in);
            var aCount = statics_in[0].aCount;
            var aCount1 = statics_in[1].aCount;
            var aCount2 = statics_in[2].aCount;
            var aCount3 = statics_in[3].aCount;
            var aCount4 = statics_in[4].aCount;
            var aCount5 = statics_in[5].aCount;
            var aCount6 = statics_in[6].aCount;
            var aCount7 = statics_in[7].aCount;
            var aCount8 = statics_in[8].aCount;
            var aCount9 = statics_in[9].aCount;
            var aCount10 = statics_in[10].aCount;
            var aCount11 = statics_in[11].aCount;

            var bCount = statics_in[0].bCount;
            var bCount1 = statics_in[1].bCount;
            var bCount2 = statics_in[2].bCount;
            var bCount3 = statics_in[3].bCount;
            var bCount4 = statics_in[4].bCount;
            var bCount5 = statics_in[5].bCount;
            var bCount6 = statics_in[6].bCount;
            var bCount7 = statics_in[7].bCount;
            var bCount8 = statics_in[8].bCount;
            var bCount9 = statics_in[9].bCount;
            var bCount10 = statics_in[10].bCount;
            var bCount11 = statics_in[11].bCount;

            var imag59 = '../../images/wys1/Group1.png';
            var imag60 = '../../images/wys1/Group4.png';
            var imag61 = '../../images/wys1/Group6.png';
            var imag62 = '../../images/wys1/Group8.png';

            var imag25 = '../../images/wys1/Group 25.png';
            var imag26 = '../../images/wys1/Group 26.png';
            var imag58 = '../../images/wys1/Group 58.png';
            var imag33 = '../../images/wys1/Group 33.png';
            var imag34 = '../../images/wys1/Group 34.png';
            var imag35 = '../../images/wys1/Group 35.png';
            var imag36 = '../../images/wys1/Group 36.png';

            var imag32 = '../../images/wys1/Group 32.png';
            var imag27 = '../../images/wys1/Group 27.png';
            var imag28 = '../../images/wys1/Group 28.png';
            var imag38 = '../../images/wys1/Group 38.png';
            var imag31 = '../../images/wys1/Group 31.png';
            var imag24 = '../../images/wys1/Group 24.png';

            var imag29 = '../../images/wys1/Group 29.png';
            var imag30 = '../../images/wys1/Group 30.png';
            var imag37 = '../../images/wys1/Group 37.png';

            var gif1 = '../../images/wys/1.gif';
            var gif2 = '../../images/wys1/2.gif';
            var gif3 = '../../images/wys1/3.gif';
            var gif4 = '../../images/wys1/4.gif';
            var gif5 = '../../images/wys1/5.gif';
            var gif6 = '../../images/wys1/6.gif';
            var gif7 = '../../images/wys1/7.gif';
            var gif8 = '../../images/wys1/8.gif';
            var gif9 = '../../images/wys1/9.gif';
            var gif10 = '../../images/wys1/10.gif';
            var gif11 = '../../images/wys1/11.gif';
            var gif12 = '../../images/wys1/12.gif';


            var changeImg = bCount > 0 ? gif2 : imag26;
            var changeImg1 = bCount1 > 0 ? gif7 : imag58;
            var changeImg2 = bCount2 > 0 ? gif10 : imag33;
            var changeImg3 = bCount3 > 0 ? gif9 : imag35;
            var changeImg4 = bCount10 > 0 ? gif11 : imag32;
            var changeImg5 = bCount4 > 0 ? gif3 : imag27;
            var changeImg6 = bCount5 > 0 ? gif4 : imag28;
            var changeImg7 = bCount6 > 0 ? gif8 : imag38;
            var changeImg8 = bCount7 > 0 ? gif6 : imag31;
            var changeImg9 = bCount8 > 0 ? gif5 : imag29;
            var changeImg10 = bCount11 > 0 ? gif12 : imag24;
            var str = '';
            str = '<svg height="100%" width="100%" viewBox="0,-10,1100,450">' +
                '<defs>' +
                '<marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 L0,0 Z" fill="#0bb737" />' +
                '</marker>' +
                '<marker id="arrow1" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 L0,0 Z" fill="#dd7c5a" />' +
                '</marker>' +
                '</defs>' +

                '<image class="wys" xlink:href="' + imag59 + '" x="0" y="18" height="62" width="70" />' +
                '<image class="wys" xlink:href="' + imag60 + '" x="0" y="65" height="62" width="70" />' +
                '<image class="wys" xlink:href="' + imag61 + '" x="0" y="112" height="62" width="70" />' +
                '<image class="wys" xlink:href="' + imag62 + '" x="0" y="159" height="62" width="70" />' +

                '<line x1="70" y1="50" x2="112" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image class="img25" xlink:href="' + imag25 + '" x="124" y="18" height="62" width="70" />' +

                '<line x1="194" y1="50" x2="232" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg + '" x="245" y="18" height="62" width="70" data-id="'+statics_in[0].workFlag+'"/>' +
                '<text id="A8" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;";" x="246" y="18"  data-type="0" data-id="'+statics_in[0].workFlag+'">' + aCount + '</text>' +
                '<text id="B8" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="314" y="18"  data-type="1" data-id="'+statics_in[0].workFlag+'">' + bCount + '</text>' +

                '<line x1="315" y1="50" x2="448" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg1 + '" x="460" y="18" height="62" width="70" data-id="'+statics_in[1].workFlag+'"/>' +
                '<text id="A9" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="462" y="18" data-type="0" data-id="'+statics_in[1].workFlag+'">' + aCount1 + '</text>' +
                '<text id="B9" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="530" y="18" data-type="1" data-id="'+statics_in[1].workFlag+'">' + bCount1 + '</text>' +


                '<line x1="530" y1="50" x2="584" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg2 + '" x="596" y="18" height="62" width="70" data-id="'+statics_in[2].workFlag+'"/>' +
                '<text id="A10" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="598" y="18" data-type="0" data-id="'+statics_in[2].workFlag+'">' + aCount2 + '</text>' +
                '<text id="B10" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="666" y="18" data-type="1" data-id="'+statics_in[2].workFlag+'">' + bCount2 + '</text>' +

                '<line x1="666" y1="50" x2="714" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image class="img34" xlink:href="' + imag34 + '" x="726" y="18" height="62" width="70" />' +

                '<line x1="796" y1="50" x2="844" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg3 + '" x="856" y="18" height="62" width="70" data-id="'+statics_in[3].workFlag+'"/>' +
                '<text id="A11" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="858" y="18" data-type="0" data-id="'+statics_in[3].workFlag+'">' + aCount3 + '</text>' +
                '<text id="B11" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="924" y="18" data-type="1" data-id="'+statics_in[3].workFlag+'">' + bCount3 + '</text>' +

                '<line x1="926" y1="50" x2="974" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image class="img36" xlink:href="' + imag36 + '" x="986" y="18" height="62" width="70" />' +

                '<line x1="202" y1="51" x2="202" y2="371" stroke="#dd7c5a" stroke-width="3" />' +

                '<line x1="202" y1="242" x2="221" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg5 + '" x="233" y="209" height="66" width="94"  data-id="'+statics_in[4].workFlag+'"/>' +
                '<text id="A12" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="243" y="210"  data-type="0" data-id="'+statics_in[4].workFlag+'">' + aCount4 + '</text>' +
                '<text id="B12" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="317" y="210"  data-type="1" data-id="'+statics_in[4].workFlag+'">' + bCount4 + '</text>' +

                '<line x1="280" y1="349" x2="280" y2="286" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<line x1="496" y1="264" x2="496" y2="336" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +

                '<line x1="632" y1="73" x2="632" y2="115" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg4 + '" x="596" y="120" height="62" width="70" data-id="'+statics_in[10].workFlag+'"/>' +
                '<text id="A18" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="598" y="119"  data-type="0" data-id="'+statics_in[10].workFlag+'">' + aCount10 + '</text>' +
                '<text id="B18" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="666" y="119"  data-type="1" data-id="'+statics_in[10].workFlag+'">' + bCount10 + '</text>' +

                '<line x1="496" y1="73" x2="496" y2="198" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg7 + '" x="449" y="209" height="66" width="94" data-id="'+statics_in[6].workFlag+'"/>' +
                '<text id="A14" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="462" y="211"  data-type="0" data-id="'+statics_in[6].workFlag+'">' + aCount6 + '</text>' +
                '<text id="B14" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="530" y="211"  data-type="1" data-id="'+statics_in[6].workFlag+'">' + bCount6 + '</text>' +
                '<line x1="280" y1="84" x2="280" y2="197" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<line x1="280" y1="206" x2="280" y2="84" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +

                '<line x1="449" y1="242" x2="440" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg6 + '" x="358" y="212" height="62" width="70" data-id="'+statics_in[5].workFlag+'"/>' +
                '<text id="A13" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="360" y="211"  data-type="0" data-id="'+statics_in[5].workFlag+'">' + aCount5 + '</text>' +
                '<text id="B13" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="428" y="211"  data-type="0" data-id="'+statics_in[5].workFlag+'">' + bCount5 + '</text>' +

                '<line x1="542" y1="242" x2="584" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg8 + '" x="596" y="212" height="62" width="70" data-id="'+statics_in[7].workFlag+'"/>' +
                '<text id="A15" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="598" y="211"  data-type="0" data-id="'+statics_in[7].workFlag+'">' + aCount7 + '</text>' +
                '<text id="B15" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="666" y="211"  data-type="1" data-id="'+statics_in[7].workFlag+'">' + bCount7 + '</text>' +

                '<line x1="666" y1="242" x2="714" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg10 + '" x="726" y="212" height="62" width="70" data-id="'+statics_in[11].workFlag+'"/>' +
                '<text id="A24" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="726" y="211"  data-type="0" data-id="'+statics_in[11].workFlag+'">' + aCount11 + '</text>' +
                '<text id="B24" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="796" y="211"  data-type="1" data-id="'+statics_in[11].workFlag+'">' + bCount11 + '</text>' +

                '<line x1="202" y1="370" x2="232" y2="370" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg9 + '" x="244" y="340" height="62" width="70"  data-id="'+statics_in[8].workFlag+'"/>' +
                '<text id="A16" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="246" y="339"  data-type="0" data-id="'+statics_in[8].workFlag+'">' + aCount8 + '</text>' +
                '<text id="B16" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="314" y="339"  data-type="1" data-id="'+statics_in[8].workFlag+'">' + bCount8 + '</text>' +

                '<line x1="314" y1="370" x2="448" y2="370" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + imag30 + '" x="460" y="340" height="62" width="70"  data-id="'+statics_in[9].workFlag+'"/>' +
                '<text id="A17" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="462" y="339"  data-type="0" data-id="'+statics_in[9].workFlag+'">' + aCount9 + '</text>' +
                '<text id="B17" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="530" y="339"  data-type="1" data-id="'+statics_in[9].workFlag+'">' + bCount9 + '</text>' +

                '<line x1="530" y1="370" x2="974" y2="370" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image class="img37" xlink:href="' + imag37 + '" x="986" y="340" height="62" width="70" />' +
                '<rect class="" style="fill:rgb(52,84,143);" rx="6" ry="6" x="0" y="360" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="370">工单总量</text>' +
                '<rect class="" style="fill:rgb(207,65,32);" rx="6" ry="6" x="0" y="385" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="395">超时工单量</text>' +


                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="464" y="131">无法</text>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="500" y="131">安装</text>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="600" y="100">复杂</text>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="636" y="100">业务</text>' +

                //A8 B8
                '<rect id="rA8" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="260" y="35" height="42" width="180"/>' +
                '<text id="tA8" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="280" y="62">待抢单及待领单的订单</text>'+
                '<rect id="rB8" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="280" y="35" height="42" width="205"/>' +
                '<text id="tB8" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="300" y="62">待领单的超时订单(15分钟)</text>'+
                //A9 B9
                '<rect id="rA9" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="475" y="35" height="42" width="150"/>' +
                '<text id="tA9" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="495" y="62">未二次预约的订单</text>'+
                '<rect id="rB9" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="495" y="35" height="42" width="220"/>' +
                '<text id="tB9" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="515" y="62">未二次预约的超时订单(4小时)</text>'+
                //A10 B10
                '<rect id="rA10" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="610" y="35" height="42" width="150"/>' +
                '<text id="tA10" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="630" y="62">未上门行销的订单</text>'+
                '<rect id="rB10" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="35" height="42" width="265"/>' +
                '<text id="tB10" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="62">未上门行销的超时订单(1小时30分钟)</text>'+
                //A11 B11
                '<rect id="rA11" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="870" y="35" height="42" width="165"/>' +
                '<text id="tA11" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="890" y="62">已行销未竣工的订单</text>'+
                '<rect id="rB11" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="890" y="35" height="42" width="235"/>' +
                '<text id="tB11" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="910" y="62">已行销未竣工的超时订单(8小时)</text>'+
                //A12 B12
                '<rect id="rA12" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="250" y="230" height="42" width="270"/>' +
                '<text id="tA12" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="270" y="256">待分公司工单调度组强派/转派的订单</text>'+
                '<rect id="rB12" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="280" y="230" height="42" width="360"/>' +
                '<text id="tB12" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="300" y="256">待分公司工单调度组强派/转派的超时订单（30分钟）</text>'+
                //A13 B13
                '<rect id="rA13" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="370" y="230" height="42" width="180"/>' +
                '<text id="tA13" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="390" y="256">需简单补点施工的订单</text>'+
                '<rect id="rB13" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="390" y="230" height="42" width="235"/>' +
                '<text id="tB13" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="410" y="256">需简单补点施工的超时订单(7天)</text>'+
                //A14 B14
                '<rect id="rA14" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="465" y="230" height="42" width="250"/>' +
                '<text id="tA14" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="485" y="256">分公司工单调度组退单审核的订单</text>'+
                '<rect id="rB14" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="485" y="230" height="42" width="290"/>' +
                '<text id="tB14" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="505" y="256">分公司工单调度组退单审核的订单（1天）</text>'+
                //A15 B15
                '<rect id="rA15" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="610" y="230" height="42" width="180"/>' +
                '<text id="tA15" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="630" y="256">需进行资源建设的工单</text>'+
                '<rect id="rB15" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="230" height="42" width="248"/>' +
                '<text id="tB15" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="256">需进行资源建设的超时工单(18天)</text>'+
                //A16 B16
                '<rect id="rA16" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="257" y="358" height="42" width="210"/>' +
                '<text id="tA16" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="277" y="384">待一级中台强派/转派的订单</text>'+
                '<rect id="rB16" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="270" y="358" height="42" width="285"/>' +
                '<text id="tB16" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="290" y="384">待一级中台强派/转派的超时订单(1小时)</text>'+
                //A17 B17
                '<rect id="rA17" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="475" y="358" height="42" width="138"/>' +
                '<text id="tA17" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="495" y="384">今日取消的订单</text>'+
                //A18 B18
                '<rect id="rA18" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="610" y="137" height="42" width="220"/>' +
                '<text id="tA18" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="630" y="163">行销失败，转中台受理的订单</text>'+
                '<rect id="rB18" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="137" height="42" width="280"/>' +
                '<text id="tB18" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="163">行销失败，转中台受理的超时订单(1天)</text>'+
                //A24 B24
                '<rect id="rA24" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="740" y="230" height="42" width="220"/>' +
                '<text id="tA24" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="760" y="256">需进行专项拓展的资源建设单</text>'+
                '</svg>';
            flowChart.html(str);
            imageIframe();
            textIframe_in();
            textIframe_in1();
        },
        error: function() {

        }
    });

}

var iev = IEVersion(); //浏览器版本
var lv_ie;
if(iev >= 9) {
    lv_ie = 16;
} else {
    lv_ie = 10;
}

function makeSvgUnderline(globalUrl,startDate,endDate,reportId,reportKey,userParam,tradeCatalog,areaCode,gridInfo) {

    // dateType : 0当日, 1当月, all累计
    // onlineType_on ='1'; 属地    onlineType_on ='2';发展      --线上
    // onlineType_out ='1'; 属地    onlineType_on ='2';发展     --线下

    var flowChart1 = $("#flowChart1");
    var data = {
        "startDate":startDate,
        "endDate":endDate,
        "reportId":reportId,
        "reportKey":reportKey,
        "userParam":decodeURI(locHref),
        "integratedId":gridInfo,
        "tradeCatalog":tradeCatalog,
        "areaCode":areaCode,
        "saleArea":saleArea,
        "iomArea":iomArea,
        'classType':classType  //iptv
    };
    console.log(data);
    $.ajax({
        type: "get",
        url : globalUrl,
        async: true,
        dataType: 'json',
        data:{},//data,
        success: function(res) {
            console.log(res)
            var picS = res.rows;
            for (var i = 0; i < statics_out.length; i++){
                statics_out[i].aCount = 0;
                statics_out[i].bCount = 0;
            }
            for (var i = 0; i < statics_out.length; i++){
                var num =0;
                for (var j = 0; j < picS.length; j++) {
                    if (statics_out[i].workFlag == picS[j].work_flag) {
                        num++;
                        statics_out[i].aCount = statics_out[i].aCount + parseInt(picS[j].a_count);
                        statics_out[i].bCount = statics_out[i].bCount + parseInt(picS[j].b_count);
                    }
                }
            }
            var image30 = '../../images/yyt1/Group1.png';
            var image31 = '../../images/yyt1/Group3.png';
            var image32 = '../../images/yyt1/Group5.png';
            var image33 = '../../images/yyt1/Group7.png';

            var image1 = '../../images/yyt1/Group.png';
            var image2 = '../../images/yyt1/Group22.png';
            var image3 = '../../images/yyt1/Group33.png';
            var image4 = '../../images/yyt1/Group44.png';
            var image5 = '../../images/yyt1/Group55.png';
            var image29 = '../../images/yyt1/Group29.png';
            var image11 = '../../images/yyt1/Group11.png'
            var image12 = '../../images/yyt1/Group12.png'

            var image9 = '../../images/yyt1/Group 9.png';
            var image7 = '../../images/yyt1/Group77.png';
            var image6 = '../../images/yyt1/Group66.png';
            var image23 = '../../images/yyt1/Group23.png';

            var image8 = '../../images/yyt1/Group88.png';
            var image10 = '../../images/yyt1/Group 10.png';
            var image0 = '../../images/yyt1/Group0.png';

            var gif1 = '../../images/yyt1/1.gif';
            var gif2 = '../../images/yyt1/2.gif';
            var gif3 = '../../images/yyt1/3.gif';
            var gif4 = '../../images/yyt1/4.gif';
            var gif5 = '../../images/yyt1/5.gif';
            var gif6 = '../../images/yyt1/6.gif';
            var gif7 = '../../images/yyt1/7.gif';
            var gif8 = '../../images/yyt1/8.gif';
            var gif9 = '../../images/yyt1/9.gif';
            var gif10 = '../../images/yyt1/10.gif';
            var gif20 = '../../images/yyt1/20.gif';
            var gif21 = '../../images/yyt1/21.gif';
            var gif22 = '../../images/yyt1/22.gif';

            var aCount = statics_out[0].aCount;
            var aCount1 = statics_out[1].aCount;
            var aCount2 = statics_out[2].aCount;
            var aCount3 = statics_out[3].aCount;
            var aCount4 = statics_out[4].aCount;
            var aCount5 = statics_out[5].aCount;
            var aCount6 = statics_out[6].aCount;
            var aCount7 = statics_out[7].aCount;
            var aCount8 = statics_out[8].aCount;
            var aCount9 = statics_out[9].aCount;
            var aCount10 = statics_out[10].aCount;
            var aCount11 = statics_out[11].aCount;

            var bCount = statics_out[0].bCount;
            var bCount1 = statics_out[1].bCount;
            var bCount2 = statics_out[2].bCount;
            var bCount3 = statics_out[3].bCount;
            var bCount4 = statics_out[4].bCount;
            var bCount5 = statics_out[5].bCount;
            var bCount6 = statics_out[6].bCount;
            var bCount7 = statics_out[7].bCount;
            var bCount8 = statics_out[8].bCount;
            var bCount9 = statics_out[9].bCount;
            var bCount10 = statics_out[10].bCount;
            var bCount11 = statics_out[11].bCount;

            var changeImg = bCount > 0 ? gif3 : image2;
            var changeImg1 = bCount1 > 0 ? gif2 : image3;
            var changeImg2 = bCount2 > 0 ? gif7 : image4;
            var changeImg3 = bCount4 > 0 ? gif6 : image9;
            var changeImg4 = bCount5 > 0 ? gif4 : image7;
            var changeImg5 = bCount6 > 0 ? gif1 : image6;
            var changeImg6 = bCount7 > 0 ? gif5 : image8;
            var changeImg7 = bCount3 > 0 ? gif8 : image5;
            var changeImg8 = bCount8 > 0 ? gif9 : image0;
            var changeImg9 = bCount9 > 0 ? gif10 : image23;
            var changeImg20 = bCount8 > 0 ? gif20 : image11;
            var changeImg21 = bCount10 >0? gif21: image12;
            var changeImg22 = bCount11 >0? gif22: image0;
            var str = '';
            str = '<svg height="100%" width="100%" viewBox="0,-10,1100,450">' +
                '<defs>' +
                '<marker id="arrow2" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 z" fill="#0bb737" />' +
                '</marker>' +
                '<marker id="arrow3" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 z" fill="#dd7c5a" />' +
                '</marker>' +
                '</defs>' +

                '<image class="yyt" xlink:href="' + image30 + '" x="0" y="16" height="62" width="82" />' +
                '<image class="yyt" xlink:href="' + image32 + '" x="0" y="75" height="62" width="82" />' +
                '<image class="yyt" xlink:href="' + image31 + '" x="0" y="132" height="62" width="82" />' +
                '<image class="yyt" xlink:href="' + image33 + '" x="0" y="189" height="62" width="82" />' +

                '<line x1="82" y1="46" x2="115" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="img1" xlink:href="' + image1 + '" x="127" y="16" height="62" width="82" />' +

                '<line x1="209" y1="46" x2="242" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg + '" x="254" y="16" height="62" width="82"   data-id="'+statics_out[0].workFlag+'"/>' +
                '<text id="A1" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="256" y="12"  data-type="0" data-id="'+statics_out[0].workFlag+'">'+ aCount +'</text>' +
                '<text id="B1" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="336" y="12"  data-type="1" data-id="'+statics_out[0].workFlag+'">'+ bCount +'</text>' +

                '<line x1="336" y1="46" x2="369" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg1 + '" x="381" y="16" height="62" width="82" data-id="'+statics_out[1].workFlag+'"/>' +
                '<text id="A19" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="383" y="12"  data-type="0" data-id="'+statics_out[1].workFlag+'">'+ aCount1 +'</text>' +
                '<text id="B19" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="463" y="12"  data-type="1" data-id="'+statics_out[1].workFlag+'">'+ bCount1 +'</text>' +

                '<line x1="463" y1="46" x2="496" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg2 + '" x="508" y="16" height="62" width="82"  data-id="'+statics_out[2].workFlag+'"/>' +
                '<text id="A2" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="510" y="12"  data-type="0" data-id="'+statics_out[2].workFlag+'">'+ aCount2 +'</text>' +
                '<text id="B2" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="590" y="12"  data-type="1" data-id="'+statics_out[2].workFlag+'">'+ bCount2 +'</text>' +

                '<line x1="717" y1="46" x2="750" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="imgS" style ="cursor: pointer;"  xlink:href="' + changeImg20 + '" x="762" y="16" height="62" width="82"  data-id="'+statics_out[8].workFlag+'"/>' +
                '<text id="A20" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="764" y="12"  data-type="0" data-id="'+statics_out[8].workFlag+'">'+ aCount8 +'</text>' +
                '<text id="B20" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="844" y="12"  data-type="1" data-id="'+statics_out[8].workFlag+'">'+ bCount8 +'</text>' +

                '<line x1="844" y1="46" x2="877" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="imgS" style ="cursor: pointer;"  xlink:href="' + changeImg21 + '" x="889" y="16" height="62" width="82"  data-id="'+statics_out[10].workFlag+'"/>' +
                '<text id="A21" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="891" y="12"  data-type="0" data-id="'+statics_out[10].workFlag+'">'+ aCount10 +'</text>' +
                '<text id="B21" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="971" y="12"  data-type="1" data-id="'+statics_out[10].workFlag+'">'+ bCount10 +'</text>' +

                '<line x1="971" y1="46" x2="1004" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="img29" xlink:href="' + image29 + '" x="1016" y="16" height="62" width="82" />' +

                '<line x1="590" y1="46" x2="623" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg7 + '" x="635" y="16" height="62" width="82"  data-id="'+statics_out[3].workFlag+'"/>' +
                '<text id="A3" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="637" y="12"  data-type="0" data-id="'+statics_out[3].workFlag+'">'+ aCount3 +'</text>' +
                '<text id="B3" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="717" y="12"  data-type="1" data-id="'+statics_out[3].workFlag+'">'+ bCount3 +'</text>' +

                '<line x1="296" y1="195" x2="296" y2="87" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg3 + '" x="254" y="192" height="62" width="82"   data-id="'+statics_out[4].workFlag+'"/>' +
                '<text id="A4" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="256" y="188"  data-type="0" data-id="'+statics_out[4].workFlag+'">'+ aCount4 +'</text>' +
                '<text id="B4" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="336" y="188"  data-type="1" data-id="'+statics_out[4].workFlag+'">'+ bCount4 +'</text>' +

                '<line x1="550" y1="75" x2="550" y2="168" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg4 + '" x="496" y="180" height="78" width="108" data-id="'+statics_out[5].workFlag+'"/>' +
                '<text id="A5" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="508" y="188"  data-type="0" data-id="'+statics_out[5].workFlag+'">'+ aCount5 +'</text>' +
                '<text id="B5" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="588" y="188"  data-type="1" data-id="'+statics_out[5].workFlag+'">'+ bCount5 +'</text>' +

                '<line x1="494" y1="219" x2="348" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<line x1="338" y1="219" x2="484" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +

                '<line x1="604" y1="219" x2="750" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg5 + '" x="762" y="192" height="62" width="82" data-id="'+statics_out[6].workFlag+'"/>' +
                '<text id="A6" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="764" y="188"  data-type="0" data-id="'+statics_out[6].workFlag+'">'+ aCount6 +'</text>' +
                '<text id="B6" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="844" y="188"  data-type="1" data-id="'+statics_out[6].workFlag+'">'+ bCount6 +'</text>' +

                '<line x1="844" y1="219" x2="877" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg9 + '" x="889" y="192" height="62" width="82" data-id="'+statics_out[9].workFlag+'"/>' +
                '<text id="A23" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="890" y="188"  data-type="0" data-id="'+statics_out[9].workFlag+'">'+ aCount9 +'</text>' +
                '<text id="B23" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="970" y="188"  data-type="1" data-id="'+statics_out[9].workFlag+'">'+ bCount9 +'</text>' +

                '<line x1="550" y1="256" x2="550" y2="351" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg6 + '" x="508" y="360" height="62" width="82"  data-id="'+statics_out[7].workFlag+'"/>' +
                '<text id="A7" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="510" y="356"  data-type="0" data-id="'+statics_out[7].workFlag+'">'+ aCount7 +'</text>' +
                //                '<text id="B7" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="680" y="356"  data-type="1" data-id="'+statics_out[7].workFlag+'">'+ bCount7 +'</text>' +

                '<line x1="590" y1="390" x2="1004" y2="390" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image class="img10" xlink:href="' + image10 + '" x="1016" y="360" height="62" width="82" />' +

                '<rect class="" style="fill:rgb(52,84,143);" rx="6" ry="6" x="0" y="360" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="370">工单总量</text>' +
                '<rect class="" style="fill:rgb(207,65,32);" rx="6" ry="6" x="0" y="385" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="395">超时工单量</text>' +

                //新加订单处理
                '<line x1="82" y1="164" x2="115" y2="164" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<line x1="169" y1="136" x2="169" y2="87" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg22 + '" x="127" y="132" height="62" width="82" data-id="'+statics_out[11].workFlag+'"/>' +
                '<polyline points="82,106 96,106 96,46" style="fill:#f2f2f2;stroke:#0bb737;stroke-width:3"/>' +
                '<polyline points="82,220 96,220 96,164" style="fill:#f2f2f2;stroke:#0bb737;stroke-width:3"/>' +
                '<text id="A22" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="129" y="128"  data-type="0" data-id="'+statics_out[11].workFlag+'">'+ aCount11 +'</text>' +
                '<text id="B22" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="209" y="128"  data-type="1" data-id="'+statics_out[11].workFlag+'">'+ bCount11 +'</text>' +

                //告警ab值
                //'<text id="A6" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="124" y="106"  data-type="0" data-id="'+statics_out[8].workFlag+'">'+ aCount8 +'</text>' +
                //'<text id="B6" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="204" y="106"  data-type="1" data-id="'+statics_out[8].workFlag+'">'+ bCount8 +'</text>' +
                //A1 B1
                '<rect id="rA1" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="250" y="30" height="42" width="150"/>' +
                '<text id="tA1" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="270" y="56">待外线抢单的工单</text>'+
                '<rect id="rB1" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="310" y="30" height="42" width="335"/>' +
                '<text id="tB1" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="330" y="56">二级中台未强派及外线未领单的超时工单(1小时)</text>'+
                //A19 B19
                '<rect id="rA19" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="370" y="30" height="42" width="180"/>' +
                '<text id="tA19" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="390" y="56">未进行二次预约的订单</text>'+
                '<rect id="rB19" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="10" x="440" y="30" height="42" width="250"/>' +
                '<text id="tB19" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="460" y="56">未进行二次预约的超时订单(4小时)</text>'+
                //A2 B2
                '<rect id="rA2" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="500" y="30" height="42" width="175"/>' +
                '<text id="tA2" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="520" y="56">外线未施工完成的工单</text>'+
                '<rect id="rB2" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="560" y="30" height="42" width="325"/>' +
                '<text id="tB2" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="580" y="56">未按时上门或未施工完成的工单(1小时30分钟)</text>'+
                //A3 B3
                '<rect id="rA3" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="620" y="30" height="42" width="250"/>' +
                '<text id="tA3" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="640" y="56">人工环节施工完成，未竣工的工单</text>'+
                '<rect id="rB3" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="690" y="30" height="42" width="310"/>' +
                '<text id="tB3" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="710" y="56">人工环节施工完成，未竣工的超时工单(1天)</text>'+
                //A20 B20
                '<rect id="rA20" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="750" y="30" height="42" width="150"/>' +
                '<text id="tA20" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="770" y="56">号卡待交付的订单</text>'+
                '<rect id="rB20" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="820" y="30" height="42" width="225"/>' +
                '<text id="tB20" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="840" y="56">号卡待交付的超时订单（7天）</text>'+
                //A21 B21
                '<rect id="rA21" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="870" y="30" height="42" width="150"/>' +
                '<text id="tA21" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="890" y="56">号卡待激活的订单</text>'+
                '<rect id="rB21" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="940" y="30" height="42" width="235"/>' +
                '<text id="tB21" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="960" y="56">号卡待激活的超时订单（15天）</text>'+
                //A22 B22
                '<rect id="rA22" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="112" y="146" height="42" width="120"/>' +
                '<text id="tA22" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="132" y="172">待受理的订单</text>'+
                '<rect id="rB22" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="166" y="146" height="42" width="215"/>' +
                '<text id="tB22" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="186" y="172">待受理超时的订单（4小时）</text>'+
                //A4 B4
                '<rect id="rA4" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="240" y="205" height="42" width="205"/>' +
                '<text id="tA4" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="260" y="231">需进行简单补点施工的工单</text>'+
                '<rect id="rB4" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="300" y="205" height="42" width="265"/>' +
                '<text id="tB4" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="320" y="231">需进行简单补点施工的超时工单(7天)</text>'+
                //A5 B5
                '<rect id="rA5" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="500" y="205" height="42" width="235"/>' +
                '<text id="tA5" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="520" y="231">外线退单后待分公司审核的工单</text>'+
                '<rect id="rB5" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="560" y="205" height="42" width="310"/>' +
                '<text id="tB5" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="580" y="231">外线退单后待分公司审核的超时工单（1天）</text>'+
                //A6 B6
                '<rect id="rA6" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="750" y="205" height="42" width="180"/>' +
                '<text id="tA6" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="770" y="231">需进行资源建设的工单</text>'+
                '<rect id="rB6" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="820" y="205" height="42" width="248"/>' +
                '<text id="tB6" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="840" y="231">需进行资源建设的超时工单(18天)</text>'+
                //A7 B7
                '<rect id="rA7" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="500" y="373" height="42" width="180"/>' +
                '<text id="tA7" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="520" y="399">待一级中台处理的工单</text>'+
                '<rect id="rB7" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="373" height="42" width="195"/>' +
                '<text id="tB7" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="399">一级中台处理超时的工单</text>'+
                //A23
                '<rect id="rA23" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="880" y="205" height="42" width="220"/>' +
                '<text id="tA23" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="900" y="231">需进行专项拓展的资源建设单</text>'+
                '</svg>';
            flowChart1.html(str);
            console.log(str)
            imageIframe1();
            textIframe_out();
            textIframe_out1();

        },
        error: function() {

        }
    });
}
//线上
function imageIframe(){
    var onlineTypeOn = caliberVal; // 分类口径:   1: 属地 2:发展

    var arr_image = document.getElementsByClassName("imgs");
    for(var i = 0; i < arr_image.length; i++) {
        arr_image[i].onclick = function() {
            console.log(this);
            var id = $(this).attr('data-id');

            console.log($(this).attr('data-id'));
            $('#chart_export_fordate').attr('data-chartid',id);
            $('#chart_export_fordate').attr('data-workcatalog',workCatalog);
            // // $('#chart_export_fordate').attr('valuein_developerArea',valuein_developerArea);
            $('#chart_export_fordate').attr('valuein_developerArea',areaCode);
            // // $('#chart_export_fordate').attr('tradeCatalogOn',tradeCatalogOn);
                $('#chart_export_fordate').attr('tradeCatalogOn',tradeCatalog);
            $('#chart_export_fordate').attr('onlineTypeOn',onlineTypeOn);

            $('#chart_export_fordate').attr('data-reportKey',reportKey);
            $('#chart_export_fordate').attr('data-reportId',reportId);
            $('#chart_export_fordate').attr('data-saleArea',saleArea);
            $('#chart_export_fordate').attr('data-iomArea',iomArea);
            $('#chart_export_fordate').attr('data-startDate',startDate);
            $('#chart_export_fordate').attr('data-endDate',endDate);
            $('#chart_export_fordate').attr('data-gridInfo',gridInfo);
            $('#chart_export_fordate').attr('data-tradeCatalog',tradeCatalog);
            console.log($('#chart_export_fordate').attr('data-workCatalog'));

            table_chart_fordate(id,workCatalog,reportKey,reportId,areaCode,saleArea,iomArea,startDate,endDate,gridInfo,tradeCatalog);
            $('#myModal_chart').modal('show');
            var data={
                workFlag:id, // 额外添加的参数
                workCatalog:workCatalog,
                startDate:startDate,
                endDate:endDate,
                reportId:reportId,
                reportKey:reportKey,
                userParam:decodeURI(locHref),
                integratedId:gridInfo,
                tradeCatalog:tradeCatalog,
                areaCode:areaCode,
                saleArea:saleArea,
                iomArea:iomArea,
                classType:classType,
            };
            $.ajax({
                type: 'post',
                url : getOutUrl(getRootPath_web(), "/reportdetail/finddetaildata?workFlag="+id+"&startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&userParam="+locHref+"&integratedId="+gridInfo+"&tradeCatalog="+tradeCatalog+"&areaCode="+areaCode+"&saleArea="+saleArea+"&iomArea="+iomArea),
                dataType: 'json',
                data: data,
                success: function(data) {
                    var arr_rows = data.rows;
                    var numA=[];
                    var numB=[];
                    var numX = [];
                    var numXCodeArr = [];

                    // if ($('#calibersd').hasClass("searched")) { //属地
                    if (caliberVal == "1") { //属地   // 分类口径:   1: 属地 2:发展
                        numX = ["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云","怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","其\n他"];
                        numXCodeArr = ["2","3","4","5","7","8","802","801","804","806","803","809","808","805","807","810","10","9999"];
                    } else {    // 发展
                        // numX = ["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云","怀柔","门头沟","平谷","延庆","重通局","中台","渠道中心","社渠中心","大客户中心","客服中心","其他","合计"];
                        numX = ["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云","怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","中\n台","渠\n道\n中\n心","大\n客\n户\n中\n心","客\n服\n中\n心","其\n他"];
                        numXCodeArr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","227","11a0al","11a01s","dkhzx","11a01q","11a08x"];
                    }

                    var aCountSum = 0;
                    for (var i = 0; i <  arr_rows.length; i++) {
                        aCountSum += parseInt(arr_rows[i].a_count);
                    }

                    var bCountSum = 0;
                    for (var i = 0; i <  arr_rows.length; i++) {
                        bCountSum += parseInt(arr_rows[i].b_count);
                    }

                    for(var i = 0; i < numXCodeArr.length; i++){
                        var itemA = 0;
                        var itemB = 0;
                        for(var j = 0; j < arr_rows.length; j++) {
                            if (caliberVal == "1") { //属地   // 分类口径:   1: 属地 2:发展
                                if (arr_rows[j].area_name == numXCodeArr[i]) {
                                    itemA = itemA + parseInt(arr_rows[j].a_count);
                                    itemB = itemB + parseInt(arr_rows[j].b_count);
                                }
                            } else {
                                if (arr_rows[j].develop_sale_area == numXCodeArr[i]) {
                                    itemA = itemA + parseInt(arr_rows[j].a_count);
                                    itemB = itemB + parseInt(arr_rows[j].b_count);
                                }
                            }
                        }
                        numA.push(itemA);
                        numB.push(itemB);
                    }
                    console.log(numA);
                    var d=new Date();
                    var dataTimeyear=d.getFullYear();
                    var dataTimemonth=dateChanger(d.getMonth()+1);
                    var dataTimeday=dateChanger(d.getDate());
                    var dataTimeh=dateChanger(d.getHours());
                    var dataTimeminute=dateChanger(d.getMinutes());
                    var time = dataTimeyear+'年'+dataTimemonth+'月'+dataTimeday+'日'+dataTimeh+'时'+dataTimeminute+'分';
                    $('#timeFlag').text("更新日期:"+time);
                    setTimeout(function() {
                        chart(numX, numA, numB)
                    }, 100)
                },
                error: function() {

                }
            });
        }
    }
}
function textIframe_in(){
    var onlineTypeOn = caliberVal; // 分类口径:   1: 属地 2:发展

    var arr = document.getElementsByClassName("aCount");
    $('.aCount').css('font-family','微软雅黑');
    for(var i = 0; i < arr.length; i++) {
        arr[i].onclick = function() {
            console.log(this);
            var type = $(this).attr('data-type');
            var id= $(this).attr('data-id');

            console.log($(this).attr('data-type'));
            $('#table_export_fordate').attr('data-tableid',id);
            $('#table_export_fordate').attr('data-type',type);
            $('#table_export_fordate').attr('data-workcatalog',workCatalog);
            // $('#table_export').attr('valuein_developerArea',valuein_developerArea);
            $('#table_export_fordate').attr('valuein_developerArea',areaCode);
            // $('#table_export').attr('tradeCatalogOn',tradeCatalogOn);
            $('#table_export_fordate').attr('tradeCatalogOn',tradeCatalog);
            $('#table_export_fordate').attr('onlineTypeOn',onlineTypeOn);

            $('#table_export_fordate').attr('data-startDate',startDate);
            $('#table_export_fordate').attr('data-endDate',endDate);
            $('#table_export_fordate').attr('data-integratedId',gridInfo);
            $('#table_export_fordate').attr('classType',classType);
            table_a_fordate(id,type,workCatalog,areaCode,tradeCatalog,onlineTypeOn,dateType,startDate,endDate,gridInfo,classType);
            $('#myModal_table_a').modal('show')
        };
        $(arr[i]).hover(function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","block");
            $("#t"+nub).css("display","block");

        },function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","none");
            $("#t"+nub).css("display","none");
        });
    }
}
function textIframe_in1(){
    var onlineTypeOn = caliberVal; // 分类口径:   1: 属地 2:发展
    var arr = document.getElementsByClassName("bCount");
    $('.bCount').css('font-family','微软雅黑');
    for(var i = 0; i < arr.length; i++) {
        arr[i].onclick = function() {
            console.log(this);
            var type = $(this).attr('data-type');
            var id= $(this).attr('data-id');

            console.log($(this).attr('data-type'));
            $('#table_export_fordate').attr('data-tableid',id);
            $('#table_export_fordate').attr('data-type',type);
            $('#table_export_fordate').attr('data-workcatalog',workCatalog);
            // $('#table_export_fordate').attr('valuein_developerArea',valuein_developerArea);
            $('#table_export_fordate').attr('valuein_developerArea',areaCode);
            // $('#table_export_fordate').attr('tradeCatalogOn',tradeCatalogOn);
            $('#table_export_fordate').attr('tradeCatalogOn',tradeCatalog);
            $('#table_export_fordate').attr('onlineTypeOn',onlineTypeOn);

            $('#table_export_fordate').attr('data-startDate',startDate);
            $('#table_export_fordate').attr('data-endDate',endDate);
            $('#table_export_fordate').attr('data-integratedId',gridInfo);
            $('#table_export_fordate').attr('classType',classType);
            console.log($('#table_export').attr('data-workcatalog'));
            table_b_fordate(id,type,workCatalog,areaCode,tradeCatalog,onlineTypeOn,dateType,startDate,endDate,gridInfo,classType);

            $('#myModal_table_b').modal('show')
        };
        $(arr[i]).hover(function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","block");
            $("#t"+nub).css("display","block");

        },function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","none");
            $("#t"+nub).css("display","none");
        });
    }
}
//线下
function imageIframe1(){
    var onlineTypeOut = caliberVal; // 分类口径:   1: 属地 2:发展
    var arr_image = document.getElementsByClassName("imgS");
    for(var i = 0; i < arr_image.length; i++) {
        arr_image[i].onclick = function() {
            console.log(this);
            var id = $(this).attr('data-id');
            var workCatalogOut = 1;
            if(id==20||id==21||id==22){
                workCatalogOut = 2;
            }
            console.log($(this).attr('data-id'));
            $('#chart_export_fordate').attr('data-chartid',id);
            $('#chart_export_fordate').attr('data-workcatalog',workCatalogOut);
            // $('#chart_export_fordate').attr('valueout_developerArea',valueout_developerArea);
            $('#chart_export_fordate').attr('valueout_developerArea',areaCode);
            // $('#chart_export_fordate').attr('tradeCatalogOut',tradeCatalogOn);
            $('#chart_export_fordate').attr('tradeCatalogOut',tradeCatalog);
            $('#chart_export_fordate').attr('onlineTypeOut',onlineTypeOut);

            $('#chart_export_fordate').attr('data-reportKey',reportKey);
            $('#chart_export_fordate').attr('data-reportId',reportId);
            $('#chart_export_fordate').attr('areaCode',areaCode);
            $('#chart_export_fordate').attr('data-saleArea',saleArea);
            $('#chart_export_fordate').attr('data-iomArea',iomArea);
            $('#chart_export_fordate').attr('data-startDate',startDate);
            $('#chart_export_fordate').attr('data-endDate',endDate);
            $('#chart_export_fordate').attr('data-gridInfo',gridInfo);
            $('#chart_export_fordate').attr('data-tradeCatalog',tradeCatalog);
            $('#chart_export_fordate').attr('classType',classType);
            console.log($('#chart_export_fordate').attr('classType'));
            table_chart_fordate(id,workCatalogOut,reportKey,reportId,areaCode,saleArea,iomArea,startDate,endDate,gridInfo,tradeCatalog,classType);
            $('#myModal_chart').modal('show');
            var data={
                workFlag:id, // 额外添加的参数
                workCatalog:workCatalog,
                startDate:startDate,
                endDate:endDate,
                reportId:reportId,
                reportKey:reportKey,
                userParam:decodeURI(locHref),
                integratedId:gridInfo,
                tradeCatalog:tradeCatalog,
                areaCode:areaCode,
                saleArea:saleArea,
                iomArea:iomArea,
                classType:classType
            };
            $.ajax({
                type: 'post',
                url : getOutUrl(getRootPath_web(), "/reportdetail/finddetaildata?workFlag="+id+"&startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&userParam="+locHref+"&integratedId="+gridInfo+"&tradeCatalog="+tradeCatalog+"&areaCode="+areaCode+"&saleArea="+saleArea+"&iomArea="+iomArea+"&classType="+classType),
                dataType: 'json',
                data: data,
                success: function(data) {
                    var arr_rows = data.rows;
                    var numA=[];
                    var numB=[];
                    var numX = [];
                    var numXCodeArr = [];

                    // if ($('#calibersd').hasClass("searched")) { //属地
                    if (caliberVal == "1") { //属地   // 分类口径:   1: 属地 2:发展
                        numX = ["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云","怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","其\n他"];
                        numXCodeArr = ["2","3","4","5","7","8","802","801","804","806","803","809","808","805","807","810","10","9999"];
                    } else {    // 发展
                        numX =  ["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云","怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","中\n台","渠\n道\n中\n心","大\n客\n户\n中\n心","客\n服\n中\n心","其\n他"];
                        numXCodeArr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","227","11a0al","11a01s","dkhzx","11a01q","11a08x"];
                    }

                    var aCountSum = 0;
                    for (var i = 0; i <  arr_rows.length; i++) {
                        aCountSum += parseInt(arr_rows[i].a_count);
                    }

                    var bCountSum = 0;
                    for (var i = 0; i <  arr_rows.length; i++) {
                        bCountSum += parseInt(arr_rows[i].b_count);
                    }

                    for(var i = 0; i < numXCodeArr.length; i++){
                        var numAVal = 0;
                        var numBVal = 0;
                        for(var j = 0; j < arr_rows.length; j++) {
                            // if ($('#calibersd').hasClass("searched")) { //属地
                            if (caliberVal == "1") { //属地   // 分类口径:   1: 属地 2:发展
                                if (arr_rows[j].area_name == numXCodeArr[i]) {
                                    numAVal = numAVal + parseInt(arr_rows[j].a_count);
                                    numBVal = numBVal + parseInt(arr_rows[j].b_count);
                                    break;
                                }
                            } else {
                                if (arr_rows[j].develop_sale_area == numXCodeArr[i]) {
                                    numAVal = numAVal + parseInt(arr_rows[j].a_count);
                                    numBVal = numBVal + parseInt(arr_rows[j].b_count);
                                }
                            }
                        }
                        numA.push(numAVal);
                        numB.push(numBVal);
                    }
                    console.log(numA);
                    var d=new Date();
                    var dataTimeyear=d.getFullYear();
                    var dataTimemonth=dateChanger(d.getMonth()+1);
                    var dataTimeday=dateChanger(d.getDate());
                    var dataTimeh=dateChanger(d.getHours());
                    var dataTimeminute=dateChanger(d.getMinutes());

                    var time = dataTimeyear+'年'+dataTimemonth+'月'+dataTimeday+'日'+dataTimeh+'时'+dataTimeminute+'分';
                    $('#timeFlag').text("更新日期:"+time);
                    setTimeout(function() {
                        chart(numX, numA, numB)
                    }, 100)
                },
                error: function() {

                }
            });
        }
    }
}
function textIframe_out(){
    var onlineTypeOut = caliberVal; // 分类口径:   1: 属地 2:发展
    var arr = document.getElementsByClassName("aCount1");
    $('.aCount1').css('font-family','微软雅黑');
    for(var i = 0; i < arr.length; i++) {
        arr[i].onclick = function() {
            console.log(this);
            type = $(this).attr('data-type');
            id= $(this).attr('data-id');

            console.log($(this).attr('data-type'));
            $('#table_export_fordate').attr('data-tableid',id);
            $('#table_export_fordate').attr('data-type',type);
            $('#table_export_fordate').attr('data-workcatalog',workCatalog);
            $('#table_export_fordate').attr('valueout_developerArea',areaCode);
            $('#table_export_fordate').attr('tradeCatalogOut',tradeCatalog);
            $('#table_export_fordate').attr('onlineTypeOut',onlineTypeOut);

            $('#table_export_fordate').attr('data-startDate',startDate);
            $('#table_export_fordate').attr('data-endDate',endDate);
            $('#table_export_fordate').attr('data-integratedId',gridInfo);
            $('#table_export_fordate').attr('classType',classType);
            console.log($('#table_export_fordate').attr('data-workcatalog'));
            table_a_fordate(id,type,workCatalog,areaCode,tradeCatalog,onlineTypeOut,dateType,startDate,endDate,gridInfo,classType);
            $('#myModal_table_a').modal('show')
        };
        $(arr[i]).hover(function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","block");
            $("#t"+nub).css("display","block");

        },function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","none");
            $("#t"+nub).css("display","none");
        });
    }
}

function textIframe_out1(){
    var onlineTypeOut = caliberVal; // 分类口径:   1: 属地 2:发展
    var arr = document.getElementsByClassName("bCount1");
    $('.bCount1').css('font-family','微软雅黑');
    for(var i = 0; i < arr.length; i++) {
        arr[i].onclick = function() {
            console.log(this);
            var type = $(this).attr('data-type');
            var id= $(this).attr('data-id');

            console.log($(this).attr('data-type'));
            $('#table_export_fordate').attr('data-tableid',id);
            $('#table_export_fordate').attr('data-type',type);
            $('#table_export_fordate').attr('data-workcatalog',workCatalog);
            $('#table_export_fordate').attr('valueout_developerArea',areaCode);
            $('#table_export_fordate').attr('tradeCatalogOut',tradeCatalog);
            $('#table_export_fordate').attr('onlineTypeOut',onlineTypeOut);

            $('#table_export_fordate').attr('data-startDate',startDate);
            $('#table_export_fordate').attr('data-endDate',endDate);
            $('#table_export_fordate').attr('data-integratedId',gridInfo);
            $('#table_export_fordate').attr('classType',classType);
            console.log($('#table_export_fordate').attr('data-workcatalog'));

            table_b_fordate(id,type,workCatalog,areaCode,tradeCatalog,onlineTypeOut,dateType,startDate,endDate,gridInfo,classType);
            $('#myModal_table_b').modal('show')
        };
        $(arr[i]).hover(function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","block");
            $("#t"+nub).css("display","block");

        },function(){
            var nub=$(this).attr('id');
            $("#r"+nub).css("display","none");
            $("#t"+nub).css("display","none");
        });
    }
}

function dateChanger(t){
    if(t<10){
        return "0"+t;
    }else{
        return t;
    }
}

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
    return iDays
}