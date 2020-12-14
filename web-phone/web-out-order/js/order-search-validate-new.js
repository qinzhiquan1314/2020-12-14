var exCode, userName, callCode, extId;
$(function () {
    initData()
    initEvent()
});

function initData() {
    userName = getUrlParam('userName');
    exCode = getUrlParam('exCode');
    callCode = getUrlParam('callCode');
    var state = getUrlParam('state');
    var message = getUrlParam('message');
    var p_num = getUrlParam('p_num');
    if (state && state != '1') {
        layer.open({
            content: decodeURIComponent(message)
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
    }
    if (p_num) {
        $('#phoneNum').val(p_num);
    }
}

function initEvent() {
    $("#open_orderSearch1").click(function () {
        try {
            check();
        } catch (e) {
            return;
        }
        $('#searchForm').get(0).action = getOutUrl(getRootPath_web(), '/trade/checksms');

        $('#searchForm').submit();
    });
}

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

//ajax调用发送验证码请求
function getMessData(/*idNum,*/phoneNum) {
    $.ajax({
        type: 'POST',// 测试  GET , 生成 POST
        async: true,
        url: getOutUrl(getRootPath_web(), "/trade/sendMessage?phoneNumber=" + phoneNum/*+"&credentialCode="+idNum*/),
        //url: getOutUrl(getRootPath_web(),"/js/data/order-search.json"),
        dataType: "json",
        success: function (resData) {
            if (resData.message != 1) {
                if (resData.state == 1) {
                    layer.open({
                        content: resData.message
                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        , time: 3
                    });
                    countdown();	 //发送验证码后要先提示验证次数，所以要延时跳转验证码页面
                } else {
                    layer.open({
                        content: resData.message
                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        , time: 3
                    });
                }
            }else{
                if (resData.state == 1) {
                    countdown();	 //发送验证码后要先提示验证次数，所以要延时跳转验证码页面
                }

            }
        },
        error: function () {// 未成功发送，提醒发送不成功
            layer.open({
                content: '系统原因'
                , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                , time: 3
            });
        }

    });

}

/*验证码发送倒计时start*/
function countdown() {

    var obj = $("#sendMessage");
    messageCodeMinute = 60;
    settime(obj);

}

function settime(obj) { //发送验证码倒计时
    if ((messageCodeMinute == 0) || (messageCodeMinute == 61)) {
        obj.attr('disabled', false);
        //obj.removeattr("disabled"); 
        $("#sendMessage").css('backgroundColor', '#f7b135');
        obj.val("重新获取验证码");
        return;
    } else {
        obj.attr('disabled', true);
        $("#sendMessage").css('backgroundColor', '#ccc');
        obj.val("还剩" + messageCodeMinute + "秒");
        messageCodeMinute--;
    }
    setTimeout(function () {
            settime(obj)
        }
        , 1000)
}

/*验证码发送倒计时end*/
//【获取短信验证码】
$("#sendMessage").click(function () {
    var phoneNum = $("#phoneNum").val();
    try {
        check('codeNumber');
    }catch (e) {
        return;
    }
    getMessData(/*idNum,*/phoneNum);
});

function phoneSearchCheck() {
    var phoneNum = $("#phoneNum").val();
    if (phoneNum == "") {
        layer.open({
            content: '请输入办理业务所留手机号码'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
    }
    if (phoneNum !== "") {
        var boo2 = checkPhoneNum(phoneNum);
        if (boo2 == false) {
            layer.open({
                content: '您的手机号码有误，请重填'
                , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                , time: 3
            });
        } else if (boo2 == true) {
            return true;//校验成功
        }
    }
}

function dele(a, b) {
    $("#" + b).val("");
    setTimeout(function () {
        $("#" + a).hide();
    }, 500);
}