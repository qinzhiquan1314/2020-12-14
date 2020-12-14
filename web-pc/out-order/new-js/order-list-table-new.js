/**************pc test************/
//加载页面时查询
var resultCallback = ''
var trouble = 1
var idx = 0;
$(function () {
    $(document).data({a: getUrlParam('a'), b: getUrlParam('b')})
    initDataMe()
    $(".nav_top li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $(".container").eq(index).show().siblings('.container').hide()
        var total = $(this).attr('total');
        if (total && total > 0) {
            $('.content').hide();
        } else {
            $('.content > span').html('根据当前号码，没有查询到订单！');
            $('.content').show();
        }
    })
    $('#btn').click(function () {
        window.location.href = getOutUrl(getRootPath_web(), '/web-pc/out-order/new-page/cheak-the-order.html?&userName=' + userName + '&exCode=' + exCode + '&callCode=' + callCode);
    });
});

function initDataMe() {
    orderListObj.initTable(resultCallback, '#table1', 'phone');
    orderListObj.initTable(resultCallback, '#table2', 'serial');
    orderListObj.initTable(resultCallback, '#table3', 'trouble');
}

//本页面对象
var orderListObj = {
    //初始table数据
    initTable: function (callback, div, type) {
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
            data.phoneNumber = ''
            data = JSON.stringify(data);
            contentType = 'application/json;charset=UTF-8';
        }
        // boorstrop插件
        $(div).bootstrapTable('destroy')
        $(div).bootstrapTable({
            url: url
            , toggle: "table"
            , method: "post"
            , ajaxOptions: {headers: $(document).data()}
            , contentType: contentType
            , queryParams: "queryParams"
            , pagination: false
            , sidePagination: "server"
            , pageNumber: "1"
            , pageSize: "10"
            , showRefresh: false
            , showToggle: false
            , showPaginationSwitch: false
            , showColumns: false
            , search: false
            , searchAlign: "left"
            , sortName: "menuid"
            , sortOrder: "asc"
            , queryParams: function (params) {
                return data
            }
            , onLoadError: function () {  //加载失败时执行
                console.info("加载数据失败");
            }
            , responseHandler: function (res) {
                $(div).parents('.container').attr('total', res.total)
                $('#uls>li').eq($(div).parents('.container').attr('data-index')).attr('total', res.total ? res.total : 0)
                $('#uls>li>span').eq($(div).parents('.container').attr('data-index')).html('(' + res.total ? res.total : 0 + ')');
                if ($('#uls>.active').attr('total') && $('#uls>.active').attr('total') > 0) {
                    $('#tableBoxCon>.tableBox').eq($('#uls>.active').index()).show()
                    $('.empty').hide()
                } else {
                    $('#tableBoxCon>.tableBox').eq($('#uls>.active').index()).hide()
                    $('.empty').show()
                }
                var obj = {total: 0, rows: []};
                obj.total = res.total;
                obj.rows = res.rows;
                return obj;
            }
        });
    }
    //数据获取
    , actionFormatter: function (value, row, index) {  //表格超链接  订单状态
        if (row.statusFlag == "已完成" || row.statusFlag == "订单完成") {
            if (row.commentState == 1 || row.commentState == 2 || row.commentState == 3 || row.commentState == 4 || row.commentState == 5 || row.commentState == 6 || row.commentState == 7) {
                return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showHistory apa2">查看评价</a></p>';     //订单已完成已评价
            } else {
                return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAssess apa2">立即评价</a></p>'; //订单已完成未评价
            }
        } else if (row.statusFlag == "订单取消" || row.statusFlag == "已退款" || row.statusFlag == "已取消") {
            if (row.commentState == 1) {
                return '<p class="a-p1 finish">' + row.statusFlag + '</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAdviseHistory apa2">查看建议</a></p>';     //订单已完成已评价
            } else if (row.from == "RV") {
                return '<p class="a-p1">' + row.statusFlag + '</p><p class="a-p1"><a class="showFlow apa5">订单详情</a></p>';
            } else {
                return '<p class="a-p1 finish">' + row.statusFlag + '</p><p class="a-p1"><a class="showFlow apa1">订单详情</a><a class="showAdvise apa2">您的建议</a></p>'; //订单已完成未评价
            }
        }
        return '<p class="a-p1">' + row.statusFlag + '</p><p class="a-p1"><a class="showFlow apa5">订单详情</a></p>';
    }
    //装机地址-单元格样式
    , addFormatter: function (value, row, index) {
        return '<p class="td-address">' + value + '</p>';
    }
    , numFormatter: function (value, row, index) {
        var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" : row.exTradeId;
        var ioTradeId = checkNullOrEmptyStr(row.ioTradeId) ? "" : row.ioTradeId;
        if (ioTradeId !== "") {
            return '<p class="exTradeId" href="javascript:;">' + checkLen(ioTradeId) + '</p>';
        } else {
            return '<p class="exTradeId" href="javascript:;">' + checkLen(exTradeId) + '</p>';
        }
    }
    , showRightLayer_assess: function (layerId, layerTitle, layerUrl) {
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
            , end: function () {
                if (extId != "") {
                    var queryUrl = orderListObj.urlSearch();
                    $('#table').bootstrapTable("destroy");
                    $('#table').bootstrapTable({
                        url: queryUrl
                    })
                } else {
                    var str = sessionStorage.getItem("orderListData");
                    var resData = JSON.parse(str);
                    if (resData) {
                        $('#table').bootstrapTable("destroy");
                        $('#table').bootstrapTable({
                            data: resData
                        })
                        // sessionStorage.removeItem('/order-search-validate/resData');
                        return false;
                    }
                }
            }
        });

    }
}


/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
    //展示流程
    'click .showFlow': function (e, value, row, index) {
        var orderNum = row.orderNum;
        var orderNum2;
        var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" : row.bssSubscribeId;
        var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" : row.exTradeId;
        if (exTradeId !== "") {	//营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
            orderNum2 = exTradeId;
        } else {
            orderNum2 = bssSubscribeId;
        }
        var htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/flow-list.html?orderNum=" + orderNum + "&orderNum2=" + orderNum2);
        showRightLayer("flow" + orderNum, "订单详情", htmlUrl);
    },
    //展示评价
    'click .showAssess': function (e, value, row, index) {
        var expNo = checkNullOrEmptyStr(row.expNo) ? "" : row.expNo;
        var orderNum = row.orderNum;
        var flag = 0;
        var phoneNum = "";
        //var netTypeCode = row.member[0].netTypeCode;
        var orderListUrl = getOutUrl(getRootPath_web(), "/evaluation/alertEvaluation?flag=out&orderNum=" + orderNum);
        $.ajax({
            type: 'POST',//测试  GET  生产POST
            async: false,
            url: orderListUrl,
            dataType: 'json',
            /* beforeSend: function () {
                  showLoader();
             },
             complete:function(){
                  hideLoader();
             },*/
            success: function (resData) {
                console.log(resData)
                if (resData == null) return;
                var state = resData.state;
                if (state == 1) {
                    flag = 0;    //展示评价，没有短信验证
                } else if (state == 2) {
                    // 这里注掉了flag=1，意思是，不管前面是否是使用短信验证码方式查询订单（使用身份证），都不再使用短信的方式添加评价
                    // flag=1;
                    flag = 0;
                    phoneNum = resData.phoneNum;
                } else if (state == 0) {
                    flag = 2;//不能评价
                    layer.msg(resData.message, {
                        time: 2000 //2s后自动关闭
                    });
                }
            },
            error: function () {// 未成功发送，提醒发送不成功
                layer.msg('系统原因', {
                    time: 2000 //2s后自动关闭
                });
            }
        });


        var htmlUrl = "/404.html";
        //IOM
        if (row.from == "IOM" || row.from == "CSM") {
            var isComp = false;
            $.each(row.member, function (index, obj) {
                if (obj.netTypeCode == "CP") {
                    isComp = true;
                }
            });
            if (isComp || (row.netTypeCode == 40 && row.productCodeSub != 3) || row.netTypeCode == 56) {
                // 宽融
                if (row.haveI2003Flag) {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                } else {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                }
            } else if (row.netTypeCode == 67) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess.html?commentType=5&orderNum=" + orderNum + "&expNo=" + expNo);
            } else if (row.netTypeCode == 40 && row.productCodeSub == 3) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess.html?commentType=2&orderNum=" + orderNum + "&expNo=" + expNo);
            } else {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
            }

        }
        //意向单
        if (row.from == "IO") {
            if (row.netTypeCode == 67) {
                //光快、光转
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess.html?commentType=5&orderNum=" + orderNum + "&expNo=" + expNo);
            }
            //移网
            else if (row.netTypeCode == 50) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
            } else {
                //宽带融合
                if (row.haveI2003Flag) {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                } else {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                }
            }
        }
        //订单中心
        if (row.from == "OC" || row.from == "IO2") {
            var isComp = false;
            var isbroad = false;
            var isLand = false;
            $.each(row.member, function (index, obj) {
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

            if (isComp || isbroad) {
                if (row.haveI2003Flag) {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                } else {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-broadband-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                }
            } else if (isLand) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess.html?commentType=5&orderNum=" + orderNum + "&expNo=" + expNo);
            } else {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
            }

        }

        if (row.from == "SHOP") {
            htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-shiftNet-new.html?commentType=4&orderNum=" + orderNum + "&expNo=" + expNo);
        }
        if (row.from == "WYS") {
            htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-shiftNet-new.html?commentType=7&orderNum=" + orderNum + "&expNo=" + expNo + '&serviceType=' + row.serviceType + '&cloudDeliverMode=' + row.cloudDeliverMode);
        }
        /*if(netTypeCode == "41" || netTypeCode == "67"){
            //光快线专线
            var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess.html?commentType=2&orderNum="+orderNum+"&expNo="+expNo);
        }else if(netTypeCode == "40" || netTypeCode == "56" || netTypeCode == "CP"){
            // 宽带融合
            var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-broadband.html?commentType=3&orderNum="+orderNum+"&expNo="+expNo);
        }
        else{
            //移网
            var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-shiftNet.html?commentType=4&orderNum="+orderNum+"&expNo="+expNo);
        }*/
        htmlUrl = htmlUrl + "&flag=" + flag + "&phoneNum=" + phoneNum + '&productName=' + row.productName + "&serialNumber=" + row.serialNumber + '&productId=' + row.productId + '&commId=' + row.commId;
        //showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
        if (flag != 2) {
            orderListObj.showRightLayer_assess("assess" + orderNum, "订单评价", htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
        }
    },
    //展示已评价数据
    'click .showHistory': function (e, value, row, index) {
        var orderNum = row.orderNum;

        console.log(row);
        var htmlUrl = "";
        var htmlUrl = "/404.html";
        var expNo = checkNullOrEmptyStr(row.expNo) ? "" : row.expNo;
        if (row.from == "IOM" || row.from == "CSM") {
            console.log('IOM')
            var isComp = false;
            $.each(row.member, function (index, obj) {
                if (obj.netTypeCode == "CP") {
                    isComp = true;
                }
            });
            if (isComp || (row.netTypeCode == 40 && row.productCodeSub != 3) || row.netTypeCode == 56) {
                if (row.haveI2003Flag) {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-broadband-other-new.html?commentType=3&orderNum=" + orderNum + "&expNo=" + expNo);
                } else {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
                }
            } else if (row.netTypeCode == 67 || (row.netTypeCode == 40 && row.productCodeSub == 3)) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show.html?commentType=2&orderNum=" + orderNum);
            } else {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
            }
        }
        if (row.from == "IO") {
            console.log('IO')
            if (row.netTypeCode == 67) {
                //光快、光转
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show.html?commentType=2&orderNum=" + orderNum);
            } else if (row.netTypeCode == 50) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
            } else {
                //宽带融合
                if (row.haveI2003Flag) {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                } else {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
                }
            }
        }

        if (row.from == "OC" || row.from == "IO2") {
            console.log('OC')
            var isComp = false;
            var isbroad = false;
            var isLand = false;
            $.each(row.member, function (index, obj) {
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
            if (isComp || isbroad) {
                if (row.haveI2003Flag) {
                    console.log(expNo);
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-broadband-other-new.html?commentType=6&orderNum=" + orderNum + "&expNo=" + expNo);
                } else {
                    htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-broadband-new.html?commentType=3&orderNum=" + orderNum);
                }
            } else if (isLand) {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show.html?commentType=2&orderNum=" + orderNum);
            } else {
                htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
            }

        }

        if (row.from == "SHOP") {
            htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-show-shiftNet-new.html?commentType=4&orderNum=" + orderNum);
        }
        if (row.from == "WYS") {
            htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-assess-shiftNet-new.html?commentType=7&orderNum=" + orderNum + "&expNo=" + expNo + '&serviceType=' + row.serviceType + '&cloudDeliverMode=' + row.cloudDeliverMode);
        }
        /*if(netTypeCode == 41 || netTypeCode == 67){
            //光快线专线
            var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-show.html?commentType=2&orderNum="+orderNum);
        }else if(netTypeCode == 40 || netTypeCode == 56 || netTypeCode == "CP"){
            // 宽带融合
            var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-show-broadband.html?commentType=3&orderNum="+orderNum);
        }
        else{
            //移网
            var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-show-shiftNet.html?commentType=4&orderNum="+orderNum);
        }*/
        //var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess-show.html?orderNum="+orderNum);
        htmlUrl = htmlUrl + '&productName=' + row.productName + "&serialNumber=" + row.serialNumber + '&productId=' + row.productId;
        showRightLayer("assess-show" + orderNum, "我的评价", htmlUrl);
    },
    //提出建议
    'click .showAdvise': function (e, value, row, index) {
        var expNo = checkNullOrEmptyStr(row.expNo) ? "" : row.expNo;
        var orderNum = row.orderNum;
        var htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-advise.html?orderNum=" + orderNum + "&expNo=" + expNo);
        //showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
        orderListObj.showRightLayer_assess("assess" + orderNum, "您的建议", htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
    },
    //展示已提交建议
    'click .showAdviseHistory': function (e, value, row, index) {
        var orderNum = row.orderNum;
        var htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/order-advise-show.html?orderNum=" + orderNum);
        showRightLayer("assess-show" + orderNum, "我的建议", htmlUrl);
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值 encodeURI()编码/decodeURI()解码
}

function getOutUrl(uri, query) {
    var c = $(document).data();
    var str = 'a=' + c.a + '&b=' + c.b;
    if (query.indexOf("?") > 0) {
        str = '&' + str;
    } else {
        str = '?' + str;
    }
    var url = uri + query + str;
    return url;
}