
/*************  对外 手机 政企障碍订单查询 ************/
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);
var array= locHref.split("&");
var ParameterArra=[];
//得到一个二维数组
for(var i=0;i<array.length;i++){
    ParameterArra.push(array[i].split("="));
}
$(document).ready(function(){
    getOrderListLocalData();
    //沃易赚小程序添加返回页面
    if(ParameterArra[1][1]=="wyzin"||ParameterArra[1][1]=="wyzout"||ParameterArra[1][1]=="wysbz"){
        $("#backWechat").css("display","inline-block");
    }
});

var searchType=null;
//存  balkNo.受理单号 stlNo.业务号码
function setOrderListLocalData(qryType,qryNumber,balkNum,stlNum,phoneNum) {
    var obj = getLocalData("web-out/order-zqza-list");
    if (obj == null) {
        obj = {qryType:"",qryNumber:"",balkNum:"",stlNum:"",phoneNum:""};
    }
    obj.qryType = qryType;
    if (qryType == "balkNo") {
        obj.qryNumber = balkNum;
    }
    else if(qryType == "stlNo") {
        obj.qryNumber = stlNum;
    }
    else if(qryType == "phoneNo") {
        obj.phoneNum = phoneNum;
    }

    setLocalData("web-out/order-zqza-list",obj);
}

//取 (并给页面input赋值)
function getOrderListLocalData() {
    var obj = getLocalData("web-out/order-zqza-list");
    var str = '<img src="../../images/order/web-li.png"/>';
    if (obj != null) {
        var qryType = obj.qryType;//
        var balkNum = obj.balkNum;
        var stlNum =obj.stlNum;
        var phoneNum = obj.phoneNum;
        $("#balkNo").val(balkNum);
        $("#stlNo").val(stlNum);
        $("#phoneNum").val(phoneNum);
        if(qryType == "phoneNo"){
            //小人显示
            var imgObj = $("#phoneNoSearch>a>img").length;
            if(!imgObj) {
                $("#phoneNoSearch>a").prepend(str);
            }
            $("#balkNoSearch>a>img").remove();
            $("#stlNoSearch>a>img").remove();
            $("#id1").show();
            $("#id2").hide();
            $("#id3").hide();
            $(".nav-tabs li").removeClass("active");
            console.log(1111);
            $("#phoneNoSearch").addClass("active");
            setType("phoneNo");
        }
        else if(qryType == "balkNo") {
            var imgObj = $("#balkNoSearch>a>img").length;
            if(!imgObj) {
                $("#balkNoSearch>a").prepend(str);
            }
            $("#stlNoSearch>a>img").remove();
            $("#phoneNoSearch>a>img").remove();
            $("#id2").show();
            $("#id1").hide();
            $("#id3").hide();
            $(".nav-tabs li").removeClass("active");
            console.log(2222);
            $("#balkNoSearch").addClass("active");
            setType("balkNo");
        }
        else if(qryType == "stlNo"){
            //小人显示
            var imgObj = $("#stlNoSearch>a>img").length;
            if(!imgObj) {
                $("#stlNoSearch>a").prepend(str);
            }
            $("#balkNoSearch>a>img").remove();
            $("#phoneNoSearch>a>img").remove();
            $("#id3").show();
            $("#id1").hide();
            $("#id2").hide();
            $(".nav-tabs li").removeClass("active");
            $("#stlNoSearch").addClass("active");
            setType("stlNo");
        }
    }else{
        var imgObj = $("#phoneNoSearch>a>img").length;
        if(!imgObj) {
            $("#phoneNoSearch>a").prepend(str);
        }
        $("#balkNoSearch>a>img").remove();
        $("#stlNoSearch>a>img").remove();
        setType("phoneNo");

    }
}

//存储查询类型
function setType(Str) {
    sessionStorage.setItem("searchType",Str);
}

//获取查询类型
function getType() {
    var searchType = sessionStorage.getItem("searchType");
    return searchType;
}

function phoneSearchCheck(){
    var phoneNum = $("#phoneNum").val();
    if(phoneNum==""){
        layer.open({
            content: '请输入办理业务所留手机号码'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
    }
    if(phoneNum!==""){
        var boo2=checkPhoneNum(phoneNum);
        if(boo2==false){
            layer.open({
                content: '您的手机号码有误，请重填'
                ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
        }else if(boo2==true){
            return true;//校验成功
        }
    }
}

/*输入短信验证码后，点击下一步进行查询*/
$("#open_phoneSearch1").click(function(){
    var validate=phoneSearchCheck();
    var codeNumber = $("#codeNumber").val();
    if(validate){//手机校验通过
        if(codeNumber==""){ //短信验证码为空
            layer.open({
                content: '请输入您收到的短信验证码'
                ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
            return;
        }else if(codeNumber!==""){
            var codeValidate=checkcodeNumber(codeNumber);//短信验证码校验
            if(codeValidate==true){
                checkData(codeNumber);//校验通过则传入后台查询
            }else{
                layer.open({
                    content: '请输入您收到的短信验证码'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
                return;
            }
        }
    }

});

// 受理单号
$("#open_orderSearch1").click(function(){
    var balkNum = $("#balkNo").val();
    var qryType ="balkNo";
    if(balkNum == "") {
        layer.open({
            content: '请输入您的受理单号！'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
        return false;
    };
    getOrderDataNum(qryType,balkNum);
});

// 业务号码
$("#open_orderSearch2").click(function(){
    var stlNum = $("#stlNo").val();
    var qryType ="stlNo";
    if(stlNum == "") {
        layer.open({
            content: '请输入您的业务号码！'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
        return false;
    };
    getOrderDataNum(qryType,stlNum);
});
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");
//传受理单号或业务号码到订单列表页面：order-zqza-list
function getOrderDataNum(qryType,qryNumber){
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
       /* url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkIndex?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
        url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/balkIndex?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "qryType": qryType ,
            "qryNumber" : qryNumber
        }),
        dataType : 'json',
        success : function(resData) {
            if (resData.respCode==200){
                //本地存储 赋值
                setOrderListLocalData(qryType,qryNumber,"","");
                setOrderQueryStr("&qryType="+qryType+"&qryNumber="+qryNumber);
                var secCode = resData.data[0].secCode;
                console.log(secCode)
                //跳转到订单列表页面  order-list
                window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-list.html?qryType="+qryType+"&qryNumber="+qryNumber+"&secCode="+secCode);
            }
            else{
                layer.open({
                    content: '此号码无数据'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }
        },
        error: function (e) {
            layer.open({
                content: '系统错误，请重试'
                ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                ,time: 3
            });

        }
    });
}

/*function getOrderDatastlNum(qryType,qryNumber){
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
        url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkIndex?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",
        dataType : 'json',
        contentType: "application/json;charset=UTF-8",
        data:{
            "qryType": qryType ,
            "qryNumber" : qryNumber
        },
        success : function(resData) {
            if (resData.state==1){
                //本地存储 赋值
                setOrderListLocalData("stlNo",qryNumber,"","");
                setOrderQueryStr("&qryType=stlNo&qryNumber="+qryNumber);
                //跳转到订单列表页面  order-list
                window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-list.html?stlNo="+qryNumber);
            }
            else{
                layer.open({
                    content: '此号码无数据'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }
        },
        error: function (e) {
            layer.open({
                content: '系统错误，请重试'
                ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                ,time: 3
            });

        }
    });
}*/

//ajax调用发送验证码请求
function getMessData(phoneNum){
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async: false,
        url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/sendSCode",
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "phoneNumber": phoneNum ,
        }),
        dataType : 'json',
        success: function (resData) {
            if(resData.respCode==200){
                layer.open({
                    content: resData.respDesc
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
                //存
                setOrderListLocalData("phoneNo","","","",phoneNum);
                // 如已成功发送验证码，跳转到输入短信验证码页面
                countdown();	 //发送验证码后要先提示验证次数，所以要延时跳转验证码页面
            }else{
                layer.open({
                    content: resData.respDesc
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }
        },
        error: function () {// 未成功发送，提醒发送不成功
            layer.open({
                content: '系统原因'
                ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
        }

    });

}

/*验证码发送倒计时start*/
function countdown(){

    var obj = $("#sendMessage");
    messageCodeMinute=60;
    settime(obj);

}
function settime(obj) { //发送验证码倒计时
    if ((messageCodeMinute == 0)||(messageCodeMinute==61)) {
        obj.attr('disabled',false);
        //obj.removeattr("disabled");
        $("#sendMessage").css('backgroundColor','#f7b135');
        obj.val("重新获取验证码");
        return;
    } else {
        obj.attr('disabled',true);
        $("#sendMessage").css('backgroundColor','#ccc');
        obj.val("还剩" + messageCodeMinute + "秒");
        messageCodeMinute--;
    }
    setTimeout(function() {
            settime(obj) }
        ,1000)
}
/*验证码发送倒计时end*/
//【获取短信验证码】
$("#sendMessage").click(function(){
    var phoneNum = $("#phoneNum").val();
    var validate=phoneSearchCheck();
    if(validate){	//手机号和身份证号校验通过，则发送短信
        getMessData(phoneNum);
    }
});
//切换div
function showDiv(objId) {
    var objDiv = document.getElementById(objId);
    var objDiv1 = document.getElementById("id1");
    var objDiv2 = document.getElementById("id2");
    var objDiv3 = document.getElementById("id3");
    objDiv1.style.display = "none";
    objDiv2.style.display = "none";
    objDiv3.style.display = "none";
    objDiv.style.display = "";
    var str = '<img src="../../images/order/web-li.png"/>';
    /*显示隐藏清空图标*/
    if(objId == "id3"){
        //小人显示
        var imgObj = $("#stlNoSearch>a>img").length;
        if(!imgObj) {
            $("#stlNoSearch>a").prepend(str);
        }
        $("#balkNoSearch>a>img").remove();
        $("#phoneNoSearch>a>img").remove();
        setType("stlNo");
    }
    else if (objId == "id2") {
        //小人显示
        var imgObj = $("#balkNoSearch>a>img").length;
        if(!imgObj) {
            $("#balkNoSearch>a").prepend(str);
        }
        $("#stlNoSearch>a>img").remove();
        $("#phoneNoSearch>a>img").remove();
        setType("balkNo");
    }
    else if (objId == "id1") {
        //小人显示
        var imgObj = $("#phoneNoSearch>a>img").length;
        if(!imgObj) {
            $("#phoneNoSearch>a").prepend(str);
        }
        $("#stlNoSearch>a>img").remove();
        $("#balkNoSearch>a>img").remove();
        setType("phoneNo");
    };

    //单页面特殊处理广告位重新加载
    advertPosition();
}


function dele(a,b){
    $("#"+b).val("");
    setTimeout(function(){
        $("#"+a).hide();
    },500);
}

/*手机号输入框获得焦点*/
$("#phoneNum").focus(function(){
    $("#jobIm1").show();
});
$("#balkNo").focus(function(){
    $("#jobIm6").show();
});
$(".nav-tabs li").click(function() {
    $(".nav-tabs li").removeClass("active");
    $(this).addClass("active");
});

    /**检查验证码正确与否**/
//获取输入验证码code，并和传入的手机号一同访问url，判断验证码正确性，当正确（返回为1）跳转订单页
    function checkData(pwd){
        var phoneNum = $("#phoneNum").val();
    var userName = getUrlParam("userName");
    var exCode = getUrlParam("exCode");
    var callCode = getUrlParam("callCode");
        $.ajax({
            type : 'POST',// 测试  GET , 生成 POST
            async : true,
            url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/checkSCode?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify({
                "phoneNumber": phoneNum ,
                "smcode":pwd
            }),
            dataType : 'json',
            success : function(resData) {
                if(resData.respCode==200){
                    //存
                    setOrderListLocalData("phoneNo","","","",phoneNum);
                    setOrderQueryStr("&phoneNum="+phoneNum+"&smcode="+pwd);
                    //跳转到订单列表页面  order-list
                    window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-list.html?phoneNum="+phoneNum+"&smcode="+pwd);
                    console.log(55555);
                } else{
                    layer.open({
                        content: resData.respDesc,
                        style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        ,time: 3
                    });
                    cleanData();//清除验证码
                }

            },
            error: function () {
                layer.open({
                    content: '系统原因'
                    ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }

        });
    }


/*//沃易赚小程序添加返回页面
$("#backWechat").click(function(){
    if(ParameterArra[1][1]=="wyzin"||ParameterArra[1][1]=="wyzout"){
        console.log("返回沃易赚小程序界面成功")
        wx.miniProgram.redirectTo({url: '../../pages/home/home'});
    }else if(ParameterArra[1][1]=="wysbz"){
        console.log("返回沃易售标准版界面成功")
        wx.miniProgram.redirectTo({url: '../../pages/index/index'});
    }

})*/
