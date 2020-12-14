$(function () {
    $(document).data({a: getUrlParam('a'), b: getUrlParam('b')})
    $('#myLink').click(function () {
        window.location.href = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/new-page/mine.html");
    });
    $('#customerLink').click(function () {
        if (exCode == "kbxcx") {
            wx.miniProgram.navigateTo({url: '/pages/kfonline/kfonline'});
        } else {
            window.location.href = "http://kf.bbn.com.cn:8085/cust/users.jsp?channel=kanban";
        }
    });
    $('#troubleHyperLink').click(function () {
        if (exCode == "kbxcx") {
            wx.miniProgram.navigateTo({url: '/pages/adsl/adsl'});
        } else {
            window.location.href = "http://wx.bbn.com.cn/wx/thirdparty/palmhall/asdlmatter/asdl_matterquery.jsp";
        }
    });
    $(".tab_list li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $("#result > div").eq(index).show().siblings().hide();
        var total = $(this).attr('total');
        if (total && total > 0) {
            $('.content').hide();
        } else {
            $('.content > span').html('根据您所输入的号码，没有查询到订单！');
            $('.content').show();
        }
    })
    $("#sendMessage").click(function () {
        var phoneNum = $("#phoneNum").val();
        try {
            check('codeNumber');
        } catch (e) {
            console.log(e);
            return;
        }
        getMessData(/*idNum,*/phoneNum);
    });
    $('#queryButton').click(function () {
        clear();
        var url = getOutUrl(getRootPath_web(), "/newtrade/checksmsJSON")
        var data = {};
        data.phoneNum = $('#phoneNum').val();
        data.codeNumber = $('#codeNumber').val();
        try {
            check();
        } catch (e) {
            console.log(e);
            return;
        }
        $('.content').hide();
        $.ajax({
            type: 'POST',
            data: data,
            dataType: 'json',
            headers: $(document).data(),
            url: url,
            success: function (r) {
                if (r) {
                    var state = r.state
                    if (state && state != '1') {
                        layer.open({
                            content: decodeURIComponent(r.message)
                            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                            , time: 3
                        });
                    } else {
                        $(document).data({a: r.a, b: r.b})
                        userName = r.userName;
                        callCode = r.callCode;
                        exCode = r.b;
                        getData(resultCallback, 'resultPhoneNumber', 'phone');
                        getData(resultCallback, 'resultSerialNumber', 'serial');
                        getData(troubleResultCallback, 'resultTrouble', 'trouble');
                        var interval = setInterval(function () {
                            if (idx == 3) {
                                clearInterval(interval);
                                $(".tab_list li").first().click();
                            }
                        }, 100);
                    }
                }

            },
            error: function (data) {
                alert('响应失败！');
            }
        });
    });
    // 初始化，500MS应该已经把数据写入input框了，之所以要有点延迟，是因为在后退后，浏览器将数据打到input框里要一定的时间
    var initData = setInterval(function () {
        var phoneNum = $('#phoneNum').val();
        var codeNumber = $('#codeNumber').val();
        if (phoneNum && phoneNum != '' && codeNumber && codeNumber != '') {
            clearInterval(initData);
            $('#queryButton').click();
        }
    }, 100)
    setTimeout(function () {
        clearInterval(initData);
    }, 550)
});

function clear() {
    $('#result > div').html('');
    $(".tab_list li").each(function () {
        var html = $(this).html();
        var s = html.indexOf('(');
        var e = html.indexOf(')');
        var str = html.substring(0, s + 1) + '0' + html.substring(e);
        $(this).html(str);
        $(this).attr('total', 0);
    })
}

//ajax调用发送验证码请求
function getMessData(/*idNum,*/phoneNum) {
    $.ajax({
        type: 'POST',// 测试  GET , 生成 POST
        async: false,
        url: getRootPath_web() + "/newtrade/sendMessage?phoneNumber=" + phoneNum,
        headers: $(document).data(),
        dataType: "json",
        success: function (resData) {
            if (resData.message != 1) {
                if (resData.state == 1) {
                    layer.open({
                        content: resData.message
                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        , time: 2
                    });
                    countdown();	 //发送验证码后要先提示验证次数，所以要延时跳转验证码页面
                } else {
                    layer.open({
                        content: resData.message
                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        , time: 2
                    });
                }
            } else {
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