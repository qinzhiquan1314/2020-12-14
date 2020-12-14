/*************对内-PC-订单查询*********/
$(document).ready(function() {
    //进入页面加最小高度panelB
    setScreenHeight1('.panelB', "headBox");
    //浏览器尺寸变化响应事件:当浏览器尺寸变化时仍设定最小高度panelB
    window.onresize = function() {
        setScreenHeight1('.panelB', "headBox");
    };
    initEvent();
    //初始化input框 兼容ie8
    // inputInit();

    // testTbObj.validateInput();

    //获取本地值
    // getListLocalData()

    init();
    //判断是否有页面跳转
    var orderSearchType = getUrlParam("orderSearchType");
    var bssSubscribeId = getUrlParam("bssSubscribeId");
    if (orderSearchType != null && orderSearchType != "") {
        $("#orderType").val(orderSearchType);
        $("#orderNum").val(bssSubscribeId);
        $("#id1").find("button[type=submit]").click();
    }
});

function getItem(key) {
    var r = null;
    if (window.sessionStorage) {
        r = sessionStorage.getItem(key);
    } else {
        r = $.cookie(key);
    }
    if (!r) return null;
    r = JSON.parse(r);
    return r;
}

function getItemC(key) {
    var r = null;
    if (window.sessionStorage) {
        r = sessionStorage.getItem(key);
    } else {
        r = $.cookie(key);
    }
    return r;
}

function setItemC(key, value) {
    if (window.sessionStorage) {
        return sessionStorage.setItem(key, value);
    } else {
        return $.cookie(key, value);
    }
}

function setItem(key, value) {
    var str = JSON.stringify(value);
    if (window.sessionStorage) {
        return sessionStorage.setItem(key, str);
    } else {
        return $.cookie(key, str);
    }
}

function removeItem(key) {
    if (window.sessionStorage) {
        return sessionStorage.removeItem(key);
    } else {
        return $.cookie(key, null);
    }
}

function init() {
    var c = getItemC("web-in-pc/order-list/customerName");
    var o = getItem("web-in-pc/order-list");
    console.log(o);
    if (o) {
        $("#searchForm > .form-body > div").each(function() {
            var _this = this;
            if (this.id == o.id) {
                $("ul.nav-tabs > li > a").each(function() {
                    if ($(this).attr("div-id") == o.id) {
                        $(this).click()
                    }
                });
                for (var i in o) {
                    if (o[i]) {
                        $(this).find(':text').each(function() {
                            if (this.id && this.id == i) {
                                $(this).val(o[i]);
                                if (this.id == 'accNum' || this.id == 'serialNumber' || this.id == 'teleNum') {
                                    $(this).focus();
                                }
                            }
                        });
                    }
                }
                setTimeout(function() {
                    $(_this).find('button[type=submit]').click();
                }, 100)

                return false;
            }
        });
        $('#customerName').val(c);
    } else {
        $("ul.nav-tabs > li > a").each(function() {
            $(this).click();
            return false;
        });
    }
}

function initEvent() {
    var _this = this;
    $(document).on("click", ".panelB > .container > .nav-tabs > .change > a", function() {
        var $this = $(this);
        $(".nav-tabs li").removeClass("active");
        $(this).parent().addClass("active");
        $("#searchForm > .form-body > div").each(function() {
            if ($this.attr("div-id") == this.id) {
                this.style.display = "block";
                $(this).find(':text').each(function() {
                    var r = $(this).attr('initFunc');
                    if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
                        placeholder($(this));
                    };
                    if ($(this).attr('initFunc')) {
                        $(this).val(eval($(this).attr('initFunc')));
                    }
                });
            } else {
                $(this).find(':text').val('');
                _this.removeItem("web-in-pc/order-list");
                _this.removeItem("web-in-pc/order-list/customerName");
                $('#table').bootstrapTable("destroy");
                this.style.display = "none";
            }
        });

        return;

    });
    $(document).on("click", "#searchForm > .form-body > div button[type=submit]", function() {
        var getParentDiv = function(div) {
            if ($(div) && $(div).attr('id') && ($(div).get(0).tagName == 'DIV' || $(div).get(0).tagName == 'div')) {
                return div;
            } else {
                return getParentDiv($(div).parent());
            }
        };
        try {
            checkPC()
        } catch (e) {
            return;
        }
        var _thisParentDiv = getParentDiv(this);
        var rid = _thisParentDiv.get(0).id;
        if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
            $('#' + rid).find(':text').each(function() {
                if ($(this).attr('datavalue') == $(this).val()) {
                    $(this).val('');
                }
            });
        }
        $('#table').bootstrapTable("destroy");
        var formatVal = function(value) {
            if (!value || value == null || value == 'null') value = '';
            return value;
        }
        $('#table').bootstrapTable({
            method: "post",
            url: testTbObj.idSearch,
            columns: [{
                field: 'exTradeId',
                title: '订单编号',
                formatter: function(value, row) {
                    var str = '<span>营业订单号：</span>' + '<span>' + formatVal(row.bssSubscribeId) + '</span><br>';
                    str += '<span>渠道订单号：</span>' + '<span>' + formatVal(row.exTradeId) + '</span><br>';
                    str += '<span>沃易售订单号：</span>' + '<span>' + formatVal(row.xxTradeId) + '</span>';
                    return str;
                }
            }, {
                field: 'state',
                title: '订单状态',
                formatter: function(value, row) {
                    var source = formatVal(row.exTradeSource);
                    var str = '<span>下单时间：</span>' + '<span>' + formatVal(row.acceptDate) + '</span><br>';
                    str += '<span>受理渠道类型：</span>' + '<span>' + formatVal(row.exTradeInmode) + '</span><br>';
                    str += '<span>订单状态：</span>' + '<span>' + formatVal(row.orderStateDesc) + '</span><br>';
                    str += '<span>当前环节：</span>' + '<span>' + formatVal(row.currentJobName) + '</span>';
                    return str;
                }
            }, {
                field: 'orderInfo',
                title: '订单信息',
                formatter: function(value, row) {
                    console.log(row)
                    var serial = formatVal(row.serialNumber);
                    if(row.member && row.member.length == 1) {
                        if(row.member[0].roleId){
                            var role = null;
                            try{
                                role = parseInt(row.member[0].roleId);
                            }catch (e) {
                                // do nothing
                            }
                            if(role == 7) {
                                serial = "";
                            }
                        }
                    }
                    var str = '<span>产品名称：</span>' + '<span>' + formatVal(row.productName) + '</span><br>';
                    str += '<span>业务号码：</span>' + '<span>' + serial + '</span><br>';
                    str += '<span>业务类型：</span>' + '<span>' + formatVal(row.busChannel) + '</span><br>';
                    str += '<span>用户类型：</span>' + '<span>' + (formatVal(row.userTag) == 'N' ? '新用户' : '老用户') + '</span><br>';
                    str += '<span>订单类型：</span>' + '<span>' + formatVal(row.orderTypeCode) + '</span><br>';
                    str += '<span>宽带归属分公司：</span>' + '<span>' + formatVal(row.quju) + '</span><br>';
                    str += '<span>手机号码归属：</span>' + '<span>' + formatVal(row.provinceName) + '</span>';
                    return str;
                }
            }, {
                field: 'custInfo',
                title: '客户信息',
                formatter: function(value, row) {
                    var str = '<span>客户名称：</span>' + '<span>' + formatVal(row.customerName) + '</span><br>';
                    str += '<span>联系电话：</span>' + '<span>' + formatVal(row.contactsTel) + '</span><br>';
                    str += '<span>证件号码：</span>' + '<span>' + formatVal(row.credentialCode) + '</span><br>';
                    str += '<span>是否采集三证：</span>' + '<span>' + formatVal(row.nonVal) + '</span><br>';
                    str += '<span>装机地址：</span>' + '<span>' + formatVal(row.standAddrName) + '</span>';
                    return str;
                }
            }, {
                field: 'postInfo',
                title: '配送信息',
                formatter: function(value, row) {
                    var str = '<span>配送方式：</span>' + '<span>' + formatVal(row.sendMode) + '</span><br>';
                    str += '<span>联系人：</span>' + '<span>' + formatVal(row.receiverName) + '/' + formatVal(row.receiverMobile) + '</span><br>';
                    str += '<span>物流公司：</span>' + '<span>' + formatVal(row.expComName) + '</span><br>';
                    str += '<span>物流单号：</span>' + '<span>' + formatVal(row.expNo) + '</span><br>';
                    str += '<span>配送地址：</span>' + '<span>' + formatVal(row.receiverAddress) + '</span>';
                    return str;
                }
            }, {
                field: 'operate',
                title: '订单详情',
                formatter: function() {
                    return '<button class="btn btn-orange ">订单详情</button>';
                },
                events: {
                    'click .btn-orange': function(event, value, row, index) {
                        var orderNum = row.orderNum;
                        var orderNum2;
                        var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" : row.bssSubscribeId;
                        var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" : row.exTradeId;
                        var ioTradeId = checkNullOrEmptyStr(row.ioTradeId) ? "" : row.ioTradeId;
                        /*if (exTradeId !== "") { //营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
                            orderNum2 = exTradeId;
                        } else {
                            orderNum2 = bssSubscribeId;
                        }*/

                        if (exTradeId !== "") { //营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
                            orderNum2 = exTradeId;
                        } else if (ioTradeId !== "") {
                            orderNum2 = ioTradeId;
                        } else {
                            orderNum2 = bssSubscribeId;
                        }
                        setItem("web-in-pc/order-selected", row);
                        var htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/in-order/page/flow-list-new.html?orderNum=" + orderNum + "&orderNum2=" + orderNum2);
                        location.href = htmlUrl;
                    }
                }
            }],
            onLoadSuccess: function(data) {

            },
            responseHandler: function(res) { //获取数据解析
                var arr = res.rows;
                var p = $("#searchForm").serialize()
                var r = getObject(p);
                r.id = _thisParentDiv.get(0).id;
                _this.setItem("web-in-pc/order-list", r);
                if ($('#customerName').val()) {
                    _this.setItemC("web-in-pc/order-list/customerName", $('#customerName').val());
                }
                var obj = {
                    total: 0,
                    rows: []
                };
                obj.total = res.total ? res.total : 0;
                obj.rows = res.rows;
                return obj;
            }

        });
    });

    /**
     * 在线反馈界面跳转
     */
    $("div .floatFrame").click(function() {
        //$(location).attr('href', "/queryCenter/web-pc/in-order/page/feedBack.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05");

        $(location).attr('href', "/queryCenter/web-monitor/page/feedBack.html?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D");
    });

    $(document).on("click", "#zq_Search", function() {
            window.location.href = getOutUrl(getRootPath_web(), "/web-pc/in-order/page/order-zqza-list-new.html");
        })
        // 业务号码查询
    $("#id2").find(":text").focus(function() {
        $("#id2").find(":text").each(function() {
            $(this).val('');
            $(this).attr('thisQuery', 'false');
            $(this).css('backgroundColor', '#DEDEDE');
        });
        $(this).css('backgroundColor', '#fff');
        $(this).attr('thisQuery', 'true');
        inputINit();
    });
}

//本页面对象
var testTbObj = {
    //变量
    //urlSearch: getRootPath_web() + "/js/data/table-pc-test.json?flag=int",
    //serilUrlSearch:  getRootPath_web() + "/js/data/table-pc-test.json?flag=int",
    testSearch: getOutUrl(getRootPath_web(), "/js/data/order-list-in.json?flag=int"),
    orderSearch: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=pcInt"),
    serilUrlSearch: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=pcInt"),
    idSearch: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=pcInt"),
    dateSearch: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=pcInt"),
    //th超链接
    actionFormatter1: function(value, row, index) {
        value = checkNullOrEmptyStr(value) ? "" : value;
        return '<a class="orderNum" >' + value + '</a> ';
    },
    actionFormatter2: function(value, row, index) {
        value = checkNullOrEmptyStr(value) ? "" : value;
        return '<a class="bssSubscribeId" >' + checkLen(value) + '</a> ';
    },
    actionFormatter3: function(value, row, index) {
        var ioTradeId = checkNullOrEmptyStr(row.ioTradeId) ? "" : row.ioTradeId;
        return '<a class="exTradeId" href="javascript:;">' + checkLen(ioTradeId) + '</a>';
    },

    actionFormatter4: function(value, row, index) {
        var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" : row.exTradeId;
        return '<a class="exTradeId" href="javascript:;" >' + checkLen(exTradeId) + '</a> ';
    },
}

//底部广告
function Advertisement() {
    $.ajax({
        type: 'POST',
        data: {
            imgKey: "0"
        }, //后台传递的参数参数
        dataType: 'json',
        url: getOutUrl(getRootPath_web(), "/trade/commonPicture?imgKey=" + "0"),
        success: function(data) {
            //alert(data.name);
            //alert("../images/"+data.name);
            $("#adBtm").attr("src", "../images/" + data.name);
        },
        error: function(data) {
            alert('响应失败！');
        }
    });
}

Advertisement();


//兼容IE8
function inputINit() {
    if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
        placeholder("#serialNumber");
        placeholder("#accNum");
        placeholder("#teleNum");
    };
}

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
    return iDays
}

/*url查询结束*/
////表格  - 操作 - 事件
//点击营业订单号和渠道订单号跳转对内订单详情页
window.actionEvents = {
    //跳转
    'click .bssSubscribeId, .exTradeId': function(e, value, row, index) {
        var orderNum = row.orderNum;
        var orderNum2;
        var bssSubscribeId = checkNullOrEmptyStr(row.bssSubscribeId) ? "" : row.bssSubscribeId;
        var exTradeId = checkNullOrEmptyStr(row.exTradeId) ? "" : row.exTradeId;
        var ioTradeId = checkNullOrEmptyStr(row.ioTradeId) ? "" : row.ioTradeId;
        /*if (exTradeId !== "") { //营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
            orderNum2 = exTradeId;
        } else {
            orderNum2 = bssSubscribeId;
        }*/

        if (exTradeId !== "") { //营业订单号和渠道订单号都不为空，渠道订单号优先显示；否则显示有数据的订单号，都为空则显示空
            orderNum2 = exTradeId;
        } else if (ioTradeId !== "") {
            orderNum2 = ioTradeId;
        } else {
            orderNum2 = bssSubscribeId;
        }

        var htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/in-order/page/flow-list.html?orderNum=" + orderNum + "&orderNum2=" + orderNum2);
        location.href = htmlUrl;
    }
}

function getObject(str) {
    var obj = {};
    if (str) {
        var queryArray = str.split('&');
        for (var i = 0; i < queryArray.length; i++) {
            var temp = queryArray[i].split('=');
            if (temp.length > 1) {
                obj[temp[0]] = temp[1];
            }
        }
    }
    return obj;
}