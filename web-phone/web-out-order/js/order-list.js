/*********************对外-手机-订单列表*************************/


$(document).ready(function () {
    loadListDate();
    //加载高度
    //hh();
});

//加载高度
function hh() {
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var fon = oWidth * 20 / 720;
    //console.log(fon)
    //获取页面高度
    var a = $(document).height();
    //  console.log(a);
    var c = a - 200;
    var hh = c / fon + 'rem';
    $("#listid").css("minHeight", hh)
}

function loadListDate() {
    if (!extId) {
        var resData = getOrderList();
        if (resData) {
            getListDate(resData);
            // sessionStorage.removeItem('/order-search-validate/resData');
            return false;
        }
    }
    var orderListUrl = extId == "" ? getOutUrl(getRootPath_web(), "/trade/queryOrder?typeTable=phoneOut&" + getOrderQueryStr() + "&orderNum=" + getUrlParam("orderNum")) :
        getOutUrl(getRootPath_web(), "/trade/directQueryOrder?typeTable=phone");
    //var orderListUrl =getRootPath_web()+"/js/data/order-list.json";
    $.ajax({
        type: 'POST',//测试  GET  生产POST
        async: true,
        url: orderListUrl,
        dataType: 'json',
        beforeSend: function () {
            showLoader();
        },
        complete: function () {
            hideLoader();
        },
        success: function (resData) {
            if (resData == null) return;
            var state = resData.state;//1:有流程    0：没有    -1：系统报错
            if (state == 1) {
                getListDate(resData.rows);
            } else if (state == 0) {
                layer.open({
                    content: resData.message
                    , style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                    , time: 3
                });
            }

        }
    });
}

var flag = 0;
var phoneNum = "";

function evaluateBefore(orderNum, href2) {
    var orderListUrl = getOutUrl(getRootPath_web(), "/evaluation/alertEvaluation?flag=out&orderNum=" + orderNum);
    $.ajax({
        type: 'POST',//测试  GET  生产POST
        async: true,
        url: orderListUrl,
        dataType: 'json',
        beforeSend: function () {
            showLoader();
        },
        complete: function () {
            hideLoader();
        },
        success: function (resData) {
            if (resData == null) return;
            var state = resData.state;
            if (state == 1) {
                flag = 0;
                window.location.href = href2 + "&flag=" + flag + "&phoneNum=" + phoneNum;
            } else if (state == 2) {
                // 这里注掉了flag=1，意思是，不管前面是否是使用短信验证码方式查询订单（使用身份证），都不再使用短信的方式添加评价
                // flag=1;
                flag = 0;
                phoneNum = resData.phoneNum;
                window.location.href = href2 + "&flag=" + flag + "&phoneNum=" + phoneNum;
            } else if (state == 0) {
                layer.open({
                    content: resData.message
                    , style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                    , time: 3
                });
            }
        },
        error: function () {// 未成功发送，提醒发送不成功
            layer.open({
                content: '系统原因'
                , style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                , time: 3
            });
        }
    });
}

//下拉到底，加载数据
function getListDate(data) {
    console.log(data)
    $.each(data, function (index, item) {
        //订单状态statusFlag : N：未启动，R：运行中，F：撤单，S：成功
        //评价状态commentSate：   1-已评价 0-未评价
        var orderNum = checkNullOrEmptyStr(item.orderNum) ? "" : item.orderNum;
//			      var bssSubscribeId = checkNullOrEmptyStr(item.bssSubscribeId) ? "" :  item.bssSubscribeId; //营业订单号
        var exTradeId = checkNullOrEmptyStr(item.exTradeId) ? "" : item.exTradeId; //渠道订单号
        var ioTradeId = checkNullOrEmptyStr(item.ioTradeId) ? "" : item.ioTradeId; //渠道订单号
        var statusFlag = checkNullOrEmptyStr(item.statusFlag) ? "" : item.statusFlag;
        var commentState = checkNullOrEmptyStr(item.commentState) ? "" : item.commentState;
        var productName = checkNullOrEmptyStr(item.productName) ? "" : item.productName;
        var customerName = checkNullOrEmptyStr(item.customerName) ? "" : item.customerName;
        var addrName = checkNullOrEmptyStr(item.addrName) ? "" : item.addrName;
        var ocAcceptDate = checkNullOrEmptyStr(item.ocAcceptDate) ? "" : item.ocAcceptDate;
        var acceptDate = checkNullOrEmptyStr(item.acceptDate) ? "" : item.acceptDate;
        var productId = checkNullOrEmptyStr(item.productId) ? "" : item.productId;
        var from = checkNullOrEmptyStr(item.from) ? "" : item.from;
//			      var orderNum2=null;
        var expNo = checkNullOrEmptyStr(item.expNo) ? "" : item.expNo;
//			      
//         console.log(item.member[0].netTypeCode);
        //var netTypeCode = item.member[0].netTypeCode;
        //评价订单
        /*if(netTypeCode == "41" || netTypeCode == "67"){
            var href2=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess.html?commentType=2&orderNum="+orderNum+"&expNo="+expNo);
        }else if(netTypeCode == "40" || netTypeCode == "56" || netTypeCode == "CP"){
            var href2=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess-broadband.html?commentType=3&orderNum="+orderNum+"&expNo="+expNo);
        }else{
            var href2=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess-shiftNet.html?commentType=4&orderNum="+orderNum+"&expNo="+expNo);
        }*/
        //查看评价
        var href2 = "/404.html";
        var href3 = "/404.html";
        if (item.from == "IOM") {
            var isComp = false;
            $.each(item.member, function (index, obj) {
                if (obj.netTypeCode == "CP") {
                    isComp = true;
                }
            });
            if (isComp || (item.netTypeCode == 40 && item.productCodeSub != 3) || item.netTypeCode == 56) {
                if (item.haveI2003Flag) {
                    href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                    href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-other-new.html?commentType=6&orderNum=" + orderNum);

                } else {
                    href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                    href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
                }

            } else if (item.netTypeCode == 67) {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess.html?commentType=5&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show.html?commentType=5&orderNum=" + orderNum);
            } else if (item.netTypeCode == 40 && item.productCodeSub == 3) {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess.html?commentType=2&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show.html?commentType=2&orderNum=" + orderNum);
            } else {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-shiftNet.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-shiftNet.html?commentType=4&orderNum=" + orderNum);
            }
        }
        if (item.from == "CSM") {
            href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess.html?commentType=5&orderNum=" + orderNum + "&expNo=" + expNo);
            href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show.html?commentType=5&orderNum=" + orderNum);
        }
        if (item.from == "IO") {
            if (item.netTypeCode == 50) {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-shiftNet.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-shiftNet.html?commentType=4&orderNum=" + orderNum);
            }
            else {
                //宽带融合
                if (item.haveI2003Flag) {
                    href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                    href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-other-new.html?commentType=6&orderNum=" + orderNum);

                } else {
                    href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                    href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
                }
                // href2 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess-broadband-new.html?commentType=3&orderNum="+orderNum+"&expNo="+expNo);
                // href3 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum="+orderNum);
            }
        }

        if (item.from == "OC" || item.from == "IO2") {
            var isComp = false;
            var isbroad = false;
            var isLand = false;
            $.each(item.member, function (index, obj) {
                if (obj.netTypeCode == "CP") {
                    isComp = true;
                }
                if (obj.netTypeCode == "40" || obj.netTypeCode == "56") {
                    isbroad = true;
                }
                if (obj.netTypeCode == "67") {
                    isLand = true;
                }
            });

            //宽带融合
            if (isComp || isbroad) {
                if (item.haveI2003Flag) {
                    href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                    href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-other-new.html?commentType=6&orderNum=" + orderNum);

                } else {
                    href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                    href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
                }
                // href2 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess-broadband-new.html?commentType=3&orderNum="+orderNum+"&expNo="+expNo);
                // href3 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum="+orderNum);
            }
            //光专线
            else if (isLand) {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess.html?commentType=5&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show.html?commentType=5&orderNum=" + orderNum);
            }
            //移网
            else {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
            }

        }

        if (item.from == "SHOP"|| item.from == "QYZX") {
            //移网
            href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
            href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
        }

        var href1 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/flow-list.html?orderNum=" + orderNum + "&orderNum2=" + exTradeId);
        var href4 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-advise.html?orderNum=" + orderNum + "&expNo=" + expNo);
        var href5 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-advise-show.html?orderNum=" + orderNum);//查看建议
        href2 += '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId;
        href3 += '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId;
        /*if(exTradeId!==""){
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">订单编号：</span><a class="hh1a" href="javascript:;">'+exTradeId+'</a></li>'
        }else{
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">订单编号:</span></li>'
        }*/
        if (ioTradeId !== "") {
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">订单编号：</span><a class="hh1a" href="javascript:;">' + ioTradeId + '</a></li>'
        } else {
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">订单编号:</span><a class="hh1a" href="javascript:;">' + exTradeId + '</a></li>'
        }
        var strHtml = '<ul>' + tradeNum +
            '<li class="hh2 line"><span class="hh2sp">产品名称：</span><span class="hh2sp2">' + productName + '</span></li>' +
            '<li class="hh3 line"><span class="hh3sp">客户名称：</span>' + customerName + '</li>';

        strHtml += '<li class="hh5 line"><span class="hh5sp">装机地址：</span><span class="hh5sp2">' + addrName + '</span></li>'

        //根据订单状态 显示评价区域
        if (statusFlag == "订单完成" || statusFlag == "已完成") {
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">订单状态：</span>' + statusFlag + '</div>';
            var strA = '<div class="fr rb"><a  onclick="evaluateBefore(\'' + orderNum + '\' ,\'' + href2 + '\')">立即评价</a></div>';
            /*var strA = '<div class="fr rb"><a  href="'+href2+'">立即评价</a></div>';*/
            var strB = '<div class="fr ra"><a   href="' + href3 + '">查看评价</a></div>';
            strHtml += statusStr + (commentState == "1" || commentState == "2" || commentState == "3" || commentState == "4" || commentState == "5" || commentState == "6" ? strB : strA) + '<div class="fr ra1"><a  href="' + href1 + '">订单详情</a></div></li>';
        } else if (statusFlag == "订单取消" || statusFlag == "已退款" || statusFlag == "已取消") {
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">订单状态：</span>' + statusFlag + '</div>';
            var strA = '<div class="fr rb"><a  href="' + href4 + '">您的建议</a></div>';
            var strB = '<div class="fr ra"><a   href="' + href5 + '">查看建议</a></div>';
            strHtml += statusStr + (from == "RV" ? "" : (commentState == "1" ? strB : strA)) + '<div class="fr ra1"><a  href="' + href1 + '">订单详情</a></div></li>';
        } else {
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">订单状态：</span>' + statusFlag + '</div>'
                + '<div class="fr ra2"><a  href="' + href1 + '">订单详情</a></div>';
            strHtml += statusStr + "</li>";
        }

        strHtml += '<li class="hh6 line"><div class="hhd6 color-hiu"><span class="frcl">下单时间：</span>' + acceptDate + '</div></li>' +
            '</ul>';

        $(".listArea").append(strHtml);

        //单页面特殊处理广告位重新加载
        advertPosition();
    });
}

//'<li class="hh1 line"><a href="'+href1+'">订单编号：'+orderNum+'</a></li>'
$("#open_zxkfsearch").click(function () {
    var exCode = getUrlParam("exCode");
    if (exCode == "kbxcx") {
        wx.miniProgram.navigateTo({url: '/pages/kfonline/kfonline'});
    } else {
        window.location.href = "http://kf.bbn.com.cn:8085/cust/users.jsp?channel=kanban";
    }
})