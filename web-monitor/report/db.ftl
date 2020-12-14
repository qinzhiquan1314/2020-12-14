<!DOCTYPE html>
<html lang="en">
<head>

</head>
<body>
<div id="Lcontainer">
    <!--导航-->
    <!--<div id="Lnav">-->
    <!--<ul class="Lnav" style="width: 100%;">-->
    <!--<li class="Lcheck" id="Lnav_text">问题列表</li>-->
    <!--</ul>-->
    <!--</div>-->
    <form id="dbForm" action="/queryCenter/report/dbexec" method="post">
    <div class="searchInfo" id="searchInfo" style="margin-left: 20px; margin-top: 80px">
        <div class="serviceInfo condition" id="isReplay">
            <div style="float: left;margin-top: 11px; font-weight: 700;font-size:15px">输入:</div>
            <div>
                <input type="text" id="sql" value="select * from tm_report_define where report_key = 'monitorMonthByAreaNew'"></input>
            </div>
        </div>
        <div id="dealStaffDiv" class="branchClass condition" style="height: 42px;width: 103%">

            <div class="form-group searchExp" style="margin-left: 92px;float:left;">
                <div class="text-right">
                    <button id="searchBtn" type="button"
                            class="btn btn-orange submitBtn">查询</button>
                </div>

            </div>
        </div>
    </div>
    </form>
    <input type="text" id="result_sql">
    <!--报表展示-->
    <div class="b-tableDiv table-responsive"
         style="overflow-y: hidden; margin-top: 45px;width: 96%;margin-left: 20px">
        <table id="resultTable"
               class="table table-striped table-bordered table-hover">
        </table>
    </div>
</div>
</div>

</body>
<!--bootstrap-->
<script type="text/javascript"
        src="/queryCenter/js/plugins/bootstrap/jquery-1.12.1.min.js"></script>
<script type="text/javascript"
       src="/queryCenter/js/plugins/bootstrap/bootstrap/js/bootstrap.min.js"></script>
<!--bootstrap table-->
<script type="text/javascript"
        src="/queryCenter/js/plugins/bootstrap/bootstrap-table/bootstrap-table.js"></script>
<script type="text/javascript"
        src="/queryCenter/js/plugins/bootstrap/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript"
        src="/queryCenter/js/plugins/bootstrap/bootstrap-table/bootstrap-table-export.min.js"></script>

<!--控制导出按钮-->
<script type="text/javascript"
        src="/queryCenter/js/plugins/bootstrap/bootstrap-table/tableExport.min.js"></script>
<!--PC 时间插件 My97DatePicker -->

<!--界面本身-->
<script type="text/javascript" >
    $(document).ready(function () {
        $(document).on("click", "#searchBtn", function () {
        var sql = $("#sql").val();
            $("#dbForm").get(0).action += "?sql="+sql;
           $("#dbForm").submit();
        });
    });
</script>

</html>