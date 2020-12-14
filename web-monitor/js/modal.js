jQuery.download = function (url, method, filedir, filename) {
    jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' +  // action请求路径及推送方法
        '<input type="text" name="filedir" value="' + filedir + '"/>' + // 文件路径
        '<input type="text" name="filename" value="' + filename + '"/>' + // 文件名称
        '</form>')
        .appendTo('body').submit().remove();
};
//------------------------------------------图表--------------------------------------//

$(document).ready(function () {
    $('#close_btn_chart').click(function () {
        $('#myModal_chart').modal('hide')
    })
    $('#myModal_chart_btn').click(function () {
        var data = {}
        $('#myModal_chart').modal('show')
        $.ajax({
            type: 'get',
            url: 'modal_echart.json',
            dataType: 'json',
            data: data,
            success: function (data) {
                console.log(data)
                var numA = data.data.numA
                var numB = data.data.numB
                var numX = data.data.numX
                setTimeout(function () {
                    chart(numX, numA, numB)
                }, 100)
            },
            error: function () {

            }
        });

    })
    //$('#table_c').parent('div .fixed-table-body').addClass('height_limit');
});
console.log(window.onresize)

//获取左侧表格的数据
function table_chart(id, workCatalog, valuein_developerArea, tradeCatalog, onlineType, dateType, classType) {
    $("#table_chart").bootstrapTable('destroy')
    $('#table_chart').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/monitor/queryFlowNum?workFlag=" + id + '&workCatalog=' + workCatalog + '&developerArea=' + valuein_developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&classType=" + classType),
        //url : 'modal_echart.json',
        height: 400,
        dataType: 'json',
        method: "post",
        cache: false,
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
//        pageSize: params.limit, // 每页要显示的数据条数
//        offset: params.offset, // 每页显示数据的开始行号
//        sort: params.sort, // 要排序的字段
//        sortOrder: params.order, // 排序规则
                workFlag: id, // 额外添加的参数
                workCatalog: workCatalog,
                developerArea: valuein_developerArea,
                tradeCatalog: tradeCatalog,
                onlineType: onlineType,
                timestamp: Date.parse(new Date()),
                dateType: dateType
            }
        },
        responseHandler: function (res) {
            console.log(res)
            //console.log(res.rows)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            //属地
            //var areaName = ["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云","怀柔","门头沟","平谷","延庆","重通局","其他"]
            var areaName = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "大客户中心", "市支中心", "客服中心", "重通局", "国际业务中心", "集团客户", "电子渠道", "其他", "合计"]
            obj.rows = res.rows;
            /*for(var i = 0 ; i< obj.rows.length; i++){
                obj.rows[i].developerAreaName = areaName[i];
            }*/
            console.log(obj.rows)
            return obj;

        },
        onLoadSuccess: function () {
            $('#table_chart tr td').css('text-align', 'right')
            $('#table_chart tr  td:first-child').css('text-align', 'left')
        },
    });
}

//筛选时间报表: 获取左侧表格的数据
function table_chart_fordate(workFlag, workCatalog, reportKey, reportId, areaCode, saleArea, iomArea, startDate, endDate, gridInfo, tradeCatalog, classType) {
    $("#table_chart").bootstrapTable('destroy')
    $('#table_chart').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/reportdetail/finddetaildata?workFlag=" + workFlag + "&startDate=" + startDate + "&endDate=" + endDate + "&reportId=" + reportId + "&reportKey=" + reportKey + "&userParam=" + locHref + "&integratedId=" + gridInfo + "&tradeCatalog=" + tradeCatalog + "&areaCode=" + areaCode + "&saleArea=" + saleArea + "&iomArea=" + iomArea + "&classType=" + classType),
        height: 400,
        dataType: 'json',
        method: "post",
        cache: false,
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                workFlag: workFlag, // 额外添加的参数
                workCatalog: workCatalog,
                startDate: startDate,
                endDate: endDate,
                reportId: reportId,
                reportKey: reportKey,
                userParam: decodeURI(locHref),
                integratedId: gridInfo,
                tradeCatalog: tradeCatalog,
                areaCode: areaCode,
                saleArea: saleArea,
                iomArea: iomArea,
                iomArea: iomArea,
                classType: classType

            }
        },
        responseHandler: function (res) {
            console.log(res)
            //console.log(res.rows)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            //属地
            // var areaName=["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云","怀柔","门头沟","平谷","延庆","大客户中心","市支中心","客服中心","重通局","国际业务中心","集团客户","电子渠道","其他","合计"]

            var numX = [];
            var numXCodeArr = [];
            // if ($('#calibersd').hasClass("searched")) { //属地
            if (caliberVal == "1") { //属地   // 分类口径:   1: 属地 2:发展
                numX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "其他", "合计"];
                numXCodeArr = ["2", "3", "4", "5", "7", "8", "802", "801", "804", "806", "803", "809", "808", "805", "807", "810", "10", "9999", "99999"];
            } else {    // 发展
                numX = ["二区", "三区", "四区", "五区", "七区", "八区", "通州", "昌平", "大兴", "顺义", "房山", "密云", "怀柔", "门头沟", "平谷", "延庆", "重通局", "中台", "渠道中心", "大客户中心", "客服中心", "其他", "合计"];
                numXCodeArr = ["225", "226", "211", "212", "213", "214", "217", "219", "220", "218", "216", "223", "221", "215", "222", "224", "227", "11a0al", "11a01s", "dkhzx", "11a01q", "11a08x", "99999"];
            }

            // obj.developerAreaName = areaName;
            obj.rows = res.rows;

            var newRows = [];
            var aCountSum = 0;
            for (var i = 0; i < obj.rows.length; i++) {
                aCountSum += parseInt(obj.rows[i].a_count);
            }

            var bCountSum = 0;
            for (var i = 0; i < obj.rows.length; i++) {
                bCountSum += parseInt(obj.rows[i].b_count);
            }

            for (var i = 0; i < numXCodeArr.length; i++) {
                var newRow = {};
                newRow.developerAreaName = numX[i];
                if (i == numXCodeArr.length - 1) {  //合计
                    newRow.a_count = aCountSum;
                    newRow.b_count = bCountSum;
                    if (aCountSum == 0) {
                        newRow.time_out = '100%';     // 计算超时占比
                    } else {
                        newRow.time_out = (bCountSum / aCountSum * 100).toFixed(2) + '%';     // 计算超时占比
                    }

                    newRows.push(newRow);
                    break;
                }
                newRow.a_count = 0;
                newRow.b_count = 0;
                newRow.time_out = (0).toFixed(2) + '%';
                for (var j = 0; j < obj.rows.length; j++) {

                    // if ($('#calibersd').hasClass("searched")) { //属地
                    if (caliberVal == "1") { //属地   // 分类口径:   1: 属地 2:发展
                        if (obj.rows[j].area_name == numXCodeArr[i]) {
                            newRow.a_count = obj.rows[j].a_count;
                            newRow.b_count = obj.rows[j].b_count;
                            // 计算超时占比
                            newRow.time_out = (obj.rows[j].b_count / aCountSum * 100).toFixed(2) + '%';
                            break;
                        }
                    } else {
                        if (obj.rows[j].develop_sale_area == numXCodeArr[i]) {
                            newRow.a_count = obj.rows[j].a_count;
                            newRow.b_count = obj.rows[j].b_count;
                            // 计算超时占比
                            newRow.time_out = (obj.rows[j].b_count / aCountSum * 100).toFixed(2) + '%';
                            break;
                        }
                    }
                }
                newRows.push(newRow);
            }

            obj.rows = newRows;
            console.log(obj.rows)
            return obj;

        },
        onLoadSuccess: function () {
            $('#table_chart tr td').css('text-align', 'right')
            $('#table_chart tr  td:first-child').css('text-align', 'left')
        },
    });
}

function chart(num1, num2, num3) {
    var bar = echarts.init(document.getElementById('modal_chart'));
    var option = {
        tooltip: {
            // trigger: 'axis'
        },
        //backgroundColor: '#eee', // 背景
        color: ['#f39800', '#ea5513'],  // 柱子颜色
        legend: {  // 图例
            show: false,
            /* data: ['访问量', '人数', '平均访问量'],*/
            textStyle: {
                /* color: '#aaaaaa'*/
            },
            right: '15%'
        },
        grid: {  // 可控制图标大小和位置
//           width:'95%',  // 宽 & 高
//           height:'70%',
            width: 'auto',
            height: 'auto',
            top: '20px', // 距离容器顶部
            bottom: '100px',  // X轴位置距离容器底部
            x: '50px',  // 距离容器X方向距离
            borderColor: 'transparent'
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑'
                    },
                    //X轴刻度配置
                    interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                    /*rotate : 30,
                     formatter : function(value, index) {
                         var rt = "";
                         for (var i = 0; i < value.length; i++) {
                             rt += value.substr(i, 1) + "\n";

                         }
                         rt = value;
                         return rt;

                     }*/
                },
                data: num1,
                splitLine: {
                    show: false // 坐标轴grid区域的分割线
                },
                axisTick: {
                    show: false  // X轴刻度线
                },
                axisLine: {
                    show: true, // X轴坐标线
                    lineStyle: {
                        color: '#cfd1d0',
                        width: 1
                    },
                }
            }

        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {    // 轴线
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑'
                    }
                },
//              min: 0,
//		        max: 450,
//		        interval: 50,
                splitLine: {
                    show: 'true',
                    lineStyle: {
                        color: '#cfd1d0',
                        width: 0.5
                    }
                },
                axisTick: {
                    show: false
                },
                splitArea: { // 坐标轴grid区域的分割区域
                    show: false,
                    /* areaStyle: {
                         color: ['#f8dab8']
                     }*/
                },
                axisLine: {
                    show: true, // Y轴坐标线
                    lineStyle: {
                        color: '#cfd1d0',
                        width: 1
                    }
                }
            },

        ],
        series: [
            {
                name: '订单量',
                type: 'bar',
                barGap: 0.2,//柱间距离
                barWidth: 13,  //柱子宽度
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 4    //显示圆角
                    },
                    normal: {
                        barBorderRadius: 4,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
                            offset: 0,
                            color: '#1d85b8'
                        }, {
                            offset: 1,
                            color: '#75d9f0'
                        }]),
                        label: {
                            show: true,      //开启显示
                            position: [-0, -20], //在上方显示
                            textStyle: {     //数值样式
                                color: '#000',
                                fontSize: 8
                            }
                        }

                    },
                },
                data: num2
            },
            {
                name: '超时单量',
                type: 'bar',
                barGap: 0.2,//柱间距离
                barWidth: 13,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 4    //显示圆角
                    },
                    normal: {
                        barBorderRadius: 4,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
                            offset: 0,
                            color: '#f573a1'
                        }, {
                            offset: 1,
                            color: '#fbb18a'
                        }]),
                        label: {
                            show: true,      //开启显示
                            position: [-0, -10],//'top', //在上方显示
                            textStyle: {     //数值样式
                                color: '#000',
                                fontSize: 8
                            }
                        }

                    },
                },
                data: num3
            }
        ]
    };
//每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
    bar.setOption(option);
    setTimeout(function () {
        bar.resize()
    }, 50)
}

//导出数据
$('#chart_export').click(function () {
    var chartid = $('#chart_export').attr('data-chartid');
    var workCatalog = $('#chart_export').attr('data-workcatalog');
//线上
    var valuein_developerArea = $('#chart_export').attr('valuein_developerArea');
    var tradeCatalogOn = $('#chart_export').attr('tradeCatalogOn');
    var onlineTypeOn = $('#chart_export').attr('onlineTypeOn');
//线下
    var valueout_developerArea = $('#chart_export').attr('valueout_developerArea');
    var tradeCatalogOut = $('#chart_export').attr('tradeCatalogOut');
    var onlineTypeOut = $('#chart_export').attr('onlineTypeOut');
    var classType = $('#chart_export').attr('classType');

    console.log($('#chart_export').attr('data-workcatalog'))
    if (workCatalog == 0) {
        var developerArea = valuein_developerArea
        var tradeCatalog = tradeCatalogOn
        var onlineType = onlineTypeOn
        dateType = dateTypeOn
    } else {
        var developerArea = valueout_developerArea
        var tradeCatalog = tradeCatalogOut
        var onlineType = onlineTypeOut
        dateType = dateTypeOut
    }
    var data = {
        workFlag: chartid,
        workCatalog: workCatalog,
        developerArea: developerArea,
        tradeCatalog: tradeCatalog,
        onlineType: onlineType,
        timestamp: Date.parse(new Date()),
        classType: classType
    }
    console.log(data)
    $.ajax({
        type: 'post',
        url: getOutUrl(getRootPath_web(), "/monitor/exportFlowNum?workFlag=" + chartid + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&classType=" + classType),
        //url : 'modal_echart.json',
        dataType: 'json',
        data: data,
        cache: false,
        success: function (data) {

        },
        error: function (data) {
            $.download(getOutUrl(getRootPath_web(), "/monitor/exportFlowNum?workFlag=" + chartid + '&type=' + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&classType=" + classType), 'post', data.promise.responseText); // 下载文件
        }
    });

})
//筛选时间报表: 导出数据
$('#chart_export_fordate').click(function () {

    var chartid = $('#chart_export_fordate').attr('data-chartid');
    var workCatalog = $('#chart_export_fordate').attr('data-workcatalog');
//线上
    var valuein_developerArea = $('#chart_export_fordate').attr('valuein_developerArea');
    var tradeCatalogOn = $('#chart_export_fordate').attr('tradeCatalogOn');
    var onlineTypeOn = $('#chart_export_fordate').attr('onlineTypeOn');
//线下
    var valueout_developerArea = $('#chart_export_fordate').attr('valueout_developerArea');
    var tradeCatalogOut = $('#chart_export_fordate').attr('tradeCatalogOut');
    var onlineTypeOut = $('#chart_export_fordate').attr('onlineTypeOut');

    var reportKey = $('#chart_export_fordate').attr('data-reportKey');
    var reportId = $('#chart_export_fordate').attr('data-reportId');
    var startDate = $('#chart_export_fordate').attr('data-startDate');
    var endDate = $('#chart_export_fordate').attr('data-endDate');
    var gridInfo = $('#chart_export_fordate').attr('data-gridInfo');
    var classType = $('#chart_export_fordate').attr('classType');

    console.log($('#chart_export_fordate').attr('data-workcatalog'))
    if (workCatalog == 0) {
        var developerArea = valuein_developerArea
        var tradeCatalog = tradeCatalogOn
        var onlineType = onlineTypeOn
        dateType = dateTypeOn
    } else {
        var developerArea = valueout_developerArea
        var tradeCatalog = tradeCatalogOut
        var onlineType = onlineTypeOut
        dateType = dateTypeOut
    }
    var data = {
        workFlag: chartid,
        workCatalog: workCatalog,
        // developerArea:developerArea,
        developerArea: areaCode,
        tradeCatalog: tradeCatalog,
        onlineType: onlineType,
        timestamp: Date.parse(new Date()),
        dateType: dateType,
        startDate: startDate,
        endDate: endDate,
        integratedId: gridInfo,
        reportKey: reportKey,
        reportId: reportId,
        reportId: classType
    }
    console.log(data)
    $.ajax({
        type: 'post',
        url: getOutUrl(getRootPath_web(), "/reportdetail/exportdetaildata?workFlag=" + chartid + '&workCatalog=' + workCatalog
            + '&developerArea=' + areaCode + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType
            + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&startDate=" + startDate + "&endDate=" + endDate
            + "&integratedId=" + gridInfo + "&reportKey=" + reportKey + "&reportId=" + reportId + "&classType=" + classType),
        dataType: 'json',
        data: data,
        cache: false,
        success: function (data) {

        },
        error: function (data) {
            $.download(getOutUrl(getRootPath_web(), "/reportdetail/exportdetaildata?workFlag=" + chartid + '&type='
                + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref
                + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date())
                + "&dateType=" + dateType + "&startDate=" + startDate + "&endDate=" + endDate + "&integratedId=" + gridInfo
                + "&reportKey=" + reportKey + "&reportId=" + reportId + "&classType=" + classType), 'post', data.promise.responseText); // 下载文件
        }
    });
})
//---------------------------------------------------------table----------------------------------//
//$('#myModal_table').modal('show')
$('#close_btn').click(function () {
    $('#myModal_table_a').modal('hide')
})
$('#close_btn_b').click(function () {
    $('#myModal_table_b').modal('hide')
})
$('#close_btn_c').click(function () {
    $('#myModal_table_c').modal('hide')
})

//a获取表格数据
function table(id, type, workCatalog, developerArea, tradeCatalog, onlineType, dateType, classType) {
    $("#table_a").bootstrapTable('destroy')
    var columns = [{
        field: 'exTradeInmode',
        title: '受理渠道'
    }];
    if (workCatalog == '0') {

    } else if (workCatalog == '1') {
        columns.push({
            field: 'bssSubscribeId',
            title: '营业订单号'
        });
    }
    var cs1 = [{
        field: 'exTradeId',
        title: '渠道订单号'
    }, {
        field: 'lastJobWorkInstId',
        title: '工单号'
    }, {
        field: 'secondLevel',
        title: '产品类型'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'lastJobName',
        title: '当前环节'
    }, {
        field: 'developAreaName',
        title: '发展分公司'
    }, {
        field: 'areaNameName',
        title: '属地分公司'
    }, {
        field: 'integratedName',
        title: '网格名称'
    }, {
        field: 'lastJobStaff',
        title: '当前环节处理人'
    }, {
        field: 'lastJobStaffTel',
        title: '当前环节处理人电话'
    }, {
        field: 'acceptDate',
        title: '下单时间'
    }];
    var cs2 = [{
        field: 'workStartDate',
        title: '当前监控节点开始时间'
    }, {
        field: 'appointDate',
        title: '预约时间'
    }, {
        field: 'workStartDate',
        title: '创建时间'
    }, {
        field: 'jobTime',
        title: '环节时限'
    }, {
        field: 'overTime',
        title: '超时时点'
    }, {
        field: 'warnLevelName',
        title: '告警级别'
    }];
    columns = columns.concat(cs1);
    if (id == '9' || id == '19') {
        columns.push({field: 'callBegin', title: '外呼开始时间'});
        columns.push({field: 'callStatus', title: '呼叫状态'});
    }
    columns = columns.concat(cs2);
    $('#table_a').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/monitor/queryFlowDetail?workFlag=" + id + '&type=' + type + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&classType=" + classType),
        //url : 'modal_table.json',
        /*height: 300,*/
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        columns: columns,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
//	        pageSize: params.limit, // 每页要显示的数据条数
//	        offset: params.offset, // 每页显示数据的开始行号
                sort: params.sort, // 要排序的字段
                sortOrder: params.order, // 排序规则
                workFlag: id, // 额外添加的参数
                type: type,
                workCatalog: workCatalog,
                developerArea: developerArea,
                tradeCatalog: tradeCatalog,
                onlineType: onlineType,
                timestamp: Date.parse(new Date()),
                dateType: dateType,
                classType: classType,

            }
        },
        responseHandler: function (res) {
            console.log(res)
            //console.log(res.data.jobInsts)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            /*if((parseInt(res.rows.length)*18 + 30) > 300){
                console.log(11111)
                $('#table').attr('data-height','300');
            }else{
                console.log(2222)
                $('#table').attr('data-height','100');
            }*/
            for (var i = 0; i < res.rows.length; i++) {   //订单号加跳转链接
                if (workCatalog == '0') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    }
                } else if (workCatalog == '1') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    }
                }
                if (res.rows[i].callStatus) {
                    res.rows[i].callStatus = res.rows[i].callStatus == '1' ? '呼通': res.rows[i].callStatus == '2' ? '未呼通': '';
                }
                var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                if (warnName[res.rows[i].warnLevel] != undefined) {
                    res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                } else {
                    res.rows[i].warnLevelName = "";
                }
            }
            obj.rows = res.rows;
            return obj;

        }
    });
}

//b获取表格数据
function table_b(id, type, workCatalog, developerArea, tradeCatalog, onlineType, dateType, classType) {
    var columns = [{
        field: 'exTradeInmode',
        title: '受理渠道'
    }];
    if (workCatalog == '0') {

    } else if (workCatalog == '1') {
        columns.push({
            field: 'bssSubscribeId',
            title: '营业订单号'
        });
    }
    var cs1 = [{
        field: 'exTradeId',
        title: '渠道订单号'
    }, {
        field: 'lastJobWorkInstId',
        title: '工单号'
    }, {
        field: 'secondLevel',
        title: '产品类型'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'lastJobName',
        title: '当前环节'
    }, {
        field: 'developAreaName',
        title: '发展分公司'
    }, {
        field: 'areaNameName',
        title: '属地分公司'
    }, {
        field: 'integratedName',
        title: '网格名称'
    }, {
        field: 'lastJobStaff',
        title: '当前环节处理人'
    }, {
        field: 'lastJobStaffTel',
        title: '当前环节处理人电话'
    }, {
        field: 'acceptDate',
        title: '下单时间'
    }];
    var cs2 = [{
        field: 'workStartDate',
        title: '当前监控节点开始时间'
    }, {
        field: 'appointDate',
        title: '预约时间'
    }, {
        field: 'workStartDate',
        title: '创建时间'
    }, {
        field: 'jobTime',
        title: '环节时限'
    }, {
        field: 'overTime',
        title: '超时时点'
    }, {
        field: 'warnLevelName',
        title: '告警级别'
    }, {field: 'warnLevel', formatter: 'actionFormatter', title: '触发短信'}, {
        field: 'levelSendCount',
        title: '当前告警级别发送次数'
    }, {field: 'linkSendCount', title: '当前环节发送次数'}];
    columns = columns.concat(cs1);
    if (id == '9' || id == '19') {
        columns.push({field: 'callBegin', title: '外呼开始时间'});
        columns.push({field: 'callStatus', title: '呼叫状态'});
    }
    columns = columns.concat(cs2);
    $("#table_b").bootstrapTable('destroy')
    $('#table_b').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/monitor/queryFlowDetail?workFlag=" + id + '&type=' + type + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&classType=" + classType),
        //url : 'modal_table.json',
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        columns: columns,
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                workFlag: id, // 额外添加的参数
                type: type,
                workCatalog: workCatalog,
                developerArea: developerArea,
                tradeCatalog: tradeCatalog,
                onlineType: onlineType,
                timestamp: Date.parse(new Date()),
                dateType: dateType,
                classType: classType

            }
        },
        responseHandler: function (res) {
            console.log(res)
            //console.log(res.data.jobInsts)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            for (var i = 0; i < res.rows.length; i++) {  //订单号加跳转链接
                if (workCatalog == '0') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    }
                } else if (workCatalog == '1') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    }
                }
                if (res.rows[i].callStatus) {
                    res.rows[i].callStatus = res.rows[i].callStatus == '1' ? '呼通': res.rows[i].callStatus == '2' ? '未呼通': '';
                }
                var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                if (warnName[res.rows[i].warnLevel] != undefined) {
                    res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                } else {
                    res.rows[i].warnLevelName = "";
                }
            }
            obj.rows = res.rows;
            return obj;

        }

    });
}

//筛选时间报表: a获取表格数据
function table_a_fordate(id, type, workCatalog, developerArea, tradeCatalog, onlineType, dateType, startDate, endDate, integratedId, classType) {
    var columns = [{
        field: 'exTradeInmode',
        title: '受理渠道'
    }];
    if (workCatalog == '0') {

    } else if (workCatalog == '1') {
        columns.push({
            field: 'bssSubscribeId',
            title: '营业订单号'
        });
    }
    var cs1 = [{
        field: 'exTradeId',
        title: '渠道订单号'
    }, {
        field: 'lastJobWorkInstId',
        title: '工单号'
    }, {
        field: 'secondLevel',
        title: '产品类型'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'lastJobName',
        title: '当前环节'
    }, {
        field: 'developAreaName',
        title: '发展分公司'
    }, {
        field: 'areaNameName',
        title: '属地分公司'
    }, {
        field: 'integratedName',
        title: '网格名称'
    }, {
        field: 'lastJobStaff',
        title: '当前环节处理人'
    }, {
        field: 'lastJobStaffTel',
        title: '当前环节处理人电话'
    }, {
        field: 'acceptDate',
        title: '下单时间'
    }];
    var cs2 = [{
        field: 'workStartDate',
        title: '当前监控节点开始时间'
    }, {
        field: 'appointDate',
        title: '预约时间'
    }, {
        field: 'workStartDate',
        title: '创建时间'
    }, {
        field: 'jobTime',
        title: '环节时限'
    }, {
        field: 'overTime',
        title: '超时时点'
    }, {
        field: 'warnLevelName',
        title: '告警级别'
    }];
    columns = columns.concat(cs1);
    if (id == '9' || id == '19') {
        columns.push({field: 'callBegin', title: '外呼开始时间'});
        columns.push({field: 'callStatus', title: '呼叫状态'});
    }
    columns = columns.concat(cs2);
    $("#table_a").bootstrapTable('destroy')
    $('#table_a').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/monitor/queryFlowDetail?workFlag=" + id + '&type=' + type + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=&dateType=" + dateType + "&startDate=" + startDate + "&endDate=" + endDate + "&integratedId=" + integratedId + "&classType=" + classType + "&secondLevel=" + secondLevel),

        //url : 'modal_table.json',
        /*height: 300,*/
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        columns: columns,
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
//	        pageSize: params.limit, // 每页要显示的数据条数
//	        offset: params.offset, // 每页显示数据的开始行号
                sort: params.sort, // 要排序的字段
                sortOrder: params.order, // 排序规则
                workFlag: id, // 额外添加的参数
                type: type,
                workCatalog: workCatalog,
                developerArea: developerArea,
                tradeCatalog: tradeCatalog,
                onlineType: onlineType,
                timestamp: '',//Date.parse(new Date()),
                dateType: dateType,
                startDate: startDate,
                endDate: endDate,
                integratedId: integratedId,
                classType: classType,
            }
        },
        responseHandler: function (res) {
            //console.log(res.data.jobInsts)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            /*if((parseInt(res.rows.length)*18 + 30) > 300){
                console.log(11111)
                $('#table').attr('data-height','300');
            }else{
                console.log(2222)
                $('#table').attr('data-height','100');
            }*/
            for (var i = 0; i < res.rows.length; i++) {   //订单号加跳转链接
                if (workCatalog == '0') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    }
                } else if (workCatalog == '1') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    }
                }
                if (res.rows[i].prodInfo) {
                    if (res.rows[i].prodInfo.length > 0) {
                        var secondLevel = res.rows[i].prodInfo[0].second_level;
                        for (var a = 1; a < res.rows[i].prodInfo.length; a++) {
                            secondLevel += ',' + res.rows[i].prodInfo[a].second_level;
                        }
                        res.rows[i].secondLevel = secondLevel;
                    }
                }
                if (res.rows[i].callStatus) {
                    res.rows[i].callStatus = res.rows[i].callStatus == '1' ? '呼通': res.rows[i].callStatus == '2' ? '未呼通': '';
                }
                var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                if (warnName[res.rows[i].warnLevel] != undefined) {
                    res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                } else {
                    res.rows[i].warnLevelName = "";
                }
            }
            obj.rows = res.rows;
            console.log(("这里   \t" + JSON.stringify(obj)))
            return obj;

        }
    });
}

//筛选时间报表: b获取表格数据
function table_b_fordate(id, type, workCatalog, developerArea, tradeCatalog, onlineType, dateType, startDate, endDate, integratedId, classType) {
    var columns = [{
        field: 'exTradeInmode',
        title: '受理渠道'
    }];
    if (workCatalog == '0') {

    } else if (workCatalog == '1') {
        columns.push({
            field: 'bssSubscribeId',
            title: '营业订单号'
        });
    }
    var cs1 = [{
        field: 'exTradeId',
        title: '渠道订单号'
    }, {
        field: 'lastJobWorkInstId',
        title: '工单号'
    }, {
        field: 'secondLevel',
        title: '产品类型'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'lastJobName',
        title: '当前环节'
    }, {
        field: 'developAreaName',
        title: '发展分公司'
    }, {
        field: 'areaNameName',
        title: '属地分公司'
    }, {
        field: 'integratedName',
        title: '网格名称'
    }, {
        field: 'lastJobStaff',
        title: '当前环节处理人'
    }, {
        field: 'lastJobStaffTel',
        title: '当前环节处理人电话'
    }, {
        field: 'acceptDate',
        title: '下单时间'
    }];
    var cs2 = [{
        field: 'workStartDate',
        title: '当前监控节点开始时间'
    }, {
        field: 'appointDate',
        title: '预约时间'
    }, {
        field: 'workStartDate',
        title: '创建时间'
    }, {
        field: 'jobTime',
        title: '环节时限'
    }, {
        field: 'overTime',
        title: '超时时点'
    }, {
        field: 'warnLevelName',
        title: '告警级别'
    }, {field: 'warnLevel', formatter: 'actionFormatter', title: '触发短信'}, {
        field: 'levelSendCount',
        title: '当前告警级别发送次数'
    }, {field: 'linkSendCount', title: '当前环节发送次数'}];
    columns = columns.concat(cs1);
    if (id == '9' || id == '19') {
        columns.push({field: 'callBegin', title: '外呼开始时间'});
        columns.push({field: 'callStatus', title: '呼叫状态'});
    }
    columns = columns.concat(cs2);
    $("#table_b").bootstrapTable('destroy')
    $('#table_b').bootstrapTable({
        // url : getOutUrl(getRootPath_web(), "/monitor/queryFlowDetail?workFlag="+id+'&type='+type+'&workCatalog='+workCatalog+'&developerArea='+developerArea+"&userParam="+locHref+"&tradeCatalog="+tradeCatalog+"&onlineType="+onlineType+"&timestamp="+Date.parse(new Date())+"&dateType="+dateType),
        url: getOutUrl(getRootPath_web(), "/monitor/queryFlowDetail?workFlag=" + id + '&type=' + type + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&dateType=" + dateType + "&startDate=" + startDate + "&endDate=" + endDate + "&integratedId=" + integratedId + "&classType=" + classType + "&secondLevel=" + secondLevel),
        //url : 'modal_table.json',
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        columns: columns,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                workFlag: id, // 额外添加的参数
                type: type,
                workCatalog: workCatalog,
                developerArea: developerArea,
                tradeCatalog: tradeCatalog,
                onlineType: onlineType,
                timestamp: Date.parse(new Date()),
                dateType: dateType,
                startDate: startDate,
                endDate: endDate,
                integratedId: integratedId,
                classType: classType,

            }
        },
        responseHandler: function (res) {
            console.log(res)
            //console.log(res.data.jobInsts)
            var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            for (var i = 0; i < res.rows.length; i++) {  //订单号加跳转链接
                if (workCatalog == '0') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].exTradeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].exTradeId + "' target='_blank'>" + res.rows[i].exTradeId + "</a>";
                    }
                } else if (workCatalog == '1') {
                    if (res.rows[i].from == '0' || res.rows[i].from == '7') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=3&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    } else if (res.rows[i].from == '1' || res.rows[i].from == '2') {
                        res.rows[i].bssSubscribeId = "<a class='bssSubscribe' href='../../../web-pc/in-order/page/order-list.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&orderSearchType=2&bssSubscribeId=" + res.rows[i].bssSubscribeId + "' target='_blank'>" + res.rows[i].bssSubscribeId + "</a>";
                    }
                }
                if (res.rows[i].prodInfo) {
                    if (res.rows[i].prodInfo.length > 0) {
                        var secondLevel = res.rows[i].prodInfo[0].second_level;
                        for (var a = 1; a < res.rows[i].prodInfo.length; a++) {
                            secondLevel += ',' + res.rows[i].prodInfo[a].second_level;
                        }
                        res.rows[i].secondLevel = secondLevel;
                    }
                }
                if (res.rows[i].callStatus) {
                    res.rows[i].callStatus = res.rows[i].callStatus == '1' ? '呼通': res.rows[i].callStatus == '2' ? '未呼通': '';
                }
                var warnName = {"1": "一级告警", "2": "二级告警", "3": "三级告警", "4": "四级告警", "5": "五级告警"};
                if (warnName[res.rows[i].warnLevel] != undefined) {
                    res.rows[i].warnLevelName = warnName[res.rows[i].warnLevel];
                } else {
                    res.rows[i].warnLevelName = "";
                }
            }
            obj.rows = res.rows;
            return obj;
        }
    });
}

//发送短信
function actionFormatter(value, row, index) {
    console.log(row)
    //row['sendStatus'] = '0'
    //已发送短信
    if (row.sendStatus == '1') {
        var e = '<buttton  style="background-color: #998ed0; color: #ffffff; padding:2px 5px; border-radius: 5px; cursor:pointer; text-align: center; display: inline-block; width: 60px;" id=' + row.orderNum + '>已发送</buttton> '
    }
    //没有发送短信
    else {
        var e = '<buttton  style="background-color: #998ed0; color: #ffffff; padding:2px 5px; border-radius: 5px; cursor:pointer; text-align: center; display: inline-block; width: 60px;" id=' + row.orderNum + ' onclick="edit(\'' + row.orderNum + '\',\'' + row.workFlag + '\',\'' + row.warnLevel + '\')">发送短信</buttton> '
    }

    return e
}

function edit(id, workFlag, warnLevel) {
    console.log($('#' + id).text());
    if ($('#' + id).text() != '已发送' && $('#' + id).text() != '发送失败') {
        //$('#table_c').parent('div .fixed-table-body').addClass('height_limit');
        //点击一次,无法点击
        /*$('#'+id).text('发送中...');*/
        $('#warnLevel').val(warnLevel);
        $('#orderNum').val(id);
        $('#workFlag').val(workFlag);
        $('#myModal_table_c').modal('show');
        table_c(id, workFlag, warnLevel);
    }
}

//c获取表格数据
function table_c(id, workFlag, warnLevel) {
    /*var workFlag="11";
    var type="1";
    var workCatalog="0";
    var developerArea="all";
    var tradeCatalog="all";
    var onlineType="1";
    var timestamp="1547693140000";
    var dateType="all";*/

    $("#table_c").bootstrapTable('destroy')
    $('#table_c').bootstrapTable({
        url: getOutUrl(getRootPath_web(), "/monitor/querySmsStaffInfo?userParam=" + locHref + '&warnLevel=' + warnLevel + '&workFlag=' + workFlag + '&orderNum=' + id),
        dataType: 'json',
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        sortable: true,                     //是否启用排序
        sortOrder: "desc",
        pagination: false,
        sidePagination: "server",
        pageSize: "10",
        pageList: "[5, 10, 20, 50 ]",
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        queryParams: function (params) {
            return {
                orderNum: id,   //订单号
                workFlag: workFlag,	//环节id
                warnLevel: warnLevel //告警级别
            }
            /*return {
                workFlag:workFlag,
                type:type,
                workCatalog:workCatalog,
                developerArea:developerArea,
                tradeCatalog:tradeCatalog,
                onlineType:onlineType,
                timestamp:timestamp,
                dateType:dateType
            }*/
        },
        responseHandler: function (res) {
            console.log(res);
            /*var obj = {
                total: 0,
                rows: []
            };
            obj.total = res.rows.length;
            $('#table_c').bootstrapTable('load', res);
            obj.rows =  res.rows;
            return obj;*/

            var obj = {
                total: 0,
                rows: []
            };
            if (res.state == "0") {

            } else {
                obj.total = res.rows.length;

            }
            $('#table_cscene').bootstrapTable('load', res);
            obj.rows = res.rows;
            return obj;

            /*if(res.state=="0"){ //订单不存在，弹出"订单不存在"
                $('#myModal_table_c').modal('hide');

                alert_bootbox(res.message,"提示","确定");

                $('div .modal-dialog').children('div:first .modal-content').addClass('pop_style');
            }else{
                var obj = {
                    total: 0,
                    rows: []
                };
                obj.total = res.rows.length;
                $('#table_c').bootstrapTable('load', res);
                obj.rows =  res.rows;
                return obj;
            }*/
        }

    });
}

//报表复选框
function stateFormatter(value, row, index) {
    if (row.rowstate == "true") {
        return {
            disabled: true,//设置是否可用
            checked: true//设置选中
        };
    } else {
        return {
            checked: false//设置选中
        };
    }
    return "";
}

//点击发送
$('#sendSms').click(function () {
    //获取表格中的选中行，如果没有选中行，return
    var selRows = $('#table_c').bootstrapTable("getSelections");

    //人员名称
    var staffName = new Array();

    //部门名称
    var departName = new Array();

    //电话号码
    var serialNumber = new Array();

    //告警级别
    var warnLevel = $('#warnLevel').val();

    //订单编号
    var orderNum = $('#orderNum').val();

    //环节
    var workFlag = $('#workFlag').val();

    if (selRows.length == 0) {

        //自定义警告框
        alert_bootbox("请选择发送人", "提示", "确定");

        $('div .modal-dialog').children('div:first .modal-content').addClass('pop_style');
    } else {
        $.map(selRows, function (row) {
            staffName.push(row.staffName);
            serialNumber.push(row.serialNumber);
            departName.push(row.departName);
        })

        var data = {
            orderNum: orderNum,
            userParam: decodeURI(locHref),
            warnLevel: warnLevel,
            staffName: staffName,
            departName: departName,
            workFlag: workFlag,
            serialNumber: serialNumber
        }

        $.ajax({
            type: 'post',
            url: getOutUrl(getRootPath_web(), "/monitor/sendSms?&orderNum=" + orderNum + "&userParam=" + locHref + "&warnLevel=" + warnLevel + "&staffName=" + encodeURIComponent(staffName) + "&workFlag=" + workFlag + "&serialNumber=" + serialNumber + "&departName=" + encodeURIComponent(departName)),
            dataType: 'json',
            data: data,
            cache: false,
            success: function (data) {
                if (data.state == '1') {
                    $('#' + orderNum).text('已发送')
                    $('#' + orderNum).attr('disabled', true)
                } else {
                    //alert(data.message)
                    $('#' + orderNum).text('发送失败')
                }

            },
            error: function (data) {
                $('#' + orderNum).text('发送失败');
            }
        });

        $('#myModal_table_c').modal('hide');
    }
})

// bootbox 自定义警告框
function alert_bootbox(message, title, label) {
    bootbox.dialog({
        // dialog的内容
        message: message,

        // dialog的标题
        title: title,

        // 退出dialog时的回调函数，包括用户使用ESC键及点击关闭
        onEscape: function () {
        },

        // 是否显示此dialog，默认true
        show: true,

        // 是否显示body的遮罩，默认true
        backdrop: true,

        // 是否显示关闭按钮，默认true
        closeButton: true,

        // dialog的类名(没有用)
        className: "pop_style",

        // dialog底端按钮配置
        buttons: {

            // 其中一个按钮配置
            success: {
                // 按钮显示的名称
                label: label,

                // 按钮的类名
                className: "btn-success",

                // 点击按钮时的回调函数
                callback: function () {
                }
            },
        }
    });
}

$('.table_export').click(function () {
    var id = $('#table_export').attr('data-tableid');
    var type = $('#table_export').attr('data-type');
    var workCatalog = $('#table_export').attr('data-workcatalog');
//线下
    var valueout_developerArea = $('#table_export').attr('valueout_developerArea');
    var tradeCatalogOut = $('#table_export').attr('tradeCatalogOut');
    var onlineTypeOut = $('#table_export').attr('onlineTypeOut');
//线上
    var valuein_developerArea = $('#table_export').attr('valuein_developerArea');
    var tradeCatalogOn = $('#table_export').attr('tradeCatalogOn');
    var onlineTypeOn = $('#table_export').attr('onlineTypeOn');
    var classType = $('#table_export').attr('classType');

    var developerArea;
    var tradeCatalog;
    var onlineType;
    if (workCatalog == 0) {
        developerArea = valuein_developerArea;
        tradeCatalog = tradeCatalogOn;
        onlineType = onlineTypeOn;
        dateType = dateTypeOn;
    } else if (workCatalog == 1) {
        developerArea = valueout_developerArea;
        tradeCatalog = tradeCatalogOut;
        onlineType = onlineTypeOut;
        dateType = dateTypeOut;
    }
    $.download(getOutUrl(getRootPath_web(), "/monitor/exportFlowDetail?workFlag=" + id + '&type=' + type + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&export=" + "1" + "&dateType=" + dateType + "&classType=" + classType), 'post') // 下载文件 classType
})

$('.table_export_fordate').click(function () {
    var id = $('#table_export_fordate').attr('data-tableid');
    var type = $('#table_export_fordate').attr('data-type');
    var workCatalog = $('#table_export_fordate').attr('data-workcatalog');
//线下
    var valueout_developerArea = $('#table_export_fordate').attr('valueout_developerArea');
    var tradeCatalogOut = $('#table_export_fordate').attr('tradeCatalogOut');
    var onlineTypeOut = $('#table_export_fordate').attr('onlineTypeOut');
//线上
    var valuein_developerArea = $('#table_export_fordate').attr('valuein_developerArea');
    var tradeCatalogOn = $('#table_export_fordate').attr('tradeCatalogOn');
    var onlineTypeOn = $('#table_export_fordate').attr('onlineTypeOn');

    var startDate = $('#table_export_fordate').attr('data-startDate');
    var endDate = $('#table_export_fordate').attr('data-endDate');
    var gridInfo = $('#table_export_fordate').attr('data-integratedId');
    var classtype = $('#table_export_fordate').attr('classtype');
    var developerArea;
    var tradeCatalog;
    var onlineType;
    if (workCatalog == 0) {
        developerArea = valuein_developerArea;
        tradeCatalog = tradeCatalogOn;
        onlineType = onlineTypeOn;
        dateType = dateTypeOn;
    } else if (workCatalog == 1) {
        developerArea = valueout_developerArea;
        tradeCatalog = tradeCatalogOut;
        onlineType = onlineTypeOut;
        dateType = dateTypeOut;
    }
    $.download(getOutUrl(getRootPath_web(), "/monitor/exportFlowDetail?workFlag=" + id + '&type=' + type + '&workCatalog=' + workCatalog + '&developerArea=' + developerArea + "&userParam=" + locHref + "&tradeCatalog=" + tradeCatalog + "&onlineType=" + onlineType + "&timestamp=" + Date.parse(new Date()) + "&export=" + "1" + "&dateType=" + dateType + "&startDate=" + startDate + "&endDate=" + endDate + "&integratedId=" + gridInfo + "&classType=" + classtype + "&secondLevel=" + "&secondLevel=" + encodeURIComponent(encodeURIComponent(secondLevel))), 'post') // 下载文件 classtype
})

