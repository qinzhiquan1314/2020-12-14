/**
 * 点击联系我们返回按钮，返回在线反馈界面
 */
$("#returnBtn").click(function () {
    window.history.back();
});

/**
 *点击查看
 */
$(".ck").on("click",function(){
    var enumField=$(this).attr("title");
    console.log("ck获取的值是"+enumField);
    dateTabel(enumField);
    $("#phoDetail").show();
});


/**
 * 报表展示联系人信息
 * @param reportDate
 * @param saleArea
 */
function dateTabel(enumField){
    $("#table").bootstrapTable('destroy')
    $('#table').bootstrapTable({
        //url: "table.json"
        url:getOutUrl(getRootPath_web(), "/report/findForFeedbackContacts?userParam="+getUrlParam("userParam")+"&enumField="+enumField)
        ,toggle: "table"
        ,height: 370
        ,method: "post"  //测试get
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
        ,searchAlign: "left"
        ,sortName: "menuid"
        ,sortOrder: "asc"
        ,queryParams: function (params) {
            return {
                enumField:enumField,
                userParam:getUrlParam("userParam"),
            }
        }
        ,onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
            $(".fixed-table-body").css('height','370');
        }
        ,onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        }
        ,responseHandler: function(res){//获取数据解析

            var obj = {total:0,rows:[]};//table表格需要
            obj.rows = res.rows;
            console.info("responseHandler:"+obj);
            return obj;
        }
    });
}


/**
 *关闭弹框
 */
$(document).on("click", "#close", function () {
    $("#phoDetail").css('display','none');
});

/**
 * 鼠标移动，（查看）变黄色
 */
$('.ck').mouseout(function(){
    $(this).removeClass("orange").addClass("black");
}).mouseover(function(){
    $(this).removeClass("black").addClass("orange");
})
