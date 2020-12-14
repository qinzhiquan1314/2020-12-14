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

$(window).scroll(function() {
    if ($(".detail-header").offset().top > 50) {
        $(".detail-header").addClass("change");
    } else {
        $(".detail-header").removeClass("change");
    }
});


// hui组件   http://www.hcoder.net/hui/docs218.html
/*
 * hui.tags()
 * 函数第2个参数为可选参数【标签状态切换的回调函数】，可以根据实际情况决定是否完善
 */
hui.tags('#tags1', function() {
    var tagData = hui.getTagsData('#tags1');
    // console.log(JSON.stringify(tagData));
});


var productId = getUrlParam("productId");
var commId = getUrlParam("commId");
var commentType = getUrlParam("commentType");
// var locHref = getUrlParam("userParam");

var pageNo = 1;
var pageSize = 5;
getMore();

hui.loadMore(getMore);

$("#totalCount").click(function() {

    if ($("#totalCount").attr("class").trim() == "") {

        $("#totalCount").attr("class", "hui-tags-active");
    }
    $(".talk").children().remove();
    pageNo = 1;
    commentType = "";
    hui.resetLoadMore();
    getMore();

});

$("#goodCount").click(function() {
    if ($("#goodCount").attr("class").trim() == "") {

        $("#goodCount").attr("class", "hui-tags-active");
    }
    $(".talk").children().remove();
    pageNo = 1;
    commentType = "good";
    hui.resetLoadMore();
    getMore();
});
$("#middleCount").click(function() {
    if ($("#middleCount").attr("class").trim() == "") {

        $("#middleCount").attr("class", "hui-tags-active");
    }
    $(".talk").children().remove();
    pageNo = 1;
    commentType = "middle";
    hui.resetLoadMore();
    getMore();
});
$("#badCount").click(function() {
    if ($("#badCount").attr("class").trim() == "") {

        $("#badCount").attr("class", "hui-tags-active");
    }
    $(".talk").children().remove();
    pageNo = 1;
    commentType = "bad";
    hui.resetLoadMore();
    getMore();
});


function getMore() {

    // 移动端组件hui    http://www.hcoder.net/hui/docs263.html   ajax请求
    hui.postJSON(
        // 'http://10.124.147.88/queryCenter/evaluation/queryProductEvaluation'
        getOutUrl(getRootPath_web(), '/evaluation/queryProductEvaluation'), {
            productId: productId,
            commId: commId,
            pageNo: pageNo,
            pageSize: pageSize,
            commentType: commentType
        },
        function(res) {
            var state = res.state;
            if (state == 0) {
                var html1 = '	<li class="none-comment"> 没有相应的评价 <br> 看看其他的~ </li>';
                $(".talk").append(html1)
                $('#hui-load-more').css('display', 'none');
                // hui.toast('空数据或者异常');
            }
            var appraiseList = res.data.object;
            if (appraiseList.length == 0) {
                hui.endLoadMore(true, '已经到头了...');
                return false;
            }
            var state = res.state;
            //alert(res.state);
            if (state == 0) {} else {
                var goodRatio = res.data.goodRatio;
                var totalCount = res.data.totalCount;
                var goodCount = res.data.goodCount;
                var middleCount = res.data.middleCount;
                var badCount = res.data.badCount;

                if (parseInt(totalCount) > 99) {
                    totalCount = "99+";
                }
                if (parseInt(goodCount) > 99) {
                    goodCount = "99+";
                }
                if (parseInt(middleCount) > 99) {
                    middleCount = "99+";
                }
                if (parseInt(badCount) > 99) {
                    badCount = "99+";
                }

                $("#goodRatio").text("好评率：" + goodRatio);
                $("#totalCount").text("全部(" + totalCount + ")");
                $("#goodCount").text("好评(" + goodCount + ")");
                $("#middleCount").text("中评(" + middleCount + ")");
                $("#badCount").text("差评(" + badCount + ")");


                for (var i = 0; i < appraiseList.length; i++) {

                    var html = '<li>' +
                        '<figure>' +
                        '业务号码：';
                    if (appraiseList[i].broadbandNum != null) {
                        html += '		<p class="bandnum">' + appraiseList[i].broadbandNum + '</p>';
                    } else {
                        html += '		<p class="bandnum none"> 暂无客户宽带 </p> ';
                    }
                    html += '	</figure>' +
                        '	<dl>' +
                        '		<dt>' +
                        '			<div class="star">';

                    for (var j = 0; j < appraiseList[i].extLevel5; j++) {
                        html += '<span><img src="images/detail-iocn01.png"/></span>';
                    }
                    for (var k = 0; k < 10 - appraiseList[i].extLevel5; k++) {
                        html += '<span><img src="images/detail-iocn001.png"/></span>';
                    }

                    html += '				</div>' +
                        '		</dt>';
                    if (appraiseList[i].comment != null) {
                        html += '		<dd>' + appraiseList[i].comment + '</dd> ';
                    } else {
                        html += ' ';
                    }
                    //加载图片
                    if (appraiseList[i].pictures != null) {
                        for (var l = 0; l < appraiseList[i].pictures.length; l++) {
                            if (l == 0) {
                                html += '		<div class="picbox" style="height:192px;">';
                            }
                            if (appraiseList[i].pictures[l].pictureState == 0) {
                                $(".picbox").css("display", "none")
                            }
                            if (appraiseList[i].pictures[l].pictureState == 1) {
                                var fileName = appraiseList[i].pictures[l].picture;
                                // var locHref = "CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D";
                                var goalUrl = getOutUrl(getRootPath_web(), "/report/getPicture?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D&timestamp=" + Date.parse(new Date()) + "&fileName=" + fileName);
                                html += "<img src=" + goalUrl + ">";
                            } else {
                                html += '';
                            }
                        }
                    }
                    html += '			</div>';
                    html += '		<small><p class="goodsnum">商品：' + appraiseList[i].prodName + '</p></small>';
                    html += '		<span class="time">' + appraiseList[i].createDate + '</span>'
                    html += '	</dl>' +
                        '</li>';
                    //alert(html);
                    $(".talk").append(html);
                }
            }
            if (appraiseList.length < pageSize) {
                hui.endLoadMore(true, '已经到头了...');
                return false;
            }
            pageNo++;
            hui.endLoadMore();

        },
        function(e) {
            hui.iconToast('读取消息失败', 'warn');
        }
    );
}