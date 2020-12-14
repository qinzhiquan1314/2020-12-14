/************对内-PC-流程查询**************/
$(document).ready(function () {
    //进入页面加最小高度panelB
    setScreenHeight1('.panelB', "headBox");
    window.onresize = function () {
        setScreenHeight1('.panelB', "headBox");
    };
    //初始加载该页面获取orderNum直接查询
    testTbObj.getDate();
});
//监听浏览器的后退事件
$(document).ready(function (e) {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            var hashLocation = location.hash;
            var hashSplit = hashLocation.split("#!/");
            var hashName = hashSplit[1];
            if (hashName !== '') {
                var hash = window.location.hash;
                if (hash === '') {
                    //调用自己的后退事件
                    goBack();
                }
            }
        });
    }
});
$(function () {
    //input 提示语 placeholder ie兼容初始化
    inputInit();
});

/*placeholder兼容IE方法*/
function inputInit() {
    placeholder("#jobName");
}
var orderNum = getUrlParam("orderNum");//订单号
var secCode = getUrlParam("secCode");
var status = getUrlParam("status");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var name = getUrlParam("name");
//本页面对象
var testTbObj = {
    //变量
    getDate: function () {
        $.ajax({
            type: 'POST',//测试  GET  生产POST
            async: true,
            /*  url: "https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkFlowList?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
            url: "https://wxzc.bjunicom.com.cn/queryCenter/web-pc/in-order/page/balkFlowList?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "balkNo": orderNum
            }),
            dataType: 'json',
            beforeSend: function () {
                showLoader();
            },
            complete: function () {
                hideLoader();
            },
            success: function (resData) {
                console.log(resData)
                if (resData == null) return;
                var state = resData.respCode;
                var balkno = resData.balkno;
                var stlno =resData.stlNo;
                if (state == 200) {
                    var data = JSON.stringify(resData.data)
                    /*  console.log(data)*/
                    sessionStorage.setItem("zqzainpcorderListData",data);
                    /* window.location.href=getOutUrl(getRootPath_web(),"/web-pc/in-order/page/order-zqza-list-table.html?qryNumber="+exTradeId);*/
                    $('.detail_sty').empty();
                    var str ='';
                    if(resData.hasEngineer==true){
                        console.log(111);
                        resData.engineerInfo.forEach(function (ele, index) {
                            console.log(ele)
                            str+=
/*                                "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 orderNum2\" style='display: inline-block'>" + "<span class=\"Detail-namespan\" style='margin-bottom: 10px;display: inline-block'>"+ele.engineerType+"</span>"+ "<span class=\"Detail-numspan\" style='margin-bottom:10px;display: inline-block'>"+ele.engineerTypeDesc+"</span>" + "<span class=\"Detail-numspan\" style='padding-left: 0px ;margin-bottom: 10px;display: inline-block'>"+"," +"</span>"+"<span class=\"Detail-numspan\" style='margin-bottom: 10px;display: inline-block'>"+ele.engineerInfoDesc+"</span>" + "</div>" + "</li>"*/
                            "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 orderNum2\" style='display: inline-block;height: auto'>" + "<span class=\"Detail-namespan\" style='margin-bottom: 10px;'>"+ele.engineerType+"</span>"+ "<span class=\"Detail-numspan\" style='margin-bottom:10px;'>"+ele.engineerTypeDesc+","+ele.engineerInfoDesc+"</span>" + "</div>" + "</li>"
                        })
                    }
                    var detailArea =
                        "<ul class='clearfix'>"+
                        '<div style="float:left; width: 50%">'+
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 orderNum2\" style='display: inline-block;height: auto'>" + "<span class=\"Detail-namespan\">" + "受理单号：" + "</span>" + "<span class=\"Detail-numspan\">" + balkno + "</span>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 arr_add\" style='display: inline-block;height: auto'>" + "<span class=\"Detail-namespan\">" + "客户名称：" + "</span>" + "<span class=\"Detail-numspan\">" + name + "</span>" + "</div>" + "</li>" +
                        str+
                        '</div>'+
                        '<div style="float:left; width: 50%; padding-right: 20px;">'+
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 orderNum2\" style='display: inline-block;height: auto'>" + "<div class=\"Detail-namespan fl\">" + "业务号码：" + "</div>" + "<div class=\"Detail-numspan\" style='padding-left: 88px'>" + stlno + "</div>" + "</div>" + "</li>" +
                        "<li class=\"Detail-li\">" + "<div class=\"Detail-div2 arr_add\" style='display: inline-block;height: auto'>" + "<div class=\"Detail-namespan fl\">" + "故障单状态：" + "</div>" + "<div class=\"Detail-numspan\" style='padding-left: 88px'>" + status + "</div>" + "</div>" + "</li>" +
                        '</div>'+
                        "</ul>"
                    $('.detail_sty').append(detailArea);
                    if (name) {
                        $(".name").addClass('show');
                    } else {
                        $(".name").addClass('hide');
                    }
                    if (balkno) {
                        $(".balkno").addClass('show');
                    } else {
                        $(".balkno").addClass('hide');
                    }
                    if (stlno) {
                        $(".stlno").addClass('show');
                    } else {
                        $(".stlno").addClass('hide');
                    }
                    if (status ) {
                        $(".status ").addClass('show');
                    } else {
                        $(".status").addClass('hide');
                    }
                    orderListObj.initTable();
                } else {
                    layer.open({
                        content: resData.respDesc
                        , style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                        , time: 3
                    });
                }
            }
        });
    }
}
var orderListObj = {
    //初始table数据
    initTable: function(){
        var str = sessionStorage.getItem("zqzainpcorderListData");
        var resData = JSON.parse(str);
        console.log(resData)
        var res = resData.jobInsts
        if(resData){
            $('#table').bootstrapTable("destroy");
            $('#table').bootstrapTable({
                data: res,
            })
            return false;
        }
    }
    ,dateFormatter:function(value, row, index){
        var createDate = checkNullOrEmptyStr(row.createDate) ? "" :  row.createDate;
        if(createDate !==""){
            return '<p class="exTradeId" href="javascript:;">'+createDate+'</p>';
        }
    }
    ,sysFormatter:function(value, row, index){
        var fromsys = checkNullOrEmptyStr(row.fromsys) ? "" :  row.fromsys;
        return '<p class="exTradeId" href="javascript:;">'+fromsys+'</p>';
    }
    ,stateFormatter:function(value, row, index){
        var state = checkNullOrEmptyStr(row.state) ? "" :  row.state;
        return '<p class="exTradeId" href="javascript:;">'+state+'</p>';
    }
    ,jobnameFormatter:function(value, row, index){
        var jobName = checkNullOrEmptyStr(row.jobName) ? "" :  row.jobName;
        return '<p class="exTradeId" href="javascript:;">'+jobName+'</p>';
    }
    ,remarkFormatter:function(value, row, index){
        var remark = checkNullOrEmptyStr(row.remark) ? "" :  row.remark;
        return '<p class="exTradeId" href="javascript:;">'+remark+'</p>';
    }
}


//【对外流程】按钮
$(".processBtn").click(function() {
    var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/in-order/page/flow-zqza-list.html?orderNum="+orderNum+"&secCode="+secCode+"&status="+status);
    showRightLayer("flow"+orderNum,"订单详情",htmlUrl);
});


//【返回上一页】按钮
$(".gobackBtn").click(function () {
    javascript: history.back(-1);
});
