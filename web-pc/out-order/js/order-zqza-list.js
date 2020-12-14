
/************************对外-PC-政企障碍订单查询-改版***************************/
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
        placeholder("#phoneNumber");//手机号
        placeholder("#codeNumber");//验证码
    };
}
//存 自定义一个函数将用户查询记录存入本地web存储
function setOrderListLocalData(phoneNum) {
    var obj = getLocalData("web-out-pc/order-zqza-list");
    if (obj == null) {
        obj = {phoneNum:""};
    }
    else{
        obj.phoneNum = phoneNum;
    }
    setLocalData("web-out-pc/order-zqza-list",obj);
}
//取 (并给页面input赋值)---自定义一个函数将用户查询记录从本地web存储取出
function getOrderListLocalData() {
    var obj = getLocalData("web-out-pc/order-zqza-list");
    if (obj != null) {
        var phoneNum = obj.phoneNum;
        if (phoneNum) { //身份证查询方式中的手机
            $("#phoneNumber").val(phoneNum);
            place('#phoneNumber');
        }
    }
}

var orderListObj = {
    phoneSearch:function(){ //手机号码和身份证号输入校验
        var phoneNumber=$("#phoneNumber").val();
        if(phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' ){
            layer.msg('请输入您的查询信息', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        if(phoneNumber!==""){
            var boo1=checkPhoneNum(phoneNumber);
            if(boo1==false){
                layer.msg('您的手机号码有误，请重填', {
                    time: 2000 //2s后自动关闭
                });
                return;
            }else if(boo1==true){
                return true;
            }
        }
    },
    getMessData:function(phoneNumber){ //第一次发送短信验证码
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async: false,
            url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/out-order/page/sendSCode",
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify({
                "phoneNumber": phoneNumber ,
            }),
            dataType : 'json',
            success: function (resData) {
                if(resData.respCode==200){
                    layer.msg(resData.respDesc, {
                        time: 2000 //2s后自动关闭
                    });
                    countdown();//验证码倒计时
                }else {
                    layer.msg(resData.respDesc, {
                        time: 2000 //2s后自动关闭0
                    });
                }
            },
            error: function () {	// 未成功发送，提醒发送不成功
                layer.msg('系统原因', {
                    time: 2000 //2s后自动关闭
                });
            }
        });
    },
}

/*验证码发送倒计时start*/
function countdown(){

    var obj = $("#messageBtn");
    messageCodeMinute=60;
    settime(obj);

}
function settime(obj) { //发送验证码倒计时
    if ((messageCodeMinute == 0)||(messageCodeMinute==61)) {
        obj.attr('disabled',false);
        //obj.removeattr("disabled");
        $("#messageBtn").css('backgroundColor','#f7b135');
        obj.val("重新获取验证码");
        return;
    } else {
        obj.attr('disabled',true);
        $("#messageBtn").css('backgroundColor','#ccc');
        obj.val("还剩" + messageCodeMinute + "秒");
        messageCodeMinute--;
    }
    setTimeout(function() {
            settime(obj) }
        ,1000)
}
/*验证码发送倒计时end*/


/*触发验证码倒计时*/
$(".searchPhoneBtn").click(function(){
    var validate = orderListObj.phoneSearch();
    //如果手机号和身份证号不为空且校验通过，发送短信验证码，进行短信校验
    //debugger;
    if (validate){
        var phoneNumber=$("#phoneNumber").val();
        orderListObj.getMessData(phoneNumber);
        //存
        setOrderListLocalData(phoneNumber);
    }
});

//下一步：填写验证码后将验证码传参，验证是否正确
$(".searchCredentialCodeBtn").click(function(){
    var codeNumber = $("#codeNumber").val();
    var validate = orderListObj.phoneSearch();
    if(validate){
        if(codeNumber==""){
            layer.msg('请输入您收到的短信验证码', {
                time: 2000 //2s后自动关闭
            });
            return;

        }else if(codeNumber!==""){
            var codeValidate=checkcodeNumber(codeNumber);
            if(codeValidate==true){
                checkData(codeNumber);
            }else{
                layer.msg('您的验证码有误，请重填', {
                    time: 2000 //2s后自动关闭
                });
                return;
            }
        }
    }
});


function cleanData() {
    $("#codeNumber").html('');//PC

};

/********************************6位验证码输入后调用 单独写checkData(pwd)方法**************************/
function checkData(pwd){ //短信验证码正确性验证
    var phoneNumber=$("#phoneNumber").val();
    var userName = getUrlParam("userName");
    var exCode = getUrlParam("exCode");
    var callCode = getUrlParam("callCode");
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
      /*  url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkIndex2?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
        url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/out-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "phoneNumber": phoneNumber ,
            "smcode":pwd
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
                sessionStorage.setItem("zqzaorderListData",data);
                window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-zqza-list-table.html?phoneNum="+phoneNumber+"&smcode="+pwd);
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



