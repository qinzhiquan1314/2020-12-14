/*************对外-手机-流程查询*********/

$(document).ready(function () {
    flowListObj.showNum();
    flowListObj.getDate();
});

//获取路径中参数
var orderNum = getUrlParam("orderNum");//订单号
var orderNum2 = getUrlParam("orderNum2");//渠道订单号or营业订单号

//本页面对象
var flowListObj = {
    //变量-访问路径
    url: getOutUrl(getRootPath_web(), "/process/queryProcess?orderNum=" + orderNum)
    //url: getOutUrl(getRootPath_web(),"/js/data/flow-list-out.json?flag=out&orderNum="+orderNum)
    //获取数据
    , getDate: function () {
        $.ajax({
            type: 'POST',//测试  GET  生产POST
            async: true,
            url: flowListObj.url,
            dataType: 'json',
            beforeSend: function () {
                showLoader();
            },
            complete: function () {
                hideLoader();
            },
            success: function (resData) {
                if (resData == null) return;
                var state = resData.state;//1:有流程    0：没有/访问次数限制    -1：系统报错
                var sysCode = resData.data.jobInsts[0].sysCode;
                console.log(sysCode);
                //根据类型码判断是否显示温馨提示
                if (resData.data.jobInsts[0].sysCode == "预留单") {
                    $(".showNetTypeCode").hide();
                } else if (resData.data.member !== null) {
                    var arr = "[10,16,17,33,50]";
                    if (arr.indexOf(resData.data.member[0].netTypeCode) > 0) {
                        $(".showNetTypeCode").show();
                    } else {
                        $(".showNetTypeCode").hide();
                    }
                } else {
                    var arr = "[10,16,17,33,50]";
                    if (arr.indexOf(resData.data.netTypeCode) > 0) {
                        $(".showNetTypeCode").show();
                    } else {
                        $(".showNetTypeCode").hide();
                    }
                }

                if (state == 1) {
                    var rdata = {data: []};
                    rdata.data = resData.data.jobInsts;
                    flowListObj.makeFlowArea(rdata);
                    var productName = checkNullOrEmptyStr(resData.data.productName) ? "" : resData.data.productName;
                    var WiFi = checkNullOrEmptyStr(resData.data.wifiManwu) ? "" : resData.data.wifiManwu;
                    var str_30 = getSerialNumberArrByType(30, resData.data.member);
                    var memberArr = resData.data.member;
                    var str_40 = getSerialNumberArrByType([40, 56, 67], memberArr);
                    for (var i = 0; i < memberArr.length; i++) {
                        if (memberArr[i].netTypeCode == "40" && resData.data.orderNum != memberArr[i].orderNum) { //双宽带区分展示
                            var tempArr = remove(memberArr, i);
                            str_40 = getSerialNumberArrByType([40, 56, 67], tempArr);
                        }
                    }
                    var str_50 = getSerialNumberArrByType([30, 40, 56, 67], resData.data.member);
                    var arr_60 = [];
                    var arr_70 = [];
                    var arr_80 = [];
                    var arr_90 = [];
                    var arr_100 = []; //20190620 姬祥新增 速率字段
                    var str_60, str_70, str_80, str_90, str_100;
                    $.each(resData.data.member, function (index, ele) {
                        if (ele.accNum && ele.accNum != 'null' && ele.netTypeCode != "40") { //双宽带区分展示
                            arr_60.push(ele.accNum)
                        } else if (ele.accNum && ele.accNum != 'null' && ele.orderNum == resData.data.orderNum) {
                            arr_60.push(ele.accNum)
                        }
                        if (ele.cloudBusinessNum && ele.cloudBusinessNum != 'null') {
                            arr_70.push(ele.cloudBusinessNum)
                        }
                        if (ele.userIp && ele.userIp != 'null') {
                            arr_80.push(ele.userIp)
                        }
                        if (ele.interIpAddr && ele.interIpAddr != 'null') {
                            arr_90.push(ele.interIpAddr)
                        }
                    })
                    if (resData.data.speed && resData.data.speed != 'null') {
                        arr_100.push(resData.data.speed)
                    }

                    $(".phone").addClass('hide');
                    $(".qiepian").addClass('hide');
                    if (resData.data.orderNum == '2011031435112345678') {
                        $(".phone").addClass('show');
                        $(".qiepian").addClass('show');
                    }
                    str_60 = arr_60.join(",")
                    str_70 = arr_70.join(",")
                    str_80 = arr_80.join(",")
                    str_90 = arr_90.join(",")
                    str_100 = arr_100.join(",")
                    $("#productName").append(productName);
                    $("#WiFi").append(WiFi);
                    $("#teleNum").append(str_30);
                    $("#serialNumber").append(str_40);
                    $("#phoneNum").append(str_50);
                    $("#accNum").append(str_60);
                    $("#cloudBusinessNum").append(str_70);
                    $("#userIp").append(str_80);
                    $("#interIpAddr").append(str_90);
                    $("#speed").append(str_100);
                    //判断没有数据隐藏
                    if (productName) {
                        $(".productName").addClass('show1');
                    } else {
                        $(".productName").addClass('hide');
                    }
                    if (WiFi) {
                        $(".WiFi").addClass('show1');
                    } else {
                        $(".WiFi").addClass('hide');
                    }
                    if (str_30) {
                        $(".teleNum").addClass('show1');
                    } else {
                        $(".teleNum").addClass('hide');
                    }
                    if (str_40) {
                        $(".serialNumber").addClass('show1');
                    } else {
                        $(".serialNumber").addClass('hide');
                    }
                    if (str_50) {
                        $(".phoneNum").addClass('show1');
                    } else {
                        $(".phoneNum").addClass('hide');
                    }
                    // 新加的数据
                    if (arr_60.length == 0) {
                        $(".accNum").addClass('hide');
                    } else {
                        $(".accNum").addClass('show1');
                    }
                    if (arr_70.length == 0) {
                        $(".cloudBusinessNum").addClass('hide');
                    } else {
                        $(".cloudBusinessNum").addClass('show1');
                    }
                    if (arr_80.length == 0) {
                        $(".userIp").addClass('hide');
                    } else {
                        $(".userIp").addClass('show1');
                    }
                    if (arr_90.length == 0) {
                        $(".interIpAddr").addClass('hide');
                    } else {
                        $(".interIpAddr").addClass('show1');
                    }
                    //20190620姬祥新增
                    if (arr_100.length == 0) {
                        $(".speed").addClass('hide');
                    } else {
                        $(".speed").addClass('show1');
                    }

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
    //展示数据
    , makeFlowArea: function (data) {
        var opt = {
            "jsonDate": data,//json数据
            "imgPath": "../../../web-phone/images/order/flow/", //图片路径
            "imgType": "png" //图片类型
        };

        $(".flowtest").flowplugin(opt);

        //单页面特殊处理广告位重新加载
        advertPosition();
    }
    //展示订单号
    , showNum: function () {
        //var num = (orderNum == "" || orderNum == null) ? "" : orderNum;
        var num = (orderNum2 == "" || orderNum2 == null) ? "" : orderNum2;
        //$(".showNumber").html(num);//("订单编号    "+num)
    }
};



