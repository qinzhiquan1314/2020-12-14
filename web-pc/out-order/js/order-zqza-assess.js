
/*************对外-PC-订单评价*********/
// 移网改版
var current = "<img src='../../images/order/star_yellow.png'>"
var onCurrent = "<img src='../../images/order/star_yellow_empty.png'>"
//鼠标点击保持当前状态
$("#assessStar-shopping li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class","current").siblings().removeClass("current");
    order_satisfaction = $(this).attr("data-star") ? $(this).attr("data-star") : ''
    if($(this).attr('data-star') <= 6){
        $('#shopping-star').text('不满意')
    }
    else if( $(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8){
        $('#shopping-star').text('一般')
    }
    else if( $(this).attr('data-star') > 8 ){
        $('#shopping-star').text('满意')
    }
    if($("#assessStar-shopping li").hasClass('current') || $("#assessStar-cell li").hasClass('current') || $("#assessStar-service li").hasClass('current')){
        $('#submit_btn').text('提交评价')
        $('#submit_btn').addClass('assessSubmitcurr')
    }
})
$("#assessStar-cell li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class","current").siblings().removeClass("current");
    speed_satisfaction =$(this).attr("data-star") ? $(this).attr("data-star") : ''
    if($(this).attr('data-star') <= 6){
        $('#cell-star').text('不满意')
    }
    else if( $(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8){
        $('#cell-star').text('一般')
    }
    else if( $(this).attr('data-star') > 8 ){
        $('#cell-star').text('满意')
    }
    if($("#assessStar-shopping li").hasClass('current')  || $("#assessStar-cell li").hasClass('current')  || $("#assessStar-service li").hasClass('current')){
        $('#submit_btn').text('提交评价')
        $('#submit_btn').addClass('assessSubmitcurr')
    }
})
$("#assessStar-service li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class","current").siblings().removeClass("current");
    attitude_satisfaction  = $(this).attr("data-star") ? $(this).attr("data-star") : ''
    if($(this).attr('data-star') <= 6){
        $('#service-star').text('不满意')
    }
    else if( $(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8){
        $('#service-star').text('一般')
    }
    else if( $(this).attr('data-star') > 8 ){
        $('#service-star').text('满意')
    }
    if($("#assessStar-shopping li").hasClass('current') || $("#assessStar-cell li").hasClass('current') || $("#assessStar-service li").hasClass('current')){
        $('#submit_btn').text('提交评价')
        $('#submit_btn').addClass('assessSubmitcurr')
    }
})



/*产品评价 extLevel1
上门服务 extLevel2
施工速度 constructLevel
总体评价  extLevel4
*/

//获取路径中参数
var orderNum=getUrlParam("orderNum");
var secCode=getUrlParam("secCode");
var phoneNum=getUrlParam("phoneNum");
var smcode=getUrlParam("smcode");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");

$(document).ready(function(){
    //初始化【五星评价】
    orderAssessObj.initServiceRaty();
    orderAssessObj.initFashionRaty();
    orderAssessObj.initConstructRaty();
  /*  $("#comment").val("");*/
    //兼容ie
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
            // 如果元素name不存在，添加一个属性 name:value
            if(this.name=='serviceStaff' || this.name=='serviceHall' || this.name=='serviceHotline'|| this.name=='serviceHotline'|| this.name=='serviceHotline'|| this.name=='satisfactionNo'){
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
    //获取数据   提价按钮
    assessSubmit: function() {
        var paramsArr = $("#submitForm").serializeObject();
        paramsArr.balkno = orderNum;
        //PC特殊处理
        for(var i=0;i<paramsArr.length;i++) {
            var name = paramsArr[i].name;
            var value = paramsArr[i].value;
            if (name == "comment" && value != "" && value.indexOf("请留下") > -1 ) {
                paramsArr[i].value = "";
            }
        }
        console.log(paramsArr)
            $.ajax({
                type : 'POST',//测试  GET  生产POST
                async : true,
               /* url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/ifmGovUserEvaluate?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07"+"&secCode="+secCode,*/
                url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/out-order/page/ifmGovUserEvaluate?userName="+userName+"&exCode="+exCode+"&callCode="+callCode+"&secCode="+secCode,
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(paramsArr),
                /*data: paramsArr,*/
                dataType : 'json',
                success : function(resData) {
                    if(resData == null) return;
                    console.log(JSON.stringify(resData));
                    if(resData.respCode == 200) {
                        var str = sessionStorage.getItem("zqzaorderListData");
                        if(str){
                            var arr = JSON.parse(str);
                            for(var i=0;i<arr.length;i++) {
                                if(arr[i].balkNo == orderNum){
                                    arr[i].markFlag = 1;
                                }
                            }
                            var data = JSON.stringify(arr)
                            sessionStorage.setItem("zqzaorderListData",data);
                        }
                        layer.msg('评价成功！', {
                            time: 2000 //2s后自动关闭
                            ,shadeClose: false
                            ,shade:0.8
                            ,end: function(e){
                                //当你在iframe页面关闭自身时
                                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                parent.layer.close(index); //再执行关闭
                                /*href = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-zqza-list-table.html?phoneNum="+phoneNum+"&smcode="+smcode);
                                window.location.href = href;*/
                            }
                        });

                    } else {
                        layer.msg('评价失败！'+resData.respDesc, {
                            time: 2000 //2s后自动关闭
                        });
                    }
                }
            });
        }
    //校验数据
    ,checkData: function() {
        var v4 = $('input[name="extLevel4"]').val();
        var comment = $('#comment').val();
        $('#comment').val(comment);
        if (comment != "" && getStringByteLength(comment) > 200) {
            layer.open({
                content: '您可填写0~200个字符（100个字）！'
                ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,time: 2000
            });
            return false;
        }else if(v4<=8 &&comment == "" ){
            $("#comment").attr("placeholder","请您填写不满意的原因");
            layer.open({
                content: '请您填写不满意原因'
                ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,time: 2000
            });
            return false;
        }
        else {
            return true;
        }

    }
    //五星评价 -产品评价
    ,initServiceRaty: function() {
        $('#demo-service').raty({
            score: 5,//默认选中第5个
            number: 5, //多少个星星设置
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
    ,initFashionRaty: function() {
        $('#demo-fashion').raty({
            score: 5,//默认选中第5个
            number: 5, //多少个星星设置
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
    //五星评价 -施工速度
    ,initConstructRaty: function() {
        $('#demo-construct').raty({
            score: 5,//默认选中第5个
            number: 5, //多少个星星设置
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
}

//【提交】
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

