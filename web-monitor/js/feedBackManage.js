
var secondLevel="";
var isReplay="0,2";
var limit;
var offset;

/*界面点击进来的展示*/
$(function () {
    console.log("进入了在线反馈管理员界面！");
    var date = new Date();
    var originDate = date.format("yyyy-MM-dd");

    //初始化时间(今天)
    $("#startDate").val(originDate);
    $("#endDate").val(originDate);

    /*var globalUrl = getOutUrl(getRootPath_web(),
        "/trade/findFromFeedback?timestamp=" + Date.parse(new Date())
        + "&secondLevel=" + secondLevel
        + "&questionState=" + isReplay
        +"&startDate=" + $("#startDate").val()
        +"&endDate=" + $("#endDate").val()
        +"&dealStaff=" + $("#dealStaff").val()
        +"&flag=feedBackManage");*/

    var globalUrl = getOutUrl(getRootPath_web(),
        "/report/findFromFeedback?timestamp=" + Date.parse(new Date())
        + "&secondLevel=" + secondLevel
        + "&questionState=" + isReplay
        +"&startDate=" + $("#startDate").val()
        +"&endDate=" + $("#endDate").val()
        +"&dealStaff=" + $("#dealStaff").val()
        +"&flag=feedBackManage"+"&flag=feedBackManage"
    +"&userParam"+getUrlParam("userParam"));

    dateTabel(globalUrl);
    console.log("转换后的时间是"+transTime(1569686400000));

    console.log("正确的时间是2019-09-29 17:36:46");
});


//分类
$("#secondLevelDiv ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    secondLevel=$(this).attr("value");
    console.log("获取的分类的值是"+secondLevel);
});

//是否回复
$("#isReplay ul li").click(function () {
    $(this).siblings('li').removeClass('searched');
    $(this).addClass('searched');
    isReplay=$(this).val();
    console.log("获取的是否回复的值是"+isReplay);
});


/**
 * 查询
 * @param globalUrl
 */
$("#searchBtn").click(function () {
    /*var globalUrl = getOutUrl(getRootPath_web(),
        "/trade/findFromFeedback?timestamp=" + Date.parse(new Date())
        + "&secondLevel=" + secondLevel
        + "&questionState=" + isReplay
        +"&startDate=" + $("#startDate").val()
        +"&endDate=" + $("#endDate").val()
        +"&dealStaff=" + $("#dealStaff").val()
        +"&flag=feedBackManage");*/

    var globalUrl = getOutUrl(getRootPath_web(),
        "/report/findFromFeedback?timestamp=" + Date.parse(new Date())
        + "&secondLevel=" + secondLevel
        + "&questionState=" + isReplay
        +"&startDate=" + $("#startDate").val()
        +"&endDate=" + $("#endDate").val()
        +"&dealStaff=" + $("#dealStaff").val()
        +"&flag=feedBackManage"+"&flag=feedBackManage"
        +"&userParam"+getUrlParam("userParam"));

    dateTabel(globalUrl);
});


/**
 * 下载
 * @param globalUrl
 */
$("#download").click(function () {
    console.log("进入了下载界面！");
    var globalUrl = getOutUrl(getRootPath_web(),
        "/report/exportFromFeedback?timestamp=" + Date.parse(new Date())
        + "&secondLevel=" + secondLevel
        + "&questionState=" + isReplay
        +"&startDate=" + $("#startDate").val()
        +"&endDate=" + $("#endDate").val()
        +"&dealStaff=" + $("#dealStaff").val()
        +"&flag=feedBackManage"+"&flag=feedBackManage"
        +"&userParam"+getUrlParam("userParam"));
    $.download(globalUrl, 'post');
});



//报表数据处理
function dateTabel(globalUrl) {
    $("#orderFlowTable").bootstrapTable('destroy');
    $('#orderFlowTable').bootstrapTable({
        url: globalUrl
        , toggle: "table"
        , height: 300
        //, columns: tableColumns
        , method: 'post'  //测试get 正式用post
        , contentType: "application/x-www-form-urlencoded"
        //, queryParams: "queryParams"
        , pagination: true //是否显示分页
        , sortable: false
        , sidePagination: "server"
        , pageNumber: 1
        , pageSize: 7
        , pageList: [7, 14, 21]
        , showRefresh: false
        , showToggle: false
        , showPaginationSwitch: false
        , showColumns: false
        , search: false
        , uniqueId: "num"
        , searchAlign: "left"
        //, sortName: "num"
        , sortOrder: "asc"
        , queryParams: function (params) {
            limit=params.limit;
            offset=params.offset;
            var temp = {
                limit: params.limit,
                offset: params.offset,
                timestamp: Date.parse(new Date()),
                secondLevel: secondLevel,
                questionState:isReplay,
                startDate:$("#startDate").val(),
                endDate:$("#endDate").val(),
                dealStaff:$("#dealStaff").val()
            };
            return temp;
        }
        ,columns: [
            {
                field: 'num',
                title: '序号',
                sortable: true,
                formatter : function(value, row, index) {
                    //return index + 1;
                    var pageSize=limit;//通过表的#id 可以得到每页多少条
                    var pageNumber=offset/limit + 1;//通过表的#id 可以得到当前第几页
                    return pageSize * (pageNumber - 1) + index + 1;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
                }
            }, {
                field: 'createTimeShow',
                title: '提问时间'
            }, {
                field: 'questionTypeName',
                title: '问题分类'
            }, {
                field: 'questionDescriptShow',
                title: '问题描述'
            }, {
                field: 'createStaff',
                title: '提问人'
            }, {
                field: 'createStaffNum',
                title: '提问人手机号码'
            }, {
                field: 'belongToName',
                title: '提问人归属单位'
            }, {
                field: 'isReplay',
                title: '是否回复'
            }, {
                field: 'dealStaffName',
                title: '回复人'
            }, {
                field:'id',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter
            }, ]
        , onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
        }
        , onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }
        , responseHandler: function (res) {//获取数据解析
            //根据数据的返回格式解析这里可能需要修改
            var obj = {total: 0, rows: []};//table表格需要
            obj.total = res.total;
            for(var i=0; i<res.rows.length;i++){
                //问题描述保留12个字
                if(res.rows[i].questionDescript.length>12){
                    res.rows[i].questionDescriptShow=res.rows[i].questionDescript.substring(0,12)+"……";
                }else {
                    res.rows[i].questionDescriptShow=res.rows[i].questionDescript;
                }

                //测试时间
                console.log(res.rows[i].createTime.time);
                res.rows[i].createTimeShow=transTime(res.rows[i].createTime.time);
                console.log(res.rows[i].createTimeShow);


                /*//是否回复
                if(res.rows[i].questionState=="2"){
                    res.rows[i].isReplay="已回复";
                }else if(res.rows[i].questionState=="0"){
                    res.rows[i].isReplay="未回复";
                }*/
            }
            obj.rows = res.rows;
            return obj;
        }
    });
}

/**
 * json时间对象转换成 yyyy-MM-dd
 * @param dat
 * @returns {string}
 */
function transTime(timestamp) {
    var date = new Date(timestamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
}


/**
 * 操作栏格式化
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
function actionFormatter(value, row, index) {
    var id = value;
    var result = "";
    var title;
    if(row.questionState=="2"){
        title="详情";
    }else if(row.questionState=="0"){
        title="回复";
    }
    result += "<a href='javascript:;' class='red' onclick=\"action('" + id + "','" + row.questionDescript + "','" + title + "','" + row.id + "')\"><span style='color: orange'>"+title+"</span></a>";

    return result;
}

/**
 * 操作
 * @param id
 */
function action(id,questionDescript,title,id) {
    if(title=="详情"){
        $("#replay").css('display','none');
    }else {
        $("#replay").css('display','block');
    }
    $("#dateDetail").css('display','block');
    $("#detail").html(questionDescript);
    $("#id").val(id);
}

/**
 * 关闭弹窗
 */
$("#close").click(function () {
    $("#dateDetail").css('display','none');
});

//点击回复
$("#replay").click(function () {
    console.log(getUrlParam("userParam"));
    $.ajax({
        type: 'post',
        url: getOutUrl(getRootPath_web(), "/report/updateFromFeedback?id="+$("#id").val()+"&userParam="+getUrlParam("userParam")),
        dataType: 'json',
        async: false,
        data: {
            "timestamp": Date.parse(new Date())
        },
        success: function (data) {
            if(data.state==1){
                console.log("回复成功！");
                //关闭弹窗
                $("#dateDetail").css('display','none');
                $("#searchBtn").click();
            }else{
                console.log("回复失败！");
            }

        }
    });
});