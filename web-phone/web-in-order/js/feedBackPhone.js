//后台总数据
var totalData;

//查询后数据
var resultData;

/**
 * 界面加载
 */
$(function () {
    console.log("欢迎您进入手机端在线反馈界面！");
    $.ajax({
        type: 'post',
        //url: getOutUrl(getRootPath_web(), "/trade/findFromFeedback?timestamp=" + Date.parse(new Date())+ "&questionState=1"),
        url: getOutUrl(getRootPath_web(), "/report/findFromFeedback?userParam=CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D"+ "&questionState=1"),
    dataType: 'json',
        async: false,
        data: {
            "timestamp": Date.parse(new Date())
        },
        success: function (data) {
            console.log("请求获取的值是"+data);
            totalData = data;
            resultData=dealData(totalData);
            showTitle(resultData);
        }
    });
});


/**
 * 查询
 */
$(document).on("click", "#commit", function () {
    resultData = dealData();
    if(resultData.total==0){ //没有结果，展示提示语句
        if($("#titleLists").hasClass("show")){
            $("#titleLists").removeClass("show").addClass("hidden");
            $("#noResult").removeClass("hidden").addClass("show");
        }
    }else {
        if($("#noResult").hasClass("show")){
            $("#noResult").removeClass("show").addClass("hidden");
            $("#titleLists").removeClass("hidden").addClass("show");
        }
        showTitle(resultData);
    }
});


/**
 * 数据处理
 */
function dealData() {
    var searchBtn=$("#keyWord").val(); //前台搜索值，默认""
    var reg = new RegExp(searchBtn);//正则表达式匹配
    var result={};
    result.rows=[];
    result.total=0;
    for(var i=0;i<totalData.total;i++){
        var temp=totalData.rows[i].questionTitle;
        var tempContext=totalData.rows[i].questionDescript;
        if(temp.match(reg) || tempContext.match(reg)){ //模糊查询匹配
            result.rows.push(totalData.rows[i])
            result.total=result.total+1;
        }
    }
    return result;
}


/**
 * 加载前台动态界面
 */
function showTitle(result){
    var array=[]; //问题分类
    var index =0;
    for(var i=0;i<result.total;i++){
        if(i==0){
            array.push(result.rows[i].questionType);
        }else {
            index = $.inArray(result.rows[i].questionType, array);
            if(index==-1){
                array.push(result.rows[i].questionType);
            }
        }
    }

    $("#titleLists div").removeClass("show").addClass("hidden");
    $("#titleLists ul").removeClass("show").addClass("hidden");

    //清理动态生成li
    var liList = $("#titleLists ul li");
    console.log("获取的动态li的行数是"+liList.length);
    for (var i=0;i<liList.length;i++){
        liList[i].remove();
    }

    for (var j=0;j<array.length;j++){

        //动态生成li
        var uls='';
        for (var k=0;k<result.total;k++){
            if(result.rows[k].questionType==array[j]){
                uls=uls+'<li class="qusetTitle" name="'+k+'">'+result.rows[k].questionTitle+'</li>';
            }
        }
        $("#ul"+array[j]+"").append(uls);

        //显示标题和ul
        $("#"+array[j]+"").removeClass("hidden").addClass("show");
    }
}

/**
 * 点击问题分类，展示问题列表
 */
$(document).on("click", "#titleLists div", function () {
    var id="ul"+$(this).attr("id");
    if($("#"+id+"").hasClass("hidden")){
        $("#"+id+"").removeClass("hidden").addClass("show");
        $(this).children().eq(1).attr("src","../images/openArrow.png")
    }else{
        $("#"+id+"").removeClass("show").addClass("hidden");
        $(this).children().eq(1).attr("src","../images/closeArrow.png")
    }
});


/**
 *跳转问题明细界面
 */

/*$(document).on("click", "ul li", function () {
    var questionTitle=$(this).text();
    var questionContent=resultData.rows[$(this).attr("name")].questionDescript;
    $(location).attr('href', "../page/feedBackPhoneDet.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&questionTitle="+encodeURIComponent(questionTitle)+'&questionContent='+encodeURIComponent(questionContent));
});*/

$(document).on("click", "ul li", function () {
    var newsId  = $(this).attr("name");
    console.log(newsId);
    var questionTitle=$(this).text();
    var questionContent=resultData.rows[$(this).attr("name")].questionDescript;
    sessionStorage.setItem('name','金凡迪');
    sessionStorage.setItem(newsId+"_title",questionTitle);
    sessionStorage.setItem(newsId+"_content",questionContent);
    $(location).attr('href', "../page/feedBackPhoneDet.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&newsId=" + newsId);
    //$(location).attr('href', "../page/feedBackPhoneDet.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05&questionTitle="+encodeURIComponent(questionTitle)+'&questionContent='+encodeURIComponent(questionContent));
});

/**
 *跳转留言板界面
 */
$(document).on("click", "#messageBtn", function () {
    //console.log("成功进入了跳转留言板js");
    $(location).attr('href', "../page/messageBoardPhone.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05");
});

/**
 *点击x图标，清空搜索框，x图标隐藏
 */
$(document).on("click", "#jobIm2", function () {
    $("#keyWord").val("");
    $("#jobIm2").removeClass("show").addClass("hidden");
});

/**
 * 点击搜索框，显示x图标
 */
$(document).on("click", "#keyWord", function () {
    $("#jobIm2").removeClass("hidden").addClass("show");
});


/**
 * 点击联系我们，跳转联系信息界面
 */
$(document).on("click", "#contacts", function () {
    $(location).attr('href', "../page/feedBackPhoneContacts.html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05");

});