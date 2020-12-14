/**
 *
 *
 */
var locHref = window.location.href.substr(window.location.href.indexOf("?") + 1);
//初始化Ai数据
var statics_in = [];
statics_in[0] = {workFlag: 8, aCount: 0, bCount: 0},
    statics_in[1] = {workFlag: 9, aCount: 0, bCount: 0},
    statics_in[2] = {workFlag: 10, aCount: 0, bCount: 0},
    statics_in[3] = {workFlag: 11, aCount: 0, bCount: 0},
    statics_in[4] = {workFlag: 12, aCount: 0, bCount: 0},
    statics_in[5] = {workFlag: 13, aCount: 0, bCount: 0},
    statics_in[6] = {workFlag: 14, aCount: 0, bCount: 0},
    statics_in[7] = {workFlag: 15, aCount: 0, bCount: 0},
    statics_in[8] = {workFlag: 16, aCount: 0, bCount: 0},
    statics_in[9] = {workFlag: 17, aCount: 0, bCount: 0},
    statics_in[10] = {workFlag: 18, aCount: 0, bCount: 0};
statics_in[11] = {workFlag: 24, aCount: 0, bCount: 0};
//初始化Bi数据
var statics_out = [];
statics_out[0] = {workFlag: 1, aCount: 0, bCount: 0},
    statics_out[1] = {workFlag: 19, aCount: 0, bCount: 0},
    statics_out[2] = {workFlag: 2, aCount: 0, bCount: 0},
    statics_out[3] = {workFlag: 3, aCount: 0, bCount: 0},
    statics_out[4] = {workFlag: 4, aCount: 0, bCount: 0},
    statics_out[5] = {workFlag: 5, aCount: 0, bCount: 0},
    statics_out[6] = {workFlag: 6, aCount: 0, bCount: 0},
    statics_out[7] = {workFlag: 7, aCount: 0, bCount: 0};
statics_out[8] = {workFlag: 20, aCount: 0, bCount: 0};
statics_out[9] = {workFlag: 23, aCount: 0, bCount: 0};
statics_out[10] = {workFlag: 21, aCount: 0, bCount: 0};
statics_out[11] = {workFlag: 22, aCount: 0, bCount: 0};
var workCatalog = 0;
//装机移机 线上
var tradeCatalog_on = 'all';
sessionStorage.setItem("tradeCatalog_on_value", tradeCatalog_on);
//装机移机 线下
var tradeCatalog_out = 'all';
sessionStorage.setItem("tradeCatalog_out_value", tradeCatalog_out);
//发展属地 线上
var onlineType_on = '1';
sessionStorage.setItem("onlineType_on", onlineType_on);
//发展属地 线下
var onlineType_out = '1';
sessionStorage.setItem("onlineType_out", onlineType_out);
//当日(0)、当月(1)、累计(all)
var dateType = "0";
var dateTypeOn = "0";//线上
var dateTypeOut = "0"; //线下
// iptv
var classType = "all";
//原码
$(function () {
    $('#Lnav ul>li').on('click', function () {
        if ($(this).attr('id') == undefined) {
            return;
        }
        var _index = $(this).index();
        $(this).addClass('Lcheck').siblings().removeClass('Lcheck');
        $('.tables>li').eq(_index).addClass('on').siblings().removeClass('on');
        //判断线上线下
        if ($('.in').hasClass('Lcheck')) {
            dateType = dateTypeOn;
            workCatalog = 0;
            /*            $.ajax({
                            type:"post",
                            url:getOutUrl(getRootPath_web(), "/monitor/querySaleArea?userParam="+locHref+"&timestamp="+Date.parse(new Date())+"&dateType="+dateType),
                            async:true,
                            dataType: 'json',
                            success: function(res) {
                                sessionStorage.setItem("value_in",  res.developerArea);//把data对应的值保存到sessionStorage
                                var arr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","dkhzx","11a01q","227","11a0a1","11a0al","11a01r","11a01s","11a08x"];
                                arr.forEach(function(value,index){
                                    //console.log(value)
                                    //遍历所有option
                                    if(res.developerArea == "all"){
                                        $("option").addClass("show");
                                    }else{
                                        if(value == res.developerArea){titleCount
                                            //console.log(11)
                                            //$("#liabilityState option[value!=value]").remove();
                                            $("option[value = "+value+"]").addClass("show");
                                        }else{
                                            $("option").addClass("hide");
                                        }
                                    }
                                });
                                var developerArea1 = res.developerArea;
                                console.log(developerArea1)
                                if(onlineType_on==1){
                                     var value = $('#liabilityState option:selected').val();
                                     developerArea1 = value;
                                }else if(onlineType_on==2){
                                     var value = $('#liabilityStates option:selected').val();
                                     developerArea1 = value;
                                }
            //                    var value = $('#liabilityState option:selected').val();
            //                    developerArea1 = value;
                                var value_colony = $('#liabilityState1_on option:selected').val();
                                title("online");
                                makeSvgOnline(locHref,developerArea1,value_colony,onlineType_on,dateType);
                            }
                        });*/
        }
        //线下
        else if ($('.out').hasClass('Lcheck')) {
            workCatalog = 1;
            dateType = dateTypeOut;
            /* $.ajax({
                type:"post",
                url:getOutUrl(getRootPath_web(), "/monitor/querySaleArea?userParam="+locHref+"&timestamp="+Date.parse(new Date())+"&dateType="+dateType),
                async:true,
                dataType: 'json',
                success: function(res) {
                    sessionStorage.setItem("value_out",  res.developerArea);//把data对应的值保存到sessionStorage
                    var arr = ["225","226","211","212","213","214","217","219","220","218","216","223","221","215","222","224","dkhzx","11a01q","227","11a0a1","11a0al","11a01r","11a01s","11a08x"];
                    arr.forEach(function(value,index){
                        //console.log(value)
                        //遍历所有option
                        if(res.developerArea == "all"){
                            $("option").addClass("show");
                        }else{
                            if(value == res.developerArea){
                                //console.log(11)
                                //$("#liabilityState option[value!=value]").remove();
                                $("option[value = "+value+"]").addClass("show");
                            }else{
                                $("option").addClass("hide");
                            }
                        }
                    });
                    var developerArea1 = res.developerArea;
                    if(onlineType_out==1){
                   	 var value = $('#liabilityState11 option:selected').val();
                   	 developerArea1 = value;
                   }else if(onlineType_out==2){
                   	 var value = $('#liabilityStates1 option:selected').val();
                   	 developerArea1 = value;
                   }
//                    var value = $('#liabilityStates option:selected').val();
//                    developerArea1 = value;
                    var value_colony = $('#liabilityState1_out option:selected').val();
                    title("underline");
                    makeSvgUnderline(locHref,developerArea1,value_colony,onlineType_out,dateType);
                }
            });*/
        } else if ($('#sceneMonitor').hasClass('Lcheck')) {
            if ($('#liabilityState1_outscene option:selected').val() == 'all') {
                //展示
                //alert(1111)
                $('#chooseText').addClass('show').removeClass('hide')
                $('#chooseDiv2scene').addClass('showMe').removeClass('hide')
                $('#chooseDivscene2').addClass('show').removeClass('hide')
                $('#chooseDiv0scene').addClass('show').removeClass('hide')
                //隐藏
                $('#chooseText1').addClass('hide').removeClass('show')
                $('#chooseText2').addClass('hide').removeClass('show')
                $('#chooseDiv1scene1').addClass('hide').removeClass('show')
                $('#chooseDivscene2').addClass('hide').removeClass('show')
                scenehtml.html(str);
                titlescene()

            } else if ($('#liabilityState1_outscene option:selected').val() == '2') {
                // 展示
                //alert(2222)
                $('#chooseText1').addClass('show').removeClass('hide')
                $('#chooseDiv1scene1').addClass('show').removeClass('hide')
                //隐藏
                $('#chooseText').addClass('hide').removeClass('show')
                $('#chooseText2').addClass('hide').removeClass('show')
                $('#chooseDiv0scene').addClass('hide').removeClass('show')
                $('#chooseDivscene2').addClass('hide').removeClass('show')
                $('#chooseDiv2scene').addClass('hide').removeClass('showMe')
                $('#chooseDivscene2').addClass('hide').removeClass('show')
                scenehtml.html(str1);
                titlescene1()
            } else if ($('#liabilityState1_outscene option:selected').val() == '3') {
                // 展示
                //alert(3333)
                $('#chooseText2').addClass('show').removeClass('hide')
                $('#chooseDiv0scene').addClass('show').removeClass('hide')

                //隐藏
                $('#chooseText').addClass('hide').removeClass('show')
                $('#chooseText1').addClass('hide').removeClass('show')
                $('#chooseDiv1scene1').addClass('hide').removeClass('show')
                $('#chooseDivscene2').addClass('hide').removeClass('show')
                $('#chooseDiv2scene').addClass('hide').removeClass('show')
                $('#chooseDivscene2').addClass('hide').removeClass('show')
                $('#chooseDiv0scene').addClass('hide').removeClass('show')
                $('#zdycx').addClass('hide').removeClass('show')
                scenehtml.html(str2);
                titlescene2();
            } else {
                $('#chooseDivscene2').addClass('show').removeClass('hide')
            }

        }
    })
});


//缓存数据
//value_in:归属度   tradeCatalog_on_value:装机移机   onlineType_on:发展属地
//value_out:归属度   tradeCatalog_out_value:装机移机   onlineType_out:发展属地
//归属线下拉框事件  属地
$(document).on("change", "#liabilityState", function () {
    var value_in = $('#liabilityState option:selected').val();
    //sessionStorage.setItem("value_in", value_in);
    $('#on_data').attr('value_in_sd', value_in)
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    dateType = dateTypeOn;
    makeSvgOnline(locHref, value_in, tradeCatalog, onlineType_on, dateType);
});
//归属线下拉框事件  发展
$(document).on("change", "#liabilityStates", function () {
    var value_in = $('#liabilityStates option:selected').val();
    //sessionStorage.setItem("value_in", value_in);
    $('#on_data').attr('value_in_fz', value_in)
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    dateType = dateTypeOn;
    makeSvgOnline(locHref, value_in, tradeCatalog, onlineType_on, dateType);
});

//动态添加管理员的跳转连接
$(function () {
    function changeHref() {
        var getRequest = function () {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(url.indexOf("?") + 1);
                return str;
            }
            return theRequest;
        }

        var getRequest = getRequest();
        console.log("http://10.124.158.248/springboot?queryToken=" +encodeURIComponent(getRequest) );
        var host = window.location.host;
        console.log(host);
        if (host == "10.124.147.88" || host.indexOf("localhost") !=-1){
            $("#admin").attr("href", "http://10.124.158.248/springboot?queryToken=" + encodeURIComponent(getRequest));//测试
        }else {
            $("#admin").attr("href", "http://10.245.24.206/springboot?queryToken=" + encodeURIComponent(getRequest));//生产
        }
    }

    changeHref()
});

//移机装机下拉框事件
$(document).on("change", "#liabilityState1_on", function () {
    //var valuein_developerArea = sessionStorage.getItem("value_in");
    if (onlineType_on == 1) {
        if ($('#on_data').attr('value_in_sd')) {
            var valuein_developerArea = $('#on_data').attr('value_in_sd')
        } else {
            var valuein_developerArea = 'all'
        }
    } else if (onlineType_on == 2) {
        if ($('#on_data').attr('value_in_fz')) {
            var valuein_developerArea = $('#on_data').attr('value_in_fz')
        } else {
            var valuein_developerArea = 'all'
        }
    }
    var tradeCatalog_on_value = $('#liabilityState1_on option:selected').val();
    sessionStorage.setItem("tradeCatalog_on_value", tradeCatalog_on_value);//把data对应的值保存到sessionStorage
    dateType = dateTypeOn;
    makeSvgOnline(locHref, valuein_developerArea, tradeCatalog_on_value, onlineType_on, dateType);
});
//线上属地发展选择
$("#select1").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    $("#liabilityStates").removeClass("show").addClass("hide");
    $("#liabilityState").removeClass("hide").addClass("show");
    onlineType_on = '1';
    sessionStorage.setItem("onlineType_on", onlineType_on);
    //var valuein_developerArea = sessionStorage.getItem("value_in");
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    if ($('#on_data').attr('value_in_sd')) {
        var value_in_sd = $('#on_data').attr('value_in_sd')
    } else {
        var value_in_sd = 'all'
    }
    dateType = dateTypeOn;
    //初始化销售线展示
    queryValues = queryPermissionIndex(onlineType_on);
    value_in_sd = intSaleLineIndex(queryValues, onlineType_on, value_in_sd, "liabilityState", "on_data", "value_in_sd");
    //var value_in_sd = $('#on_data').attr('value_in_sd')
    makeSvgOnline(locHref, value_in_sd, tradeCatalog, onlineType_on, dateType);
});
$("#select2").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    $("#liabilityState").removeClass("show").addClass("hide");
    $("#liabilityStates").removeClass("hide").addClass("show");
    onlineType_on = '2';
    sessionStorage.setItem("onlineType_on", onlineType_on);
    var valuein_developerArea = sessionStorage.getItem("value_in");
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    if ($('#on_data').attr('value_in_fz')) {
        var value_in_fz = $('#on_data').attr('value_in_fz')
    } else {
        var value_in_fz = 'all'
    }
    dateType = dateTypeOn;
    //初始化销售线展示
    queryValues = queryPermissionIndex(onlineType_on);
    value_in_fz = intSaleLineIndex(queryValues, onlineType_on, value_in_fz, "liabilityStates", "on_data", "value_in_fz");

    //var value_in_fz = $('#on_data').attr('value_in_fz')
    makeSvgOnline(locHref, value_in_fz, tradeCatalog, onlineType_on, dateType);
});
//线下属地
$(document).on("change", "#liabilityState11", function () {
    var value_out = $('#liabilityState11 option:selected').val();
    sessionStorage.setItem("value_out", value_out);
    $('#out_data').attr('value_out_sd', value_out)
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    dateType = dateTypeOut;
    makeSvgUnderline(locHref, value_out, tradeCatalog, onlineType_out, dateType);
});
$(document).on("change", "#liabilityStates1", function () {
    var value_out = $('#liabilityStates1 option:selected').val();
    sessionStorage.setItem("value_out", value_out);
    $('#out_data').attr('value_out_fz', value_out)
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    dateType = dateTypeOut;
    makeSvgUnderline(locHref, value_out, tradeCatalog, onlineType_out, dateType);
});
//线下移机装机
$(document).on("change", "#liabilityState1_out", function () {
    var tradeCatalog = $('#liabilityState1_out option:selected').val();
    sessionStorage.setItem("tradeCatalog_out_value", tradeCatalog);
    //var valueout_developerArea = sessionStorage.getItem("value_out");
    if (onlineType_out == 1) {
        if ($('#out_data').attr('value_out_sd')) {
            var valueout_developerArea = $('#out_data').attr('value_out_sd')
        } else {
            var valueout_developerArea = 'all'
        }
    } else if (onlineType_out == 2) {
        if ($('#out_data').attr('value_out_fz')) {
            var valueout_developerArea = $('#out_data').attr('value_out_fz')
        } else {
            var valueout_developerArea = 'all'
        }
    }
    dateType = dateTypeOut;
    makeSvgUnderline(locHref, valueout_developerArea, tradeCatalog, onlineType_out, dateType);
});
//线下属地发展选择
$("#select3").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    $("#liabilityStates1").removeClass("show").addClass("hide");
    $("#liabilityState11").removeClass("hide").addClass("show");
    onlineType_out = '1';
    sessionStorage.setItem("onlineType_out", onlineType_out);
    var valueout_developerArea = sessionStorage.getItem("value_out");
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    if ($('#out_data').attr('value_out_sd')) {
        var value_out_sd = $('#out_data').attr('value_out_sd')
    } else {
        var value_out_sd = 'all'
    }
    //var value_out_sd = $('#out_data').attr('value_out_sd')
    dateType = dateTypeOut;
    //初始化销售线展示
    queryValues = queryPermissionIndex(onlineType_out);
    value_out_sd = intSaleLineIndex(queryValues, onlineType_out,
        value_out_sd, "liabilityState11", "out_data", "value_out_sd");
    makeSvgUnderline(locHref, value_out_sd, tradeCatalog, onlineType_out, dateType);
});
$("#select4").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    $("#liabilityState11").removeClass("show").addClass("hide");
    $("#liabilityStates1").removeClass("hide").addClass("show");
    onlineType_out = '2';
    sessionStorage.setItem("onlineType_out", onlineType_out);
    var valueout_developerArea = sessionStorage.getItem("value_out");
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    if ($('#out_data').attr('value_out_fz')) {
        var value_out_fz = $('#out_data').attr('value_out_fz')
    } else {
        var value_out_fz = 'all'
    }
    //var value_out_fz = $('#out_data').attr('value_out_fz')
    dateType = dateTypeOut;
    //初始化销售线展示
    queryValues = queryPermissionIndex(onlineType_out);
    value_out_fz = intSaleLineIndex(queryValues, onlineType_out,
        value_out_fz, "liabilityStates1", "out_data", "value_out_fz");
    makeSvgUnderline(locHref, value_out_fz, tradeCatalog, onlineType_out, dateType);
});
//线上当日、当月、累计选择
$("#selectDateOn").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    dateTypeOn = $(this).attr('data-id');
    var valuein_developerArea = getOnlineData();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    makeSvgOnline(locHref, valuein_developerArea, tradeCatalog, onlineType_on, dateTypeOn);
})
$("#selectMouthOn").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    dateTypeOn = $(this).attr('data-id');
    var valuein_developerArea = getOnlineData();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    makeSvgOnline(locHref, valuein_developerArea, tradeCatalog, onlineType_on, dateTypeOn);
})
$("#selectTotalOn").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    dateTypeOn = $(this).attr('data-id');
    var valuein_developerArea = getOnlineData();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    makeSvgOnline(locHref, valuein_developerArea, tradeCatalog, onlineType_on, dateTypeOn);
})
//线下当日、当月、累计选择
$("#selectDateOut").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    dateTypeOut = $(this).attr('data-id');
    var valueout_developerArea = getOutlineData();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    makeSvgUnderline(locHref, valueout_developerArea, tradeCatalog, onlineType_out, dateTypeOut);
})
$("#selectMouthOut").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    dateTypeOut = $(this).attr('data-id');
    var valueout_developerArea = getOutlineData();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    makeSvgUnderline(locHref, valueout_developerArea, tradeCatalog, onlineType_out, dateTypeOut);
})
$("#selectTotalOut").click(function () {
    $(this).addClass("spcheck").siblings().removeClass("spcheck");
    dateTypeOut = $(this).attr('data-id');
    var valueout_developerArea = getOutlineData();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    makeSvgUnderline(locHref, valueout_developerArea, tradeCatalog, onlineType_out, dateTypeOut);
})
// iptv
$(document).on("change", "#liabilityState1_iptv", function () {
    classType = $('#liabilityState1_iptv option:selected').val();
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");
    var valueout_developerArea = getOutlineData();
    dateType = dateTypeOut;
    makeSvgUnderline(locHref, valueout_developerArea, tradeCatalog, onlineType_out, dateTypeOut);
});

//获取线上发展属地下拉框的值
function getOnlineData() {
    if (onlineType_on == 1) {
        if ($('#on_data').attr('value_in_sd')) {
            var valuein_developerArea = $('#on_data').attr('value_in_sd')
        } else {
            var valuein_developerArea = 'all'
        }
    } else if (onlineType_on == 2) {
        if ($('#on_data').attr('value_in_fz')) {
            var valuein_developerArea = $('#on_data').attr('value_in_fz')
        } else {
            var valuein_developerArea = 'all'
        }
    }
    return valuein_developerArea;
}

//获取线下发展属地下拉框的值
function getOutlineData() {
    if (onlineType_out == 1) {
        if ($('#out_data').attr('value_out_sd')) {
            var valueout_developerArea = $('#out_data').attr('value_out_sd')
        } else {
            var valueout_developerArea = 'all'
        }
    } else if (onlineType_out == 2) {
        if ($('#out_data').attr('value_out_fz')) {
            var valueout_developerArea = $('#out_data').attr('value_out_fz')
        } else {
            var valueout_developerArea = 'all'
        }
    }
    return valueout_developerArea;
}


function onLineOnload() {
    console.log("互联网加载的时间是" + CurentTime());
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_on_value");
    var id;//对应销售线id
    var dataValueName;//对应存储属性
    if (onlineType_on == 1) {
        id = "liabilityState";
        dataValueName = "value_in_sd";
        if ($('#on_data').attr('value_in_sd')) {
            var valuein_developerArea = $('#on_data').attr('value_in_sd')
        } else {
            var valuein_developerArea = 'all'
        }
    } else if (onlineType_on == 2) {
        id = "liabilityStates";
        dataValueName = "value_in_fz";
        if ($('#on_data').attr('value_in_fz')) {
            var valuein_developerArea = $('#on_data').attr('value_in_fz')
        } else {
            var valuein_developerArea = 'all'
        }
    }
    //初始化销售线展示
    valuein_developerArea = intSaleLineIndex(queryValues, onlineType_on, valuein_developerArea, id, "on_data", dataValueName);

    console.log("获取的valuein_developerArea的值是" + valuein_developerArea);
    title("online");
    makeSvgOnline(locHref, valuein_developerArea, tradeCatalog, onlineType_on, dateTypeOn);
}

function sceneMonitor() {
    console.log("场景化流程监控加载的时间是" + CurentTime());
    scene(workCatalogscene, prodCatalogscene, tradeSourcescene, developerAreascene, dateTypescene, onlineTypescene, userParam, sceneMonitorCount, areaNamesscene, dateTypesscene);
}

function offLineOnload() {
    console.log("传统加载的时间是" + CurentTime());
    //var valueout_developerArea = sessionStorage.getItem("value_out");
    var id;//对应销售线id
    var dataValueName;//对应存储属性
    if (onlineType_out == 1) {
        id = "liabilityState11";
        dataValueName = "value_out_sd";
        if ($('#out_data').attr('value_out_sd')) {
            var valueout_developerArea = $('#out_data').attr('value_out_sd')
        } else {
            var valueout_developerArea = 'all'
        }
    } else if (onlineType_out == 2) {
        id = "liabilityStates1";
        dataValueName = "value_out_fz";
        if ($('#out_data').attr('value_out_fz')) {
            var valueout_developerArea = $('#out_data').attr('value_out_fz')
        } else {
            var valueout_developerArea = 'all'
        }
    }
    var tradeCatalog = sessionStorage.getItem("tradeCatalog_out_value");

    //初始化销售线展示
    valueout_developerArea = intSaleLineIndex(queryValues, onlineType_out, valueout_developerArea, id, "out_data", dataValueName);
    title("underline");
    makeSvgUnderline(locHref, valueout_developerArea, tradeCatalog, onlineType_out, dateTypeOut);
}

function flowChartOnload() {
    if ($('.in').hasClass('Lcheck')) {
        onLineOnload();
    } else if ($('.out').hasClass('Lcheck')) {
        offLineOnload();
    }
}

/*function flowChartInterval() {
    console.log("执行定时任务！");
    setInterval(function() {
        flowChartOnload();
    }, 2 * 60 * 1000);
}*/

//判断浏览器版本
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1;//不是ie浏览器
    }
}

var iev = IEVersion(); //浏览器版本
var lv_ie;
if (iev >= 9) {
    lv_ie = 16;
} else {
    lv_ie = 10;
}


function makeSvgOnline(userParam1, developerArea1, value_colony, onlineType, dateType) {


    var flowChart = $("#flowChart");
    var chooseDiv = $("#chooseDiv");

    var userParam = "";
    var developerArea = "";
    var data = {
        userParam: userParam1,
        developerArea: developerArea1,
        tradeCatalog: value_colony,
        onlineType: onlineType,
        timestamp: Date.parse(new Date()),
        dateType: dateType
    };
    console.log(data);
    $.ajax({
        type: "post",// 测试 GET 生产POST
        /*url: "test.json",*/
        url: getOutUrl(getRootPath_web(), "/monitor/queryOnlineFlow?userParam=" + userParam1 + "&developerArea=" + developerArea1 + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType),
        async: true,
        dataType: 'json',
        data: data,
        success: function (res) {
            var picS = res.rows;

            for (var i = 0; i < statics_in.length; i++) {
                statics_in[i].aCount = 0;
                statics_in[i].bCount = 0;
            }

            for (var i = 0; i < statics_in.length; i++) {
                var num = 0;

                for (var j = 0; j < picS.length; j++) {
                    if (statics_in[i].workFlag == picS[j].workFlag) {
                        num++;
                        statics_in[i].aCount = picS[j].aCount;
                        statics_in[i].bCount = picS[j].bCount;
                    }
                }
            }
            console.log(statics_in);

            var aCount = statics_in[0].aCount;
            var aCount1 = statics_in[1].aCount;
            var aCount2 = statics_in[2].aCount;
            var aCount3 = statics_in[3].aCount;
            var aCount4 = statics_in[4].aCount;
            var aCount5 = statics_in[5].aCount;
            var aCount6 = statics_in[6].aCount;
            var aCount7 = statics_in[7].aCount;
            var aCount8 = statics_in[8].aCount;
            var aCount9 = statics_in[9].aCount;
            var aCount10 = statics_in[10].aCount;
            var aCount11 = statics_in[11].aCount;

            var bCount = statics_in[0].bCount;
            var bCount1 = statics_in[1].bCount;
            var bCount2 = statics_in[2].bCount;
            var bCount3 = statics_in[3].bCount;
            var bCount4 = statics_in[4].bCount;
            var bCount5 = statics_in[5].bCount;
            var bCount6 = statics_in[6].bCount;
            var bCount7 = statics_in[7].bCount;
            var bCount8 = statics_in[8].bCount;
            var bCount9 = statics_in[9].bCount;
            var bCount10 = statics_in[10].bCount;
            var bCount11 = statics_in[11].bCount;

            var imag59 = '../images/wys1/Group1.png';
            var imag60 = '../images/wys1/Group4.png';
            var imag61 = '../images/wys1/Group6.png';
            var imag62 = '../images/wys1/Group8.png';

            var imag25 = '../images/wys1/Group 25.png';
            var imag26 = '../images/wys1/Group 26.png';
            var imag58 = '../images/wys1/Group 58.png';
            var imag33 = '../images/wys1/Group 33.png';
            var imag34 = '../images/wys1/Group 34.png';
            var imag35 = '../images/wys1/Group 35.png';
            var imag36 = '../images/wys1/Group 36.png';

            var imag32 = '../images/wys1/Group 32.png';
            var imag27 = '../images/wys1/Group 27.png';
            var imag28 = '../images/wys1/Group 28.png';
            var imag38 = '../images/wys1/Group 38.png';
            var imag31 = '../images/wys1/Group 31.png';
            var imag24 = '../images/wys1/Group 24.png';

            var imag29 = '../images/wys1/Group 29.png';
            var imag30 = '../images/wys1/Group 30.png';
            var imag37 = '../images/wys1/Group 37.png';

            var gif1 = '../images/wys/1.gif';
            var gif2 = '../images/wys1/2.gif';
            var gif3 = '../images/wys1/3.gif';
            var gif4 = '../images/wys1/4.gif';
            var gif5 = '../images/wys1/5.gif';
            var gif6 = '../images/wys1/6.gif';
            var gif7 = '../images/wys1/7.gif';
            var gif8 = '../images/wys1/8.gif';
            var gif9 = '../images/wys1/9.gif';
            var gif10 = '../images/wys1/10.gif';
            var gif11 = '../images/wys1/11.gif';
            var gif12 = '../images/wys1/12.gif';


            var changeImg = bCount > 0 ? gif2 : imag26;
            var changeImg1 = bCount1 > 0 ? gif7 : imag58;
            var changeImg2 = bCount2 > 0 ? gif10 : imag33;
            var changeImg3 = bCount3 > 0 ? gif9 : imag35;
            var changeImg4 = bCount10 > 0 ? gif11 : imag32;
            var changeImg5 = bCount4 > 0 ? gif3 : imag27;
            var changeImg6 = bCount5 > 0 ? gif4 : imag28;
            var changeImg7 = bCount6 > 0 ? gif8 : imag38;
            var changeImg8 = bCount7 > 0 ? gif6 : imag31;
            var changeImg9 = bCount8 > 0 ? gif5 : imag29;
            var changeImg10 = bCount11 > 0 ? gif12 : imag24;
            var str = '';
            str = '<svg height="100%" width="100%" viewBox="0,-20,1100,450">' +
                '<defs>' +
                '<marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 L0,0 Z" fill="#0bb737" />' +
                '</marker>' +
                '<marker id="arrow1" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 L0,0 Z" fill="#dd7c5a" />' +
                '</marker>' +
                '</defs>' +

                '<image class="wys" xlink:href="' + imag59 + '" x="0" y="18" height="62" width="70" />' +
                '<image class="wys" xlink:href="' + imag60 + '" x="0" y="65" height="62" width="70" />' +
                '<image class="wys" xlink:href="' + imag61 + '" x="0" y="112" height="62" width="70" />' +
                '<image class="wys" xlink:href="' + imag62 + '" x="0" y="159" height="62" width="70" />' +

                '<line x1="70" y1="50" x2="112" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image class="img25" xlink:href="' + imag25 + '" x="124" y="18" height="62" width="70" />' +

                '<line x1="194" y1="50" x2="232" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg + '" x="245" y="18" height="62" width="70" data-id="' + statics_in[0].workFlag + '"/>' +
                '<text id="A8" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;";" x="246" y="18"  data-type="0" data-id="' + statics_in[0].workFlag + '">' + aCount + '</text>' +
                '<text id="B8" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="314" y="18"  data-type="1" data-id="' + statics_in[0].workFlag + '">' + bCount + '</text>' +

                '<line x1="315" y1="50" x2="448" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg1 + '" x="460" y="18" height="62" width="70" data-id="' + statics_in[1].workFlag + '"/>' +
                '<text id="A9" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="462" y="18" data-type="0" data-id="' + statics_in[1].workFlag + '">' + aCount1 + '</text>' +
                '<text id="B9" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="530" y="18" data-type="1" data-id="' + statics_in[1].workFlag + '">' + bCount1 + '</text>' +


                '<line x1="530" y1="50" x2="584" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg2 + '" x="596" y="18" height="62" width="70" data-id="' + statics_in[2].workFlag + '"/>' +
                '<text id="A10" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="598" y="18" data-type="0" data-id="' + statics_in[2].workFlag + '">' + aCount2 + '</text>' +
                '<text id="B10" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="666" y="18" data-type="1" data-id="' + statics_in[2].workFlag + '">' + bCount2 + '</text>' +

                '<line x1="666" y1="50" x2="714" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image class="img34" xlink:href="' + imag34 + '" x="726" y="18" height="62" width="70" />' +

                '<line x1="796" y1="50" x2="844" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg3 + '" x="856" y="18" height="62" width="70" data-id="' + statics_in[3].workFlag + '"/>' +
                '<text id="A11" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="858" y="18" data-type="0" data-id="' + statics_in[3].workFlag + '">' + aCount3 + '</text>' +
                '<text id="B11" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="924" y="18" data-type="1" data-id="' + statics_in[3].workFlag + '">' + bCount3 + '</text>' +

                '<line x1="926" y1="50" x2="974" y2="50" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow)" />' +
                '<image class="img36" xlink:href="' + imag36 + '" x="986" y="18" height="62" width="70" />' +

                '<line x1="202" y1="51" x2="202" y2="371" stroke="#dd7c5a" stroke-width="3" />' +

                '<line x1="202" y1="242" x2="221" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg5 + '" x="233" y="209" height="66" width="94"  data-id="' + statics_in[4].workFlag + '"/>' +
                '<text id="A12" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="243" y="210"  data-type="0" data-id="' + statics_in[4].workFlag + '">' + aCount4 + '</text>' +
                '<text id="B12" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="317" y="210"  data-type="1" data-id="' + statics_in[4].workFlag + '">' + bCount4 + '</text>' +

                '<line x1="280" y1="349" x2="280" y2="286" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<line x1="496" y1="264" x2="496" y2="336" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +

                '<line x1="632" y1="73" x2="632" y2="115" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg4 + '" x="596" y="120" height="62" width="70" data-id="' + statics_in[10].workFlag + '"/>' +
                '<text id="A18" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="598" y="119"  data-type="0" data-id="' + statics_in[10].workFlag + '">' + aCount10 + '</text>' +
                '<text id="B18" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="666" y="119"  data-type="1" data-id="' + statics_in[10].workFlag + '">' + bCount10 + '</text>' +

                '<line x1="496" y1="73" x2="496" y2="198" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg7 + '" x="449" y="209" height="66" width="94" data-id="' + statics_in[6].workFlag + '"/>' +
                '<text id="A14" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="462" y="211"  data-type="0" data-id="' + statics_in[6].workFlag + '">' + aCount6 + '</text>' +
                '<text id="B14" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="530" y="211"  data-type="1" data-id="' + statics_in[6].workFlag + '">' + bCount6 + '</text>' +
                '<line x1="280" y1="84" x2="280" y2="197" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<line x1="280" y1="206" x2="280" y2="84" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +

                '<line x1="449" y1="242" x2="440" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg6 + '" x="358" y="212" height="62" width="70" data-id="' + statics_in[5].workFlag + '"/>' +
                '<text id="A13" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="360" y="211"  data-type="0" data-id="' + statics_in[5].workFlag + '">' + aCount5 + '</text>' +
                '<text id="B13" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="428" y="211"  data-type="0" data-id="' + statics_in[5].workFlag + '">' + bCount5 + '</text>' +

                '<line x1="542" y1="242" x2="584" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg8 + '" x="596" y="212" height="62" width="70" data-id="' + statics_in[7].workFlag + '"/>' +
                '<text id="A15" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="598" y="211"  data-type="0" data-id="' + statics_in[7].workFlag + '">' + aCount7 + '</text>' +
                '<text id="B15" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="666" y="211"  data-type="1" data-id="' + statics_in[7].workFlag + '">' + bCount7 + '</text>' +

                '<line x1="666" y1="242" x2="714" y2="242" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg10 + '" x="726" y="212" height="62" width="70" data-id="' + statics_in[11].workFlag + '"/>' +
                '<text id="A24" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="726" y="211"  data-type="0" data-id="' + statics_in[11].workFlag + '">' + aCount11 + '</text>' +
                '<text id="B24" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="796" y="211"  data-type="1" data-id="' + statics_in[11].workFlag + '">' + bCount11 + '</text>' +

                '<line x1="202" y1="370" x2="232" y2="370" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + changeImg9 + '" x="244" y="340" height="62" width="70"  data-id="' + statics_in[8].workFlag + '"/>' +
                '<text id="A16" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="246" y="339"  data-type="0" data-id="' + statics_in[8].workFlag + '">' + aCount8 + '</text>' +
                '<text id="B16" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="314" y="339"  data-type="1" data-id="' + statics_in[8].workFlag + '">' + bCount8 + '</text>' +

                '<line x1="314" y1="370" x2="448" y2="370" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image style ="cursor: pointer;" class="imgs" xlink:href="' + imag30 + '" x="460" y="340" height="62" width="70"  data-id="' + statics_in[9].workFlag + '"/>' +
                '<text id="A17" class="aCount" style="font-size:14px;fill:#34548f;cursor: pointer;" x="462" y="339"  data-type="0" data-id="' + statics_in[9].workFlag + '">' + aCount9 + '</text>' +
                '<text id="B17" class="bCount" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="530" y="339"  data-type="1" data-id="' + statics_in[9].workFlag + '">' + bCount9 + '</text>' +

                '<line x1="530" y1="370" x2="974" y2="370" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow1)" />' +
                '<image class="img37" xlink:href="' + imag37 + '" x="986" y="340" height="62" width="70" />' +
                '<rect class="" style="fill:rgb(52,84,143);" rx="6" ry="6" x="0" y="360" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="370">工单总量</text>' +
                '<rect class="" style="fill:rgb(207,65,32);" rx="6" ry="6" x="0" y="385" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="395">超时工单量</text>' +


                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="464" y="131">无法</text>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="500" y="131">安装</text>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="600" y="100">复杂</text>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#dd7c5a;" x="636" y="100">业务</text>' +


                //A8 B8
                '<rect id="rA8" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="260" y="35" height="42" width="180"/>' +
                '<text id="tA8" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="280" y="62">待抢单及待领单的订单</text>' +
                '<rect id="rB8" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="280" y="35" height="42" width="205"/>' +
                '<text id="tB8" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="300" y="62">待领单的超时订单(15分钟)</text>' +
                //A9 B9
                '<rect id="rA9" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="475" y="35" height="42" width="150"/>' +
                '<text id="tA9" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="495" y="62">未二次预约的订单</text>' +
                '<rect id="rB9" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="495" y="35" height="42" width="220"/>' +
                '<text id="tB9" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="515" y="62">未二次预约的超时订单(4小时)</text>' +
                //A10 B10
                '<rect id="rA10" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="610" y="35" height="42" width="150"/>' +
                '<text id="tA10" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="630" y="62">未上门行销的订单</text>' +
                '<rect id="rB10" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="35" height="42" width="265"/>' +
                '<text id="tB10" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="62">未上门行销的超时订单(1小时30分钟)</text>' +
                //A11 B11
                '<rect id="rA11" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="870" y="35" height="42" width="165"/>' +
                '<text id="tA11" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="890" y="62">已行销未竣工的订单</text>' +
                '<rect id="rB11" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="890" y="35" height="42" width="235"/>' +
                '<text id="tB11" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="910" y="62">已行销未竣工的超时订单(8小时)</text>' +
                //A12 B12
                '<rect id="rA12" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="250" y="230" height="42" width="270"/>' +
                '<text id="tA12" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="270" y="256">待分公司工单调度组强派/转派的订单</text>' +
                '<rect id="rB12" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="280" y="230" height="42" width="360"/>' +
                '<text id="tB12" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="300" y="256">待分公司工单调度组强派/转派的超时订单（30分钟）</text>' +
                //A13 B13
                '<rect id="rA13" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="370" y="230" height="42" width="180"/>' +
                '<text id="tA13" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="390" y="256">需简单补点施工的订单</text>' +
                '<rect id="rB13" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="390" y="230" height="42" width="235"/>' +
                '<text id="tB13" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="410" y="256">需简单补点施工的超时订单(7天)</text>' +
                //A14 B14
                '<rect id="rA14" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="465" y="230" height="42" width="250"/>' +
                '<text id="tA14" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="485" y="256">分公司工单调度组退单审核的订单</text>' +
                '<rect id="rB14" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="485" y="230" height="42" width="290"/>' +
                '<text id="tB14" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="505" y="256">分公司工单调度组退单审核的订单（1天）</text>' +
                //A15 B15
                '<rect id="rA15" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="610" y="230" height="42" width="180"/>' +
                '<text id="tA15" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="630" y="256">需进行资源建设的工单</text>' +
                '<rect id="rB15" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="230" height="42" width="248"/>' +
                '<text id="tB15" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="256">需进行资源建设的超时工单(18天)</text>' +
                //A16 B16
                '<rect id="rA16" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="257" y="358" height="42" width="210"/>' +
                '<text id="tA16" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="277" y="384">待一级中台强派/转派的订单</text>' +
                '<rect id="rB16" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="270" y="358" height="42" width="285"/>' +
                '<text id="tB16" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="290" y="384">待一级中台强派/转派的超时订单(1小时)</text>' +
                //A17 B17
                '<rect id="rA17" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="475" y="358" height="42" width="138"/>' +
                '<text id="tA17" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="495" y="384">今日取消的订单</text>' +
                //A18 B18
                '<rect id="rA18" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="610" y="137" height="42" width="220"/>' +
                '<text id="tA18" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="630" y="163">行销失败，转中台受理的订单</text>' +
                '<rect id="rB18" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="137" height="42" width="280"/>' +
                '<text id="tB18" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="163">行销失败，转中台受理的超时订单(1天)</text>' +
                //A24 B24
                '<rect id="rA24" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="740" y="230" height="42" width="220"/>' +
                '<text id="tA24" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="760" y="256">需进行专项拓展的资源建设单</text>' +
                '</svg>';

            flowChart.html(str);
            imageIframe();
            textIframe_in();
            textIframe_in1();

            //重新赋值下拉框
            //console.log(developerArea1)
            //var options = $("#liabilityState").find("option:selected").val();
            //var options = $('#liabilityState option:selected').val()
            //console.log(options)

            //var options=$("#liabilityState option:selected").text();
            //console.log(options)
        },
        error: function () {

        }
    });

}

var iev = IEVersion(); //浏览器版本
var lv_ie;
if (iev >= 9) {
    lv_ie = 16;
} else {
    lv_ie = 10;
}

function makeSvgUnderline(userParam1, developerArea1, value_colony, onlineType, dateType) {
    var flowChart1 = $("#flowChart1");
    var chooseDiv1 = $("#chooseDiv1");
    var data = {
        userParam: userParam1,
        developerArea: developerArea1,
        tradeCatalog: value_colony,
        onlineType: onlineType,
        timestamp: Date.parse(new Date()),
        dateType: dateType,
        classType: classType   // iptv
    };
    console.log(data);
    $.ajax({
        type: "post",// 测试 GET 生产POST
        /*url: "test.json",*/
        url: getOutUrl(getRootPath_web(), "/monitor/queryOutlineFlow?userParam=" + userParam1 + "&developerArea=" + developerArea1 + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&classType=" + classType),
        async: true,
        dataType: 'json',
        data: data,
        success: function (res) {

            var picS = res.rows;

            for (var i = 0; i < statics_out.length; i++) {
                statics_out[i].aCount = 0;
                statics_out[i].bCount = 0;
            }

            for (var i = 0; i < statics_out.length; i++) {
                var num = 0;
                for (var j = 0; j < picS.length; j++) {
                    if (statics_out[i].workFlag == picS[j].workFlag) {
                        num++;
                        statics_out[i].aCount = picS[j].aCount;
                        statics_out[i].bCount = picS[j].bCount;
                    }
                }
            }

            var image30 = '../images/yyt1/Group1.png';
            var image31 = '../images/yyt1/Group3.png';
            var image32 = '../images/yyt1/Group5.png';
            var image33 = '../images/yyt1/Group7.png';

            var image1 = '../images/yyt1/Group.png';
            var image2 = '../images/yyt1/Group22.png';
            var image3 = '../images/yyt1/Group33.png';
            var image4 = '../images/yyt1/Group44.png';
            var image5 = '../images/yyt1/Group55.png';
            var image29 = '../images/yyt1/Group29.png';
            var image11 = '../images/yyt1/Group11.png'
            var image12 = '../images/yyt1/Group12.png'

            var image9 = '../images/yyt1/Group 9.png';
            var image7 = '../images/yyt1/Group77.png';
            var image6 = '../images/yyt1/Group66.png';
            var image23 = '../images/yyt1/Group23.png';

            var image8 = '../images/yyt1/Group88.png';
            var image10 = '../images/yyt1/Group 10.png';
            var image0 = '../images/yyt1/Group0.png';

            var gif1 = '../images/yyt1/1.gif';
            var gif2 = '../images/yyt1/2.gif';
            var gif3 = '../images/yyt1/3.gif';
            var gif4 = '../images/yyt1/4.gif';
            var gif5 = '../images/yyt1/5.gif';
            var gif6 = '../images/yyt1/6.gif';
            var gif7 = '../images/yyt1/7.gif';
            var gif8 = '../images/yyt1/8.gif';
            var gif9 = '../images/yyt1/9.gif';
            var gif10 = '../images/yyt1/10.gif';
            var gif20 = '../images/yyt1/20.gif';
            var gif21 = '../images/yyt1/21.gif';
            var gif22 = '../images/yyt1/22.gif';

            var aCount = statics_out[0].aCount;
            var aCount1 = statics_out[1].aCount;
            var aCount2 = statics_out[2].aCount;
            var aCount3 = statics_out[3].aCount;
            var aCount4 = statics_out[4].aCount;
            var aCount5 = statics_out[5].aCount;
            var aCount6 = statics_out[6].aCount;
            var aCount7 = statics_out[7].aCount;
            var aCount8 = statics_out[8].aCount;
            var aCount9 = statics_out[9].aCount;
            var aCount10 = statics_out[10].aCount;
            var aCount11 = statics_out[11].aCount;

            var bCount = statics_out[0].bCount;
            var bCount1 = statics_out[1].bCount;
            var bCount2 = statics_out[2].bCount;
            var bCount3 = statics_out[3].bCount;
            var bCount4 = statics_out[4].bCount;
            var bCount5 = statics_out[5].bCount;
            var bCount6 = statics_out[6].bCount;
            var bCount7 = statics_out[7].bCount;
            var bCount8 = statics_out[8].bCount;
            var bCount9 = statics_out[9].bCount;
            var bCount10 = statics_out[10].bCount;
            var bCount11 = statics_out[11].bCount;

            var changeImg = bCount > 0 ? gif3 : image2;
            var changeImg1 = bCount1 > 0 ? gif2 : image3;
            var changeImg2 = bCount2 > 0 ? gif7 : image4;
            var changeImg3 = bCount4 > 0 ? gif6 : image9;
            var changeImg4 = bCount5 > 0 ? gif4 : image7;
            var changeImg5 = bCount6 > 0 ? gif1 : image6;
            var changeImg6 = bCount7 > 0 ? gif5 : image8;
            var changeImg7 = bCount3 > 0 ? gif8 : image5;
            var changeImg8 = bCount8 > 0 ? gif9 : image0;
            var changeImg9 = bCount9 > 0 ? gif10 : image23;
            var changeImg20 = bCount8 > 0 ? gif20 : image11;
            var changeImg21 = bCount10 > 0 ? gif21 : image12;
            var changeImg22 = bCount11 > 0 ? gif22 : image0;

            var str = '';
            str = '<svg height="100%" width="100%" viewBox="0,-20,1100,450">' +
                '<defs>' +
                '<marker id="arrow2" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 z" fill="#0bb737" />' +
                '</marker>' +
                '<marker id="arrow3" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" viewBox="0 -2 ' + lv_ie + ' 10" markerUnits="strokeWidth">' +
                '<path d="M0,0 L0,4 L4,2 z" fill="#dd7c5a" />' +
                '</marker>' +
                '</defs>' +

                '<image class="yyt" xlink:href="' + image30 + '" x="0" y="16" height="62" width="82" />' +
                '<image class="yyt" xlink:href="' + image32 + '" x="0" y="75" height="62" width="82" />' +
                '<image class="yyt" xlink:href="' + image31 + '" x="0" y="132" height="62" width="82" />' +
                '<image class="yyt" xlink:href="' + image33 + '" x="0" y="189" height="62" width="82" />' +

                '<line x1="82" y1="46" x2="115" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="img1" xlink:href="' + image1 + '" x="127" y="16" height="62" width="82" />' +

                '<line x1="209" y1="46" x2="242" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg + '" x="254" y="16" height="62" width="82"   data-id="' + statics_out[0].workFlag + '"/>' +
                '<text id="A1" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="256" y="12"  data-type="0" data-id="' + statics_out[0].workFlag + '">' + aCount + '</text>' +
                '<text id="B1" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="336" y="12"  data-type="1" data-id="' + statics_out[0].workFlag + '">' + bCount + '</text>' +

                '<line x1="336" y1="46" x2="369" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg1 + '" x="381" y="16" height="62" width="82" data-id="' + statics_out[1].workFlag + '"/>' +
                '<text id="A19" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="383" y="12"  data-type="0" data-id="' + statics_out[1].workFlag + '">' + aCount1 + '</text>' +
                '<text id="B19" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="463" y="12"  data-type="1" data-id="' + statics_out[1].workFlag + '">' + bCount1 + '</text>' +

                '<line x1="463" y1="46" x2="496" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg2 + '" x="508" y="16" height="62" width="82"  data-id="' + statics_out[2].workFlag + '"/>' +
                '<text id="A2" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="510" y="12"  data-type="0" data-id="' + statics_out[2].workFlag + '">' + aCount2 + '</text>' +
                '<text id="B2" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="590" y="12"  data-type="1" data-id="' + statics_out[2].workFlag + '">' + bCount2 + '</text>' +

                '<line x1="717" y1="46" x2="750" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="imgS" style ="cursor: pointer;"  xlink:href="' + changeImg20 + '" x="762" y="16" height="62" width="82"  data-id="' + statics_out[8].workFlag + '"/>' +
                '<text id="A20" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="764" y="12"  data-type="0" data-id="' + statics_out[8].workFlag + '">' + aCount8 + '</text>' +
                '<text id="B20" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="844" y="12"  data-type="1" data-id="' + statics_out[8].workFlag + '">' + bCount8 + '</text>' +

                '<line x1="844" y1="46" x2="877" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="imgS" style ="cursor: pointer;"  xlink:href="' + changeImg21 + '" x="889" y="16" height="62" width="82"  data-id="' + statics_out[10].workFlag + '"/>' +
                '<text id="A21" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="891" y="12"  data-type="0" data-id="' + statics_out[10].workFlag + '">' + aCount10 + '</text>' +
                '<text id="B21" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="971" y="12"  data-type="1" data-id="' + statics_out[10].workFlag + '">' + bCount10 + '</text>' +

                '<line x1="971" y1="46" x2="1004" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image class="img29" xlink:href="' + image29 + '" x="1016" y="16" height="62" width="82" />' +

                '<line x1="590" y1="46" x2="623" y2="46" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg7 + '" x="635" y="16" height="62" width="82"  data-id="' + statics_out[3].workFlag + '"/>' +
                '<text id="A3" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="637" y="12"  data-type="0" data-id="' + statics_out[3].workFlag + '">' + aCount3 + '</text>' +
                '<text id="B3" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="717" y="12"  data-type="1" data-id="' + statics_out[3].workFlag + '">' + bCount3 + '</text>' +

                '<line x1="296" y1="195" x2="296" y2="87" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg3 + '" x="254" y="192" height="62" width="82"   data-id="' + statics_out[4].workFlag + '"/>' +
                '<text id="A4" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="256" y="188"  data-type="0" data-id="' + statics_out[4].workFlag + '">' + aCount4 + '</text>' +
                '<text id="B4" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="336" y="188"  data-type="1" data-id="' + statics_out[4].workFlag + '">' + bCount4 + '</text>' +

                '<line x1="550" y1="75" x2="550" y2="168" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg4 + '" x="496" y="180" height="78" width="108" data-id="' + statics_out[5].workFlag + '"/>' +
                '<text id="A5" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="508" y="188"  data-type="0" data-id="' + statics_out[5].workFlag + '">' + aCount5 + '</text>' +
                '<text id="B5" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="588" y="188"  data-type="1" data-id="' + statics_out[5].workFlag + '">' + bCount5 + '</text>' +

                '<line x1="494" y1="219" x2="348" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<line x1="338" y1="219" x2="484" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +

                '<line x1="604" y1="219" x2="750" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg5 + '" x="762" y="192" height="62" width="82" data-id="' + statics_out[6].workFlag + '"/>' +
                '<text id="A6" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="764" y="188"  data-type="0" data-id="' + statics_out[6].workFlag + '">' + aCount6 + '</text>' +
                '<text id="B6" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="844" y="188"  data-type="1" data-id="' + statics_out[6].workFlag + '">' + bCount6 + '</text>' +

                '<line x1="844" y1="219" x2="877" y2="219" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg9 + '" x="889" y="192" height="62" width="82" data-id="' + statics_out[9].workFlag + '"/>' +
                '<text id="A23" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="890" y="188"  data-type="0" data-id="' + statics_out[9].workFlag + '">' + aCount9 + '</text>' +
                '<text id="B23" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="970" y="188"  data-type="1" data-id="' + statics_out[9].workFlag + '">' + bCount9 + '</text>' +

                '<line x1="550" y1="256" x2="550" y2="351" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg6 + '" x="508" y="360" height="62" width="82"  data-id="' + statics_out[7].workFlag + '"/>' +
                '<text id="A7" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="510" y="356"  data-type="0" data-id="' + statics_out[7].workFlag + '">' + aCount7 + '</text>' +
                //                '<text id="B7" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="680" y="356"  data-type="1" data-id="'+statics_out[7].workFlag+'">'+ bCount7 +'</text>' +

                '<line x1="590" y1="390" x2="1004" y2="390" stroke="#dd7c5a" stroke-width="3" marker-end="url(#arrow3)" />' +
                '<image class="img10" xlink:href="' + image10 + '" x="1016" y="360" height="62" width="82" />' +

                '<rect class="" style="fill:rgb(52,84,143);" rx="6" ry="6" x="0" y="360" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="370">工单总量</text>' +
                '<rect class="" style="fill:rgb(207,65,32);" rx="6" ry="6" x="0" y="385" height="12" width="26"/>' +
                '<text class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#5a5858;" x="37" y="395">超时工单量</text>' +

                //新加订单处理
                '<line x1="82" y1="164" x2="115" y2="164" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<line x1="169" y1="136" x2="169" y2="87" stroke="#0bb737" stroke-width="3" marker-end="url(#arrow2)" />' +
                '<image style ="cursor: pointer;" class="imgS" xlink:href="' + changeImg22 + '" x="127" y="132" height="62" width="82" data-id="' + statics_out[11].workFlag + '"/>' +
                '<polyline points="82,106 96,106 96,46" style="fill:#d9dbef;stroke:#0bb737;stroke-width:3"/>' +
                '<polyline points="82,220 96,220 96,164" style="fill:#d9dbef;stroke:#0bb737;stroke-width:3"/>' +
                '<text id="A22" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="129" y="128"  data-type="0" data-id="' + statics_out[11].workFlag + '">' + aCount11 + '</text>' +
                '<text id="B22" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="209" y="128"  data-type="1" data-id="' + statics_out[11].workFlag + '">' + bCount11 + '</text>' +

                //告警ab值
                //'<text id="A6" class="aCount1" style="font-size:14px;fill:#34548f;cursor: pointer;" x="124" y="106"  data-type="0" data-id="'+statics_out[8].workFlag+'">'+ aCount8 +'</text>' +
                //'<text id="B6" class="bCount1" style="font-size:14px;fill:#cf4120;cursor: pointer;text-anchor: end" x="204" y="106"  data-type="1" data-id="'+statics_out[8].workFlag+'">'+ bCount8 +'</text>' +


                //A1 B1
                '<rect id="rA1" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="250" y="30" height="42" width="150"/>' +
                '<text id="tA1" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="270" y="56">待外线抢单的工单</text>' +
                '<rect id="rB1" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="310" y="30" height="42" width="335"/>' +
                '<text id="tB1" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="330" y="56">二级中台未强派及外线未领单的超时工单(1小时)</text>' +
                //A19 B19
                '<rect id="rA19" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="370" y="30" height="42" width="180"/>' +
                '<text id="tA19" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="390" y="56">未进行二次预约的订单</text>' +
                '<rect id="rB19" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="10" x="440" y="30" height="42" width="250"/>' +
                '<text id="tB19" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="460" y="56">未进行二次预约的超时订单(4小时)</text>' +
                //A2 B2
                '<rect id="rA2" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="500" y="30" height="42" width="175"/>' +
                '<text id="tA2" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="520" y="56">外线未施工完成的工单</text>' +
                '<rect id="rB2" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="560" y="30" height="42" width="325"/>' +
                '<text id="tB2" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="580" y="56">未按时上门或未施工完成的工单(1小时30分钟)</text>' +
                //A3 B3
                '<rect id="rA3" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="620" y="30" height="42" width="250"/>' +
                '<text id="tA3" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="640" y="56">人工环节施工完成，未竣工的工单</text>' +
                '<rect id="rB3" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="690" y="30" height="42" width="310"/>' +
                '<text id="tB3" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="710" y="56">人工环节施工完成，未竣工的超时工单(1天)</text>' +
                //A20 B20
                '<rect id="rA20" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="750" y="30" height="42" width="150"/>' +
                '<text id="tA20" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="770" y="56">号卡待交付的订单</text>' +
                '<rect id="rB20" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="820" y="30" height="42" width="225"/>' +
                '<text id="tB20" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="840" y="56">号卡待交付的超时订单（7天）</text>' +
                //A21 B21
                '<rect id="rA21" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="870" y="30" height="42" width="150"/>' +
                '<text id="tA21" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="890" y="56">号卡待激活的订单</text>' +
                '<rect id="rB21" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="940" y="30" height="42" width="235"/>' +
                '<text id="tB21" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="960" y="56">号卡待激活的超时订单（15天）</text>' +
                //A22 B22
                '<rect id="rA22" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="112" y="146" height="42" width="120"/>' +
                '<text id="tA22" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="132" y="172">待受理的订单</text>' +
                '<rect id="rB22" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="166" y="146" height="42" width="215"/>' +
                '<text id="tB22" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="186" y="172">待受理超时的订单（4小时）</text>' +
                //A4 B4
                '<rect id="rA4" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="240" y="205" height="42" width="205"/>' +
                '<text id="tA4" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="260" y="231">需进行简单补点施工的工单</text>' +
                '<rect id="rB4" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="300" y="205" height="42" width="265"/>' +
                '<text id="tB4" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="320" y="231">需进行简单补点施工的超时工单(7天)</text>' +
                //A5 B5
                '<rect id="rA5" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="500" y="205" height="42" width="235"/>' +
                '<text id="tA5" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="520" y="231">外线退单后待分公司审核的工单</text>' +
                '<rect id="rB5" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="560" y="205" height="42" width="310"/>' +
                '<text id="tB5" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="580" y="231">外线退单后待分公司审核的超时工单（1天）</text>' +
                //A6 B6
                '<rect id="rA6" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="750" y="205" height="42" width="180"/>' +
                '<text id="tA6" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="770" y="231">需进行资源建设的工单</text>' +
                '<rect id="rB6" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="820" y="205" height="42" width="248"/>' +
                '<text id="tB6" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="840" y="231">需进行资源建设的超时工单(18天)</text>' +
                //A7 B7
                '<rect id="rA7" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="500" y="373" height="42" width="180"/>' +
                '<text id="tA7" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="520" y="399">待一级中台处理的工单</text>' +
                '<rect id="rB7" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="630" y="373" height="42" width="195"/>' +
                '<text id="tB7" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="650" y="399">一级中台处理超时的工单</text>' +
                //A23
                '<rect id="rA23" class="" style="fill:rgb(105,105,105);opacity:0.7;display:none" rx="6" ry="6" x="880" y="205" height="42" width="220"/>' +
                '<text id="tA23" class="Count" style="font-size:14px;font-family:microsoft yahei;fill:#fefeff;display:none" x="900" y="231">需进行专项拓展的资源建设单</text>' +
                '</svg>';
            flowChart1.html(str);
            imageIframe1();
            textIframe_out();
            textIframe_out1();

        },
        error: function () {

        }
    });
}

//线上
function imageIframe() {
    var arr_image = document.getElementsByClassName("imgs");
    for (var i = 0; i < arr_image.length; i++) {
        arr_image[i].onclick = function () {
            console.log(this);
            var id = $(this).attr('data-id');
            //var valuein_developerArea =  sessionStorage.getItem("value_in");
            var tradeCatalogOn = sessionStorage.getItem("tradeCatalog_on_value");
            var onlineTypeOn = onlineType_on;
            if (onlineTypeOn == 1) {
                if ($('#on_data').attr('value_in_sd')) {
                    var valuein_developerArea = $('#on_data').attr('value_in_sd')
                } else {
                    var valuein_developerArea = 'all'
                }
            } else if (onlineTypeOn == 2) {
                if ($('#on_data').attr('value_in_fz')) {
                    var valuein_developerArea = $('#on_data').attr('value_in_fz')
                } else {
                    var valuein_developerArea = 'all'
                }
            }
            console.log($(this).attr('data-id'));
            $('#chart_export').attr('data-chartid', id);
            $('#chart_export').attr('data-workcatalog', workCatalog);
            $('#chart_export').attr('valuein_developerArea', valuein_developerArea);
            $('#chart_export').attr('tradeCatalogOn', tradeCatalogOn);
            $('#chart_export').attr('onlineTypeOn', onlineTypeOn);
            $('#chart_export').attr('classType', classType);
            table_chart(id, workCatalog, valuein_developerArea, tradeCatalogOn, onlineTypeOn, dateTypeOn, classType);
            console.log($('#chart_export').attr('data-workCatalog'));
            $('#myModal_chart').modal('show');
            var data = {
                workFlag: id,
                workCatalog: 0,
                developerArea: valuein_developerArea,
                tradeCatalog: tradeCatalogOn,
                onlineType: onlineTypeOn,
                timestamp: Date.parse(new Date()),
                dateType: dateTypeOn,
                classType: classType
            };
            $.ajax({
                type: 'post',
                url: getOutUrl(getRootPath_web(), "/monitor/queryFlowNum?workFlag=" + id + '&developerArea=' + valuein_developerArea + '&workCatalog=0' + '&tradeCatalog=' + tradeCatalogOn + '&onlineType=' + onlineTypeOn + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateTypeOn + "&classType=" + classType),
                dataType: 'json',
                data: data,
                success: function (data) {
                    var arr_rows = data.rows;
                    var numA = [];
                    var numB = [];
                    /*var numX=["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云", "怀\n柔","门\n头\n沟","平\n谷","延\n庆","大\n客\n户\n中\n心","电\n商\n部","客\n服\n中\n心","重\n通\n局","产\n品\n支\n撑\n中\n心", "北\n京\n国\n际\n业\n务\n中\n心","北\n京\n市\n场\n支\n撑\n中\n心","北\n京\n集\n团\n客\n户","北\n京\n电\n子\n渠\n道","北\n京\n导\n航\n中\n心","北\n京\n宽\n带\n业\n务\n中\n心","北\n京\n互\n联\n互\n通\n部","北\n京\n产\n创","其\n它"]*/
                    var numX = data.developerAreaName;
                    for (var i = 0; i < arr_rows.length - 1; i++) {
                        numA.push(arr_rows[i].aCount);
                        numB.push(arr_rows[i].bCount)
                    }
                    console.log(numA);
                    var dataTimeyear = data.time.substr(0, 4);
                    var dataTimemonth = data.time.substr(4, 2);
                    var dataTimeday = data.time.substr(6, 2);
                    var dataTimeh = data.time.substr(8, 2);
                    var dataTimeminute = data.time.substr(10, 2);
                    var time = dataTimeyear + '年' + dataTimemonth + '月' + dataTimeday + '日' + dataTimeh + '时' + dataTimeminute + '分';
                    $('#timeFlag').text("更新日期:" + time);
                    setTimeout(function () {
                        chart(numX, numA, numB)
                    }, 100)
                },
                error: function () {

                }
            });
        }
    }
}

/*function textIframe_in(){
	var arr = document.getElementsByClassName("aCount");
	$('.aCount').css('font-family','微软雅黑');
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			console.log(this);
			type = $(this).attr('data-type')
			id= $(this).attr('data-id')
			var valuein_developerArea = sessionStorage.getItem("value_in")
			console.log($(this).attr('data-type'))
			$('.table_export').attr('data-tableid',id)
			$('.table_export').attr('data-type',type)
			$('.table_export').attr('data-workcatalog',workCatalog)
			table(id,type,0,valuein_developerArea)
			$('#myModal_table').modal('show')
		}
	}
}*/

function textIframe_in() {
    var arr = document.getElementsByClassName("aCount");
    $('.aCount').css('font-family', '微软雅黑');
    for (var i = 0; i < arr.length; i++) {
        arr[i].onclick = function () {
            console.log(this);
            type = $(this).attr('data-type');
            id = $(this).attr('data-id');
            /* var valuein_developerArea = sessionStorage.getItem("value_in");
             var tradeCatalogOn= sessionStorage.getItem("tradeCatalog_on_value");
             var onlineTypeOn = sessionStorage.getItem("onlineType_on");*/
            var tradeCatalogOn = sessionStorage.getItem("tradeCatalog_on_value");
            var onlineTypeOn = onlineType_on;
            if (onlineTypeOn == 1) {
                if ($('#on_data').attr('value_in_sd')) {
                    var valuein_developerArea = $('#on_data').attr('value_in_sd')
                } else {
                    var valuein_developerArea = 'all'
                }
            } else if (onlineTypeOn == 2) {
                if ($('#on_data').attr('value_in_fz')) {
                    var valuein_developerArea = $('#on_data').attr('value_in_fz')
                } else {
                    var valuein_developerArea = 'all'
                }
            }
            console.log($(this).attr('data-type'));
            $('#table_export').attr('data-tableid', id);
            $('#table_export').attr('data-type', type);
            $('#table_export').attr('data-workcatalog', workCatalog);
            $('#table_export').attr('valuein_developerArea', valuein_developerArea);
            $('#table_export').attr('tradeCatalogOn', tradeCatalogOn);
            $('#table_export').attr('onlineTypeOn', onlineTypeOn);
            table(id, type, 0, valuein_developerArea, tradeCatalogOn, onlineTypeOn, dateTypeOn);
            $('#myModal_table_a').modal('show')
        };


        $(arr[i]).hover(function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "block");
            $("#t" + nub).css("display", "block");

        }, function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "none");
            $("#t" + nub).css("display", "none");
        });
    }
}


function textIframe_in1() {
    var arr = document.getElementsByClassName("bCount");
    $('.bCount').css('font-family', '微软雅黑');
    for (var i = 0; i < arr.length; i++) {
        arr[i].onclick = function () {
            console.log(this);
            type = $(this).attr('data-type');
            id = $(this).attr('data-id');
            /*  var valuein_developerArea = sessionStorage.getItem("value_in");
              var tradeCatalogOn= sessionStorage.getItem("tradeCatalog_on_value");
              var onlineTypeOn = sessionStorage.getItem("onlineType_on");*/
            var tradeCatalogOn = sessionStorage.getItem("tradeCatalog_on_value");
            var onlineTypeOn = onlineType_on;
            if (onlineTypeOn == 1) {
                if ($('#on_data').attr('value_in_sd')) {
                    var valuein_developerArea = $('#on_data').attr('value_in_sd')
                } else {
                    var valuein_developerArea = 'all'
                }
            } else if (onlineTypeOn == 2) {
                if ($('#on_data').attr('value_in_fz')) {
                    var valuein_developerArea = $('#on_data').attr('value_in_fz')
                } else {
                    var valuein_developerArea = 'all'
                }
            }
            console.log($(this).attr('data-type'));
            $('#table_export').attr('data-tableid', id);
            $('#table_export').attr('data-type', type);
            $('#table_export').attr('data-workcatalog', workCatalog);
            $('#table_export').attr('valuein_developerArea', valuein_developerArea);
            $('#table_export').attr('tradeCatalogOn', tradeCatalogOn);
            $('#table_export').attr('onlineTypeOn', onlineTypeOn);
            console.log($('#table_export').attr('data-workcatalog'));
            table_b(id, type, 0, valuein_developerArea, tradeCatalogOn, onlineTypeOn, dateTypeOn, classType);
            $('#myModal_table_b').modal('show')
        };
        $(arr[i]).hover(function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "block");
            $("#t" + nub).css("display", "block");

        }, function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "none");
            $("#t" + nub).css("display", "none");
        });
    }
}

//线下
function imageIframe1() {
    var arr_image = document.getElementsByClassName("imgS");
    for (var i = 0; i < arr_image.length; i++) {
        arr_image[i].onclick = function () {
            console.log(this);
            var id = $(this).attr('data-id');
            var workCatalogOut = 1;
            if (id == 20 || id == 21 || id == 22) {
                workCatalogOut = 2;
            }
            var tradeCatalogOut = sessionStorage.getItem("tradeCatalog_out_value");
            var onlineTypeOut = onlineType_out;
            if (onlineTypeOut == 1) {
                if ($('#out_data').attr('value_out_sd')) {
                    var valueout_developerArea = $('#out_data').attr('value_out_sd')
                } else {
                    var valueout_developerArea = 'all'
                }
            } else if (onlineTypeOut == 2) {
                if ($('#out_data').attr('value_out_fz')) {
                    var valueout_developerArea = $('#out_data').attr('value_out_fz')
                } else {
                    var valueout_developerArea = 'all'
                }
            }
            console.log($(this).attr('data-id'));
            $('#chart_export').attr('data-chartid', id);
            $('#chart_export').attr('data-workcatalog', workCatalogOut);
            $('#chart_export').attr('valueout_developerArea', valueout_developerArea);
            $('#chart_export').attr('tradeCatalogOut', tradeCatalogOut);
            $('#chart_export').attr('onlineTypeOut', onlineTypeOut);
            $('#chart_export').attr('classType', classType);
            console.log($('#chart_export').attr('data-workcatalog'));
            console.log(valueout_developerArea);
            table_chart(id, workCatalogOut, valueout_developerArea, tradeCatalogOut, onlineTypeOut, dateTypeOut, classType);
            $('#myModal_chart').modal('show');
            var data = {
                workFlag: id,
                workCatalog: workCatalogOut,
                developerArea: valueout_developerArea,
                tradeCatalog: tradeCatalogOut,
                onlineType: onlineTypeOut,
                timestamp: Date.parse(new Date()),
                dateType: dateTypeOut,
                classType: classType
            };
            $.ajax({
                type: 'post',
                url: getOutUrl(getRootPath_web(), "/monitor/queryFlowNum?workFlag=" + id + '&workCatalog=' + workCatalogOut + '&developerArea=' + valueout_developerArea + '&tradeCatalog=' + tradeCatalogOut + '&onlineType=' + tradeCatalogOut + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateTypeOut + "&classType=" + classType),
                dataType: 'json',
                data: data,
                success: function (data) {
                    var arr_rows = data.rows;
                    var numA = [];
                    var numB = [];
                    /*var numX=["二\n区","三\n区","四\n区","五\n区","七\n区","八\n区","通\n州","昌\n平","大\n兴","顺\n义","房\n山","密\n云", "怀\n柔","门\n头\n沟","平\n谷","延\n庆","大\n客\n户\n中\n心","电\n商\n部","客\n服\n中\n心","重\n通\n局","产\n品\n支\n撑\n中\n心", "北\n京\n国\n际\n业\n务\n中\n心","北\n京\n市\n场\n支\n撑\n中\n心","北\n京\n集\n团\n客\n户","北\n京\n电\n子\n渠\n道","北\n京\n导\n航\n中\n心","北\n京\n宽\n带\n业\n务\n中\n心","北\n京\n互\n联\n互\n通\n部","北\n京\n产\n创","其\n它"]*/
                    var numX = data.developerAreaName;
                    for (var i = 0; i < arr_rows.length - 1; i++) {
                        numA.push(arr_rows[i].aCount);
                        numB.push(arr_rows[i].bCount)
                    }
                    console.log(numA);
                    var dataTimeyear = data.time.substr(0, 4);
                    var dataTimemonth = data.time.substr(4, 2);
                    var dataTimeday = data.time.substr(6, 2);
                    var dataTimeh = data.time.substr(8, 2);
                    var dataTimeminute = data.time.substr(10, 2);
                    var time = dataTimeyear + '年' + dataTimemonth + '月' + dataTimeday + '日' + dataTimeh + '时' + dataTimeminute + '分';
                    $('#timeFlag').text("更新日期:" + time);
                    setTimeout(function () {
                        chart(numX, numA, numB)
                    }, 100)
                },
                error: function () {

                }
            });
        }
    }
}

function textIframe_out() {
    var arr = document.getElementsByClassName("aCount1");
    $('.aCount1').css('font-family', '微软雅黑');
    for (var i = 0; i < arr.length; i++) {
        arr[i].onclick = function () {
            console.log(this);
            type = $(this).attr('data-type');
            id = $(this).attr('data-id');
            /*var valueout_developerArea = sessionStorage.getItem("value_out");
            var tradeCatalogOut= sessionStorage.getItem("tradeCatalog_out_value");
            var onlineTypeOut = sessionStorage.getItem("onlineType_out");*/
            var tradeCatalogOut = sessionStorage.getItem("tradeCatalog_out_value");
            var onlineTypeOut = onlineType_out;
            if (onlineTypeOut == 1) {
                if ($('#out_data').attr('value_out_sd')) {
                    var valueout_developerArea = $('#out_data').attr('value_out_sd')
                } else {
                    var valueout_developerArea = 'all'
                }
            } else if (onlineTypeOut == 2) {
                if ($('#out_data').attr('value_out_fz')) {
                    var valueout_developerArea = $('#out_data').attr('value_out_fz')
                } else {
                    var valueout_developerArea = 'all'
                }
            }
            console.log($(this).attr('data-type'));
            $('#table_export').attr('data-tableid', id);
            $('#table_export').attr('data-type', type);
            $('#table_export').attr('data-workcatalog', workCatalog);
            $('#table_export').attr('valueout_developerArea', valueout_developerArea);
            $('#table_export').attr('tradeCatalogOut', tradeCatalogOut);
            $('#table_export').attr('onlineTypeOut', onlineTypeOut);
            $('#table_export').attr('classType', classType);
            console.log($('#table_export').attr('data-workcatalog'));
            table(id, type, 1, valueout_developerArea, tradeCatalogOut, onlineTypeOut, dateTypeOut, classType);
            $('#myModal_table_a').modal('show')
        };
        $(arr[i]).hover(function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "block");
            $("#t" + nub).css("display", "block");

        }, function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "none");
            $("#t" + nub).css("display", "none");
        });
    }
}

function textIframe_out1() {
    var arr = document.getElementsByClassName("bCount1");
    $('.bCount1').css('font-family', '微软雅黑');
    for (var i = 0; i < arr.length; i++) {
        arr[i].onclick = function () {
            console.log(this);
            type = $(this).attr('data-type');
            id = $(this).attr('data-id');
            /*  var valueout_developerArea = sessionStorage.getItem("value_out");
              var tradeCatalogOut= sessionStorage.getItem("tradeCatalog_out_value");
              var onlineTypeOut = sessionStorage.getItem("onlineType_out");*/
            var tradeCatalogOut = sessionStorage.getItem("tradeCatalog_out_value");
            var onlineTypeOut = onlineType_out;
            if (onlineTypeOut == 1) {
                if ($('#out_data').attr('value_out_sd')) {
                    var valueout_developerArea = $('#out_data').attr('value_out_sd')
                } else {
                    var valueout_developerArea = 'all'
                }
            } else if (onlineTypeOut == 2) {
                if ($('#out_data').attr('value_out_fz')) {
                    var valueout_developerArea = $('#out_data').attr('value_out_fz')
                } else {
                    var valueout_developerArea = 'all'
                }
            }
            console.log($(this).attr('data-type'));
            $('#table_export').attr('data-tableid', id);
            $('#table_export').attr('data-type', type);
            $('#table_export').attr('data-workcatalog', workCatalog);
            $('#table_export').attr('valueout_developerArea', valueout_developerArea);
            $('#table_export').attr('tradeCatalogOut', tradeCatalogOut);
            $('#table_export').attr('onlineTypeOut', onlineTypeOut);
            $('#table_export').attr('classType', classType);
            console.log($('#table_export').attr('data-workcatalog'));
            table_b(id, type, 1, valueout_developerArea, tradeCatalogOut, onlineTypeOut, dateTypeOut, classType);
            $('#myModal_table_b').modal('show')
        };
        $(arr[i]).hover(function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "block");
            $("#t" + nub).css("display", "block");

        }, function () {
            var nub = $(this).attr('id');
            $("#r" + nub).css("display", "none");
            $("#t" + nub).css("display", "none");
        });
    }
}


//标题数据展示
function title(flag) {
    var id;
    var total_ord_num1;
    var finish_num;
    var out_time_num;
    var last_day_num;
    var totalText;
    if (flag == "online") { //线上
        id = $("#datatag1");
        total_ord_num1 = $("#total_ord_num1");
        finish_num = $("#finish_num1");
        out_time_num = $("#out_time_num1");
        last_day_num = $("#last_day_num1");
        totalText = "北京公司今日累计意向单"
    } else { //线下
        id = $("#datatag2");
        total_ord_num1 = $("#total_ord_num2");
        finish_num = $("#finish_num2");
        out_time_num = $("#out_time_num2");
        last_day_num = $("#last_day_num2");
        totalText = "北京公司今日累计总订单量"
    }
    var data = {
        userParam: locHref,
        timestamp: Date.parse(new Date())
    }
    $.ajax({
        //type: 'get',
        //url : "table.json",
        type: 'post',
        url: getOutUrl(getRootPath_web(), "/monitor/queryMonitorOverview?userParam=" + locHref + "&timestamp=" + Date.parse(new Date())),
        dataType: 'json',
        data: data,
        cache: false,
        success: function (data) {
            if (data.state == '1') {
                if (flag == "online") {
                    total_ord_num1.html(data.rows[0].online_intention_count);
                    finish_num.html(data.rows[0].online_finish_count);
                    out_time_num.html(data.rows[0].online_over_count);
                    last_day_num.html(data.rows[0].onlineYesterdayTotal);
                } else {
                    total_ord_num1.html(data.rows[0].offline_in_count);
                    finish_num.html(data.rows[0].offline_Finish_count);
                    out_time_num.html(data.rows[0].offline_over_count);
                    last_day_num.html(data.rows[0].offonlineYesterdayTotal);
                }
                //显示数据加载时间
                reload23Data(id, data.time, totalText);
            }
        }
    });
}

//加载日期并显示
function reload23Data(id, time, totalText) {
    console.log("获取的时间是" + time);
    var timetextarr;
    timetextarr = time.split("");
    id.text(
        "截至" + timetextarr[0] + timetextarr[1] + timetextarr[2] + timetextarr[3] + "年" + timetextarr[4] +
        timetextarr[5] + "月"
        + timetextarr[6] + timetextarr[7] + "日" + timetextarr[8] + timetextarr[9] + ":"
        + timetextarr[10] + timetextarr[11] + "，" + totalText);
}
