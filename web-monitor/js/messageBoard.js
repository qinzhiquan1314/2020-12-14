var secondLevel; //二级分类
var questionDescript; //问题描述
var questioner; //提问人
var questionerNum; //提问人手机号码
var belongTo; //归属单位


/**
 * 界面加载
 */
$(function () {
    console.log("欢迎您进入留言板界面！");
});

/**
 *提交
 */
$(document).on("click", "#submit", function () {
    console.log("点击了提交按钮！");

    //校验
    secondLevel=$("#secondLevel").val();
    questionDescript=$("#questionDescript").val();
    questioner=$("#questioner").val();
    questionerNum=$("#questionerNum").val();
    belongTo=$("#belongTo").val();

    if(secondLevel == ""){
        alert_bootbox("请选择二级分类","提示","确定");
    }else if(questionDescript == ""){
        alert_bootbox("请输入问题描述","提示","确定");
    }else if(questioner == ""){
        alert_bootbox("请输入提问人","提示","确定");
    }else if(isMobile(questionerNum)){
        alert_bootbox("请输入正确手机号码","提示","确定");
    }else if(belongTo == ""){
        alert_bootbox("请选择归属单位","提示","确定");
    }else {
        saveDate();
    }
});

/**
 *
 * @param 保存提交
 * @param title
 * @param label
 */
function saveDate() {
    $.ajax({
        type: 'post',
        /*url: getOutUrl(getRootPath_web(), "/trade/insertFromFeedback?secondLevel="
            + secondLevel + '&questionDescript=' + questionDescript
            + '&questioner=' + questioner
            + '&questionerNum=' + questionerNum + "&timestamp=" + Date.parse(new Date())+ "&belongTo=" + belongTo),*/

        url: getOutUrl(getRootPath_web(), "/report/insertFromFeedback?secondLevel="
            + secondLevel + '&questionDescript=' + questionDescript
            + '&questioner=' + questioner
            + '&questionerNum=' + questionerNum + "&timestamp=" + Date.parse(new Date())+ "&belongTo=" + belongTo
            +"&userParam"+getUrlParam("userParam")),

        //$(location).attr('href', "/queryCenter/web-monitor/page/feedBack.html?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D");

        dataType: 'json',
        async: false,
        data: {
            "secondLevel": secondLevel,
            "questionDescript": questionDescript,
            "questioner": questioner,
            "questionerNum": questionerNum,
            "timestamp": Date.parse(new Date()),
            "belongTo": belongTo
        },
        success: function (data) {
            if (data.state == '1') {
                $("div .submitSucess").show();
                $("#secondLevel").val("");
                $("#questionDescript").val("");
                $("#questioner").val("");
                $("#questionerNum").val("");
                $("#belongTo").val("");
                setTimeout(function(){ $("div .submitSucess").hide(); }, 2000);
            }
        }
    });
}

// bootbox 自定义提示框
function alert_bootbox(message,title,label){
    bootbox.dialog({
        // dialog的内容
        message: message,

        // dialog的标题
        title: title,

        // 退出dialog时的回调函数，包括用户使用ESC键及点击关闭
        onEscape: function() {},

        // 是否显示此dialog，默认true
        show: true,

        // 是否显示body的遮罩，默认true
        backdrop: true,

        // 是否显示关闭按钮，默认true
        closeButton: true,

        // dialog的类名(没有用)
        className: "pop_style",

        // dialog底端按钮配置
        buttons: {

            // 其中一个按钮配置
            success: {
                // 按钮显示的名称
                label: label,

                // 按钮的类名
                className: "btn-warning",

                // 点击按钮时的回调函数
                callback: function() {}
            },
        }
    });
}

/**
 *验证手机号码是否正确
 */
function isMobile(s) {
    var patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!patrn.exec(s))
        return true;
    return false;
}