/*重点监控指标（属地-日累计）属地+日期
 *重点监控指标 (发展-日累计)
 *重点监控指标 (属地-月)
 *重点监控指标 (发展-月) 
 */

//报表标识
var reportKey;

//查询的URL地址
var searchUrl;

//归属销售线
var sysCode;

//查询日期
var reportDate

//销售线标志
var branchFlag;

//业务类型
var prodCatalog="";

/*根据接口请求数据并展示*/
/*每个方法的调用不同，当有数据的时候数据的展示和数据的格式需要根据传入的进行调整*/
function dateTabel(reportKey,reportDate,sysCode,searchUrl){
	$("#"+reportKey+"Table").bootstrapTable('destroy')
	$("#"+reportKey+"Table").bootstrapTable({
		    	url:searchUrl
				/*向后台请求的方法接口*/
		        //url:getOutUrl(getRootPath_web(), "/report/find?userParam="+getUrlParam("userParam")+"&reportDate="+reportDate+"&saleArea="+saleArea+"&reportKey="+reportKey)
		    	,toggle: "table"
		        ,height: 400
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
		        ,queryParams: function (params) { 
		        	      return {
		        	    	saleArea:sysCode,
		        	        reportDate:reportDate,
		        	        userParam:getUrlParam("userParam"),
		        	        reportKey:reportKey
		        	      }
		        }
		    	,onLoadSuccess: function(){  //加载成功时执行
		            console.info("加载成功");
		        }
		        ,onLoadError: function(){  //加载失败时执行
		              console.info("加载数据失败");
		        }
		        ,responseHandler: function(res){//获取数据解析
		        	console.log(res);
		        	var obj = {total:0,rows:[]};//table表格需要
		        	console.log(res.state);
		        	obj.total = res.total;
		        	if(res.state=="0"){
		        		obj.total="0";
		        	}
		        	$(".totalDiv").css('display','block');
		        	$(".totalDate").html(obj.total);
		        	obj.rows = res.rows;
		        	console.info("responseHandler:"+obj);
		        	return obj;
		        }
		    });
}
/*界面点击进来的展示*/
$(function () {
	var date = new Date();
	date.setDate(date.getDate()-1); //设置天数 -1
	var originDate = date.format("yyyy-MM-dd");
    $("#searchDate").val(originDate);
    reportDate=$("#searchDate").val();
    sysCode="";

   /* var flag;
	//调用后台权限接口
	flag="area";
	var value="2";
	var queryValue="ok";
	var exportValue="no";
	//导出和查询权限筛选
	intQueryExport(queryValue,exportValue,"searchBtn","exportBtn");
	//初始化销售线显示
	sysCode=intSaleLine(value,flag,sysCode);*/

    /*表的展示替换*/
    reportKey=getUrlParam("typeTable");
    console.log(reportKey);
    if(reportKey=="monitorDayByAreaNew"){
    	$("#monitorDayByAreaNewth").html("资源不匹配率");
    	$("#monitorDayByAreaNewth1").html("资源不匹配率");
  /*  	$('#sysCodeDiv').hide();
    	$('#sysCityDiv').show();*/
    	$(".Lnav").css("width","100%");
    	$("title").html("重点监控指标(属地-日累计)");
    	$("#Lnav_text").text("重点监控指标(属地-日累计)");
    	$('#monitorDayByAreaNew').addClass('on').siblings().removeClass('on');
    }else if(reportKey=="monitorDayByDevelopAreaNew"){
    	/*$('#sysCodeDiv').show();
    	$('#sysCityDiv').hide();*/
    	$(".Lnav").css("width","100%");
    	$("title").html("重点监控指标 (发展-日累计)");
    	$("#Lnav_text").text("重点监控指标 (发展-日累计)");
    	$('#monitorDayByDevelopAreaNew').addClass('on').siblings().removeClass('on');
    	$(".searchInfoE").hide();
    	console.log("重点监控指标 (发展-日累计)");
    	console.log(searchUrl);
    }else if(reportKey=="monitorMonthByAreaNew"){
    	$("#monitorMonthByAreaNewth").html("资源不匹配率");
    	$("#monitorMonthByAreaNewth1").html("资源不匹配率");
    	/*$('#sysCodeDiv').hide();
    	$('#sysCityDiv').show();*/
    	$(".Lnav").css("width","100%");
    	$("title").html("重点监控指标(属地-日累计)");
    	$("title").html("重点监控指标 (属地-月累计)");
    	$("#Lnav_text").text("重点监控指标 (属地-月累计)");
    	$('#monitorMonthByAreaNew').addClass('on').siblings().removeClass('on');
    }else if(reportKey=="monitorMonthByDevelopAreaNew"){
    	/*$('#sysCodeDiv').show();
    	$('#sysCityDiv').hide();*/
    	$(".Lnav").css("width","100%");
        $(".searchInfoE").hide();
    	$("title").html("重点监控指标 (发展-月累计)");
    	$("#Lnav_text").text("重点监控指标 (发展-月累计)");
    	$('#monitorMonthByDevelopAreaNew').addClass('on').siblings().removeClass('on');
    }

	//调用后台权限接口
	var queryValue = queryPermission(reportKey);

	//初始化销售线展示
	sysCode=intSaleLine(queryValue,reportKey,sysCode);

    //dateTabel(reportKey,reportDate,sysCode,searchUrl);
});

$("#selectBranch").change(function(){
    branchFlag= $(this).get(0).selectedIndex-1;
    if (reportKey=="monitorDayByAreaNew"||reportKey=="monitorMonthByAreaNew") {
           $(".branchItem").hide().eq(branchFlag).show();
	}else{
		   $(".developItem").hide().eq(branchFlag).show();
	}
    if (branchFlag==-1) {
          $(".branchItem").hide();
          $(".developItem").hide();
    }
});
//业务类型
$("#businessInfo ul li").click(function (){
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    if($(this).attr("value") == 1){
        prodCatalog = "";
    }else {
        prodCatalog =  $(this).attr("value")
    }

})

/*查询按钮点击方法*/
$("#searchBtn").click(function(){
	//判断部门信息是否点选
	if(reportKey=="monitorDayByAreaNew"&&$('#selectBranch').find("option:selected").val()!=""&&$('.branchItem').eq(branchFlag).find("option:selected").val()==""){
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
	if(reportKey=="monitorMonthByAreaNew"&&$('#selectBranch').find("option:selected").val()!=""&&$('.branchItem').eq(branchFlag).find("option:selected").val()==""){
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
	if(reportKey.indexOf("Develop")!=-1&&$('#selectBranch').find("option:selected").val()!=""&&$('.developItem').eq(branchFlag).find("option:selected").val()==""){
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
	var reportDate = $("#searchDate").val();
	if (branchFlag==-1) {
		sysCode ="";
	}else if(typeof(branchFlag) != "undefined"){
		if (reportKey=="monitorDayByAreaNew"&&$('.branchItem').eq(branchFlag).find("option:selected").val()) {  //获取所属销售线
			sysCode = encodeURIComponent($('.branchItem').eq(branchFlag).find("option:selected").val())
		}else if(reportKey=="monitorMonthByAreaNew"&&$('.branchItem').eq(branchFlag).find("option:selected").val()){
			sysCode = encodeURIComponent($('.branchItem').eq(branchFlag).find("option:selected").val())
		}else if(reportKey=="monitorDayByDevelopAreaNew"&&$('.developItem').eq(branchFlag).find("option:selected").val()){
			sysCode = $('.developItem').eq(branchFlag).find("option:selected").val()
		}else if(reportKey=="monitorMonthByDevelopAreaNew"&&$('.developItem').eq(branchFlag).find("option:selected").val()){
			sysCode = $('.developItem').eq(branchFlag).find("option:selected").val()
		}
	}
	console.log("获取的销售线的名称是"+sysCode);
	if(reportKey=="monitorDayByAreaNew" || reportKey =="monitorMonthByAreaNew"){
        searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate+"&saleArea="+encodeURIComponent(sysCode)+"&prodCatalog="+prodCatalog);
    }else {
        searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate+"&saleArea="+encodeURIComponent(sysCode));

    }
	/*调用数据展示的方法*/
	dateTabel(reportKey,reportDate,sysCode,searchUrl);
})

/*导出按钮点击方法*/
$("#exportBtn").click(function(){
	//判断部门信息是否点选
	if(reportKey=="monitorDayByAreaNew"&&$('#selectBranch').find("option:selected").val()!=""&&$('.branchItem').eq(branchFlag).find("option:selected").val()==""){
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
	if(reportKey=="monitorMonthByAreaNew"&&$('#selectBranch').find("option:selected").val()!=""&&$('.branchItem').eq(branchFlag).find("option:selected").val()==""){
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
	if(reportKey.indexOf("Develop")!=-1&&$('#selectBranch').find("option:selected").val()!=""&&$('.developItem').eq(branchFlag).find("option:selected").val()==""){
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
	var reportDate = $("#searchDate").val();
	if (branchFlag==-1) {
		sysCode ="";
	}else{
		if (reportKey=="monitorDayByAreaNew"&&$('.branchItem').eq(branchFlag).find("option:selected").val()) {  //获取所属销售线
			sysCode = encodeURIComponent($('.branchItem').eq(branchFlag).find("option:selected").val())
		}else if(reportKey=="monitorMonthByAreaNew"&&$('.branchItem').eq(branchFlag).find("option:selected").val()){
			sysCode = encodeURIComponent($('.branchItem').eq(branchFlag).find("option:selected").val())
		}else if(reportKey=="monitorDayByDevelopAreaNew"&&$('.developItem').eq(branchFlag).find("option:selected").val()){
			sysCode = $('.developItem').eq(branchFlag).find("option:selected").val()
		}else if(reportKey=="monitorMonthByDevelopAreaNew"&&$('.developItem').eq(branchFlag).find("option:selected").val()){
			sysCode = $('.developItem').eq(branchFlag).find("option:selected").val()
		}		
	}
	console.log("获取的销售线的名称是"+sysCode);
	
	/*调用后台导出的方法*/
    if(reportKey=="monitorDayByAreaNew" || reportKey =="monitorMonthByAreaNew") {
        $.download(getOutUrl(getRootPath_web(), "/report/export?reportKey=" + reportKey + "&userParam=" + getUrlParam("userParam") + "&reportDate=" + reportDate + "&saleArea=" + encodeURIComponent(sysCode)+"&prodCatalog="+prodCatalog), 'post');
    }else {
        $.download(getOutUrl(getRootPath_web(), "/report/export?reportKey=" + reportKey + "&userParam=" + getUrlParam("userParam") + "&reportDate=" + reportDate + "&saleArea=" + encodeURIComponent(sysCode)), 'post');
    }
    })




	