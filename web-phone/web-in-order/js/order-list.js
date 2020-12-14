/**********************/

//获取当别人访问界面时问号[?]后边所带的参数
//http://10.124.147.88/queryCenter/web-phone/web-in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05
//orderType=1&orderNum=011WBSPPC20180309092148196&exCode=wys&userName=18510729630&callCode=131172ad8ea3875a00eac487df6f3d05
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);
console.log(locHref);
//将参数分割
var array= locHref.split("&");
//根据分割后的参数的个数进行进入方法中
console.log(array);
//将参数分割放置
//var ParameterArray=new Array();
var ParameterArra=[];
//得到一个二维数组
for(var i=0;i<array.length;i++){
	ParameterArra.push(array[i].split("="));
}
console.log(ParameterArra);
console.log(ParameterArra[1][1]);
//将二维数组进行遍历得到所有的数据
//定义两个变量为调用ajax方法传参
//http://localhost:8082/queryCenter/trade/queryOrder?flag=int&orderType=3&orderNum=2018061500077021&exCode=tmall&userName=18510729630&callCode=131172ad8
var orderType1="";
var orderNum1="";
for(var i=0;i<ParameterArra.length;i++){
	for(var j=0;j<ParameterArra[i].length;j++){
		if("orderType"==ParameterArra[i][j]){
			orderType1=ParameterArra[i][j+1];
		}
		if("orderNum"==ParameterArra[i][j]){
			orderNum1=ParameterArra[i][j+1];
		}
	}
}
console.log(orderType1);
console.log(orderNum1);
if(orderType1!="" || orderNum1!=""){
	
	if (orderType1 == "") {
		layer.open({
			content: '请选择受理渠道类型！',
			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
			time: 3
		});
		//return false;
	}
	if (orderNum1 == "") {
		layer.open({
			content: '请输入订单号码！',
			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
			time: 3
		});
		//return false;
	}
	//setListLocalData(1,orderType,orderNum,"","","");
	//传业务号码到订单列表页面：order-list	    		    
	//getexTradeInmodeData(orderType,orderNum);
	
	
	if(orderNum1 != "" && orderType1 !=""){
		getexTradeInmodeData(orderType1,orderNum1);
		$("#orderType").val(orderType1);
		$("#orderNum").val(orderNum1);
	}
	
	
}







$(document).ready(function() {
	//localStorage.clear();//删除本地存储
	testTbObj.initDateplugin();
	//testTbObj.validateInput();
	testTbObj.restContent();

	//	var orderNum =$("#orderNum").val();
	//	var serialNumber =$("#serialNumber").val();
	//	var ocAcceptDate =$("#ocAcceptDate").val();
	//	add(orderNum,serialNumber,ocAcceptDate);
   //沃易赚小程序添加返回页面
	if(ParameterArra[1][1]=="wyzin"||ParameterArra[1][1]=="wyzout"){
		$("#backWechat").css("display","inline-block");
	}

	//  获取本地值
	//getListLocalData()
	$(".nav-tabs li").click(function() {
		$(".nav-tabs li").removeClass("active");
		$(this).addClass("active");
		// var obj = getLocalData("web-in/order-list");
		// if (obj) {
		// 	localData(obj);
		// }
		// $("#serialNumber").css('backgroundColor', '#fff');
		// $("#accNum").css('backgroundColor', '#fff');
		// $("#teleNum").css('backgroundColor', '#fff');
	});


	//增加回显代码判断；
	/* function add(val1,val2,val3){
	   
	   if(val3){
		 //alert(1)
		 showDiv('id3');
		 $(".nav-tabs li").removeClass("active");
		 $(".nav-tabs li").eq(2).addClass("active");
		 return;
	   }else if(val1){
		     showDiv('id1');
			 $(".nav-tabs li").removeClass("active");
			 $(".nav-tabs li").eq(0).addClass("active");
	   }else if(val2){
		     showDiv('id2');
			 $(".nav-tabs li").removeClass("active");
			 $(".nav-tabs li").eq(1).addClass("active");
	   }
   }*/

	//订单号码查询
	$("#in_orderNumSearch").click(function() {
		$(".listArea").empty();
		var orderType ="";
		var orderNum = $("#orderNum").val();
		/*if (orderType == "") {
			layer.open({
				content: '请选择受理渠道类型！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}*/
		if (orderNum == "") {
			layer.open({
				content: '请输入订单号码！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		//setListLocalData(1,orderType,orderNum,"","","");
		//传业务号码到订单列表页面：order-list	    		    
		getexTradeInmodeData(orderType, orderNum);
	});

	//身份证号码查询
	$("#in_credentialCodeSearch").click(function() {
		$(".listArea").empty();
		var credentialCode = $("#credentialCode").val();

		if (credentialCode == "") {
			layer.open({
				content: '请输入身份证号码',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		var booId = checkID(credentialCode);
		if (booId == false) {
			layer.open({
				content: '您输入的身份证号码有误，请重新输入',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return;
		}
		getcredentialCode(credentialCode);
	});



	//方式1重置
	$("#resetBtn1").click(function() {
		var orderType = "";
		var orderNum = "";
		setListLocalData(1, orderType, orderNum, "", "", "", "", "", "", 5,'','','');
	});
	//方式2重置
	$("#resetBtn2").click(function() {
		var serialNumber = "";
		var accNum = "";
		var teleNum = "";
		setListLocalData(2, "", "", serialNumber, accNum, teleNum, "", "", "", 5,'','','');
	});
	//方式3重置
	$("#resetBtn3").click(function() {
		var startAcceptDate = "";
		var endAcceptDate = "";
		var exAcceptStaffid = "";
		setListLocalData(3, "", "", "", "", "", startAcceptDate, endAcceptDate, exAcceptStaffid, 5,'','','');
	});
	//方式4重置
	$("#resetBtn4").click(function() {
		var credentialCode = "";
		setListLocalData(4, "", "", "", "", "", startAcceptDate, endAcceptDate, exAcceptStaffid, 5,'','','');
	});
	//方式5重置
	$("#resetBtn5").click(function() {
		var placeOrderstartDate = "";
		var placeOrderendDate = "";
		var placeOrderPhoneNumber = "";
		$('#placeOrderstartDate').val(placeOrderstartDate)
		$('#placeOrderendDate').val(placeOrderendDate)
		$('#placeOrderPhoneNumber').val(placeOrderPhoneNumber)
		setListLocalData(5, "", "", "", "", "", '', '', '', 5,placeOrderstartDate,placeOrderendDate,placeOrderPhoneNumber);
	});

	//业务号码查询
	$("#in_serialNumberSearch").click(function() {
		$(".listArea").empty();
		var serialNumber = $("#serialNumber").val();
		var accNum = $("#accNum").val();
		var teleNum = $("#teleNum").val();
		var booSerial = checkPhoneNum(serialNumber);
		var booAcc = checkAcc(accNum);
		var booTele = checkAccAndTele(teleNum);
		//console.log(serialNumber);
		if (serialNumber == "" && accNum == "" && teleNum == "") {
			layer.open({
				content: '请输入您的查询信息！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3,

			});
			return false;
		}
		if (booSerial == false) {
			layer.open({
				content: '您的手机号码有误，请重填',
				style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});
			return;
		}
		if (booAcc == false) {
			layer.open({
				content: '您的宽带号码有误，请重填',
				style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});
			return;
		}
		if (booTele == false) {
			layer.open({
				content: '您的固话号码有误，请重填',
				style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});
			return;
		}
		//判断只能输入一个值
		/* if((serialNumber && accNum)||(serialNumber && teleNum)||(accNum && teleNum)||(serialNumber && accNum && teleNum)){
	    	 layer.open({
					content: '宽带号码、手机号码和固定号码只能输入一个！',
					style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
					time: 3,

				});
	    	 return false;
	    }*/
		//setListLocalData(2,"","",serialNumber,"","");
		//传业务号码到订单列表页面：order-list	    		    
		//testTbObj.ajaxValidate();
		getOrderData(serialNumber, accNum, teleNum);
	});
	//工号查询
	$("#in_exAcceptStaffidSearch").click(function() {
		$(".listArea").empty();
		var startAcceptDate = $("#startAcceptDate").val();
		var endAcceptDate = $("#endAcceptDate").val();
		var exAcceptStaffid = $("#exAcceptStaffid").val();


		var u = navigator.userAgent,
			app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isIOS) {
			startAcceptDate = startAcceptDate.replace(/\-/g, "/");
			endAcceptDate = endAcceptDate.replace(/\-/g, "/");
		}



		// var star = startAcceptDate.replace(/\-/g, "/");
		// var end = endAcceptDate.replace(/\-/g, "/");

		var data1 = DateDiff(startAcceptDate, endAcceptDate);

		var data2 = getCurrentDate("yyyy-mm-dd");

		if (isIOS) {
			data2 = data2.replace(/\-/g, "/");
		}

		var data3 = DateDiff(startAcceptDate, data2);

		startAcceptDate = $("#startAcceptDate").val();
		endAcceptDate = $("#endAcceptDate").val();


		// var data4 = DateDiff(star, end);

		// alert(star);
		// alert(end);
		// alert(data4);


		// alert(data1);
		// alert(data2);
		// alert(data3);
		// alert(startAcceptDate);
		// alert(endAcceptDate);

		if (startAcceptDate == "" && endAcceptDate == "" && exAcceptStaffid == "") {
			layer.open({
				content: '请输入日期和工号！',
				style: 'background-color:#f7f7f8; width:60%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (startAcceptDate == "" || endAcceptDate == "") {
			layer.open({
				content: '请选择下单时间！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (exAcceptStaffid == "") {
			layer.open({
				content: '请输入受理人工号！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (data3 > 180) {
			layer.open({
				content: '只能查询6个月内的订单',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (data1 > 30) {
			layer.open({
				content: '只能查询1个月内的订单',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}


		//setListLocalData(3,"","","",ocAcceptDate,exAcceptStaffid);
		//传业务号码到订单列表页面：order-list	    		    
		//testTbObj.ajaxValidate();
		getOrderData_3(startAcceptDate, endAcceptDate, exAcceptStaffid);
	});
	//下单时间 查询
	$("#in_placeOrderSearch").click(function() {
		$(".listArea").empty();
		var placeOrderstartDate = $("#placeOrderstartDate").val();
		var placeOrderendDate = $("#placeOrderendDate").val();
		var placeOrderPhoneNumber = $("#placeOrderPhoneNumber").val();

		var u = navigator.userAgent,
			app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isIOS) {
			placeOrderstartDate = placeOrderstartDate.replace(/\-/g, "/");
			placeOrderendDate = placeOrderendDate.replace(/\-/g, "/");
		}



		// var star = startAcceptDate.replace(/\-/g, "/");
		// var end = endAcceptDate.replace(/\-/g, "/");

		var data1 = DateDiff(placeOrderstartDate, placeOrderendDate);

		var data2 = getCurrentDate("yyyy-mm-dd");

		if (isIOS) {
			data2 = data2.replace(/\-/g, "/");
		}

		var data3 = DateDiff(placeOrderstartDate, data2);

		placeOrderstartDate = $("#placeOrderstartDate").val();
		placeOrderendDate = $("#placeOrderendDate").val();


		if (placeOrderendDate == "" && placeOrderstartDate == "" &&  placeOrderPhoneNumber == "") {
			layer.open({
				content: '请输入下单日期和手机号！',
				style: 'background-color:#f7f7f8; width:60%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (placeOrderendDate == "" || placeOrderstartDate == "") {
			layer.open({
				content: '请选择下单时间！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (placeOrderPhoneNumber == "") {
			layer.open({
				content: '请输入手机号！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (data3 > 180) {
			layer.open({
				content: '只能查询6个月内的订单',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (data1 > 30) {
			layer.open({
				content: '只能查询1个月内的订单',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		var booId = checkPhoneNum(placeOrderPhoneNumber);
		if (booId == false) {
			layer.open({
				content: '您的手机号码有误，请重填',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return;
		}
		//setListLocalData(3,"","","",ocAcceptDate,exAcceptStaffid);
		//传业务号码到订单列表页面：order-list
		//testTbObj.ajaxValidate();
		getOrderData_4(placeOrderstartDate, placeOrderendDate, placeOrderPhoneNumber);
	});
	//重置
	// $("#resetBtn1,#resetBtn2,#resetBtn3").click(function() {
	// 	$('#searchForm').resetForm();
	// 	$(".listArea").empty();
	// });
});
function getOrderData_4(placeOrderstartDate, placeOrderendDate, placeOrderPhoneNumber) {

	$.ajax({
		type: 'POST', // 测试  GET , 生成 POST
		async: true,
		url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=phoneInt&placeOrderstartDate=" + placeOrderstartDate + "&placeOrderendDate=" + placeOrderendDate + "&placeOrderPhoneNumber=" + placeOrderPhoneNumber),
		//url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
		dataType: 'json',
		//显示加载图标
		beforeSend: function() {
			showLoader();
		},
		complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if (resData == null) return;
			if (resData.state == 1) {
				makeList(resData);
				//存储
				//console.log(ocAcceptDate,exAcceptStaffid);
				setListLocalData(5, "", "", "", "", "", '', '', '',placeOrderstartDate, placeOrderendDate, placeOrderPhoneNumber);

			} else {
				layer.open({
					content: '未找到匹配的数据！',
					style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
					time: 3
				});
			}
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
				,
				time: 3
			});

		}
	});
}

function localData(obj) {
	var orderType = obj.orderType;
	var orderNum = obj.orderNum;
	var serialNumber = obj.serialNumber;
	var accNum = obj.accNum;
	var teleNum = obj.teleNum;
	var startAcceptDate = obj.startAcceptDate;
	var endAcceptDate = obj.endAcceptDate;
	var exAcceptStaffid = obj.exAcceptStaffid;
	var credentialCode = obj.credentialCode;
	var placeOrderstartDate = obj.placeOrderstartDate;
	var placeOrderendDate = obj.placeOrderendDate;
	var placeOrderPhoneNumber = obj.placeOrderPhoneNumber;
	$("#orderType").val(orderType);
	$("#orderNum").val(orderNum);
	$("#serialNumber").val(serialNumber);
	$("#accNum").val(accNum);
	$("#teleNum").val(teleNum);
	$("#startAcceptDate").val(endAcceptDate);
	$("#endAcceptDate").val(endAcceptDate);
	$("#exAcceptStaffid").val(exAcceptStaffid);
	$("#credentialCode").val(credentialCode);
	$("#placeOrderstartDate").val(placeOrderstartDate);
	$("#placeOrderendDate").val(placeOrderendDate);
	$("#placeOrderPhoneNumber").val(placeOrderPhoneNumber);
}
//获取本地存储

// function getListLocalData() {
// 	var obj = getLocalData("web-in/order-list");
// 	if (obj != null) {
// 		var type = obj.type;
// 		localData(obj)
// 		if (type == 1) {
// 			showDiv('id1');
// 			$(".nav-tabs li").removeClass("active");
// 			$(".nav-tabs li").eq(0).addClass("active");
// 		} else if (type == 2) {
// 			showDiv('id2');
// 			$(".nav-tabs li").removeClass("active");
// 			$(".nav-tabs li").eq(1).addClass("active");
// 		} else if (type == 3) {
// 			showDiv('id3');
// 			$(".nav-tabs li").removeClass("active");
// 			$(".nav-tabs li").eq(2).addClass("active");
// 		}
// 	} else {
// 		showDiv('id1');
// 		$(".nav-tabs li").removeClass("active");
// 		$(".nav-tabs li").eq(0).addClass("active");
// 	}
// }
//存储本地存储
function setListLocalData(type, orderType, orderNum, serialNumber, accNum, teleNum, startAcceptDate, endAcceptDate, exAcceptStaffid, typ,placeOrderstartDate, placeOrderendDate, placeOrderPhoneNumber) {
	//在本地获取
	var obj = getLocalData("web-in/order-list");
	if (obj == null) {
		obj = {
			type: "",
			orderType: "",
			orderNum: "",
			serialNumber: "",
			accNum: "",
			teleNum: "",
			startAcceptDate: "",
			endAcceptDate: "",
			exAcceptStaffid: "",
			placeOrderstartDate: "",
			placeOrderendDate: "",
			placeOrderPhoneNumber: "",
		};
	};
	obj.type = type;
	//注意：排斥的查询需要把该清空的清空
	if (type == 1) {
		obj.orderType = "";
		obj.orderNum = orderNum;

	} else if (type == 2) {
		obj.serialNumber = serialNumber;
		obj.accNum = accNum;
		obj.teleNum = teleNum;
	} else if (type == 3) {
		obj.startAcceptDate = startAcceptDate;
		obj.endAcceptDate = endAcceptDate;
		obj.exAcceptStaffid = exAcceptStaffid;
	}else if (type == 5) {
		obj.placeOrderstartDate = placeOrderstartDate;
		obj.placeOrderendDate = placeOrderendDate;
		obj.placeOrderPhoneNumber = placeOrderPhoneNumber;
	}
	//console.log(obj)
	//向本地存储
	setLocalData("web-in/order-list", obj);
	if (TypeError == 5) {
		//因为要重置，再获取储存一遍；
		var obj1 = getLocalData("web-in/order-list");
		z_type(obj1);
	}


}

function z_type(obj1) {
	var orderNum = obj1.orderNum;
	var serialNumber = obj1.serialNumber
	var exAcceptStaffid = obj1.exAcceptStaffid;
	var accNum = obj1.accNum;
	var teleNum = obj1.teleNum;
	var num1 = 0;
	if (!orderNum) {
		num1 = 2
	}
	if (!serialNumber && !accNum) {
		num1 = 3
	} else {
		num1 = 2;
	}
	if (!exAcceptStaffid) {
		num1 = 1
	}
	if (!exAcceptStaffid && !orderNum) {
		num1 = 2;
	}
	if (!exAcceptStaffid && !orderNum && !serialNumber && !accNum) {
		num1 = 1;
	}
	obj1.type = num1;
	setLocalData("web-in/order-list", obj1);
}

//切换div
function showDiv(objId) { //alert(objId)
	var objDiv = document.getElementById(objId);
	var objDiv1 = document.getElementById("id1");
	var objDiv2 = document.getElementById("id2");
	var objDiv3 = document.getElementById("id3");
	var objDiv4 = document.getElementById("id4");
	var objDiv5 = document.getElementById("id5");

	objDiv1.style.display = "none";
	objDiv2.style.display = "none";
	objDiv3.style.display = "none";
	objDiv4.style.display = "none";
	objDiv5.style.display = "none";

	objDiv.style.display = "";

	//初始化日期
	if (objId == "id3") {
		$("#startAcceptDate").val(getBeforeDate("yyyy-mm-dd"));
		$("#endAcceptDate").val(getCurrentDate("yyyy-mm-dd"));
	}
	//初始化日期
	if (objId == "id5") {
		$("#placeOrderstartDate").val(getBeforeDate("yyyy-mm-dd"));
		$("#placeOrderendDate").val(getCurrentDate("yyyy-mm-dd"));
	}
}



function getOrderData(serialNumber, accNum, teleNum) {

	$.ajax({
		type: 'POST', // 测试  GET , 生成 POST
		async: true,
		url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=phoneInt&serialNumber=" + serialNumber + "&accNum=" + accNum + "&teleNum=" + teleNum), //这里将业务号码和对内外的标志作为参数传入Ajax中的url
		//url: getRootPath_web() + "/js/data/order-list-in.json?flag=int",
		dataType: 'json',
		//显示加载图标
		beforeSend: function() {
			showLoader();
		},
		complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if (resData == null) return;
			if (resData.state == 1) {
				makeList(resData);
				//存储
				setListLocalData(2, "", "", serialNumber, accNum, teleNum, "", "", "");
			} else {
				layer.open({
					content: '未找到匹配的数据！',
					style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;',
					time: 3
				});
			}

			/*for (j = 0; j < resData.rows.length; j++) {
				if (resData.rows[j].serialNumber == serialNumber) {
					break;
				} else {
					console.log("123");
					layer.open({
						content: '您输入的业务号码不存在',
						style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
						time: 3
					});
				}
			}*/

		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});

		}
	});
}


//沃易售---订单中心的查询
function getexTradeInmodeData(orderType, orderNum) {
	
	var array= locHref.split("&")
	console.log(array);
	$.ajax({
		type: 'POST', // 测试  GET , 生成 POST
		async: true,
		//url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&orderType=" + orderType + "&orderNum=" + orderNum), //这里将业务号码和对内外的标志作为参数传入Ajax中的url
		
		//将沃易售-订单中心的查询跳入到一个单独的方法中
		url: getOutUrl(getRootPath_web(), "/trade/queryOrderlist?flag=phone&orderType=" + orderType + "&orderNum=" + orderNum), //这里将业务号码和对内外的标志作为参数传入Ajax中的url
		//url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
		dataType: 'json',
		//显示加载图标
		beforeSend: function() {
			showLoader();
		},
		complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if (resData == null) return;
			if (resData.state == 1) {
				makeList(resData);
				//存储
				setListLocalData(1, orderType, orderNum, "", "", "", "", "", "");
			} else {
				layer.open({
					content: '未找到匹配的数据！',
					style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;',
					time: 3
				});
			}
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});

		}
	});
}


function getOrderData_3(startAcceptDate, endAcceptDate, exAcceptStaffid) {

	$.ajax({
		type: 'POST', // 测试  GET , 生成 POST
		async: true,
		url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=phoneInt&startAcceptDate=" + startAcceptDate + "&endAcceptDate=" + endAcceptDate + "&exAcceptStaffid=" + exAcceptStaffid),
		//url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
		dataType: 'json',
		//显示加载图标
		beforeSend: function() {
			showLoader();
		},
		complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if (resData == null) return;
			if (resData.state == 1) {
				makeList(resData);
				//存储
				//console.log(ocAcceptDate,exAcceptStaffid);
				setListLocalData(3, "", "", "", "", "", startAcceptDate, endAcceptDate, exAcceptStaffid);

			} else {
				layer.open({
					content: '未找到匹配的数据！',
					style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
					time: 3
				});
			}
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});

		}
	});
}


function getcredentialCode(credentialCode) {

	$.ajax({
		type: 'POST', // 测试  GET , 生成 POST
		async: true,
		url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&typeTable=phoneInt&credentialCode=" + credentialCode),
		//url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
		dataType: 'json',
		//显示加载图标
		beforeSend: function() {
			showLoader();
		},
		complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if (resData == null) return;
			if (resData.state == 1) {
				makeList(resData);
				//存储
				//console.log(ocAcceptDate,exAcceptStaffid);
				setListLocalData(3, "", "", "", "", "", startAcceptDate, endAcceptDate, exAcceptStaffid);

			} else {
				layer.open({
					content: '未找到匹配的数据！',
					style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
					time: 3
				});
			}
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});

		}
	});
}



//组装列表
function makeList(resData) {

	for (i = 0; i < resData.rows.length; i++) {

		var orderNum = resData.rows[i].orderNum;
		var provinceName = resData.rows[i].provinceName;
		var exTradeInmode = resData.rows[i].exTradeInmode;
		var member = resData.rows[i].member;
		//如果member为空，只有一个serialNumber,直接显示即可；member不为空则将其中的serialNumber全部取出拼接字符串返回
		if (member == null || member.length == 0) {
			var serialNumber = resData.rows[i].serialNumber;
		} else {
			serialNumber = getKeyNameArr("serialNumber", member, ",");
			for (var j = 0; j < member.length; j++) {
				if (member[j].serialNumber != "") {
					if (member[j].netTypeCode=="40"&&member[j].orderNum!=orderNum) { //双宽带区分业务号码
						var tempArr = remove(member, j);
						serialNumber = getKeyNameArr("serialNumber", tempArr, ","); //业务号码间用逗号隔开时，传入参数2；换行隔开时，传入参数1
					}
				}
			}
		}

		if (member == null || member.length == 0) {
			var bssSubscribeId = resData.rows[i].bssSubscribeId;
		} else {
			bssSubscribeId = getKeyNameArr("bssSubscribeId", member, ""); 
			for (var j = 0; j < member.length; j++) {
				if (member[j].bssSubscribeId != "") {
					if (member[j].netTypeCode=="40"&&member[j].orderNum!=orderNum) { //双宽带区分业务号码
						var tempArr = remove(member, j);
						bssSubscribeId = getKeyNameArr("bssSubscribeId", tempArr, ""); //业务号码间用逗号隔开时，传入参数2；换行隔开时，传入参数1
					}
				}
			}
			
		}


		var exAcceptStaffid = resData.rows[i].exAcceptStaffid;
		var ocAcceptDate = resData.rows[i].ocAcceptDate;
		var acceptDate = resData.rows[i].acceptDate;
		var productName = resData.rows[i].productName;
		var exTradeId = resData.rows[i].exTradeId;
		var ioTradeId = resData.rows[i].ioTradeId;
		//var bssSubscribeId = resData.rows[i].bssSubscribeId;
		var addrName = resData.rows[i].addrName;
		var customerName = resData.rows[i].customerName;
		var ocTradeType = resData.rows[i].ocTradeType;
		var xxTradeId = resData.rows[i].xxTradeId;


		orderNum = checkNullOrEmptyStr(orderNum) ? "" : orderNum;
		serialNumber = checkNullOrEmptyStr(serialNumber) ? "" : serialNumber;
		exTradeInmode = checkNullOrEmptyStr(exTradeInmode) ? "" : exTradeInmode;
		exAcceptStaffid = checkNullOrEmptyStr(exAcceptStaffid) ? "" : exAcceptStaffid;
		ocAcceptDate = checkNullOrEmptyStr(ocAcceptDate) ? "" : ocAcceptDate;
		acceptDate = checkNullOrEmptyStr(acceptDate) ? "" : acceptDate;
		productName = checkNullOrEmptyStr(productName) ? "" : productName;
		exTradeId = checkNullOrEmptyStr(exTradeId) ? "" : exTradeId;
		ioTradeId = checkNullOrEmptyStr(ioTradeId) ? "" : ioTradeId;
		bssSubscribeId = checkNullOrEmptyStr(bssSubscribeId) ? "" : bssSubscribeId;
		addrName = checkNullOrEmptyStr(addrName) ? "" : addrName;
		customerName = checkNullOrEmptyStr(customerName) ? "" : customerName;
		ocTradeType = checkNullOrEmptyStr(ocTradeType) ? "" : ocTradeType;
		xxTradeId = checkNullOrEmptyStr(xxTradeId) ? "" : xxTradeId;
		provinceName =  provinceName;



		if (bssSubscribeId != "") {
			var flowUrl = getOutUrl(getRootPath_web(), "/web-phone/web-in-order/page/flow-list-new.html?orderNum=" + orderNum);
		} else {
			var flowUrl = "javascript:void(0);";
		}

		if (ioTradeId != "") {
			var flowUr2 = getOutUrl(getRootPath_web(), "/web-phone/web-in-order/page/flow-list-new.html?orderNum=" + orderNum);
		} else {
			var flowUr2 = "javascript:void(0);";
		}
		
		if (exTradeId != "") {
			var flowUr3 = getOutUrl(getRootPath_web(), "/web-phone/web-in-order/page/flow-list-new.html?orderNum=" + orderNum);
		} else {
			var flowUr3 = "javascript:void(0);";
		}

		var listArea = "<ul>" +
			"<li class=\"hh1\">" +
			'<a href="' + flowUrl + '">' + "营业订单号：" + "" + bssSubscribeId + "</a>" +
			"</li>" +
			"<li class=\"hh1 line\">" +
			'<a href="' + flowUr3 + '">' + "渠道订单号：" + exTradeId + "</a>" +
			"</li>" +
			"<li class=\"hh1 line\">" +
			'<a href="' + flowUr2 + '">' + "沃易售订单号：" + xxTradeId + "</a>" +
			"</li>" +
			"<li class=\"hh2\">" +
			"受理渠道类型：" + exTradeInmode +
			"</li>" +
			"<li class=\"hh3\">" +
			"客户名称：" + customerName +
			"</li>" +
			"<li class=\"hh3\">" +
			"业务号码：" + serialNumber +
			"</li>" +
			"<li class=\"hh3\">" +
			"号码归属：" + provinceName +
			"</li>" +
			"<li class=\"hh3\">" +
			"产品名称：" + productName +
			"</li>" +
			"<li class=\"hh3 line\">" +
			"业务类型：" + ocTradeType +
			"</li>" +
			"<li class=\"hh5\">" +
			"装机地址：" + addrName +
			"</li>" +
			"<li class=\"hh6\">" +
			"<div class=\"fr\">" + ocAcceptDate + "</div>" +
			"</li>" +
			"</ul>"

		$('.listArea').append(listArea);
	}
}

//一个输入框中输入信息，另外两个输入框置灰
$("#serialNumber").focus(function() {
	$("#accNum").val('');
	$("#teleNum").val('');
	$(this).css('backgroundColor', '#fff');
	$("#accNum").css({
		'backgroundColor': '#DEDEDE'
	});
	$("#teleNum").css('backgroundColor', '#DEDEDE');
});

$("#accNum").focus(function() {
	$("#serialNumber").val('');
	$("#teleNum").val('');

	$(this).css('backgroundColor', '#fff');
	$("#serialNumber").css('backgroundColor', '#DEDEDE');
	$("#teleNum").css('backgroundColor', '#DEDEDE');
});

$("#teleNum").focus(function() {
	$("#accNum").val('');
	$("#serialNumber").val('');

	$(this).css('backgroundColor', '#fff');
	$("#serialNumber").css('backgroundColor', '#DEDEDE');
	$("#accNum").css('backgroundColor', '#DEDEDE');
});

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式  
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
	return iDays
}

//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
function GetDateDiff(startDiffTime, endDiffTime) {  
	startTime = startDiffTime.replace(/\-/g, "/");
	endTime = endDiffTime.replace(/\-/g, "/");
};

//本页面对象
var testTbObj = {
	//测试json
	//urlSearch: getOutUrl(getRootPath_web(), "/js/data/table-phone-test.json"), //  "/js/data/table.json"

	restContent: function() {
		$("#resetBtn1,#resetBtn2,#resetBtn3,#resetBtn4,.change").click(function() {
			$('#searchForm').resetForm();
			$(".listArea").empty();
		});
	},

	initDateplugin: function() {
		$('#startAcceptDate').mobiscroll().date({
			theme: 'android-ics', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】 
			display: 'bottom', //显示方【modal】【inline】【bubble】【top】【bottom】 
			mode: "scroller", //操作方式【scroller】【clickpick】【mixed】
			dateFormat: 'yy-mm-dd', // 日期格式  
			dateOrder: 'yymmdd', //面板中日期排列格式  
			setText: '确定', //确认按钮名称  
			cancelText: '取消', //取消按钮名籍我  
			showNow: true, // [now]按钮是否显示
			nowText: "今天", // [now]按钮中文显示
			endYear: 2050, //结束年份  
			minWidth: 200,
			height: 50, //行高
			rows: 3, //可见行数
			lang: 'zh',
		});
		$('#endAcceptDate').mobiscroll().date({
			theme: 'android-ics', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】 
			display: 'bottom', //显示方【modal】【inline】【bubble】【top】【bottom】 
			mode: "scroller", //操作方式【scroller】【clickpick】【mixed】
			dateFormat: 'yy-mm-dd', // 日期格式  
			dateOrder: 'yymmdd', //面板中日期排列格式  
			setText: '确定', //确认按钮名称  
			cancelText: '取消', //取消按钮名籍我  
			showNow: true, // [now]按钮是否显示
			nowText: "今天", // [now]按钮中文显示
			endYear: 2050, //结束年份  
			minWidth: 200,
			height: 50, //行高
			rows: 3, //可见行数
			lang: 'zh',
		});
		$('#placeOrderstartDate').mobiscroll().date({
			theme: 'android-ics', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】
			display: 'bottom', //显示方【modal】【inline】【bubble】【top】【bottom】
			mode: "scroller", //操作方式【scroller】【clickpick】【mixed】
			dateFormat: 'yy-mm-dd', // 日期格式
			dateOrder: 'yymmdd', //面板中日期排列格式
			setText: '确定', //确认按钮名称
			cancelText: '取消', //取消按钮名籍我
			showNow: true, // [now]按钮是否显示
			nowText: "今天", // [now]按钮中文显示
			endYear: 2050, //结束年份
			minWidth: 200,
			height: 50, //行高
			rows: 3, //可见行数
			lang: 'zh',
		});
		$('#placeOrderendDate').mobiscroll().date({
			theme: 'android-ics', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】
			display: 'bottom', //显示方【modal】【inline】【bubble】【top】【bottom】
			mode: "scroller", //操作方式【scroller】【clickpick】【mixed】
			dateFormat: 'yy-mm-dd', // 日期格式
			dateOrder: 'yymmdd', //面板中日期排列格式
			setText: '确定', //确认按钮名称
			cancelText: '取消', //取消按钮名籍我
			showNow: true, // [now]按钮是否显示
			nowText: "今天", // [now]按钮中文显示
			endYear: 2050, //结束年份
			minWidth: 200,
			height: 50, //行高
			rows: 3, //可见行数
			lang: 'zh',
		});
	},
}
//底部广告
function Advertisement(){
	$.ajax({
		type:'POST',
		data:{imgKey:"1"}, //后台传递的参数参数
		dataType:'json', 
		url: getOutUrl(getRootPath_web(),"/trade/commonPicture?imgKey="+"1"),
		success: function(data) {
			//alert(data.name);
			//alert("../images/"+data.name);
			$("#adBtm").attr("src","../images/"+data.name);
		},
		error:function(data){
			alert('响应失败！');
		}
	});
}
Advertisement();
//沃易赚小程序添加返回页面
$("#backWechat").click(function(){
	console.log("返回小程序界面成功")
	wx.miniProgram.redirectTo({url: '../../pages/home/home'});
})

/**
 * 在线反馈界面跳转
 */
$("#floatFrame1").click(function () {
	console.log("将要进行界面跳转");
	$(location).attr('href', "/queryCenter/web-phone/web-in-order/page/feedBackPhone.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05");
});

$("#open_zqzasearch").click(function(){
    window.location.href = getOutUrl(getRootPath_web(),"/web-phone/web-in-order/page/order-zqza-search-validate.html");
})