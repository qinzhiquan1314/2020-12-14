
/*************对外-PC-订单评价-查看*********/
/*产品评价 extLevel1
上门服务 extLevel2
施工速度 constructLevel
总体评价 extLevel4*/

//获取路径中参数
var orderNum = getUrlParam("orderNum");//订单号
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");
//本页面对象
var orderAssessObj = {
    //获取数据
    assessAjax: function() {
        $.ajax({
            type: 'POST',//测试  GET  生产POST
            async: true,
            /*url: "https://wxzc.bjunicom.com.cn/queryCenter/ifm/ifmGovUserEvaluateGet?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
            url: "https://wxzc.bjunicom.com.cn/queryCenter/web-pc/in-order/page/ifmGovUserEvaluateGet?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "balkno": orderNum
            }),
            dataType: 'json',
            success : function(resData) {
                /*console.log(resData)*/
                if(resData == null) return;
                var state = resData.respCode;
                if(state == 200) {
                    if(resData.evaluate != null || resData.evaluate != undefined) {
                        console.log(resData.evaluate);
                        orderAssessObj.initData(resData.evaluate);
                    } else {
                        console.log(55555)
                        layer.msg('获取信息失败！', {
                            time: 2000 //2s后自动关闭
                            ,shadeClose: false
                            ,shade:0.8
                        });
                    }
                } else {
                    console.log(66666)
                    layer.msg('获取信息失败！', {
                        time: 2000 //2s后自动关闭
                    });
                }
            }
        });
    }
    //五星评价 -产品评价
    ,initServiceRaty: function(num) {
        $('#demo-service').raty({
            score: num,//默认选中第5个
            number: 5, //多少个星星设置
            readOnly: true,//只读
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web()+'/images/order',//图片路径
            hints: ['非常差','差', '一般', '好', '非常好'],
            starOff: 'a-off.png',
            starOn: 'a-on.png',
            target: '#hint-service',//目标div
            scoreName: "extLevel1",// 提交表单name
            cancel: false,
            targetKeep: true,
            targetText: '请评分',//无评价提示
            click: function(score, evt) {
            }
        });
    }
    //五星评价 -上门服务
    ,initFashionRaty: function(num) {
        $('#demo-fashion').raty({
            score: num,//默认选中第5个
            number: 5, //多少个星星设置
            readOnly: true,//只读
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web()+'/images/order',//图片路径
            hints: ['非常差','差', '一般', '好', '非常好'],
            starOff: 'a-off.png',
            starOn: 'a-on.png',
            target: '#hint-fashion',// 目标div
            scoreName: "extLevel2",// 提交表单name
            cancel: false,
            targetKeep: true,
            targetText: '请评分',//无评价提示
            click: function(score, evt) {
            }
        });
    }
    //五星评价 -服务水平
    ,initConstructRaty: function(num) {
        $('#demo-construct').raty({
            score: num,//默认选中第5个
            number: 5, //多少个星星设置
            readOnly: true,//只读
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web()+'/images/order',//图片路径
            hints: ['非常差','差', '一般', '好', '非常好'],
            starOff: 'a-off.png',
            starOn: 'a-on.png',
            target: '#hint-construct',// 目标div
            scoreName: "constructLevel",// 提交表单name
            cancel: false,
            targetKeep: true,
            targetText: '请评分',//无评价提示
            click: function(score, evt) {
            }
        });
    }
    ,initTotalRaty: function(num){
        $("#"+num).addClass("li-on").removeClass("li-off");
    }
    //初始化数据
    ,initData: function(data) {
        var v1 = data.eq1;  //产品评价
        var v2 = data.eq2; //上门服务
        var v3 = data.eq3;  //施工速度
        var comment = data.eqContent;
        var current = "<img src='../../images/order/star_yellow.png'>"
        var onCurrent = "<img src='../../images/order/star_yellow_empty.png'>"
        function star(fn1,fn2) {
            if(fn1 <= 6){
                $(fn2).text('不满意')
            }
            else if(fn1 > 6 && fn1 <= 8){
                $(fn2).text('一般')
            }
            else if(fn1  > 8 ){
                $(fn2).text('满意')
            }
        }
        var extLevel4 = data.eqSummary;
        if(extLevel4 != undefined && extLevel4){
            $('#doorService li:nth-child('+ extLevel4+ ')').html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
            star(extLevel4,'#doorService-star')
            // q2-q3 q4回显
            if(extLevel4<=8){
                $('#txc-txt').addClass('disBlock').removeClass('disNone')
            }
            else if(extLevel4 > 6 && extLevel4 <= 8) {
                $('#q3').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
            }
            else if(extLevel4 > 8) {
                $('#q4').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
            }
        }
        var flag = (v1 != undefined && v2 != undefined && v3 != undefined);
        if(flag) {
            //初始化【五星评价】
            orderAssessObj.initServiceRaty(v1);
            orderAssessObj.initFashionRaty(v2);
            orderAssessObj.initConstructRaty(v3);
            orderAssessObj.initTotalRaty(extLevel4);
        }
        //产品评价
        if (v1 == undefined || checkNullOrEmptyStr(v1)){
            $("#service").hide();
        } else {
            $("#service").show();
            orderAssessObj.initServiceRaty(v1);
        }
        //服务水平
        if (v3 == undefined || checkNullOrEmptyStr(v3)){
            $("#construct").hide();
        } else {
            $("#construct").show();
            orderAssessObj.initConstructRaty(v3);
        }
        if(!checkNullOrEmptyStr(comment) && comment != undefined) {
            $("#comment").val(comment);
        }
    }
}


$(document).ready(function(){
    orderAssessObj.assessAjax();
});

