/**********************/
/*******手机端订单流转轨迹 新需求***********/

$(document).ready(function () {
    $("#sysCode").val('');
    $("#jobName").val('');
    //alert(1);

    //初始获取orderNum，加载表格
    flowObj.initTable();
});



//外部URL去除回退按钮
var referrerUrl = document.referrer;
var localUrl = window.location.href.toString();
var localHostname = window.location.hostname;
var localPort = window.location.port;
var localProtocol = window.location.protocol;
var domain = localProtocol + "//" + localHostname + ":" + localPort;
/*if (referrerUrl != '' && referrerUrl.indexOf(domain) == 0) {
    //本站url
} else {
    //外部访问url
    $("#goBack").removeClass("glyphicon-chevron-left");
}*/


//本页面对象
var flowObj = {
    // 变量
    //urlSearch:getRootPath_web()+"/js/data/inflow-table.json"
    //urlSearch: getRootPath_web()+"/test2/list"
    // 初始数据
    initTable: function () {
        //流程展示内容
        //订单流程名称
        var orderNum = getUrlParam("orderNum");
        var sysCode = ""; //$('#sysCode').val();
        var jobName = ""; //$('#jobName').val();

        var urlSearch = getOutUrl(getRootPath_web(), "/process/queryProcess?flag=int&orderNum=" + orderNum + "&sysCode=" + sysCode + "&jobName=" + encodeURIComponent(jobName));
        //		var urlSearch = getOutUrl(getRootPath_web(),"/js/data/flow-list-in.json?flag=int&orderNum="+orderNum+"&sysCode="+sysCode+"&jobName="+encodeURIComponent(jobName));

        // $.ajax({
        //     type: 'post', //get post
        //     async: true,
        //     // url: getRootPath_web()+"/js/data/inflow-table.json",
        //     url: urlSearch,
        //     dataType: 'json',
        //     //显示加载图标
        //     beforeSend: function () {
        //         showLoader();
        //     },
        //     complete: function () {
        //         hideLoader();
        //     },
        //     error: function (e) {
        //         hideLoader();
        //         layer.open({
        //             content: '系统错误！请重试',
        //             style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
        //             ,
        //             time: 3
        //         })
        //     },
        //     success: function (res) {
        //         if (res.state == 1) {
        //             if (!($.isEmptyObject(res.data.jobInsts))) {
        //                 var productName = checkNullOrEmptyStr(res.data.productName) ? "" : res.data.productName;
        //                 var WiFi = checkNullOrEmptyStr(res.data.wifiManwu) ? "" : res.data.wifiManwu;
        //                 var str_30 = getSerialNumberArrByType(30, res.data.member);
        //                 var memberArr = res.data.member;
        //                 var str_40 = getSerialNumberArrByType([40, 56, 67], memberArr);
        //                 for (var i = 0; i < memberArr.length; i++) {
        //                     if (memberArr[i].netTypeCode == "40" && res.data.orderNum != memberArr[i].orderNum) { //双宽带区分展示
        //                         var tempArr = remove(memberArr, i);
        //                         str_40 = getSerialNumberArrByType([40, 56, 67], tempArr);
        //                     }
        //                 }
        //                 //var str_40 = getSerialNumberArrByType([40, 56,67], res.data.member);
        //                 var str_50 = getSerialNumberArrByType([30, 40, 56, 67], res.data.member);

        //                 var arr_60 = [];
        //                 var arr_70 = [];
        //                 var arr_80 = [];
        //                 var arr_90 = [];
        //                 var str_60, str_70, str_80, str_90;
        //                 // 装机地址
        //                 var str_addr = res.data.addrname;
        //                 //    console.log(str_addr)
        //                 $.each(res.data.member, function (index, ele) {
        //                     if (ele.accNum && ele.accNum != 'null' && ele.netTypeCode != "40") { //双宽带区分展示
        //                         arr_60.push(ele.accNum)
        //                     } else if (ele.accNum && ele.accNum != 'null' && ele.orderNum == res.data.orderNum) {
        //                         arr_60.push(ele.accNum)
        //                     }
        //                     if (ele.cloudBusinessNum && ele.cloudBusinessNum != 'null') {
        //                         arr_70.push(ele.cloudBusinessNum)
        //                     }
        //                     if (ele.userIp && ele.userIp != 'null') {
        //                         arr_80.push(ele.userIp)
        //                     }
        //                     if (ele.interIpAddr && ele.interIpAddr != 'null') {
        //                         arr_90.push(ele.interIpAddr)
        //                     }
        //                 })
        //                 str_60 = arr_60.join(",")
        //                 str_70 = arr_70.join(",")
        //                 str_80 = arr_80.join(",")
        //                 str_90 = arr_90.join(",")
        //                 $("#productName").append(productName);
        //                 $("#WiFi").append(WiFi);
        //                 $("#teleNum").append(str_30);
        //                 $("#serialNumber").append(str_40);
        //                 $("#phoneNum").append(str_50);
        //                 $("#accNum").append(str_60);
        //                 $("#cloudBusinessNum").append(str_70);
        //                 $("#userIp").append(str_80);
        //                 $("#interIpAddr").append(str_90);
        //                 $("#addrname").append(str_addr);
        //                 //判断没有数据隐藏
        //                 if (productName) {
        //                     $(".productName").addClass('show1');
        //                 } else {
        //                     $(".productName").addClass('hide');
        //                 }
        //                 if (WiFi) {
        //                     $(".WiFi").addClass('show1');
        //                 } else {
        //                     $(".WiFi").addClass('hide');
        //                 }

        //                 if (str_30) {
        //                     $(".teleNum").addClass('show1');
        //                 } else {
        //                     $(".teleNum").addClass('hide');
        //                 }
        //                 if (str_40) {
        //                     $(".serialNumber").addClass('show1');
        //                 } else {
        //                     $(".serialNumber").addClass('hide');
        //                 }
        //                 if (str_50) {
        //                     $(".phoneNum").addClass('show1');
        //                 } else {
        //                     $(".phoneNum").addClass('hide');
        //                 }
        //                 // 装机地址
        //                 if (str_addr) {
        //                     $(".addrname").addClass('show1');
        //                 } else {
        //                     $(".addrname").addClass('hide');
        //                 }
        //                 // 新加的数据
        //                 if (arr_60.length == 0) {
        //                     $(".accNum").addClass('hide');
        //                 } else {
        //                     $(".accNum").addClass('show1');
        //                 }
        //                 if (arr_70.length == 0) {
        //                     $(".cloudBusinessNum").addClass('hide');
        //                 } else {
        //                     $(".cloudBusinessNum").addClass('show1');
        //                 }
        //                 if (arr_80.length == 0) {
        //                     $(".userIp").addClass('hide');
        //                 } else {
        //                     $(".userIp").addClass('show1');
        //                 }
        //                 if (arr_90.length == 0) {
        //                     $(".interIpAddr").addClass('hide');
        //                 } else {
        //                     $(".interIpAddr").addClass('show1');
        //                 }
        //                 //流程图展示
        //                 var rdata = {
        //                     data: []
        //                 };
        //                 rdata.data = res.data.jobInsts;
        //                 flowObj.makeFlowArea(rdata);

        //             }
        //             //未找到数据弹出提示框
        //             else {
        //                 layer.open({
        //                     content: '未找到相匹配的数据!',
        //                     style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;', //自定风格
        //                     time: 3
        //                 })
        //             }
        //         } else if (res.state == 0) {
        //             layer.open({
        //                 content: res.message,
        //                 style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;', //自定风格
        //                 time: 3
        //             })
        //         }

        //         // alert(data);
        //     }
        // });
    
        // 模拟请求
        let res = {"data":{"ioTradeId":null,"productName":"北京宽带300M基本套餐（2019年6月）","bssSubscribeId":"1120092563075267","exTradeId":"","orderNum":"2009250353142940010","netTypeCode":"40","serialNumber":"01018273571","member":[{"netTypeCode":"40","serialNumber":"010****3571","orderNum":"2009250353142940010","bssOrderId":"1120092563075267","bssSubscribeId":"1120092563075267","cloudBusinessNum":"null","userIp":"null","interIpAddr":"null","accNum":"990****94150","roleId":null}],"jobInsts":[{"id":null,"ioOrderId":null,"orderNum":null,"subOrderNum":"-1","workInstId":null,"jobCode":"I9990","jobName":"订单已取消，期待下次为您服务","sysCode":"IOM","createDate":"2020-09-25 17:30","staffName":"","staffCode":null,"staffTel":"","departName":null,"endDate":"","jobState":"","jobAction":"","jobCentent":null,"jobRemark":null,"commentState":null,"jobOther":"","deleteState":0,"forceDepart":null,"reserveCode1":null,"reserveCode2":null,"reserveCode3":null,"reserveCode4":null,"reserveCode5":null,"reserveCode6":null,"url":null,"jobImgName":"job_canceled","logisticsProviderCode":null,"logisticsMailNo":null,"dispatchObjId":null,"dispatchObjName":null,"dispatchObjTel":null,"limitDate":null,"productName":null,"appointDate":null,"areaCode":null,"specLine":null,"execdeptId":null,"execdeptName":null,"integratedId":null,"integratedName":null,"lastchgdate":null},{"id":null,"ioOrderId":null,"orderNum":null,"subOrderNum":null,"workInstId":null,"jobCode":"I0002","jobName":"订单已提交，正在为您加急处理中","sysCode":"","createDate":"2020-09-25 03:51","staffName":"","staffCode":null,"staffTel":"","departName":null,"endDate":"2020-09-25 03:51","jobState":"","jobAction":"","jobCentent":null,"jobRemark":null,"commentState":null,"jobOther":"","deleteState":0,"forceDepart":null,"reserveCode1":null,"reserveCode2":null,"reserveCode3":null,"reserveCode4":null,"reserveCode5":null,"reserveCode6":null,"url":null,"jobImgName":"job_submited","logisticsProviderCode":null,"logisticsMailNo":null,"dispatchObjId":null,"dispatchObjName":null,"dispatchObjTel":null,"limitDate":null,"productName":null,"appointDate":null,"areaCode":null,"specLine":null,"execdeptId":null,"execdeptName":null,"integratedId":null,"integratedName":null,"lastchgdate":null}],"speed":"300M","addrname":"(礼士胡同南平房区)东四南大街164号B座_1单元_1层_B座1层房间","wifiManwu":"","exIsPay":"","payType":null,"paymentType":"其他","factFee":null,"receivableFee":null,"discountFee":null,"payTime":null,"invoiceType":"","commId":null,"commName":null,"invoiceTitle":null,"phoneNum":null,"mainFlag":"","numType":null,"cityCode":"","productType":null,"firstMonBillmode":null,"bookingDate":"","serviceType":null,"cloudDeliverMode":null,"activities":null,"resources":null},"state":"1"}
        if (res.state == 1) {
            if (!($.isEmptyObject(res.data.jobInsts))) {
                var productName = checkNullOrEmptyStr(res.data.productName) ? "" : res.data.productName;
                var WiFi = checkNullOrEmptyStr(res.data.wifiManwu) ? "" : res.data.wifiManwu;
                var str_30 = getSerialNumberArrByType(30, res.data.member);
                var memberArr = res.data.member;
                var str_40 = getSerialNumberArrByType([40, 56, 67], memberArr);
                for (var i = 0; i < memberArr.length; i++) {
                    if (memberArr[i].netTypeCode == "40" && res.data.orderNum != memberArr[i].orderNum) { //双宽带区分展示
                        var tempArr = remove(memberArr, i);
                        str_40 = getSerialNumberArrByType([40, 56, 67], tempArr);
                    }
                }
                //var str_40 = getSerialNumberArrByType([40, 56,67], res.data.member);
                var str_50 = getSerialNumberArrByType([30, 40, 56, 67], res.data.member);

                var arr_60 = [];
                var arr_70 = [];
                var arr_80 = [];
                var arr_90 = [];
                var str_60, str_70, str_80, str_90;
                // 装机地址
                var str_addr = res.data.addrname;
                //    console.log(str_addr)
                $.each(res.data.member, function (index, ele) {
                    if (ele.accNum && ele.accNum != 'null' && ele.netTypeCode != "40") { //双宽带区分展示
                        arr_60.push(ele.accNum)
                    } else if (ele.accNum && ele.accNum != 'null' && ele.orderNum == res.data.orderNum) {
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
                str_60 = arr_60.join(",")
                str_70 = arr_70.join(",")
                str_80 = arr_80.join(",")
                str_90 = arr_90.join(",")
                $("#productName").append(productName);
                $("#WiFi").append(WiFi);
                $("#teleNum").append(str_30);
                $("#serialNumber").append(str_40);
                $("#phoneNum").append(str_50);
                $("#accNum").append(str_60);
                $("#cloudBusinessNum").append(str_70);
                $("#userIp").append(str_80);
                $("#interIpAddr").append(str_90);
                $("#addrname").append(str_addr);
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
                // 装机地址
                if (str_addr) {
                    $(".addrname").addClass('show1');
                } else {
                    $(".addrname").addClass('hide');
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
                //流程图展示
                var rdata = {
                    data: []
                };
                rdata.data = res.data.jobInsts;
                // 增加携带res参数
                // flowObj.makeFlowArea(rdata);
                flowObj.makeFlowArea(rdata, res);

            }
            //未找到数据弹出提示框
            else {
                layer.open({
                    content: '未找到相匹配的数据!',
                    style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;', //自定风格
                    time: 3
                })
            }
        } else if (res.state == 0) {
            layer.open({
                content: res.message,
                style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;', //自定风格
                time: 3
            })
        }
    },


    // 获取地图参数需要用到地址和电话参数 所有将所有返回值传过去
    // makeFlowArea: function (data) {
    makeFlowArea: function (data, res) {
        var opt = {
            "jsonDate": data, //json数据
            "imgPath": "../../../web-phone/images/order/flow/", //图片路径
            "imgType": "png" //图片类型
        };

        $(".flowtest").flowplugin(opt, res);

        //单页面特殊处理广告位重新加载
        advertPosition();
    }
};


//【查询】按钮
$(".submitBtn").click(function () {
    //查询前先清空之前的查询结果
    $(".listArea").empty();
    flowObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function () {
    $("#sysCode").val('');
    $("#jobName").val('');
    $(".listArea").empty();
    $("#loader").empty();
});

/*success:function(data){
	  //alert(1);
		var showContent;
		if(!($.isEmptyObject(data.rows))){
//遍历循环json数组
      $.each(data.rows,function(index, content){
//动态添加展示结果
    	 showContent = "<ul class=\"content\">"
	              +"<li>派单时间： "+content.createDate+"</li>"
                  +"<li>归属系统： "+content.sysCode+"</li>"
                  +"<li>环节名称： "+content.jobName +"</li>"
                  +"<li>处理人： "+content.staffName+"</li>"
                  +"<li>处理人电话： "+content.staffTel+"</li>"
                  +"<li>处理时间： "+content.endDate+"</li>"
                  +"<li>环节状态： "+content.jobState+"</li>"
                  +"<li>退单原因： "+content.jobAction+"</li></ul>";
      $("#show").append(showContent);
		 })
		}
		//未找到数据弹出提示框
      else{
					layer.open({
						content: '未找到相匹配的数据!请重新输入',
						style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
							,
						time: 3
					})
      	}
      		

// alert(data);
}*/

