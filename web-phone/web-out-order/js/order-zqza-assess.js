
/************对外-手机-政企障碍订单评价**********/

var current = "<img src='../../images/order/star_yellow.png'>"
var onCurrent = "<img src='../../images/order/star_yellow_empty.png'>"

/*//鼠标点击保持当前状态
$("#assessStar-shopping li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class","current").siblings().removeClass("current");
    order_satisfaction = $(this).attr("data-star")
    if($(this).attr('data-star') <= 6){
        $('#shopping-star').text('不满意')
    }
    else if( $(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8){
        $('#shopping-star').text('一般')
    }
    else if( $(this).attr('data-star') > 8 ){
        $('#shopping-star').text('满意')
    }
    if($("#assessStar-shopping li").hasClass('current') && $("#assessStar-cell li").hasClass('current') && $("#assessStar-service li").hasClass('current')){
        $('#submit_btn').text('提交评价')
        $('#submit_btn').css('background-color','#f7b135')
    }
})
$("#assessStar-cell li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class","current").siblings().removeClass("current");
    speed_satisfaction = $(this).attr("data-star")
    if($(this).attr('data-star') <= 6){
        $('#cell-star').text('不满意')
    }
    else if( $(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8){
        $('#cell-star').text('一般')
    }
    else if( $(this).attr('data-star') > 8 ){
        $('#cell-star').text('满意')
    }
    if($("#assessStar-shopping li").hasClass('current') && $("#assessStar-cell li").hasClass('current') && $("#assessStar-service li").hasClass('current')){
        $('#submit_btn').text('提交评价')
        $('#submit_btn').css('background-color','#f7b135')
    }
})
$("#assessStar-service li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class","current").siblings().removeClass("current");
    attitude_satisfaction  = $(this).attr("data-star")
    if($(this).attr('data-star') <= 6){
        $('#service-star').text('不满意')
    }
    else if( $(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8){
        $('#service-star').text('一般')
    }
    else if( $(this).attr('data-star') > 8 ){
        $('#service-star').text('满意')
    }
    if($("#assessStar-shopping li").hasClass('current') && $("#assessStar-cell li").hasClass('current') && $("#assessStar-service li").hasClass('current')){
        $('#submit_btn').text('提交评价')
        $('#submit_btn').css('background-color','#f7b135')
    }
})*/

/*产品评价 extLevel1
上门服务 extLevel2
施工速度 constructLevel
总体评价  extLevel4
*/

//获取路径中参数
var qryType= getUrlParam("qryType");
var qryNumber=getUrlParam("qryNumber");
var secCode=getUrlParam("secCode");
var phoneNum=getUrlParam("phoneNum");
var smcode=getUrlParam("smcode");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");

$(document).ready(function(){
    //初始化【五星评价】
    /*orderAssessObj.initServiceRaty();  //产品评价
    orderAssessObj.initFashionRaty();  //上门服务
    orderAssessObj.initConstructRaty();//施工速度*/
    //初始化评价
    /*$('#comment').val("");*/
    $('input[name="extLevel4"]').val("10");
   /* $('#doorService_submit_btn').text('请评价')
    $('#doorService_submit_btn').addClass('btn btn_search assessSubmit')
    //鼠标悬停在按钮上时判断
    $('#doorService_submit_btn').onmouseover = function()
    {
        if($('#comment').value=="")
        {
            $('#doorService_submit_btn').text('请评价')
            $('#doorService_submit_btn').addClass('btn btn_search assessSubmit')
            $('#doorService_submit_btn').onclick=function(){return false;};
        }else
        {
            $('#doorService_submit_btn').text('提交评价')
            $('#doorService_submit_btn').addClass('assessSubmitcurr')
            $('#doorService_submit_btn').onclick=function(){alert("hello");};
        }
    }*/

});

$.fn.serializeObject = function(para) {
    var serializeObj={}; // 目标对象
    var tempObj={};//临时对象
    var array=this.serializeArray(); // 转换数组格式
    if(para!=null&&para!=undefined){
        $.each(para,function(name,value) {
            array.push({name:name,value:value});
        });
    }
    console.log(para);
    console.log(array);
    $(array).each(function(){ // 遍历数组的每个元素 {name : xx , value : xxx}
        if(serializeObj[this.name]){
            // 判断对象中是否已经存在 name，如果存在name
            if($.isArray(serializeObj[this.name])){
                serializeObj[this.name].push(this.value);
                console.log(serializeObj[this.name])
            }else{
                // 将元素变为 数组
                serializeObj[this.name]=String([serializeObj[this.name],this.value]);
                console.log(serializeObj[this.name])
            }
        }else{
            //如果元素name不存在，添加一个属性 name:value
            if(this.name=='serviceStaff' || this.name=='serviceHall' || this.name=='serviceHotline'|| this.name=='serviceHotline'|| this.name=='serviceHotline'){
                serializeObj[this.name]=String([this.value]);
            }else{
                serializeObj[this.name]=this.value;
            }
        }
    });
    return serializeObj;
};
//本页面对象
var orderAssessObj = {
        //获取数据
        assessSubmit: function() {
            var paramsArr = $("#submitForm").serializeObject();
            paramsArr.balkno = qryNumber;
            console.log(paramsArr)
            $.ajax({
                type : 'POST',//测试  GET  生产POST
                async : true,
              /*  url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/ifmGovUserEvaluate?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07"+"&secCode="+secCode,*/
                url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/ifmGovUserEvaluate?userName="+userName+"&exCode="+exCode+"&callCode="+callCode+"&secCode="+secCode,
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(paramsArr),
                /*data: paramsArr,*/
                dataType : 'json',
                success : function(resData) {
                    console.log(resData)
                    if(resData == null) return;
                    if(resData.respCode == 200) {
                        layer.open({
                            content: '评价成功！'
                            ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
                            ,time: 3
                            ,end: function(e){
                                //成功后返回上一页
                                goBackUrl(getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-list.html?phoneNum="+phoneNum+"&smcode="+smcode));

                            }
                        });
                    } else {
                        layer.open({
                            content: '评价失败！'+resData.respDesc
                            ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
                            ,time: 3
                        });
                    }
                }
            });
        },

    //校验数据
    checkData: function() {
        /*var v1 = $('input[name="extLevel1"]').val();
        var v2 = $('input[name="extLevel2"]').val();
        var v3 = $('input[name="constructLevel"]').val();*/
        var v4 = $('input[name="extLevel4"]').val();
        var comment = $('#comment').val().trim();
        /*$('#comment').val(comment);*/
        console.log(v4)
        /*if (v1 == "" || v2 == "" || v3 == ""|| v4 == "" ) {
            layer.open({
                content: '请选择评价内容'
                ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
            return false;
        }*/
        if (comment != "" && getStringByteLength(comment) > 200) {
            layer.open({
                content: '您可填写0~200个字符（100个字）！'
                ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
            return false;
        }else if(v4<=8 &&comment == "" ){
            $("#comment").attr("placeholder","请您填写不满意的原因");
            layer.open({
                content: '请您填写不满意原因'
                ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
            return false;
        }
        else {
            return true;
        }
    },

    //五星评价 -产品评价
   initServiceRaty: function() {
        $('#demo-service').raty({
            score: 5,//默认选中第5个
            number: 5, //多少个星星设置
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web()+'/web-phone/images/order',//图片路径
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
    },

    //五星评价 -上门服务
   initFashionRaty: function() {
        $('#demo-fashion').raty({
            score: 5,//默认选中第5个
            number: 5, //多少个星星设置
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web()+'/web-phone/images/order',//图片路径
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
    } ,

    //五星评价 -施工速度
   initConstructRaty: function() {
        $('#demo-construct').raty({
            score: 5,//默认选中第5个
            number: 5, //多少个星星设置
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web()+'/web-phone/images/order',//图片路径
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
    },

}

//【发布】
$(".assessSubmitcurr").click(function(){
    if (orderAssessObj.checkData()) {
        orderAssessObj.assessSubmit();
    }
});

//改变背景颜色
$(".totalEval li").click(function(){
    var id = $(this).attr("id");
    $("#extLevel4").val(id);
    $("#"+id).addClass("li-on").removeClass("li-off");
    $("#"+id).siblings().addClass("li-off").removeClass("li-on");//brother
});



