
//后台总数据
var totalData;

//查询后数据
var resultData;

var url = getRootPath_web().substring(0,getRootPath_web().lastIndexOf("\/"));

//需要放大的图像
var imgsObj = $('.amplifyImg img');

//导出css配置
var set='<meta charset="UTF-8"><link rel="stylesheet" ' +
    'type="text/css" href="'+getRootPath_web()+'/web-monitor/css/feedBack.css">' +
    '<base href="'+url+'" />'+'<style> pre img { display: block;margin: 0 auto;}</style>';






//类型分类(默认选中订单实时查询)
var secondLevel="t1";

var getExplorer = (function () {
    var explorer = window.navigator.userAgent,
        compare = function (s) { return (explorer.indexOf(s) >= 0); },
        ie11 = (function () { return ("ActiveXObject" in window) })();
    if (compare("MSIE") || ie11) { return 'ie'; }
    else if (compare("Firefox") && !ie11) { return 'Firefox'; }
    else if (compare("Chrome") && !ie11) {
        if (explorer.indexOf("Edge") > -1) {
            return 'Edge';
        } else {
            return 'Chrome';
        }
    }
})()


/**
 * 界面加载
 */
$(function () {
    $.ajax({
        type: 'post',
        url: getOutUrl(getRootPath_web(), "/report/findFromFeedback?timestamp="
            + Date.parse(new Date())+ "&questionState=1"
            + "&flag=feedBack"+"&userParam"+getUrlParam("userParam")),
        dataType: 'json',
        async: false,
        data: {
            "timestamp": Date.parse(new Date())
        },
        success: function (data) {
            totalData = data;
            resultData=dealData(totalData,"type");
            showTitle(resultData);
        }
    });
});

/**
 *点击二级分类按钮
 */
$(document).on("click", "#li2 button", function () {

    console.log("获取的按钮值是"+$(this).text());

    $("#li2 button").each(function () {
        $(this).css("color", "#9C9C9C");
    });

    $(this).css("color", "#fa7a07");

    console.log("点击二级分类按钮");
    secondLevel = $(this).attr("id");
    searchDeal("type");
});

/**
 *关闭弹框
 */
$(document).on("click", "#close", function () {
    $("#dateDetail").css('display','none');
});


/**
 *打开留言板界面
 */
$(document).on("click", "#messageBoard", function () {
    $(location).attr('href', "/queryCenter/web-monitor/page/messageBoard.html?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D");

});


/**
 * 点击查询按钮
 */
$(document).on("click", "#searchBtn", function () {
    searchDeal("search");
});


/**
 * 筛选数据dealData
 */
function dealData(totalData,flag){
    var searchBtn=$("#keyDate").val();
    console.log("获取的前台传递的值是"+searchBtn);
    console.log("获取的选中的secondLevel"+secondLevel);

    //正则表达式匹配
    var reg = new RegExp(searchBtn);
    var result={};
    result.rows=[];
    result.total=0;
    for(var i=0;i<totalData.total;i++){
        var temp=totalData.rows[i].questionTitle;
        var tempContext=totalData.rows[i].questionDescript;

        if("search"==flag){ //点击查询
            if(temp.match(reg) || tempContext.match(reg)) { //模糊查询匹配
                result.rows.push(totalData.rows[i])
                result.total=result.total+1;
            }
        }else if("type"==flag){ //点击类型
            if(secondLevel==totalData.rows[i].questionType){
                result.rows.push(totalData.rows[i])
                result.total=result.total+1;
            }
        }
    }
    return result;
}



/**
 *展示问题详情
 */
$("ul").on("click", "li", function () {
    var num =$(this).index()-2;
    if(num>=0){ //点击了动态生成的li
        $("#dateDetail").show();
        $("#questionTitle").text(resultData.rows[num].questionTitle);
        $("#detail").html(resultData.rows[num].questionDescript);
    }
});



/**
 * 点击详情中图片，放大显示
 */
$(document).on("click", "#dateDetail pre img", function () {
    console.log("点击了内部的图片");
    var currImg = $(this);
    coverLayer(1);
    var tempContainer = $('<div class=tempContainer></div>');//图片容器
    with(tempContainer){//width方法等同于$(this)
        appendTo("body");
        var windowWidth=$(window).width();
        var windowHeight=$(window).height();
        //获取图片原始宽度、高度
        var orignImg = new Image();
        orignImg.src =currImg.attr("src") ;
        var currImgWidth= orignImg.width;
        var currImgHeight = orignImg.height;
        if(currImgWidth<windowWidth){//为了让图片不失真，当图片宽度较小的时候，保留原图
            if(currImgHeight<windowHeight){
                var topHeight=(windowHeight-currImgHeight)/2;
                if(topHeight>35){/*此处为了使图片高度上居中显示在整个手机屏幕中：因为在android,ios的微信中会有一个title导航，35为title导航的高度*/
                    topHeight=topHeight-35;
                    css('top',topHeight);
                }else{
                    css('top',0);
                }
                html('<img border=0 src=' + currImg.attr('src') + '>');
            }else{
                css('top',0);
                html('<img border=0 src=' + currImg.attr('src') + ' height='+windowHeight+'>');
            }
        }else{
            var currImgChangeHeight=(currImgHeight*windowWidth)/currImgWidth;
            if(currImgChangeHeight<windowHeight){
                var topHeight=(windowHeight-currImgChangeHeight)/2;
                if(topHeight>35){
                    topHeight=topHeight-35;
                    css('top',topHeight);
                }else{
                    css('top',0);
                }
                html('<img border=0 src=' + currImg.attr('src') + ' width='+windowWidth+';>');
            }else{
                css('top',0);
                html('<img border=0 src=' + currImg.attr('src') + ' width='+windowWidth+'; height='+windowHeight+'>');
            }
        }
    }
    tempContainer.click(function(){
        $(this).remove();
        coverLayer(0);
    });
});


/**
 *前台展示问题名称列表
 */
function showTitle(result) {
    var lis="";
    for(var i=0;i<result.total;i++){
        var temp='<li class="quest" style="text-align: center" onmouseover="this.style.color=\'#fa7a07\'" onmouseout=" this.style.color=\'#000000\'"><span class="questName cursor">'
            +result.rows[i].questionTitle+'</span></li>';
        lis=lis+temp;
    }
    $("#li2").after(lis);
}

//使用禁用蒙层效果
function coverLayer(tag) {
    with ($('.over')) {
        if (tag == 1) {
            css('height', $(document).height());
            css('display', 'block');
            css('opacity', 1);
            css("background-color", "white");
        } else {
            css('display', 'none');
        }
    }
};


/**
 * 清除生成动态HTML代码
 */
function clearCode() {
    console.log("进入了清理代码");
    var liList = $("#result ul li");
    console.log("获取的动态li的行数是"+liList.length);
    for (var i=0;i<liList.length;i++){
        if(i>1){
            var ele = liList[i];
            ele.parentNode.removeChild(ele);
            //liList[i].remove();
        }
    }
}

/**
 * 保存
 */

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
            "click", true, false,
        window, 0, 0, 0, 0, 0
        , false, false, false,
        false, 0, null
    );
    obj.dispatchEvent(ev);
}

function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var export_blob = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    console.log("使用的内核是"+getExplorer);
    if(getExplorer=='ie'){
        var excelBlob = new Blob([data], {type: 'text/html;charset=utf-8'});
        window.navigator.msSaveOrOpenBlob(excelBlob,name);
    }else {
        fake_click(save_link);
    }
}

//点击下载
$('.downWord').click(function() {
    //导出节点
    var test=document.getElementsByTagName('div')[13].outerHTML;



    var begin= '<style> .questionContent {height: auto !important;}</style>'

    //本机环境
    test=set+begin+test;

    export_raw(""+$("#questionTitle").text()+".html", test);
});

//点击下载全部按钮
$('.exportAll').click(function() {
    var tmp1 ='<div id="content"><div id="questionTitle" class="questionTitle" style="text-align: center;margin-top: 2%;font-size: 24px;">';
    var tmp2 ='</div>';
    var tmp3 ='<pre id="detail" class="questionContent1" style="margin-top: 2%;margin-left: 120px;margin-right: 120px;">';
    var tmp4 ='</pre></div>';
    var test="";
    for(var i=0;i<resultData.total;i++){
        test=test+tmp1+resultData.rows[i].questionTitle+tmp2+tmp3+resultData.rows[i].questionDescript+tmp4;
    }
    if(test!=""){
        test=set+test;
    }
    export_raw("下载全部.html", test);
});

/**
 * 查询处理
 */
function searchDeal(flag){
    resultData = dealData(totalData,flag);
    if(resultData.total==0){ //没有结果，展示提示语句
        if($("#result").hasClass("show")){
            $("#result").removeClass("show").addClass("hidden");
            $("#noResult").removeClass("hidden").addClass("show");
        }
        //问题类型置为空
        secondLevel="";
        $("#li2 button").each(function () {
            $(this).css("color", "#9C9C9C");
        });

    }else {
        if("search"==flag){
            //问题类型置为空
            secondLevel="";
            $("#li2 button").each(function () {
                $(this).css("color", "#9C9C9C");
            });
        }else {
            //查询内容置空
            $("#keyDate").val("");
        }

        if($("#noResult").hasClass("show")){
            $("#noResult").removeClass("show").addClass("hidden");
            $("#result").removeClass("hidden").addClass("show");
        }
        clearCode();
        showTitle(resultData);
    }
};

/**
 * 跳转联系我们
 */
$("#concat_text").click(function () {
    $(location).attr('href', "/queryCenter/web-monitor/page/feedBackContacts.html?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D");
});