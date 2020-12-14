<!DOCTYPE html xmlns="http://java.sun.com/jsf/html">
<head>
    <meta charset="UTF-8">
    <title>全流程监控总览</title>
    <meta name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name=”renderer” content=”webkit|ie-comp|ie-stand”/>
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <!--bootstrap插件-->
    <link rel="stylesheet" type="text/css" href="../js/plugins/bootstrap/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../js/plugins/bootstrap/bootstrap/css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="../js/plugins/bootstrap/bootstrap-table/bootstrap-table.min.css">
    <!--pc公共-->
    <link rel="stylesheet" type="text/css" href="../css/base.css">
    <!--加载等待插件-->
    <link rel="stylesheet" type="text/css" href="../css/zTreeStyle.css"/>
    <link rel="stylesheet" type="text/css" href="../js/plugins/jquery/fakeloader/css/fakeloader.min.css">
    <link rel="stylesheet" type="text/css" href="../css/flowCharttext.css"/>
    <link rel="stylesheet" type="text/css" href="../css/modal.css"/>
    <link rel="stylesheet" type="text/css" href="../css/monitView.css"/>
    <link rel="stylesheet" type="text/css" href="../css/table23.css">
    <!--bootstrap-->
    <script type="text/javascript" src="../js/plugins/bootstrap/jquery-1.12.1.min.js"></script>
    <script type="text/javascript" src="../js/plugins/bootstrap/bootstrap/js/bootstrap.min.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="../js/plugins/bootstrap/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="../js/plugins/bootstrap/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>
    <script type="text/javascript" src="../js/plugins/bootstrap/bootstrap-table/bootstrap-table-export.min.js"></script>
    <!--PC 时间插件 My97DatePicker -->
    <script type="text/javascript" src="../js/plugins/My97DatePicker/WdatePicker.js"></script>
    <!--控制导出按钮-->
    <script type="text/javascript" src="../js/plugins/bootstrap/bootstrap-table/tableExport.min.js"></script>
    <!--控制导出功能-->
    <!--bootstrap paginator-->
    <script type="text/javascript" src="../js/plugins/bootstrap/bootstrap-paginator/bootstrap-paginator.min.js"></script>
    <script type="text/javascript" src="../js/plugins/echarts3/echarts.js"></script>
    <script type="text/javascript" src="../js/plugins/BootBox/bootbox.min.js"></script>
    <!-- <script src="https://cdn.bootcss.com/echarts/3.8.4/echarts.js"></script> -->
    <script type="text/javascript" src="../js/plugins/ztree/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="../js/common.js"></script>
    <script type="text/javascript" src="../js/flowChart.js"></script>
    <script type="text/javascript" src="../js/modal.js"></script>
    <script type="text/javascript" src="../js/staticMonitor.js"></script>
    <!-- layer 弹出层 -->
    <script type="text/javascript" src="../js/plugins/layui/layer/layer.js"></script>
    <!-- <script type="text/javascript" src="../js/monitView.js"></script> -->
    <script type="text/javascript" src="../js/dateTable.js"></script>
    <!-- <script type="text/javascript" src="../js/table.js"></script> -->
    <script type="text/javascript" src="../js/index.js"></script>
    <script type="text/javascript" src="../js/scene.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            keyIndexLoad()
        });
    </script>
</head>
<body>
    <div class="me-content">
        <div class="navig">
            <#--移网选择分公司-->
            <div class="conRightTitlesele fl hide" id="mobileOffice">
                <img src="../images/stat/select_bg2.png" class="conRightTitle2img">
                <img src="../images/stat/up.png" class="conLeftTitle2img1">
                <select id="mobileOfficeoption" class="select5 show">
                    <option value="all">全部属地分公司</option>
                    <option value="225">二区</option>
                    <option value="226">三区</option>
                    <option value="211">四区</option>
                    <option value="212">五区</option>
                    <option value="213">七区</option>
                    <option value="214">八区</option>
                    <option value="216">房山</option>
                    <option value="217">通州</option>
                    <option value="218">顺义</option>
                    <option value="219">昌平</option>
                    <option value="220">大兴</option>
                    <optino value="215">门头沟</optino>
                    <option value="221">怀柔</option>
                    <option value="223">密云</option>
                    <option value="224">延庆</option>
                    <option value="222">平谷</option>
                    <option value="ds">电商自有</option>
                    <option value="dswl">恒宇</option>
                    <option value="dshg">汇顾</option>
                    <option value="dslc">凌创</option>
                </select>
            </div>
            <#--宽带选择分公司-->
            <div class="conRightTitlesele fl" id="wideBandOffice">
                <img src="../images/stat/select_bg2.png" class="conRightTitle2img">
                <img src="../images/stat/up.png" class="conLeftTitle2img1">
                <select id="salesLine" class='select5 hide'>
                    <option value="all">全部归属销售线</option>
                    <option value="225">二区</option>
                    <option value="226">三区</option>
                    <option value="211">四区</option>
                    <option value="212">五区</option>
                    <option value="213">七区</option>
                    <option value="214">八区</option>
                    <option value="217">通州</option>
                    <option value="219">昌平</option>
                    <option value="220">大兴</option>
                    <option value="218">顺义</option>
                    <option value="216">房山</option>
                    <option value="223">密云</option>
                    <option value="221">怀柔</option>
                    <option value="215">门头沟</option>
                    <option value="222">平谷</option>
                    <option value="224">延庆</option>
                    <option value="227">重通局</option>
                    <option value="11a0al">中台</option>
                    <option value="11a01s">渠道中心</option>
                    <option value="dkhzx">大客户中心</option>
                    <option value="11a01q">客服中心</option>
                    <option value="11a08x">其他</option>
                </select>
                <select id="branchOffice" class="select5 show">
                    <option value="all">全部属地分公司</option>
                    <option value="2">二区</option>
                    <option value="3">三区</option>
                    <option value="4">四区</option>
                    <option value="5">五区</option>
                    <option value="7">七区</option>
                    <option value="8">八区</option>
                    <option value="802">通州</option>
                    <option value="801">昌平</option>
                    <option value="804">大兴</option>
                    <option value="806">顺义</option>
                    <option value="803">房山</option>
                    <option value="809">密云</option>
                    <option value="808">怀柔</option>
                    <option value="805">门头沟</option>
                    <option value="807">平谷</option>
                    <option value="810">延庆</option>
                    <option value="10">重通局</option>
                    <option value="9999">其他</option>
                </select>
            </div>
            <#--移网属地点选-->
            <div class="conLeftTitle1 fl hide" id="mobilePossession">
                <div class="sp1 spcheck fl" id='mobilePossession1'>属地</div>
                <div class="sp2 fr" id='mobileBevelop'>发展</div>
            </div>
            <#--宽带属地发展点选-->
            <div class="conLeftTitle1 fl" id="wideBandPossession">
                <div class="sp1 spcheck fl" id='tab4Possession'>属地</div>
                <div class="sp2 fr" id='tab4Bevelop'>发展</div>
            </div>
        </div>
        <div class="clearfix">
            <div class="conLeft fl">
                <div class="conLeftTop">
                    <table class="tableStat" id='tableStat'>
                        <thead class="">
                        <tr>
                            <th data-field="name">重点指标名称</th>
                            <th data-field="day_data">今日值</th>
                            <th data-field="month_data">本月累计</th>
                            <th data-field="rate">累计环比</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <!--雷达图开始  -->
                <div class="conLeftBottom">
                    <div class="conLeftBottomtit">
                        <img src="../images/stat/small_icons.png"/>
                        <span class="fontSize">雷达图</span>
                    </div>
                    <div class="conLeftBottomCon">
                        <div id='conLeftBottomCon1' class='conLeftBottomCon1'>
                        </div>
                    </div>
                </div>
                <!--雷达图结束  -->
            </div>
            <div class="conRight fl">
                <div class="conRightCon1">
                    <div class="conLeftBottomtit">
                        <img src="../images/stat/small_icons.png"/>
                        <span class="fontSize">近6个月趋势图</span>
                    </div>
                    <!-- 折线图开始 -->
                    <div id='conRightCon1Top' class='conRightCon1Top'>

                    </div>

                </div>
                <div class="conRightCon2">
                    <div class="conLeftBottomtit" style='margin-top: 13px;'>
                        <img src="../images/stat/small_icons.png"/>
                        <span id="areaName" class="fontSize"></span>
                    </div>
                    <!-- 柱状图 -->
                    <div id='conRightCon2Top' class='conRightCon2Top'>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div style='height:640px;'></div> -->
    </div>
</body>
</html>