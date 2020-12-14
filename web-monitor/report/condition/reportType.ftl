<div class="qryCon" id="reportKey">
    <label>${con.label}:</label>
    <ul>
        <#list con.values as value>
            <#if value.default??>
                <li class="searched" value="${value.value}" areaType="${value.areaType}"
                    gridShow='${value.gridShow!"true"}'>${value.name}</li>
            <#else>
                <li value="${value.value}" areaType="${value.areaType}"
                    gridShow='${value.gridShow!"true"}'>${value.name}</li>
            </#if>
        </#list>
    </ul>
</div>

<script type="text/javascript">
    queryCons.push({
        init: function () {
            $("#reportKey ul li").click(function () {
                $(this).siblings('li').removeClass('searched');
                $(this).addClass('searched');

                reportKey = $(this).attr("value");	//修改全局的报表名称

                //以下属地展示销售线筛选框，发展隐藏销售线筛选框

                //订单全流程监控总表（包含）
                if("flowMonitorTotal1"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("flowMonitorTotalDev1"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                //订单全流程监控总表（整体）
                if ("flowMonitorTotal2"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("flowMonitorTotalDev2"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                //订单转化监控表
                if ("OrderConvertByArea"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("OrderConvertByDevelop"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                //在途工单监控表
                if ("OrderOnProcessByArea"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("OrderOnProcessByDevelop"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                //超时工单监控表
                if ("overCountMonitor"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("overCountMonitorDev"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                //竣工量监控表
                if ("OrderFinishByArea"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("OrderFinishByDevelop"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                //撤单量监控表
                if ("OrderBackByArea"==reportKey){
                    $("#areaAll").css("display", "block");
                }else if ("OrderBackByDevelop"==reportKey){
                    $("#areaAll").css("display", "none");
                }

                var tmpAreaType = $(this).attr("areaType");	//修改属地的类型
                var tmpGridShow = $(this).attr("gridShow")
                $.each(queryCons, function (index, queryCon) {
                    if (queryCon.name == "areaAll" && queryCon.areaType != tmpAreaType) {
                        queryCon.reset(tmpAreaType);
                    }
                    if (queryCon.name == "gridAll") {
                        queryCon.reset(tmpGridShow);
                    }
                    if (queryCon.name == "buttonQueryAll") {
                        queryCon.reset();
                    }
                });

            })
        },
        initValue: function (paramObj) {
            var sel = $("#reportKey ul li[value=" + reportKey + "]");
            if (sel.length == 1) {
                sel.click();
            }
        },
        check: function () {
            var v = $("#reportKey ul li.searched");
            if (v.length != 1) {
                layer.msg($("#reportKey label:first").html().replace(":", "") + "没有选择!", {time: 2000});
                return false;
            }
            return true;
        },
        makeQeryObj: function () {
            return {"reportKey": $("#reportKey ul li.searched").attr("value")};
        }
    });
</script>