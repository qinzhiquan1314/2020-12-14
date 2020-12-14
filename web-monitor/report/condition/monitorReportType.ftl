<div class="qryCon" id="reportKey">
    <label>${con.label}:</label>
    <ul>
        <#list con.values as value>
            <#if value.default??>
                <li class="searched" value="${value.value}" areaType="${value.areaType}" gridShow='${value.gridShow!"true"}'>${value.name}</li>
            <#else>
                <li value="${value.value}" areaType="${value.areaType}" gridShow='${value.gridShow!"true"}'>${value.name}</li>
            </#if>
        </#list>
    </ul>
</div>

<script type="text/javascript">
    //测试特殊处理，上线是删掉
    if (reportKey=="monitorMonthByAreaNewTtd") {
        reportKey="monitorMonthByAreaNew";
    }
    if (reportKey=="monitorDayByAreaNewTtd") {
        reportKey="monitorDayByAreaNew";
    }

    var reportKeyTmp=reportKey;

    queryCons.push({
        init:function(){
            $("#reportKey ul li").click(function (){
                $(this).siblings('li').removeClass('searched');
                $(this).addClass('searched');
                reportKey = $(this).attr("value");	//修改全局的报表名称
                if("monitorMonthByAreaNew"==reportKey){
                    //$("#Lnav_text").text("重点监控指标月累计");
                    $("#areaAll").css("display", "block");
                    $("#prodCatalog").css("display", "block");
                }else if ("monitorMonthByDevelopAreaNew"==reportKey){
                    //$("#Lnav_text").text("重点监控指标月累计");
                    $("#areaAll").css("display", "none");
                    $("#prodCatalog").css("display", "none");
                }else if("monitorDayByAreaNew"==reportKey){
                    //$("#Lnav_text").text("重点监控指标日累计");
                    $("#areaAll").css("display", "block");
                    $("#prodCatalog").css("display", "block");
                }else if("monitorDayByDevelopAreaNew"==reportKey){
                    //$("#Lnav_text").text("重点监控指标(发展-日累计)");
                    $("#areaAll").css("display", "none");
                    $("#prodCatalog").css("display", "none");
                }

                var tmpAreaType = $(this).attr("areaType");	//修改属地的类型
                $.each(queryCons ,function(index,queryCon){
                    if(queryCon.name=="areaAll" && queryCon.areaType!=tmpAreaType){
                        queryCon.reset(tmpAreaType);
                    }
                    if(queryCon.name=="buttonQueryDirect"){
                        queryCon.reset();
                    }
                });

            })
        },
        initValue:function(paramObj){
            var sel = $("#reportKey ul li[value="+reportKey+"]");
            if(sel.length==1){
                sel.click();
            }
        },
        check:function(){
            var v = $("#reportKey ul li.searched");
            if(v.length!=1){
                layer.msg($("#reportKey label:first").html().replace(":","")+"没有选择!", {time: 2000});
                return false;
            }
            return true;
        },
        makeQeryObj:function(){
            return {"reportKey": $("#reportKey ul li.searched").attr("value")};
        }
    });
</script>