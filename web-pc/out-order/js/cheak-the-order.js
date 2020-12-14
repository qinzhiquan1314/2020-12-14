
/************************对外-PC-订单查询-改版***************************/
$(function(){
    //设置面板高度
    setScreenHeight(".panel_2","104");
    inputInit();
    //订单列表【返回】到当前页,href刷新页面，从本地存储获取查询条件回显
    getOrderListLocalData();
    $(".nav_top li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $(".tableBox").eq(index).show().siblings('.tableBox').hide()
        var total = $(this).attr('total');
        if (total && total > 0) {
            $(".tableBox").eq(index).show()
            $('.empty').hide();
        } else {
            $('.empty').show();
            $(".tableBox").eq(index).hide()
        }
    })

});
// 查询点击事件
function  queryButtonfn() {
    // clear();
    // orderListObj.initTable(userName, '', resultCallback, '#table11','');
    // orderListObj.initTable(null, userName, resultCallback, '#table22','');
    // orderListObj.initTable(null, userName, resultCallback, '#table33',trouble);
    var url = getOutUrl(getRootPath_web() , '/trade/checksmsJSON?&userName=' + userName + '&exCode=' + exCode + '&callCode=' + callCode)
    var data = {};
    data.phoneNum = $('#phoneNum').val();
    data.codeNumber = $('#codeNumber').val();
    $('.content').hide();
    $.ajax({
        type: 'POST',
        data: data,
        dataType: 'json',
        url: url,
        success: function (r) {
            if (r) {
                var state = r.state
                if (state && state != '1') {
                    layer.msg(decodeURIComponent(r.message), {
                        time: 2000 //2s后自动关闭
                    });
                } else {
                    callCode = r.callCode;
                    userName = r.userName;
                    orderListObj.initTable('', userName, resultCallback, '#table11','');
                    orderListObj.initTable(userName, '', resultCallback, '#table22','');
                    orderListObj.initTable(null, userName, resultCallback, '#table33',trouble);
                   /* var interval = setInterval(function () {
                        if(idx == 3){
                            clearInterval(interval);
                            $(".tab_list li").first().click();
                        }
                    },100);*/
                }
            }

        },
        error: function (data) {
            alert('响应失败！');
        }
    });
};
/*解决IE兼容输入框提示语：当版本小于9时，要再一次显示提示信息*/
function inputInit(){
    if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        placeholder("#phoneNumber");//手机号
        placeholder("#credentialCode");//身份证号
        placeholder("#serialNumber");//手机号码
        placeholder("#accNum");//宽带号码
        placeholder("#teleNum");//固定电话号
        placeholder("#codeNumber");//验证码
        placeholder("#exTradeId");//请输入订单号

    };
}
//存自定义一个函数将用户查询记录存入本地web存储
function setOrderListLocalData(type,phone,idcode,serviceNum,accNum,teleNum,exTradeId) {
    //公共方法--存 取 localStorage,将查询记录放入json对象中存取
    var obj = getLocalData("web-out-pc/order-list");//获取对象
    if (obj == null) {
        obj = {type:"",phone:"",idcode:"",serviceNum:"",accNum:"",teleNum:"",exTradeId:""};
    }
    obj.type = type;
    //注意：排斥的查询需要把该清空的清空
    if (type == 1) {      //查询方式type:1-身份证查询；2-业务查询，根据用户的查询记录存入，方便下次取出
        obj.phone = phone;  //手机
        obj.idcode = idcode; //身份证
    }

    else if(type == 2){
        obj.serviceNum = serviceNum;//手机号
        obj.accNum = accNum;//宽带号
        obj.teleNum=teleNum;//固话号
    }
    else if(type == 3){
        obj.exTradeId = exTradeId;//手机号

    }
    setLocalData("web-out-pc/order-list",obj);//将赋值后的对象存入本地web中
}
//取 (并给页面input赋值)---自定义一个函数将用户查询记录从本地web存储取出
function getOrderListLocalData() {
    var obj = getLocalData("web-out-pc/order-list");//取出对象
    if (obj != null) {  //取出对象的值
        var type = obj.type;// 1:手机  2：业务号码   3 订单号码
        var phone = obj.phone;
        var idcode = obj.idcode;
        var serviceNum = obj.serviceNum;
        var accNum = obj.accNum;
        var teleNum = obj.teleNum;
        var teleNum = obj.teleNum;
        var exTradeId = obj.exTradeId;
        //将对象的值赋给页面中输入框
        if(idcode){  //身份证
            $("#credentialCode").val(idcode);
            place('#credentialCode');
        }
        if(phone){ //身份证查询方式中的手机
            $("#phoneNum").val(phone);
            place('#phoneNum');
        }
        if(serviceNum){  //业务查询中的手机
            $("#serialNumber").val(serviceNum);
            place('#serialNumber');

        }
        if(accNum){
            $("#accNum").val(accNum);
            place('#accNum');
        }
        if(teleNum){
            $("#teleNum").val(teleNum);
            place('#teleNum');
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
        }
    }
}

var orderListObj1 = {
    orderUrlSearch: getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out") //  "/js/data/table.json"
    ,sendMessageUrl: getOutUrl(getRootPath_web(),"/trade/sendMessage?")
    ,phoneSearch: function(){ //手机号码和身份证号输入校验
        var phoneNumber=$("#phoneNum").val();
        if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' )){
            layer.msg('请输入您的查询信息', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        if((phoneNumber=="" || phoneNumber =='请输入办理业务所留手机号码' )){
            layer.msg('请输入办理业务所留手机号码', {
                time: 2000 //2s后自动关闭
            });
            return;
        }
        if(phoneNumber!==""){
            var boo1=checkPhoneNum(phoneNumber)
            if(boo1==false){
                layer.msg('您的手机号码有误，请重填', {
                    time: 2000 //2s后自动关闭
                });
                return;
            }else if((boo1=true)){
                return true;

            }
        }
    }
    ,getMessData:function(phoneNumber,credentialCode){ //第一次发送短信验证码
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async: false,
            url:orderListObj1.sendMessageUrl+"&phoneNumber="+phoneNumber/*+"&credentialCode="+credentialCode*/,//发送验证码请求
            dataType: "json",
            success: function (resData) {
                if (resData.state == 1) { // 如已成功发送验证码，跳转到输入短信验证码页面
                    if (resData.message != "1") {
                        layer.msg(resData.message, {
                            time: 2000 //2s后自动关闭
                        });
                    }
                    countdown();//验证码倒计时
                } else if (resData.state == 0 || resData.state == 2 || resData.state == 3) {
                    layer.msg(resData.message, {
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
    }
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
    var validate = orderListObj1.phoneSearch();
    //如果手机号和身份证号不为空且校验通过，发送短信验证码，进行短信校验
    //debugger;
    if (validate){
        var phoneNumber=$("#phoneNum").val();
        var credentialCode=$("#credentialCode").val();
        orderListObj1.getMessData(phoneNumber,credentialCode);
        //存
        setOrderListLocalData(1,phoneNumber,credentialCode,"","","");
    }
});

//下一步：填写验证码后将验证码传参，验证是否正确
$(".searchCredentialCodeBtn").click(function(){
    var codeNumber = $("#codeNumber").val();
    var validate = orderListObj1.phoneSearch();
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
//一个输入框中输入信息，另外两个输入框置灰
$("#serialNumber").focus(function(){
    $("input[name='serialNumber']").removeClass("colorchange");
    $("input[name='accNum']").addClass("colorchange");
    $("input[name='teleNum']").addClass("colorchange");
    $("#accNum").val('');
    $("#teleNum").val('');
    inputInit();

});

$("#accNum").focus(function(){
    $("input[name='accNum']").removeClass("colorchange");
    $("input[name='serialNumber']").addClass("colorchange");
    $("input[name='teleNum']").addClass("colorchange");

    $("#serialNumber").val('');
    $("#teleNum").val('');
    inputInit();
});

$("#teleNum").focus(function(){
    $("input[name='teleNum']").removeClass("colorchange");
    $("input[name='serialNumber']").addClass("colorchange");
    $("input[name='accNum']").addClass("colorchange");

    $("#accNum").val('');
    $("#serialNumber").val('');
    inputInit();

});

function cleanData() {
    $("#codeNumber").html('');//PC

}
/*宽带修障进度查询跳转*/
$(document).on("click","#kd_Search",function(){
    window.open("http://iservice.10010.com/e4/query/others/mobile_broadband-iframe.html?menuCode=000400200001",'_blank');
})
$(document).on("click","#zq_Search",function(){
    window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-zqza-list.html");
})

/********************************6位验证码输入后调用 单独写checkData(pwd)方法**************************/
function checkData(pwd){ //短信验证码正确性验证
    var phoneNumber=$("#phoneNum").val();
    var credentialCode=$("#credentialCode").val();
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
        url: getOutUrl(getRootPath_web(),"/trade/queryOrderNew?&phoneNumber="+phoneNumber+"&code="+pwd+"&credentialCode="+credentialCode),
        dataType : 'json',
        beforeSend: function () {
            layer.load(2);
        },
        complete:function(){
            layer.closeAll('loading');
        },
        success : function(resData) {
            // queryButtonfn()
            if(resData.state==1){
                var data = JSON.stringify(resData.rows)
                sessionStorage.setItem("orderListData",data);
                // window.location.href=getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-list-table.html");
                // 验证码获取成功以后的回调
                queryButtonfn()

            }
            if(resData.state==2){
                layer.msg('验证码有误', {
                    time: 2000 //2s后自动关闭
                });
                cleanData();//清除验证码
            }
            if(resData.state==0){
                layer.msg('此手机号/身份证号未办理业务', {
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