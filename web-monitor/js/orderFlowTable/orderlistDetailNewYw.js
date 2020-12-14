//报表标识  默认属地（orderDetailNewByArea）,发展（orderDetailNewByDevelop）
var reportKey;
var reportKeyByArea;
var reportKeyByDevelop;
var reportName = "orderDetailMobile";
//校验标识
var locHref = getUrlParam("userParam");
//开始时间、结束时间
var startDate;
var activateTime;
var statusDate;
//订单来源
var from = "3,4,5,8";
var inmodeCatalog = "";
//集团商城
var exTradeSource = "";
//业务类型
var businessType = "";
//产品类型
var secondLevel = "";
//产品种类
var prodCatalog = "";
//交付点类型
var pointType = "";
//部门不需要参数
var areaCode = "";
//时间戳
var reportId;
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//历史查询的筛选条件
var condition = JSON.parse(JSON.parse(decodeURI(getUrlParam("condition"))));
//后台返回的前端配置条件
var tableColumns;
/*界面点击进来的展示*/
$(function () {
    // 产品类型一
    function productTypeFn(){
        var options = ''
        var arr = []
        $('#productType3').multiselect({
            header: true,
            height: 175,
            minWidth: 200,
            classes: '',
            checkAllText: '选中全部',
            uncheckAllText: '取消全选',
            noneSelectedText: '',
            selectedText: '# 选中',
            selectedList: 0,
            show: null,
            hide: null,
            autoOpen: false,
            multiple: true,
            position: {},
            appendTo: "body",
            menuWidth:null
        });
        /*var arr = ['all']
        $('#productType').val(arr);*/
        $('#productType3').multiselect("refresh");
        var data={}
        $.ajax({
            type: 'post',
            url : getOutUrl(getRootPath_web(), "/product/findFourLevel?flag=0&userParam="+locHref),
            dataType: 'json',
            data: data,
            cache: false,
            success: function(data) {
                if(data.state=='1'){
                    var arrData =data.rows
                    for (var i=0;i<arrData.length;i++) {
                        options = '<option  checked  value=' +arrData[i].secondLevel+ '>' +arrData[i].secondLevel+ '</option>'
                        $('#productType3').append(options)
                    }
                    $('#productType3').multiselect("refresh");
                    /* $('#productType3').val(arr)
                     $('#productType3').multiselect("refresh");
                     $('#productType_ms > span:nth-child(2)').text('全部产品类型')*/
                }
            }
        });
    }
    productTypeFn();
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
            console.log(data["configInfo"].reportKeyByArea)
            console.log(data["configInfo"].reportKeyByDevelop)
            reportKeyByArea = data["configInfo"].reportKeyByArea;
            reportKeyByDevelop = data["configInfo"].reportKeyByDevelop;
            var conditionArr = data["configInfo"].condition.split(",");
            tableColumns = data["configInfo"].columns;
            tableColumns = columnsDisplay(tableColumns, reportName);
            $("#Lnav_text").text(data["configInfo"].reportName)
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
        //普通查询
        reportKey = reportKeyByArea;
        //来单日期要默认置空
        /*var date = new Date();
        var searchDate = date.format("yyyy-MM-dd");
        $("#startDate").val(searchDate);*/
        $("#exportBtn").attr('disabled', true);//导出按钮不可用
        $(".totalDiv").css('display', 'none');//总共记录不显示
    } else {
        $("#startDate").val(condition.startDate);
        $("#activateTime").val(condition.activateTime);
        $("#statusDate").val(condition.statusDate);
        reportKey = getUrlParam("typeTable");
        //分类口径和销售线回显
        if (reportKey==reportKeyByArea) {
            $($("#branchInfo ul li")[0]).addClass('searched');
            $($("#branchInfo ul li")[1]).removeClass('searched');
            var areaCodeBack = condition.areaCode;
            var areaArr0 = ["2","3","4","5","7","8"];
            var areaArr1 = ["802","801","804","806","803"]
            var areaArr2 = ["809","808","805","807","810"]
            var areaArr3 = ["10","9999"]
            if (areaArr1.indexOf(areaCodeBack)!=-1) {
                $(".branchItem").hide().eq(1).show();
                $("#selectBranch").find("option[value='近郊']").attr("selected", true);
                $(".branchItem").eq(1).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }else if(areaArr2.indexOf(areaCodeBack)!=-1){
                $(".branchItem").hide().eq(2).show();
                $("#selectBranch").find("option[value='远郊']").attr("selected", true);
                $(".branchItem").eq(2).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }else if(areaArr3.indexOf(areaCodeBack)!=-1){
                $(".branchItem").hide().eq(3).show();
                $("#selectBranch").find("option[value='部门中心']").attr("selected", true);
                $(".branchItem").eq(3).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }else if(areaArr0.indexOf(areaCodeBack)!=-1){
                $(".branchItem").hide().eq(0).show();
                $("#selectBranch").find("option[value='市区']").attr("selected", true);
                $(".branchItem").eq(0).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }
            $(".developItem").hide();

        }else{
            $($("#branchInfo ul li")[1]).addClass('searched');
            $($("#branchInfo ul li")[0]).removeClass('searched');
            var areaCodeBack = condition.areaCode;
            var areaArr0 = ["225","226","211","212","213","214"];
            var areaArr1 = ["217","219","220","218","216"]
            var areaArr2 = ["223","221","215","222","224"]
            var areaArr3 = ["227","11a0al","11a01s","dkhzx","11a01q","11a08x"]
            if (areaArr1.indexOf(areaCodeBack)!=-1) {
                $(".developItem").hide().eq(1).show();
                $("#selectBranch").find("option[value='近郊']").attr("selected", true);
                $(".developItem").eq(1).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }else if(areaArr2.indexOf(areaCodeBack)!=-1){
                $(".developItem").hide().eq(2).show();
                $("#selectBranch").find("option[value='远郊']").attr("selected", true);
                $(".developItem").eq(2).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }else if(areaArr3.indexOf(areaCodeBack)!=-1){
                $(".developItem").hide().eq(3).show();
                $("#selectBranch").find("option[value='部门中心']").attr("selected", true);
                $(".developItem").eq(3).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }else if(areaArr0.indexOf(areaCodeBack)!=-1){
                $(".developItem").hide().eq(0).show();
                $("#selectBranch").find("option[value='市区']").attr("selected", true);
                $(".developItem").eq(0).find("option[value="+areaCodeBack+"]").attr("selected", true);
            }
            $(".branchItem").hide();
        }
        //订单来源回显
        var fromBack = condition.from;
        var inmodeCatalogBack = condition.inmodeCatalog;
        var exTradeSourceBack = condition.exTradeSource;
        if (fromBack == "3,4,5,8") {
            $($("#orderInfo ul li")[0]).addClass('searched');
            $($("#orderInfo ul li")[0]).siblings('li').removeClass('searched');
        } else if (fromBack == "3") {  //集团商城
            $($("#orderInfo ul li")[1]).addClass('searched');
            $($("#orderInfo ul li")[1]).siblings('li').removeClass('searched');
            $("#internet").css("display", "block");
            $("#woYiSale").css("display", "none");
            $("#thirdParty").css("display", "none");
            $("#entityInfo").css("display", "none");
            var exTradeSourceArr = exTradeSourceBack.split(",");
            console.log(exTradeSourceArr.length);
            if (exTradeSourceArr.length == 1) {
                $($("#internet ul li")[0]).addClass('searched');
            } else {
                $($("#internet ul li")[0]).removeClass('searched');
                for (var j = 0; j < exTradeSourceArr.length; j++) {
                    var arr = exTradeSourceArr[j];
                    for (var i = 1; i < $("#internet ul li").length; i++) {
                        if ($("#internet ul li")[i].getAttribute("value") == arr) {
                            $($("#internet ul li")[i]).addClass('searched');
                        }
                    }
                }
            }
        } else if (fromBack == "4,5,8") { //沃易售
            $($("#orderInfo ul li")[2]).addClass('searched');
            $($("#orderInfo ul li")[2]).siblings('li').removeClass('searched');
            $("#internet").css("display", "none");
            $("#woYiSale").css("display", "block");
            $("#thirdParty").css("display", "none");
            $("#entityInfo").css("display", "none");
            var inmodeCatalogArr = inmodeCatalogBack.split(",");
            if (inmodeCatalogArr[inmodeCatalogArr.length-1]!="") {
                $($("#woYiSale ul li")[0]).addClass('searched');
            }else{
                $($("#woYiSale ul li")[0]).removeClass('searched');
                for (var j = 0; j < inmodeCatalogArr.length; j++) {
                    var arr = inmodeCatalogArr[j];
                    for (var i = 1; i < $("#woYiSale ul li").length-1; i++) {
                        if ($("#woYiSale ul li")[i].getAttribute("value") == arr) {
                            $($("#woYiSale ul li")[i]).addClass('searched');
                        }
                    }
                }
            }
        } else if (fromBack == "5,8") {
            $($("#orderInfo ul li")[3]).addClass('searched');
            $($("#orderInfo ul li")[3]).siblings('li').removeClass('searched');
            $("#internet").css("display", "none");
            $("#woYiSale").css("display", "none");
            $("#thirdParty").css("display", "block");
            $("#entityInfo").css("display", "none");
            var inmodeCatalogArr = inmodeCatalogBack.split(",");
            if (inmodeCatalogArr[inmodeCatalogArr.length - 1] != "") {
                $($("#thirdParty ul li")[0]).addClass('searched');
            } else {
                $($("#thirdParty ul li")[0]).removeClass('searched');
                if(inmodeCatalogArr.length>2){
                    if(inmodeCatalogArr[0]=="A6"){
                        $($("#thirdParty ul li")[1]).addClass('searched');
                    }
                    $($("#thirdParty ul li")[2]).addClass('searched');
                }else {
                    $($("#thirdParty ul li")[1]).addClass('searched');
                }
            }
        }

        //业务类型回显
        var businessTypeBack = condition.businessType;
        if (businessTypeBack != "" || businessTypeBack !=null){
            $("#businessType").val(businessTypeBack);
        }

        //产品种类回显
        var prodCatalogBack = condition.prodCatalog;
        switch (prodCatalogBack) {
            case "":
                $($("#businessInfo ul li")[0]).addClass('searched');
                $($("#businessInfo ul li")[0]).siblings('li').removeClass('searched');
                break;
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
        //交付点类型回显
        var pointTypeBack = condition.pointType;
        if (pointTypeBack == "") {
            $($("#serviceInfo ul li")[0]).addClass('searched');
            $($("#serviceInfo ul li")[0]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "00") {
            $($("#serviceInfo ul li")[1]).addClass('searched');
            $($("#serviceInfo ul li")[1]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "02") {
            $($("#serviceInfo ul li")[2]).addClass('searched');
            $($("#serviceInfo ul li")[2]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "03") {
            $($("#serviceInfo ul li")[3]).addClass('searched');
            $($("#serviceInfo ul li")[3]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "04") {
            $($("#serviceInfo ul li")[4]).addClass('searched');
            $($("#serviceInfo ul li")[4]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "05") {
            $($("#serviceInfo ul li")[5]).addClass('searched');
            $($("#serviceInfo ul li")[5]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "06") {
            $($("#serviceInfo ul li")[6]).addClass('searched');
            $($("#serviceInfo ul li")[6]).siblings('li').removeClass('searched');
        } else if (pointTypeBack == "99") {
            $($("#serviceInfo ul li")[7]).addClass('searched');
            $($("#serviceInfo ul li")[7]).siblings('li').removeClass('searched');
        }else if (pointTypeBack == "999,,9999") {
            $($("#serviceInfo ul li")[8]).addClass('searched');
            $($("#serviceInfo ul li")[8]).siblings('li').removeClass('searched');
        }

        //产品类型回显
        var secondLevelBack = condition.businessType;
        if (secondLevelBack != "" || secondLevelBack !=null){
            $("#productType3").val(secondLevelBack);
        }

        reportId = getUrlParam("reportId");
        globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey=" + reportKey + "&reportId=" + reportId + "&userParam=" + locHref);
        dateTabel(globalUrl, reportId, reportKey, locHref);
    }
    //调用后台权限接口
    var queryValue = queryPermission(reportKey);

    //初始化销售线展示
    areaCode=intSaleLine(queryValue,reportKey,areaCode);

    //业务类型显示
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        async: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/report/getBusChannel?reportKey=" + reportName + "&userParam=" + locHref),
        data: {
            "reportKey": reportName
        },
        error: function () {
            console.error("出现异常");
        },
        success: function (map) {
            $.each(map.data, function(key, value) {
                $('#businessType')
                    .append($("<option></option>")
                        .attr("value",value.enumFieldCode)
                        .text(value.enumFieldName));
            });
        }
    });

});
//分类口径
var clickFlag = 0;
/*$("#branchInfo ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    branchFlag = -1;
    clickFlag = $(this).index();
    if (clickFlag == 0) {
        reportKey = reportKeyByArea;
    } else {
        reportKey = reportKeyByArea;
        // reportKey = reportKeyByDevelop;
    }
    $("#selectBranch option:first").prop("selected", 'selected');
    $(".branchItem").hide();
    $(".developItem").hide();
})*/
//订单来源
var inmodeCatalogFlag;
$("#orderInfo ul li").click(function () {
    from = "3,4,5,8";
    inmodeCatalogFlag = 0;
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    if ($(this).index() == 1) {
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
        inmodeCatalogFlag = 1
    } else if ($(this).index() == 2) {
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
        inmodeCatalogFlag = 2
    } else if ($(this).index() == 3) {
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
        inmodeCatalogFlag = 3
    } else if ($(this).index() == 4) {
        $("#internet").css("display", "none");
        $("#woYiSale").css("display", "none");
        $("#thirdParty").css("display", "none");
        $("#entityInfo").css("display", "block");
        var liList = $("#entityInfo ul li");
        $(liList[0]).addClass("searched")
        for (var i = 1; i < liList.length; i++) {
            $(liList[i]).removeClass("searched");
        }
        inmodeCatalogFlag = 4
    } else {
        inmodeCatalog = "";  //选择全部
        $("#internet").css("display", "none");
        $("#woYiSale").css("display", "none");
        $("#thirdParty").css("display", "none");
        $("#entityInfo").css("display", "none");
        $("#businessType option:first").prop('selected','selected');//为了重置业务类型
        businessType=null;
    }
})
//集团商城多选
$("#internet ul li").click(function () {
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
})
//沃易售多选
$("#woYiSale ul li").click(function () {
    if ($(this).index() == 3){
        return;
    }
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
})
//第三方多选
$("#thirdParty ul li").click(function () {
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
})
//线下实体多选
$("#entityInfo ul li").click(function () {
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
})
//产品种类
$("#businessInfo ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    prodCatalog = $(this).attr("value1")
})
//交付点类型类型
$("#serviceInfo ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    pointType = $(this).attr("value1")
})
//部门选择
var branchFlag;
$("#selectBranch").change(function(){
    branchFlag= $(this).get(0).selectedIndex-1;
    if (clickFlag==0) {
        $(".developItem").hide().eq(branchFlag).show();
    }/*else{
        $(".developItem").hide().eq(branchFlag).show();
    }*/
    if (branchFlag==-1) {
        $(".developItem").hide();
        // $(".developItem").hide();
    }
});
//业务类型
$("#businessType").change(function () {
    businessType = $('#businessType').find("option:selected").val();
    console.log(businessType);
})
//产品类型
$("#productType3").change(function () {
    secondLevel = $('#productType3').find("option:selected").val();
    console.log(secondLevel);
})
/*查询按钮点击方法*/
$("#searchBtn").click(function () {
    //产品类型获取
    secondLevel =  $('#productType3').val() ? $('#productType3').val().join(',') :'';
    //判断部门信息是否点选
    if(branchFlag==-1 && $("#selectBranch").prop("disabled")){

    }else if(reportKey==reportKeyByArea&&$('#selectBranch').find("option:selected").val()!=""
        &&$('.developItem').eq(branchFlag).find("option:selected").val()==""){
        var selectBranch = $('#selectBranch').find("option:selected").val();
        if (selectBranch.indexOf("中心")!=-1) {
            layer.msg('请选择部门中心！', {
                time: 2000 //2s后自动关闭
            });
        }else{
            layer.msg('请选择'+selectBranch+'部门！', {
                time: 2000 //2s后自动关闭
            });
        }
        return;
    }/*else if(reportKey==reportKeyByDevelop&&$('#selectBranch').find("option:selected").val()!=""
        &&$('.developItem').eq(branchFlag).find("option:selected").val()==""){
        var selectBranch = $('#selectBranch').find("option:selected").val();
        if (selectBranch.indexOf("中心")!=-1) {
            layer.msg('请选择部门中心！', {
                time: 2000 //2s后自动关闭
            });
        }else{
            layer.msg('请选择'+selectBranch+'部门！', {
                time: 2000 //2s后自动关闭
            });
        }
        return;
    }*/
    var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>";
    $("#Lnav").after(fakeLoader);
    $("#exportBtn").attr('disabled', true);
    if (inmodeCatalogFlag == 1) {  //获取订单来源
        from = "3";
        inmodeCatalog = "";
        exTradeSource = "";
        var liList = $("#internet ul li");
        if ($(liList[0]).hasClass("searched")) {
            inmodeCatalog = "";
            exTradeSource = "";
        } else {
            for (var i = 1; i < liList.length; i++) {
                if ($(liList[i]).hasClass("searched")) {
                    exTradeSource = exTradeSource + $(liList[i]).attr("value") + ","
                }
            }
        }
    } else if (inmodeCatalogFlag == 2) {
        from = "4,5,8";
        inmodeCatalog = "";
        var liList = $("#woYiSale ul li");
        if ($(liList[0]).hasClass("searched")) {
            inmodeCatalog = "A3,A4";
        }
        for (var i = 1; i < liList.length; i++) {
            if ($(liList[i]).hasClass("searched")) {
                inmodeCatalog = inmodeCatalog + $(liList[i]).attr("value") + ","
            }
        }
    } else if (inmodeCatalogFlag == 3) {
        from = "5,8";
        inmodeCatalog = "";
        var liList = $("#thirdParty ul li");
        if ($(liList[0]).hasClass("searched")) {
            inmodeCatalog = "A1,A2,A5,A6,A7";
        }
        for (var i = 1; i < liList.length; i++) {
            if ($(liList[i]).hasClass("searched")) {
                inmodeCatalog = inmodeCatalog + $(liList[i]).attr("value") + ","
            }
        }
    } else if(inmodeCatalogFlag==4){
        return;
            /*inmodeCatalog="";
            var liList = $("#entityInfo ul li");
            if($(liList[0]).hasClass("searched")){
                inmodeCatalog="";
            }
            for(var i = 1; i< liList.length; i++){
                if($(liList[i]).hasClass("searched")){
                    inmodeCatalog=inmodeCatalog+$(liList[i]).attr("value")+","
                }
            }*/
        }
        //销售线
        if (branchFlag==-1 && !$("#selectBranch").prop("disabled")) {
            areaCode ="";
        }else{
            if ($('.developItem').eq(branchFlag).find("option:selected").val()) {  //获取部门信息
                areaCode = $('.developItem').eq(branchFlag).find("option:selected").val()
            }/*else if($('.developItem').eq(branchFlag).find("option:selected").val()){
                areaCode = $('.developItem').eq(branchFlag).find("option:selected").val()
            }*/
        }

    startDate = $("#startDate").val();
    activateTime = $("#activateTime").val();
    statusDate = $("#statusDate").val();
    if ($.isEmptyObject(startDate) && $.isEmptyObject(activateTime) && $.isEmptyObject(statusDate)){
        layer.msg('日期至少要有一项不为空！', {
            time: 2000 //2s后自动关闭
        });
    }else {
        firstReresh(inmodeCatalog,areaCode, exTradeSource, from, startDate,activateTime,statusDate,businessType,secondLevel);
    }
})
/*导出按钮点击方法*/
$("#exportBtn").click(function () {
    $.download(getOutUrl(getRootPath_web(), "/reportdetail/export?reportId=" + reportId + "&userParam=" + locHref), 'post');
})
/*历史查询*/
//打开历史查询表格
$("#historySearch").click(function () {
    $(".historyCommentTable").modal('show');
    var urlAddress = "../table.json";
    var table = $(".historyTable");
    reportKeyHis = reportKeyByArea + "," + reportKeyByDevelop;
    historyTable(table, reportKeyHis, reportId);
})

//关闭历史查询表格
$('.close_table').click(function () {
    $('.historyCommentTable').modal('hide')
})

/*来单日期要清空时判断其他两个日期是否为零*/
/*$("#startDate").blur(function () {
    var startDateVal = $("#startDate").val();
    var activateTimeVal = $("#activateTime").val();
    var statusDateVal = $("#statusDate").val();
    if (startDateVal.length <= 0){
        if (activateTimeVal.length <= 0 && statusDateVal.length <= 0 ){
            alert("日期至少要有一项不为空!");
            var date = new Date();
            var searchDate = date.format("yyyy-MM-dd");
            $("#startDate").val(searchDate);
        }else {
            false;
        }
    }
})
$("#activateTime").blur(function () {
    var startDateVal = $("#startDate").val();
    var activateTimeVal = $("#activateTime").val();
    var statusDateVal = $("#statusDate").val();
    if (startDateVal.length <= 0){
        if (activateTimeVal.length <= 0 && statusDateVal.length <= 0 ){
            alert("日期至少要有一项不为空!");
            var date = new Date();
            var searchDate = date.format("yyyy-MM-dd");
            $("#startDate").val(searchDate);
        }else {
            false;
        }
    }
})
$("#statusDate").blur(function () {
    var startDateVal = $("#startDate").val();
    var activateTimeVal = $("#activateTime").val();
    var statusDateVal = $("#statusDate").val();
    if (startDateVal.length <= 0){
        if (activateTimeVal.length <= 0 && statusDateVal.length <= 0 ){
            alert("日期至少要有一项不为空!");
            var date = new Date();
            var searchDate = date.format("yyyy-MM-dd");
            $("#startDate").val(searchDate);
        }else {
            false;
        }
    }
})*/

/*首次进入时页面交互 实时表*/
function firstReresh(inmodeCatalog,areaCode, exTradeSource, from, startDate, activateTime, statusDate,businessType,secondLevel) {
    var statusFlag;
    if (!$.isEmptyObject(statusDate)){
        statusFlag="F";
    }
    //存储传入参数到配置表
    $.ajax({
        type: 'post', //测试get，正式post
        cache: false,
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate=" + startDate + "&endDate=" + startDate + "&reportKey=" + reportKey + "&userParam=" + locHref +
            "&inmodeCatalog=" + inmodeCatalog + "&prodCatalog=" + prodCatalog + "&pointType=" + pointType + "&areaCode=" + areaCode +
            "&exTradeSource=" + exTradeSource +"&businessType=" + businessType + "&from=" + from+"&secondLevel=" + secondLevel),
        data: {
            "startDate": startDate,
            "endDate": startDate,
            "acStartDate":activateTime,
            "acEndDate":activateTime,
            "bkStartDate":statusDate,
            "bkEndDate":statusDate,
            "statusFlag":statusFlag,
            "reportKey": reportKey,
            "userParam": locHref,
            "inmodeCatalog": inmodeCatalog,
            "prodCatalog": prodCatalog,
            "pointType": pointType,
            "areaCode":areaCode,
            "exTradeSource": exTradeSource,
            "businessType": businessType,
            "from": from,
            "secondLevel": secondLevel
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
                dateTabel(globalUrl, reportId, reportKey, locHref);
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
    tableColumns = columnsDisplay(tableColumns, reportKey);
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
            console.info("加载成功");
            columns:tableColumns;
        }
        , onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
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
            console.info("responseHandler:" + obj);
            //$("#searchDate").val("-----");//查看历史时赋值
            return obj;
        }
    });
}


function columnsDisplay(columns, reportKey) {
    for (var i = 0; i < columns.length; i++) {   //展现查询条件
        if (columns[i].visibleReport == undefined || columns[i].visibleReport == reportKey) {
            columns[i].visible = true;
        } else {
            columns[i].visible = false;
        }
    }
    return columns;
}
