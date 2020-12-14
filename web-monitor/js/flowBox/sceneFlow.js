var reportKeySceneArea = "sceneMonitorReportByArea"; //移网属地
var reportKeybusinessDev = "businessMonitorReportByDev"; //专线发展
var reportKey='',reportId='',startDate='',endDate='',pointId='',areaCode='',globalIdscene='';
//  产品类型
var firstLevel='',secondLevel='',threeLevel='',secondLevel='', flagProductType=true
var reportPermission = "";
var productCode = '771,800507,189,800768,123,900100,900600'
// var productCodeArrdef = ['771','800507','189','800768','123','900100','900600']
var productCodeArr = []
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);
locHref = locHref.substr(0, locHref.indexOf('&type')); // 移除后面type参数

//判断显示移网--专线    2:专线 all:移网
var typeStr = getUrlParam('type')
if (typeStr == 2) {
    $('#title1').text("场景化流程监控(专线)");
    $('#Lnav_text').text("场景化流程监控(专线)");
    $('.currstyle').css({
        'margin-top': '55px',
        'margin-right': '30px'
    })
    $('.handleDate').css('margin-left','100px')
} else {
    $('#title1').text("场景化流程监控(移网)");
    $('#Lnav_text').text("场景化流程监控(移网)");
    $('.currstyle').css({
        'margin-top': '120px',
        'margin-right': '40px'
    })
    $('.handleDate').css('margin-left','')
    $('#productTypeBox').removeClass('hide')
}
// 业务类型样式-取值
$('#businessTypeValue li').click(function(event){
    event.preventDefault();
    productCode = ''
   if($(this).attr('data-value') == 'all') {
       $(this).addClass('searched').siblings('li').removeClass('searched')
        productCodeArr.length = 0
        productCodeArr.push('all')
    }else {
       $('#businessTypeValue li').eq(0).removeClass('searched')
       if(productCodeArr.indexOf('all') == -1){
           if($(this).hasClass('searched')){
               $(this).removeClass('searched')
               productCodeArr.splice($.inArray($(this).attr('data-value'),productCodeArr),1)
           }else{
               $(this).addClass('searched')
               productCodeArr.push($(this).attr('data-value'))
           }
       }else {
           $(this).addClass('searched')
           productCodeArr.push($(this).attr('data-value'))
           productCodeArr.splice($.inArray('all',productCodeArr),1)
       }
   }
   // console.log(productCodeArr)
   if (productCodeArr.length == 1 && productCodeArr[0] == 'all'){
       productCode = '771,800507,189,800768,123,900100,900600'
   }else {
       productCode = productCodeArr.join(",");
   }
    console.log(productCode)
})

//初始化Ai数据
var statics_inscene = [];
statics_inscene[0] = {workFlag: 25, aCountscene: 0, bCountscene: 0},
statics_inscene[1] = {workFlag: 26, aCountscene: 0, bCountscene: 0},
statics_inscene[2] = {workFlag: 27, aCountscene: 0, bCountscene: 0},
statics_inscene[3] = {workFlag: 28, aCountscene: 0, bCountscene: 0},
statics_inscene[4] = {workFlag: 29, aCountscene: 0, bCountscene: 0},
statics_inscene[5] = {workFlag: 30, aCountscene: 0, bCountscene: 0},
statics_inscene[6] = {workFlag: 31, aCountscene: 0, bCountscene: 0},
statics_inscene[7] = {workFlag: 35, aCountscene: 0, bCountscene: 0},
statics_inscene[8] = {workFlag: 37, aCountscene: 0, bCountscene: 0},
statics_inscene[9] = {workFlag: 38, aCountscene: 0, bCountscene: 0},
statics_inscene[10] = {workFlag: 39, aCountscene: 0, bCountscene: 0};
statics_inscene[11] = {workFlag: 40, aCountscene: 0, bCountscene: 0};
statics_inscene[12] = {workFlag: 41, aCountscene: 0, bCountscene: 0},
statics_inscene[13] = {workFlag: 42, aCountscene: 0, bCountscene: 0},
statics_inscene[14] = {workFlag: 43, aCountscene: 0, bCountscene: 0};
statics_inscene[15] = {workFlag: 44, aCountscene: 0, bCountscene: 0};
statics_inscene[16] = {workFlag: 36, aCountscene: 0, bCountscene: 0};
// 32 一级中台回退审单
statics_inscene[26] = {workFlag: 32, aCountscene: 0, bCountscene: 0},
// 33
statics_inscene[28] = {workFlag: 33, aCountscene: 0, bCountscene: 0},
//新加
statics_inscene[17] = {workFlag: 45, aCountscene: 0, bCountscene: 0},
statics_inscene[18] = {workFlag: 46, aCountscene: 0, bCountscene: 0},
statics_inscene[19] = {workFlag: 47, aCountscene: 0, bCountscene: 0};
statics_inscene[20] = {workFlag: 48, aCountscene: 0, bCountscene: 0};
statics_inscene[21] = {workFlag: 49, aCountscene: 0, bCountscene: 0},
statics_inscene[22] = {workFlag: 50, aCountscene: 0, bCountscene: 0},
statics_inscene[23] = {workFlag: 51, aCountscene: 0, bCountscene: 0};
statics_inscene[24] = {workFlag: 52, aCountscene: 0, bCountscene: 0};
statics_inscene[25] = {workFlag: 53, aCountscene: 0, bCountscene: 0};
statics_inscene[27] = {workFlag: 54, aCountscene: 0, bCountscene: 0};

var imagqb = '../../images/sg/1.png';
var imagqtsc = '../../images/sg/nav2.png';

var imagst = '../../images/sg/st.png';
var imag2I = '../../images/sg/wt.png';
var imagwt = '../../images/sg/2I.png';
var imagqt = '../../images/sg/qt.png';

var imagwys = '../../images/sg/wys.png';
var imagdsf = '../../images/sg/dsf.png';
//新增
var imagywsl = '../../images/sg/ywsl.png';
var str = '';
var str1 = '';
var scenehtml = $("#scene");

//分类口径
var caliberVal = $('#caliber li.searched').attr('value');

var dispDependenciesObj = {};

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

    // 初始化时间
    var d=new Date();
    var dataTimeyear=d.getFullYear();
    var dataTimemonth=dateChanger(d.getMonth()+1);
    var dataTimeday=dateChanger(d.getDate());
    $('#startDate').val(dataTimeyear+'-'+dataTimemonth+'-'+dataTimeday);
    $('#endDate').val(dataTimeyear+'-'+dataTimemonth+'-'+dataTimeday);

    // 模拟点击查询按钮
    $('#searchBtn').click();
});

//属地销售线具体分公司逻辑处理(市区部门)
$(document).on("change","#dependenciessq",function(){
    setGridSelectBox($('#dependenciessq option:selected').val())
})
//属地销售线具体分公司逻辑处理(近郊部门)
$(document).on("change","#dependenciesjj",function(){
    setGridSelectBox($('#dependenciesjj option:selected').val())
})
//属地销售线具体分公司逻辑处理(远郊部门)
$(document).on("change","#dependenciesyj",function(){
    setGridSelectBox($('#dependenciesyj option:selected').val())
})
//属地销售线具体分公司逻辑处理(部门中心)
$(document).on("change","#dependencieszx",function(){
    setGridSelectBox($('#dependencieszx option:selected').val())
})

var pointArr = [];
function setGridSelectBox(areaCode) {
    $.ajax({
        type : "POST",
        url : getOutUrl(getRootPath_web(), "/reportdetail/getpoint?areaCode="+areaCode),
        async:true,
        data : {"areaCode":areaCode},
        dataType : 'json',
        success:function(res){
            // if (areaCode == '') return;

            if (res.rows < 1) {
                layer.msg('未查询到相关交付点！', {
                    time: 2000 //2s后自动关闭
                });
            }
            pointArr = res.rows;
        },
        error:function(res){
            console.log(res) ;
            layer.msg('未查询到相关交付点！', {
                time: 2000 //2s后自动关闭
            });
        }
    });
}

$(document).ready(function() {
    $('#pointNameList').hide();
    //输入框 联想搜索下拉提示
    var result=new Array();
    $('#pointName').keyup(function(event){
        $('#pointNameList li').remove();
        if($.trim($('#pointName').val())!=''){  //当输入框的值不为空的时候才能发送请求
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

            for (var i = 0; i < pointArr.length; i++) {
                if (pointArr[i].pointName.indexOf($.trim($('#pointName').val())) != -1) {
                    $('#pointNameList').append('<li style="height:20px;" data-id="'+pointArr[i].pointId+'">'+pointArr[i].pointName+'</li>');//添加 li
                }
            }
            $('#pointNameList').show();
            $("#pointNameList li").each(function() {
                $(this).click(function(){
                    pointId = $(this).attr('data-id');
                    $('#pointName').val($(this).text());//写入input
                    $('#pointNameList li').remove();//添加完成关闭 li
                    $('#pointNameList').hide();
                });
            });

        }else{
            $('#pointNameList').html('') ;   //如果输入框的词都删除了，把获取的数据结果也清空，因为已经获取到数据了，即使阻止再次发送请求也不会把已经获得的数据清除，所以这里直接用了最简单的办法，直接清空数据
            $('#pointNameList').hide();
            pointId = '';
        };
    });

    // 取得所属分公司的权限并展现销售线列表
    queryReportPermission();
    if(reportPermission == "all"){
        getAllPoint("");
    } else if(reportPermission != null && reportPermission != "" && reportPermission != undefined) {
        getAllPoint(reportPermission);
    }else {
        getAllPoint('');
    }
});

//销售线逻辑处理
$(document).on("change","#selectBranch",function(){
    $("#pointName").val('');
    $("#pointNameList").hide();
    console.log($("#selectBranch").val());
    if ($("#selectBranch").val()=="未选择") {
        getAllPoint('');
    }
    switch ($('#selectBranch option:selected').val()) {
        case '市区':
            $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
            dispDependenciesObj = $('#dependenciessq');
            break;
        case '近郊':
            $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
            dispDependenciesObj = $('#dependenciesjj');
            break;
        case '远郊':
            $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
            dispDependenciesObj = $('#dependenciesyj');
            break;
        case '部门中心':
            $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
            dispDependenciesObj = $('#dependencieszx');
            break;
        default:
            $('#dependenciessq').addClass('developItem');
            $('#dependenciesjj').addClass('developItem');
            $('#dependencieszx').addClass('developItem');
            $('#dependenciesyj').addClass('developItem');
            dispDependenciesObj = {};
            break;
    }
})

//查询按钮点击事件
$('#searchBtn').click(function() {
    if(typeStr == 2){

    }else {
        /*  if(flagProductType==true){
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
    }

    if (typeStr == 2) { // 2:专线 all:移网

    } else {
        if ($('#selectBranch').find("option:selected").val() == '') {
            // layer.msg('请选择销售线！', {
            //     time: 2000 //2s后自动关闭
            // });
            // return;
        } else {
            switch ($('#selectBranch option:selected').val()) {
                case '市区':
                    if ($('#dependenciessq option:selected').val() == '') {
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '近郊':
                    if ($('#dependenciesjj option:selected').val() == '') {
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '远郊':
                    if ($('#dependenciesyj option:selected').val() == '') {
                        layer.msg('请选择部门中心！', {
                            time: 2000 //2s后自动关闭
                        });
                        return;
                    }
                    break;
                case '部门中心':
                    if ($('#dependencieszx option:selected').val() == '') {
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
    if (typeStr == 2) { // 2:专线 all:移网
    } else {
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

        if (pointId == '' && $.trim($("#pointName").val()) != '') {
            for (var i = 0; i < pointArr.length; i++) {
                if (pointArr[i].pointName == $.trim($('#pointName').val())) {
                    pointId = pointArr[i].pointId;
                    break;
                }
            }
        }
    }

    // pointName = $("#pointName").val();
    startDate = $("#startDate").val();
    endDate = $("#endDate").val();

    firstReresh(areaCode, pointId, startDate, endDate);

});

/*首次进入时页面交互 实时表*/
function firstReresh(areaCode, pointId, startDate, endDate) {
    var url
    if (typeStr == '2') {       //2:专线 all:移网
        reportKey = reportKeybusinessDev;
        var  data = {
                "startDate":startDate,
                "endDate":endDate,
                "reportKey":reportKey,
                "userParam":decodeURI(locHref),
                "pointType":pointId,
                "areaCode":areaCode,
                "tradeSource": tradeSourcescene,
                "productCode": productCode
            }
        url =   getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey
            +"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref+"&tradeSource="+tradeSourcescene+"&productCode="+productCode)

    } else {
        reportKey = reportKeySceneArea;
        url =   getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey
            +"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref+"&tradeSource="+tradeSourcescene+"&productCode="+productCode
            +"&firstLevel="+firstLevel
            +"&secondLevel="+secondLevel
            +"&threeLevel="+threeLevel
        )
        var  data = {
            "startDate":startDate,
            "endDate":endDate,
            "reportKey":reportKey,
            "userParam":decodeURI(locHref),
            "pointType":pointId,
            "areaCode":areaCode,
            "tradeSource": tradeSourcescene,
            "productCode": productCode,
            "firstLevel": firstLevel,
            "secondLevel": secondLevel,
            "threeLevel": threeLevel
        }
    }

    //存储传入参数到配置表
    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        dataType: 'json',
        url : url,
        data : data,
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
                getReportState(reportKey,reportId,areaCode,pointId,startDate,endDate);
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
function getReportState(reportKey,reportId,areaCode,pointId,startDate,endDate){
    var url
    if (typeStr == '2') {       //2:专线 all:移网
        reportKey = reportKeybusinessDev;
        var  data = {
            "startDate":startDate,
            "endDate":endDate,
            "reportId":reportId,
            "reportKey":reportKey,
            "userParam":decodeURI(locHref),
            "pointType":pointId,
            "areaCode":areaCode,
            "productCode": productCode
        }
        url =   getOutUrl(getRootPath_web(), "/reportdetail/find?startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&productCode="+productCode
            +"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref)
    } else {
        reportKey = reportKeySceneArea;
        url =    getOutUrl(getRootPath_web(), "/reportdetail/find?startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&productCode="+productCode
            +"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref
            +"&firstLevel="+firstLevel
            +"&secondLevel="+secondLevel
            +"&threeLevel="+threeLevel
        )
        var  data = {
            "startDate":startDate,
            "endDate":endDate,
            "reportId":reportId,
            "reportKey":reportKey,
            "userParam":decodeURI(locHref),
            "pointType":pointId,
            "areaCode":areaCode,
            "productCode": productCode,
            "firstLevel": firstLevel,
            "secondLevel": secondLevel,
            "threeLevel": threeLevel
        }
    }
    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        dataType: 'json',
        url :url,
        data :data,
        error : function(){
            console.error("出现异常");
        },
        success : function(data){
            if(data.state=="1" && data.rows[0].flag=='2'){
                //去除弹窗层
                $("#fakeLoader").remove();
                scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
            }else{
                //继续调用定时任务
                setTimeout("getReportState(reportKey,reportId,areaCode,pointId,startDate,endDate)",2000);
            }
        }
    });
}

// 取得所属分公司的权限
function queryReportPermission(){

    if (typeStr == 2) { // 专线
        reportKey = reportKeybusinessDev;
    } else {  // 移网
        reportKey = reportKeySceneArea;
    }

    $.ajax({
        type: 'get', //测试get，正式post
        cache: false,
        async: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/getauth?userParam="+locHref+"&reportKey="+reportKey),
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
                $('#dependenciessq').empty();
                $('#dependenciesjj').empty();
                $('#dependencieszx').empty();
                $('#dependenciesyj').empty();
                switch (reportPermission) {
                    //市区
                    case '225':
                        $('#selectBranch').append('<option value="市区">市区</option>');
                        $('#dependenciessq').append('<option value="225">二区</option>');
                        $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '226':
                        $('#selectBranch').append('<option value="市区">市区</option>');
                        $('#dependenciessq').append('<option value="226">三区</option>');
                        $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '211':
                        $('#selectBranch').append('<option value="市区">市区</option>');
                        $('#dependenciessq').append('<option value="211">四区</option>');
                        $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '212':
                        $('#selectBranch').append('<option value="市区">市区</option>');
                        $('#dependenciessq').append('<option value="212">五区</option>');
                        $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '213':
                        $('#selectBranch').append('<option value="市区">市区</option>');
                        $('#dependenciessq').append('<option value="213">七区</option>');
                        $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '214':
                        $('#selectBranch').append('<option value="市区">市区</option>');
                        $('#dependenciessq').append('<option value="214">八区</option>');
                        $('#dependenciessq').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    //近郊
                    case '217':
                        $('#selectBranch').append('<option value="近郊">近郊</option>');
                        $('#dependenciesjj').append('<option value="217">通州</option>');
                        $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '219':
                        $('#selectBranch').append('<option value="近郊">近郊</option>');
                        $('#dependenciesjj').append('<option value="219">昌平</option>');
                        $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '220':
                        $('#selectBranch').append('<option value="近郊">近郊</option>');
                        $('#dependenciesjj').append('<option value="220">大兴</option>');
                        $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '218':
                        $('#selectBranch').append('<option value="近郊">近郊</option>');
                        $('#dependenciesjj').append('<option value="218">顺义</option>');
                        $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '216':
                        $('#selectBranch').append('<option value="近郊">近郊</option>');
                        $('#dependenciesjj').append('<option value="216">房山</option>');
                        $('#dependenciesjj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    // 远郊
                    case '223':
                        $('#selectBranch').append('<option value="远郊">远郊</option>');
                        $('#dependenciesyj').append('<option value="223">密云</option>');
                        $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '221':
                        $('#selectBranch').append('<option value="远郊">远郊</option>');
                        $('#dependenciesyj').append('<option value="221">怀柔</option>');
                        $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '215':
                        $('#selectBranch').append('<option value="远郊">远郊</option>');
                        $('#dependenciesyj').append('<option value="215">门头沟</option>');
                        $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '222':
                        $('#selectBranch').append('<option value="远郊">远郊</option>');
                        $('#dependenciesyj').append('<option value="222">平谷</option>');
                        $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '224':
                        $('#selectBranch').append('<option value="远郊">远郊</option>');
                        $('#dependenciesyj').append('<option value="224">延庆</option>');
                        $('#dependenciesyj').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    // 部门中心
                    case '227':
                        $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                        $('#dependencieszx').append('<option value="227">重通局</option>');
                        $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '11a0al':
                        $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                        $('#dependencieszx').append('<option value="11a0al">中台</option>');
                        $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '11a01s':
                        $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                        $('#dependencieszx').append('<option value="11a01s">渠道中心</option>');
                        $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case 'dkhzx':
                        $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                        $('#dependencieszx').append('<option value="dkhzx">大客户中心</option>');
                        $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '11a01q':
                        $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                        $('#dependencieszx').append('<option value="11a01q">客服中心</option>');
                        $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    case '11a08x':
                        $('#selectBranch').append('<option value="部门中心">部门中心</option>');
                        $('#dependencieszx').append('<option value="11a08x">其他</option>');
                        $('#dependencieszx').removeClass('developItem').siblings().addClass('developItem');
                        break;
                    default:
                }
                setGridSelectBox(reportPermission);
            }
        }
    });
}

//查询交付点,默认查询全部
function getAllPoint(reportPermission) {
    areaCode = '';
    pointArr = [];
    setGridSelectBox(reportPermission);
    $('#pointNameList li').remove();//先清空之前记录
    for (var i = 0; i < pointArr.length; i++) {
        if (pointArr[i].pointName.indexOf($.trim($('#pointName').val())) != -1) {
            $('#pointNameList').append('<li style="height:20px;" data-id="'+pointArr[i].pointId+'">'+pointArr[i].pointName+'</li>');//添加 li
        }
    }
    console.log(pointArr);
}

function scene(workCatalog, prodCatalog, tradeSourcescene, developerArea1, dateType, onlineType, userParam1,sceneMonitorCount, reportKey,reportId,pointId,startDate,endDate) {

    var userParam = "";
    var developerArea = "";
    var num=-1; //默认选中全部销售线
    if("0"==sceneMonitorCount){ //如果是第一次进入
        var id;
        var queryValues = queryPermissionIndex("2");
        if(onlineType=="1"){
            id="liabilityState11scene";
            num =$.inArray(queryValues,developArr1 );
        }else {
            id="liabilityStates1scene";
            num =$.inArray(queryValues,developArr1 );
        }
        if(num!=-1){
            developerArea1=queryValues;
            $("#"+id+"").val(queryValues);
            $("#"+id+"").attr("disabled","disabled");
        }
    }

    var data = {
        workCatalog: typeStr,   //集团商城      strtype  展示流程图类型
        prodCatalog: prodCatalog,   //手厅、网厅 2I、2C
        tradeSource: tradeSourcescene,  //tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
        // areaName: developerArea1,    //公司
        areaName:areaCode,
        dateType: dateType, //日期
        onlineType: onlineType,    //属地 发展
        userParam: decodeURI(locHref),
        timestamp: Date.parse(new Date()),
        reportKey:reportKey ,
        reportId:reportId,
        pointType:pointId,
        startDate:startDate,
        endDate:endDate,
        productCode:productCode

    };
    $.ajax({
        type: "get",// 测试 GET 生产POST
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey="+reportKey+"&reportId="+reportId+"&areaCode="+areaCode
            +"&pointType="+pointId+"&startDate="+startDate+"&endDate="+endDate+"&developerArea="+developerArea1
            +"&timestamp="+Date.parse(new Date())+"&dateType="+dateType+"&userParam="+locHref+"&productCode="+productCode),
        async: true,
        dataType: 'json',
        data: data,
        success: function (res) {
            var picS = res.rows;
            for (var i = 0; i < statics_inscene.length; i++) {
                statics_inscene[i].aCountscene = 0;
                statics_inscene[i].bCountscene = 0;
            }
            for (var i = 0; i < statics_inscene.length; i++) {
                var num = 0;
                for (var j = 0; j < picS.length; j++) {
                    if (statics_inscene[i].workFlag == picS[j].work_flag) {
                        num++;
                        statics_inscene[i].aCountscene = statics_inscene[i].aCountscene + parseInt(picS[j].a_count);
                        statics_inscene[i].bCountscene = statics_inscene[i].bCountscene + parseInt(picS[j].b_count);
                    }
                }
            }
            var aCountscene = statics_inscene[0].aCountscene;
            var aCountscene1 = statics_inscene[1].aCountscene;
            var aCountscene2 = statics_inscene[2].aCountscene;
            var aCountscene3 = statics_inscene[3].aCountscene;
            var aCountscene4 = statics_inscene[4].aCountscene;
            var aCountscene5 = statics_inscene[5].aCountscene;
            var aCountscene6 = statics_inscene[6].aCountscene;
            var aCountscene7 = statics_inscene[7].aCountscene;
            var aCountscene8 = statics_inscene[8].aCountscene;
            var aCountscene9 = statics_inscene[9].aCountscene;
            var aCountscene10 = statics_inscene[10].aCountscene;
            var aCountscene11 = statics_inscene[11].aCountscene;
            var aCountscene12 = statics_inscene[12].aCountscene;
            var aCountscene13 = statics_inscene[13].aCountscene;
            var aCountscene14 = statics_inscene[14].aCountscene;
            var aCountscene15 = statics_inscene[15].aCountscene;
            var aCountscene16 = statics_inscene[16].aCountscene;
            var aCountscene26 = statics_inscene[26].aCountscene;
            var aCountscene28 = statics_inscene[28].aCountscene;

            //新加
            var aCountscene17 = statics_inscene[17].aCountscene;
            var aCountscene18 = statics_inscene[18].aCountscene;
            var aCountscene19 = statics_inscene[19].aCountscene;
            var aCountscene20 = statics_inscene[20].aCountscene;
            var aCountscene21 = statics_inscene[21].aCountscene;
            var aCountscene22 = statics_inscene[22].aCountscene;
            var aCountscene23 = statics_inscene[23].aCountscene;
            var aCountscene24 = statics_inscene[24].aCountscene;
            var aCountscene25 = statics_inscene[25].aCountscene;
            var aCountscene27 = statics_inscene[27].aCountscene;


            var bCountscene = statics_inscene[0].bCountscene;
            var bCountscene1 = statics_inscene[1].bCountscene;
            var bCountscene2 = statics_inscene[2].bCountscene;
            var bCountscene3 = statics_inscene[3].bCountscene;
            var bCountscene4 = statics_inscene[4].bCountscene;
            var bCountscene5 = statics_inscene[5].bCountscene;
            var bCountscene6 = statics_inscene[6].bCountscene;
            var bCountscene7 = statics_inscene[7].bCountscene;
            var bCountscene8 = statics_inscene[8].bCountscene;
            var bCountscene9 = statics_inscene[9].bCountscene;
            var bCountscene10 = statics_inscene[10].bCountscene;
            var bCountscene11 = statics_inscene[11].bCountscene;
            var bCountscene12 = statics_inscene[12].bCountscene;
            var bCountscene13 = statics_inscene[13].bCountscene;
            var bCountscene14 = statics_inscene[14].bCountscene;
            var bCountscene15 = statics_inscene[15].bCountscene;
            var bCountscene16 = statics_inscene[16].bCountscene;
            var bCountscene26 = statics_inscene[26].bCountscene;
            var bCountscene28 = statics_inscene[28].bCountscene;
            //新加
            var bCountscene17 = statics_inscene[17].bCountscene;
            var bCountscene18 = statics_inscene[18].bCountscene;
            var bCountscene19 = statics_inscene[19].bCountscene;
            var bCountscene20 = statics_inscene[20].bCountscene;
            var bCountscene21 = statics_inscene[21].bCountscene;
            var bCountscene22 = statics_inscene[22].bCountscene;
            var bCountscene23 = statics_inscene[23].bCountscene;
            var bCountscene24 = statics_inscene[24].bCountscene;
            var bCountscene25 = statics_inscene[25].bCountscene;
            var bCountscene27 = statics_inscene[27].bCountscene;

            //第一列
            var imag25 = '../../images/sg/25.png';
            var imag36 = '../../images/sg/36.png';
            var imag32 = '../../images/sg/32.png';
            //第二列
            var imag27 = '../../images/sg/27.png';
            var imag42 = '../../images/sg/42.png';
            var imag35 = '../../images/sg/35.png'
            var imag26 = '../../images/sg/26.png';
            //第三列
            var imag37 = '../../images/sg/37.png';
            var imag38 = '../../images/sg/38.png';
            var imag39 = '../../images/sg/39.png';
            var imag40 = '../../images/sg/40.png';
            var imag43 = '../../images/sg/43.png';
            var imag28 = '../../images/sg/28.png';
            //第四列
            var imag41 = '../../images/sg/41.png';
            var imag29 = '../../images/sg/29.png';
            var imag33 = '../../images/sg/33.png';

            //新增
            var imag45 = '../../images/sg/45.png';
            var imag46 = '../../images/sg/46.png';
            var imag47 = '../../images/sg/47.png';
            var imag48 = '../../images/sg/48.png';
            var imag49 = '../../images/sg/49.png';
            var imag50 = '../../images/sg/50.png';
            var imag51 = '../../images/sg/51.png';
            var imag52 = '../../images/sg/52.png';
            var imag53 = '../../images/sg/53.png';
            var imag54 = '../../images/sg/54.png';


            //第五列
            var imagjhl = '../../images/sg/jhl.png';
            var imagtdl = '../../images/sg/tdl.png';
            //第六列
            var imagscl = '../../images/sg/scl.png';


            var gif26 = '../../images/sg1/26.gif';
            var gif32 = '../../images/sg1/32.gif';
            var gif36 = '../../images/sg1/36.gif';
            var gif42 = '../../images/sg1/42.gif';
            var gif29 = '../../images/sg1/29.gif';
            var gif43 = '../../images/sg1/43.gif';
            var gif27 = '../../images/sg1/27.gif';
            var gif35 = '../../images/sg1/35.gif';
            var gif25 = '../../images/sg1/25.gif';
            var gif37 = '../../images/sg1/37.gif';
            var gif38 = '../../images/sg1/38.gif'
            var gif39 = '../../images/sg1/39.gif';
            var gif40 = '../../images/sg1/40.gif';
            var gif28 = '../../images/sg1/28.gif';
            var gif41 = '../../images/sg1/41.gif';
            var gif33 = '../../images/sg1/33.gif';
            //新增
            var gif45 = '../../images/sg1/45.gif';
            var gif46 = '../../images/sg1/46.gif';
            var gif47 = '../../images/sg1/47.gif';
            var gif48 = '../../images/sg1/48.gif'
            var gif49 = '../../images/sg1/49.gif';
            var gif50 = '../../images/sg1/50.gif';
            var gif51 = '../../images/sg1/51.gif';
            var gif53 = '../../images/sg1/53.gif';
            var gif54 = '../../images/sg1/54.gif';


            var change25 = bCountscene > 0 ? gif25 : imag25;//自动审核及分配
            var change26 = bCountscene1 > 0 ? gif26 : imag26;   //中台人工受理
            var change27 = bCountscene2 > 0 ? gif27 : imag27;//待用户自提
            var change28 = bCountscene3 > 0 ? gif28 : imag28;//物流在途
            var change29 = bCountscene4 > 0 ? gif29 : imag29; //号卡交付待激活
            var change35 = bCountscene7 > 0 ? gif35 : imag35;//自动派单
            var change37 = bCountscene8 > 0 ? gif37 : imag37; //电商人员
            var change38 = bCountscene9 > 0 ? gif38 : imag38; // 营业厅
            var change39 = bCountscene10 > 0 ? gif39 : imag39; // 网格人员
            var change40 = bCountscene11 > 0 ? gif40 : imag40; //物流人员
            var change41 = bCountscene12 > 0 ? gif41 : imag41; //自提待激活
            var change42 = bCountscene13 > 0 ? gif42 : imag42;   //人工派单
            var change43 = bCountscene14 > 0 ? gif43 : imag43; //异地人员
            var change36 = bCountscene16 > 0 ? gif36 : imag36;// 36  退单待审核
            var change32 = bCountscene26 > 0 ? gif32 : imag32;// 32
            var change33 = bCountscene28 > 0 ? gif33 : imag33;// 32
            //新增
            var change45 = bCountscene17 > 0 ? gif45 : imag45;
            var change46 = bCountscene18 > 0 ? gif46 : imag46;
            var change47 = bCountscene19 > 0 ? gif47 : imag47;
            var change48 = bCountscene20 > 0 ? gif48 : imag48;
            var change49 = bCountscene21 > 0 ? gif49 : imag49;
            var change50 = bCountscene22 > 0 ? gif50 : imag50;
            var change51 = bCountscene23 > 0 ? gif51 : imag51;
            var change53 = bCountscene25 > 0 ? gif53 : imag53;
            var change54 = bCountscene27 > 0 ? gif54 : imag54;
            str1 = '<svg height="100%" width="100%" viewBox="-40,-40,1440,520">' +
                '<defs>' +
                '<marker id="scenearrowone" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 '+lv_ie+' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 z" fill="#709ea4" />' +
                '</marker>' +
                '</defs>' +
                //业务受理
                '<image style="cursor: pointer;"   xlink:href="'+imagywsl+'" x="-8" y="120" height="50" width="120" />' +
                //45
                '<line x1="112" y1="145" x2="146" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change45+'" x="156" y="120" height="50" width="120"  data-id="'+statics_inscene[17].workFlag+'"/>' +
                '<text id="A45" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="156" y="116"  data-type="0" data-id="'+statics_inscene[17].workFlag+'">'+aCountscene17+'</text>' +
                '<text id="B45" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="276" y="116" data-type="1" data-id="'+statics_inscene[17].workFlag+'">'+bCountscene17+'</text>' +


                //53
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 180 170  L 180 260   A 45,60 270 0, 0, 226,305" marker-end="url(#scenearrowone)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 416 170  L 416 260   A 45,60 270 0, 1, 356,305" ></path>' +
                '<line x1="416" y1="190" x2="416" y2="180" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<line x1="112" y1="145" x2="146" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change53+'" x="236" y="280" height="50" width="120"  data-id="'+statics_inscene[25].workFlag+'"/>' +
                '<text id="A53" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="236" y="276"  data-type="0" data-id="'+statics_inscene[25].workFlag+'">'+aCountscene25+'</text>' +
                '<text id="B53" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="356" y="276" data-type="1" data-id="'+statics_inscene[25].workFlag+'">'+bCountscene25+'</text>' +
                // 54
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 1104 170  L 1104 260   A 45,60 270 0, 0, 1150,305" marker-end="url(#scenearrowone)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 1340 170  L 1340 260   A 45,60 270 0, 1, 1280,305" ></path>' +
                '<line x1="1340" y1="190" x2="1340" y2="180" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="' + change54 + '" x="1160" y="280" height="50" width="120"  data-id="' + statics_inscene[27].workFlag + '"/>' +
                '<text id="A54" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="1160" y="276"  data-type="0" data-id="' + statics_inscene[27].workFlag + '">' + aCountscene27 + '</text>' +
                '<text id="B54" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="1280" y="276" data-type="1" data-id="' + statics_inscene[27].workFlag + '">' + bCountscene27 + '</text>' +


                //46
                '<line x1="276" y1="145" x2="306" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change46+'" x="316" y="120" height="50" width="120"  data-id="'+statics_inscene[18].workFlag+'"/>' +
                '<text id="A46" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="316" y="116"  data-type="0" data-id="'+statics_inscene[18].workFlag+'">'+aCountscene18+'</text>' +
                '<text id="B46" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="436" y="116" data-type="1" data-id="'+statics_inscene[18].workFlag+'">'+bCountscene18+'</text>' +


                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 486 145  L 486 110   A 45,60 90 0, 1, 530,69" marker-end="url(#scenearrowone)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 486 145  L 486 180   A 45,60 270 0, 0, 530,221" marker-end="url(#scenearrowone)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 710 145  L 710 110   A 45,60 90 0, 0, 660,69" ></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 710 145  L 710 180   A 45,60 270 0, 1,660,221"></path>' +

                //47
                '<line x1="436" y1="145" x2="486" y2="145" stroke="#709ea4"  stroke-width="3"  />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change47+'" x="540" y="44" height="50" width="120"  data-id="'+statics_inscene[19].workFlag+'"/>' +
                '<text id="A47" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="540" y="40"  data-type="0" data-id="'+statics_inscene[19].workFlag+'">'+aCountscene19+'</text>' +
                '<text id="B47" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="660" y="40" data-type="1" data-id="'+statics_inscene[19].workFlag+'">'+bCountscene19+'</text>' +

                //48
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change48+'" x="540" y="196" height="50" width="120"  data-id="'+statics_inscene[20].workFlag+'"/>' +
                '<text id="A48" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="540" y="192"  data-type="0" data-id="'+statics_inscene[20].workFlag+'">'+aCountscene20+'</text>' +
                '<text id="B48" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="660" y="192" data-type="1" data-id="'+statics_inscene[20].workFlag+'">'+bCountscene20+'</text>' +

                //49
                '<line x1="710" y1="145" x2="750" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change49+'" x="760" y="120" height="50" width="120"  data-id="'+statics_inscene[21].workFlag+'"/>' +
                '<text id="A49" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="760" y="116"  data-type="0" data-id="'+statics_inscene[21].workFlag+'">'+aCountscene21+'</text>' +
                '<text id="B49" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="880" y="116" data-type="1" data-id="'+statics_inscene[21].workFlag+'">'+bCountscene21+'</text>' +

                //50
                '<line x1="880" y1="145" x2="910" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change50+'" x="920" y="120" height="50" width="120"  data-id="'+statics_inscene[22].workFlag+'"/>' +
                '<text id="A50" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="920" y="116"  data-type="0" data-id="'+statics_inscene[22].workFlag+'">'+aCountscene22+'</text>' +
                '<text id="B50" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="1040" y="116" data-type="1" data-id="'+statics_inscene[22].workFlag+'">'+bCountscene22+'</text>' +

                //51
                '<line x1="1040" y1="145" x2="1070" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change51+'" x="1080" y="120" height="50" width="120"  data-id="'+statics_inscene[23].workFlag+'"/>' +
                '<text id="A51" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="1080" y="116"  data-type="0" data-id="'+statics_inscene[23].workFlag+'">'+aCountscene23+'</text>' +
                '<text id="B51" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="1200" y="116" data-type="1" data-id="'+statics_inscene[23].workFlag+'">'+bCountscene23+'</text>' +


                //52
                '<line x1="1200" y1="145" x2="1230" y2="145" stroke="#709ea4"  stroke-width="3"  marker-end="url(#scenearrowone)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+imag52+'" x="1240" y="120" height="50" width="120"  data-id="'+statics_inscene[24].workFlag+'"/>' +
                '<text id="A52" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="1240" y="116"  data-type="0" data-id="'+statics_inscene[24].workFlag+'">'+aCountscene24+'</text>' +

                //45
                '<rect id="rA45" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="142" y="131" height="42" width="200"/>' +
                '<text id="tA45" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="162" y="158">正在进行资源安排的工单</text>' +
                '<rect id="rB45" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="262" y="131" height="42" width="230"/>' +
                '<text id="tB45" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="282" y="158">正在进行资源安排的超时工单</text>' +
                //46
                '<rect id="rA46" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="304" y="131" height="42" width="160"/>' +
                '<text id="tA46" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="324" y="158">待资源配置的工单</text>' +
                '<rect id="rB46" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="424" y="131" height="42" width="190"/>' +
                '<text id="tB46" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="444" y="158">待资源配置的超时工单</text>' +
                //47
                '<rect id="rA47" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="526" y="55" height="42" width="160"/>' +
                '<text id="tA47" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="546" y="82">待数据配置的工单</text>' +
                '<rect id="rB47" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="646" y="55" height="42" width="190"/>' +
                '<text id="tB47" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="666" y="82">待数据配置的超时工单</text>' +
                //48
                '<rect id="rA48" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="526" y="207" height="42" width="160"/>' +
                '<text id="tA48" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="546" y="234">待外线施工的工单</text>' +
                '<rect id="rB48" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="646" y="207" height="42" width="190"/>' +
                '<text id="tB48" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="666" y="234">待外线施工的超时工单</text>' +
                //49
                '<rect id="rA49" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="746" y="131" height="42" width="160"/>' +
                '<text id="tA49" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="766" y="158">待主调测试的工单</text>' +
                '<rect id="rB49" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="866" y="131" height="42" width="190"/>' +
                '<text id="tB49" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="886" y="158">待主调测试的超时工单</text>' +

                //50
                '<rect id="rA50" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="906" y="131" height="42" width="160"/>' +
                '<text id="tA50" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="926" y="158">待电路报竣的工单</text>' +
                '<rect id="rB50" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1026" y="131" height="42" width="190"/>' +
                '<text id="tB50" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1046" y="158">待电路报竣的超时工单</text>' +

                //51
                '<rect id="rA51" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1076" y="131" height="42" width="160"/>' +
                '<text id="tA51" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1096" y="158">待业务报竣的工单</text>' +
                '<rect id="rB51" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1196" y="131" height="42" width="190"/>' +
                '<text id="tB51" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1216" y="158">待业务报竣的超时工单</text>' +

                //52
                '<rect id="rA52" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1226" y="131" height="42" width="140"/>' +
                '<text id="tA52" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1246" y="158">已起租的订单</text>' +

                //53
                '<rect id="rA53" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="222" y="291" height="42" width="160"/>' +
                '<text id="tA53" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="242" y="318">待资源建设的工单</text>' +
                '<rect id="rB53" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="342" y="291" height="42" width="190"/>' +
                '<text id="tB53" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="362" y="318">待资源建设的超时工单</text>' +
                //54
                '<rect id="rA54" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1176" y="291" height="42" width="180"/>' +
                '<text id="tA54" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1196" y="318">已报竣，未起租的订单</text>' +
                '<rect id="rB54" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1184" y="291" height="42" width="210"/>' +
                '<text id="tB54" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1204" y="318">已报竣，未起租的超时订单</text>' +

                //31
                '<rect class="" style="fill:rgb(52,84,143);" rx="6" ry="6" x="-20" y="380" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="390">工单总量</text>' +
                '<rect class="" style="fill:rgb(207,65,32);" rx="6" ry="6" x="-20" y="400" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="410">超时工单量</text>'
            '</svg>';


            str = '<svg height="100%" width="100%" viewBox="-40,-80,1440,520">' +
                '<defs>' +
                '<marker id="scenearrow" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 '+lv_ie+' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 z" fill="#709ea4" />' +
                '</marker>' +
                '</defs>' +

                '<rect x="-24" y="0" rx="20" ry="20" width="160" height="364" stroke-dasharray="2 2" style="stroke:#709ea4; fill: #fff; stroke-width:2; fill-opacity:0.1; stroke-opacity:0.9"/>' +
                '<image style="cursor: pointer;"  class="wys" xlink:href="'+imagqb+'" x="-8" y="18" height="40" width="130" id="quanbu"   data-id=" "/>' +
                '<image style="cursor: pointer;"  class="wys" xlink:href="'+imagqtsc+'" x="-8" y="65" height="40" width="130"  id="qtsc"/>' +
                //tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
                '<image style="cursor: pointer;" class="wys" xlink:href="'+imagst+'" x="16" y="112" height="30" width="90" data-type="2C"  id="MOBILE"/>' +
                '<image style="cursor: pointer;" class="wys" xlink:href="'+imagwt+'" x="16" y="149" height="30" width="90"  id="2I"/>' +
                '<image style="cursor: pointer;" class="wys" xlink:href="'+imag2I+'" x="16" y="186" height="30" width="90" data-type="2C" id="EMAL"/>' +
                '<image style="cursor: pointer;" class="wys" xlink:href="'+imagqt+'" x="16" y="223" height="30" width="90" data-type="2C" id="OTHER"/>' +

                '<image style="cursor: pointer;" class="wys" xlink:href="'+imagwys+'" x="-8" y="260" height="40" width="130" id="wys"  data-id=" "/>' +
                '<image style="cursor: pointer;" class="wys" xlink:href="'+imagdsf+'" x="-8" y="307" height="40" width="130" id="dsf"   data-id=" "/>' +
                //25
                '<rect x="150" y="107" rx="20" ry="20" width="150" height="257" stroke-dasharray="2 2" style="stroke:#709ea4; fill: #fff; stroke-width:2; fill-opacity:0.1; stroke-opacity:0.9"/>' +
                /*'<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="316" y="161">上门交付</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="328" y="182">订单</text>' +*/
                '<line x1="136" y1="167" x2="162" y2="167" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change25+'" x="162" y="142" height="50" width="120"  data-id="'+statics_inscene[0].workFlag+'"/>' +
                '<text id="A25" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="170" y="136"  data-type="0" data-id="'+statics_inscene[0].workFlag+'">'+aCountscene+'</text>' +
                '<text id="B25" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="284" y="136" data-type="1" data-id="'+statics_inscene[0].workFlag+'">'+bCountscene+'</text>' +
                // 32
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change32+'" x="162" y="222" height="50" width="120"  data-id="'+statics_inscene[26].workFlag+'"/>' +
                '<text id="A32" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="170" y="216"  data-type="0" data-id="'+statics_inscene[26].workFlag+'">'+aCountscene26+'</text>' +
                '<text id="B32" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="284" y="216" data-type="1" data-id="'+statics_inscene[26].workFlag+'">'+bCountscene26+'</text>' +
                //36
                '<image style="cursor: pointer;"  class="imgsscene" xlink:href="'+change36+'" x="162" y="297" height="50" width="120"  data-id="'+statics_inscene[16].workFlag+'"/>' +
                '<text id="A36" class="aCountscene" style="font-size:14px;fill:#34548f ;cursor: pointer; font-weight: 700;";" x="170" y="293"  data-type="0" data-id="'+statics_inscene[16].workFlag+'">'+aCountscene16+'</text>' +
                /*'<text id="B36" class="bCountscene" style="font-size:14px;fill:#cf4120;cursor: pointer; font-weight: 700; text-anchor: end" x="284" y="216" data-type="1" data-id="'+statics_inscene[16].workFlag+'">'+bCountscene16+'</text>' +*/


              /*  '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 315 167  L 315 37   A 45,60 90 0, 1, 362,-5" marker-end="url(#scenearrow)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 315 167  L 315 340  A 45,45 270 0, 0, 362,375" marker-end="url(#scenearrow)"></path>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="48">订</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="61">单</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="74">自</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="87">提</text>' +


                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="245">物</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="256">流</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="269">配</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="282">送</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="295">订</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="323" y="308">单</text>' +*/

                //27
                '<line x1="282" y1="167" x2="361" y2="167" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
               /* '<image style ="cursor: pointer;" class="imgsscene" xlink:href="'+change27+'"   x="372" y="-30" height="50" width="120" data-id="'+statics_inscene[2].workFlag+'"/>' +
                '<text id="A27" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="370" y="-36"  data-type="0" data-id="'+statics_inscene[2].workFlag+'">'+aCountscene2+'</text>' +
                '<text id="B27" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="492" y="-36"  data-type="1" data-id="'+statics_inscene[2].workFlag+'">'+bCountscene2+'</text>' +
                */
                //35
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change35+'" x="372" y="142" height="50" width="120" data-id="'+statics_inscene[7].workFlag+'"/>' +
                '<text id="A35" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="370" y="136"  data-type="0" data-id="'+statics_inscene[7].workFlag+'">'+aCountscene7+'</text>' +
                '<text id="B35" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="492" y="136"  data-type="1" data-id="'+statics_inscene[7].workFlag+'">'+bCountscene7+'</text>' +
                '<line x1="432" y1="202" x2="432" y2="234" stroke="#709ea4" stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<line x1="432" y1="246" x2="432" y2="202" stroke="#709ea4" stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="410" y="202">派</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="410" y="215">单</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="410" y="228">异</text>' +
                '<text class="Count" style="font-size:12px;font-family:microsoft yahei;fill:#000000;" x="410" y="241">常</text>' +
                //42
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change42+'"  x="372" y="244" height="50" width="120" data-id="'+statics_inscene[13].workFlag+'"/>' +
                '<text id="A42" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="370" y="238"  data-type="0" data-id="'+statics_inscene[13].workFlag+'">'+aCountscene13+'</text>' +
                '<text id="B42" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="492" y="238"  data-type="1" data-id="'+statics_inscene[13].workFlag+'">'+bCountscene13+'</text>' +

                //26
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change26+'"   x="372" y="350" height="50" width="120" data-id="'+statics_inscene[1].workFlag+'"/>' +
                '<text id="A26" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="370" y="344"  data-type="0" data-id="'+statics_inscene[1].workFlag+'">'+aCountscene1+'</text>' +
                '<text id="B26" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="492" y="344"  data-type="1" data-id="'+statics_inscene[1].workFlag+'">'+bCountscene1+'</text>' +
                '<line x1="432" y1="294" x2="432" y2="340" stroke="#709ea4" stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 560 167  L 560 20    A 45,60 90 0, 1, 616,-28" marker-end="url(#scenearrow)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 560 167  L 560 254   A 45,60 270 0, 0, 616,297" marker-end="url(#scenearrow)"></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 808 167  L 808 20    A 45,60 90 0, 0, 746,-28" ></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 808 167  L 808 254   A 45,60 270 0, 1,746,297"></path>' +
                //37
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change37+'" x="626" y="12" height="50" width="120" data-id="'+statics_inscene[8].workFlag+'"/>' +
                '<text id="A37" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="598" y="18"  data-type="0" data-id="'+statics_inscene[8].workFlag+'">'+aCountscene8+'</text>' +
                '<text id="B37" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="766" y="18"  data-type="1" data-id="'+statics_inscene[8].workFlag+'">'+bCountscene8+'</text>' +
                '<line x1="560" y1="37" x2="616" y2="37" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<line x1="746" y1="37" x2="808" y2="37" stroke="#709ea4"  stroke-width="3" />' +

                //33  新加
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="' + change33 + '" x="626" y="-53" height="50" width="120" data-id="' + statics_inscene[28].workFlag + '"/>' +
                '<text id="A33" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="598" y="-47"  data-type="0" data-id="' + statics_inscene[28].workFlag + '">' + aCountscene28 + '</text>' +
                '<text id="B33" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="766" y="-47"  data-type="1" data-id="' + statics_inscene[28].workFlag + '">' + bCountscene28 + '</text>' +





                //38
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change38+'" x="626" y="77" height="50" width="120" data-id="'+statics_inscene[9].workFlag+'"/>' +
                '<text id="A38" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="598" y="78"  data-type="0" data-id="'+statics_inscene[9].workFlag+'">'+aCountscene9+'</text>' +
                '<text id="B38" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="770" y="78"  data-type="1" data-id="'+statics_inscene[9].workFlag+'">'+bCountscene9+'</text>' +
                '<line x1="560" y1="102" x2="616" y2="102" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<line x1="746" y1="102" x2="808" y2="102" stroke="#709ea4"  stroke-width="3" />' +
                //39
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change39+'" x="626" y="142" height="50" width="120" data-id="'+statics_inscene[10].workFlag+'"/>' +
                '<text id="A39" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="598" y="143"  data-type="0" data-id="'+statics_inscene[10].workFlag+'">'+aCountscene10+'</text>' +
                '<text id="B39" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="770" y="143"  data-type="1" data-id="'+statics_inscene[10].workFlag+'">'+bCountscene10+'</text>' +
                '<line x1="492" y1="167" x2="616" y2="167" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                //40
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change40+'" x="626" y="207" height="50" width="120" data-id="'+statics_inscene[11].workFlag+'"/>' +
                '<text id="A40" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="598" y="208"  data-type="0" data-id="'+statics_inscene[11].workFlag+'">'+aCountscene11+'</text>' +
                '<text id="B40" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="770" y="208"  data-type="1" data-id="'+statics_inscene[11].workFlag+'">'+bCountscene11+'</text>' +
                '<line x1="560" y1="232" x2="616" y2="232" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                '<line x1="746" y1="232" x2="808" y2="232" stroke="#709ea4"  stroke-width="3" />' +
                //43
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change43+'" x="626" y="272" height="50" width="120" data-id="'+statics_inscene[14].workFlag+'"/>' +
                '<text id="A43" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="598" y="273"  data-type="0" data-id="'+statics_inscene[14].workFlag+'">'+aCountscene14+'</text>' +
                '<text id="B43" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="770" y="273"  data-type="1" data-id="'+statics_inscene[14].workFlag+'">'+bCountscene14+'</text>' +
                //28
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change28+'" x="626" y="350" height="50" width="120" data-id="'+statics_inscene[3].workFlag+'"/>' +
                '<text id="A28" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="624" y="344"  data-type="0" data-id="'+statics_inscene[3].workFlag+'">'+aCountscene3+'</text>' +
                '<text id="B28" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="748" y="344"  data-type="1" data-id="'+statics_inscene[3].workFlag+'">'+bCountscene3+'</text>' +
                '<line x1="492" y1="375" x2="616" y2="375" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                //41
                // '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 1060 167  L 1060 37   A 45,60 90 0, 0, 1000,-5" ></path>' +
                '<path stroke-width="3"  fill="none" stroke="#709ea4" stroke-linecap="round"  d="M 1060 167  L 1060 340  A 45,60 270 0, 1,1000,375"></path>' +
                /*'<image style ="cursor: pointer;" class="imgsscene" xlink:href="'+change41+'"   x="880" y="-30" height="50" width="120" data-id="'+statics_inscene[12].workFlag+'"/>' +
                '<text id="A41" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="878" y="-36"  data-type="0" data-id="'+statics_inscene[12].workFlag+'">'+aCountscene12+'</text>' +
                '<text id="B41" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="1002" y="-36"  data-type="1" data-id="'+statics_inscene[12].workFlag+'">'+bCountscene12+'</text>' +
                '<line x1="492" y1="-5" x2="870" y2="-5" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                */
                //29
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+change29+'" x="880" y="350" height="50" width="120" data-id="'+statics_inscene[4].workFlag+'"/>' +
                '<text id="A29" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="878" y="344"  data-type="0" data-id="'+statics_inscene[4].workFlag+'">'+aCountscene4+'</text>' +
                '<text id="B29" class="bCountscene" style="font-size:14px;font-weight: 700; fill:#cf4120;cursor: pointer;text-anchor: end" x="1002" y="344"  data-type="1" data-id="'+statics_inscene[4].workFlag+'">'+bCountscene4+'</text>' +
                '<line x1="746" y1="375" x2="870" y2="375" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +


                //30
                '<rect x="1090" y="107" rx="20" ry="20" width="160" height="190" stroke-dasharray="2 2" style="stroke:#709ea4; fill: #fff; stroke-width:2; fill-opacity:0.1; stroke-opacity:0.9"/>' +
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+imagjhl+'" x="1110" y="142" height="50" width="120" data-id="'+statics_inscene[5].workFlag+'"/>' +
                '<text id="A30" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="1108" y="138"  data-type="0" data-id="'+statics_inscene[5].workFlag+'">'+aCountscene5+'</text>' +
                '<line x1="746" y1="167" x2="1100" y2="167" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +
                //44   14
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+imagtdl+'" x="1110" y="222" height="50" width="120" data-id="'+statics_inscene[15].workFlag+'"/>' +
                '<text id="A44" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="1108" y="216"  data-type="0" data-id="'+statics_inscene[15].workFlag+'">'+aCountscene15+'</text>' +

                //31
                '<image style ="cursor: pointer;" class="imgsscene"  xlink:href="'+imagscl+'" x="1270" y="142" height="50" width="120" data-id="'+statics_inscene[6].workFlag+'"/>' +
                '<text id="A31" class="aCountscene" style="font-size:14px;font-weight: 700; fill:#34548f;cursor: pointer;";" x="1268" y="136"  data-type="0" data-id="'+statics_inscene[6].workFlag+'">'+aCountscene6+'</text>' +
                '<line x1="1230" y1="167" x2="1260" y2="167" stroke="#709ea4"  stroke-width="3" marker-end="url(#scenearrow)" />' +

                //25
                '<rect id="rA25" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="186" y="159" height="42" width="130"/>' +
                '<text id="tA25" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="206" y="186">待审核的订单</text>' +
                '<rect id="rB25" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="260" y="159" height="42" width="205"/>' +
                '<text id="tB25" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="280" y="186">待审核的超时订单（24小时）</text>' +

                //32
                '<rect id="rA32" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="186" y="233" height="42" width="180"/>' +
                '<text id="tA32" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="206" y="260">回退到一级中台的订单</text>' +
                '<rect id="rB32" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="260" y="233" height="42" width="205"/>' +
                '<text id="tB32" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="280" y="260">回退到一级中台的超时订单</text>' +

                //36
                '<rect id="rA36" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="186" y="308" height="42" width="190"/>' +
                '<text id="tA36" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="206" y="335">分公司退单待审核的订单</text>' +
                '<rect id="rB36" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="260" y="233" height="42" width="205"/>' +
                '<text id="tB36" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="280" y="260">待审核的超时订单（24小时）</text>' +


                //26
                '<rect id="rA26" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="384" y="362" height="42" width="130"/>' +
                '<text id="tA26" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="404" y="388">待受理的订单</text>' +
                '<rect id="rB26" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="454" y="362" height="42" width="205"/>' +
                '<text id="tB26" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="474" y="388">待受理的超时订单（24小时）</text>' +
                //27
                '<rect id="rA27" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="384" y="-19" height="42" width="130"/>' +
                '<text id="tA27" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="404" y="8">待自提的订单</text>' +
                '<rect id="rB27" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="454" y="-19" height="42" width="205"/>' +
                '<text id="tB27" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="474" y="8">待自提的超时订单（3天）</text>' +

                //35
                '<rect id="rA35" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="384" y="153" height="42" width="170"/>' +
                '<text id="tA35" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="404" y="180">待中台派单的意向单</text>' +
                '<rect id="rB35" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="454" y="153" height="42" width="270"/>' +
                '<text id="tB35" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="474" y="180">待中台派单的超时意向单（24小时）</text>' +
                //42
                '<rect id="rA42" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="384" y="255" height="42" width="200"/>' +
                '<text id="tA42" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="404" y="282">待物流中台派单的意向单</text>' +
                '<rect id="rB42" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="454" y="255" height="42" width="290"/>' +
                '<text id="tB42" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="474" y="282">待物流中台派单的超时意向单（24小时）</text>' +


                //37
                '<rect id="rA37" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="35" height="42" width="190"/>' +
                '<text id="tA37" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="62">待电商人员交付的订单</text>' +
                '<rect id="rB37" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="35" height="42" width="280"/>' +
                '<text id="tB37" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="62">待电商人员交付的超时订单（48小时）</text>' +
                //33
                '<rect id="rA33" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="-30" height="42" width="190"/>' +
                '<text id="tA33" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="-3">营业厅及传统自提订单</text>' +
                '<rect id="rB33" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="-30" height="42" width="220"/>' +
                '<text id="tB33" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="-3">营业厅及传统自提的超时订单</text>' +




                //38
                '<rect id="rA38" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="103" height="42" width="190"/>' +
                '<text id="tA38" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="130">待营业厅人员交付的订单</text>' +
                '<rect id="rB38" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="103" height="42" width="280"/>' +
                '<text id="tB38" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="130">待营业厅人员交付的超时订单（48小时）</text>' +
                //39
                '<rect id="rA39" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="170" height="42" width="190"/>' +
                '<text id="tA39" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="197">待网格人员交付的订单</text>' +
                '<rect id="rB39" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="170" height="42" width="280"/>' +
                '<text id="tB39" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="197">待网格人员交付的超时订单（48小时）</text>' +
                //40
                '<rect id="rA40" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="235" height="42" width="150"/>' +
                '<text id="tA40" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="262">待物流交付的订单</text>' +
                '<rect id="rB40" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="235" height="42" width="240"/>' +
                '<text id="tB40" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="262">待物流交付的超时订单（48小时）</text>' +
                //43
                '<rect id="rA43" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="298" height="42" width="200"/>' +
                '<text id="tA43" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="325">待异地人员交付的订单</text>' +
                '<rect id="rB43" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="298" height="42" width="290"/>' +
                '<text id="tB43" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="325">待异地人员交付的超时订单（48小时）</text>' +
                //28
                '<rect id="rA28" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="612" y="361" height="42" width="130"/>' +
                '<text id="tA28" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="632" y="388">待配送的订单</text>' +
                '<rect id="rB28" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="732" y="361" height="42" width="220"/>' +
                '<text id="tB28" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="752" y="388">待配送的超时订单（5天）</text>' +


                //41
                '<rect id="rA41" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="892" y="-19" height="42" width="200"/>' +
                '<text id="tA41" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="912" y="8">用户自提完成未激活的订单</text>' +
                '<rect id="rB41" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="968" y="-19" height="42" width="280"/>' +
                '<text id="tB41" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="988" y="8">用户自提完成未激活的超时订单（15天）</text>' +
                //29
                '<rect id="rA29" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="892" y="361" height="42" width="130"/>' +
                '<text id="tA29" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="912" y="388">待激活的订单</text>' +
                '<rect id="rB29" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="968" y="361" height="42" width="200"/>' +
                '<text id="tB29" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="988" y="388">待激活的超时订单（15天）</text>' +

                //30
                '<rect id="rA30" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1122" y="153" height="42" width="140"/>' +
                '<text id="tA30" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1142" y="180">已激活的订单</text>' +
                //44
                '<rect id="rA44" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1122" y="233" height="42" width="140"/>' +
                '<text id="tA44" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1142" y="260">已退单的订单</text>' +

                //31
                '<rect id="rA31" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="1262" y="153" height="42" width="140"/>' +
                '<text id="tA31" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="1282" y="180">已首充的订单</text>' +

                '<rect class="" style="fill:rgb(52,84,143);" rx="6" ry="6" x="-20" y="380" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="390">工单总量</text>' +
                '<rect class="" style="fill:rgb(207,65,32);" rx="6" ry="6" x="-20" y="400" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="410">超时工单量</text>'
            '</svg>';

            if (typeStr == '2') {
                scenehtml.html(str1);
                // titlescene1();
            } else {
                scenehtml.html(str);
                // titlescene()
            }
            imageIframescene();
            //textIframe_inscene();
            //textIframe_in1scene();

        },
        error: function () {

        }
    })
}
//初始化导航
var workCatalogscene = '';
var prodCatalogscene = '';
var tradeSourcescene = '';
var developerAreascene = '';
var dateTypescene = '2';    // dateType: 0,1,2 : 日,月,累计
var onlineTypescene = '1';
var type = '';
var dateType = ''
var strtype = ''
var businessType = 'all' //业务类型
if (typeStr == 2) {
    strtype = str1
    $('#searchInfo').addClass('hide').removeClass('show')
    $('#sysCodeInfo').addClass('hide').removeClass('show')
    $('#grid').addClass('hide').removeClass('show')
    $('#businessType').addClass('show').removeClass('hide')
}else {
    strtype = str
    $('#searchInfo').addClass('show').removeClass('hide')
    $('#sysCodeInfo').addClass('show').removeClass('hide')
    $('#grid').addClass('show').removeClass('hide')
    $('#businessType').addClass('hide').removeClass('show')
}
//全部
$(document).on("click", "#quanbu", function () {
    // prodCatalogscene = ''
    // tradeSourcescene = 'all'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // //developerAreascene = sessionStorage.getItem("developerAreascene");
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // console.log("dateTypescene :" + dateTypescene );
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    imagqb = '../../images/sg2/1.png'
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // developerAreascene = areaCode;

    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = '';
})
//集团商城
$(document).on("click", "#qtsc", function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg2/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = ''
    // tradeSourcescene = 'GROUP'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // developerAreascene = areaCode;
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = 'GROUP';
})
// wo易售 ：WO
$(document).on("click", "#wys", function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg2/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = ''
    // tradeSourcescene = 'WO'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // //developerAreascene = sessionStorage.getItem("developerAreascene");
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // developerAreascene = areaCode;
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = 'WO';
})
// 第三方：THIRD
$(document).on("click", "#dsf", function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg2/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = ''
    // tradeSourcescene = 'THIRD'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // //developerAreascene = sessionStorage.getItem("developerAreascene");
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // developerAreascene = areaCode;
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = 'THIRD';
})
//tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
$(document).on("click", "#EMAL", function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg2/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = '2C'
    // tradeSourcescene = 'EMAL'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // //developerAreascene = sessionStorage.getItem("developerAreascene");
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // developerAreascene = areaCode;
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = 'EMAL';
})
$(document).on("click", '#MOBILE', function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg2/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = '2C'
    // tradeSourcescene = 'MOBILE'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // developerAreascene = areaCode;
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = 'MOBILE';
})
$(document).on("click", '#OTHER', function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg/2I.png';
    imagqt = '../../images/sg2/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = '2C'
    // tradeSourcescene = 'OTHER'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // developerAreascene = areaCode;
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = 'OTHER';
})
$(document).on("click", '#2I', function () {
    imagqb = '../../images/sg/1.png';
    imagqtsc = '../../images/sg/nav2.png';
    imagst = '../../images/sg/st.png';
    imag2I = '../../images/sg/wt.png';
    imagwt = '../../images/sg2/2I.png';
    imagqt = '../../images/sg/qt.png';
    imagwys = '../../images/sg/wys.png';
    imagdsf = '../../images/sg/dsf.png';
    $('#quanbu').attr("xlink:href", imagqb);
    $('#qtsc').attr("xlink:href", imagqtsc);
    $('#MOBILE').attr("xlink:href", imagst);
    $('#EMAL').attr("xlink:href", imag2I);
    $('#2I').attr("xlink:href", imagwt);
    $('#OTHER').attr("xlink:href", imagqt);
    $('#wys').attr("xlink:href", imagwys);
    $('#dsf').attr("xlink:href", imagdsf);
    // prodCatalogscene = '2I'
    // tradeSourcescene = '2I'
    // sessionStorage.setItem("prodCatalogscene", prodCatalogscene);
    // sessionStorage.setItem("tradeSourcescene", tradeSourcescene);
    // developerAreascene = areaCode;
    // // dateTypescene = sessionStorage.getItem("dateTypescene");
    // onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, locHref,"2",reportKey,reportId,pointId,startDate,endDate);
    tradeSourcescene = '2I';
})

//图片弹框
function imageIframescene() {
    $(document).on("click", '.imgsscene', function () {

        var idscene = $(this).attr('data-id');
        developerAreascene = areaCode;
        prodCatalogscene = sessionStorage.getItem("prodCatalogscene");
        // tradeSourcescene = sessionStorage.getItem("tradeSourcescene");
        // dateTypescene = sessionStorage.getItem("dateTypescene");
        onlineTypescene = sessionStorage.getItem("onlineTypescene");
        $('#chart_exportscene').attr('data-tableid', idscene);
        $('#chart_exportscene').attr('data-developerAreascene', developerAreascene);
        $('#chart_exportscene').attr('data-prodCatalogscene', prodCatalogscene);
        $('#chart_exportscene').attr('data-tradeSourcescene', tradeSourcescene);
        $('#chart_exportscene').attr('data-dateTypescene', dateTypescene);
        $('#chart_exportscene').attr('data-onlineTypescene', onlineTypescene);

        $('#chart_exportscene').attr('data-startDate', startDate);
        $('#chart_exportscene').attr('data-endDate', endDate);
        $('#chart_exportscene').attr('data-reportId', reportId);
        $('#chart_exportscene').attr('data-reportKey', reportKey);
        $('#chart_exportscene').attr('data-areaCode', areaCode);
        $('#chart_exportscene').attr('data-pointType', pointId);
        table_chartscene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, idscene,reportId, reportKey, startDate, endDate, pointId);

        var url = ''
        if ( typeStr == '2') {
            url = getOutUrl(getRootPath_web(), '/reportdetail/finddate?&workFlag='+idscene+"&time="+Date.parse(new Date())
                +"&dateType="+dateTypescene+"&startDate="+startDate+"&endDate="+endDate
                +"&reportId="+reportId+"&reportKey="+reportKey+"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref);
        } else {
            url = getOutUrl(getRootPath_web(), "/reportdetail/finddate?from=6&workFlag="+idscene+'&developerArea='+developerAreascene
                +'&workCatalog=0'+'&tradeSource='+tradeSourcescene+'&onlineType='+onlineTypescene+"&time="+Date.parse(new Date())+"&dateType="+dateTypescene
                +"&startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey+"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref);
            $('#myModal_chartscene').modal('show');
        }
        var data = {
            workFlag: idscene, // 额外添加的参
            workCatalog: workCatalogscene,   //集团商城
            prodCatalog: prodCatalogscene,   //手厅、网厅 2I、2C
            tradeSource: tradeSourcescene,  //tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
            areaName: developerAreascene,    //公司
            dateType: dateTypescene, //日期
            onlineType: onlineTypescene,    //属地 发展
            time: Date.parse(new Date()),
            userParam: decodeURI(locHref),
            from: 6,
            reportId:reportId,
            reportKey:reportKey,
            startDate:startDate,
            endDate:endDate,
            pointType:pointId
        };
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: data,
            success: function (data) {
                var arr_rows = data.rows;
                console.log(data.rows)
                var numA = [];
                var numB = [];

                var numX = ["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云","怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","中\n台","渠\n道\n中\n心","大\n客\n户\n中\n心","客\n服\n中\n心","其\n他"];
                var numXCodeArr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","227","11a0al","11a01s","dkhzx","11a01q","11a08x"];

                var aCountSum = 0;
                for (var i = 0; i <  arr_rows.length; i++) {
                    if (globalIdscene == arr_rows[i].work_flag) {
                        aCountSum += parseInt(arr_rows[i].a_count);
                    }
                }

                var bCountSum = 0;
                for (var i = 0; i <  arr_rows.length; i++) {
                    if (globalIdscene == arr_rows[i].work_flag) {
                        bCountSum += parseInt(arr_rows[i].b_count);
                    }
                }

                for(var i = 0; i < numXCodeArr.length; i++){
                    var itemA = 0;
                    var itemB = 0;
                    for(var j = 0; j < arr_rows.length; j++) {
                        if (globalIdscene == arr_rows[j].work_flag && arr_rows[j].area_name == numXCodeArr[i]) {
                            itemA = arr_rows[j].a_count;
                            itemB = arr_rows[j].b_count;
                            break;
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
                $('#timeFlagscene').text("更新日期:"+time);
                setTimeout(function () {
                    chartscene(numX, numA, numB)
                }, 100)
            },
            error: function () {

            }
        });

    })
    //}
}
$('.aCountscene').css('font-family', '微软雅黑');
$(document).on("click", '.aCountscene', function () {
    console.log(this);
    var typescene = $(this).attr('data-type');
    var idscene = $(this).attr('data-id');
    developerAreascene = areaCode;
    prodCatalogscene = sessionStorage.getItem("prodCatalogscene");
    // tradeSourcescene = sessionStorage.getItem("tradeSourcescene");
    // dateTypescene = sessionStorage.getItem("dateTypescene");
    onlineTypescene = sessionStorage.getItem("onlineTypescene");
    console.log(developerAreascene)

    $('#table_exportscenea').attr('data-tableid', idscene);
    $('#table_exportscenea').attr('data-type', typescene);
    $('#table_exportscenea').attr('data-developerAreascene', developerAreascene);
    $('#table_exportscenea').attr('data-prodCatalogscene', prodCatalogscene);
    $('#table_exportscenea').attr('data-tradeSourcescene', tradeSourcescene);
    $('#table_exportscenea').attr('data-dateTypescene', dateTypescene);
    $('#table_exportscenea').attr('data-onlineTypescene', onlineTypescene);

    $('#table_exportscenea').attr('data-startDate', startDate);
    $('#table_exportscenea').attr('data-endDate', endDate);
    $('#table_exportscenea').attr('data-reportId', reportId);
    $('#table_exportscenea').attr('data-reportKey', reportKey);
    $('#table_exportscenea').attr('data-areaCode', areaCode);
    $('#table_exportscenea').attr('data-pointType', pointId);

    //新加
    $('#table_exporscenetd').attr('data-tableid', idscene)
    $('#table_exporscenetd').attr('data-type', typescene);
    $('#table_exporscenetd').attr('data-dateTypescene', dateTypescene);

    $('#table_exporscenetd').attr('data-startDate', startDate);
    $('#table_exporscenetd').attr('data-endDate', endDate);
    $('#table_exporscenetd').attr('data-reportId', reportId);
    $('#table_exporscenetd').attr('data-reportKey', reportKey);
    $('#table_exporscenetd').attr('data-areaCode', areaCode);
    $('#table_exporscenetd').attr('data-pointType', pointId);

    if (typeStr == '2') {
        $('#myModal_table_dscene').modal('show')
        table_ascene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, idscene, typescene,reportId, reportKey, startDate, endDate, pointId);

    } else {
        $('#myModal_table_ascene').modal('show')
        table_ascene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, idscene, typescene,reportId, reportKey, startDate, endDate, pointId);
    }
    return false;
});
$(document).on("mouseover", '.aCountscene', function () {
    var nub = $(this).attr('id');
    $("#r"+nub).css("display", "block");
    $("#t"+nub).css("display", "block");
});
$(document).on("mouseout", '.aCountscene', function () {
    var nub = $(this).attr('id');
    $("#r"+nub).css("display", "none");
    $("#t"+nub).css("display", "none");
});

$('.bCountscene').css('font-family', '微软雅黑');
$(document).on("click", '.bCountscene', function () {
    var typescene = $(this).attr('data-type');
    var idscene = $(this).attr('data-id');
    developerAreascene = areaCode;
    prodCatalogscene = sessionStorage.getItem("prodCatalogscene");
    // tradeSourcescene = sessionStorage.getItem("tradeSourcescene");
    // dateTypescene = sessionStorage.getItem("dateTypescene");
    onlineTypescene = sessionStorage.getItem("onlineTypescene");
    // console.log(developerAreascene)
    $('#table_exporscenetb').attr('data-tableid', idscene);
    $('#table_exporscenetb').attr('data-type', typescene);
    $('#table_exporscenetb').attr('data-developerAreascene', developerAreascene);
    $('#table_exporscenetb').attr('data-prodCatalogscene', prodCatalogscene);
    $('#table_exporscenetb').attr('data-tradeSourcescene', tradeSourcescene);
    $('#table_exporscenetb').attr('data-dateTypescene', dateTypescene);
    $('#table_exporscenetb').attr('data-onlineTypescene', onlineTypescene);

    $('#table_exporscenetb').attr('data-startDate', startDate);
    $('#table_exporscenetb').attr('data-endDate', endDate);
    $('#table_exporscenetb').attr('data-reportId', reportId);
    $('#table_exporscenetb').attr('data-reportKey', reportKey);
    $('#table_exporscenetb').attr('data-areaCode', areaCode);
    $('#table_exporscenetb').attr('data-pointType', pointId);

    //新加
    $('#table_exporscenetd').attr('data-tableid', idscene)
    $('#table_exporscenetd').attr('data-type', typescene);
    $('#table_exporscenetd').attr('data-dateTypescene', dateTypescene);

    $('#table_exporscenetd').attr('data-startDate', startDate);
    $('#table_exporscenetd').attr('data-endDate', endDate);
    $('#table_exporscenetd').attr('data-reportId', reportId);
    $('#table_exporscenetd').attr('data-reportKey', reportKey);
    $('#table_exporscenetd').attr('data-areaCode', areaCode);
    $('#table_exporscenetd').attr('data-pointType', pointId);

    // if ($('#liabilityState1_outscene option:selected').val() == '2') {
    if (typeStr == '2') {
        $('#myModal_table_dscene').modal('show')


    } else {
        $('#myModal_table_bscene').modal('show')
    }
    table_bscene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, idscene, typescene, reportId, reportKey, startDate, endDate, pointId);
});
$(document).on("mouseover", '.bCountscene', function () {
    var nub = $(this).attr('id');
    $("#r"+nub).css("display", "block");
    $("#t"+nub).css("display", "block");
});
$(document).on("mouseout", '.bCountscene', function () {
    var nub = $(this).attr('id');
    $("#r"+nub).css("display", "none");
    $("#t"+nub).css("display", "none");
});
//a表格数据
function table_ascene(workCatalog, prodCatalog, tradeSourcescene, developerArea1, dateType, onlineType, id, type, reportId, reportKey, startDate, endDate, pointId) {

    $(".table_ascene").bootstrapTable('destroy')
    var url = ''
    if (typeStr == '2') {
        url = getOutUrl(getRootPath_web(), '/sceneMonitor/querySubDetail?workFlag='+id+'&type='+type
            +"&dateType="+dateType
            +"&productCode="+productCode
            +"&time="+Date.parse(new Date())
            +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref);
    } else {
        url = getOutUrl(getRootPath_web(), "/sceneMonitor/queryFlowDetail?prodCatalog="+prodCatalog+'&workFlag='+id
            +'&type='+type+'&tradeSource='+tradeSourcescene+'&areaName='+developerArea1+"&onlineType="+onlineType+"&time="+Date.parse(new Date())
            +"&dateType="+dateType
            +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref);
    }
    $('.table_ascene').bootstrapTable({
        url: url,
        /*height: 300,*/
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                sort: params.sort, // 要排序的字段
                sortOrder: params.order, // 排序规则
                secondLevel:encodeURIComponent(secondLevel)
            }
        },
        responseHandler: function (res) {
            console.log(res)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            for (var i = 0; i < res.rows.length; i++) {   //订单号加跳转链接
                res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId="+res.rows[i].bssSubscribeId+"' target='_blank'>"+res.rows[i].bssSubscribeId+"</a>";
                // res.rows[i].bssSubscribeId = res.rows[i].bssSubscribeId;
                res.rows[i].workinstid = "<a class='workinstid' data-bssSubscribeId='res.rows[i].bssSubscribeId' id='workinstid' target='_blank'>"+res.rows[i].workinstid+"</a>";
                console.log("   "+document.getElementById("workinstid"))
                var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                if (warnName[res.rows[i].warnLevel] != undefined) {
                    //    console.log(11111)
                    res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                } else {
                    res.rows[i].warnLevelName = "";
                }
                if (res.rows[i].prodInfo) {
                    if(res.rows[i].prodInfo.length > 0){
                        var secondLevel = res.rows[i].prodInfo[0].second_level;
                        for(var a = 1; a < res.rows[i].prodInfo.length;a++){
                            secondLevel +=','+ res.rows[i].prodInfo[a].second_level;
                        }
                        res.rows[i].secondLevel = secondLevel;
                    }
                }
            }
            obj.rows = res.rows;
            return obj;
        }
    });
}
//b获取表格数据
function table_bscene(workCatalog, prodCatalog, tradeSourcescene, developerArea1, dateType, onlineType, id, type,reportId, reportKey, startDate, endDate, pointId) {
    $(".table_bscene").bootstrapTable('destroy')
    var url = ''
    if (typeStr == '2') {
        url = getOutUrl(getRootPath_web(), '/sceneMonitor/querySubDetail?&workFlag='+id+'&type='+type+"&time="+Date.parse(new Date())
            +"&dateType="+dateType
            +"&productCode="+productCode
            +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref);

        $("#table_dscene").bootstrapTable('destroy')
        $('#table_dscene').bootstrapTable({
            url: url,
            /*height: 300,*/
            dataType: 'json',
            method: "post",
            contentType: "application/x-www-form-urlencoded",
            queryParams: "queryParams",
            sortable: true,                     //是否启用排序
            sortOrder: "desc",
            pagination: false,
            sidePagination: "server",
            pageSize: "10",
            pageList: "[5, 10, 20, 50 ]",
            showRefresh: false,
            showToggle: false,
            showPaginationSwitch: false,
            showColumns: false,
            search: false,
            searchAlign: "left",
            // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
            queryParams: function (params) {
                return {
                    sort: params.sort, // 要排序的字段
                    sortOrder: params.order, // 排序规则
                    // workFlag: id, // 额外添加的参数
                    // type:type,
                    // workCatalog:workCatalog,   //集团商城
                    // prodCatalog:prodCatalog,   //手厅、网厅 2I、2C
                    // tradeSource:tradeSourcescene,  //tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
                    // areaName:developerArea1,    //公司
                    // dateType:dateType , //日期
                    // onlineType:onlineType,    //属地 发展
                    // time:Date.parse(new Date()),
                    // userParam:locHref,
                }
            },
            responseHandler: function (res) {
                console.log(res)
                //console.log(res.data.jobInsts)
                var obj = {
                    total: 0,
                    rows: []
                };
                obj.total = res.rows.length;
                for (var i = 0; i < res.rows.length; i++) {   //订单号加跳转链接
                    res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    // res.rows[i].bssSubscribeId = res.rows[i].bssSubscribeId;
                    res.rows[i].workinstid = "<a class='workinstid' data-bssSubscribeId='res.rows[i].bssSubscribeId' id='workinstid' target='_blank'>" + res.rows[i].workinstid + "</a>";
                    console.log("   " + document.getElementById("workinstid"))
                    var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                    if (warnName[res.rows[i].warnLevel] != undefined) {
                        //    console.log(11111)
                        res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                    } else {
                        res.rows[i].warnLevelName = "";
                    }
                    if (res.rows[i].prodInfo) {
                        if(res.rows[i].prodInfo.length > 0){
                            var secondLevel = res.rows[i].prodInfo[0].second_level;
                            for(var a = 1; a < res.rows[i].prodInfo.length;a++){
                                secondLevel +=','+ res.rows[i].prodInfo[a].second_level;
                            }
                            res.rows[i].secondLevel = secondLevel;
                        }
                    }
                }
                obj.rows = res.rows;
                return obj;

            }
        });


    } else {
        url = getOutUrl(getRootPath_web(), "/sceneMonitor/queryFlowDetail?prodCatalog="+prodCatalog+'&workFlag='+id
            +'&type='+type+'&tradeSource='+tradeSourcescene+'&areaName='+developerArea1+"&onlineType="+onlineType+"&time="+Date.parse(new Date())
            +"&dateType="+dateType
            +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref+"&secondLevel="+secondLevel);

        $('.table_bscene').bootstrapTable({
            url: url,
            dataType: 'json',
            method: "post",
            contentType: "application/x-www-form-urlencoded",
            queryParams: "queryParams",
            sortable: true,                     //是否启用排序
            sortOrder: "desc",
            pagination: false,
            sidePagination: "server",
            pageSize: "10",
            pageList: "[5, 10, 20, 50 ]",
            showRefresh: false,
            showToggle: false,
            showPaginationSwitch: false,
            showColumns: false,
            search: false,
            searchAlign: "left",
            // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
            queryParams: function (params) {
                return {
                    workFlag: id, // 额外添加的参数
                    type: type,
                    workCatalog: workCatalog,   //集团商城
                    prodCatalog: prodCatalog,   //手厅、网厅 2I、2C
                    tradeSource: tradeSourcescene,  //tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
                    areaName: developerArea1,    //公司
                    dateType: dateType, //日期
                    onlineType: onlineType,    //属地 发展
                    time: Date.parse(new Date()),
                    userParam: decodeURI(locHref),
                    reportId:reportId,
                    reportKey:reportKey,
                    startDate:startDate,
                    endDate:endDate,
                    pointType:pointId,
                    secondLevel:encodeURIComponent(secondLevel)
                }
            },
            responseHandler: function (res) {
                console.log(res)
                //console.log(res.data.jobInsts)
                var obj = {
                    total: 0,
                    rows: []
                };
                obj.total = res.rows.length;
                for (var i = 0; i < res.rows.length; i++) {  //订单号加跳转链接
                    res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId="+res.rows[i].bssSubscribeId+"' target='_blank'>"+res.rows[i].bssSubscribeId+"</a>";
                    // res.rows[i].bssSubscribeId = res.rows[i].bssSubscribeId;
                    res.rows[i].workinstid = "<a class='workinstid' data-bssSubscribeId='res.rows[i].bssSubscribeId' id='workinstid' target='_blank'>"+res.rows[i].workinstid+"</a>";
                    var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                    if (warnName[res.rows[i].warnLevel] != undefined) {
                        res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                    } else {
                        res.rows[i].warnLevelName = "";
                    }
                }
                obj.rows = res.rows;
                return obj;

            }

        });
    }

}
// 场景化监控--专线--工单号弹框
$(document).on('click', '#workinstid', function () {
    $('#myModal_table_Inst').modal('show');
    var workinstid = $(this).html();
    $.ajax({
        type: 'get',
        url:  '/queryCenter/sceneMonitor/queryInstDetail',
        dataType: 'json',
        data: {"workinstid": workinstid},
        cache: false,
        success: function (data){
            $("#createdate").html(data.createdate);
            $("#jobstate").html(data.jobstate);
            $("#jobname").html(data.jobname);
            $("#limitdate").html(data.limitdate);
        },
    });
});

//筛选时间报表: 图标表格
function table_chartscene(workCatalog, prodCatalog, tradeSourcescene, developerArea1, dateType, onlineType, id,reportId, reportKey, startDate, endDate, pointId) {

    globalIdscene = id;
    $("#table_chartscene").bootstrapTable('destroy')
    var url = ''
    if (typeStr == '2') {
        url = getOutUrl(getRootPath_web(), "/reportdetail/finddate?workFlag="+id
            +"&type="+type+"&dateType="+dateType+"&startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey
            +"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref);
    } else {
        url = getOutUrl(getRootPath_web(), "/reportdetail/finddate?from=6&workFlag="+id+"&workCatalog="+ workCatalog
            +"&developerArea="+developerArea1+"&tradeSource="+tradeSourcescene+"&onlineType="+onlineType
            +"&time="+Date.parse(new Date())+"&dateType="+dateType+"&startDate="+startDate+"&endDate="+endDate+"&reportId="+reportId+"&reportKey="+reportKey
            +"&areaCode="+areaCode+"&pointType="+pointId+"&userParam="+locHref);
    }
    $('#table_chartscene').bootstrapTable({
        url: url,
        height: 400,
        dataType: 'json',
        method: "post",
        cache: false,
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                workFlag: id, // 额外添加的参数
                workCatalog: workCatalog,   //集团商城
                prodCatalog: prodCatalog,   //手厅、网厅 2I、2C
                tradeSource: tradeSourcescene,  //tradeSource 网厅：EMAL；手厅：MOBILE；其他：OTHER
                areaName: developerArea1,    //公司
                dateType: dateType, //日期
                onlineType: onlineType,    //属地 发展
                time: Date.parse(new Date()),
                userParam: decodeURI(locHref),
                from: 6,
                reportId:reportId,
                reportKey:reportKey,
                startDate:startDate,
                endDate:endDate,
                pointType:pointId
            }
        },
        responseHandler: function(res) {
            console.log(res)
            //console.log(res.rows)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;

            var numX = ["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云","怀柔","门头沟","平谷","延庆","重通局","中台","渠道中心","大客户中心","客服中心","其他","合计"];
            var numXCodeArr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","227","11a0al","11a01s","dkhzx","11a01q","11a08x","9999"];

            obj.rows = res.rows;

            var newRows = [];
            var aCountSum = 0;
            for (var i = 0; i <  obj.rows.length-1; i++) {
                if (globalIdscene == obj.rows[i].work_flag) {
                    aCountSum += parseInt(obj.rows[i].a_count);
                }
            }

            var bCountSum = 0;
            for (var i = 0; i <  obj.rows.length-1; i++) {
                if (globalIdscene == obj.rows[i].work_flag) {
                    bCountSum += parseInt(obj.rows[i].b_count);
                }
            }

            for(var i = 0; i < numXCodeArr.length; i++){
                var newRow = {};
                newRow.developerAreaName = numX[i];
                if (i == numXCodeArr.length - 1) {  //合计
                    newRow.a_count = aCountSum;
                    newRow.b_count = bCountSum;
                    if (aCountSum == 0) {
                        newRow.time_out = '100%';     // 计算超时占比
                    } else {
                        newRow.time_out = (bCountSum / aCountSum * 100).toFixed(2) + '%';     // 计算超时占比
                    }
                    newRows.push(newRow);
                    break;
                }
                newRow.a_count = 0;
                newRow.b_count = 0;
                newRow.time_out = (0).toFixed(2) + '%';
                for(var j = 0; j < obj.rows.length; j++) {
                    if (globalIdscene == obj.rows[j].work_flag && obj.rows[j].area_name == numXCodeArr[i]) {
                        newRow.a_count = obj.rows[j].a_count;
                        newRow.b_count = obj.rows[j].b_count;
                        // 计算超时占比
                        newRow.time_out = (obj.rows[j].b_count / aCountSum * 100).toFixed(2) + '%';
                        break;
                    }
                }
                newRows.push(newRow);
            }

            obj.rows = newRows;
            console.log(obj.rows)
            return obj;

        },
        onLoadSuccess: function () {
            $('#table_chart tr td').css('text-align', 'right')
            $('#table_chart tr  td:first-child').css('text-align', 'left')
        },
    });
}
//发送短信
function actionFormatterscene(value, row, index) {
    //console.log(row)
    //已发送短信
    if (row.sendStatus == '1') {
        var e = '<buttton  style="background-color: #998ed0; color: #ffffff; padding:2px 5px; border-radius: 5px; cursor:pointer; text-align: center; display: inline-block; width: 60px;" id='+row.orderNum+'>已发送</buttton> '
    }
    //没有发送短信
    else {
        var e = '<buttton  style="background-color: #998ed0; color: #ffffff; padding:2px 5px; border-radius: 5px; cursor:pointer; text-align: center; display: inline-block; width: 60px;" id='+row.orderNum+' onclick="editscene(\''+row.orderNum+'\',\''+row.workFlag+'\',\''+row.warnLevel+'\')">发送短信</buttton> '
    }

    return e
}
function editscene(id, workFlag, warnLevel) {
    console.log($('#'+id).text());
    if ($('#'+id).text() != '已发送' && $('#'+id).text() != '发送失败') {
        $('#warnLevelscene').val(warnLevel);
        $('#orderNumscene').val(id);
        $('#workFlagscene').val(workFlag);
        $('#myModal_table_cscene').modal('show');
        table_cscene(id, workFlag, warnLevel);
    }
}

//c获取表格数据
function table_cscene(id, workFlag, warnLevel) {
    $("#table_cscene").bootstrapTable('destroy')
    $('#table_cscene').bootstrapTable({
        url: getOutUrl(getRootPath_web(), '/monitor/querySmsStaffInfo?warnLevel='+warnLevel+'&workFlag='+workFlag+'&orderNum='+id+"&userParam="+locHref),
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                orderNum: id,   //订单号
                workFlag: workFlag,	//环节id
                warnLevel: warnLevel //告警级别
            }
        },
        responseHandler: function (res) {
            console.log(res);
            var obj = {
                total: 0,
                rows: []
            };
            if (res.state == "0") {

            } else {
                obj.total = res.rows.length;

            }
            $('#table_cscene').bootstrapTable('load', res);
            obj.rows = res.rows;
            return obj;
        }

    });
}

//报表复选框
function stateFormatterscene(value, row, index) {
    if (row.rowstate == "true") {
        return {
            disabled: true,//设置是否可用
            checked: true//设置选中
        };
    } else {
        return {
            checked: false//设置选中
        };
    }
    return "";
}

//点击发送
$('#sendSmsscene').click(function () {
    //获取表格中的选中行，如果没有选中行，return
    var selRows = $('#table_cscene').bootstrapTable("getSelections");
    //人员名称
    var staffName = new Array();
    //电话号码
    var serialNumber = new Array();
    //告警级别
    var warnLevel = $('#warnLevelscene').val();
    //订单编号
    var orderNum = $('#orderNumscene').val();
    //环节
    var workFlag = $('#workFlagscene').val();
    if (selRows.length == 0) {
        //自定义警告框
        alert_bootbox("请选择发送人", "提示", "确定");
        $('div .modal-dialog').children('div:first .modal-content').addClass('pop_style');
    } else {
        $.map(selRows, function (row) {
            staffName.push(row.staffName);
            serialNumber.push(row.serialNumber);
        })
        var data = {
            orderNum: orderNum,
            userParam: decodeURI(locHref),
            warnLevel: warnLevel,
            staffName: staffName,
            workFlag: workFlag,
            serialNumber: serialNumber
        }
        $.ajax({
            type: 'post',
            url: getOutUrl(getRootPath_web(), "/monitor/sendSms?&orderNum="+orderNum+"&userParam="+locHref+"&warnLevel="+warnLevel+"&staffName="+encodeURIComponent(staffName)+"&workFlag="+workFlag+"&serialNumber="+serialNumber),
            dataType: 'json',
            data: data,
            cache: false,
            success: function (data) {
                if (data.state == '1') {
                    $('#'+orderNum).text('已发送')
                    $('#'+orderNum).attr('disabled', true)
                } else {
                    //alert(data.message)
                    $('#'+orderNum).text('发送失败')
                }

            },
            error: function (data) {
                $('#'+orderNum).text('发送失败');
            }
        });
        $('#myModal_table_cscene').modal('hide');
    }
})
// cj弹框关闭
$('#close_btn_chartscene').click(function () {
    $('#myModal_chartscene').modal('hide')
})
$('#close_btnscene').click(function () {
    $('#myModal_table_ascene').modal('hide')
})
$('#close_btn_bscene').click(function () {
    $('#myModal_table_bscene').modal('hide')
})
$('#close_btn_cscene').click(function () {
    $('#myModal_table_cscene').modal('hide')
})
$('#close_myModal_export_scene').click(function () {
    $('#myModal_export_scene').modal('hide')
})
$('#close_btn_dscene').click(function () {
    $('#myModal_table_dscene').modal('hide')
})
$('#close_btn_dscene_a').click(function () {
    $('#myModal_table_Inst').modal('hide')
})
//数据导出
$('#chart_exportscene').click(function () {
    var idscene = $('#chart_exportscene').attr('data-tableid');
    var typescene = $('#chart_exportscene').attr('data-type');
    var developerAreascene = $('#chart_exportscene').attr('data-developerAreascene');
    var prodCatalogscene = $('#chart_exportscene').attr('data-prodCatalogscene');
    // var tradeSourcescene = $('#chart_exportscene').attr('data-tradeSourcescene');
    var dateTypescene = $('#chart_exportscene').attr('data-dateTypescene');
    var onlineTypescene = $('#chart_exportscene').attr('data-onlineTypescene');

    var startDate = $('#chart_exportscene').attr('data-startDate');
    var endDate = $('#chart_exportscene').attr('data-endDate');
    var reportId = $('#chart_exportscene').attr('data-reportId');
    var reportKey = $('#chart_exportscene').attr('data-reportKey');
    var areaCode = $('#chart_exportscene').attr('data-areaCode');
    var pointId = $('#chart_exportscene').attr('data-pointType');

    $.download(getOutUrl(getRootPath_web(), "/reportdetail/exportdetaildata?workCatalog=2&prodCatalog="+prodCatalogscene+'&workFlag='+idscene
        +'&type='+typescene+'&tradeSource='+tradeSourcescene+'&areaName='+developerAreascene
        +"&onlineType="+onlineTypescene+"&timestamp="+Date.parse(new Date())+"&dateType="+dateTypescene
        +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref), 'post')
})
$('#table_exportscenea').click(function () {
    if ($(this).attr('data-tableid') == 30) {
        $('#myModal_export_scene').modal('show')
        var str = ''
        $('#conbtnscene').html('')
        for (i = 0; i < 6; i++) {
            var stratDate = GetDateStr(-parseInt(i+1) * 5)
            var endDate = GetDateStr1(-parseInt(i+1) * 5+5)
            str += '<button class="exportbtn"  data-index='+((i+1) * 5)+' id="exportbtnscenea">'+stratDate+'至'+endDate+'</button>';
        }
        $('#conbtnscene').append(str)
    } else {
        // console.log( $(this).attr('data-tableid'))
        var idscene = $(this).attr('data-tableid');
        var typescene = $(this).attr('data-type');
        var developerAreascene = $(this).attr('data-developerAreascene');
        var prodCatalogscene = $(this).attr('data-prodCatalogscene');
        // var tradeSourcescene = $(this).attr('data-tradeSourcescene');
        var dateTypescene = $(this).attr('data-dateTypescene');
        var onlineTypescene = $(this).attr('data-onlineTypescene');
        var startDate = $(this).attr('data-startDate');
        var endDate = $(this).attr('data-endDate');
        var reportId = $(this).attr('data-reportId');
        var reportKey = $(this).attr('data-reportKey');
        var areaCode = $(this).attr('data-areaCode');
        var pointId = $(this).attr('data-pointType');

        $.download(getOutUrl(getRootPath_web(), "/sceneMonitor/exportFlowDetail?prodCatalog="+prodCatalogscene+'&workFlag='+idscene
            +'&type='+typescene+'&tradeSource='+tradeSourcescene+'&areaName='+developerAreascene
            +"&onlineType="+onlineTypescene+"&timestamp="+Date.parse(new Date())
            +"&dateType="+dateTypescene
            +"&type=0&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref+"&secondLevel="+encodeURIComponent(encodeURIComponent(secondLevel))), 'post');
    }
})
$(document).on('click', '#exportbtnscenea', function () {
    var idscene = $('#table_exportscenea').attr('data-tableid');
    var typescene = $('#table_exportscenea').attr('data-type');
    var developerAreascene = $('#table_exportscenea').attr('data-developerAreascene');
    var prodCatalogscene = $('#table_exportscenea').attr('data-prodCatalogscene');
    // var tradeSourcescene = $('#table_exportscenea').attr('data-tradeSourcescene');
    var dateTypescene = $('#table_exportscenea').attr('data-dateTypescene');
    var onlineTypescene = $('#table_exportscenea').attr('data-onlineTypescene');
    // var stratDate = GetDateStr(-parseInt($(this).attr('data-index')))
    // var endDate = GetDateStr(-parseInt($(this).attr('data-index'))+5)

    var startDate = $(this).attr('data-startDate');
    var endDate = $(this).attr('data-endDate');
    var reportId = $(this).attr('data-reportId');
    var reportKey = $(this).attr('data-reportKey');
    var areaCode = $(this).attr('data-areaCode');
    var pointId = $(this).attr('data-pointType');

    $.download(getOutUrl(getRootPath_web(), "/sceneMonitor/exportFlowDetail?prodCatalog="+prodCatalogscene
        +'&stratDate='+stratDate+'&endDate='+endDate+'&workFlag='+idscene+'&type='+typescene+'&tradeSource='+tradeSourcescene
        +'&areaName='+developerAreascene+"&onlineType="+onlineTypescene+"&timestamp="+Date.parse(new Date())
        +"&dateType="+dateTypescene+"&type=0"
        +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref), 'post');
})
//新加导出
$(document).on('click', '#table_exporscenetd', function () {
    var idscene = $('#table_exporscenetd').attr('data-tableid')
    var typescene = $('#table_exporscenetd').attr('data-type');
    var dateTypescene = $('#table_exporscenetd').attr('data-dateTypescene');

    var startDate = $('#table_exporscenetd').attr('data-startDate');
    var endDate = $('#table_exporscenetd').attr('data-endDate');
    var reportId = $('#table_exporscenetd').attr('data-reportId');
    var reportKey = $('#table_exporscenetd').attr('data-reportKey');
    var areaCode = $('#table_exporscenetd').attr('data-areaCode');
    var pointId = $('#table_exporscenetd').attr('data-pointType');

    $.download(getOutUrl(getRootPath_web(), '/sceneMonitor/exportSubDetail?workFlag='+idscene
        +'&type='+typescene+"&timestamp="+Date.parse(new Date())+"&dateType="+dateTypescene+ +"&productCode="+productCode
        +"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref), 'post');
})
$('#table_exporscenetb').click(function () {
    if ($('#table_exporscenetb').attr('data-tableid') == 30) {
        $('#myModal_export_scene').modal('show')
        var str = ''
        $('#conbtnscene').html('')
        for (i = 0; i < 6; i++) {
            str += '<button class="exportbtn"  data-index='+((i+1) * 5)+' id="exportbtnsceneb">下载'+(i+1)+'</button>';
        }
        $('#conbtnscene').append(str)
    } else {
        var idscene = $('#table_exporscenetb').attr('data-tableid');
        var typescene = $('#table_exporscenetb').attr('data-type');
        var developerAreascene = $('#table_exporscenetb').attr('data-developerAreascene');
        var prodCatalogscene = $('#table_exporscenetb').attr('data-prodCatalogscene');
        // var tradeSourcescene = $('#table_exporscenetb').attr('data-tradeSourcescene');
        var dateTypescene = $('#table_exporscenetb').attr('data-dateTypescene');
        var onlineTypescene = $('#table_exporscenetb').attr('data-onlineTypescene');

        var startDate = $('#table_exporscenetb').attr('data-startDate');
        var endDate = $('#table_exporscenetb').attr('data-endDate');
        var reportId = $('#table_exporscenetb').attr('data-reportId');
        var reportKey = $('#table_exporscenetb').attr('data-reportKey');
        var areaCode = $('#table_exporscenetb').attr('data-areaCode');
        var pointId = $('#table_exporscenetb').attr('data-pointType');

        $.download(getOutUrl(getRootPath_web(), "/sceneMonitor/exportFlowDetail?prodCatalog="+prodCatalogscene+'&workFlag='+idscene+
            '&type='+typescene+'&tradeSource='+tradeSourcescene+'&areaName='+developerAreascene+"&userParam="+locHref
            +"&onlineType="+onlineTypescene+"&timestamp="+Date.parse(new Date())
            +"&dateType="+dateTypescene
            +"&type=1"+"&reportId="+reportId+"&reportKey="+reportKey+"&startDate="+startDate+"&endDate="+endDate+"&pointType="+pointId+"&userParam="+locHref+"&secondLevel="+encodeURIComponent(encodeURIComponent(secondLevel))), 'post')
    }
})
$(document).on('click', '#exportbtnsceneb', function () {
    console.log($(this).attr('data-index'))
    var idscene = $('#table_exporscenetb').attr('data-tableid');
    var typescene = $('#table_exporscenetb').attr('data-type');
    var developerAreascene = $('#table_exporscenetb').attr('data-developerAreascene');
    var prodCatalogscene = $('#table_exporscenetb').attr('data-prodCatalogscene');
    var tradeSourcescene = $('#table_exporscenetb').attr('data-tradeSourcescene');
    var dateTypescene = $('#table_exporscenetb').attr('data-dateTypescene');
    var onlineTypescene = $('#table_exporscenetb').attr('data-onlineTypescene');
    var stratDate = GetDateStr(-parseInt($(this).attr('data-index')))
    var endDate = GetDateStr(-parseInt($(this).attr('data-index'))+5)

})

function chartscene(num1, num2, num3) {
    var bar = echarts.init(document.getElementById('modal_chartscene'));
    var option = {
        tooltip: {
            // trigger: 'axis'
        },
        //backgroundColor: '#eee', // 背景
        color: ['#f39800', '#ea5513'],  // 柱子颜色
        legend: {  // 图例
            show: false,
            /* data: ['访问量', '人数', '平均访问量'],*/
            textStyle: {
                /* color: '#aaaaaa'*/
            },
            right: '15%'
        },
        grid: {  // 可控制图标大小和位置
//           width:'95%',  // 宽 & 高
//           height:'70%',
            width: 'auto',
            height: 'auto',
            top: '20px', // 距离容器顶部
            bottom: '100px',  // X轴位置距离容器底部
            x: '50px',  // 距离容器X方向距离
            borderColor: 'transparent'
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑'
                    },
                    //X轴刻度配置
                    interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                    /*rotate : 30,
                     formatter : function(value, index) {
                         var rt = "";
                         for (var i = 0; i < value.length; i++) {
                             rt += value.substr(i, 1)+"\n";

                         }
                         rt = value;
                         return rt;

                     }*/
                },
                data: num1,
                splitLine: {
                    show: false // 坐标轴grid区域的分割线
                },
                axisTick: {
                    show: false  // X轴刻度线
                },
                axisLine: {
                    show: true, // X轴坐标线
                    lineStyle: {
                        color: '#cfd1d0',
                        width: 1
                    },
                }
            }

        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {    // 轴线
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑'
                    }
                },
//              min: 0,
//		        max: 450,
//		        interval: 50,
                splitLine: {
                    show: 'true',
                    lineStyle: {
                        color: '#cfd1d0',
                        width: 0.5
                    }
                },
                axisTick: {
                    show: false
                },
                splitArea: { // 坐标轴grid区域的分割区域
                    show: false,
                    /* areaStyle: {
                         color: ['#f8dab8']
                     }*/
                },
                axisLine: {
                    show: true, // Y轴坐标线
                    lineStyle: {
                        color: '#cfd1d0',
                        width: 1
                    }
                }
            },

        ],
        series: [
            {
                name: '订单量',
                type: 'bar',
                barGap: 0.2,//柱间距离
                barWidth: 13,  //柱子宽度
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 4    //显示圆角
                    },
                    normal: {
                        barBorderRadius: 4,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
                            offset: 0,
                            color: '#1d85b8'
                        }, {
                            offset: 1,
                            color: '#75d9f0'
                        }]),
                        label: {
                            show: true,      //开启显示
                            position: [-0, -20], //在上方显示
                            textStyle: {     //数值样式
                                color: '#000',
                                fontSize: 8
                            }
                        }

                    },
                },
                data: num2
            },
            {
                name: '超时单量',
                type: 'bar',
                barGap: 0.2,//柱间距离
                barWidth: 13,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 4    //显示圆角
                    },
                    normal: {
                        barBorderRadius: 4,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
                            offset: 0,
                            color: '#f573a1'
                        }, {
                            offset: 1,
                            color: '#fbb18a'
                        }]),
                        label: {
                            show: true,      //开启显示
                            position: [-0, -10],//'top', //在上方显示
                            textStyle: {     //数值样式
                                color: '#000',
                                fontSize: 8
                            }
                        }

                    },
                },
                data: num3
            }
        ]
    };
//每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
    bar.setOption(option);
    setTimeout(function () {
        bar.resize()
    }, 50)
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount+1);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1) < 10 ? "0"+(dd.getMonth()+1) : (dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0"+dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}

function GetDateStr1(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1) < 10 ? "0"+(dd.getMonth()+1) : (dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0"+dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
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