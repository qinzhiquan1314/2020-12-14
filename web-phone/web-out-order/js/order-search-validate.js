/*************  对外 手机 订单查询+获取验证码  ************/
var locHref = window.location.href.substr(window.location.href.indexOf("?") + 1);
var array = locHref.split("&");
var ParameterArra = [];
//得到一个二维数组
for (var i = 0; i < array.length; i++) {
    ParameterArra.push(array[i].split("="));
}
$(document).ready(function () {
    // getOrderListLocalData();
    //沃易赚小程序添加返回页面
    if (ParameterArra[1][1] == "wyzin" || ParameterArra[1][1] == "wyzout" || ParameterArra[1][1] == "wysbz") {
        $("#backWechat").css("display", "inline-block");
    }
});

var searchType = null;

//存  type：1.手机号 2.业务号                                     手机号码     宽带号码
function setOrderListLocalData(type, phone, /*idcode,*/serviceNum, bandNum, teleNum, exTradeId) {
    var obj = getLocalData("web-out/order-list");
    if (obj == null) {
        obj = {type: "", phone: "", /*idcode:"",*/serviceNum: "", bandNum: "", teleNum: "", exTradeId: ""};
    }

    obj.type = type;
    //注意：排斥的查询需要把该清空的清空
    if (type == 1) {
        obj.phone = phone;
        // obj.idcode = idcode;
    }
    else if (type == 2) {
        obj.serviceNum = serviceNum;
        obj.bandNum = bandNum;
        obj.teleNum = teleNum;
    }
    else if (type == 3) {
        obj.exTradeId = exTradeId;

    }
    setLocalData("web-out/order-list", obj);
}

//取 (并给页面input赋值)
function getOrderListLocalData() {
    var obj = getLocalData("web-out/order-list");
    var str = '<img src="../../images/order/web-li.png"/>';
    if (obj != null) {
        var type = obj.type;// 1:手机  2：业务号码  3.订单号码
        var phone = obj.phone;
        // var idcode = obj.idcode;
        var serviceNum = obj.serviceNum;
        var bandNum = obj.bandNum;
        var teleNum = obj.teleNum;
        var exTradeId = obj.exTradeId;
        // $("#IDNum").val(idcode);
        $("#phoneNum").val(phone);
        $("#serialNumber").val(serviceNum);
        $("#accNum").val(bandNum);
        $("#teleNum").val(teleNum);
        $("#exTradeId").val(exTradeId);
        if (type == 1) {
            var imgObj = $("#phoneSearch>a>img").length;
            if (!imgObj) {
                $("#phoneSearch>a").prepend(str);
            }
            $("#serialSearch>a>img").remove();
            $("#exTradeIdSearch>a>img").remove();
            $("#id1").show();
            $("#id2").hide();
            $("#id3").hide();
            $(".nav-tabs li").removeClass("active");
            $("#phoneSearch").addClass("active");
            setType("1");

        }
        else if (type == 2) {
            //小人显示
            var imgObj = $("#serialSearch>a>img").length;
            if (!imgObj) {
                $("#serialSearch>a").prepend(str);
            }
            $("#phoneSearch>a>img").remove();
            $("#exTradeIdSearch>a>img").remove();
            $("#id2").show();
            $("#id1").hide();
            $("#id3").hide();
            $(".nav-tabs li").removeClass("active");
            $("#serialSearch").addClass("active");
            setType("2");

        }
        else if (type == 3) {
            //小人显示
            var imgObj = $("#exTradeIdSearch>a>img").length;
            if (!imgObj) {
                $("#exTradeIdSearch>a").prepend(str);
            }
            $("#serialSearch>a>img").remove();
            $("#phoneSearch>a>img").remove();
            $("#id2").hide();
            $("#id1").hide();
            $("#id3").show();
            $(".nav-tabs li").removeClass("active");
            $("#exTradeIdSearch").addClass("active");
            setType("3");

        }
    } else {
        var imgObj = $("#phoneSearch>a>img").length;
        if (!imgObj) {
            $("#phoneSearch>a").prepend(str);
        }
        $("#serialSearch>a>img").remove();
        $("#exTradeIdSearch>a>img").remove();
        setType("1");

    }
}

//存储查询类型
function setType(Str) {
    sessionStorage.setItem("searchType", Str);
}

//获取查询类型
function getType() {
    var searchType = sessionStorage.getItem("searchType");
    return searchType;
}

function phoneSearchCheck() {
    // var idNum = $("#IDNum").val();
    var phoneNum = $("#phoneNum").val();
    /*if(idNum==""&&phoneNum==""){
          layer.open({
              content: '请输入您的查询信息'
              ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
              ,time: 3
          });
    }*/
    /*if(idNum==""&&phoneNum!=="") {
        layer.open({
            content: '请输入办理业务的身份证号码'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
    }*/
    if (phoneNum == ""/*&&idNum!==""*/) {
        layer.open({
            content: '请输入办理业务所留手机号码'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
    }
    if (/*idNum!==""&&*/phoneNum !== "") {

        // var boo1=checkID(idNum);
        var boo2 = checkPhoneNum(phoneNum);
        //if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum))){
        //if(!/^\d{17}(\d|x)$/i.test(ID)
        i
        /*f(boo1==false){
                        layer.open({
                              content: '您的身份证号有误，请重填'
                              ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                              ,time: 3
                        });
                    }else */
        if (boo2 == false) {
            layer.open({
                content: '您的手机号码有误，请重填'
                , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                , time: 3
            });
        } else if ((boo1 = true) && (boo2 = true)) {

            return true;//校验成功
        }
    }
}


/*输入短信验证码后，点击下一步进行身份证查询*/
$("#open_orderSearch1").click(function () {
    var validate = phoneSearchCheck();
    var codeNumber = $("#codeNumber").val();
    if (validate) {//手机和身份证校验通过
        if (codeNumber == "") { //短信验证码为空
            layer.open({
                content: '请输入您收到的短信验证码'
                , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                , time: 3
            });
            return;
        } else if (codeNumber !== "") {
            var codeValidate = checkcodeNumber(codeNumber);//短信验证码校验
            if (codeValidate == true) {
                checkData(codeNumber);//校验通过则传入后台查询
            } else {
                layer.open({
                    content: '请输入您收到的短信验证码'
                    , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    , time: 3
                });
                return;
            }
        }
    }

});

//验证码为空时，下一步只进行业务号码查询
$("#open_orderSearch2").click(function () {
    var serialNumber = $("#serialNumber").val();
    var accNum = $("#accNum").val();
    var teleNum = $("#teleNum").val();
    var booSerial = checkPhoneNum(serialNumber);
    var booAcc = checkAcc(accNum);
    var booTele = checkAccAndTele(teleNum);
    //var idNum = $("#idNum").val();
    if (serialNumber == "" && accNum == "" && teleNum == "") {
        layer.open({
            content: '请输入您的查询信息！'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
        return false;
    }
    ;
    if (booSerial == false) {
        layer.open({
            content: '您的手机号码有误，请重填'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
        return;
    }
    if (booAcc == false) {
        layer.open({
            content: '您的宽带号码有误，请重填'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
        return;
    }
    if (booTele == false) {
        layer.open({
            content: '您的固话号码有误，请重填'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
        return;
    }
    getOrderData(serialNumber, accNum, teleNum);
});
// 订单号
$("#open_orderSearch3").click(function () {
    var exTradeId = $("#exTradeId").val();
    if (exTradeId == "") {
        layer.open({
            content: '请输入您的订单号！'
            , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            , time: 3
        });
        return false;
    }
    ;


    getOrderDataexTradeId(exTradeId);
});

function getOrderDataexTradeId(exTradeId) {
    $.ajax({
        type: 'POST',// 测试  GET , 生成 POST
        async: true,
        url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=out&typeTable=phoneOut&orderNum=" + exTradeId),
        //url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
        dataType: 'json',
        success: function (resData) {
            if (resData.state == 1) {
                //本地存储 赋值
                setOrderListLocalData(3, "", /*"",*/'', '', '', exTradeId);
                //setOrderList(resData.rows);//orderListData=resData.data;
                setOrderQueryStr("&orderNum=" + exTradeId);
                //跳转到订单列表页面  order-list
                window.location.href = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-list.html?orderNum=" + exTradeId);
            }
            else {
                layer.open({
                    content: '此号码无数据'
                    , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    , time: 3
                });
            }
        },
        error: function (e) {
            layer.open({
                content: '系统错误，请重试'
                , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                , time: 3
            });

        }
    });
}


//传业务号码到订单列表页面：order-list
function getOrderData(serialNumber, accNum, teleNum) {
    $.ajax({
        type: 'POST',// 测试  GET , 生成 POST
        async: true,
        url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=out&typeTable=phoneOut&serialNumber=" + serialNumber + "&accNum=" + encodeURIComponent(accNum) + "&teleNum=" + teleNum),//这里将业务号码和对内外的标志作为参数传入Ajax中的url
        //url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
        dataType: 'json',
        success: function (resData) {
            if (resData.state == 1) {
                //本地存储 赋值
                setOrderListLocalData(2, "", /*"",*/serialNumber, accNum, teleNum);
                //setOrderList(resData.rows);//orderListData=resData.data;
                setOrderQueryStr("&serialNumber=" + serialNumber + "&accNum=" + encodeURIComponent(accNum) + "&teleNum=" + teleNum);
                //跳转到订单列表页面  order-list
                window.location.href = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-list.html");
            }
            else {
                layer.open({
                    content: '此号码无数据'
                    , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    , time: 3
                });
            }
        },
        error: function (e) {
            layer.open({
                content: '系统错误，请重试'
                , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                , time: 3
            });

        }
    });
}


//ajax调用发送验证码请求
function getMessData(/*idNum,*/phoneNum) {
    $.ajax({
        type: 'POST',// 测试  GET , 生成 POST
        async: false,
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
                    //存
                    setOrderListLocalData(1, phoneNum, /*idNum,*/"", "", "");
                    // 如已成功发送验证码，跳转到输入短信验证码页面
                    countdown();	 //发送验证码后要先提示验证次数，所以要延时跳转验证码页面
                } else {
                    layer.open({
                        content: resData.message
                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        , time: 3
                    });
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
    // var idNum = $("#IDNum").val();
    var phoneNum = $("#phoneNum").val();
    var validate = phoneSearchCheck();
    if (validate) {//手机号和身份证号校验通过，则发送短信
        getMessData(/*idNum,*/phoneNum);
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
    if (objId == "id2") {
        //小人显示
        var imgObj = $("#serialSearch>a>img").length;
        if (!imgObj) {
            $("#serialSearch>a").prepend(str);
        }
        $("#phoneSearch>a>img").remove();
        $("#exTradeIdSearch>a>img").remove();
        setType("2");
    }
    else if (objId == "id1") {
        //小人显示
        var imgObj = $("#phoneSearch>a>img").length;
        if (!imgObj) {
            $("#phoneSearch>a").prepend(str);
        }
        $("#serialSearch>a>img").remove();
        $("#exTradeIdSearch>a>img").remove();
        setType("1");
    }
    else if (objId == "id3") {
        //小人显示
        var imgObj = $("#phoneSearch>a>img").length;
        if (!imgObj) {
            $("#exTradeIdSearch>a").prepend(str);
        }
        $("#serialSearch>a>img").remove();
        $("#phoneSearch>a>img").remove();
        setType("3");
    }
    ;

    //单页面特殊处理广告位重新加载
    advertPosition();
}


/*业务号输入框获得焦点*/
$("#serialNumber").focus(function () {
    $("#jobIm").show();
    $("#jobIm4").hide();
    $("#jobIm5").hide();

    $(this).css('backgroundColor', '#fff');
    $("#accNum").css('backgroundColor', '#ccc');
    $("#teleNum").css('backgroundColor', '#ccc');

    $("#accNum").val('');
    $("#teleNum").val('');
});
/*宽带号码输入框获得焦点*/
$("#accNum").focus(function () {
    $("#jobIm4").show();
    $("#jobIm").hide();
    $("#jobIm5").hide();
    $(this).css('backgroundColor', '#fff');
    $("#serialNumber").css('backgroundColor', '#ccc');
    $("#teleNum").css('backgroundColor', '#ccc');

    $("#serialNumber").val('');
    $("#teleNum").val('');
});
/*固定电话号输入框获得焦点*/
$("#teleNum").focus(function () {
    $("#jobIm5").show();
    $("#jobIm4").hide();
    $("#jobIm").hide();
    $(this).css('backgroundColor', '#fff');
    $("#serialNumber").css('backgroundColor', '#ccc');
    $("#accNum").css('backgroundColor', '#ccc');

    $("#accNum").val('');
    $("#serialNumber").val('');
})
/*身份证号输入框获得焦点*/
$("#IDNum").focus(function () {
    $("#jobIm2").show();
});
/*手机号输入框获得焦点*/
$("#phoneNum").focus(function () {
    $("#jobIm1").show();
});
$("#exTradeId").focus(function () {
    $("#jobIm6").show();
});
$(".nav-tabs li").click(function () {
    $(".nav-tabs li").removeClass("active");
    $(this).addClass("active");
    /*var obj = getLocalData("web-in/order-list");
    if(obj){
        localData(obj);
    }*/

});
/*点击删除图标清空数据*/
/*$("#jobIm").click(function(){
	//alert(1);
	$("#serialNumber").val("");
	setTimeout(function(){
		$("#jobIm").hide();
	},500);
});*/

/*点击删除图标清空数据*/
function dele(a, b) {
    $("#" + b).val("");
    setTimeout(function () {
        $("#" + a).hide();
    }, 500);
}


/**检查验证码正确与否**/
//获取输入验证码code，并和传入的手机号、身份证号一同访问url，判断验证码正确性，当正确（返回为1）跳转订单页
function checkData(pwd) {
    // var idNum = $("#IDNum").val();
    var phoneNum = $("#phoneNum").val();
    $.ajax({
        type: 'POST',// 测试  GET , 生成 POST
        async: true,
        //url:getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&typeTable=phoneOut&phoneNumber="+phoneNum+"&code="+pwd+"&credentialCode="+idNum),
        url: getOutUrl(getRootPath_web(), "/trade/queryOrderNew?flag=out&phoneNumber=" + phoneNum + "&code=" + pwd/*+"&credentialCode="+idNum*/),
        //url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
        dataType: 'json',
        success: function (resData) {
            //debugger;
            if (resData.state == 1) {
                //本地存储 赋值
                setOrderList(resData.rows);//orderListData=resData.data;
                // setOrderQueryStr("&phoneNumber="+phoneNum+"&credentialCode="+idNum);
                //存
                setOrderListLocalData(1, phoneNum, /*idNum,*/"");
                //跳转到订单列表页面  order-list
                window.location.href = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-list.html");
            } else if (resData.state == 3 || resData.state == 2) {
                layer.open({
                    content: resData.message,
                    style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    , time: 3
                });
                cleanData();//清除验证码
            }

        },
        error: function () {
            layer.open({
                content: '系统原因'
                , style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
                , time: 3
            });
        }

    });
}

//沃易赚小程序添加返回页面
$("#backWechat").click(function () {
    if (ParameterArra[1][1] == "wyzin" || ParameterArra[1][1] == "wyzout") {
        console.log("返回沃易赚小程序界面成功")
        wx.miniProgram.redirectTo({url: '../../pages/home/home'});
    } else if (ParameterArra[1][1] == "wysbz") {
        console.log("返回沃易售标准版界面成功")
        wx.miniProgram.redirectTo({url: '../../pages/index/index'});
    }

})

$("#open_kdsearch").click(function () {
    var exCode = getUrlParam("exCode");
    if (exCode == "kbxcx") {
        wx.miniProgram.navigateTo({url: '/pages/adsl/adsl'});
    } else {
        window.location.href = "http://wx.bbn.com.cn/wx/thirdparty/palmhall/asdlmatter/asdl_matterquery.jsp";
    }
})

$("#open_zxkfsearch").click(function () {
    var exCode = getUrlParam("exCode");
    if (exCode == "kbxcx") {
        wx.miniProgram.navigateTo({url: '/pages/kfonline/kfonline'});
    } else {
        window.location.href = "http://kf.bbn.com.cn:8085/cust/users.jsp?channel=kanban";
    }
})

$("#open_zqzasearch").click(function () {
    window.location.href = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-zqza-search-validate.html");
})
