/**
 *
 * 
 */
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);
//初始化Ai数据
var statics_in = [];
statics_in[0] = {workFlag:8,aCount:0,bCount:0},
statics_in[1] = {workFlag:9,aCount:0,bCount:0},
statics_in[2] = {workFlag:10,aCount:0,bCount:0},
statics_in[3] = {workFlag:11,aCount:0,bCount:0},
statics_in[4] = {workFlag:12,aCount:0,bCount:0},
statics_in[5] = {workFlag:13,aCount:0,bCount:0},
statics_in[6] = {workFlag:14,aCount:0,bCount:0},
statics_in[7] = {workFlag:15,aCount:0,bCount:0},
statics_in[8] = {workFlag:16,aCount:0,bCount:0},
statics_in[9] = {workFlag:17,aCount:0,bCount:0},
statics_in[10] = {workFlag:18,aCount:0,bCount:0}
//初始化Bi数据
var statics_out = [];
statics_out[0] = {workFlag:1,aCount:0,bCount:0},
statics_out[1] = {workFlag:19,aCount:0,bCount:0},
statics_out[2] = {workFlag:2,aCount:0,bCount:0},
statics_out[3] = {workFlag:3,aCount:0,bCount:0},
statics_out[4] = {workFlag:4,aCount:0,bCount:0},
statics_out[5] = {workFlag:5,aCount:0,bCount:0},
statics_out[6] = {workFlag:6,aCount:0,bCount:0},
statics_out[7] = {workFlag:7,aCount:0,bCount:0}
var workCatalog=0;
$(function() {
	$('#Lnav ul>li').on('click', function() {
		var _index = $(this).index();
		$(this).addClass('Lcheck').siblings().removeClass('Lcheck');
		$('.tables>li').eq(_index).addClass('on').siblings().removeClass('on');
		//判断线上线下
		if($('.in').hasClass('Lcheck')){
			workCatalog=0
			$.ajax({
				type:"post",
				url:getOutUrl(getRootPath_web(), "/monitor/querySaleArea?userParam="+locHref),
				async:true,
				dataType: 'json',
				success: function(res) {
					sessionStorage.setItem("value_in",  res.developerArea);//把data对应的值保存到sessionStorage
					var arr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","dkhzx","11a01q","227","11a0a1","11a0al","11a01r","11a01s","11a08x"];
					arr.forEach(function(value,index){
				    	//console.log(value)
				      //遍历所有option
				    	if(res.developerArea == "all"){
				    		$("option").addClass("show");
				    	}else{
				    		if(value == res.developerArea){
				        	   //console.log(11)
				        	   //$("#liabilityState option[value!=value]").remove();
				        	   $("option[value = "+value+"]").addClass("show");
				            }else{
				            	$("option").addClass("hide");
				            }
				    	}
				    });
					
					var developerArea1 = res.developerArea;
					var value = $('#liabilityState option:selected').val()
					developerArea1 = value
					console.log(developerArea1)
					makeSvgOnline(locHref,developerArea1);
				}
			});
		}else if($('.out').hasClass('Lcheck')){
			workCatalog=1
			$.ajax({
				type:"post",
				url:getOutUrl(getRootPath_web(), "/monitor/querySaleArea?userParam="+locHref),
				async:true,
				dataType: 'json',
				success: function(res) {
					sessionStorage.setItem("value_out",  res.developerArea);//把data对应的值保存到sessionStorage
					var arr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","dkhzx","11a01q","227","11a0a1","11a0al","11a01r","11a01s","11a08x"];
				    arr.forEach(function(value,index){
				    	//console.log(value)
				      //遍历所有option
				    	if(res.developerArea == "all"){
				    		$("option").addClass("show");
				    	}else{
				    		if(value == res.developerArea){
				        	   //console.log(11)
				        	   //$("#liabilityState option[value!=value]").remove();
				        	   $("option[value = "+value+"]").addClass("show");
				            }else{
				            	$("option").addClass("hide");
				            }
				    	}
				    });
					
					var developerArea1 = res.developerArea;
					var value = $('#liabilityStates option:selected').val()
					developerArea1 = value
					console.log(developerArea1)
					makeSvgUnderline(locHref,developerArea1);
				}
			});
		}
	})
})

//下拉框事件

$(document).on("change","#liabilityState",function(){
	var value_in = $('#liabilityState option:selected').val()
	sessionStorage.setItem("value_in", value_in);//把data对应的值保存到sessionStorage
	makeSvgOnline(locHref,value_in);
})

$(document).on("change","#liabilityStates",function(){
	var value_out = $('#liabilityStates option:selected').val()
	sessionStorage.setItem("value_out", value_out);//把data对应的值保存到sessionStorage
	makeSvgUnderline(locHref,value_out);
})

//定时刷新
setInterval(function() {
	if($('.in').hasClass('Lcheck')){
		var value_in = $('#liabilityState option:selected').val();
		makeSvgOnline(locHref,value_in);
	}else if($('.out').hasClass('Lcheck')){
		var value_out = $('#liabilityStates option:selected').val();
		makeSvgUnderline(locHref,value_out);
	}
}, 2 * 60 * 1000);

//判断浏览器版本
function IEVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
	if(isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if(fIEVersion == 7) {
			return 7;
		} else if(fIEVersion == 8) {
			return 8;
		} else if(fIEVersion == 9) {
			return 9;
		} else if(fIEVersion == 10) {
			return 10;
		} else {
			return 6; //IE版本<=6
		}
	} else if(isEdge) {
		return 'edge'; //edge
	} else if(isIE11) {
		return 11; //IE11  
	} else {
		return -1; //不是ie浏览器
	}
}



function makeSvgOnline(userParam1,developerArea1) {
	var iev = IEVersion(); //浏览器版本
	var lv_ie;
	if(iev >= 9) {
		lv_ie = 16;
	} else {
		lv_ie = 10;
	}

	var flowChart = $("#flowChart");
	var chooseDiv = $("#chooseDiv");
	
	var userParam = "";
	var developerArea = "";
	var data = {
		userParam:userParam1,
		developerArea:developerArea1
	}

	$.ajax({
		type: "post",// 测试 GET 生产POST
		/*url: "test.json",*/
		url : getOutUrl(getRootPath_web(), "/monitor/queryOnlineFlow?userParam="+userParam1+"&developerArea="+developerArea1),
		async: true,
		dataType: 'json',
		data:data,
		success: function(res) {
			/*var optStr = '';
			optStr = '<img src="../images/artboard.png" class="jt">' +
			'<select id="liabilityState" class="liabilityState">' + 
				'<option value="">请选择归属销售线</option>' +
				'<option value="225">二区</option>' +
				'<option value="226">三区</option>' +
				'<option value="211">四区</option>' +
				'<option value="212">五区</option>' +
				'<option value="213">七区</option>' +
				'<option value="214">八区</option>' +
				'<option value="217">通州</option>' +
				'<option value="219">昌平</option>' +
				'<option value="220">大兴</option>' +
				'<option value="218">顺义</option>' +
				'<option value="216">房山</option>' +
				'<option value="223">密云</option>' +
				'<option value="221">怀柔</option>' +
				'<option value="215">门头沟</option>' +
				'<option value="222">平谷</option>' +
				'<option value="224">延庆</option>' +
				'<option value="all">大客户中心</option>' +
				'<option value="all">电商部</option>' +
				'<option value="all">客服中心</option>' +
				'<option value="all">重通局</option>' +
				'<option value="all">产品支撑中心</option>' +
				'<option value="all">北京国际业务中心</option>' +
				'<option value="all">北京市场支撑中心</option>' +
				'<option value="all">北京集团客户</option>' +
				'<option value="all">北京电子渠道</option>' +
				'<option value="all">北京导航中心</option>' +
				'<option value="all">北京宽带业务中心</option>' +
				'<option value="all">北京互联互通部</option>' +
				'<option value="all">北京产创</option>' +
				'<option value="all">其它</option>' +
			'</select>'
			chooseDiv.html(optStr);*/
			
			
			var picS = res.rows;

			for (var i = 0; i < statics_in.length; i++){
			    statics_in[i].aCount = 0;
			    statics_in[i].bCount = 0;
			}
			
			for (var i = 0; i < statics_in.length; i++){
			    var num =0
			    
			    for (var j = 0; j < picS.length; j++) {
			        if (statics_in[i].workFlag == picS[j].workFlag) {
			            num++
			            statics_in[i].aCount = picS[j].aCount;
			            statics_in[i].bCount = picS[j].bCount;
			        }
			    }
			}
			console.log(statics_in)
			
			var aCount = statics_in[0].aCount;
			var aCount1 = statics_in[1].aCount;
			var aCount2 = statics_in[2].aCount;
			var aCount3 = statics_in[3].aCount;
			var aCount4 = statics_in[4].aCount;
			var aCount5 = statics_in[5].aCount;
			var aCount6 = statics_in[6].aCount;
			var aCount7 = statics_in[7].aCount;
			var aCount8 = statics_in[8].aCount;
			var aCount9 = statics_in[9].aCount;
			var aCount10 = statics_in[10].aCount;
			
			var bCount = statics_in[0].bCount;
			var bCount1 = statics_in[1].bCount;
			var bCount2 = statics_in[2].bCount;
			var bCount3 = statics_in[3].bCount;
			var bCount4 = statics_in[4].bCount;
			var bCount5 = statics_in[5].bCount;
			var bCount6 = statics_in[6].bCount;
			var bCount7 = statics_in[7].bCount;
			var bCount8 = statics_in[8].bCount;
			var bCount9 = statics_in[9].bCount;
			var bCount10 = statics_in[10].bCount;
			
			var imag59 = '../images/wys/Group 59.png';
			var imag60 = '../images/wys/Group 60.png';
			var imag61 = '../images/wys/Group 61.png';
			var imag62 = '../images/wys/Group 62.png';

			var imag25 = '../images/wys/Group 25.png';
			var imag26 = '../images/wys/Group 26.png';
			var imag58 = '../images/wys/Group 58.png';
			var imag33 = '../images/wys/Group 33.png';
			var imag34 = '../images/wys/Group 34.png';
			var imag35 = '../images/wys/Group 35.png';
			var imag36 = '../images/wys/Group 36.png';

			var imag32 = '../images/wys/Group 32.png';
			var imag27 = '../images/wys/Group 27.png';
			var imag28 = '../images/wys/Group 28.png';
			var imag38 = '../images/wys/Group 38.png';
			var imag31 = '../images/wys/Group 31.png';

			var imag29 = '../images/wys/Group 29.png';
			var imag30 = '../images/wys/Group 30.png';
			var imag37 = '../images/wys/Group 37.png';

			var gif1 = '../images/wys/1.gif';
			var gif2 = '../images/wys/2.gif';
			var gif3 = '../images/wys/3.gif';
			var gif4 = '../images/wys/4.gif';
			var gif5 = '../images/wys/5.gif';
			var gif6 = '../images/wys/6.gif';
			var gif7 = '../images/wys/7.gif';
			var gif8 = '../images/wys/8.gif';
			var gif9 = '../images/wys/9.gif';
			var gif10 = '../images/wys/10.gif';
			var gif11 = '../images/wys/11.gif';

			
			var changeImg = bCount > 0 ? gif2 : imag26;
			var changeImg1 = bCount1 > 0 ? gif7 : imag58;
			var changeImg2 = bCount2 > 0 ? gif10 : imag33;
			var changeImg3 = bCount3 > 0 ? gif9 : imag35;
			var changeImg4 = bCount10 > 0 ? gif11 : imag32;
			var changeImg5 = bCount4 > 0 ? gif3 : imag27;
			var changeImg6 = bCount5 > 0 ? gif4 : imag28;
			var changeImg7 = bCount6 > 0 ? gif8 : imag38;
			var changeImg8 = bCount7 > 0 ? gif6 : imag31;
			var changeImg9 = bCount8 > 0 ? gif5 : imag29;
			var str = '';
			str = '<svg height="100%" width="100%" viewBox="0,0,1100,450">' +
				'<defs>' +
				'<marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
				'<path d="M0,0 L0,4 L4,2 L0,0 Z" fill="#f39800" />' +
				'</marker>' +
				'<marker id="arrow1" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
				'<path d="M0,0 L0,4 L4,2 L0,0 Z" fill="#9fa0a0" />' +
				'</marker>' +
				'</defs>' + 

				'<image class="wys" xlink:href="' + imag59 + '" x="0" y="23" height="44" width="70" />' +
				'<image class="wys" xlink:href="' + imag60 + '" x="0" y="68" height="44" width="70" />' +
				'<image class="wys" xlink:href="' + imag61 + '" x="0" y="113" height="44" width="70" />' +
				'<image class="wys" xlink:href="' + imag62 + '" x="0" y="158" height="44" width="70" />' +

				'<line x1="70" y1="50" x2="112" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image class="img25" xlink:href="' + imag25 + '" x="124" y="22" height="62" width="70" />' +

				'<line x1="194" y1="50" x2="232" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg + '" x="244" y="22" height="62" width="70" data-id="'+statics_in[0].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="246" y="18"  data-type="0" data-id="'+statics_in[0].workFlag+'">' + aCount + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="314" y="18"  data-type="1" data-id="'+statics_in[0].workFlag+'">' + bCount + '</text>' +
				
				'<line x1="314" y1="50" x2="448" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg1 + '" x="460" y="22" height="62" width="70" data-id="'+statics_in[1].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="462" y="18" data-type="0" data-id="'+statics_in[1].workFlag+'">' + aCount1 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="530" y="18" data-type="1" data-id="'+statics_in[1].workFlag+'">' + bCount1 + '</text>' +
				

				'<line x1="530" y1="50" x2="584" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg2 + '" x="596" y="22" height="62" width="70" data-id="'+statics_in[2].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="598" y="18" data-type="0" data-id="'+statics_in[2].workFlag+'">' + aCount2 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="666" y="18" data-type="1" data-id="'+statics_in[2].workFlag+'">' + bCount2 + '</text>' +

				'<line x1="666" y1="50" x2="714" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image class="img34" xlink:href="' + imag34 + '" x="726" y="22" height="62" width="70" />' +

				'<line x1="796" y1="50" x2="844" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg3 + '" x="856" y="22" height="62" width="70" data-id="'+statics_in[3].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="858" y="18" data-type="0" data-id="'+statics_in[3].workFlag+'">' + aCount3 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="924" y="18" data-type="1" data-id="'+statics_in[3].workFlag+'">' + bCount3 + '</text>' +

				'<line x1="926" y1="50" x2="974" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow)" />' +
				'<image class="img36" xlink:href="' + imag36 + '" x="986" y="22" height="62" width="70" />' +

				'<line x1="202" y1="50" x2="202" y2="372" stroke="#9fa0a0" stroke-width="3" />' +

				'<line x1="202" y1="242" x2="224" y2="242" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg5 + '" x="234" y="208" height="66" width="94"  data-id="'+statics_in[4].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="246" y="214"  data-type="0" data-id="'+statics_in[4].workFlag+'">' + aCount4 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="314" y="214"  data-type="1" data-id="'+statics_in[4].workFlag+'">' + bCount4 + '</text>' +

				'<line x1="280" y1="342" x2="280" y2="286" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<line x1="496" y1="264" x2="496" y2="330" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +

				'<line x1="632" y1="82" x2="632" y2="108" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg4 + '" x="596" y="120" height="62" width="70" data-id="'+statics_in[10].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="598" y="116"  data-type="0" data-id="'+statics_in[10].workFlag+'">' + aCount10 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="666" y="116"  data-type="1" data-id="'+statics_in[10].workFlag+'">' + bCount10 + '</text>' +

				'<line x1="496" y1="82" x2="496" y2="196" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg7 + '" x="450" y="208" height="66" width="94" marker-end="url(#arrow1)" data-id="'+statics_in[6].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="462" y="214"  data-type="0" data-id="'+statics_in[6].workFlag+'">' + aCount6 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="530" y="214"  data-type="1" data-id="'+statics_in[6].workFlag+'">' + bCount6 + '</text>' +
				'<line x1="280" y1="84" x2="280" y2="196" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<line x1="280" y1="206" x2="280" y2="94" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +

				'<line x1="452" y1="242" x2="440" y2="242" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg6 + '" x="358" y="212" height="62" width="70" data-id="'+statics_in[5].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="360" y="208"  data-type="0" data-id="'+statics_in[5].workFlag+'">' + aCount5 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="428" y="208"  data-type="0" data-id="'+statics_in[5].workFlag+'">' + bCount5 + '</text>' +

				'<line x1="542" y1="242" x2="584" y2="242" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg8 + '" x="596" y="212" height="62" width="70" data-id="'+statics_in[7].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="598" y="208"  data-type="0" data-id="'+statics_in[7].workFlag+'">' + aCount7 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="666" y="208"  data-type="1" data-id="'+statics_in[7].workFlag+'">' + bCount7 + '</text>' +

				'<line x1="202" y1="370" x2="232" y2="370" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg9 + '" x="244" y="342" height="62" width="70"  data-id="'+statics_in[8].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="246" y="336"  data-type="0" data-id="'+statics_in[8].workFlag+'">' + aCount8 + '</text>' +
				'<text class="bCount" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="314" y="336"  data-type="1" data-id="'+statics_in[8].workFlag+'">' + bCount8 + '</text>' +

				'<line x1="314" y1="370" x2="448" y2="370" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image style ="cursor: pointer;" class="imgs" xlink:href="' + imag30 + '" x="460" y="342" height="62" width="70"  data-id="'+statics_in[9].workFlag+'"/>' +
				'<text class="aCount" style="font-size:13px;fill:#000;cursor: pointer;" x="462" y="336"  data-type="0" data-id="'+statics_in[9].workFlag+'">' + aCount9 + '</text>' +

				'<line x1="530" y1="370" x2="974" y2="370" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow1)" />' +
				'<image class="img37" xlink:href="' + imag37 + '" x="986" y="342" height="62" width="70" />' +
				'<text class="Count" style="font-size:13px;font-family:PingFang-SC-Medium;fill:#000;" x="0" y="330">说明：各环节图标左上角数字为当</text>' +
				'<text class="Count" style="font-size:13px;font-family:PingFang-SC-Medium;fill:#000;" x="0" y="350">前处于此环节的工单总量，右上角</text>' +
				'<text class="Count" style="font-size:13px;font-family:PingFang-SC-Medium;fill:#000;" x="0" y="370">数字为当前此环节的超时工单量。</text>' +
				'</svg>'

			flowChart.html(str);
			imageIframe();
			textIframe_in();
			textIframe_in1();
			
			//重新赋值下拉框
			//console.log(developerArea1)
			//var options = $("#liabilityState").find("option:selected").val();
			//var options = $('#liabilityState option:selected').val()
			//console.log(options)
			
			//var options=$("#liabilityState option:selected").text();
			//console.log(options)
		},
		error: function() {

		}
	});

}

function makeSvgUnderline(userParam1,developerArea1) {
	var iev = IEVersion(); //浏览器版本
	var lv_ie;
	if(iev >= 9) {
		lv_ie = 16;
	} else {
		lv_ie = 10;
	}
	var flowChart1 = $("#flowChart1");
	var chooseDiv1 = $("#chooseDiv1");
	var data = {
		userParam:userParam1,
		developerArea:developerArea1
	}
	$.ajax({
		type: "post",// 测试 GET 生产POST
		/*url: "test.json",*/
		url : getOutUrl(getRootPath_web(), "/monitor/queryOutlineFlow?userParam="+userParam1+"&developerArea="+developerArea1),
		async: true,
		dataType: 'json',
		data:data,
		success: function(res) {
			/*var optStr1 = '';
			optStr1 = '<img src="../images/artboard.png" class="jt">' +
			'<select id="liabilityStates" class="liabilityStates">' + 
			'<option value="">请选择归属销售线</option>' +
			'<option value="225">二区</option>' +
			'<option value="226">三区</option>' +
			'<option value="211">四区</option>' +
			'<option value="212">五区</option>' +
			'<option value="213">七区</option>' +
			'<option value="214">八区</option>' +
			'<option value="217">通州</option>' +
			'<option value="219">昌平</option>' +
			'<option value="220">大兴</option>' +
			'<option value="218">顺义</option>' +
			'<option value="216">房山</option>' +
			'<option value="223">密云</option>' +
			'<option value="221">怀柔</option>' +
			'<option value="215">门头沟</option>' +
			'<option value="222">平谷</option>' +
			'<option value="224">延庆</option>' +
			'<option value="all">大客户中心</option>' +
			'<option value="all">电商部</option>' +
			'<option value="all">客服中心</option>' +
			'<option value="all">重通局</option>' +
			'<option value="all">产品支撑中心</option>' +
			'<option value="all">北京国际业务中心</option>' +
			'<option value="all">北京市场支撑中心</option>' +
			'<option value="all">北京集团客户</option>' +
			'<option value="all">北京电子渠道</option>' +
			'<option value="all">北京导航中心</option>' +
			'<option value="all">北京宽带业务中心</option>' +
			'<option value="all">北京互联互通部</option>' +
			'<option value="all">北京产创</option>' +
			'<option value="all">其它</option>' +
			'</select>'
			chooseDiv1.html(optStr1);*/
			
			
			var picS = res.rows;
			
			for (var i = 0; i < statics_out.length; i++){
				statics_out[i].aCount = 0;
				statics_out[i].bCount = 0;
			}
			
			for (var i = 0; i < statics_out.length; i++){
			    var num =0
			    for (var j = 0; j < picS.length; j++) {
			        if (statics_out[i].workFlag == picS[j].workFlag) {
			            num++
			            statics_out[i].aCount = picS[j].aCount;
			            statics_out[i].bCount = picS[j].bCount;
			        }
			    }
			}
			
			
			var image30 = '../images/yyt/Group 30.png';
			var image31 = '../images/yyt/Group 31.png';
			var image32 = '../images/yyt/Group 111.png';
			var image33 = '../images/yyt/Group 33.png';
	
			var image1 = '../images/yyt/Group.png';
			var image2 = '../images/yyt/Group 2.png';
			var image3 = '../images/yyt/Group 3.png';
			var image4 = '../images/yyt/Group 4.png';
			var image5 = '../images/yyt/Group 5.png';
			var image29 = '../images/yyt/Group29.png';
	
			var image9 = '../images/yyt/Group 9.png';
			var image7 = '../images/yyt/Group 7.png';
			var image6 = '../images/yyt/Group 6.png';
	
			var image8 = '../images/yyt/Group 8.png';
			var image10 = '../images/yyt/Group 10.png';
	
			var gif1 = '../images/yyt/1.gif';
			var gif2 = '../images/yyt/2.gif';
			var gif3 = '../images/yyt/3.gif';
			var gif4 = '../images/yyt/4.gif';
			var gif5 = '../images/yyt/5.gif';
			var gif6 = '../images/yyt/6.gif';
			var gif7 = '../images/yyt/7.gif';
			
			var aCount = statics_out[0].aCount;
			var aCount1 = statics_out[1].aCount;
			var aCount2 = statics_out[2].aCount;
			var aCount3 = statics_out[3].aCount;
			var aCount4 = statics_out[4].aCount;
			var aCount5 = statics_out[5].aCount;
			var aCount6 = statics_out[6].aCount;
			var aCount7 = statics_out[7].aCount;
			
			var bCount = statics_out[0].bCount;
			var bCount1 = statics_out[1].bCount;
			var bCount2 = statics_out[2].bCount;
			var bCount3 = statics_out[3].bCount;
			var bCount4 = statics_out[4].bCount;
			var bCount5 = statics_out[5].bCount;
			var bCount6 = statics_out[6].bCount;
			var bCount7 = statics_out[7].bCount;
			
			var changeImg = bCount > 0 ? gif3 : image2;
			var changeImg1 = bCount1 > 0 ? gif2 : image3;
			var changeImg2 = bCount2 > 0 ? gif7 : image4;
			var changeImg3 = bCount4 > 0 ? gif6 : image9;
			var changeImg4 = bCount5 > 0 ? gif4 : image7;
			var changeImg5 = bCount6 > 0 ? gif1 : image6;
			var changeImg6 = bCount7 > 0 ? gif5 : image8;

			
			var str = '';
			str = '<svg height="100%" width="100%" viewBox="0,0,1100,450">' +
				'<defs>' +
				'<marker id="arrow2" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
				'<path d="M0,0 L0,4 L4,2 z" fill="#f39800" />' +
				'</marker>' +
				'<marker id="arrow3" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
				'<path d="M0,0 L0,4 L4,2 z" fill="#9fa0a0" />' +
				'</marker>' +
				'</defs>' +
	
				'<image class="yyt" xlink:href="' + image30 + '" x="0" y="23" height="44" width="70" />' +
				'<image class="yyt" xlink:href="' + image31 + '" x="0" y="68" height="44" width="70" />' +
				'<image class="yyt" xlink:href="' + image32 + '" x="0" y="113" height="44" width="70" />' +
				'<image class="yyt" xlink:href="' + image33 + '" x="0" y="158" height="44" width="70" />' +
	
				'<line x1="70" y1="50" x2="102" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow2)" />' +
				'<image class="img1" xlink:href="' + image1 + '" x="114" y="22" height="62" width="82" />' +
	
				'<line x1="196" y1="50" x2="264" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow2)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg + '" x="276" y="22" height="62" width="82"   data-id="'+statics_out[0].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="278" y="18"  data-type="0" data-id="'+statics_out[0].workFlag+'">'+ aCount +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="358" y="18"  data-type="1" data-id="'+statics_out[0].workFlag+'">'+ bCount +'</text>' +
	
				'<line x1="358" y1="50" x2="426" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow2)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg1 + '" x="438" y="22" height="62" width="82" data-id="'+statics_out[1].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="440" y="18"  data-type="0" data-id="'+statics_out[1].workFlag+'">'+ aCount1 +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="518" y="18"  data-type="1" data-id="'+statics_out[1].workFlag+'">'+ bCount1 +'</text>' +
	
				'<line x1="520" y1="50" x2="588" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow2)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg2 + '" x="600" y="22" height="62" width="82"  data-id="'+statics_out[2].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="602" y="18"  data-type="0" data-id="'+statics_out[2].workFlag+'">'+ aCount2 +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="680" y="18"  data-type="1" data-id="'+statics_out[2].workFlag+'">'+ bCount2 +'</text>' +
	
				'<line x1="682" y1="50" x2="750" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow2)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + image5 + '" x="762" y="22" height="62" width="82"  data-id="'+statics_out[3].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="764" y="18"  data-type="0" data-id="'+statics_out[3].workFlag+'">'+ aCount3 +'</text>' +
	
				'<line x1="844" y1="50" x2="908" y2="50" stroke="#f39800" stroke-width="3" marker-end="url(#arrow2)" />' +
				'<image class="img29" xlink:href="' + image29 + '" x="920" y="22" height="62" width="82" />' +
	
				'<line x1="318" y1="192" x2="318" y2="96" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg3 + '" x="276" y="192" height="62" width="82"   data-id="'+statics_out[4].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="278" y="188"  data-type="0" data-id="'+statics_out[4].workFlag+'">'+ aCount4 +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="358" y="188"  data-type="1" data-id="'+statics_out[4].workFlag+'">'+ bCount4 +'</text>' +
	
				'<line x1="640" y1="84" x2="640" y2="168" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg4 + '" x="586" y="180" height="78" width="108" data-id="'+statics_out[5].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="602" y="188"  data-type="0" data-id="'+statics_out[5].workFlag+'">'+ aCount5 +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="680" y="188"  data-type="1" data-id="'+statics_out[5].workFlag+'">'+ bCount5 +'</text>' +
	
				'<line x1="586" y1="219" x2="370" y2="219" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
				'<line x1="360" y1="219" x2="576" y2="219" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
	
				'<line x1="692" y1="219" x2="752" y2="219" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg5 + '" x="764" y="192" height="62" width="82" data-id="'+statics_out[6].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="766" y="188"  data-type="0" data-id="'+statics_out[6].workFlag+'">'+ aCount6 +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="846" y="188"  data-type="1" data-id="'+statics_out[6].workFlag+'">'+ bCount6 +'</text>' +
	
				'<line x1="640" y1="258" x2="640" y2="348" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
				'<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg6 + '" x="600" y="360" height="62" width="82"  data-id="'+statics_out[7].workFlag+'"/>' +
				'<text class="aCount1" style="font-size:13px;fill:#000;cursor: pointer;" x="602" y="356"  data-type="0" data-id="'+statics_out[7].workFlag+'">'+ aCount7 +'</text>' +
				'<text class="bCount1" style="font-size:13px;fill:#000;cursor: pointer;text-anchor: end" x="680" y="356"  data-type="1" data-id="'+statics_out[7].workFlag+'">'+ bCount7 +'</text>' +
	
				'<line x1="682" y1="390" x2="908" y2="390" stroke="#9fa0a0" stroke-width="3" marker-end="url(#arrow3)" />' +
				'<image class="img10" xlink:href="' + image10 + '" x="920" y="360" height="62" width="82" />' +
				
				'<text class="Count" style="font-size:13px;font-family:PingFang-SC-Medium;fill:#000;" x="0" y="350">说明：各环节图标左上角数字为当</text>' +
				'<text class="Count" style="font-size:13px;font-family:PingFang-SC-Medium;fill:#000;" x="0" y="370">前处于此环节的工单总量，右上角</text>' +
				'<text class="Count" style="font-size:13px;font-family:PingFang-SC-Medium;fill:#000;" x="0" y="390">数字为当前此环节的超时工单量。</text>' +
				'</svg>'
			flowChart1.html(str);
			imageIframe1();
			textIframe_out();
			textIframe_out1();
			
		},
		error: function() {

		}
	});
}

//线上
function imageIframe(){
	var arr_image = document.getElementsByClassName("imgs");
	for(var i = 0; i < arr_image.length; i++) {
		arr_image[i].onclick = function() {
			console.log(this);
			var id = $(this).attr('data-id')
			var valuein_developerArea =  sessionStorage.getItem("value_in")
			console.log($(this).attr('data-id'))
			$('#chart_export').attr('data-chartid',id)
			$('#chart_export').attr('data-workcatalog',workCatalog)
			table_chart(id,workCatalog,valuein_developerArea)
			console.log($('#chart_export').attr('data-workCatalog'))
			$('#myModal_chart').modal('show')
			var data={
				workFlag:id,
				workCatalog:0,
				developerArea:valuein_developerArea,
			}
			$.ajax({
				type: 'post',
				url : getOutUrl(getRootPath_web(), "/monitor/queryFlowNum?workFlag="+id+'&developerArea='+valuein_developerArea+'&workCatalog=0'),
				dataType: 'json',
				data: data,
				success: function(data) {
					var arr_rows = data.rows
					var numA=[]
					var numB=[]
					var numX=["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云", "怀\n柔","门\n头\n沟","平\n谷","延\n庆","大\n客\n户\n中\n心","","市\n支\n中\n心","客\n服\n中\n心","重\n通\n局","国\n际\n业\n务\n中\n心", "集\n团\n客\n户","电\n子\n渠\n道","其\n它"]
					//var numX=["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云", "怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","其\n它"]
					/*var numX = data.developerAreaName*/
					for(var i = 0; i < arr_rows.length; i++){
						numA.push(arr_rows[i].aCount)
						numB.push(arr_rows[i].bCount)
					}
					console.log(numA)
					var dataTimeyear = data.time.substr(0,4)
					var dataTimemonth = data.time.substr(4,2)
					var dataTimeday = data.time.substr(6,2)
					var dataTimeh = data.time.substr(8,2)
					var dataTimeminute = data.time.substr(10,2)
					var time = dataTimeyear+'年'+dataTimemonth+'月'+dataTimeday+'日'+dataTimeh+'时'+dataTimeminute+'分'
					$('#timeFlag').text("更新日期:"+time)
					setTimeout(function() {
						chart(numX, numA, numB)
					}, 100)
				},
				error: function() {

				}
			});
		}
	}
}

/*function textIframe_in(){
	var arr = document.getElementsByClassName("aCount");
	$('.aCount').css('font-family','微软雅黑');
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			console.log(this);
			type = $(this).attr('data-type')
			id= $(this).attr('data-id')
			var valuein_developerArea = sessionStorage.getItem("value_in")
			console.log($(this).attr('data-type'))
			$('.table_export').attr('data-tableid',id)
			$('.table_export').attr('data-type',type)
			$('.table_export').attr('data-workcatalog',workCatalog)
			table(id,type,0,valuein_developerArea)
			$('#myModal_table').modal('show')
		}
	}
}*/

function textIframe_in(){
	var arr = document.getElementsByClassName("aCount");
	$('.aCount').css('font-family','微软雅黑');
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			console.log(this);
			type = $(this).attr('data-type')
			id= $(this).attr('data-id')
			var valuein_developerArea = sessionStorage.getItem("value_in")
			console.log($(this).attr('data-type'))
			$('.table_export').attr('data-tableid',id)
			$('.table_export').attr('data-type',type)
			$('.table_export').attr('data-workcatalog',workCatalog)
			table(id,type,0,valuein_developerArea)
			$('#myModal_table_a').modal('show')
		}
	}
}



function textIframe_in1(){
	var arr = document.getElementsByClassName("bCount");
	$('.bCount').css('font-family','微软雅黑');
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			console.log(this);
			type = $(this).attr('data-type')
			id= $(this).attr('data-id')
			var valuein_developerArea = sessionStorage.getItem("value_in")
			console.log($(this).attr('data-type'))
			$('#table_export').attr('data-tableid',id)
			$('#table_export').attr('data-type',type)
			$('#table_export').attr('data-workcatalog',workCatalog)
			console.log($('#table_export').attr('data-workcatalog'))
			table_b(id,type,0,valuein_developerArea)
			$('#myModal_table_b').modal('show')
		}
	}
}
//线下
function imageIframe1(){
	var arr_image = document.getElementsByClassName("imgS");
	for(var i = 0; i < arr_image.length; i++) {
		arr_image[i].onclick = function() {
			console.log(this);
			var id = $(this).attr('data-id')
			var valueout_developerArea = sessionStorage.getItem("value_out")
			console.log($(this).attr('data-id'))
			$('#chart_export').attr('data-chartid',id)
			$('#chart_export').attr('data-workcatalog',workCatalog)
			console.log($('#chart_export').attr('data-workcatalog'))
			console.log(valueout_developerArea)
			table_chart(id,workCatalog,valueout_developerArea)
			$('#myModal_chart').modal('show')
			var data={
				workFlag:id,
				workCatalog:1,
				developerArea:valueout_developerArea,
			}
			$.ajax({
				type: 'post',
				url : getOutUrl(getRootPath_web(), "/monitor/queryFlowNum?workFlag="+id+'&workCatalog=1'+'&developerArea='+valueout_developerArea),
				dataType: 'json',
				data: data,
				success: function(data) {
					var arr_rows = data.rows
					var numA=[]
					var numB=[]
					var numX=["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云", "怀\n柔","门\n头\n沟","平\n谷","延\n庆","大\n客\n户\n中\n心","","市\n支\n中\n心","客\n服\n中\n心","重\n通\n局","国\n际\n业\n务\n中\n心", "集\n团\n客\n户","电\n子\n渠\n道","其\n它"]
					//var numX=["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云", "怀\n柔","门\n头\n沟","平\n谷","延\n庆","重\n通\n局","其\n它"]
					//var numX = data.developerAreaName
					for(var i = 0; i < arr_rows.length; i++){
						numA.push(arr_rows[i].aCount)
						numB.push(arr_rows[i].bCount)
					}
					console.log(numA)
					var dataTimeyear = data.time.substr(0,4)
					var dataTimemonth = data.time.substr(4,2)
					var dataTimeday = data.time.substr(6,2)
					var dataTimeh = data.time.substr(8,2)
					var dataTimeminute = data.time.substr(10,2)
					var time = dataTimeyear+'年'+dataTimemonth+'月'+dataTimeday+'日'+dataTimeh+'时'+dataTimeminute+'分'
					$('#timeFlag').text("更新日期:"+time)
					setTimeout(function() {
						chart(numX, numA, numB)
					}, 100)
				},
				error: function() {

				}
			});
		}
	}
}

function textIframe_out(){
	var arr = document.getElementsByClassName("aCount1");
	$('.aCount1').css('font-family','微软雅黑');
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			console.log(this);
			type = $(this).attr('data-type')
			id= $(this).attr('data-id')
			var valueout_developerArea = sessionStorage.getItem("value_out")
			console.log($(this).attr('data-type'))
			$('#table_export').attr('data-tableid',id)
			$('#table_export').attr('data-type',type)
			$('#table_export').attr('data-workcatalog',workCatalog)
			console.log($('#table_export').attr('data-workcatalog'))
			table(id,type,1,valueout_developerArea)
			$('#myModal_table_a').modal('show')
		}
	}
}

function textIframe_out1(){
	var arr = document.getElementsByClassName("bCount1");
	$('.bCount1').css('font-family','微软雅黑');
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			console.log(this);
			type = $(this).attr('data-type')
			id= $(this).attr('data-id')
			var valueout_developerArea = sessionStorage.getItem("value_out")
			console.log($(this).attr('data-type'))
			$('#table_export').attr('data-tableid',id)
			$('#table_export').attr('data-type',type)
			$('#table_export').attr('data-workcatalog',workCatalog)
			console.log($('#table_export').attr('data-workcatalog'))
			table_b(id,type,1,valueout_developerArea)
			$('#myModal_table_b').modal('show')
		}
	}
}


