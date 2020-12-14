
//需要放大的图像
var imgsObj = $('.amplifyImg img');

var url = getRootPath_web().substring(0,getRootPath_web().lastIndexOf("\/"));

//导出配置
var set='<meta charset="UTF-8"><link rel="stylesheet" ' +
    'type="text/css" ' +
    'href="'+getRootPath_web()+'/web-phone/web-in-order/css/feedBackPhone.css">' +
    '<base href="'+url+'" />'+'<style> pre img { display: block;margin: 0 auto;}</style>';

/**
 * 从URL中获取数据
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


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
/*$(function () {
    console.log("进入了加载界面！");
    $("#questionTitle").html(GetQueryString("questionTitle"));
    $("#detail").html(GetQueryString("questionContent"));
});*/

$(function () {
    console.log("进入了加载界面！");
    console.log("newsId:"+GetQueryString("newsId"));
    var newsId=GetQueryString("newsId");
    //通过getItem方法获取value
    var title = sessionStorage.getItem(newsId + "_title");
    var content = sessionStorage.getItem(newsId + "_content");
    $("#questionTitle").html(title);
    $("#detail").html(content);
});


/**
 * 点击详情中图片，放大显示
 */
$(document).on("click", "#detail img", function () {
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
 * 保存
 */
/*function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}*/


/*function export_raw(name, data) {
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
}*/


/*function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var export_blob = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
}*/

jQuery.download = function(globalUrl,method,userParam,fileName,data){
    jQuery('<form action="'+globalUrl+'" method="'+(method||'post')+'">' +  // action请求路径及推送方法
        '<input type="text" name="userParam" value="'+userParam+'"/>' + // 登录
        '<input type="text" name="fileName" value="'+fileName+'"/>' + // 文件名称
        '<input type="text" name="data" value="'+data+'"/>' + // 文件内容
        '</form>')
        .appendTo('body').submit().remove();
};


$('#export').click(function() {
    var test=document.getElementsByTagName('div')[4].outerHTML;
    test=set+test;
    console.log("进入了下载界面！");
    var fileName = GetQueryString("questionTitle");


    var globalUrl = getOutUrl(getRootPath_web(), "/report/exportFromFeedbackPhone" );

    $.download(globalUrl,'post', 'CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D',encodeURI(fileName),encodeURI(test));
    //var globalUrl = getOutUrl(getRootPath_web(), "/report/exportFromFeedbackPhone?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D&fileName=" + encodeURI(fileName) +"&data="+encodeURI(test) );

    //$.download(globalUrl, 'post');
});
