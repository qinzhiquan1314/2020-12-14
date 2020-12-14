var idx = 0;
var aIndex = {};
var userName, callCode, exCode, userName2;
$(function () {
    initParam();
    initHeader();
    initData();
    initDiv();
    initEvent();
});

// 陆师傅不愿意用这个了，还得写上数据
function initParam() {
    var s = getUrlParam('userName');
    this.userName = s && s != '' ? s : getUrlParam('serial_number');
    this.exCode = getUrlParam('b');
    this.callCode = getUrlParam('callCode');
    this.userName2 = getUrlParam('userName2');

}

function initDiv() {
    if (getUrlParam('b') == "kbxcx") {
        $('#accountInfo').show();
    }
}

function initHeader() {
    $(document).data({a: getUrlParam('a'), b: getUrlParam('b')})
}

function initEvent() {
    if (breakInit()) {
        return;
    }
    $(".tab_list li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $("#result > div").eq(index).show().siblings().hide();
        var total = $(this).attr('total');
        if (total && total > 0) {
            $('.content').hide();
        } else {
            $('.content > span').html('根据当前号码，没有查询到订单！');
            $('.content').show();
        }
    })
    $('#queryOrderButton').click(function () {
        var l = '/web-phone/web-out-order/new-page/check-the-order.html';
        l = getOutUrl(getRootPath_web(), l);
        window.location.href = l;
    });
    $('#accountInfo > button').click(function () {
        wx.miniProgram.navigateTo({url: '/pages/number/number'});
    });
    $('#troubleHyperLink').click(function () {
        if (exCode == "kbxcx") {
            wx.miniProgram.navigateTo({url: '/pages/adsl/adsl'});
        } else {
            window.location.href = "http://wx.bbn.com.cn/wx/thirdparty/palmhall/asdlmatter/asdl_matterquery.jsp";
        }
    });
    $('#customerLink').click(function () {
        if (exCode == "kbxcx") {
            wx.miniProgram.navigateTo({url: '/pages/kfonline/kfonline'});
        } else {
            window.location.href = "http://kf.bbn.com.cn:8085/cust/users.jsp?channel=kanban";
        }
    });
    $('#myLink').click(function () {

    });
}

function breakInit() {
    if (window.location.href.indexOf('/web-phone/web-out-order/new-page/check-the-order.html') > -1) {
        return true;
    }
}

function initData() {
    if (breakInit()) {
        return;
    }
    // 这个地方回头再说
    $('#serialNumberShow').html(getUrlParam('serial_number'));
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


function getData(callback, div, type) {
    var data = {};
    var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    var url;
    if (type == 'serial') {
        url = getRootPath_web() + "/newtrade/queryOrderOutNum"
    } else if (type == 'phone') {
        url = getRootPath_web() + "/newtrade/queryOrderOutPhone"
    } else if (type == 'trouble') {
        url = "https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/balkIndex2";
        data.smcode = '885249';
        data.phoneNumber = this.userName;
        data = JSON.stringify(data);
        contentType = 'application/json;charset=UTF-8';
    }
    url = getOutUrl(url, '');
    $.ajax({
        type: 'POST',
        data: data,
        headers: $(document).data(),
        dataType: 'json',
        contentType: contentType,
        url: url,
        success: function (r) {
            callback(r, div, type);
        },
        error: function (data) {
            alert('响应失败！');
        }
    });
}

function troubleResultCallback(r, div) {
    var that = this;
    if (r && r.respCode == '200') {
        $('.tab > .tab_list > .last').html('政企报障订单(' + r.total + ')');
        $('.tab > .tab_list > .last').attr('total', r.total);
        for (var i = 0; i < r.data.length; i++) {
            var html = $('#trouble-model').html();
            var item = r.data[i];
            $('#' + div).append(html);
            $('#' + div).find('[newResult=true]').each(function () {
                var _this = $(this);
                var commentState = item.commentState;
                var from = item.from;
                _this.find('.hh1 > .detail > .sp2').html(item.balkNo);
                _this.find('.hh2 > .de-hh2 > .sp4').html(item.stlNo);
                _this.find('.hh3 > .de-hh3 > .sp6').html(item.allegeUnitName);
                _this.find('.hh5 > .de-hh5 > .sp10').html(item.acceptTime);
                if (item.statusDesc && item.statusDesc.length > 0) {
                    var a = item.statusDesc[0];
                    for (var j = 1; j < item.statusDesc.length; j++) {
                        a = a + ',' + item.statusDesc[j];
                    }
                    _this.find('.hh4 > .de-hh4 > .sp88').html(a);
                } else {
                    if (item.status) {
                        _this.find('.hh4 > .de-hh4 > .sp88').html(item.status);
                    }
                }
                var clickBehavior = null;
                var clickLabel = null;
                if (item.markFlag == '0') {
                    clickLabel = "立即评价";
                    clickBehavior = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-zqza-assess-new.html?qryType=balkNo&qryNumber=" + item.balkNo + "&secCode=" + item.secCode + "&phoneNum=" + this.userName + "&smcode=");
                } else if (item.markFlag == '1') {
                    clickLabel = "查看评价";
                    clickBehavior = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-zqza-assess-show-new.html?qryType=balkNo&qryNumber=" + item.balkNo);
                }
                if (getBLen(item.status) < 10) {
                    _this.find('.hh6 > .de-hh6 > .sp12').html(item.status);
                }
                if (clickLabel) {
                    _this.find('.hh6 > .de-hh6 > .btn1').html(clickLabel);
                    _this.find('.hh6 > .de-hh6 > .btn1').click(function () {
                            window.location.href = clickBehavior;
                        }
                    );
                } else {
                    _this.find('.hh6 > .de-hh6 > .btn1').hide();
                }

                _this.find('.hh6 > .de-hh6 > .btn2').html('故障处理详情');
                _this.find('.hh6 > .de-hh6 > .btn2').click(function () {
                        window.location.href = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/flow-zqza-list.html?balkNo=" + item.balkNo + "&secCode=" + item.secCode + "&status=" + item.status);
                    }
                );
                _this.attr('newResult', false);
                _this.show();
            });
        }
    }
    idx++;
}

function resultCallback(r, div, type) {
    var that = this;
    if (r && r.state == '1') {
        if (type == 'serial') {
            $('.tab > .tab_list > .li2').html('业务号码订单(' + r.total + ')');
            $('.tab > .tab_list > .li2').attr('total', r.total);
        } else if (type == 'phone') {
            $('.tab > .tab_list > .li1').html('联电订单(' + r.total + ')');
            $('.tab > .tab_list > .li1').attr('total', r.total);
        }
        if (r.rows) {
            for (var i = 0; i < r.rows.length; i++) {
                var html = $('#model').html();
                var item = r.rows[i];

                $('#' + div).append(html);
                $('#' + div).find('[newResult=true]').each(function () {
                    var _this = $(this);
                    var commentState = item.commentState;
                    var from = item.from;
                    var href = that.getHref(item);
                    var num = item.exTradeId ? item.exTradeId : item.bssSubscribeId ? item.bssSubscribeId : '';
                    _this.find('.hh1 > .detail > .sp2').html(num);
                    _this.find('.hh2 > .de-hh2 > .sp4').html(item.productName);
                    _this.find('.hh3 > .de-hh3 > .sp6').html(item.customerName);
                    _this.find('.hh4 > .de-hh4 > .sp8').html(item.addrName);
                    _this.find('.hh5 > .de-hh5 > .sp10').html(item.acceptDate);
                    _this.find('.hh6 > .de-hh6 > .sp12').html(item.statusFlag);
                    var clickBehavior = null;
                    var clickLabel = null;

                    if (item.statusFlag == "订单完成" || item.statusFlag == "已完成") {
                        if (commentState == "1" || commentState == "2" || commentState == "3" || commentState == "4" || commentState == "5" || commentState == "6" || commentState == "7") {
                            clickBehavior = href.href3;
                            clickLabel = '查看评价';
                        } else {
                            clickBehavior = href.href2;
                            clickLabel = '立即评价';
                        }
                    } else if (item.statusFlag == "订单取消" || item.statusFlag == "已退款" || item.statusFlag == "已取消") {
                        if (from != 'RV') {
                            if (commentState == '1') {
                                clickBehavior = href.href5;
                                clickLabel = '查看建议';
                            } else {
                                clickBehavior = href.href4;
                                clickLabel = '您的建议';
                            }
                        }
                    } else {
                        clickBehavior = href.href1;
                    }
                    clickBehavior = clickBehavior + '&newPage=true';
                    if (clickLabel) {
                        _this.find('.hh6 > .de-hh6 > .btn1').html(clickLabel);
                        _this.find('.hh6 > .de-hh6 > .btn1').click(function () {
                                window.location.href = clickBehavior + "&flag=" + '0';


                            }
                        );
                    } else {
                        _this.find('.hh6 > .de-hh6 > .btn1').hide();
                    }

                    _this.find('.hh6 > .de-hh6 > .btn2').html('订单详情');
                    _this.find('.hh6 > .de-hh6 > .btn2').click(function () {
                            window.location.href = href.href1 + "&flag=" + '0';
                        }
                    );
                    _this.attr('newResult', false);
                    _this.show();
                })
            }
        }
    }
    idx++;
}

function getHref(item) {
    var orderNum = item.orderNum;
    var expNo = item.expNo;
    var exTradeId = item.exTradeId;
    var href1, href2, href3, href4, href5;
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
        } else {
            //宽带融合
            if (item.haveI2003Flag) {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-other-new.html?commentType=6&orderNum=" + orderNum);

            } else {
                href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
            }
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

    if (item.from == "SHOP" || item.from == "QYZX") {
        //移网
        href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
        href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
    }
    if (item.from == "WYS") {
        //移网
        href2 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-shiftNet-new.html?commentType=7&orderNum=" + orderNum + "&expNo=" + expNo);
        href3 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-assess-show-shiftNet-new.html?commentType=7&orderNum=" + orderNum);
    }
    href1 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/flow-list.html?orderNum=" + orderNum + "&orderNum2=" + exTradeId + '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId + '&phoneNum=' + item.phoneNum);
    href4 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-advise.html?orderNum=" + orderNum + "&expNo=" + expNo + '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId + '&phoneNum=' + item.phoneNum);
    href5 = getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-advise-show.html?orderNum=" + orderNum + '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId + '&phoneNum=' + item.phoneNum);//查看建议
    href2 += '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId + '&phoneNum=' + item.phoneNum;
    href3 += '&productName=' + item.productName + "&serialNumber=" + item.serialNumber + '&productId=' + item.productId + '&commId=' + item.commId + '&phoneNum=' + item.phoneNum;
    r = {};
    r.href1 = href1;
    r.href2 = href2;
    r.href3 = href3;
    r.href4 = href4;
    r.href5 = href5;
    return r;
}

function getOutUrl(uri, query) {
    var c = $(document).data();
    var str = 'a=' + c.a + '&b=' + c.b + '&userName=' + this.userName + '&exCode=' + this.exCode + '&callCode=' + this.callCode + '&userName2=' + this.userName2;
    if (query.indexOf("?") > 0) {
        str = '&' + str;
    } else {
        str = '?' + str;
    }
    var url = uri + query + str;
    return url;
}

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
                    , time: 2
                });
            }
        },
        error: function () {// 未成功发送，提醒发送不成功
            layer.open({
                content: '系统原因'
                , style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                , time: 2
            });
        }
    });
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值 encodeURI()编码/decodeURI()解码
}

function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

function showLoader() {
    $(".fakeloader").show();
    $(".fakeloader").fakeLoader({
        timeToHide: 60000,
        bgColor: "rgba(0,0,0,.2)",
        pos: 'absolute',// fakeloader Position
        top: '50%',  // fakeloader Top value
        left: '50%', // fakeloader Left value
        width: '100px', // fakeloader width
        height: '60px', // fakeloader Height
        marginTop: '-30px',//
        marginLeft: '-50px',//
        borderRadius: '10px',//
        spinner: "spinner2"//使用类型
    });
}

getBLen = function (str) {
    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
}

//加载等待 关闭
function hideLoader() {
    $(".fakeloader").hide();
}