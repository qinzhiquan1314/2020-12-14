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

//初始化查询时间，时间为昨天 
 $(function () {
	 var date = new Date();
	date.setDate(date.getDate()-1); //设置天数 -1
	var reportDate = date.format("yyyy-MM-dd");
	 $('#AcceptDate').val(reportDate);
	 monthTable("",reportDate);
	});
 
 //bootstrap-table 查询模板
function monthTable(monthValCode,monthValDate){
	$("#table_me").bootstrapTable('destroy'); //销毁表格数据	
	//一个界面多个表格，解决框架表格冲突
	if(document.getElementById("ttd").style.overflowY=="auto"){
		document.getElementById("ttd").style.overflowY="visible"
	}
	else if(document.getElementById("ttd").style.overflowY=="visible"){
		document.getElementById("ttd").style.overflowY="hidden"
	}
	$('#table_me').bootstrapTable({
	//url : "table.json",
	//method: "get",
	url : getOutUrl(getRootPath_web(), "/report/find?userParam="+locHref+"&saleArea="+monthValCode+"&reportDate="+monthValDate+"&type=9"), //访问后台的url地址
	method: "post",  //请求方式
	dataType:'json', //后台返回数据格式
	contentType: "application/x-www-form-urlencoded",
	queryParams: "queryParams", //前台传入参数函数
	pageNumber: 1, //初始化加载第一页，默认第一页
	pagination: false,
	sidePagination: "server",
	pageSize: "10",
	pageList: [5, 10, 20, 50 ],
	paginationPreText: '‹',//指定分页条中上一页按钮的图标或文字,这里是<
    paginationNextText: '›',//指定分页条中下一页按钮的图标或文字,这里是>
	showRefresh: false,
	showToggle: false,
	showPaginationSwitch: false,
	showColumns: false,
	search: false,
	searchAlign: "left",
	queryParams: function (params) {  
      return {
    	saleArea:monthValCode,
        reportDate:monthValDate,
        userParam:locHref,
        type:"9"
      }
    },
	responseHandler: function(res) {
		console.log(res)
		var obj = {
			total: 0,
			rows: []
		}; 
		obj.total = res.total;
		obj.rows = res.rows;
		if(res.total<16){
			$('#count').hide();
			$('#table_me').after("<span style='float:left;;margin-top:10px;'>总共<span>"+res.total+"</span>条记录</span>");
		}else{
			$('#count').show();
			$('#totalNum').html(res.total);
		}
		return obj;
	},	
    onLoadSuccess: function () {
   },
});
}

//根据条件查询
$('#monthQuery').click(function(){
	//获取查询条件
	var monthValCode = $('#tableCode option:selected').val()
	//alert($('#tableCode option:selected').val())
	var monthValDate = $('#AcceptDate').val()
	monthTable(monthValCode,monthValDate)
	
})

//导出
$('#monthExport').click(function(){
	//导出
	var monthValCode = $('#tableCode option:selected').val()
	if($('#AcceptDate').val()){
		var monthValDate = $('#AcceptDate').val()
	}else{
		var monthValDate = s1
	}
	$.download(getOutUrl(getRootPath_web(), "/report/export?type=9&reportDate="+monthValDate+"&saleArea="+monthValCode+"&userParam="+locHref), 'post');

})






















