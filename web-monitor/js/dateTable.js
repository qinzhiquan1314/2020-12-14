function dateTabel(reportDate,saleArea){
	$("#table").bootstrapTable('destroy')
	$('#table').bootstrapTable({
		        //url: "http://localhost:8080/testSpringMvc/test/list.do"
		    	/*url: 'table-test.json'*/
		         url:getOutUrl(getRootPath_web(), "/report/find?type=9A&userParam="+locHref+"&reportDate="+reportDate+"&saleArea="+saleArea)
		    	,toggle: "table"
		        ,height: 400
		        ,method: "post"  //测试get
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
		        	        reportDate:reportDate,
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
		        	
		        	var obj = {total:0,rows:[]};//table表格需要
		        	obj.total = res.total;
		        	if(obj.total<=17){
		        	    $('#table').after("<span style='float:left;margin-top:10px'>总共<span>"+res.total+"</span>条记录</span>");
		        	    $(".totalDiv").css('display','none');
		        	}else{
		        		$(".totalDiv").css('display','block');
		        	    $("#totalDate").html(obj.total);
		        	}
		        	obj.rows = res.rows;
		        	console.info("responseHandler:"+obj);
		        	
		        	return obj;
		        }
		    });
}
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};

$(function () {
	var date = new Date();
	date.setDate(date.getDate()-1); //设置天数 -1
	var reportDate = date.format("yyyy-MM-dd");
    $("#searchDate").val(reportDate);
    dateTabel(reportDate,"");
});
$("#searchBtn").click(function(){
	var reportDate = $("#searchDate").val();
	var saleArea = $("#sysCode").val();
	dateTabel(reportDate,saleArea);
})
$("#exportBtn").click(function(){
	var reportDate = $("#searchDate").val();
	var saleArea = $("#sysCode").val();
	$.download(getOutUrl(getRootPath_web(), "/report/export?type=9A&reportDate="+reportDate+"&saleArea="+saleArea+"&userParam="+locHref), 'post');
})
	

	

	