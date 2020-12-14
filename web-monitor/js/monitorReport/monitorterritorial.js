/*
 * 重点监控指标 (发展-月)
*/
//获取加密用户信息
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);

/*根据接口请求数据并展示*/
/*每个方法的调用不同，当有数据的时候数据的展示和数据的格式需要根据传入的进行调整*/
function dateTabel(saleArea){
	$("#table").bootstrapTable('destroy')
	$('#table').bootstrapTable({
			//url: "http://localhost:8083/queryCenter/web-monitor/page/monitorReport/test.json?type=9A&userParam="+locHref
			url:"backcount.json"
			/*向后台请求的方法接口*/
			//url:getOutUrl(getRootPath_web(), "/report/find?type=9A&userParam="+locHref+"&reportDate="+reportDate+"&saleArea="+saleArea)
			,toggle: "table"
			,height: 400
			,method: 'get'  //测试get 正式用post
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
					saleArea:saleArea,
					//reportDate:reportDate,
					userParam:locHref,
					type:"9A"
				}
			}
			,onLoadSuccess: function(){  //加载成功时执行
				console.info("加载成功");
				$(".fixed-table-body").css('height','400');
			}
			,onLoadError: function(){  //加载失败时执行
				console.info("加载数据失败");
			}
			,responseHandler: function(res){//获取数据解析
				//根据数据的返回格式解析这里可能需要修改
				var obj = {total:0,rows:[]};//table表格需要

				obj.total = res.data.row.length;
				if(obj.total<=17){
					$('#table').after("<span style='float:left;margin-top:10px'>总共<span>"+res.total+"</span>条记录</span>");
					$(".totalDiv").css('display','none');
				}else{
					$(".totalDiv").css('display','block');
					$("#totalDate").html(obj.total);
				}
				obj.rows = res.data.row;
				console.info("responseHandler:"+obj);

				return obj;
			}
	});
}
/*界面点击进来的展示*/
$(function () {
	/*var date = new Date();
	date.setDate(date.getDate()-1); //设置天数 -1
	var reportDate = date.format("yyyy-MM-dd");
	//日期
	$("#searchDate").val(reportDate);*/
	
	
	$('#monitor_development_month').addClass('on').siblings().removeClass('on');

	dateTabel("");
});

/*查询按钮点击方法*/
$("#searchBtn").click(function(){
	//var reportDate = $("#searchDate").val();
	var saleArea = $("#sysCode").val();
	/*调用数据展示的方法*/
	dateTabel(saleArea);
})
/*导出按钮点击方法*/
$("#exportBtn").click(function(){
	//var reportDate = $("#searchDate").val();
	var saleArea = $("#sysCode").val();
	/*调用后台导出的方法*/
	$.download(getOutUrl(getRootPath_web(), "/report/export?type=9A&saleArea="+saleArea+"&userParam="+locHref), 'post');
})