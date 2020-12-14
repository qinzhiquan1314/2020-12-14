/************************对内PC-政企故障单查询***************************/
$(function(){
    //设置面板高度
    setScreenHeight(".panel_2","104");
    inputInit();
    //订单列表【返回】到当前页,href刷新页面，从本地存储获取查询条件回显
    getOrderListLocalData();
});
/*解决IE兼容输入框提示语：当版本小于9时，要再一次显示提示信息*/
function init(){
    if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        placeholder("#phoneNumber");//客户名称
        placeholder("#accNum");//受理单号
        placeholder("#exTradeId");//业务号码
    };

}
function inputInit() {
    init();
    var phoneNumber=$("#phoneNumber").val();
    var accNum=$("#accNum").val();
    var exTradeId=$("#exTradeId").val();
    if(phoneNumber!=""){
        console.log(2222222222222222)
        orderListObj1.phoneSearch();
    }
    else if(accNum!=""){
        console.log(1111111111111111)
        orderListObj1.serialNumSearch();
    }
    else if(exTradeId!=""){
        console.log(333333333333333)
        orderListObj1.searchExTradeId();
    }
}
/*function getItem(key){
    var r = null;
    if(window.sessionStorage){
        r = sessionStorage.getItem(key);
    }else{
        r = $.cookie(key);
    }
    if(!r) return null;
    r = JSON.parse(r);
    return r;
}
function getItemC(key){
    var r = null;
    if(window.sessionStorage){
        r = sessionStorage.getItem(key);
    }else{
        r = $.cookie(key);
    }
    return r;
}
function setItemC(key,value){
    if(window.sessionStorage){
        return sessionStorage.setItem(key,value);
    }else{
        return $.cookie(key,value);
    }
}
function setItem(key,value){
    var str = JSON.stringify(value);
    if(window.sessionStorage){
        return sessionStorage.setItem(key,str);
    }else{
        return $.cookie(key,str);
    }
}
function removeItem(key){
    if(window.sessionStorage){
        return sessionStorage.removeItem(key);
    }else{
        return $.cookie(key,null);
    }
}*/
//存（自定义一个函数将用户查询记录存入本地web存储）
function setOrderListLocalData(type,phone,accNum,exTradeId) {
    //公共方法--存 取 localStorage,将查询记录放入json对象中存取
    var obj = getLocalData("web-in-pc/order-zqza-list");//获取对象
    if (obj == null) {
        obj = {type:"",phone:"",accNum:"",exTradeId:""};
    }
    obj.type = type;
    //注意：排斥的查询需要把该清空的清空
    if (type == 1) {      //查询方式type:1-受理单号查询；2-客户名称查询；3-业务号码查询
        obj.accNum = accNum;//受理单号
        obj.phone = "";
        obj.exTradeId = "";
    }
    else if(type == 2){
        obj.accNum = "";//受理单号
        obj.exTradeId = "";
        obj.phone = phone;  //客户名称
    }
    else if(type == 3){
        obj.accNum = "";//受理单号
        obj.phone = "";
        obj.exTradeId = exTradeId;//业务号码
    }
    setLocalData("web-in-pc/order-zqza-list",obj);//将赋值后的对象存入本地web中
}

//取 (并给页面input赋值)---自定义一个函数将用户查询记录从本地web存储取出
function getOrderListLocalData() {
    var obj = getLocalData("web-in-pc/order-zqza-list");//取出对象
    console.log(obj)
    if (obj != null) {  //取出对象的值
        var type = obj.type;// 1:手机  2：业务号码   3 订单号码
        var phone = obj.phone;
        var accNum = obj.accNum;
        var exTradeId = obj.exTradeId;
        //将对象的值赋给页面中输入框
        if(phone){ //身份证查询方式中的手机
            $("#phoneNumber").val(phone);
            place('#phoneNumber');
        }
        if(accNum){
            $("#accNum").val(accNum);
            place('#accNum');
        }
        if(exTradeId){
            $("#exTradeId").val(exTradeId);
            place('#exTradeId');
        }
        if(type == 1) {
            $(".nav-tabs>li:eq(0)").addClass("active");
            $(".nav-tabs>li:eq(1)").removeClass("active");
            $(".nav-tabs>li:eq(2)").removeClass("active");
            $("#id1").show();
            $("#id2").hide();
            $("#id3").hide();
        }

        else if(type == 2){
            $(".nav-tabs>li:eq(0)").removeClass("active");
            $(".nav-tabs>li:eq(1)").addClass("active");
            $(".nav-tabs>li:eq(2)").removeClass("active");
            $("#id2").show();
            $("#id1").hide();
            $("#id3").hide();
        }
        else if(type == 3){
            $(".nav-tabs>li:eq(0)").removeClass("active");
            $(".nav-tabs>li:eq(1)").removeClass("active");
            $(".nav-tabs>li:eq(2)").addClass("active");
            $("#id1").hide();
            $("#id2").hide();
            $("#id3").show();
        }else{
            $(".nav-tabs>li:eq(0)").addClass("active");
            $(".nav-tabs>li:eq(1)").removeClass("active");
            $(".nav-tabs>li:eq(2)").removeClass("active");
            $("#id1").show();
            $("#id2").hide();
            $("#id3").hide();
        }
    }
}
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");
var orderListObj1 = {
    serialNumSearch:function(){ //业务号码校验：不能为空
        var accNum = $("#accNum").val();
        if((accNum == "" ||  accNum == '请输入受理单号') ){
            layer.msg('请输入您的受理单号', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        //存
        orderListObj1.getOrderData(accNum);

    } ,
    getOrderData:function(accNum){ //订单查询
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async : true,
            url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify({
                "qryType": "balkNo" ,
                "qryNumber" : accNum
            }),
            dataType : 'json',
            beforeSend: function () {
                layer.load(2);
            },
            complete:function(){
                layer.closeAll('loading');
            },
            success : function(resData) {
                if(resData.respCode==200){ //如果验证成功，则进行查询并显示订单列表
                    setOrderListLocalData(1,"",accNum,"");
                    var data = JSON.stringify(resData.data)
                    console.log(data)
                    sessionStorage.setItem("zqzapcorderListData",data);
                    orderListObj.initTable();
                } else{
                    layer.msg(resData.respDesc, {
                        time: 2000 //2s后自动关闭
                    });
                }
            },
            error: function () {
                layer.msg('系统原因', {
                    time: 2000 //2s后自动关闭
                });
            }
        });
    },
    phoneSearch:function(){ //手机号码输入校验
        var phoneNumber=$("#phoneNumber").val();
        if((phoneNumber=="" || phoneNumber =='请输入办理业务所留客户名称' )){
            layer.msg('请输入办理业务所留客户名称', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        orderListObj1.getOrderDataPhone(phoneNumber);

    },
    getOrderDataPhone:function(phoneNumber){ //订单查询
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async : true,
            url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify({
                "qryType": "phoneNumber" ,
                "qryNumber" : phoneNumber
            }),
            dataType : 'json',
            beforeSend: function () {
                layer.load(2);
            },
            complete:function(){
                layer.closeAll('loading');
            },
            success : function(resData) {
                if(resData.respCode==200){ //如果验证成功，则进行查询并显示订单列表
                    setOrderListLocalData(2,phoneNumber,"","");
                    var data = JSON.stringify(resData.data)
                   /* console.log(data)*/
                    sessionStorage.setItem("zqzapcorderListData",data);
                    orderListObj.initTable();
                } else{
                    layer.msg(resData.respDesc, {
                        time: 2000 //2s后自动关闭
                    });
                }
            },
            error: function () {
                layer.msg('系统原因', {
                    time: 2000 //2s后自动关闭
                });
            }
        });
    } ,
    searchExTradeId :function(){ //校验订单号
        var exTradeId = $("#exTradeId").val();
        if(exTradeId =="请输入您的业务号码"){
            exTradeId="";
        };
        if(exTradeId ==""){
            layer.msg('请输入您的业务号码', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        //存
        orderListObj1.getOrderDataExTradeId(exTradeId);

    },
    getOrderDataExTradeId:function(exTradeId){ //订单查询
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async : true,
            url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify({
                "qryType": "stlNo" ,
                "qryNumber" : exTradeId
            }),
            dataType : 'json',
            beforeSend: function () {
                layer.load(2);
            },
            complete:function(){
                layer.closeAll('loading');
            },
            success : function(resData) {
                if(resData.respCode==200){ //如果验证成功，则进行查询并显示订单列表
                    setOrderListLocalData(3,"","",exTradeId);
                    var data = JSON.stringify(resData.data)
                    /*console.log(data)*/
                    sessionStorage.setItem("zqzapcorderListData",data);
                    orderListObj.initTable();
                } else{
                    layer.msg(resData.respDesc, {
                        time: 2000 //2s后自动关闭
                    });
                }
            },
            error: function () {
                layer.msg('系统原因', {
                    time: 2000 //2s后自动关闭
                });
            }
        });
    }
}

//按联系电话查询
$(".searchCredentialCodeBtn").click(function(){
    orderListObj1.phoneSearch();
});
//按受理单号查询
$(".searchSerialNumberBtn").click(function(){
    orderListObj1.serialNumSearch();
});

//按业务号码查询
$(".searchExTradeIdlCodeBtn").click(function(){
    orderListObj1.searchExTradeId();
});


function searchMethod(value) {//切换查询方式
    /*切换时加载一遍placeholder兼容IE方法*/
    init();
   /*  var obj = getLocalData("web-in-pc/order-zqza-list");
     console.log(obj)
     if (obj !=null) {
         var type = obj.type;//
         var phoneNumber = obj.phone;
         var accNum = obj.accNum;
         var exTradeId = obj.exTradeId;
     }*/
    /*orderListObj.changeDiv(0);*/
    //处理tab
    if (value == 1) {
        $(".nav-tabs>li:eq(0)").addClass("active");//方式选中时变色
        $(".nav-tabs>li:eq(1)").removeClass("active");
        $(".nav-tabs>li:eq(2)").removeClass("active");
       /* inputInit();*/
        $("#id1").show();
        $("#id2").hide();
        $("#id3").hide();
        if(accNum){
            $("#accNum").val("");
            $("#phoneNumber").val("");
            $("#exTradeId").val("");
            place("#accNum");
         /*   $('#table').bootstrapTable("destroy");*/
            $('#table').bootstrapTable('removeAll');
        }

    }

    else if(value == 2){
        $(".nav-tabs>li:eq(0)").removeClass("active");
        $(".nav-tabs>li:eq(1)").addClass("active");
        $(".nav-tabs>li:eq(2)").removeClass("active");
        /*切换时加载一遍placeholder兼容IE方法*/
      /*  inputInit();*/
        $("#id1").hide();
        $("#id2").show();
        $("#id3").hide();
        if(phoneNumber){
            $("#accNum").val("");
            $("#phoneNumber").val("");
            $("#exTradeId").val("");
            place("#phoneNumber");
         /*   $('#table').bootstrapTable("destroy");*/
            $('#table').bootstrapTable('removeAll');
        }
    }

    else if(value == 3){
        $(".nav-tabs>li:eq(0)").removeClass("active");
        $(".nav-tabs>li:eq(1)").removeClass("active");
        $(".nav-tabs>li:eq(2)").addClass("active");
        /*切换时加载一遍placeholder兼容IE方法*/
        /*inputInit();*/
        $("#id1").hide();
        $("#id2").hide();
        $("#id3").show();
        if(exTradeId){
            $("#accNum").val("");
            $("#phoneNumber").val("");
            $("#exTradeId").val("");
            place("#exTradeId");
        /*    $('#table').bootstrapTable("destroy");*/
            $('#table').bootstrapTable('removeAll');
        }
    }
}

//底部广告
function Advertisement() {
    $.ajax({
        type: 'POST',
        data: {imgKey: "0"}, //后台传递的参数参数
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/trade/commonPicture?imgKey=" + "0"),
        success: function (data) {
            //alert(data.name);
            //alert("../images/"+data.name);
            $("#adBtm").attr("src", "../images/" + data.name);
        },
        error: function (data) {
            alert('响应失败！');
        }
    });
}
Advertisement();

//兼容IE8



/**************pc************/
/*//加载页面时查询
$(function(){
    orderListObj.initTable();
});*/
//本页面对象
var orderListObj = {
    //初始table数据
    initTable: function(){
        var str = sessionStorage.getItem("zqzapcorderListData");
        var resData = JSON.parse(str);
        console.log(resData)
        if(resData){
            $('#table').bootstrapTable("destroy");
            $('#table').bootstrapTable({
                data: resData
            })
            return false;
        }
    }
    ,actionFormatter: function(value, row, index) { //表格超链接  订单状态
        if(row.status == "已办结"){
            if(row.markFlag == "1"){
                return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">故障处理详情</a><a class="showHistory apa2">查看评价</a></p>';     //订单已完成已评价
            }else if(row.markFlag == "0"){
                return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow " style="">故障处理详情</a></p>'; //订单已完成未评价
            }
        }else if(row.status == "处理中"){
            return '<p class="a-p1">'+row.status+'</p><p class="a-p1"><a class="showFlow" style="margin:0px 44px;">故障处理详情</a></p>';
        }else if(row.status == "工程师会按照约定的时间继续反馈进展"){
            return '<p class="a-p1">工程师会按照约定的时间继续反馈进展</p><p class="a-p1"><a class="showFlow" style="margin:0px 44px;">故障处理详情</a></p>';
        }
    }
    ,numFormatter:function(value, row, index){
        var balkNo = checkNullOrEmptyStr(row.balkNo) ? "" :  row.balkNo;
        /* var stlNo = checkNullOrEmptyStr(row.stlNo) ? "" :  row.stlNo;*/
        if( balkNo !== ""){
            return '<p class="exTradeId" href="javascript:;">'+balkNo+'</p>';
        }/*else{
            return '<p class="exTradeId" href="javascript:;">'+stlNo+'</p>';
        }*/
    }
    ,stlnumFormatter:function(value, row, index){
        /*var balkNo = checkNullOrEmptyStr(row.balkNo) ? "" :  row.balkNo;*/
        var stlNo = checkNullOrEmptyStr(row.stlNo) ? "" :  row.stlNo;
        if( stlNo !== ""){
            return '<p class="exTradeId" href="javascript:;">'+stlNo+'</p>';
        }/*else{
            return '<p class="serialNumber" href="javascript:;">'+stlNo+'</p>';
        }*/
    }
    ,nameFormatter:function(value, row, index){
        var name = checkNullOrEmptyStr(row.allegeUnitName) ? "" :  row.allegeUnitName;
        if( name !== ""){
            return '<p class="exTradeId" href="javascript:;">'+checkLen(name)+'</p>';
        }
    }
    ,timeFormatter:function(value, row, index){
        var time = checkNullOrEmptyStr(row.acceptTime) ? "" :  row.acceptTime;
        if( time !== ""){
            return '<p class="exTradeId" href="javascript:;">'+time+'</p>';
        }
    }
    ,showRightLayer_assess: function(layerId,layerTitle,layerUrl) {
        layer.open({
            type: 2,
            id: layerId, //设定一个id，防止重复弹出
            title: layerTitle,//title: false, //不显示标题栏
            shadeClose: true,
            shade: 0,//背景  shade: 0.8
            area: ['490px', '98%'],
            offset: 'r',
            skin: 'a-layer', //
            content: layerUrl //iframe的url
            ,end: function () {
                var str = sessionStorage.getItem("zqzaorderListData");
                var resData = JSON.parse(str);
                if(resData){
                    $('#table').bootstrapTable("destroy");
                    $('#table').bootstrapTable({
                        data: resData
                    })
                    // sessionStorage.removeItem('/order-search-validate/resData');
                    return false;
                }

            }
        });

    }
}


/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
    //展示流程
    'click .showFlow': function(e, value, row, index) {
        var orderNum = row.balkNo;
        var secCode = row.secCode;
        var status = row.status;
        var name = row.allegeUnitName;
        /*var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/in-order/page/flow-zqza-list.html?orderNum="+orderNum+"&secCode="+secCode+"&status="+status);
        showRightLayer("flow"+orderNum,"订单详情",htmlUrl);*/
         window.location.href=getOutUrl(getRootPath_web(),"/web-pc/in-order/page/flow-zqza-list-new.html?orderNum="+orderNum+"&secCode="+secCode+"&status="+status+"&name="+name);
    },
    //立即评价
    'click .showAssess' : function(e, value, row, index) {
        console.log(row)
        var orderNum = row.balkNo;
        var secCode = row.secCode;
        var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/in-order/page/order-zqza-assess.html?orderNum="+orderNum+"&secCode="+secCode);
        orderListObj.showRightLayer_assess("assess"+orderNum,"订单评价",htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
    },
    //展示已评价数据
    'click .showHistory' : function(e, value, row, index) {
        var orderNum = row.balkNo;
        var secCode = row.secCode;
        var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/in-order/page/order-zqza-assess-show.html?orderNum="+orderNum+"&secCode="+secCode);
        showRightLayer("assess-show"+orderNum,"我的评价",htmlUrl);
    }
},
    function getObject(str) {
        var obj = {};
        if (str) {
            var queryArray = str.split('&');
            for(var i = 0; i < queryArray.length;i++){
                var temp = queryArray[i].split('=');
                if (temp.length > 1) {
                    obj[temp[0]] = temp[1];
                }
            }
        }
        return obj;
    }


