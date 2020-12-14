/************对内-PC-流程查询**************/
$(document).ready(function() {
    //进入页面加最小高度panelB
    setScreenHeight1('.panelB', "headBox");
    window.onresize = function() {
        setScreenHeight1('.panelB', "headBox");
    };
    //初始加载该页面获取orderNum直接查询
    testTbObj.initTable();
});
//监听浏览器的后退事件
$(document).ready(function(e) {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function() {
            var hashLocation = location.hash;
            var hashSplit = hashLocation.split("#!/");
            var hashName = hashSplit[1];
            if (hashName !== '') {
                var hash = window.location.hash;
                if (hash === '') {
                    //调用自己的后退事件
                    goBack();
                }
            }
        });
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

$(function() {
    //input 提示语 placeholder ie兼容初始化
    inputInit();
    var o = getItem("web-in-pc/order-selected");
    if (o) {
        fillData($('#commInfoDialog'), o);
    }
});

/*placeholder兼容IE方法*/
function inputInit() {
    placeholder("#jobName");
}

function fillData(f, r) {
    if (r) {
        $('div', f).each(function() {
            var id = this.id;
            if (id) {
                if (id == 'paymentType') {
                    var o = getItem("web-in-pc/order-selected");
                    if (o) {
                        var v = o[id];
                        var val = '';
                        switch (v) {
                            case "DBZF":
                                val = '担保费支付';
                                break;
                            case "DLZF":
                                val = '代理商免支付';
                                break;
                            case "HDFK":
                                val = '货到付款 '
                                break;
                            case "XCZF":
                                val = '线下支付 '
                                break;
                            case "ZXZF":
                                val = '在线支付 '
                                break;
                                // 01	在线支付
                                // 02	货到付款
                                // 03	线下现场付款
                                // 05	白条支付
                            case "01":
                                val = '在线支付 '
                                break;
                            case "02":
                                val = '货到付款 '
                                break;
                            case "03":
                                val = '线下现场付款 '
                                break;
                            case "05":
                                val = '白条支付 '
                                break;
                        }
                        $(this).html(val);
                    }
                } else {
                    $(this).html(r[id]);
                }

            }
        });

    }
}

function copyActivityAndResource(r) {
    if (r.activities && r.activities.length > 0) {
        $(r.activities).each(function() {
            var _this = this;
            var h = $('#activityTemplate').html();
            $('#activity').append(h);
            $('#activity div[newAppend=true]').each(function() {
                var valueFrom = $(this).attr("valueFrom");
                if (valueFrom) {
                    $(this).html(_this[valueFrom]);
                }
                $(this).attr("valueFrom", "false");
            })

        });
    } else {
        $('#activityLabel').hide();
    }
    if (r.resources && r.resources.length > 0) {
        $(r.resources).each(function() {
            var _this = this;
            var h = $('#resourceTemplate').html();
            $('#resource').append(h);
            $('#resource div[newAppend=true]').each(function() {
                var valueFrom = $(this).attr("valueFrom");
                if (valueFrom) {
                    $(this).html(_this[valueFrom]);
                }
                $(this).attr("valueFrom", "false");
            })

        });
    } else {
        $('#resourceLabel').hide();
    }
    var o = getItem("web-in-pc/order-selected");
    if (o && o.member) {
        $(o.member).each(function() {
            var _this = this;
            var h = $('#memberTemplate').html();
            $('#member').append(h);
            $('#member div[newAppend=true]').each(function() {
                var valueFrom = $(this).attr("valueFrom");
                if (valueFrom) {
                    var val = _this[valueFrom];
                    if (!val) val = r[valueFrom];
                    if (valueFrom == 'modifyTag') {
                        valueFrom = 'ocTradeType';
                        var v = _this[valueFrom]
                        switch (v) {
                            case "0":
                                val = "新装";
                                break;
                            case "1":
                                val = "删除";
                                break;
                            case "2":
                                val = "变更（纳入）";
                                break;
                        }
                    }
                    if (_this['netTypeCode'] != '40') {
                        if ($(this).attr("valueFrom") == 'addrname' || $(this).attr("valueFrom") == 'bookingDate' || $(this).attr("valueFrom") == 'bookingTime') {
                            $(this).parent().hide();
                        }
                    }
                    $(this).html(val);
                }
                $(this).attr("valueFrom", "false");
            })

        });
    } else {
        $('#memberLabel').hide();
    }
}
//本页面对象
var testTbObj = {
    //变量

    //urlSearch: getOutUrl(getRootPath_web(),"/process/queryProcess?flag=int&orderNum="+orderNum+"&sysCode="+sysCode+"&jobName="+jobName)
    //urlSearch:getRootPath_web()+"/process/queryProcess"//"/js/data/inflow-table.json"
    //初始数据

    initTable: function() {
        var orderNum = getUrlParam("orderNum");
        var exTradeId = getUrlParam("exTradeId");
        var orderNum2 = getUrlParam("orderNum2");
        var sysCode = $('#sysCode').val();
        var jobName = $('#jobName').val();
        var arr_60 = [];
        var arr_70 = [];
        var arr_80 = [];
        var arr_90 = [];
        var arr_100 = []; //20190612 姬祥新增 政企专线
        var str_60, str_70, str_80, str_90, str_100;
        var number40;
        var number30;
        var number3040;
        var name;
        var arr_add;
        var WiFi;
        if (jobName == "请输入环节名称") {
            $('#jobName').val('');
            jobName = "";
        }
        var urlSearch = getOutUrl(getRootPath_web(), "/process/queryProcess?flag=int&orderNum=" + orderNum + '&exTradeId=' + exTradeId + "&sysCode=" + sysCode + "&jobName=" + encodeURIComponent(jobName));

        //			var urlSearch = getOutUrl(getRootPath_web(), "/js/data/flow-list-in.json?flag=int&orderNum=" + orderNum + "&sysCode=" + sysCode + "&jobName=" + encodeURIComponent(jobName));
        //var urlSearch = getRootPath_web() + "/js/data/flow-list-in.json" //  "/js/data/table.json"

        $('#table').bootstrapTable("destroy");
        $('#table').bootstrapTable({
            // url: "http://localhost:8080/testSpringMvc/test/list.do",
            url: urlSearch,
            dataType: 'json',
            method: "post",
            contentType: "application/x-www-form-urlencoded",
            queryParams: "queryParams",
            pagination: false,
            sidePagination: "server",
            pageSize: "10",
            pageList: "[5, 10, 20, 50 ]",
            showRefresh: false,
            showToggle: false,
            showPaginationSwitch: false,
            showColumns: false,
            search: false,
            searchAlign: "left",
            responseHandler: function(res) { //获取数据解析
                var obj = {
                    total: 0,
                    rows: []
                }; //table表格需要
                console.log(res);
                if (res.state == 1) {
                    obj.total = res.data.jobInsts.length;
                    obj.rows = res.data.jobInsts;
                    //console.info("responseHandler:" + obj);
                    fillData($('#commInfoDialog'), res.data);
                    fillData($('#payInfoDialog'), res.data);
                    copyActivityAndResource(res.data);
                    //$(".title").append(res.mytitle); //其它数据展示
                    //var order = res.data.jobInsts[1].orderNum;
                    if (res.data.productName != null) {
                        name = res.data.productName;
                    } else {
                        name = "";
                    }
                    if (res.data.wifiManwu != null) {
                        WiFi = res.data.wifiManwu;
                    } else {
                        WiFi = "";
                    }
                    if (res.data.member != null) {
                        var memberArr = res.data.member;
                        number40 = getSerialNumberArrByType([40, 56, 67], memberArr);
                        for (var i = 0; i < memberArr.length; i++) {
                            if (memberArr[i].netTypeCode == "40" && res.data.orderNum != memberArr[i].orderNum) { //双宽带区分展示
                                var tempArr = remove(memberArr, i);
                                number40 = getSerialNumberArrByType([40, 56, 67], tempArr);
                            }
                        }
                        number30 = getSerialNumberArrByType(30, res.data.member);
                        number3040 = getSerialNumberArrByType([30, 40, 56, 67], res.data.member);
                        console.log(res.data.member);
                        if (res.data.member && res.data.member.length == 1) {
                            if (res.data.member[0].roleId) {
                                var role = null;
                                try {
                                    role = parseInt(res.data.member[0].roleId);
                                } catch (e) {
                                    // do nothing
                                }
                                if (role == 7) {
                                    number3040 = "";
                                }
                            }
                        }
                    } else {
                        number40 = "";
                        number30 = "";
                        number3040 = "";
                    }

                    $.each(res.data.member, function(index, ele) {
                        if (ele.accNum && ele.accNum != 'null' && ele.netTypeCode != "40") { //双宽带区分展示
                            arr_60.push(ele.accNum)
                        } else if (ele.accNum && ele.accNum != 'null' && ele.orderNum == res.data.orderNum) {
                            arr_60.push(ele.accNum)
                        }
                        if (ele.userIp && ele.userIp != 'null') {
                            arr_70.push(ele.userIp)
                        }
                        if (ele.interIpAddr && ele.interIpAddr != 'null') {
                            arr_80.push(ele.interIpAddr)
                        }
                        if (ele.cloudBusinessNum && ele.cloudBusinessNum != 'null') {
                            arr_90.push(ele.cloudBusinessNum)
                        }
                        if (ele.speed && ele.speed != 'null') {
                            arr_100.push(ele.speed)
                        }

                    })
                    str_60 = arr_60.join(",")
                    str_70 = arr_70.join(",")
                    str_80 = arr_80.join(",")
                    str_90 = arr_90.join(",")
                    str_100 = arr_100.join(",")
                    arr_add = res.data.addrname
                    $('.detail_sty').empty();
                    var detailArea =
                        "<ul class='clearfix'>" +
                        '<div style="float:left; width: 50%">' +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 orderNum2\">" + "<span class=\"Detail-namespan\">" + "订单编号：" + "</span>" + "<span class=\"Detail-numspan\">" + orderNum2 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 number40\">" + "<span class=\"Detail-namespan\">" + "宽带/快线/专线：" + "</span>" + "<span class=\"Detail-numspan\">" + number40 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 number30\">" + "<span class=\"Detail-namespan\">" + "固话：" + "</span>" + "<span class=\"Detail-numspan\">" + number30 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 number3040\">" + "<span class=\"Detail-namespan\">" + "手机：" + "</span>" + "<span class=\"Detail-numspan\">" + number3040 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 str_60\">" + "<span class=\"Detail-namespan\">" + "宽带账号：" + "</span>" + "<span class=\"Detail-numspan\">" + str_60 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 str_70\">" + "<span class=\"Detail-namespan\">" + "用户端IP：" + "</span>" + "<span class=\"Detail-numspan\">" + str_70 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 str_80\">" + "<span class=\"Detail-namespan\">" + "互联网IP地址：" + "</span>" + "<span class=\"Detail-numspan\">" + str_80 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 str_90\">" + "<span class=\"Detail-namespan\">" + "云业务号码：" + "</span>" + "<span class=\"Detail-numspan\">" + str_90 + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 str_100\">" + "<span class=\"Detail-namespan\">" + "速率：" + "</span>" + "<span class=\"Detail-numspan\">" + str_100 + "</span>" + "</div>" + "</li>" + //20190612 姬祥 新增专线 速率
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 arr_add\">" + "<span class=\"Detail-namespan\">" + "装机地址：" + "</span>" + "<span class=\"Detail-numspan\">" + arr_add + "</span>" + "</div>" + "</li>" + //20190716 新增pc/对内 装机地址
                        '</div>' +
                        '<div style="float:left; width: 49%; padding-right: 20px;margin-bottom: 20px">' +
                        "<li class=\"Detail-li\">" + "<div class=\"name clearfix\">" + "<div class=\"Detail-namespan fl\">" + "产品名称：" + "</div>" + "<div class=\"Detail-numspan\" style='padding-left: 88px'>" + name + "</div>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"WiFi clearfix\">" + "<div class=\"Detail-namespan fl\">" + "WiFi满屋：" + "</div>" + "<div class=\"Detail-numspan\" style='padding-left: 88px'>" + WiFi + "</div>" + "</div>" + "</li>" +
                        '</div>' +
                        "</ul>"
                    $('.detail_sty').append(detailArea);
                }
                return obj;
            },
            onLoadSuccess: function() { //加载成功时执行
                if (orderNum2) {
                    $(".orderNum2").addClass('show');
                } else {
                    $(".orderNum2").addClass('hide');
                }
                if (number40) {
                    $(".number40").addClass('show');
                } else {
                    $(".number40").addClass('hide');
                }
                if (number30) {
                    $(".number30").addClass('show');
                } else {
                    $(".number30").addClass('hide');
                }
                if (number3040) {
                    $(".number3040").addClass('show');
                } else {
                    $(".number3040").addClass('hide');
                }
                if (name) {
                    $(".name").addClass('show');
                } else {
                    $(".name").addClass('hide');
                }
                if (arr_add) {
                    $(".arr_add").addClass('show');
                } else {
                    $(".arr_add").addClass('hide');
                }
                //  WiFi
                if (WiFi) {
                    $(".WiFi").addClass('show');
                } else {
                    $(".WiFi").addClass('hide');
                }
                // 新加的数据
                if (arr_60.length == 0) {
                    $(".str_60").addClass('hide');
                } else {
                    $(".str_60").addClass('show');
                }
                if (arr_70.length == 0) {
                    $(".str_70").addClass('hide');
                } else {
                    $(".str_70").addClass('show');
                }
                if (arr_80.length == 0) {
                    $(".str_80").addClass('hide');
                } else {
                    $(".str_80").addClass('show');
                }
                if (arr_90.length == 0) {
                    $(".str_90").addClass('hide');
                } else {
                    $(".str_90").addClass('show');
                }
                if (arr_100.length == 0) {
                    $(".str_100").addClass('hide');
                } else {
                    $(".str_100").addClass('show');
                }

            },

        });


        //$(".detail").append("订单编号：产品名称：固话：手机：+ phone ");

        if (jobName == "") {
            inputInit();
        }

        if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9) {
            setTimeout(function() {
                Interlaced("table");
            }, 500);
        }
    },

    actionFormatter: function(value, row, index) {
        if (row.url == undefined || row.url == "") {
            return value;
        } else {
            return '<a  href=' + row.url + ' target="_blank" >' + value + '</a> ';
        }

    },


    processInitable: function() { //对外流程查询
        var orderNum = getUrlParam("orderNum");
        var orderNum2 = getUrlParam("orderNum2");
        var htmlUrl = getOutUrl(getRootPath_web(), "/web-pc/out-order/page/flow-list.html?orderNum=" + orderNum + "&orderNum2=" + orderNum2);
        showRightLayer("flow" + orderNum, "订单详情", htmlUrl);
    }
}


//【查询】按钮
$(".submitBtn").click(function() {
    testTbObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function() {
    $('#searchForm').resetForm();
    $('#table').bootstrapTable("destroy");
    $('#table').bootstrapTable();
});
//【对外流程】按钮
$(".processBtn").click(function() {
    testTbObj.processInitable();
});
//【返回上一页】按钮
$(".gobackBtn").click(function() {
    javascript: history.back(-1);
});

$('#payInfo').click(function() {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 1,
        area: ['740px', '460px'],
        shade: 0.5,
        id: 'lay_payInfo', //设定一个id，防止重复弹出
        btnAlign: 'r',
        moveType: 0, //拖拽模式，0或者1
        content: $('#payInfoDialog'),
        cancel: function() {},
        beforeClose: function() {

        }
    });
});
$('#commInfo').click(function() {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 1,
        area: ['740px', '460px'],
        shade: 0.5,
        id: 'lay_commInfo', //设定一个id，防止重复弹出
        btnAlign: 'r',
        moveType: 0, //拖拽模式，0或者1
        content: $('#commInfoDialog'),
        cancel: function() {},
        beforeClose: function() {

        }
    });
});