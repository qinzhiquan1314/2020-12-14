<!DOCTYPE html>
<html>
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
    <style type="text/css">
        * {
            font-family: 'Microsoft Yahei' !important;
        }

        .b-tableDiv table > thead > tr > th {
            font-size: 10px;
        }

        .bootstrap-table .table thead > tr > th {
            font-weight: 700;
        }

        .fixed-table-pagination .pagination-detail, .fixed-table-pagination div.pagination {
            margin-top: 20px;
            font-size: 10px;
        }

        .page-list .btn {
            font-size: 10px;
            border-color: #fa7a07;

            padding: 2px 6px;

        }

        .pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:focus, .pagination > .active > span:hover {
            background-color: #fa7a07;
            border-color: #fa7a07;

        }

        .btn-default:focus, .btn-default:hover {
            border-color: #fa7a07;
        }

        .open > .dropdown-toggle.btn-default:hover {
            border-color: #fa7a07;
        }

        .b-tableDiv table > thead > tr > th {
            font-family: 'Microsoft Yahei', 'Verdana', 'SimHei', sans-serif;
        }

        #table_a .th-inner {
            text-align: center;
            font-size: 12px;
        }

        #table_b .th-inner {
            text-align: center;
            font-size: 12px;
        }

        .table th, .table td {
            text-align: center;
            vertical-align: middle !important;
        }

        html, body {
            -ms-overflow-style: scrollbar;
        }

        /*场景流程*/
        .li6 {
            width: 12%;
        }

        .li5 {
            width: 6%;
        }

        .flowChartMainScene {
            background-color: #fff;
        }

        .chooseDivscence {
            margin-right: 10px;
            margin-left: 0px;
        }

        .chooseDivscence .chooseDivImg3 {
            width: 200px;
        }

        .chooseDivscence .chooseDivImg4 {
            left: 177px;
        }

        .modal_header_l1 {
            padding: 5px 5px;
            font-size: 12px;
        }

        .exportbtn {
            width: 200px;
            height: 40px;
            line-height: 40px;
            margin: 10px;
            background-color: #7496ed;
            color: #fff;
            font-size: 14px;
            border-radius: 8px;
            text-align: center;

        }

        .chooseTextnew {
            padding-bottom: 0px !important;
        }

        select[disabled='disabled']::-ms-value {
            color: #fff !important;
        }
        .showMe {
            display: inline-block;
        }
        .customizeBtn{
            padding: 8px 15px;
            color: #fff;
            border-radius: 8px;
            text-align: center;
            background-color:#575BD6;
            /*margin-right: 10px*/
        }
        .notclick{
            pointer-events: none;
        }
    </style>
</head>
<body>
<div class='me-content'>
    <div id="Lcontainer">
        <div class='logoBox fl'><img src="../images/stat/logo.png" class='logo'/></div>
        <div id="Lnav" class='me-lnav'>
            <ul class="Lnav">
            <@shiro.hasRole name="kbzx001"> 
                <li id="overview" class="li1">全流程监控总览</li>
            </@shiro.hasRole>
            <@shiro.hasRole name="kbzx002"> 
                <li id="onLine" class="in li2">互联网化一站式交付全流程监控</li>
            </@shiro.hasRole>
            <@shiro.hasRole name="kbzx003"> 
                <li id="offLine" class="out li3">传统集中受理交付全流程监控</li>
            </@shiro.hasRole>
            <@shiro.hasRole name="kbzx004"> 
                <li id="sceneMonitor" class=" li6">场景化流程监控</li>
            </@shiro.hasRole>
            <@shiro.hasRole name="kbzx005"> 
                <li id="keyIndex" class="li4">统计及重点指标</li>
            </@shiro.hasRole>
                <@shiro.hasRole name="kbzx006">
                    <li class="li5" style="line-height:18px!important">
                        <div id="feedBack"
                             style="width: auto;height: auto;max-width: 100%;max-height: 100%;overflow:hidden;">
                            <div><img src="../images/feedBack/indexReport.png" style="width: 28px;height: 27px; "></div>
                            <div style="font-size: 14px;width: auto;height: 20px;">在线反馈</div>
                        </div>
                        <span style="display:none;">[<@shiro.principal property="userName"></@shiro.principal>]</span>
                    </li>
                </@shiro.hasRole>
                <@shiro.hasRole name="kbzx007">
                    <li class="li5" style="line-height:18px!important">
                        <a id="admin" href="http://10.124.158.248/springboot" target="blank" style="width: auto;height: auto;max-width: 100%;max-height: 100%;overflow:hidden; display: inline-block; color: #fff;">
                            <div><img src="../images/feedBack/admin.png" style="width: 28px;height: 27px; "></div>
                            <div style="font-size: 14px;width: auto;height: 20px;">管理员</div>
                        </a>
                    </li>
                </@shiro.hasRole>
            <@shiro.lacksRole name="kbzx001"> 
                <li class="li1"></li>
            </@shiro.lacksRole>
            <@shiro.lacksRole name="kbzx002"> 
                <li class="li2"></li>
            </@shiro.lacksRole>
            <@shiro.lacksRole name="kbzx003"> 
                <li class="li3"></li>
            </@shiro.lacksRole>
            <@shiro.lacksRole name="kbzx004"> 
                <li class="li6"></li>
            </@shiro.lacksRole>
            <@shiro.lacksRole name="kbzx005"> 
                <li class="li4"></li>
            </@shiro.lacksRole>
                <@shiro.lacksRole name="kbzx006">
                    <li class="li5"></li>
                </@shiro.lacksRole>
                <@shiro.lacksRole name="kbzx007">
                    <li class="li5"></li>
                </@shiro.lacksRole>
            </ul>
        </div>
        <!--内容切换-->
        <!--内容切换-->
        <ul class="tables">
            <@shiro.hasRole name="kbzx001">
                <li class="on">
                    <div class="iframe clearfix">
                        <div class="topText show">
                            <span>宽带业务：</span>
                            <span class='datatag'>截至-年-月-日 -:-，北京公司今日累计总订单量</span>
                            <span class="textnub" id="kd_total_ord_num">-</span>，
                            竣工订单量 <span class="textnub" id="kd_finish_num">-</span> ，
                            超时订单量 <span class="textnub" id="kd_out_time_num">-</span> ，
                            昨日总订单量 <span class="textnub" id="kd_last_day_num">-</span> 。
                        </div>
                        <div style="color: #fff; position: absolute;top: 161px; right: 50%; cursor: pointer;font-size: 20px ">
                            <a  target="_blank"  href="http://10.245.24.23/queryCenter/web-monitor/page/newIndexflow.html?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D" style="color: #fff; border-bottom: 1px solid #fff">重点业务</a>
                        </div>
                        <div class="topText hide">
                            <span>移网业务：</span>
                            <span class='datatag'>截至-年-月-日 -:-，北京公司今日累计总订单量</span>
                            <span class="textnub" id="total_ord_num">-</span>，
                            线上订单今日来单量 <span class="textnub" id="ord_num">-</span>
                            （昨日来单量 <span class="textnub" id="yes_ord_num">-</span>） ，
                            今日交付量 <span class="textnub" id="deliver_num">-</span> ，
                            今日激活量 <span class="textnub" id="active_num">-</span>，
                            今日首充量 <span class="textnub" id="charge_num">-</span>，
                            累计待交付量 <span class="textnub" id="sum_deliver_num">-</span>。
                        </div>
                        <div class="topText hide">
                            <span>政企业务（标准化）：</span>
                            <span class='datatag'>截至-年-月-日 -:-，北京公司今日累计总订单量</span>
                            <span class="textnub" id="zq_total_ord_num">-</span>，
                            竣工订单量 <span class="textnub" id="zq_finish_num">-</span> ，
                            超时订单量 <span class="textnub" id="zq_out_time_num">-</span> ，
                            昨日总订单量 <span class="textnub" id="zq_last_day_num">-</span> 。
                        </div>
                        <div class="topText hide">
                            <span>政企业务（非标准）：</span>
                            <span class='datatag'>截至-年-月-日 -:-，北京公司今日累计总受理量</span>
                            <span class="textnub" id="fb_total_order_num">-</span>，
                            今日竣工量 <span class="textnub" id="fb_finish_num">-</span> ，
                            今日上账量 <span class="textnub" id="fb_deliver_num">-</span> ，
                            超时工单量 <span class="textnub" id="fb_outTime_num">-</span> ，
                            昨日受理量 <span class="textnub" id="fb_yesOrder_num">-</span> 。
                        </div>
                        <div class="mainLeft fl">
                            <ul class="selectA">

                                <a>
                                    <li class="tit" name="宽带" id="iselect0" type="broadBand">
                                        <img alt="" src="../images/stat/tit_bg_index.png" class="selectbg">
                                        <span>宽带</span>
                                    </li>
                                </a>
                                <div id="li2_4">
                                    <li class="iselect1 tit" name="融合业务" type="CP" id="iselect1">
                                        <div class="cursor">融合业务</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow" id="li3img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                    <li class="iselect2 tit" name="单宽业务" type="40" id="iselect2">
                                        <div class="cursor">单宽业务</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1" id="li2img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                    <li class="iselect20 tit" name="功能待开发" title="功能待开发" id="iselect20">
                                        <div class="cursor" style="color:#B0C4DE">IPTV业务</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1" id="li5img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                </div>

                                <a>
                                    <li class="tit" name="移网" id="iselect6" type="mobile">
                                        <img alt="" src="../images/stat/tit_bg_index.png" class="selectbg">
                                        <span>移网</span>
                                    </li>
                                </a>
                                <div>
                                    <li class="iselect3 tit" name="2I" type="2I" id="iselect7">
                                        <div class="cursor">2 I</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1" id="li9img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                    <li class="iselect3 tit" name="2C" type="2C" id="iselect8">
                                        <div class="cursor">2 C</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1" id="li7img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                </div>

                                <a>
                                    <li class="tit" name="政企（标准化）" id="iselect5" type="enterprise">
                                        <img alt="" src="../images/stat/tit_bg_index.png" class="selectbg">
                                        <span>政企（标准化）</span>
                                    </li>
                                </a>
                                <div>
                                    <li class="iselect3 tit" name="专线业务（云/光）" type="67" id="iselect3">
                                        <div class="cursor">专线业务（云/光）</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1" id="li8img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                    <li class="iselect4 tit" name="快线业务（云/光）" type="41" id="iselect4">
                                        <div class="cursor">快线业务（云/光）</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1" id="li4img">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                </div>
                                <a>
                                    <li class="tit" name="政企（非标准）" id="iselect9" type="offstand">
                                        <img alt="" src="../images/stat/tit_bg_index.png" class="selectbg">
                                        <span>政企（非标准）</span>
                                    </li>
                                </a>
                                <div>
                                    <li class="iselect3 tit" name="数据网元" type="68" id="iselect10">
                                        <div class="cursor">数据网元</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                    <li class="iselect4 tit" name="互联网专线" type="69" id="iselect11">
                                        <div class="cursor">互联网专线</div>
                                        <img alt="" src="../images/stat/down2.png" class="selectshow1">
                                    </li>
                                    <img src="../images/stat/lineIndex.png">
                                </div>
                            </ul>
                        </div>
                        <div class="mainRight fl">
                            <div class="selectTop">
                                <img src="../images/stat/small_icons_index.png">
                                北京公司今日累计
                                <div id="chooseDiv4_on" class="chooseDiv4 fr hide">
                                    <span class="so1 spcheck cursor" type="day">当日</span>
                                    <span class="so2 cursor" type="mouth">当月</span>
                                    <span class="so3 cursor" type="year">当年</span>
                                </div>
                            </div>

                            <div class="selectMain">
                                <!-- 宽带和政企（标准化） -->
                                <div class="selectBtn clearfix">
                                    <div class="btn1_bg">
                                        <img src="../images/index/btn_bg1.png" alt="" class="show btn_bg1" id="btn_bg1"
                                             type="pic1">
                                        <img src="../images/index/btn_bg2.png" alt="" class="hide" id="btn_bg2"
                                             type="pic1">
                                        <img src="../images/index/btn_bg3.png" alt="" class="hide" id="btn_bg3"
                                             type="pic1">
                                        <img src="../images/index/btn_bg4.png" alt="" class="hide" id="btn_bg4"
                                             type="pic1">
                                        <img src="../images/index/btn_bg5.png" alt="" class="hide" id="btn_bg5"
                                             type="pic1">
                                        <img src="../images/index/btn_bg6.png" alt="" class="hide" id="btn_bg6"
                                             type="pic1">
                                        <div class="details">
                                            <div id="btn_bg1_d" class='btn_bg1_d show clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details_left fl">
                                                    <div class="top clearfix">
                                                        <div class="top_l fl">互联网化来单：<span id="bg1_internet"
                                                                                           class="cursor kdzq"
                                                                                           type="btn_detail"
                                                                                           name="互联网化来单">--</span>
                                                        </div>
                                                        <div class="top_r fl">其中一站式交付：<span id="bg1_one_stop"
                                                                                            class="cursor kdzq"
                                                                                            type="btn_detail"
                                                                                            name="其中一站式交付">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="bottom clearfix">
                                                        <div class="text1 fl">沃易售 <span id="bg1_wo" type="btn_detail"
                                                                                        name="沃易售"
                                                                                        class="cursor kdzq">--</span>
                                                        </div>
                                                        <img src="../images/stat/line2_06.png" alt="" class="fl">
                                                        <div class="text fl">北京网厅 <span id="bg1_inter" type="btn_detail"
                                                                                        name="北京网厅"
                                                                                        class="cursor kdzq">--</span>
                                                        </div>
                                                        <img src="../images/stat/line2_06.png" alt="" class="fl">
                                                        <div class="text fl">集团商城 <span id="bg1_shop" type="btn_detail"
                                                                                        name="集团商城"
                                                                                        class="cursor kdzq">--</span>
                                                        </div>
                                                        <img src="../images/stat/line2_06.png" alt="" class="fl">
                                                        <div class="text fl">电话营销 <span id="bg1_call" type="btn_detail"
                                                                                        name="电话营销"
                                                                                        class="cursor kdzq">--</span>
                                                        </div>
                                                        <img src="../images/stat/line2_06.png" alt="" class="fl">
                                                        <div class="text fl">第三方合作 <span id="bg1_three"
                                                                                         type="btn_detail"
                                                                                         name="第三方合作"
                                                                                         class="cursor kdzq">--</span>
                                                        </div>
                                                        <img src="../images/stat/line2_06.png" alt="" class="fl">
                                                        <div class="text fl">其它 <span id="bg1_other" type="btn_detail"
                                                                                      name="其他"
                                                                                      class="cursor kdzq">--</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details_right fl">
                                                    <div class="top clearfix">
                                                        <div class="top_l fl">线下实体来单：<span id="bg1_under_line"
                                                                                           type="btn_detail"
                                                                                           name="线下实体来单"
                                                                                           class="cursor">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="bottom clearfix">
                                                        <div class="rtext1 fl">营业厅 <span id="bg1_business_hall"
                                                                                         type="btn_detail" name="营业厅"
                                                                                         class="cursor">--</span></div>
                                                        <img src="../images/stat/line2_06.png" alt="" class="fl">
                                                        <div class="rtext fl">社会渠道 <span id="bg1_society"
                                                                                         type="btn_detail"
                                                                                         name="社会渠道"
                                                                                         class="cursor">--</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg2_d" class='btn_bg2 hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">中台受理：<span id="bg2_city1" type="btn_detail"
                                                                                        name="中台受理"
                                                                                        class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">电话营销：<span id="bg2_call" type="btn_detail"
                                                                                        name="电话营销"
                                                                                        class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">装维行销：<span id="bg2_install"
                                                                                        type="btn_detail"
                                                                                        name="装维行销"
                                                                                        class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">营业厅：<span id="bg2_business_hall"
                                                                                       type="btn_detail" name="营业厅"
                                                                                       class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">社会渠道：<span id="bg2_society"
                                                                                        type="btn_detail"
                                                                                        name="社会渠道"
                                                                                        class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg3_d" class='btn_bg3   hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg3_city" type="btn_detail"
                                                                                      name="市区"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg3_suburbs" type="btn_detail"
                                                                                      name="近郊"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg3_outskirts"
                                                                                      type="btn_detail"
                                                                                      name="远郊"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">重通局：<span id="bg3_important"
                                                                                       type="btn_detail"
                                                                                       name="重通局"
                                                                                       class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">其他：<span id="bg3_other" type="btn_detail"
                                                                                      name="其他"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg4_d" class=' btn_bg4  hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg4_city" type="btn_detail"
                                                                                      name="市区"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg4_suburbs" type="btn_detail"
                                                                                      name="近郊"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg4_outskirts"
                                                                                      type="btn_detail"
                                                                                      name="远郊"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">重通局：<span id="bg4_important"
                                                                                       type="btn_detail"
                                                                                       name="重通局"
                                                                                       class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">其他：<span id="bg4_other" type="btn_detail"
                                                                                      name="其他"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg5_d" class='  btn_bg5 hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg5_city" type="btn_detail"
                                                                                      name="市区"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg5_suburbs" type="btn_detail"
                                                                                      name="近郊"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg5_outskirts"
                                                                                      type="btn_detail"
                                                                                      name="远郊"
                                                                                      class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">重通局：<span id="bg5_important"
                                                                                       type="btn_detail"
                                                                                       name="重通局"
                                                                                       class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg6_d" class='btn_bg6 hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">前台注销：<span id="bg6_rception"
                                                                                        type="btn_detail"
                                                                                        name="前台注销"
                                                                                        class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">中台处理退单：<span id="bg6_install"
                                                                                          type="btn_detail"
                                                                                          name="中台处理退单"
                                                                                          class="cursor kdzq">--</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="rightBtn clearfix staticPic">
                                        <a>
                                            <div class="btn1 fl" id="btn1" name="今日订单量">
                                                <img src="../images/index/btn1.png" alt="" class="hidden1" id="img1">
                                                <div class="nub num cursor" id="img1d" title="今日各触点来单总量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn2 fl" id="btn2" name="今日受理量">
                                                <img src="../images/index/btn2.png" alt="" class="visible1" id="img2"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="img2d" title="今日受理订单总量 ">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn3 fl" id="btn3" name="累计在途量">
                                                <img src="../images/index/btn3.png" alt="" class="visible1" id="img3"
                                                     type="pic2">
                                                <div class="nub num cursor" id="img3d" title="当前在途工单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn4 fl" id="btn4" name="累计超时量">
                                                <img src="../images/index/btn4.png" alt="" class="visible1" id="img4"
                                                     type="pic2">
                                                <div class="nub num cursor" id="img4d" title="当前超时工单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn5 fl" id="btn5" name="今日竣工量">
                                                <img src="../images/index/btn5.png" alt="" class="visible1" id="img5"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="img5d" title="今日竣工工单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn6 fl" id="btn6" name="今日撤单量">
                                                <img src="../images/index/btn6.png" alt="" class="visible1" id="img6"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="img6d" title="今日撤单量">--</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <!--移网-->
                                <div class="selectBtn clearfix" style="display:none">
                                    <div class="btn1_bg">
                                        <img src="../images/index1/btn_bg1.png" alt="" class="show btn_bg1" id="btn_bg7"
                                             type="pic1">
                                        <img src="../images/index1/btn_bg2.png" alt="" class="hide" id="btn_bg8"
                                             type="pic1">
                                        <img src="../images/index1/btn_bg3.png" alt="" class="hide" id="btn_bg9"
                                             type="pic1">
                                        <img src="../images/index1/btn_bg4.png" alt="" class="hide" id="btn_bg10"
                                             type="pic1">
                                        <img src="../images/index1/btn_bg5.png" alt="" class="hide" id="btn_bg11"
                                             type="pic1">
                                        <img src="../images/index1/btn_bg6.png" alt="" class="hide" id="btn_bg12"
                                             type="pic1">
                                        <div class="details">
                                            <div id="btn_bg7_d" class='btn_bg1_d show clearfix' type="det">
                                                <div class="details-t">
                                                    <div class="text1 fl">集团2I： <span id="bg7_group2iNum"
                                                                                      type="btn_detail"
                                                                                      name="集团2I"
                                                                                      class="cursor ">&#45;&#45;</span><img
                                                                id="bg7_group2iNum_src"
                                                                src="../images/stat/up.png" alt=""></div>
                                                    <div class="text2 fl">集团商城2C： <span id="bg7_group2cNum"
                                                                                        type="btn_detail" name="集团商城2C"
                                                                                        class="cursor ">&#45;&#45;</span><img
                                                                id="bg7_group2cNum_src"
                                                                src="../images/stat/up.png" alt=""></div>
                                                    <div class="text2 fl">沃易售： <span id="bg7_woNum" type="btn_detail"
                                                                                     name="沃易售"
                                                                                     class="cursor ">&#45;&#45;</span><img
                                                                id="bg7_woNum_src"
                                                                src="../images/stat/up.png" alt=""></div>
                                                    <div class="text2 fl">第三方： <span id="bg7_threePart"
                                                                                     type="btn_detail"
                                                                                     name="第三方"
                                                                                     class="cursor ">&#45;&#45;</span><img
                                                                id="bg7_threePart_src"
                                                                src="../images/stat/up.png" alt=""></div>
                                                    <div class="text2 fl">线下实体： <span id="bg7_offLine1"
                                                                                      type="btn_detail"
                                                                                      name="线下实体"
                                                                                      class="cursor ">&#45;&#45;</span><img
                                                                id="bg7_offLine1_src"
                                                                src="../images/stat/up.png" alt=""></div>
                                                </div>
                                                <div class="details-b show" id="group2iNum">
                                                    <div class="rtext1  fl" id="bg7_top12iName">社会化电商<span
                                                                id="bg7_top12iNum" type="btn_detail" name="社会化电商"
                                                                class="cursor ">--</span></div>
                                                    <div class="rtext1 left fl" id="bg7_top22iName">营业厅微厅<span
                                                                id="bg7_top22iNum" type="btn_detail" name="营业厅微厅"
                                                                class="cursor ">--</span></div>
                                                    <div class="rtext1 left fl" id="bg7_top32iName">省份商城<span
                                                                id="bg7_top32iNum" type="btn_detail" name="省份商城"
                                                                class="cursor ">--</span></div>
                                                    <div id="bg7_top12iCode" type="" class="hide"></div>
                                                    <div id="bg7_top22iCode" type="" class="hide"></div>
                                                    <div id="bg7_top32iCode" type="" class="hide"></div>
                                                </div>
                                                <div class="details-b hide" id="group2cNum">
                                                    <div class="rtext1  fl">网厅<span id="bg7_net2cNum" type="btn_detail"
                                                                                    name="网厅"
                                                                                    class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                    <div class="rtext1 left fl">手厅<span id="bg7_hall2cNum"
                                                                                        type="btn_detail"
                                                                                        name="手厅" class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                    <div class="rtext1 left fl">其他<span id="bg7_other2cNum"
                                                                                        type="btn_detail" name="其他"
                                                                                        class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <div class="details-b hide" id="woNum">
                                                    <div class="rtext1  fl">意向单<span id="bg7_intentionNum"
                                                                                     type="btn_detail"
                                                                                     name="意向单"
                                                                                     class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                    <div class="rtext1 left fl">码销<span id="bg7_mNum" type="btn_detail"
                                                                                        name="码销" class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                    <div class="rtext1 left fl">行销<span id="bg7_13"
                                                                                        type="btn_detail" name="行销"
                                                                                        class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <div class="details-b hide" id="threePart">
                                                    <div class="rtext1  fl">校园<span id="bg7_schoolNum" type="btn_detail"
                                                                                    name="校园"
                                                                                    class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                    <div class="rtext1 left fl">其他<span id="bg7_otherNum"
                                                                                        type="btn_detail"
                                                                                        name="其他" class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <div class="details-b hide" id="offLine1">
                                                    <div class="rtext1  fl">营业厅<span id="bg7_31" type="btn_detail"
                                                                                     name="营业厅"
                                                                                     class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                    <div class="rtext1 left fl">社会渠道<span id="bg7_32" type="btn_detail"
                                                                                          name="社会渠道" class="cursor yw">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="btn_bg8_d" class='btn_bg2 hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg8_szSumDeliverNum"
                                                                                      type="btn_detail" name="市区"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg8_jjSumDeliverNum"
                                                                                      type="btn_detail" name="近郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg8_yjSumDeliverNum"
                                                                                      type="btn_detail" name="远郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">中心：<span id="bg8_qtSumDeliverNum"
                                                                                      type="btn_detail" name="中心"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg9_d" class='btn_bg3   hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg9_szDeliverNum"
                                                                                      type="btn_detail" name="市区"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg9_jjDeliverNum"
                                                                                      type="btn_detail" name="近郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg9_yjDeliverNum"
                                                                                      type="btn_detail" name="远郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">中心：<span id="bg9_qtDeliverNum"
                                                                                      type="btn_detail" name="中心"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg10_d" class=' btn_bg4  hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg10_szActiveNum"
                                                                                      type="btn_detail"
                                                                                      name="市区"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg10_jjActiveNum"
                                                                                      type="btn_detail"
                                                                                      name="近郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg10_yjActiveNum"
                                                                                      type="btn_detail"
                                                                                      name="远郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">中心：<span id="bg10_qtActiveNum"
                                                                                      type="btn_detail"
                                                                                      name="中心"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg11_d" class='  btn_bg5 hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">市区：<span id="bg11_szChargeNum"
                                                                                      type="btn_detail"
                                                                                      name="市区"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">近郊：<span id="bg11_jjChargeNum"
                                                                                      type="btn_detail"
                                                                                      name="近郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">远郊：<span id="bg11_yjChargeNum"
                                                                                      type="btn_detail"
                                                                                      name="远郊"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details2 fl">
                                                    <div class="context1 fl">中心：<span id="bg11_qtChargeNum"
                                                                                      type="btn_detail"
                                                                                      name="其他"
                                                                                      class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="btn_bg12_d" class='btn_bg6 hide clearfix' type="det">
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details6 fl">
                                                    <div class="context1 fl">中台退单：<span id="bg12_ztNum"
                                                                                        type="btn_detail"
                                                                                        name="中台退单" class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details6 fl">
                                                    <div class="context1 fl">物流退件退单：<span id="bg12_wlNum"
                                                                                          type="btn_detail"
                                                                                          name="物流退件退单" class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details6 fl">
                                                    <div class="context1 fl">意向单退单：<span id="bg12_yxNum"
                                                                                         type="btn_detail"
                                                                                         name="意向单退单" class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details6 fl">
                                                    <div class="context1 fl">集团商城退单：<span id="bg12_jtNum"
                                                                                          type="btn_detail"
                                                                                          name="集团商城退单" class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                                <img src="../images/stat/line1_03.png" alt="" class="fl">
                                                <div class="details6 fl">
                                                    <div class="context1 fl">25天未激活退单：<span id="bg12_dayNum"
                                                                                            type="btn_detail"
                                                                                            name="25天未激活退单"
                                                                                            class="cursor ">&#45;&#45;</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="rightBtn clearfix staticPic">
                                        <a>
                                            <div class="btn1 fl" id="btn7" name="今日订单量">
                                                <img src="../images/index1/btn1.png" alt="" class="hidden1" id="img7">
                                                <div class="nub num cursor" id="orderNum" title="今日各渠道移网订单来单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn2 fl" id="btn8" name="累计待交付量">
                                                <img src="../images/index1/btn2.png" alt="" class="visible1" id="img8"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="sumDeliverNum"
                                                     title="当前各渠道已受理或已派单调度，但未交付移网订单量">--
                                                </div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn3 fl" id="btn9" name="今日交付量">
                                                <img src="../images/index1/btn3.png" alt="" class="visible1" id="img9"
                                                     type="pic2">
                                                <div class="nub num cursor" id="deliverNum" title="今日已完成交付移网订单量">--
                                                </div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn4 fl" id="btn10" name="今日激活量">
                                                <img src="../images/index1/btn4.png" alt="" class="visible1" id="img10"
                                                     type="pic2">
                                                <div class="nub num cursor" id="activeNum" title="今日激活成功移网订单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn5 fl" id="btn11" name="今日首充量">
                                                <img src="../images/index1/btn5.png" alt="" class="visible1" id="img11"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="chargeNum" title="今日首充的移网订单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn6 fl" id="btn12" name="今日退单量">
                                                <img src="../images/index1/btn6.png" alt="" class="visible1" id="img12"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="backNum" title="今日各渠道移网退单量">--</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <!-- 政企（非标准） -->
                                <div class="selectBtn clearfix" style="display:none">
                                    <div class="rightBtn clearfix staticPic">
                                        <a>
                                            <div class="btn1 fl" id="btn13" name="受理量">
                                                <img src="../images/index/btn13.png" alt="" class="visible1" id="img13">
                                                <div class="nub num cursor" id="img13d" title="受理的订单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn2 fl" id="btn14" name="开通施工量">
                                                <img src="../images/index/btn14.png" alt="" class="visible1" id="img14"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="img14d" title="正在施工的订单量 ">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn3 fl" id="btn15" name="资源建设量">
                                                <img src="../images/index/btn15.png" alt="" class="visible1" id="img15"
                                                     type="pic2">
                                                <div class="nub num cursor" id="img15d" title="进行资源建设的订单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn4 fl" id="btn16" name="竣工量">
                                                <img src="../images/index/btn16.png" alt="" class="visible1" id="img16"
                                                     type="pic2">
                                                <div class="nub num cursor" id="img16d" title="竣工的订单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn5 fl" id="btn17" name="上账量">
                                                <img src="../images/index/btn17.png" alt="" class="visible1" id="img17"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="img17d" title="上账的订单量">--</div>
                                            </div>
                                        </a>
                                        <a>
                                            <div class="btn6 fl" id="btn18" name="注销量">
                                                <img src="../images/index/btn18.png" alt="" class="visible1" id="img18"
                                                     type="pic2">
                                                <div class="nub1 num cursor" id="img18d" title="注销的订单量">--</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="selectBtm clearfix">
                                <div class="clearfix">
                                    <div class="btml fl">
                                        <img src="../images/stat/small_icons_index.png">
                                        <span id="type_title">今日订单量</span>
                                    </div>
                                    <div class="btmr fr show">
                                        <span class="sl1 slcheck cursor" id="select11">按销售线展示</span>
                                        <span class="sl2 cursor" id="select22">按小时展示</span>
                                        <span class="sl3 cursor" id="select33">按销售线导出</span>
                                        <span class="sl4  cursor" id="select44">按小时导出</span>
                                    </div>
                                    <div class="chooseDiv3 fr hidden">
                                        <span class="s21 slcheck cursor" id="select55">按销售线展示</span>
                                        <span class="s22  cursor" id="select66">按销售线导出</span>
                                    </div>
                                </div>
                                <!-- 柱状图 -->
                                <div id='barTable' class='barTable'>
                                </div>
                                <div id="chooseDiv3_on" class="chooseDiv3 fl">
                                    <span class="so1 spcheck cursor" id="select6" type="all">全部</span>
                                    <span class="so2 cursor" id="select7" type="1">装机</span>
                                    <span class="so3 cursor" id="select8" type="0">移机</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </@shiro.hasRole>
            <!-- 互联网化一站式交付全流程监控 -->
            <@shiro.hasRole name="kbzx002">
                <li>
                    <!--下拉框-->
                    <div class="choose">
                        <!-------改------->
                        <!-- <div class="chooseText">
                            截至2018年10月11日 18:10，北京公司今日累计总订单量  <span class="textnub"> 43</span>，竣工订单量  <span class="textnub"> 4</span> ，超时订单量  <span class="textnub"> 1371</span> ，昨日总订单量  <span class="textnub"> 59</span>  。
                        </div> -->
                        <!-------改------->
                        <div class="chooseText">
                            <span id='datatag1'>截至-年-月-日 -:-，北京公司今日累计意向单</span>
                            <span class="textnub" id="total_ord_num1">-</span>，
                            竣工意向单 <span class="textnub" id="finish_num1">-</span> ，
                            超时意向单 <span class="textnub" id="out_time_num1">-</span> ，
                            昨日意向单 <span class="textnub" id="last_day_num1">-</span> 。
                        </div>
                        <div id="chooseDiv" class="chooseDiv">
                            <div id="chooseDiv0" class="chooseDiv0">
                                <img src="../images/stat/select_bg21.png" class="chooseDivImg1">
                                <img src="../images/stat/up.png" class="chooseDivImg2">
                                <select id="liabilityState" class="liabilityState show">
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
                                    <!-- <option value="dkhzx">大客户中心</option> -->
                                    <!-- <option value="11a09h">电商部</option> -->
                                    <!-- <option value="11a0al">市支中心</option>
                                    <option value="11a01q">客服中心</option> -->
                                    <option value="10">重通局</option>
                                    <!-- <option value="cpzczx">产品支撑中心</option>
                                    <option value="11a0a1">国际业务中心</option>
                                    <option value="11a01r">集团客户</option>
                                    <option value="11a01s">电子渠道</option> -->
                                    <!-- <option value="11a03d">导航中心</option>
                                    <option value="11a04h">宽带业务中心</option>
                                    <option value="11a05l">互联互通部</option>
                                    <option value="11a079">产创</option> -->
                                    <option value="9999">其它</option>
                                </select>
                                <select id="liabilityStates" class="liabilityStates hide">
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

                                    <!-- <option value="11a09h">电商部</option> -->

                                    <option value="11a01q">客服中心</option>

                                <!-- <option value="cpzczx">产品支撑中心</option> -->
                                <!-- <option value="11a0a1">国际业务中心</option>
                                <option value="11a01r">集团客户</option>
                                 -->
                                <!-- <option value="11a03d">导航中心</option>
                                <option value="11a04h">宽带业务中心</option>
                                <option value="11a05l">互联互通部</option>
                                <option value="11a079">产创</option> -->
                                <option value="11a08x">其它</option>
                            </select>
                        </div>
                        <!-------改------->
                        <div id="chooseDiv1_on" class="chooseDiv1">
                            <select id="liabilityState1_on" class="liabilityState1">
                                <option value="all">全部</option>
                                <option value="1">装机</option>
                                <option value="0">移机</option>
                            </select>
                            <img src="../images/stat/select_bg22.png" class="chooseDivImg3">
                            <img src="../images/stat/up.png" class="chooseDivImg4">
                        </div>
                        <div class="chooseDate">
                            <span class=" choose1 spcheck" id="selectDateOn" data-id='0'>当日</span>
                            <span class="choose1" id="selectMouthOn" data-id='1'>当月</span>
                            <span class="choose1 " id="selectTotalOn" data-id='all'>累计</span>
                        </div>
                        <div id="chooseDiv2_on" class="chooseDiv2">
                            <span class="sp1 spcheck" id="select1" data-id='1'>属地</span>
                            <span class="sp2" id="select2" data-id='2'>发展</span>
                        </div>
                        <@shiro.hasRole name="kbzx002">
                        <div class="customizeBtn fr cursor" style="font-size: 16px" data-value='互联网'>
                            自定义查询
                        </div>
                        </@shiro.hasRole>
                    </div>
                </div>
                <!--线上流程图-->
                <div class="flowChartMain">
                    <div id="flowChart" style="width: 100%; height: 490px;" preserveAspectRatio="xMinYMin meet"></div>
                </div>
                <div class="box_height"></div>
                <div class="hidden" id='on_data'></div>

                </li>
            </@shiro.hasRole>
            <!-- 传统集中受理交付全流程监控 -->
            <@shiro.hasRole name="kbzx003">
                <li>
                    <!--下拉框-->
                    <div class="choose">
                        <!-------改------->
                        <!-- <div class="chooseText">
                            截至2018年10月11日 18:10，北京公司今日累计总订单量  <span class="textnub"> 43</span>，竣工订单量  <span class="textnub"> 4</span> ，超时订单量  <span class="textnub"> 1371</span> ，昨日总订单量  <span class="textnub"> 59</span>  。
                        </div> -->
                        <!-------改------->
                        <div class="chooseText">
                            <span id='datatag2'>截至-年-月-日 -:-，北京公司今日累计总订单量</span>
                            <span class="textnub" id="total_ord_num2">-</span>，
                            竣工订单量 <span class="textnub" id="finish_num2">-</span> ，
                            超时订单量 <span class="textnub" id="out_time_num2">-</span> ，
                            昨日总订单量 <span class="textnub" id="last_day_num2">-</span> 。
                        </div>
                        <div id="chooseDiv" class="chooseDiv">
                            <div id="chooseDiv0" class="chooseDiv0">
                                <img src="../images/stat/select_bg21.png" class="chooseDivImg1">
                                <img src="../images/stat/up.png" class="chooseDivImg2">
                                <select id="liabilityState11" class="liabilityState show">
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
                                    <!-- <option value="dkhzx">大客户中心</option>
                                    <option value="11a09h">电商部</option>
                                    <option value="11a0al">市支中心</option>
                                    <option value="11a01q">客服中心</option> -->
                                    <option value="10">重通局</option>
                                    <!-- <option value="cpzczx">产品支撑中心</option>
                                    <option value="11a0a1">国际业务中心</option>
                                    <option value="11a01r">集团客户</option>
                                    <option value="11a01s">电子渠道</option> -->
                                    <!-- <option value="11a03d">导航中心</option>
                                    <option value="11a04h">宽带业务中心</option>
                                    <option value="11a05l">互联互通部</option>
                                    <option value="11a079">产创</option> -->
                                    <option value="9999">其它</option>
                                </select>
                                <select id="liabilityStates1" class="liabilityStates hide">
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

                                    <!-- <option value="11a09h">电商部</option> -->

                                    <option value="11a01q">客服中心</option>

                                    <!-- <option value="cpzczx">产品支撑中心</option> -->
                                    <!-- <option value="11a0a1">国际业务中心</option>
                                    <option value="11a01r">集团客户</option> -->

                                <!-- <option value="11a03d">导航中心</option>
                                <option value="11a04h">宽带业务中心</option>
                                <option value="11a05l">互联互通部</option>
                                <option value="11a079">产创</option> -->
                                <option value="11a08x">其它</option>
                            </select>
                        </div>
                        <!-------改------->
                        <div id="chooseDiv1" class="chooseDiv1">
                            <select id="liabilityState1_out" class="liabilityState1">
                                <option value="all">全部</option>
                                <option value="1">装机</option>
                                <option value="0">移机</option>
                                <option value="2">前台资源建设单</option>
                            </select>
                            <img src="../images/stat/select_bg22.png" class="chooseDivImg3">
                            <img src="../images/stat/up.png" class="chooseDivImg4">
                        </div>
                        <!-------iptv------->
                        <div class="chooseDiv1">
                            <select id="liabilityState1_iptv" class="liabilityState1">
                                <option value="all">全部业务</option>
                                <option value="iptv">IPTV</option>
                                <option value="wifiManwu">WiFi满屋</option>
                            </select>
                            <img src="../images/stat/select_bg22.png" class="chooseDivImg3">
                            <img src="../images/stat/up.png" class="chooseDivImg4">
                        </div>
                        <div class="chooseDate">
                            <span class=" choose1 spcheck" id="selectDateOut" data-id='0'>当日</span>
                            <span class="choose1" id="selectMouthOut" data-id='1'>当月</span>
                            <span class="choose1 " id="selectTotalOut" data-id='all'>累计</span>
                        </div>
                        <!-------改------->
                        <div id="chooseDiv2" class="chooseDiv2">
                            <span class="sp1 spcheck" id="select3" data-id='0'>属地</span>
                            <span class="sp2" id="select4" data-id='1'>发展</span>
                        </div>
                        <@shiro.hasRole name="kbzx003">
                        <div class="customizeBtn fr cursor" style="font-size: 16px" data-value="传统">
                               自定义查询
                        </div>
                        </@shiro.hasRole>
                    </div>
                </div>
                <!--线下流程图-->
                <div class="flowChartMain">
                    <div id="flowChart1" style="width: 100%; height: 490px;" preserveAspectRatio="xMinYMin meet"></div>
                </div>
                <div class="box_height"></div>
                <div class="hidden" id='out_data'></div>
            </li>
            </@shiro.hasRole>
            <!--场景化流程监控-->
            <!--场景化流程监控-->
            <@shiro.hasRole name="kbzx004"> 
            <li class="">
                <!--下拉框-->
                <div class="choose">
                    <!-------改------->
                    <div class="chooseText" id="chooseText">
                        <span id='datatagscene'>截至-年-月-日 -:-，北京公司今日累计总订单量</span>
                        <span class="textnub" id="total_ord_numscene">-</span>，
                        交付订单量 <span class="textnub" id="finish_numscene">-</span> ，
                        超时订单量 <span class="textnub" id="out_time_numscene">-</span> ，
                        昨日总订单量 <span class="textnub" id="last_day_numscene">-</span> 。
                    </div>
                    <!--新加-->
                    <div class="chooseText hide chooseTextnew" id="chooseText1"
                         style="padding-bottom: -18px !important;">
                        <span>政企业务（非标准）：</span>
                        <span class='datatag1'>截至-年-月-日 -:-，北京公司今日累计总受理量</span>
                        <span class="textnub" id="fb_total_order_num1">-</span>，
                        今日竣工量 <span class="textnub" id="fb_finish_num1">-</span> ，
                        今日上账量 <span class="textnub" id="fb_deliver_num1">-</span> ，
                        超时工单量 <span class="textnub" id="fb_outTime_num1">-</span> ，
                        昨日受理量 <span class="textnub" id="fb_yesOrder_num1">-</span> 。
                        <br>
                        <!-- 20200428演示暂时去除
                        <div style="color: red;">系统测试中，数据仅供参考</div>
                        -->
                    </div>
                    <#--宽带修障-->
                    <div class="chooseText hide" id="chooseText2"
                         style="">
                        <span id='datatagscene1'>截至-年-月-日 -:-，北京公司今日累计总故障单量</span>
                        <span class="textnub" id="order_num">-</span>，
                        销单量 <span class="textnub" id="destroy_num">-</span> ，
                        累计超时故障单量 <span class="textnub" id="overTimeNum">-</span> ，
                        昨日总故障单量 <span class="textnub" id="yesOrderNum">-</span> 。
                    </div>

                    <div id="chooseDivscene" class="chooseDiv">
                        <!-------改------->
                        <div id="chooseDiv1scene" class="chooseDiv1 chooseDivscence">
                            <select id="liabilityState1_outscene" class="liabilityState1">
                                <option value="all">移网线上交付流程</option>
                                <option value="2">专线无条件受理流程</option>
                                <option value="3">公众业务修障流程</option>
                                <!--<option value="1">宽带⼀站式交付流程</option>-->
                                <!--<option value="0">宽带集中受理交付流程</option>-->
                            </select>
                            <img src="../images/stat/select_bg22.png" class="chooseDivImg3">
                            <img src="../images/stat/up.png" class="chooseDivImg4">
                        </div>
                        <!--新加-->
                        <div id="chooseDiv1scene1" class="chooseDiv1 chooseDivscence hide">
                            <select id="" class="liabilityState1">
                                <option value="all">全部分公司</option>
                            </select>
                            <img src="../images/stat/select_bg22.png" class="chooseDivImg3">
                            <img src="../images/stat/up.png" class="chooseDivImg4">
                        </div>
                        <div id="chooseDiv0scene" class="chooseDiv0">
                            <img src="../images/stat/select_bg21.png" class="chooseDivImg1">
                            <img src="../images/stat/up.png" class="chooseDivImg2">
                            <select id="liabilityState11scene" class="liabilityState show">
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
                                <option value="11a08x">其它</option>
                            </select>
                            <select id="liabilityStates1scene" class="liabilityStates hide">
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
                                <option value="11a08x">其它</option>
                            </select>
                        </div>
                        <div id="chooseDivscene2" class="chooseDiv1 hide">
                            <select id="liabilityStatescene2" class="liabilityState1">
                                <option value="all">全部</option>
                                <option value="1">装机</option>
                                <option value="0">移机</option>
                                <option value="2">前台资源建设单</option>
                            </select>
                            <img src="../images/stat/select_bg22.png" class="chooseDivImg3">
                            <img src="../images/stat/up.png" class="chooseDivImg4">
                        </div>
                       <#--//宽带修障-->
                        <div id="chooseDivscene3" class="chooseDiv0 hide">
                            <img src="../images/stat/select_bg21.png" class="chooseDivImg1">
                            <img src="../images/stat/up.png" class="chooseDivImg2">
                            <select id="liabilityStatescene3" class="liabilityState">
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
                                <option value="9999">其它</option>
                            </select>
                        </div>
                        <div id="businessType" class="chooseDiv0 hide">
                            <img src="../images/stat/select_bg21.png" class="chooseDivImg1">
                            <img src="../images/stat/up.png" class="chooseDivImg2">
                            <select id="businessTypeValue" class="liabilityState">
                                <option value="all">全部产品</option>
                                <option value="771">数字电路</option>
                                <option value="800507">SDH以太网专线</option>
                                <option value="189">光芯出租</option>
                                <option value="800768">互联网专线</option>
                                <option value="123">楼宇专线</option>
                                <option value="900100">光/云专线</option>
                                <option value="900600">智慧专线</option>
                            </select>
                        </div>
                        <div class="chooseDate">
                            <span class=" choose1 spcheck" id="selectDateOutscene" data-id='0'>当日</span>
                            <span class="choose1" id="selectMouthOutscene" data-id='1'>当月</span>
                            <span class="choose1 " id="selectTotalOutscene" data-id='2'>累计</span>
                        </div>
                        <!-------改------->
                        <div id="chooseDiv2scene" class="chooseDiv2 showMe">
                            <span class="sp1 spcheck" id="select3scene" data-id='1'>属地</span>
                            <span class="sp2" id="select4scene" data-id='2'>发展</span>
                        </div>
                        <@shiro.hasRole name="kbzx004">
                        <div id="zdycx" class="customizeBtn fr cursor" style="font-size: 16px" data-value='场景'>
                            自定义查询
                        </div>
                        </@shiro.hasRole>
                    </div>
                </div>
                <!--线下流程图-->
                <div class="flowChartMain flowChartMainScene">
                    <div id="scene" style="width: 100%; height: 520px;" preserveAspectRatio="xMinYMin meet"></div>
                </div>
                <div class="box_height"></div>
                <div class="hidden" id='scene_data'></div>
            </li>
          	</@shiro.hasRole>
             <!-- 统计及重点指标 -->
            <@shiro.hasRole name="kbzx005">
                <li class=''>
                    <#include "/web-monitor/page/tabControl.ftl"/>
                </li>
            </@shiro.hasRole>
        </ul>
    </div>
</div>
<!--cj图表-->
<div class="modal fade bs-example-modal-lg  " id="myModal_chartscene" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box_chart">
            <div class="clearfix">
                <img class="closeImg" id="close_btn_chartscene" src="../images/stat/close.png">
                <div class="modal_box_left_chart fl">
                    <table id="table_chartscene" class="table_chart table-bordered"
                           data-toggle="table_chart">
                        <thead class="table_header_chart">
                        <tr>
                            <th data-field="developerAreaName">分公司</th>
                            <th data-field="aCount">订单量</th>
                            <th data-field="bCount">超时单量</th>
                            <th data-field="timeOut">超时占比</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="modal_box_right_chart fl">
                    <div class="titleFlag"></div>
                    <p class="modal_box_right_header_chart">本环节销售线订单量/超时单量</p>
                    <div class="modal_box_right_nav_chart clearfix">
                        <div class="fl" id='timeFlagscene'>更新日期:2018年7月日5时35分</div>
                        <img class="exportImg" id="chart_exportscene" alt="" src="../images/stat/btn3.png">
                        <div class="orderFlag"></div>
                        <span class="orderTitle">订单量</span>
                        <div class="outTimeFlag"></div>
                        <span class="outTime">超时单量</span>
                    </div>
                    <div class="modal_chart_box_chart">
                        <div id="modal_chartscene" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--cja表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_ascene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">全部订单明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。
                </div>
                <img class="exportTable" id="table_exportscenea" alt="" src="../images/stat/btn3.png">
                <!-- <div class="modal_header_r fr table_export" id='table_export'>
                导出数据</div> -->
                <img class="closeImg" id="close_btnscene" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_ascene" class="table table_table table-bordered table_ascene"
                       data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-field="exTradeInmode" data-width='80px'>受理渠道</th>
                        <th data-field="bssSubscribeId">营业订单号</th>
                         <th data-field="exTradeId">渠道订单号</th>                       
                        <th data-field="serialNumber">订购号码</th>
                        <th data-field="provinceName">号码归属</th>
                        <th data-field="secondLevel">产品类型</th>
                        <th data-field="productName">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品名称
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th data-field="lastJobName">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前环节
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th data-field="sendMode">交付方式</th>
                        <th data-field="developStaffName">发展人</th>
                        <th data-field="developDepartName">发展人部门</th>
                        <th data-field="developStaffTel">发展人电话</th>
                        <th data-field="areaNameName">属地分公司</th>
                        <th data-field="pointName">交付点</th>
                        <th data-field="pointType">交付点类型</th>
                        <th data-field="lastJobStaff">当前环节处理人</th>
                        <th data-field="lastJobStaffTel">当前环节处理人电话</th>
                        <th data-field="acceptDate">下单时间</th>
                        <th data-field="workStartDate">当前环节开始时间</th>
                        <th data-field="jobTime">环节时限</th>
                        <th data-field="overTime">超时时点</th>
                        <th data-field="warnLevelName">告警级别</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<!--cjb表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_bscene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">超时明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。
                </div>
                <img class="exportTable" id="table_exporscenetb" alt="" src="../images/stat/btn3.png">
                <img class="closeImg" id="close_btn_bscene" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_bscene" width="110%" class="table table_table table-bordered table_bscene"
                       data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-field="exTradeInmode" data-width='80px'>受理渠道</th>
                        <th data-field="bssSubscribeId">营业订单号</th>
                         <th data-field="exTradeId">渠道订单号</th>     
                         <th data-field="serialNumber">订购号码</th>
                        <th data-field="provinceName">号码归属</th>
                        <th data-field="secondLevel">产品类型</th>
                        <th data-field="productName">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品名称
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th data-field="lastJobName">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前环节
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th data-field="sendMode">交付方式</th>
                        <th data-field="developStaffName">发展人</th>
                        <th data-field="developDepartName">发展人部门</th>
                        <th data-field="developStaffTel">发展人电话</th>
                        <th data-field="areaNameName">属地分公司</th>
                        <th data-field="pointName">交付点</th>
                        <th data-field="pointType">交付点类型</th>
                        <th data-field="lastJobStaff">当前环节处理人</th>
                        <th data-field="lastJobStaffTel">当前环节处理人电话</th>
                        <th data-field="acceptDate">下单时间</th>
                        <th data-field="jobTime">环节时限</th>
                        <th data-field="overTime">超时时点</th>
                        <th data-field="warnLevelName">告警级别</th>
                        <th data-field="warnLevel" data-formatter="actionFormatterscene"
                            data-width='80px'>触发短信
                        </th>
                        <th data-field="levelSendCount">当前告警级别发送次数</th>
                        <th data-field="linkSendCount">当前环节发送次数</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <!-- <div class="modal_foot fr" id="close_btn_b">收起图表</div> -->
        </div>
    </div>
</div>
<!--cjc表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_cscene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">手工发送短信</div>
                <img class="closeImg" id="close_btn_cscene" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table1">
                <table id="table_cscene" class="table table_table table-bordered" data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-formatter="stateFormatterscene" data-select="false" data-checkbox="true"></th>
                        <th data-field="staffName">人员名称</th>
                        <th data-field="serialNumber">联系号码</th>
                        <th data-field="departName">部门</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="modal_header_l modal_header_2 cursor fr" id="sendSmsscene">确定</div>
        </div>
        <input type="hidden" value="" id="warnLevelscene"></input>
        <input type="hidden" value="" id="orderNumscene"></input>
        <input type="hidden" value="" id="workFlagscene"></input>
    </div>
</div>
<!--cjd-->
<div class="modal fade bs-example-modal-lg " id="myModal_export_scene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <img class="closeImg" id="close_myModal_export_scene" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table1" id="conbtnscene">
            </div>
        </div>
    </div>
</div>
<!--场景新加表-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_dscene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">超时明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。
                </div>
                <img class="exportTable" id="table_exporscenetd" alt="" src="../images/stat/btn3.png">
                <img class="closeImg" id="close_btn_dscene" src="../images/stat/close.png">
            </div>
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_dscene" width="110%" class="table table_table table-bordered"
                       data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-field="exTradeInmode" data-width='80px'>受理渠道</th>
                        <th data-field="bssSubscribeId">订单号</th>
                        <th data-field="workinstid">工单号</th>
                        <th data-field="productnameSub">业务类型</th>
                        <th data-field="productFlag">互联网产品等级</th>
                        <th data-field="jobname">当前环节</th>
                        <th data-field="jobdepart">施工部门</th>
                        <th data-field="jobstaff">当前环节处理人</th>
                        <th data-field="jobstafftel">当前环节处理人电话</th>
                        <th data-field="workwarndate">超时时点</th>
                        <th data-field="limit_min">超时分钟数</th>
                        <th data-field="activateTime">起租时间</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<!--图表-->
<div class="modal fade bs-example-modal-lg " id="myModal_chart" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box_chart">
            <div class="clearfix">
                <img class="closeImg" id="close_btn_chart" src="../images/stat/close.png">
                <div class="modal_box_left_chart fl">
                    <table id="table_chart" class="table_chart table-bordered"
                           data-toggle="table_chart">
                        <thead class="table_header_chart">
                        <tr>
                            <th data-field="developerAreaName">分公司</th>
                            <th data-field="aCount">订单量</th>
                            <th data-field="bCount">超时单量</th>
                            <th data-field="timeOut">超时占比</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="modal_box_right_chart fl">
                    <div class="titleFlag"></div>
                    <p class="modal_box_right_header_chart">本环节销售线订单量/超时单量</p>
                    <div class="modal_box_right_nav_chart clearfix">
                        <div class="fl" id='timeFlag'>更新日期:2018年7月日5时35分</div>
                        <img class="exportImg" id="chart_export" alt="" src="../images/stat/btn3.png">
                        <div class="orderFlag"></div>
                        <span class="orderTitle">订单量</span>
                        <div class="outTimeFlag"></div>
                        <span class="outTime">超时单量</span>
                    </div>
                    <div class="modal_chart_box_chart">
                        <div id="modal_chart" style="height: 100%;"></div>
                    </div>
                    <!-- <div class="modal_foot fr" id="close_btn_chart">收起视图</div> -->
                </div>
            </div>
        </div>
    </div>
</div>
<!--表格-->
<!--a表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_a"
     tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">全部订单明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。</div>
                <img class="exportTable table_export" id="table_export" alt="" src="../images/stat/btn3.png">
                <!-- <div class="modal_header_r fr table_export" id='table_export'>
                    导出数据</div> -->
                <img class="closeImg" id="close_btn" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_a" class="table table_table table-bordered" data-height="300">
                    <thead class="table_header">
                    <tr>
                    </tr>
                    </thead>
                </table>
            </div>
            <!-- <div class="modal_foot fr" id="close_btn">收起图表</div> -->
        </div>
    </div>
</div>
<!--b表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_b" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">超时明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。</div>
                <img class="exportTable table_export" id="table_export" alt="" src="../images/stat/btn3.png">
                <!-- <div class="modal_header_r fr table_export" id='table_export'>
                    导出数据</div> -->
                <img class="closeImg" id="close_btn_b" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_b" class="table table_table table-bordered" data-height="300">
                    <thead class="table_header">
                    <tr>
                    </tr>
                    </thead>
                </table>
            </div>
            <!-- <div class="modal_foot fr" id="close_btn_b">收起图表</div> -->
        </div>
    </div>
</div>
<#--宽带修障a表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_escene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">全部订单明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。
                </div>
                <img class="exportTable" id="table_exporte" alt="" src="../images/stat/btn3.png">
                <img class="closeImg" id="close_btn_escene" src="../images/stat/close.png">
            </div>
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_escene" width="110%" class="table table_table table-bordered table_ascene table_bscene"
                       data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-field="exTradeInmode" data-width='80px'>受理渠道</th>
                        <th data-field="balkNo">订单号</th>
                        <th data-field="workId">工单号</th>
                        <th data-field="prodCatalog">业务类型</th>
                        <th data-field="lastJobName">当前环节</th>
                        <th data-field="areaName">属地分公司</th>
                        <th data-field="gridName">网格名称</th>
                        <th data-field="lastJobStaff">当前环节处理人</th>
                        <th data-field="lastJobStaffTel">当前环节处理人电话</th>
                        <th data-field="appointDate">预约时间</th>
                        <th data-field="jobTime">环节时限</th>
                        <th data-field="overTime">超时时点</th>
                        <th data-field="warnLevel">告警级别</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<#--宽带修障b表格-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_fscene" tabindex="-1"
     role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">超时明细</div>
                <div class="modal_header_l1 fl">当前页面仅展现2000条以内数据，超出内容请导出查询。
                </div>
                <img class="exportTable" id="table_exportf" alt="" src="../images/stat/btn3.png">
                <img class="closeImg" id="close_btn_fscene" src="../images/stat/close.png">
            </div>
            <div class="modal_table">
                <!--<table id="table" class="table table-bordered" >-->
                <table id="table_fscene" width="110%" class="table table_table table-bordered table_ascene table_bscene"
                       data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-field="exTradeInmode" data-width='80px'>受理渠道</th>
                        <th data-field="balkNo">订单号</th>
                        <th data-field="workId">工单号</th>
                        <th data-field="prodCatalog">业务类型</th>
                        <th data-field="lastJobName">当前环节</th>
                        <th data-field="areaName">属地分公司</th>
                        <th data-field="gridName">网格名称</th>
                        <th data-field="lastJobStaff">当前环节处理人</th>
                        <th data-field="lastJobStaffTel">当前环节处理人电话</th>
                        <th data-field="appointDate">预约时间</th>
                        <th data-field="jobTime">环节时限</th>
                        <th data-field="overTime">超时时点</th>
                        <th data-field="overMinutes">超时分钟数</th>
                        <th data-field="warnLevel">告警级别</th>
                        <th data-field="levelSendCount">当前告警级别发送次数</th>
                        <th data-field="linkSendCount">当前环节发送次数</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<!--场景化监控--专线--工单号弹框-->

<div class="modal fade bs-example-modal-lg " id="myModal_table_Inst" tabindex="-1" role="dialog"
     style="height: 430px !important;  margin-top: 200px !important; overflow-y: hidden;">
    <div class="modal-dialog modal-lg" role="document" style="width:35% !important;">
        <div class="modal-content modal_box" style="height:240px !important;">
            <!--头部-->
            <div class="clearfix">
                <img class="closeImg" id="close_btn_dscene_a" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table">
                <table id="table_a_a" class="table table_table table-bordered" data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th>环节信息</th>
                        <th>环节信息值</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-field="jobname">环节名称</td>
                        <td id="jobname"></td>
                    </tr>
                    <tr>
                        <td data-field="createdate">派发时间</td>
                        <td id="createdate"></td>
                    </tr>
                    <tr>
                        <td data-field="jobstate">当前状态</td>
                        <td id="jobstate"></td>
                    </tr>
                    <tr>
                        <td data-field="limitdate">超时时点</td>
                        <td id="limitdate"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<!--c表格 手工发送短信弹出层-->
<div class="modal fade bs-example-modal-lg " id="myModal_table_c"
     tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal_box">
            <!--头部-->
            <div class="clearfix">
                <div class="modal_header_l fl">手工发送短信</div>
                <img class="closeImg" id="close_btn_c" src="../images/stat/close.png">
            </div>
            <!--table样式-->
            <div class="modal_table1">
                <table id="table_c" class="table table_table table-bordered" data-height="300">
                    <thead class="table_header">
                    <tr>
                        <th data-formatter="stateFormatter" data-select="false" data-checkbox="true"></th>
                        <th data-field="staffName">人员名称</th>
                        <th data-field="serialNumber">联系号码</th>
                        <th data-field="departName">部门</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="modal_header_l modal_header_2 cursor fr" id="sendSms">确定</div>
        </div>
        <input type="hidden" value="" id="warnLevel"></input>
        <input type="hidden" value="" id="orderNum"></input>
        <input type="hidden" value="" id="workFlag"></input>
    </div>
</div>
</body>
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
<!--引入外部的js文件-->
<script type="text/javascript" src="../js/tabControl.js"></script>
<script type="text/javascript">
    // 自定义查询按钮跳转
    $('.customizeBtn').click(function(){
        // if($(this).attr('data-value') == '移网' && $('#liabilityState1_outscene option:selected').val() =='all'){
        //     window.open("flowBox/sceneFlow.html?" + locHref )
        // }
        switch ($(this).attr('data-value')) {
            case '传统':
                window.open("flowBox/traditionFlow.html?" + locHref )
                break;
            case '互联网':
                window.open("flowBox/internetFlow.html?" + locHref )
                break;
            case '场景':
                window.open("flowBox/sceneFlow.html?" + locHref + '&type=' + $('#liabilityState1_outscene option:selected').val())
                break;
        }
    })
</script>
<!--[if lt IE 9]>
<style type="text/css">
    .modal_box {
        background: transparent;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7fE7E7E7, endColorstr=#7fE7E7E7);
        zoom: 1;
    }

    .modal_box_chart {
        background: transparent;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7fE7E7E7, endColorstr=#7fE7E7E7);
        zoom: 1;
    }

</style>
<![endif]-->


</html>