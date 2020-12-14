
/*********************对外-手机-政企障碍单列表*************************/


$(document).ready(function(){
    loadListDate();
    //加载高度
    //hh();
});
//加载高度
function hh(){
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var fon =   oWidth*20/720 ;
    //console.log(fon)
    //获取页面高度
    var a =  $(document).height();
    //  console.log(a);
    var c = a-200;
    var hh = c/fon+'rem';
    $("#listid").css("minHeight",hh)
}

var phoneNum=getUrlParam("phoneNum");
var smcode=getUrlParam("smcode");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");

function loadListDate() {
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
        url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
       /* url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,*/
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "phoneNumber": phoneNum ,
            "smcode":smcode
        }),
        dataType : 'json',
        beforeSend: function () {
            showLoader();
        },
        complete:function(){
            hideLoader();
        },
        success : function(resData) {
            if(resData == null) return;
            var state = resData.respCode;
            if(state == 200) {
                getListDate(resData.data);
            }else{
                layer.open({
                    content: '此号码无数据'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }

        }
    });
}


function evaluateBefore(balkNo,href2) {
    console.log(111111);
    window.location.href=href2;
    /*var orderListUrl = getOutUrl(getRootPath_web(),"/evaluation/alertEvaluation?flag=out&orderNum="+orderNum);
    $.ajax({
        type : 'POST',//测试  GET  生产POST
        async : true,
        url: orderListUrl,
        dataType : 'json',
        beforeSend: function () {
            showLoader();
        },
        complete:function(){
            hideLoader();
        },
        success : function(resData) {
            if(resData == null) return;
            var state = resData.state;
            if(state == 1) {
                flag=0;
                window.location.href=href2+"&flag="+flag+"&phoneNum="+phoneNum;
            } else if(state == 2){
                flag = 0;
                phoneNum=resData.phoneNum;
                window.location.href=href2+"&flag="+flag+"&phoneNum="+phoneNum;
            } else if(state == 0){
                layer.open({
                    content: resData.message
                    ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }
        },
        error: function () {// 未成功发送，提醒发送不成功
            layer.open({
                content: '系统原因'
                ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
        }
    });*/
}
//加载数据
function getListDate(data) {
    console.log(data)
    $.each(data, function(index,item) {
        //订单状态status : 处理中|暂停|办结
        //评价状态markFlag: 0表示未未评价，按钮为立即评价；1为已评价，按钮为显示评价
        var balkNo = checkNullOrEmptyStr(item.balkNo) ? "" :  item.balkNo;//故障单号（IFM）
        console.log(balkNo)
        var fbalkNo = checkNullOrEmptyStr(item.fbalkNo) ? "" :  item.fbalkNo;//故障单号（客服系统）
        var allegeCustPhone = checkNullOrEmptyStr(item.allegeCustPhone) ? "" :  item.allegeCustPhone; //申告人联系电话
        var statusDesc = checkNullOrEmptyStr(item.statusDesc) ? "" :  item.statusDesc; //状态描述
        var markFlag =  checkNullOrEmptyStr(item.markFlag) ? "" :  item.markFlag;//评价状态
        var allegeCustName = checkNullOrEmptyStr(item.allegeCustName) ? "" :  item.allegeCustName;//申告人姓名
        var stlNo = checkNullOrEmptyStr(item.stlNo) ? "" :  item.stlNo;//业务号码
        var acceptTime = checkNullOrEmptyStr(item.acceptTime) ? "" :  item.acceptTime;//故障单受理时间
        var custType = checkNullOrEmptyStr(item.custType) ? "" :  item.custType;//客户类型
        var allegeContent = checkNullOrEmptyStr(item.allegeContent) ? "" :  item.allegeContent;//申告内容
        var allegeUnitName = checkNullOrEmptyStr(item.allegeUnitName) ? "" :  item.allegeUnitName;//申告单位信息
        var status = checkNullOrEmptyStr(item.status) ? "" :  item.status;//故障单状态
        var secCode=checkNullOrEmptyStr(item.secCode) ? "" :  item.secCode;//加密


        if(balkNo !== ""){
            var href1=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/flow-zqza-list.html?balkNo="+balkNo+"&secCode="+secCode+"&status="+status);//故障处理详情
            var href2 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-assess-new.html?qryType=balkNo&qryNumber="+balkNo+"&secCode="+secCode+"&phoneNum="+phoneNum+"&smcode="+smcode);//立即评价
            var href3 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-assess-show-new.html?qryType=balkNo&qryNumber="+balkNo);//查看评价
        }else{
            var href1=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/flow-zqza-list.html?balkNo="+stlNo+"&secCode="+secCode+"&status="+status);//故障处理详情
            var href2 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-assess-new.html?qryType=balkNo&qryNumber="+stlNo+"&secCode="+secCode+"&phoneNum="+phoneNum+"&smcode="+smcode);//立即评价
            var href3 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-assess-show-new.html?qryType=balkNo&qryNumber="+stlNo);//查看评价
        }




        if(balkNo !== ""){
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">故障受理单号：</span>'+balkNo+'</li>'
        }
        if(stlNo !== ""){
            var stlNum = '<li class="hh3 line"><span class="hh3sp">业务号码：</span>'+stlNo+'</li>';
        }else{
            var stlNum = '<li class="hh3 line"><span class="hh3sp">业务号码：<span>无</span></span>'+'</li>';
        }
        var strHtml = '<ul>' + tradeNum +
            '<li class="hh2 line"><span class="hh2sp">客户名称：</span><span class="hh2sp2">' + allegeUnitName + '</span></li>' ;
        strHtml += stlNum;

        //根据订单状态 显示评价区域
        if (status == "已办结"){
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span>'+status+'</div>';
            var  strA = '<div class="fr rb"><a  onclick="evaluateBefore(\''+balkNo+'\' ,\''+href2+'\')">立即评价</a></div>';
            var strB = '<div class="fr ra"><a   href="'+href3+'">查看评价</a></div>';
                strHtml += statusStr + (markFlag == "0"  || markFlag == "1"  ?  strB: strA) + '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
           /* strHtml += '<li class="hh5 line"><span>'+statusDesc+'</span></li>';*/
        } else if(status  == "工程师会按照约定的时间继续反馈进展" ){
                var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span></div>';
                strHtml +=statusStr + '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
                strHtml += '<li class="hh5 line"><span>'+status+'：</span>'+statusDesc+'<span></span></li>';
        }else if(status  == "处理中" ){
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span>'+status+'</div>';
            strHtml += statusStr +  '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
        }
        strHtml += '<li class="hh6 line"><div class="hhd6 color-hiu"><span class="frcl">受理时间：</span>'+acceptTime+'</div></li>' +
            '</ul>';

        $(".listArea").append(strHtml);

        //单页面特殊处理广告位重新加载
        advertPosition();
    });
}