//报表标识  默认属地（OrderFinishByArea）,发展（OrderFinishByDevelop）
var reportKey="OrderFinishByArea";
//校验标识
var locHref = getUrlParam("userParam");
//开始时间、结束时间
var startDate;
var endDate;
//订单来源
var inmodeCatalog="";
//业务类型
var prodCatalog="";
//服务类型
var tradeCatalog="0,1";
//部门
var areaCode="";
//时间戳
var reportId;
//是否是历史数据,为空时普通查询，不为空时历史查询
var fileName = getUrlParam("fileName");
//历史查询的筛选条件
var condition = JSON.parse(JSON.parse(decodeURI(getUrlParam("condition"))));
/*界面点击进来的展示*/
$(function () {
		if (fileName ==null||fileName =="") {
			//普通查询
			var date = new Date();	
			var searchDate = date.format("yyyy-MM-dd");
			$("#startDate").val(searchDate);
			$("#endDate").val(searchDate);
	     	$("#exportBtn").attr('disabled',true);//导出按钮不可用
	     	$(".totalDiv").css('display','none');//总共记录不显示
		}else{
			//var condition = {"areaCode":"","endDate":"2019-01-15","inmodeCatalog":"","prodCatalog":"","startDate":"2019-01-14","tradeCatalog":""}
			$("#startDate").val(condition.startDate);
			$("#endDate").val(condition.endDate);
			reportKey = getUrlParam("typeTable");
			//分类口径和销售线回显
			if (reportKey=="OrderFinishByArea") {  
				$($("#branchInfo ul li")[0]).addClass('searched'); 
				$($("#branchInfo ul li")[1]).removeClass('searched'); 
				var areaCodeBack = condition.areaCode;
				var areaArr0 = ["2","3","4","5","7","8"];
				var areaArr1 = ["802","801","804","806","803"]
			    var areaArr2 = ["809","808","805","807","810"]
				var areaArr3 = ["10","9999"]
				if (areaArr1.indexOf(areaCodeBack)!=-1) {
					 $(".branchItem").hide().eq(1).show();
					 $("#selectBranch").find("option[value='近郊']").attr("selected", true);
					 $(".branchItem").eq(1).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}else if(areaArr2.indexOf(areaCodeBack)!=-1){
					 $(".branchItem").hide().eq(2).show();
					 $("#selectBranch").find("option[value='远郊']").attr("selected", true);
					 $(".branchItem").eq(2).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}else if(areaArr3.indexOf(areaCodeBack)!=-1){
					 $(".branchItem").hide().eq(3).show();
					 $("#selectBranch").find("option[value='部门中心']").attr("selected", true);
					 $(".branchItem").eq(3).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}else if(areaArr0.indexOf(areaCodeBack)!=-1){
					 $(".branchItem").hide().eq(0).show();
					 $("#selectBranch").find("option[value='市区']").attr("selected", true);
					 $(".branchItem").eq(0).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}
	            $(".developItem").hide();
				
			}else{
				$($("#branchInfo ul li")[1]).addClass('searched'); 
				$($("#branchInfo ul li")[0]).removeClass('searched');
				var areaCodeBack = condition.areaCode;
				var areaArr0 = ["225","226","211","212","213","214"];
				var areaArr1 = ["217","219","220","218","216"]
			    var areaArr2 = ["223","221","215","222","224"]
				var areaArr3 = ["227","11a0al","11a01s","dkhzx","11a01q","11a08x"]
				if (areaArr1.indexOf(areaCodeBack)!=-1) {
					 $(".developItem").hide().eq(1).show();
					 $("#selectBranch").find("option[value='近郊']").attr("selected", true);
					 $(".developItem").eq(1).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}else if(areaArr2.indexOf(areaCodeBack)!=-1){
					 $(".developItem").hide().eq(2).show();
					 $("#selectBranch").find("option[value='远郊']").attr("selected", true);
					 $(".developItem").eq(2).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}else if(areaArr3.indexOf(areaCodeBack)!=-1){
					 $(".developItem").hide().eq(3).show();
					 $("#selectBranch").find("option[value='部门中心']").attr("selected", true);
					 $(".developItem").eq(3).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}else if(areaArr0.indexOf(areaCodeBack)!=-1){
					 $(".developItem").hide().eq(0).show();
					 $("#selectBranch").find("option[value='市区']").attr("selected", true);
					 $(".developItem").eq(0).find("option[value="+areaCodeBack+"]").attr("selected", true);
				}
				$(".branchItem").hide();
			}
			//订单来源回显
			var inmodeCatalogBack = condition.inmodeCatalog;
			if (inmodeCatalogBack=="") {
				$($("#orderInfo ul li")[0]).addClass('searched'); 
				$($("#orderInfo ul li")[0]).siblings('li').removeClass('searched');  
			}else if(inmodeCatalogBack.indexOf("A")!=-1){
				$($("#orderInfo ul li")[1]).addClass('searched'); 
				$($("#orderInfo ul li")[1]).siblings('li').removeClass('searched');  
				$("#internet").css("display","block");
				$("#entityInfo").css("display","none");
				var inmodeCatalogArr = inmodeCatalogBack.split(",");
				if (inmodeCatalogArr[inmodeCatalogArr.length-1]!="") {
					$($("#internet ul li")[0]).addClass('searched'); 
				}else{
					$($("#internet ul li")[0]).removeClass('searched'); 
					for(var i = 0; i<inmodeCatalogArr.length;i++){
						var entityIndex = inmodeCatalogArr[i].substring(1,2);
						$($("#internet ul li")[entityIndex]).addClass('searched'); 
					}
				}
			}else if(inmodeCatalogBack.indexOf("B"!=-1)){
				$($("#orderInfo ul li")[2]).addClass('searched'); 
				$($("#orderInfo ul li")[2]).siblings('li').removeClass('searched');  
				$("#entityInfo").css("display","block");
				$("#internet").css("display","none");
				var inmodeCatalogArr = inmodeCatalogBack.split(",");
				if (inmodeCatalogArr[inmodeCatalogArr.length-1]!="") {
					$($("#entityInfo ul li")[0]).addClass('searched'); 
				}else{
					$($("#entityInfo ul li")[0]).removeClass('searched'); 
					for(var i = 0; i<inmodeCatalogArr.length;i++){
						var entityIndex = inmodeCatalogArr[i].substring(1,2);
						$($("#entityInfo ul li")[entityIndex]).addClass('searched'); 
					}
				}
			}
			//业务类型回显
			var prodCatalogBack= condition.prodCatalog;
			switch (prodCatalogBack) {
			case "":
				$($("#businessInfo ul li")[0]).addClass('searched'); 
				$($("#businessInfo ul li")[0]).siblings('li').removeClass('searched');  
				break;
			case "CP":
				$($("#businessInfo ul li")[1]).addClass('searched'); 
				$($("#businessInfo ul li")[1]).siblings('li').removeClass('searched');  
				break;
			case "40":
				$($("#businessInfo ul li")[2]).addClass('searched'); 
				$($("#businessInfo ul li")[2]).siblings('li').removeClass('searched');  
				break;
			case "67":
				$($("#businessInfo ul li")[3]).addClass('searched'); 
				$($("#businessInfo ul li")[3]).siblings('li').removeClass('searched');  
				break;
			case "41":
				$($("#businessInfo ul li")[4]).addClass('searched'); 
				$($("#businessInfo ul li")[4]).siblings('li').removeClass('searched');  
				break;
			default:
				break;
			}
			//服务类型回显
			var tradeCatalogBack = condition.tradeCatalog;
			if(tradeCatalogBack==""){
				$($("#serviceInfo ul li")[0]).addClass('searched'); 
				$($("#serviceInfo ul li")[0]).siblings('li').removeClass('searched');   
			}else if(tradeCatalogBack=="1"){
				$($("#serviceInfo ul li")[1]).addClass('searched'); 
				$($("#serviceInfo ul li")[1]).siblings('li').removeClass('searched'); 
			}else if(tradeCatalogBack=="0"){
				$($("#serviceInfo ul li")[2]).addClass('searched'); 
				$($("#serviceInfo ul li")[2]).siblings('li').removeClass('searched'); 
			}
			reportId = getUrlParam("reportId");
			globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/historicaldetail?reportKey="+reportKey+"&reportId="+reportId+"&userParam="+locHref);
			dateTabel(globalUrl,reportId,reportKey,locHref);
		}
		//调用后台权限接口
		var queryValue = queryPermission(reportKey);

		//初始化销售线展示
		areaCode=intSaleLine(queryValue,reportKey,areaCode);
});
//分类口径
var clickFlag=0;
$("#branchInfo ul li").click(function (){
	 $(this).siblings('li').removeClass('searched');  
     $(this).addClass('searched'); 
     clickFlag = $(this).index();
     branchFlag=-1;
     if (clickFlag==0) {
    	 reportKey="OrderFinishByArea";
	}else{
		 reportKey="OrderFinishByDevelop";
	}
     $("#selectBranch option:first").prop("selected", 'selected');
     $(".branchItem").hide();
 	 $(".developItem").hide();
	//调用后台权限接口
	var queryValue = queryPermission(reportKey);

	//初始化销售线展示
	areaCode=intSaleLine(queryValue,reportKey,areaCode);
})
//订单来源
var inmodeCatalogFlag;
$("#orderInfo ul li").click(function (){
	 inmodeCatalogFlag = 0;
	 $(this).siblings('li').removeClass('searched');  
     $(this).addClass('searched');   
	 if ($(this).index()==1) {
		$("#internet").css("display","block");
		$("#entityInfo").css("display","none");
		var liList = $("#internet ul li");
		$(liList[0]).addClass("searched")
		for(var i = 1; i< liList.length; i++){
			$(liList[i]).removeClass("searched");
		}
		inmodeCatalogFlag =1
	}else if($(this).index()==2){
		$("#entityInfo").css("display","block");
		$("#internet").css("display","none");
		var liList = $("#entityInfo ul li");
		$(liList[0]).addClass("searched")
		for(var i = 1; i< liList.length; i++){
			$(liList[i]).removeClass("searched");
		}
		inmodeCatalogFlag =2
	}else{
		inmodeCatalog="";  //选择全部
		$("#entityInfo").css("display","none");
		$("#internet").css("display","none");
	}
})
$("#internet ul li").click(function (){
	if( $(this).hasClass("searched")){
		$(this).removeClass("searched")
	}else{
		if($(this).index()==0){
			$(this).siblings('li').removeClass('searched'); 
			$(this).addClass('searched');  
		}else{
			$(this).addClass('searched');
			$(this).siblings('li').eq(0).removeClass('searched'); 
		}
	} 
})
$("#entityInfo ul li").click(function (){
	if( $(this).hasClass("searched")){
		$(this).removeClass("searched")
	}else{
		if($(this).index()==0){
			$(this).siblings('li').removeClass('searched'); 
			$(this).addClass('searched');  
		}else{
			$(this).addClass('searched');
			$(this).siblings('li').eq(0).removeClass('searched'); 
		}
	} 
})
//业务类型
$("#businessInfo ul li").click(function (){
	 $(this).siblings('li').removeClass('searched');  
     $(this).addClass('searched');   
     prodCatalog =  $(this).attr("value1")
})
//服务类型
$("#serviceInfo ul li").click(function (){
	 $(this).siblings('li').removeClass('searched');  
     $(this).addClass('searched');  
     tradeCatalog =  $(this).attr("value1")
})
//部门选择
var branchFlag;
$("#selectBranch").change(function(){
        branchFlag= $(this).get(0).selectedIndex-1;
        if (clickFlag==0) {
               $(".branchItem").hide().eq(branchFlag).show();
		}else{
			   $(".developItem").hide().eq(branchFlag).show();
		}
        if (branchFlag==-1) {
              $(".branchItem").hide();
              $(".developItem").hide();
        }
 });
/*查询按钮点击方法*/
$("#searchBtn").click(function(){
	if(branchFlag==-1 && $("#selectBranch").prop("disabled")){

	}else if(reportKey=="OrderFinishByArea"&&$('#selectBranch').find("option:selected").val()!=""
		&&$('.branchItem').eq(branchFlag).find("option:selected").val()==""){
		var selectBranch = $('#selectBranch').find("option:selected").val();
		if (selectBranch.indexOf("中心")!=-1) {
			layer.msg('请选择部门中心！', {
	 			time: 2000 //2s后自动关闭
			});
		}else{
			layer.msg('请选择'+selectBranch+'部门！', {
	 			time: 2000 //2s后自动关闭
			 });
		}
		return;
	}else if(reportKey=="OrderFinishByDevelop"&&$('#selectBranch').find("option:selected").val()!=""
		&&$('.developItem').eq(branchFlag).find("option:selected").val()==""){
		var selectBranch = $('#selectBranch').find("option:selected").val();
		if (selectBranch.indexOf("中心")!=-1) {
			layer.msg('请选择部门中心！', {
	 			time: 2000 //2s后自动关闭
			});
		}else{
			layer.msg('请选择'+selectBranch+'部门！', {
	 			time: 2000 //2s后自动关闭
			 });
		}
		return;
	}
	var fakeLoader = "<div id='fakeLoader' style='opacity: 0.3;'></div>"; 
	$("#Lnav").after(fakeLoader); 
	$("#exportBtn").attr('disabled',true);
	if(inmodeCatalogFlag==1){  //获取订单来源
		inmodeCatalog="";
		var liList = $("#internet ul li");
		if($(liList[0]).hasClass("searched")){
			inmodeCatalog="A1,A2,A3,A4,A5,A6,A7,B3";
		}
		for(var i = 1; i< liList.length; i++){
			if($(liList[i]).hasClass("searched")){
				inmodeCatalog=inmodeCatalog+$(liList[i]).attr("value")+","
			}
		}
	}else if(inmodeCatalogFlag==2){
		inmodeCatalog="";
		var liList = $("#entityInfo ul li");
		if($(liList[0]).hasClass("searched")){
			inmodeCatalog="B1,B2";
		}
		for(var i = 1; i< liList.length; i++){
			if($(liList[i]).hasClass("searched")){
				inmodeCatalog=inmodeCatalog+$(liList[i]).attr("value")+","
			}
		}
	}
	if (branchFlag==-1 && !$("#selectBranch").prop("disabled")) {
		areaCode ="";
	}else{
		if (reportKey=="OrderFinishByArea"&&$('.branchItem').eq(branchFlag).find("option:selected").val()) {  //获取部门信息
			areaCode = $('.branchItem').eq(branchFlag).find("option:selected").val()
		}else if(reportKey=="OrderFinishByDevelop"&&$('.developItem').eq(branchFlag).find("option:selected").val()){
			areaCode = $('.developItem').eq(branchFlag).find("option:selected").val()
		}
	}
	startDate = $("#startDate").val();
	endDate = $("#endDate").val();
	firstReresh(inmodeCatalog,areaCode,startDate,endDate);
})
/*导出按钮点击方法*/
$("#exportBtn").click(function(){
	$.download(getOutUrl(getRootPath_web(), "/reportdetail/export?reportId="+reportId+"&userParam="+locHref), 'post');
})
/*历史查询*/
//打开历史查询表格
$("#historySearch").click(function(){
	$(".historyCommentTable").modal('show');
	var table = $(".historyTable");
	reportKeyHis = "OrderFinishByArea,OrderFinishByDevelop";
	historyTable (table,reportKeyHis,reportId);
})

//关闭历史查询表格
$('.close_table').click(function(){
	$('.historyCommentTable').modal('hide')
})
/*首次进入时页面交互 实时表*/
function firstReresh(inmodeCatalog,areaCode,startDate,endDate) {
	//存储传入参数到配置表
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
		url : getOutUrl(getRootPath_web(), "/reportdetail/finddetail?startDate="+startDate+"&endDate="+endDate+"&reportKey="+reportKey+"&userParam="+locHref+
				"&inmodeCatalog="+inmodeCatalog+"&prodCatalog="+prodCatalog+"&tradeCatalog="+tradeCatalog+"&areaCode="+areaCode),
		data :  { 
				    "startDate":startDate,
				   "endDate":endDate,
				   "reportKey":reportKey,
				   "userParam":locHref,
				   "inmodeCatalog":inmodeCatalog,
				   "prodCatalog":prodCatalog,
				   "tradeCatalog":tradeCatalog,
				   "areaCode":areaCode
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					reportId = data.rows[0].report_id;
					if(data.rows[0].flag=='0'||data.rows[0].flag=='1'){
						$("#fakeLoader").fakeLoader({
							  timeToHide: 600000,
							  zIndex:"999",//
							  spinner:"spinner7",//可选值 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 对应有7种效果
							  bgColor:"#000000",
         					});
						getReportState(reportKey,reportId);
						//前台表格显示数据
					}else if (data.rows[0].flag=='2') {
						globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey="+reportKey+"&userParam="+locHref+"&reportId="+reportId)
						dateTabel(globalUrl,searchDate,reportKey,locHref);
						$("#exportBtn").attr('disabled',false);
					}else if(data.rows[0].flag=='4'){
						 layer.msg('请查看历史数据！', {
				     			time: 2000 //2s后自动关闭
				     	  });
					}else if(data.rows[0].flag=='3'){
						 layer.msg(data.rows[0].exception, {
				     			time: 2000 //2s后自动关闭
				     	  });
					}else {
						console.log("出现异常1");
					}
				 }
	});
}
/*调用第二个接口，每隔两秒判断返回状态*/
function getReportState(reportKey,reportId){
	$.ajax({
		type : 'post', //测试get，正式post
		cache : false,
		dataType: 'json',
		url : getOutUrl(getRootPath_web(), "/reportdetail/find?reportId="+reportId+"&reportKey="+reportKey+"&userParam="+locHref),
		//url : "../staticReport/result2.json",
		data :  { 
				   "reportKey":reportKey,
				   "reportId":reportId,
				   "userParam":locHref
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					if(data.state=="1" && data.rows[0].flag=='2'){
						//去除弹窗层
						$("#fakeLoader").remove();
						//前台表格显示数据
						globalUrl = getOutUrl(getRootPath_web(), "/reportdetail/finddate?reportKey="+reportKey+"&userParam="+locHref+"&reportId="+reportId);
						dateTabel(globalUrl,reportKey,locHref,reportId);
						$("#exportBtn").attr('disabled',false);
					}else{
						//继续调用定时任务
						setTimeout("getReportState(reportKey,reportId)",2000);
					}
				 }
	});
}
function dateTabel(globalUrl,reportId,reportKey,locHref){
	$("#orderFlowTable").bootstrapTable('destroy')
	$('#orderFlowTable').bootstrapTable({
		    url : globalUrl
			//url:"backcount.json"
			,toggle: "table"
			,height: 300
			,method: 'post'  //测试get 正式用post
			,contentType: "application/x-www-form-urlencoded"
			,queryParams: "queryParams"
			,pagination: false
			,sidePagination: "server"
			,pageNumber: "1"
			,pageSize: "10"
			/*,pageList: "[5, 10, 20, 50 ]"*/
			,showRefresh: false 
			,showToggle: false
			,showPaginationSwitch: false
			,showColumns: false
			,search: false
			,searchAlign: "left"
			,sortName: "menuid"
			,sortOrder: "asc"
			,queryParams: function (params) { 
				return {
					userParam:locHref
				}
			}
			,onLoadSuccess: function(){  //加载成功时执行
				console.info("加载成功");
				//$(".fixed-table-body").css('height','400');
			}
			,onLoadError: function(){  //加载失败时执行
				console.info("加载数据失败");
			}
			,responseHandler: function(res){//获取数据解析
				//根据数据的返回格式解析这里可能需要修改
				var obj = {total:0,rows:[]};//table表格需要
				obj.total = res.total;
				$(".totalDiv").css('display','block');
				$("#totalDate").html(obj.total);
				obj.rows = res.rows;
				for(var i=0; i<res.rows.length;i++){
	        		if (res.rows[i].back_type==undefined) {
	        			res.rows[i].back_type = "";
	        		}
	        	}
				console.info("responseHandler:"+obj);
				//$("#searchDate").val("-----");//查看历史时赋值
				return obj;
			}
	});
}
