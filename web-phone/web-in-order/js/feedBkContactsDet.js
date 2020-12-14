/**
 * 从URL中获取数据
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


/**
 * 点击联系我们返回按钮，返回在线反馈界面
 */
$("#return").click(function () {
    window.history.back();
});

/**
 * 界面加载
 */
$(function () {
    enumField=GetQueryString("contects_type");
    dateTabel(GetQueryString("contects_type"));
});

/**
 * 报表展示联系人信息
 * @param reportDate
 * @param saleArea
 */
function dateTabel(enumField){
    $("#table").bootstrapTable('destroy')
    $('#table').bootstrapTable({
        url:getOutUrl(getRootPath_web(), "/report/findForFeedbackContacts?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D"
            +"&enumField="+enumField)
        ,toggle: "table"
        ,method: "post"  //测试get
        ,contentType: "application/x-www-form-urlencoded"
        /*,queryParams: "queryParams"*/
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
        }
        ,onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        }
        ,responseHandler: function(res){//获取数据解析

            var obj = {total:0,rows:[]};//table表格需要
            console.log(res.rows[0].phone_num);
            var phone_num;
            for(var i=0;i<res.rows.length;i++){
                phone_num=res.rows[i].phone_num;
                if(phone_num.search("、") != -1){ //含有多个号码
                    var arr=phone_num.split("、<br>");
                    arr[0]='<a href="tel:'+arr[0]+'" style="text-decoration: underline">'+arr[0]+'</a>';
                    console.log(arr[0])
                    arr[1]='<a href="tel:'+arr[1]+'" style="text-decoration: underline">'+arr[1]+'</a>';
                    console.log(arr[1])
                    res.rows[i].phone_num=arr.join('、<br>');
                }else {
                    res.rows[i].phone_num='<a href="tel:'+phone_num+'" style="text-decoration: underline">'+phone_num+'</a>';
                }
            }
            obj.rows = res.rows
            return obj;
        }
    });
}