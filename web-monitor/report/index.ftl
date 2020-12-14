<!DOCTYPE html>
<html>
<head>
	<title>报表</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">

	<!--bootstrap插件-->
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/js/plugins/bootstrap/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/js/plugins/bootstrap/bootstrap/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/js/plugins/bootstrap/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="${request.contextPath}/js/plugins/multiselect/css/jquery-ui.min.css"/>
    <link rel="stylesheet" type="text/css" href="${request.contextPath}/js/plugins/multiselect/css/jquery.multiselect.css"/>
	<!--pc公共-->
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/css/base.css">
	<!--加载等待插件-->
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/js/plugins/jquery/fakeloader/css/fakeloader.min.css">
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/web-monitor/css/flowChart.css" />
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/web-monitor/css/modal.css" />
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/web-monitor/css/monitView.css" />
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/web-monitor/report/index.css" />
	
	<script type="text/javascript">
		var userParam = "${userParam}";
		
		var reportKey = "${reportKey}";
		var reportTitle = "${reportTitle}";
		var reportColumnsStr = '${reportColumns}';
		
		var historyReportId = '${historyReportId}';
		var historyReportParamStr = ${historyReportParam};
		
		var authQueryArea = '${authQueryArea}';
		var authQueryDevArea = '${authQueryDevArea}';
		var authQueryGridArea = '${authQueryGridArea}';
		
		var tableHight = ${tableHight!"300"};
	</script>
	
	<!--bootstrap-->
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/jquery-1.12.1.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/bootstrap/js/bootstrap.min.js"></script>
	<!--bootstrap table-->
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/bootstrap-table/bootstrap-table.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/bootstrap-table/bootstrap-table-export.min.js"></script>
	
	<!--控制导出按钮-->
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/bootstrap-table/tableExport.min.js"></script>
	<!--PC 时间插件 My97DatePicker -->
	<script type="text/javascript" src="${request.contextPath}/js/plugins/My97DatePicker/WdatePicker.js"></script>
	<!-- layer 弹出层 -->
	<script type="text/javascript" src="${request.contextPath}/js/plugins/layui/layer/layer.js"></script>
    <!--多选下拉框-->
    <script type="text/javascript" src="${request.contextPath}/js/plugins/multiselect/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="${request.contextPath}/js/plugins/multiselect/js/jquery.multiselect.js"></script>
	<!--控制导出功能-->
	<script type="text/javascript" src="${request.contextPath}/js/plugins/bootstrap/bootstrap-paginator/bootstrap-paginator.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/web-monitor/js/plugins/echarts/echarts.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/web-monitor/js/common.js"></script>
	<script type="text/javascript" src="${request.contextPath}/web-monitor/js/modal.js"></script>
	<script type="text/javascript" src="${request.contextPath}/web-monitor/js/plugins/jquery/fakeloader/js/fakeloader.min.js"></script>
	<!-- 调用本界面方法-->
	<script type="text/javascript" src="${request.contextPath}/web-monitor/report/index.js"></script>
	
</head>

<body style="overflow-y: hidden;">

<!--导航-->
<div id="Lcontainer">
	<div id="Lnav">
		<ul class="Lnav" style="width:100%;">
			<li class="Lcheck" id="Lnav_text"></li>
		</ul>
	</div>
	<div id="fakeLoader" style="opacity: 0.3;"></div>
		
	<!-- 查询条件 -->
	<div class="searchInfo" id="searchInfo">
		<#list cons as con>
			<#include "/web-monitor/report/condition/"+con.view+".ftl"/>
		</#list>
   </div>

	<!-- 记录数 -->
	<div class="b-tableDiv table-responsive" style="overflow-y: hidden;">
	    <div class="totalDiv" style="margin-bottom:10px;margin-left:15px;display:none">
	        	总共<span id="totalDate"></span>条记录
	    </div>
	    <table id="detailTable" class="table table-striped table-bordered table-hover">
	    </table>
	</div>

	<!-- 历史查询弹出表格 -->
    <div class="modal fade bs-example-modal-lg historyCommentTable"
		tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg" role="document"  style="width: 50% !important;">
			<div class="modal-content modal_box">
				<!--头部-->
				<div class="clearfix">
					<div class="modal_header_l fl">历史查询</div>
				</div>
				<!--table样式-->
				<div class="modal_table tableStyle">
					<!--<table id="table" class="table table-bordered" >-->
					<table class="table table_table table-bordered  historyTable" style="table-layout: fixed;">
						<thead class="table_header">
							<tr>
								<th data-field="create_date">创建时间</th>
								<th data-field="file_name">报表文件名称</th>
								<th data-field="flag">处理状态</th>
								<th data-field="opration"  data-formatter="oprationFormatter" 
								>操作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal_foot fr close_table" id="close_table">收起图表</div>
			</div>
		</div>
	</div>
			
</body>
</html>