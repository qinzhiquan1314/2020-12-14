
/*************  对外 手机 政企障碍订单查询 ************/
var locHref = window.location.href.substr(window.location.href.indexOf("?")+1);
var array= locHref.split("&");
var ParameterArra=[];
//得到一个二维数组
for(var i=0;i<array.length;i++){
    ParameterArra.push(array[i].split("="));
}
$(document).ready(function(){
    getOrderListLocalData();
    //沃易赚小程序添加返回页面
    if(ParameterArra[1][1]=="wyzin"||ParameterArra[1][1]=="wyzout"||ParameterArra[1][1]=="wysbz"){
        $("#backWechat").css("display","inline-block");
    }
});

var searchType=null;
//存  balkNo.受理单号 stlNo.业务号码 phoneNumber.手机号码
function setOrderListLocalData(qryType,qryNumber,balkNum,stlNum,phoneNum) {
    var obj = getLocalData("web-out/order-zqza-list");
    if (obj == null) {
        obj = {qryType:"",qryNumber:"",balkNum:"",stlNum:"",phoneNum:""};
    }
    obj.qryType = qryType;
    if (qryType == "balkNo") {
        obj.qryNumber = balkNum;
    }
    else if(qryType == "stlNo") {
        obj.qryNumber = stlNum;
    }
    else if(qryType == "phoneNumber") {
        obj.phoneNum = phoneNum;
    }

    setLocalData("web-in/order-zqza-list",obj);
}

//取 (并给页面input赋值)
function getOrderListLocalData() {
    var obj = getLocalData("web-in/order-zqza-list");
    var str = '<img src="../../images/order/web-li.png"/>';
    if (obj != null) {
        var qryType = obj.qryType;//
        var balkNum = obj.balkNum;
        var stlNum =obj.stlNum;
        var phoneNum = obj.phoneNum;
        $("#balkNo").val(balkNum);
        $("#stlNo").val(stlNum);
        $("#phoneNum").val(phoneNum);
        if(qryType == "phoneNumber"){
            //小人显示
            var imgObj = $("#phoneNoSearch>a>img").length;
            if(!imgObj) {
                $("#phoneNoSearch>a").prepend(str);
            }
            $("#balkNoSearch>a>img").remove();
            $("#stlNoSearch>a>img").remove();
            $("#id2").show();
            $("#id1").hide();
            $("#id3").hide();
            $(".nav-tabs li").removeClass("active");
            console.log(1111);
            $("#phoneNoSearch").addClass("active");
            setType("phoneNumber");
        }
        else if(qryType == "balkNo") {
            var imgObj = $("#balkNoSearch>a>img").length;
            if(!imgObj) {
                $("#balkNoSearch>a").prepend(str);
            }
            $("#stlNoSearch>a>img").remove();
            $("#phoneNoSearch>a>img").remove();
            $("#id1").show();
            $("#id2").hide();
            $("#id3").hide();
            $(".nav-tabs li").removeClass("active");
            console.log(2222);
            $("#balkNoSearch").addClass("active");
            setType("balkNo");
        }
        else if(qryType == "stlNo"){
            //小人显示
            var imgObj = $("#stlNoSearch>a>img").length;
            if(!imgObj) {
                $("#stlNoSearch>a").prepend(str);
            }
            $("#balkNoSearch>a>img").remove();
            $("#phoneNoSearch>a>img").remove();
            $("#id3").show();
            $("#id1").hide();
            $("#id2").hide();
            $(".nav-tabs li").removeClass("active");
            $("#stlNoSearch").addClass("active");
            setType("stlNo");
        }
    }else{
        var imgObj = $("#balkNoSearch>a>img").length;
        if(!imgObj) {
            $("#balkNoSearch>a").prepend(str);
        }
        $("#phoneNoSearch>a>img").remove();
        $("#stlNoSearch>a>img").remove();
        setType("balkNo");

    }
}

//存储查询类型
function setType(Str) {
    sessionStorage.setItem("searchType",Str);
}

//获取查询类型
function getType() {
    var searchType = sessionStorage.getItem("searchType");
    return searchType;
}

function phoneSearchCheck(){
    var phoneNum = $("#phoneNum").val();
    if(phoneNum==""){
        layer.open({
            content: '请输入办理业务所留客户名称'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
    }
 /*   if(phoneNum!==""){
        var boo2=checkPhoneNum(phoneNum);
        if(boo2==false){
            layer.open({
                content: '您的手机号码有误，请重填'
                ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                ,time: 3
            });
        }else if(boo2==true){
            return true;//校验成功
        }
    }*/
}

/*手机号码*/
$("#open_phoneSearch1").click(function(){
    var phoneNum = $("#phoneNum").val();
    var qryType ="phoneNumber";
    if(phoneNum == "") {
        layer.open({
            content: '请输入您的客户名称！'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
        return false;
    };
    getOrderDataNum(qryType,phoneNum);
});

// 受理单号
$("#open_orderSearch1").click(function(){
    var balkNum = $("#balkNo").val();
    var qryType ="balkNo";
    if(balkNum == "") {
        layer.open({
            content: '请输入您的受理单号！'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
        return false;
    };
    getOrderDataNum(qryType,balkNum);
});

// 业务号码
$("#open_orderSearch2").click(function(){
    var stlNum = $("#stlNo").val();
    var qryType ="stlNo";
    if(stlNum == "") {
        layer.open({
            content: '请输入您的业务号码！'
            ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
            ,time: 3
        });
        return false;
    };
    getOrderDataNum(qryType,stlNum);
});
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");

//传受理单号或业务号码到订单列表页面：order-zqza-list
function getOrderDataNum(qryType,qryNumber){
    window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-in-order/page/order-zqza-list.html?qryType="+qryType+"&qryNumber="+qryNumber);
}

//切换div
function showDiv(objId) {
    var objDiv = document.getElementById(objId);
    var objDiv1 = document.getElementById("id1");
    var objDiv2 = document.getElementById("id2");
    var objDiv3 = document.getElementById("id3");
    objDiv1.style.display = "none";
    objDiv2.style.display = "none";
    objDiv3.style.display = "none";
    objDiv.style.display = "";
    var str = '<img src="../../images/order/web-li.png"/>';
    /*显示隐藏清空图标*/
    if(objId == "id3"){
        //小人显示
        var imgObj = $("#stlNoSearch>a>img").length;
        if(!imgObj) {
            $("#stlNoSearch>a").prepend(str);
        }
        $("#balkNoSearch>a>img").remove();
        $("#phoneNoSearch>a>img").remove();
        setType("stlNo");
    }
    else if (objId == "id1") {
        //小人显示
        var imgObj = $("#balkNoSearch>a>img").length;
        if(!imgObj) {
            $("#balkNoSearch>a").prepend(str);
        }
        $("#stlNoSearch>a>img").remove();
        $("#phoneNoSearch>a>img").remove();
        setType("balkNo");
    }
    else if (objId == "id2") {
        //小人显示
        var imgObj = $("#phoneNoSearch>a>img").length;
        if(!imgObj) {
            $("#phoneNoSearch>a").prepend(str);
        }
        $("#stlNoSearch>a>img").remove();
        $("#balkNoSearch>a>img").remove();
        setType("phoneNumber");
    };

    //单页面特殊处理广告位重新加载
    advertPosition();
}


function dele(a,b){
    $("#"+b).val("");
    setTimeout(function(){
        $("#"+a).hide();
    },500);
}

/*手机号输入框获得焦点*/
$("#phoneNum").focus(function(){
    $("#jobIm1").show();
});
$("#balkNo").focus(function(){
    $("#jobIm6").show();
});
$(".nav-tabs li").click(function() {
    $(".nav-tabs li").removeClass("active");
    $(this).addClass("active");
});




/*//沃易赚小程序添加返回页面
$("#backWechat").click(function(){
    if(ParameterArra[1][1]=="wyzin"||ParameterArra[1][1]=="wyzout"){
        console.log("返回沃易赚小程序界面成功")
        wx.miniProgram.redirectTo({url: '../../pages/home/home'});
    }else if(ParameterArra[1][1]=="wysbz"){
        console.log("返回沃易售标准版界面成功")
        wx.miniProgram.redirectTo({url: '../../pages/index/index'});
    }

})*/
