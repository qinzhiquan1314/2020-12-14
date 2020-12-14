/**
 * 超时订单日通报表
 */
//报表标识
var reportKey;

//查询的URL地址
var searchUrl;

//查询日期
var reportDate

/*根据接口请求数据并展示*/
/*每个方法的调用不同，当有数据的时候数据的展示和数据的格式需要根据传入的进行调整*/
function dateTabel(reportKey,reportDate,searchUrl){
    $("#"+reportKey+"Table").bootstrapTable('destroy')
    $("#"+reportKey+"Table").bootstrapTable({
        url:searchUrl
        /*向后台请求的方法接口*/
        //url:getOutUrl(getRootPath_web(), "/report/find?userParam="+getUrlParam("userParam")+"&reportDate="+reportDate+"&saleArea="+saleArea+"&reportKey="+reportKey)
        ,toggle: "table"
        ,height: 400
        ,method: 'post'  //测试get 正式用post
        ,contentType: "application/x-www-form-urlencoded"
        ,queryParams: "queryParams"
        ,pagination: false
        ,sidePagination: "server"
        ,pageNumber: "1"
        ,pageSize: "10"
        /*,pageList: "[5, 10, 20, 50 ]"*/
        ,showRefresh: false
        ,showToggle: false
        ,showPaginationSwitch: false
        ,showColumns: false
        ,search: false
        /*,async:false*/
        ,searchAlign: "left"
        ,queryParams: function (params) {
            return {
                reportDate:reportDate,
                userParam:getUrlParam("userParam"),
                reportKey:reportKey
            }
        }
        ,onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
        }
        ,onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        }
        ,responseHandler: function(res){//获取数据解析
            console.log(res);
            var obj = {total:0,rows:[]};//table表格需要
            console.log(res.state);
            obj.total = res.total;
            if(res.state=="0"){
                obj.total="0";
            }
            $("#"+reportKey+"Div").css('display','block');
            $("#"+reportKey+"Date").html(obj.total);
            obj.rows = res.rows;
            console.info("responseHandler:"+obj);
            return obj;
        }
    });
}
/*界面点击进来的展示*/
$(function () {
    var date = new Date();
    date.setDate(date.getDate()-1); //设置天数 -1
    var originDate = date.format("yyyy-MM-dd");
    $("#overTimeOnDate").val(originDate); //线上
    /*$("#overTimeOffDate").val(originDate); //线下*/

    var reportDate = $("#overTimeOnDate").val();
    reportKey="overTimeOnDayByGrid";
    searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate);
    /*调用数据展示的方法*/
    console.log(reportKey);
    console.log(reportDate);
    console.log(searchUrl);
    dateTabel(reportKey,reportDate,searchUrl);

    reportKey="overTimeOffDayByGrid";
    searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate);
    /*调用数据展示的方法*/
    dateTabel(reportKey,reportDate,searchUrl);
});

/*查询按钮点击方法*/
//线上
$("#searchBtn").click(function(){
    var reportDate = $("#overTimeOnDate").val();
    reportKey="overTimeOnDayByGrid";
    searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate);
    /*调用数据展示的方法*/
    dateTabel(reportKey,reportDate,searchUrl);

    reportKey="overTimeOffDayByGrid";
    searchUrl=getOutUrl(getRootPath_web(), "/report/find?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate);
    /*调用数据展示的方法*/
    dateTabel(reportKey,reportDate,searchUrl);
})

/*导出按钮点击方法*/
//线上
$("#exportBtn").click(function(){
    var reportDate = $("#overTimeOnDate").val();
    /*调用后台导出的方法*/
    reportKey="overTimeOnDayByGrid";
    $.download(getOutUrl(getRootPath_web(), "/report/export?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate), 'post');
})

//线下
$("#exportBtn1").click(function(){
    var reportDate = $("#overTimeOnDate").val();
    /*调用后台导出的方法*/
    reportKey="overTimeOffDayByGrid";
    $.download(getOutUrl(getRootPath_web(), "/report/export?reportKey="+reportKey+"&userParam="+getUrlParam("userParam")+"&reportDate="+reportDate), 'post');
})



