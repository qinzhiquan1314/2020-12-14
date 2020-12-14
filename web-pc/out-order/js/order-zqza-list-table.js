/**************pc************/
//加载页面时查询
$(function(){
    orderListObj.initTable();
});
//本页面对象
var orderListObj = {
    //初始table数据
    initTable: function(){
            var str = sessionStorage.getItem("zqzaorderListData");
            var resData = JSON.parse(str);
            console.log(resData)
            if(resData){
                $('#table').bootstrapTable("destroy");
                $('#table').bootstrapTable({
                    data: resData
                })
                return false;
            }
    }
    ,actionFormatter: function(value, row, index) { //表格超链接  订单状态
        if(row.status == "已办结"){
            if(row.markFlag == "1"){
                return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">故障处理详情</a><a class="showHistory apa2">查看评价</a></p>';     //订单已完成已评价
            }else if(row.markFlag == "0"){
                return '<p class="a-p1 finish">订单完成</p><p class="a-p1"><a class="showFlow apa1">故障处理详情</a><a class="showAssess apa2">立即评价</a></p>'; //订单已完成未评价
            }
        }else if(row.status == "处理中"){
                return '<p class="a-p1">'+row.status+'</p><p class="a-p1"><a class="showFlow apa1" style="margin:0px 44px;">故障处理详情</a></p>';
        }else if(row.status == "工程师会按照约定的时间继续反馈进展"){
            return '<p class="a-p1">工程师会按照约定的时间继续反馈进展</p><p class="a-p1"><a class="showFlow apa1" style="margin:0px 44px;">故障处理详情</a></p>';
        }
    }
    ,numFormatter:function(value, row, index){
        var balkNo = checkNullOrEmptyStr(row.balkNo) ? "" :  row.balkNo;
        var stlNo = checkNullOrEmptyStr(row.stlNo) ? "" :  row.stlNo;
        if( balkNo !== ""){
            return '<p class="exTradeId" href="javascript:;">'+balkNo+'</p>';
        }else{
            return '<p class="exTradeId" href="javascript:;">'+stlNo+'</p>';
        }
    }
    ,stlFormatter:function(value, row, index){
        /*var balkNo = checkNullOrEmptyStr(row.balkNo) ? "" :  row.balkNo;*/
        var stlNo = checkNullOrEmptyStr(row.stlNo) ? "" :  row.stlNo;
        if( stlNo !== ""){
            return '<p class="exTradeId" href="javascript:;">'+stlNo+'</p>';
        }/*else{
            return '<p class="serialNumber" href="javascript:;">'+stlNo+'</p>';
        }*/
    }
    ,nameFormatter:function(value, row, index){
        var name = checkNullOrEmptyStr(row.allegeUnitName) ? "" :  row.allegeUnitName;
        if( name !== ""){
            return '<p class="exTradeId" href="javascript:;">'+checkLen(name)+'</p>';
        }
    }
    ,timeFormatter:function(value, row, index){
        var time = checkNullOrEmptyStr(row.acceptTime) ? "" :  row.acceptTime;
        if( time !== ""){
            return '<p class="exTradeId" href="javascript:;">'+time+'</p>';
        }
    }
    ,showRightLayer_assess: function(layerId,layerTitle,layerUrl) {
        layer.open({
            type: 2,
            id: layerId, //设定一个id，防止重复弹出
            title: layerTitle,//title: false, //不显示标题栏
            shadeClose: true,
            shade: 0,//背景  shade: 0.8
            area: ['490px', '98%'],
            offset: 'r',
            skin: 'a-layer', //
            content: layerUrl //iframe的url
            ,end: function () {
                    var str = sessionStorage.getItem("zqzaorderListData");
                    var resData = JSON.parse(str);
                    if(resData){
                        $('#table').bootstrapTable("destroy");
                        $('#table').bootstrapTable({
                            data: resData
                        })
                        // sessionStorage.removeItem('/order-search-validate/resData');
                        return false;
                    }

            }
        });

    }
}


/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
    //展示流程
    'click .showFlow': function(e, value, row, index) {
        var orderNum = row.balkNo;
        var secCode = row.secCode;
        var status = row.status;
        var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/flow-zqza-list.html?orderNum="+orderNum+"&secCode="+secCode+"&status="+status);
        showRightLayer("flow"+orderNum,"订单详情",htmlUrl);
    },
    //立即评价
    'click .showAssess' : function(e, value, row, index) {
        console.log(row)
        var orderNum = row.balkNo;
        var secCode = row.secCode;
        var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-zqza-assess-new.html?orderNum="+orderNum+"&secCode="+secCode);
        orderListObj.showRightLayer_assess("assess"+orderNum,"订单评价",htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
    },
    //展示已评价数据
    'click .showHistory' : function(e, value, row, index) {
        var orderNum = row.balkNo;
        var secCode = row.secCode;
        var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-zqza-assess-show-new.html?orderNum="+orderNum+"&secCode="+secCode);
        showRightLayer("assess-show"+orderNum,"我的评价",htmlUrl);
    }
}

