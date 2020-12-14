
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

var qryType=getUrlParam("qryType");
var qryNumber=getUrlParam("qryNumber");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");

function loadListDate() {
    var url;
    if(qryType == "phoneNumber"){
        url="https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode
        console.log(111111111111)
    }
    else{
        url="https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode
    }
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
     /*   url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkIndex2?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
      /*  url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-in-order/page/balkIndex2?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,*/
        url:url,
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "qryType": qryType ,
            "qryNumber" : qryNumber
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
    window.location.href=href2;
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
            var href1=getOutUrl(getRootPath_web(),"/web-phone/web-in-order/page/flow-zqza-list.html?balkNo="+balkNo+"&secCode="+secCode+"&status="+status);//故障处理详情
            var href2 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-assess.html?qryType=balkNo&qryNumber="+balkNo+"&secCode="+secCode);//立即评价
            var href3 = getOutUrl(getRootPath_web(),"/web-phone/web-in-order/page/order-zqza-assess-show.html?qryType=balkNo&qryNumber="+balkNo);//查看评价
        }else{
            var href1=getOutUrl(getRootPath_web(),"/web-phone/web-in-order/page/flow-zqza-list.html?balkNo="+stlNo+"&secCode="+secCode+"&status="+status);//故障处理详情
            var href2 = getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/flow-order-zqza-assess.html?qryType=balkNo&qryNumber="+stlNo+"&secCode="+secCode);//立即评价
            var href3 = getOutUrl(getRootPath_web(),"/web-phone/web-in-order/page/order-zqza-assess-show.html?qryType=balkNo&qryNumber="+stlNo);//查看评价
        }




     /*   if(balkNo !== ""){
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">故障受理单号：</span>'+balkNo+'</li>'
        }else{
            var tradeNum = '<li class="hh1 line"><p class="hh1p"></p><span class="hh1sp">故障受理单号:</span>'+stlNo+'</li>'
        }
        var strHtml = '<ul>' + tradeNum +
            '<li class="hh3 line"><span class="hh3sp">客户名称：</span>'+allegeUnitName+'</li>';

        //根据订单状态 显示评价区域
        if (status == "已办结"){
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span>'+status+'</div>';
           /!* var  strA = '<div class="fr rb"><a  onclick="evaluateBefore(\''+balkNo+'\' ,\''+href2+'\')">立即评价</a></div>';*!/
            var strB = '<div class="fr ra"><a   href="'+href3+'">查看评价</a></div>';
            if(markFlag == "1"){
                strHtml += statusStr + strB+ '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
            }else{
                strHtml += statusStr + '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
            }
            strHtml += '<li class="hh5 line"><span>'+statusDesc+'</span></li>';
        }	else if(status  == "暂停" ){
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span>'+status+'</div>';
            strHtml +=statusStr + '<li class="hh5 line"><span class="hh5sp2">'+statusDesc+'</span></li>' + '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
            strHtml += '<li class="hh5 line"><span>'+statusDesc+'</span></li>';
        }else if(status  == "处理中" ){
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span>'+status+'</div>';
            strHtml += statusStr +  '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
        }
        /!*strHtml += '<li class="hh5 line"><span>'+statusDesc+'</span></li>';*!/
        strHtml += '<li class="hh6 line"><div class="hhd6 color-hiu"><span class="frcl">受理时间：</span>'+acceptTime+'</div></li>' +
            '</ul>';*/

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
            var strB = '<div class="fr ra"><a   href="'+href3+'">查看评价</a></div>';
            if(markFlag == "1"){
                strHtml += statusStr + strB+ '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
            }else{
                strHtml += statusStr + '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
            }
            strHtml += '<li class="hh5 line"><span>'+statusDesc+'</span></li>';
        }	else if(status  == "工程师会按照约定的时间继续反馈进展" ){
            var statusStr = '<li class="hh4 line"><div class="fl color-hiu hh4d"><span  class="hh4dsp">故障单状态：</span></div>';
            strHtml +=statusStr + '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
            strHtml += '<li class="hh5 line"><span>'+status+'：</span>'+statusDesc+'<span></span></li>';
        }else if(status  == "处理中" ){
            var statusStr = '<li class="hh5 line"><div class="fl color-hiu hh5d"><span  class="hh5dsp">故障单状态：</span>'+status+'</div>';
            strHtml += statusStr +  '<div class="fr ra1"><a  href="'+href1+'">故障处理详情</a></div></li>';
        }
        strHtml += '<li class="hh6 line"><div class="hhd6 color-hiu"><span class="frcl">受理时间：</span>'+acceptTime+'</div></li>' +
            '</ul>';

        $(".listArea").append(strHtml);

        //单页面特殊处理广告位重新加载
        advertPosition();
    });
}