var loginaccount = "luwb1";
var yearmonth = "209909";
var userParam = getUrlParam("userParam");
$(function() {
    $("#searchDate").val(new Date().format("yyyy-MM"));
    //首次进入请求最新数据
    dateTabel();
    console.log(userParam)
});

/*查询按钮点击方法*/
$("#searchBtn").click(function() {
    yearmonth = $("#searchDate").val().replace(/-/g, "");
    dateTabel();
})

/*导出按钮点击方法*/
$("#exportBtn").click(function() {
    yearmonth = $("#searchDate").val().replace(/-/g, "");
    window.open("http://132.90.101.202/lbsapi/dloc/ba_process/exportAcceptAuditDetail?" +
        "time=1567667481000&areaName=all&yearmonth=" + yearmonth + "&userParam=" + userParam);
})
function dateTabel() {
    $("#assessTable").bootstrapTable('destroy')
    $('#assessTable').bootstrapTable({
        //url: "http://132.77.114.86:8823/lbsapi/dloc/ba_process_cs/queryAcceptAuditDetail?time=1567667481000&areaName=all&yearmonth=" + yearmonth + "&loginaccount=" + loginaccount
        url:"http://132.90.101.202/lbsapi/dloc/ba_process/queryAcceptAuditDetail?time=1567667481000&areaName=all&yearmonth=" + yearmonth + "&userParam=" + userParam
        ,
        toggle: "table"
        //			,height: 400
        ,
        async: false,
        method: 'get' //测试get 正式用post
        ,
        contentType: "application/x-www-form-urlencoded",
        queryParams: "queryParams",
        pagination: false,
        sidePagination: "server",
        pageNumber: "1",
        pageSize: "10"
        /*,pageList: "[5, 10, 20, 50 ]"*/
        ,
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        showColumns: false,
        search: false,
        searchAlign: "left",
        sortName: "menuid",
        sortOrder: "asc",
        queryParams: function(params) {
            /*return {
                userParam:locHref
            }*/
        },
        onLoadSuccess: function(data) { //加载成功时执行s

        },
        onLoadError: function() { //加载失败时执行
            console.info("加载数据失败");
        },
        responseHandler: function(res) { //获取数据解析
            console.log(res);
            var obj = {
                total: 0,
                rows: []
            }; //table表格需要
            if (res.state =="4003") {
                layer.msg(res.message, {
                    time: 2000 //2s后自动关闭
                });
                $("#exportBtn").attr("disabled", true);
                $("#searchBtn").attr("disabled", true);
                $("#searchDate").val("");
                $("#searchDate").attr("disabled","disabled");

            }
            if(res.state == "0000") {
                obj.total = res.rows.length;
                obj.rows = res.rows;
                var queryTime = res.yearmonth;
                $("#searchDate").val(queryTime.substring(0, 4) + "-" + queryTime.substring(4, 6));
                $("#exportBtn").attr("disabled", false);
            } else {
                $("#exportBtn").attr("disabled", true);
            }
            return obj;
        }
    });

}

//时间格式转换
Date.prototype.format = function(format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

        "S": this.getMilliseconds()
    };
    if(/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var i in args) {
        var n = args[i];
        if(new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};

//获取URL
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值 encodeURI()编码/decodeURI()解码
}