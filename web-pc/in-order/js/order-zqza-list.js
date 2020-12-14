/************************对内PC-政企故障单查询***************************/
$(function(){
    //设置面板高度
    setScreenHeight(".panel_2","104");
    inputInit();
    //订单列表【返回】到当前页,href刷新页面，从本地存储获取查询条件回显
    getOrderListLocalData();

});
/*解决IE兼容输入框提示语：当版本小于9时，要再一次显示提示信息*/
function inputInit(){
    if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        placeholder("#phoneNumber");//客户名称
        placeholder("#accNum");//受理单号
        placeholder("#exTradeId");//业务号码
    };
}
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
    }
    else if(type == 2){
        obj.phone = phone;  //客户名称
    }
    else if(type == 3){
        obj.exTradeId = exTradeId;//业务号码
    }
    setLocalData("web-in-pc/order-zqza-list",obj);//将赋值后的对象存入本地web中
}

//取 (并给页面input赋值)---自定义一个函数将用户查询记录从本地web存储取出
function getOrderListLocalData() {
    var obj = getLocalData("web-in-pc/order-zqza-list");//取出对象
    //console.log(obj)
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
            $(".row1").show();
            $(".row2").hide();
            $(".row3").hide();
        }

        else if(type == 2){
            $(".nav-tabs>li:eq(0)").removeClass("active");
            $(".nav-tabs>li:eq(1)").addClass("active");
            $(".nav-tabs>li:eq(2)").removeClass("active");
            $(".row2").show();
            $(".row1").hide();
            $(".row3").hide();
        }
        else if(type == 3){
            $(".nav-tabs>li:eq(0)").removeClass("active");
            $(".nav-tabs>li:eq(1)").removeClass("active");
            $(".nav-tabs>li:eq(2)").addClass("active");
            $(".row1").hide();
            $(".row2").hide();
            $(".row3").show();
        }else{
            $(".nav-tabs>li:eq(0)").addClass("active");
            $(".nav-tabs>li:eq(1)").removeClass("active");
            $(".nav-tabs>li:eq(2)").removeClass("active");
            $(".row1").show();
            $(".row2").hide();
            $(".row3").hide();
        }
    }
}
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");
var orderListObj = {
    serialNumSearch:function(){ //业务号码校验：不能为空
        var accNum = $("#accNum").val();
        if((accNum == "" ||  accNum == '请输入受理单号') ){
            layer.msg('请输入您的受理单号', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        //存
        /*setOrderListLocalData(1,"",accNum,"");*/
        orderListObj.getOrderData(accNum);
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
                var data = JSON.stringify(resData.data)
                console.log(data)
                sessionStorage.setItem("zqzapcorderListData",data);
                window.location.href=getOutUrl(getRootPath_web(),"/web-pc/in-order/page/order-zqza-list-table.html?qryNumber="+accNum);
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
        if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' )){
            layer.msg('请输入办理业务所留手机号码', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
   /*     if(phoneNumber!==""){
            var boo1=checkPhoneNum(phoneNumber);
            if(boo1==false){
                layer.msg('您的手机号码有误，请重填', {
                    time: 2000 //2s后自动关闭
                });
                return;
            }
        }*/
        /*setOrderListLocalData(2,phoneNumber,"","");*/
        orderListObj.getOrderDataPhone(phoneNumber);
    },
    getOrderDataPhone:function(phoneNumber){ //订单查询
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async : true,
            url:"https://wxzc.bjunicom.com.cn/queryCenter2/web-pc/in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
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
                    var data = JSON.stringify(resData.data)
                    console.log(data)
                    sessionStorage.setItem("zqzapcorderListData",data);
                    window.location.href=getOutUrl(getRootPath_web(),"/web-pc/in-order/page/order-zqza-list-table.html?qryType="+phoneNumber+"&qryNumber="+phoneNumber);
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
       /* setOrderListLocalData(3,"","",exTradeId);*/
        orderListObj.getOrderDataExTradeId(exTradeId);
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
                    var data = JSON.stringify(resData.data)
                    console.log(data)
                    sessionStorage.setItem("zqzapcorderListData",data);
                    window.location.href=getOutUrl(getRootPath_web(),"/web-pc/in-order/page/order-zqza-list-table.html?qryNumber="+exTradeId);
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
    orderListObj.phoneSearch();
});
//按受理单号查询
$(".searchSerialNumberBtn").click(function(){
    orderListObj.serialNumSearch();
});

//按业务号码查询
$(".searchExTradeIdlCodeBtn").click(function(){
    orderListObj.searchExTradeId();
});


function searchMethod(value) {//切换查询方式
    /*切换时加载一遍placeholder兼容IE方法*/
    inputInit();
   /* var obj = getLocalData("web-in-pc/order-zqza-list");
    console.log(obj)
    if (obj !=null) {
        var type = obj.type;//
        var phone = obj.phone;
        var accNum = obj.accNum;
        var exTradeId = obj.exTradeId;
    }*/
    //orderListObj.changeDiv(0);
    //处理tab
    if (value == 1) {
        $(".nav-tabs>li:eq(0)").addClass("active");//方式选中时变色
        $(".nav-tabs>li:eq(1)").removeClass("active");
        $(".nav-tabs>li:eq(2)").removeClass("active");
        inputInit();
        $(".row1").show();
        $(".row2").hide();
        $(".row3").hide();
        if(accNum){
            $("#accNum").val("");
            place("#accNum");
        }

    }

    else if(value == 2){
        $(".nav-tabs>li:eq(0)").removeClass("active");
        $(".nav-tabs>li:eq(1)").addClass("active");
        $(".nav-tabs>li:eq(2)").removeClass("active");
        /*切换时加载一遍placeholder兼容IE方法*/
        inputInit();
        $(".row1").hide();
        $(".row2").show();
        $(".row3").hide();
        if(phoneNumber){
            $("#phoneNumber").val("");
            place("#phoneNumber");
        }
    }

    else if(value == 3){
        $(".nav-tabs>li:eq(0)").removeClass("active");
        $(".nav-tabs>li:eq(1)").removeClass("active");
        $(".nav-tabs>li:eq(2)").addClass("active");
        /*切换时加载一遍placeholder兼容IE方法*/
        inputInit();
        $(".row1").hide();
        $(".row2").hide();
        $(".row3").show();
        if(exTradeId){
            $("#exTradeId").val("");
            place("#exTradeId");
        }
    }
}




