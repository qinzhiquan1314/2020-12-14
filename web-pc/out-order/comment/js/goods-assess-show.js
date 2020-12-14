var productId = getUrlParam("productId");
var commId = getUrlParam("commId");
var commentType = getUrlParam("commentType");

$(function() {
    // $('.tab-con').filterizr();
    $('.nav li').on('click', function() {
        //alert($(this).attr("class"));
        if ($(this).attr("class") != "current") {
            $(this).toggleClass('current').siblings().removeClass('current');
        }
    });
})

var exCode, userName, callCode, extId, userName2;

function getOutUrl(uri, query) {
    var str = "exCode=" + exCode + "&userName=" + userName + "&callCode=" + callCode + '&userName2=' + userName2;
    if (extId != null && extId != "") {
        str += "&extId=" + extId;
    }
    if (query.indexOf("?") > 0) {
        str = '&' + str;
    } else {
        str = '?' + str;
    }
    var url = uri + query + str;
    return url;
}

function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值 encodeURI()编码/decodeURI()解码
}

var productId = getUrlParam("productId");
var commId = getUrlParam("commId");
var commentType = getUrlParam("commentType");

var pageNo = 1;
getPJList(1);
var totalPageNum = 0;


$("#totalCount").parent().click(function() {

    if ($("#totalCount").parent().attr("class") != "current") {
        commentType = "";
        getPJList(1);
    }
});

$("#goodCount").parent().click(function() {

    if ($("#goodCount").parent().attr("class") != "current") {
        commentType = "good";
        getPJList(1);
    }
});

$("#middleCount").parent().click(function() {

    if ($("#middleCount").parent().attr("class") != "current") {
        commentType = "middle";
        getPJList(1);
    }
});
$("#badCount").parent().click(function() {

    if ($("#badCount").parent().attr("class") != "current") {
        commentType = "bad";
        getPJList(1);

    }
});

function getPJList(pageNo) {
    //alert(pageNo);
    $.ajax({
        url: getOutUrl(getRootPath_web(), "/evaluation/queryProductEvaluation"),
        // url: "http://10.124.147.88/queryCenter/evaluation/queryProductEvaluation",
        data: {
            productId: productId,
            commId: commId,
            pageNo: pageNo,
            pageSize: 5,
            commentType: commentType
        },
        type: "POST",
        dataType: "json",
        success: function(data) {
            $(".tab-con").children().remove();
            // data = jQuery.parseJSON(data);  //dataType指明了返回数据为json类型，故不需要再反序列化
            if (data.state == 0) {
                var html1 = '	<div class="none-comment"> 没有相应的评价 <br> 看看其他的~ </div>';
                $(".tab-con").append(html1);
                // alert('空数据或者异常');
            } else {
                totalPageNum = data.data.total;
                P.config.total = totalPageNum;
                P.initMathod({
                    params: {
                        elemId: '#Page',
                        pageIndex: pageNo,
                        pageSize: '5'
                    },
                    requestFunction: function() {
                        //P.config.total = 30;//此处模拟总记录变化*/

                        /*TODO ajax异步请求过程,异步获取到的数据总条数赋值给 P.config.total*/

                        /*列表渲染自行处理*/

                        console.log(JSON.stringify(P.config));
                    }
                });
                if (parseInt(data.data.totalCount) > 99) {
                    data.data.totalCount = "99+";
                }
                if (parseInt(data.data.goodCount) > 99) {
                    data.data.goodCount = "99+";
                }
                if (parseInt(data.data.middleCount) > 99) {
                    data.data.middleCount = "99+";
                }
                if (parseInt(data.data.badCount) > 99) {
                    data.data.badCount = "99+";
                }
                $(".percent-num").text(data.data.goodRatio);
                $("#goodCount").text(data.data.goodCount);
                $("#badCount").text(data.data.badCount);
                $("#middleCount").text(data.data.middleCount);
                $("#totalCount").text(data.data.totalCount);

                var appraiseList = data.data.object;
                for (var i = 0; i < appraiseList.length; i++) {
                    var html = '<div class="filtr-item">' +
                        '	<div class="user-info">' +
                        '	<span> 业务号码： </span>	';
                    html += '		<div class="clear"></div>';
                    if (appraiseList[i].broadbandNum != null) {
                        html += '		<span>' + appraiseList[i].broadbandNum + '</span>';

                    } else {
                        html += '		<span class="none"> 暂无客户宽带 </span> ';
                    }
                    html += '	</div>' +
                        '	<div class="comment-column">' +
                        '		<div class="comment-star">';
                    for (var j = 0; j < appraiseList[i].extLevel5; j++) {
                        html += '<span><img src="images/detail-iocn01.png"/></span>';
                    }
                    for (var k = 0; k < 10 - appraiseList[i].extLevel5; k++) {
                        html += '<span><img src="images/detail-iocn001.png"/></span>';
                    }
                    html += '			</div>';
                    if (appraiseList[i].comment != null) {
                        html += '		<p class="comment-con">' +
                            appraiseList[i].comment +
                            '		</p>';
                    } else {
                        html += ' ';
                    }
                    html += '		<div class="pic-show">' +
                        '			<div id="wrap">';
                    if (appraiseList[i].pictures != null) {
                        for (var l = 0; l < appraiseList[i].pictures.length; l++) {
                            if (appraiseList[i].pictures[l].pictureState == 1) {
                                var fileName = appraiseList[i].pictures[l].picture;
                                // var locHref = "CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D";
                                var goalUrl = getOutUrl(getRootPath_web(), "/report/getPicture?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D&timestamp=" + Date.parse(new Date()) + "&fileName=" + fileName);
                                html += '<img src="' + goalUrl + '" />';
                            }
                        }
                    } else {
                        html += '';
                    }
                    html += '				</div>' +
                        '		</div>' +
                        '		<div class="order-info">' +
                        '			<span>' + appraiseList[i].prodName + '</span>' +
                        '			<span>' + appraiseList[i].createDate + '</span>' +
                        '		</div>' +
                        '	</div>' +
                        '	<div class="clear"></div>' +
                        '</div>';
                    $(".tab-con").append(html);

                }
            }
        },
        error: function() {
            alert('there is something wrong')
        }
    });
}
console.log("%c%s",
    "color: #D2691E; background: #F5F5DC; font-size: 40px;",
    "𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏𓀐𓀑𓀒𓀓𓀔𓀕𓀖𓀗𓀘𓀙𓀚𓀛𓀜𓀝𓀞𓀟𓀠𓀡𓀢𓀣𓀤𓀥𓀦𓀧𓀨𓀩𓀪𓀫𓀬𓀭𓀮𓀯");