//属地(monitorMonthByAreaNew)or发展(monitorMonthByDevelopAreaNew)
var reportKey;
//分公司
var saleArea = "all";
var salesLine = "all";
var branchOffice = "all";
//指标百分率
var indexRate="资源不匹配率" ;
//指标名称
var indexName="资源不匹配率";
//校验标识
var userParam = window.location.href.substr(window.location.href.indexOf("?")+1);
var orderStyle = getUrlParam('orderStyle');
if(orderStyle) {
    userParam = getUrlParam('userParam');
}
//雷达图图例联动
var widebandRadarLegend="属地分公司完成值"
var radarLegend=""
//陆师傅后台接口
//生产  http://132.90.101.202/lbsapi/dloc/dskpi
//测试  http://132.77.114.86:8050/dloc/dskpi
var staticUrl = "http://132.90.101.202/lbsapi/dloc/dskpi";
//IE浏览器刷新页面下拉框回复默认值
/*window.onbeforeunload = function(){
	$("#salesLine").find("option[value=queryValues]").attr("selected","selected");
	$("#branchOffice").find("option[value=queryValues]").attr("selected","selected");
	$("#chooseTable").find("option[value='all']").attr("selected","selected");
	$("#liabilityState").find("option[value=queryValues]").attr("selected","selected");
	$("#liabilityStates").find("option[value=queryValues]").attr("selected","selected");
	$("#liabilityState11").find("option[value=queryValues]").attr("selected","selected");
	$("#liabilityStates1").find("option[value=queryValues]").attr("selected","selected");
}*/
/*window.onload = function(){
	$("#salesLine").find("option[value='all']").attr("selected","selected");
	$("#branchOffice").find("option[value='all']").attr("selected","selected");
	$("#chooseTable").find("option[value='all']").attr("selected","selected");
	$("#liabilityState").find("option[value='all']").attr("selected","selected");
	$("#liabilityStates").find("option[value='all']").attr("selected","selected");
	$("#liabilityState11").find("option[value='all']").attr("selected","selected");
	$("#liabilityStates1").find("option[value='all']").attr("selected","selected");
}*/
$(function () {
	$("#salesLine").find("option[value='all']").attr("selected","selected");
	$("#branchOffice").find("option[value='all']").attr("selected","selected");
	$("#chooseTable").find("option[value='all']").attr("selected","selected");
	$("#liabilityState").find("option[value='all']").attr("selected","selected");
	$("#liabilityStates").find("option[value='all']").attr("selected","selected");
	$("#liabilityState11").find("option[value='all']").attr("selected","selected");
	$("#liabilityStates1").find("option[value='all']").attr("selected","selected");
});
//点击选择显示内容
$(".select_tit").click(function () {
    if ($(".select_main").hasClass("hide")) {
        $(".select_main").removeClass("hide").addClass("show");
        $(".zhezhao").removeClass("hide").addClass("show");
    }else {
        $(".select_main").removeClass("show").addClass("hide");
        $(".zhezhao").removeClass("show").addClass("hide");
    }
});
//鼠标指上更改背景色
$(".stit,.sel").mouseover(function () {
    $(".stit,.sel").removeClass("bg");
    $(this).addClass("bg");
});
//选中更改选择的内容
var tableTextId = "chooseTable"
$(".sel").click(function () {
    var text = $(this).text();
    $(".select_main").removeClass("show").addClass("hide");
    $("#"+ tableTextId +" .select_tit").text(text);
})
//展开收缩
$(".stit").click(function () {
    var display = $(this).next(".small").css("display");
    if (display == 'none') {
        $(this).next().slideDown();
    }else {
        $(this).next().slideUp();
    }
});
//选择内容隐藏
$(".zhezhao").click(function(){
	$(".select_main").removeClass("show").addClass("hide");
	$(".zhezhao").removeClass("show").addClass("hide");
})
//select浏览器兼容问题
function IEVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    if(isIE){
    	$(".select_main").css("margin-top","-34px");
    	$(".select_main").css("border","1px solid #000");
    }
}
IEVersion();

function keyIndexLoad(){
    if(orderStyle) {
        reportKey="monitorMonthByAreaNew"
        saleArea = branchOffice;
        indexRate = "all"
        $("#widebandPossession div").removeClass("spcheck").eq(0).addClass("spcheck");
        $(".conRightTitlesele select").hide().eq(0).show();
        //权限判断
        saleArea=judgePower("1");
        $("#areaName").html("资源不匹配率");
        widebandRadarLegend=($('#branchOffice option:selected').text())+"完成值";
        widebandRadarLegend=($('#branchOffice option:selected').text())+"完成值";
        if (orderStyle ==1){
            wideBandTypeFunction();
        }else if(orderStyle ==2){  //branchOffice
            mobileType();

        }else if(orderStyle ==3){
            toBeContinued();
        }
    }else {
        saleArea = branchOffice;
        indexRate = "all"

        $("#widebandPossession div").removeClass("spcheck").eq(0).addClass("spcheck");
        $(".conRightTitlesele select").hide().eq(0).show();

        //权限判断
        saleArea=judgePower("1");
        console.log("huo"+saleArea);

        dataTable();
        lineInit(areaLegend,areaSeries);
        barInit(indexName)
        $("#areaName").html("资源不匹配率");
        widebandRadarLegend=($('#branchOffice option:selected').text())+"完成值";
    }

};


function judgePower(onlineTypescene){
	var num=-1;//默认选中全部销售线
	var id;
	queryValues=queryPermissionIndex(onlineTypescene);
	if(reportKey=="monitorMonthByAreaNew"){ //属地
		id="branchOffice";
		num =$.inArray(queryValues,areaArr1 );
	}else{
		id="salesLine";
		num =$.inArray(queryValues,developArr1 );
	}
	if(num!=-1) { //权限不是全部销售线
        $("#"+id+"").val(queryValues);
        $("#"+id+"").attr("disabled","disabled");
		return $("#"+id+" option:selected").text();
	}else{
        $("#"+id+"").val(queryValues);
        return "all";
    }
}

//原版
//刚进入页面加载
/*$("#Lnav ul>li").on("click",function(){
		var _index = $(this).index();
		$(this).addClass('Lcheck').siblings().removeClass('Lcheck');
		$('.tables>li').eq(_index).addClass('on').siblings().removeClass('on');
		 reportKey = "monitorMonthByAreaNew";  //默认进来是属地
		 saleArea = branchOffice;
		 indexRate = "all"
		 dataTable();
		 lineInit(areaLegend,areaSeries);
		 barInit("资源不匹配率")
		 $("#areaName").html("资源不匹配率");	
		 radarLegend="属地分公司完成值"
})*/

//选择业务类型  1112新加
var businessType = 'wideBandType'
var mobileIndexName="72小时激活率"
var moblieindexRate='mobile_72_activation'
var mobileOffice=""
var mobilesaleArea = 'all'
var preIndex = 0
var wideBandTypeFunction = function(){
    $("#wideBandReport").removeClass('hide').addClass('show')
    $("#mobileReport").removeClass('show').addClass('hide')
    $("#wideBandOffice").removeClass('hide').addClass('show')
    $("#mobileOffice").removeClass('show').addClass('hide')
    $("#wideBandPossession").removeClass('hide').addClass('show')
    $("#mobilePossession").removeClass('show').addClass('hide')
    tableTextId = "chooseTable";
    businessType = "wideBandType";
    dataTable();
    barInit(indexName)
    $("#areaName").html(indexName);
    if(reportKey=="monitorMonthByAreaNew"){ //属地
        lineInit(areaLegend,areaSeries);
    }else{
        lineInit(developLegend,developSeries);
    }
    preIndex = 0
}
var mobileType = function(){
    $("#wideBandReport").removeClass('show').addClass('hide')
    $("#mobileReport").removeClass('hide').addClass('show')
    $("#wideBandOffice").removeClass('show').addClass('hide')
    $("#mobileOffice").removeClass('hide').addClass('show')
    $("#wideBandPossession").removeClass('show').addClass('hide')
    $("#mobilePossession").removeClass('hide').addClass('show')
    $('#mobilePossession1').addClass('spcheck').siblings().removeClass('spcheck')
    $("#mobileBevelop").addClass("notclick")  //移网设置发展不可点击
    tableTextId = "mobilechooseTable";
    businessType = "mobileType";
    mobileAreaInit()
    mobileRadarLegend=$('#mobileOfficeoption option:selected').text() +"完成值"
    mobileOffice=$('#mobileOfficeoption option:selected').val()
    dataTable();
    barInit(mobileIndexName)
    $("#areaName").html(mobileIndexName);
    lineInit(mobileLegend,mobileSeries);
    preIndex = 1
}
var toBeContinued = function(){
    //跳转到上一次选择
    //$("#orderStyle").find('option[value="1"]').attr("selected","selected");
    var osel=document.getElementById("orderStyle"); //得到select的ID
    var opts=osel.getElementsByTagName("option");//得到数组option
    opts[preIndex].selected=true;//设置option第4个元素，即value="3"为默认选中
    layer.alert('开发中。。。', {
        closeBtn: 0

    })
}

$(document).on("change","#orderStyle",function(){
    var index = $("#orderStyle option:selected").val();
    if (index ==1){
        wideBandTypeFunction();
    }else if(index ==2){  //branchOffice
        mobileType();

    }else if(index ==3){
        toBeContinued();
    }
})
//初始化移网分公司
function mobileAreaInit() {
    $.each( $("#mobileOfficeoption option"),function(index,item){
        $(this).hide();
    });
    $.ajax({
        type : 'get', //测试get，正式post
        cache : false,
        async:false,
        dataType: 'json',  //html?userName=18510729630&exCode=tmall&callCode=131172ad8ea3875a00eac487df6f3d05
        url : staticUrl+"/queryRoles?userId="+userParam,
        data :  {

        },
        error : function(){
            console.error("出现异常");
        },
        success : function(data){
            console.log(data)
            var testStr = []
            if(data.respCode=='0000'){
                testStr = data.data.userRoles.split(",");
                mobileOffice = testStr[0];
                //$("#orderStyle").find('option[value="1"]').attr("selected","selected");
                $("#mobileOfficeoption").find('option[value="'+mobileOffice+'"]').attr("selected","selected");
                $.each(testStr, function (index,item) {
                    $("#mobileOfficeoption option[value='"+item+"']").show();
                });
            }else{
                layer.msg(data.respDesc, {
                    time: 2000 //2s后自动关闭
                });
            }
        }
    });
}
//移网选择分公司
var mobileRadarLegend = '属地分公司完成值'
$(document).on("change","#mobileOffice",function(){
    if ($('#mobileOffice option:selected').val()!="all") {
        mobileOffice =  $('#mobileOffice option:selected').val()

        mobileRadarLegend=$('#mobileOffice option:selected').text() +"完成值"
    }else {
        mobileOffice = "all";
        mobileRadarLegend="属地分公司完成值"
    }
    dataTable();
    barInit(mobileIndexName)
    $("#areaName").html(mobileIndexName);
    lineInit(mobileLegend,mobileSeries)
})
//属地和发展按钮切换
$(document).on('click','#tab4Possession',function(){ //属地
	$(this).addClass('spcheck').siblings().removeClass('spcheck')
	$("#branchOffice").removeClass("hide").addClass("show");
	$("#salesLine").removeClass("show").addClass("hide");
    $("#mobileOffice").removeClass('show').addClass('hide')
	reportKey = "monitorMonthByAreaNew";
	saleArea = branchOffice;
	//权限判断
	saleArea=judgePower("1");
	console.log("获取的归属地市："+saleArea);
	if (saleArea =="all") {
        widebandRadarLegend="属地分公司完成值"
	}else{
		//radarLegend = branchOffice +"完成值";
        widebandRadarLegend=($('#branchOffice option:selected').text())+"完成值";

	}
	indexRate = "all";
	dataTable();
    lineInit(areaLegend,areaSeries);
	indexName="资源不匹配率";
    barInit(indexName)
    $("#areaName").html("资源不匹配率");
})
$(document).on('click','#tab4Bevelop',function(){ //属地
	$(this).addClass('spcheck').siblings().removeClass('spcheck')
	$("#branchOffice").removeClass("show").addClass("hide");
	$("#salesLine").removeClass("hide").addClass("show");
    $("#mobileOffice").removeClass('show').addClass('hide')
	reportKey = "monitorMonthByDevelopAreaNew";
	saleArea = salesLine;
	//权限判断
	saleArea=judgePower("2");
	console.log("获取的销售线地市："+saleArea);
	if(saleArea =="all"){
        widebandRadarLegend="归属销售线完成值"
	}else{
        widebandRadarLegend=($('#salesLine option:selected').text())+"完成值"
	}
	indexRate = "all";
	dataTable();
	lineInit(developLegend,developSeries);
	indexName="一次预约率";
	barInit(indexName);
	$("#areaName").html("一次预约率");
})
//属地分公司  点选时表格、雷达图变化
$(document).on("change","#branchOffice",function(){
	if ($('#branchOffice option:selected').val()!="all") {
		branchOffice = ($('#branchOffice option:selected').text())
        widebandRadarLegend=branchOffice+"完成值"
	}else {
		branchOffice = "all";
        widebandRadarLegend="属地分公司完成值"
	}

	saleArea = branchOffice;
	dataTable();
	barInit(indexName);
	lineInit(areaLegend,areaSeries);
})

//发展销售线 点选时表格、雷达图变化
$(document).on("change","#salesLine",function(){
	if ($('#salesLine option:selected').val()!="all") {
		salesLine = ($('#salesLine option:selected').val());
        widebandRadarLegend=($('#salesLine option:selected').text())+"完成值"
	}else {
		salesLine = "all";
        widebandRadarLegend="归属销售线完成值"
	}
	saleArea = salesLine;
	dataTable();
	barInit(indexName);
	lineInit(developLegend,developSeries);
})

//点击表格中数据，与之联动：柱状图
function chartInit(val) {
	val.parent().parent().parent().find('a').removeClass("checked")
	val.addClass("checked");
    if(businessType =='wideBandType'){   //宽带
        indexName=val.html();
        indexRate = val.attr("name");
    }
    if (businessType =='mobileType') {  //移网
        mobileIndexName = val.html()
        moblieindexRate =  val.attr("name");
    }
	$("#areaName").html(val.html());
	barInit(val.html());
}
//判断表格中点击的**率,添加样式
function clickFlag(){
	var tableArr = $("#tableStat").find('a');
	$.each(tableArr, function(index,value) {
		$(tableArr[index]).removeClass("checked");
		if (indexRate=="all"&&businessType=='wideBandType') {
			$(tableArr[0]).addClass("checked");
		}
		if ($(tableArr[index]).attr("name")==indexRate&&businessType=='wideBandType') {
			$(tableArr[index]).addClass("checked");
		}
        if ($(tableArr[index]).attr("name")==moblieindexRate&&businessType=='mobileType') {
            $(tableArr[index]).addClass("checked");
        }
	})
}

//数据日期
var date = new Date();
date.setDate(date.getDate()-1); //设置天数 -1
var newDate = date.format("yyyy-MM-dd").split("-");
$("#dateYear").html(newDate[0]);
$("#dateMouth").html(newDate[1]);
$("#dateDate").html(newDate[2]);
//表格加载
//移网属地
var mobileArr = ['激活量',
    '<a  class="aaa checked" onclick="chartInit($(this))" name="mobile_72_activation">72小时激活率</a>',
    '&nbsp;&nbsp-派单量','&nbsp;&nbsp-激活量',
    '<a  class="aaa" onclick="chartInit($(this))" name="mobile_72_conversion">72小时转化率</a>',
    '&nbsp;&nbsp-派单量','&nbsp;&nbsp-转化量',
    '<a   class="aaa" onclick="chartInit($(this))" name="mobile_date_activation">当日激活率</a>',
    '&nbsp;&nbsp-派单量','&nbsp;&nbsp-激活量',
    '<a  class="aaa" onclick="chartInit($(this))" name="mobile_data_conversion">当日转化率</a>',
    '&nbsp;&nbsp-派单量','&nbsp;&nbsp-转化量',
    '<a  class="aaa" onclick="chartInit($(this))" name="mobile_month_activation">本月累计激活率</a>',
    '&nbsp;&nbsp-派单量','&nbsp;&nbsp-激活量',
    '<a  class="aaa" onclick="chartInit($(this))" name="mobile_month_conversion">本月累计转化率</a>',
    '&nbsp;&nbsp-派单量','&nbsp;&nbsp-转化量',
    '<a  class="aaa" onclick="chartInit($(this))" name="mobile_month_charge">本月累计激活充值率</a>',
    '&nbsp;&nbsp-激活量','&nbsp;&nbsp-转化量',
    '累计压单量',
    '3天内压单',
]
//宽带属地
var areaArr = ['<a  class="aaa checked" onclick="chartInit($(this))" name="back_type_percent">资源不匹配率</a>',
	'&nbsp;&nbsp-资源类退单量','&nbsp;&nbsp-工单总量',
	'<a  class="aaa" onclick="chartInit($(this))" name="grab_percent">抢单率</a>',
	'&nbsp;&nbsp-成功抢单量','&nbsp;&nbsp-工单总量+意向单总量',
	'<a   class="aaa" onclick="chartInit($(this))" name="io_booking_percent">意向单预约匹配率</a>',
	'&nbsp;&nbsp-意向单预约时间匹配量','&nbsp;&nbsp-有一次预约意向单量',
	'<a  class="aaa" onclick="chartInit($(this))" name="appoint_percent">按时履约率</a>',
	'&nbsp;&nbsp-按时上门施工总量','&nbsp;&nbsp-上门施工量',
	'<a  class="aaa" onclick="chartInit($(this))" name="work_finish_percent_3">竣工率</a>',
	'&nbsp;&nbsp-意向单订单竣工率','&nbsp;&nbsp-互联网化订单竣工率',
	'<a   class="aaa" onclick="chartInit($(this))" name="comment_avg_hour">订单平均历时</a>',
	'&nbsp;&nbsp-订单总历时','&nbsp;&nbsp-竣工量',
	'<a   class="aaa" onclick="chartInit($(this))" name="construct_date_avg">施工平均历时</a>',
	'&nbsp;&nbsp-施工总历时','&nbsp;&nbsp-施工完成量',
	'<a   class="aaa" onclick="chartInit($(this))" name="appointment_date_avg">按用户预约时间平均历时</a>',
	'&nbsp;&nbsp-预约总历时','&nbsp;&nbsp-竣工量',
	'<a   class="aaa" onclick="chartInit($(this))" name="comment_percent">评价率</a>',
	'&nbsp&nbsp-评价工单量','&nbsp&nbsp-竣工单量',
	'<a   class="aaa" onclick="chartInit($(this))" name="comment_percent_all">好评率</a>',
	'&nbsp&nbsp-好评工单量','&nbsp&nbsp-评价工单量',];
//宽带发展
var developArr = ['<a  class="aaa checked" onclick="chartInit($(this))" name="iom_booking_percent">一次预约率</a>',
	'&nbsp;&nbsp-一次预约施工工单量','&nbsp;&nbsp-工单总量',
	'<a   class="aaa" onclick="chartInit($(this))" name="io_order_percent">意向单占比</a>',
	'&nbsp;&nbsp-沃易售意向单订单量','&nbsp;&nbsp-订单总量',
	'<a   class="aaa" onclick="chartInit($(this))" name="io_booking_percent">意向单预约匹配率</a>',
	'&nbsp;&nbsp-意向单预约时间匹配量','&nbsp;&nbsp-有一次预约意向单量',
	'<a   class="aaa" onclick="chartInit($(this))" name="io_appoint_percent">按时履约率</a>',
	'&nbsp;&nbsp-按时上门施工总量','&nbsp;&nbsp-上门施工总量',
	'<a   class="aaa" onclick="chartInit($(this))" name="io_work_percent">订单转化率</a>',
	'&nbsp;&nbsp-工单总量','&nbsp;&nbsp-订单总量',
	'<a   class="aaa" onclick="chartInit($(this))" name="cancel_percent">订单取消率</a>',
	'&nbsp;&nbsp-订单取消量','&nbsp;&nbsp-订单总量']
function dataTable(){
	var tableUrl = ''
	var method = 'post'
	if(businessType =='wideBandType'){   //宽带
		tableUrl = getOutUrl(getRootPath_web(), "/report/findDetail?reportKey="+reportKey +"&saleArea="+encodeURIComponent(saleArea)+"&indexRate="+indexRate+"&areaDate=[1,3]"+"&userParam="+userParam)
		method = 'post'
	}
	if (businessType =='mobileType') {  //移网
		tableUrl = staticUrl+"/queryRadar?saleArea="+mobileOffice+"&userParam="+userParam,
		method = 'get'
	}
	console.log("tableURL = " + tableUrl)
	$("#tableStat").bootstrapTable('destroy')
	$('#tableStat').bootstrapTable({
		    	//url: tableUrl
		         url:tableUrl
		    	,toggle: "table"
		      /*  ,height: 300*/
		        ,method: method  //测试get
		        // ,contentType: "application/x-www-form-urlencoded"
		        ,queryParams: "queryParams"
		        ,pagination: false
		        ,sidePagination: "server"
                ,showRefresh: false 
		        ,showToggle: false
		        ,showPaginationSwitch: false
		        ,showColumns: false
		        ,search: false
		        ,searchAlign: "left"
		        ,sortName: "menuid"
		        ,sortOrder: "asc"
		        ,queryParams: function (params) { 
		        	      return {
		        	      }
		        }
		    	,onLoadSuccess: function(){  //加载成功时执行
		            console.info("加载成功");
		            clickFlag();
		            changeColor();
		        }
		        ,onLoadError: function(){  //加载失败时执行
		              console.info("加载数据失败");
		        }
		        ,responseHandler: function(res){//获取数据解析       	
		        	var obj = {total:0,rows:[]};//table表格需要
		        	if (businessType =='wideBandType'){
                        obj.total = res.total;
                        obj.rows = res.rows[0];
                        if(reportKey=="monitorMonthByAreaNew"){ //属地
                            obj.rows[15].month_data = (obj.rows[15].month_data/60).toFixed(2);  //时间分钟转换为小时
                            obj.rows[16].month_data = (obj.rows[16].month_data/60).toFixed(2);
                            obj.rows[15].day_data = (obj.rows[15].day_data/60).toFixed(2);
                            obj.rows[16].day_data = (obj.rows[16].day_data/60).toFixed(2);
                            for(var i = 0; i < obj.rows.length; i++){ //表格初始化第一列
                                obj.rows[i].name=areaArr[i];
                            }
                            var radarData = [];
                            radarData = rateArr(radarData,res.rows[1][0]);
                            radarData[5] = (radarData[5]/60).toFixed(2);
                            var radarData1 = [];
                            radarData1 = rateArr(radarData1,res.rows[1][1])
                            radarData1[5] = (radarData1[5]/60).toFixed(2);
                            maxData1 = Math.ceil((parseFloat(radarData[5])>parseFloat(radarData1[5])?radarData[5]:radarData1[5])/5)*5; //雷达图坐标处理 时间
                            if (maxData1<=5) {
                                maxData1=5
                            }
                            maxData2 = Math.ceil((parseFloat(radarData[6])>parseFloat(radarData1[6])?radarData[6]:radarData1[6])/5)*5; //雷达图坐标处理 时间
                            if (maxData2<=5) {
                                maxData2=5
                            }
                            maxData3 = Math.ceil((parseFloat(radarData[7])>parseFloat(radarData1[7])?radarData[7]:radarData1[7])/5)*5; //雷达图坐标处理 时间
                            if (maxData3<=5) {
                                maxData3=5
                            }
                            var goodRate = parseFloat(radarData[9])>parseFloat(radarData1[9])?radarData[9]:radarData1[9];
                            areaIndicators[5].max = maxData1;
                            areaIndicators[6].max = maxData2;
                            areaIndicators[7].max = maxData3;
                            maxRate = findRateMax(radarData,radarData1);
                            areaIndicators[0].max = 10;
                            areaIndicators[1].max = maxRate;
                            areaIndicators[2].max = maxRate;
                            areaIndicators[3].max = maxRate;
                            areaIndicators[4].max = maxRate;
                            areaIndicators[8].max = 2;
                            areaIndicators[9].max = Math.ceil(goodRate/5)*5+5;
                            radarInit(areaIndicators,radarData,radarData1); //初始化雷达图
                        }else if (reportKey=="monitorMonthByDevelopAreaNew") {  //发展
                            for(var i = 0; i < obj.rows.length; i++){//表格初始化第一列
                                obj.rows[i].name=developArr[i];
                            }
                            var radarDataDev = [];
                            radarDataDev = rateArr(radarDataDev,res.rows[1][0])
                            var radarData2 = [];
                            radarData2 = rateArr(radarData2,res.rows[1][1])
                            maxRate = Math.ceil(Math.max(findMax(radarDataDev),findMax(radarData2),100)/5)*5;  //雷达图坐标处理
                            for(var i = 0; i < developIndicators.length; i++){
                                developIndicators[i].max = maxRate;
                            }
                            radarInit(developIndicators,radarDataDev,radarData2); //初始化雷达图
                        }
					}else if (businessType =='mobileType') {
                        obj.rows = res.rows[0];
                        for(var i = 0; i < obj.rows.length; i++){ //表格初始化第一列
                            obj.rows[i].name=mobileArr[i];
                        }
                        var mobileRadarData = [];
                        var mobileRadarData2 = [];
                        var mobileRadarData = rateArr(mobileRadarData,res.rows[1][0])
                        var mobileRadarData2 =rateArr(mobileRadarData2,res.rows[1][1])
                        console.log(mobileRadarData2)
                        radarInit(mobileIndicators,mobileRadarData,mobileRadarData2); //初始化雷达图
					}

		        	return obj;
		        }
		    });
}
//对雷达图数据进行特殊处理
function rateArr(radarData,arr){
	for(var i = 0;i < arr.length; i++){
		if (0<arr[i]<1) {
			radarData[i]= parseFloat(arr[i]);
		}else {
			radarData[i] = parseFloat(arr[i]);
		}
	}
	return radarData;
}
//两个数组的最大值
function findRateMax(arr1,arr2){  
	var totalArr = arr1.slice();
	var rateArr = arr2.slice();
	totalArr.splice(5,3);
	rateArr.splice(5,3); 
	var rateMax = Math.ceil(Math.max(findMax(totalArr),findMax(rateArr),100)/5)*5;
	return rateMax;
}
//表格中累计环比变色，红（+）绿（-）
var  arrcount=[]
function changeColor() {
	var 	countcar = $("#tableStat").find("tr")
	for (var i = 0; i < countcar.length; i++) {
			   if(parseFloat($(countcar[i]).find('td').eq(3).text())>0){
				   $(countcar[i]).find('td').eq(3).addClass("styleColor");
			   }	 
	}
}
/* 雷达图开始 */
$("#conLeftBottomCon1").css('width',$(document.body).width()*0.32);
//移网
var mobileRadaLegend=["72小时激活率","72小时转化率","当日激活率","当日转化率","本月累计激活率","本月累计转化率","本月累计激活充值率"]
var mobileIndicators=[]
mobileIndicators.push({
    name: '72小时激活率',
    max: 100
},{
    name: '72小时转化率',
    max: 100,
    axisLabel:{show:false}
},{
    name: '当日激活率',
    max: 100,

},{
    name: '当日转化率',
    max: 100,
    axisLabel:{show:false}
},{
    name: '本月累计激活率',
    max: 100,

},{
    name: '本月累计转化率',
    max: 100,
    axisLabel:{show:false}
},{
    name: '本月累计激活充值率',
    max: 100,
    /*axisLabel:{show:false}*/
})
   var maxData;
   var maxRate;
	var areaIndicators = [];
    areaIndicators.push({
    	name: '资源不匹配率',
    	max: maxRate
    },{
    	name: '抢单率',
    	max: maxRate,
    },{
    	name: '意向单预约匹配率',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '按时履约率',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '竣工率',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '订单平均历时',
    	max: maxData,
    	/*axisLabel:{show:false}*/
    },{
    	name: '施工平均历时',
    	max: maxData,
    	/*axisLabel:{show:false}*/
    },{
    	name: '按用户预约时间平均历时',
    	max: maxData,
    	/*axisLabel:{show:false}*/
    },{
    	name: '评价率',
    	max: maxRate,
    },{
    	name: '好评率',
    	max: maxRate
    })
    var developIndicators = [];
    developIndicators.push({
    	name: '一次预约率',
    	max: maxRate
    },{
    	name: '意向单占比',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '意向单预约匹配率',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '按时履约率',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '订单转化率',
    	max: maxRate,
    	axisLabel:{show:false}
    },{
    	name: '订单取消率',
    	max: maxRate,
    	axisLabel:{show:false}
    })
    function radarInit(indicator,radarData1,radarData2) {
    	if (businessType=="wideBandType"){
            radarLegend = widebandRadarLegend;
		}
        if (businessType=="mobileType"){
            radarLegend = mobileRadarLegend;
        }
    	var radarDataParams1 = [];  //处理雷达图中的负值，雷达图中展现为0，鼠标浮动正常显示
    	var radarDataParams2 = [];
    	for(var i = 0; i < radarData1.length;i++){
    		if(radarData1[i]<0){
    			radarDataParams1[i]=0;
    		}else{
    			radarDataParams1[i]=radarData1[i];
    		}
    	}
    	for(var i = 0; i < radarData2.length;i++){
    		if(radarData2[i]<0){
    			radarDataParams2[i]=0;
    		}else{
    			radarDataParams2[i]=radarData2[i];
    		}
    	}
		var radar = echarts.init(document.getElementById('conLeftBottomCon1'));
		var optionRadar = {
			   /*  title: {
			        text: '基础雷达图'
			    }, */
				tooltip : {  
			        formatter:function(params)  
			        {  
			             var relVal = params.name;  
			             if(relVal=="公司均值"){
			            	 params.value = radarData1
			             }else {
			            	 params.value = radarData2
			             }
			            if(reportKey=="monitorMonthByAreaNew"&&businessType =='wideBandType'){
			            	for (var i = 0, l = params.value.length; i < l; i++) { 
				            	 if (i==5||i==6||i==7) {
				            		 relVal += '<br/>' + areaLegend[i]+ ' : ' +params.value[i]+"小时";  
								 }else{
									 relVal += '<br/>' + areaLegend[i]+ ' : ' +params.value[i]+"%"; 
								 }
			            	}
			         	}else if (reportKey=="monitorMonthByDevelopAreaNew"&&businessType =='wideBandType') {
			         		for (var i = 0, l = params.value.length; i < l; i++) { 
									 relVal += '<br/>' + developLegend[i]+ ' : ' +params.value[i]+"%"; 
				            }  
			         	}else if(businessType =='mobileType'){
                            for (var i = 0, l = params.value.length; i < l; i++) {
                                relVal += '<br/>' + mobileRadaLegend[i]+ ' : ' +params.value[i]+"%";
                            }
                        }
			             return relVal;  
			        } ,

			    },
			    color:['#25EFE2','#c25a19'],
			    legend: {
			    	show: true,         
			        icon: 'rect',// 图例项的 icon。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'也可以通过 'image://url' 设置为图片，其中 url 为图片的链接，或者 dataURI。可以通过 'path://' 将图标设置为任意的矢量路径。         
			        top : '2%', // 图例距离顶部边距
			        left : '70%',
			        itemWidth: 20,
			        itemHeight: 10,
			        textStyle:{//图例文字的样式
			            color:'#fff'
			        },
			        data: [radarLegend,'公司均值' ]
			    },  
			    radar: {
			        // shape: 'circle',
			        name: {
			            textStyle: {
			                color: '#fff',
			                backgroundColor: '',
			                borderRadius: 3,
			                padding: [3, 5]
			           }
			        },
			        indicator: indicator,
			        center: ["50%","50%"],
                    radius:100,
			        axisLabel:{
		                show:true,
		                color:'#333',
		                showMinLabel: false
		            },
			        nameGap: 8,     //名称距离雷达图位置
			        
			    },
			    series: [
			    	{
	                    name: '',
	                    type: 'radar',
	                    symbol: "none", // 去掉图表中各个图区域的边框线拐点
			        data : [
			             {
			            	value:radarDataParams2,
			                name : radarLegend,
			             /*   icon: 'rect', */
			                symbol: 'rect',
			                symbolSize: 3,
			                itemStyle: {
	                            normal: {
	                                lineStyle: {
	                                	color: '#25EFE2',// 图表中各个图区域的边框线颜色
	                                	/*type: 'dashed'*/
	                                },
	                            }
	                        },
			               
			            }, {
			                value :radarDataParams1,
			                name : '公司均值',
			                /*icon: 'rect', */
			                symbol: 'rect',
			                symbolSize: 5,
			                itemStyle: {
	                            normal: {
	                                lineStyle: {
	                                	color: '#c25a19',// 图表中各个图区域的边框线颜色
	                                	type: 'dashed'
	                                },
	                            }
	                        },

			            },
			        ]
			    }]
			};
		radar.setOption(optionRadar, true);
    }
	
/* 雷达图结束*/
/*折线图开始  */
$("#conRightCon1Top").css('width',$(document.body).width()*0.6);
var tempLegend=[];
var tempSeries = [];
//移网
var mobileSeries=[]
var mobileLegend = ['本月累计激活率','本月累计转化率','本月累计激活充值率'];

//宽带
var developLegend = ['一次预约率','意向单占比','意向单预约匹配率','按时履约率','订单转化率','订单取消率'];
var areaLegend = ['资源不匹配率','抢单率','意向单预约匹配率','按时履约率','竣工率','订单平均历时','施工平均历时','按用户预约时间平均历时','评价率','好评率'];
var areaSeries = [];
var developSeries = [];
mobileSeries.push(
    {
        name:'本月累计激活率',
        type:'line',
        color:['#1cbd1c'],
        symbol:'circle',
        symbolSize:10,
        itemStyle : {
            normal : {
                lineStyle:{
                    color:'#1cbd1c'
                }
            }
        },
        data:[],
    },
    {
        name:'本月累计转化率',
        type:'line',
        color:['#CD0000'],
        symbol:'circle',
        symbolSize:10,
        itemStyle : {
            normal : {
                lineStyle:{
                    color:'#CD0000'
                }
            }
        },
        data:[],
    },
    {
        name:'本月累计激活充值率',
        type:'line',
        color:['#db9a34'],
        symbol:'circle',
        symbolSize:10,
        itemStyle : {
            normal : {
                lineStyle:{
                    color:'#db9a34'
                }
            }
        },
        data:[],
    }
)
areaSeries.push(
		{	
            name:'资源不匹配率',
            type:'line',
            color:['#1cbd1c'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#1cbd1c'
					}
				}
			},
			data:[],
        },
        {
            name:'抢单率',
            type:'line',
            color:['#cddb34'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#cddb34'
					}
				}
			},
			data:[],
        },
        {
            name:'意向单预约匹配率',
            type:'line',
            color:['#db9a34'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#db9a34'
					}
				}
			},
		data:[],
        },
        {
            name:'按时履约率',
            type:'line',
            color:['#99ff00'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#99ff00'
					}
				}
			},
		data:[],
        },{
            name:'竣工率',
            type:'line',
            color:['#ff0099'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#ff0099'
					}
				}
			},
		data:[],
        },{
            name:'订单平均历时',
            type:'line',  
            color:['#2ab6c3'],
            symbol:'circle',
            symbolSize:10,
            yAxisIndex: 1,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#2ab6c3'
					}
				}
			},
			data:[],
        },{
            name:'施工平均历时',
            type:'line',  
            color:['#B8860B'],
            symbol:'circle',
            symbolSize:10,
            yAxisIndex: 1,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#B8860B'
					}
				}
			},
			data:[],
        },{
            name:'按用户预约时间平均历时',
            type:'line',  
            color:['#CD0000'],
            symbol:'circle',
            symbolSize:10,
            yAxisIndex: 1,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#CD0000'
					}
				}
			},
			data:[],
        }, {
            name:'评价率',
            type:'line',
          
            color:['#a53cdf'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#a53cdf'
					}
				}
			},
			data:[],
        }, {
            name:'好评率',
            type:'line',
          
            color:['#c25a19'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#c25a19'
					}
				}
			},
			data:[],
        }
)
developSeries.push(
		{	
            name:'一次预约率',
            type:'line',
            color:['#1cbd1c'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#1cbd1c'
					}
				}
			},
            data:[],
        },
        {
            name:'意向单占比',
            type:'line',
            color:['#db9a34'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#db9a34'
					}
				}
			},
            data:[]
        },
        {
            name:'意向单预约匹配率',
            type:'line',
            color:['#cddb34'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#cddb34'
					}
				}
			},
            data:[]
        }, {
            name:'按时履约率',
            type:'line',
            color:['#2ab6c3'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#2ab6c3'
					}
				}
			},
            data:[]
        }, {
            name:'订单转化率',
            type:'line',
            color:['#a53cdf'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#a53cdf'
					}
				}
			},
            data:[]
        }, {
            name:'订单取消率',
            type:'line',
            color:['#c25a19'],
            symbol:'circle',
            symbolSize:10,
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#c25a19'
					}
				}
			},
            data:[]
        }
)
function lineInit(legendData,seriesData) {
    var lineUrl = ''
    var lineMethod = 'post'
    if(businessType =='wideBandType'){   //宽带
        lineUrl = getOutUrl(getRootPath_web(), "/report/findDetail?reportKey="+reportKey +"&saleArea="+encodeURIComponent(saleArea)+"&indexRate=all"+"&areaDate=[2]"+"&userParam="+userParam),
        lineMethod = 'post'
    }
    if (businessType =='mobileType') {  //移网
        lineUrl = staticUrl+"/queryBrokenline?saleArea="+mobileOffice+"&userParam="+userParam,
		 lineMethod = 'get'

    }
	$.ajax({
		type :lineMethod, //测试get，正式post
		cache : false,
		dataType: 'json',
		async:false,
		url : lineUrl,
		data :  { 
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					//console.log(data);
					for (var i = 0; i < seriesData.length; i++) {
						for(var j = 0; j<data.rows[0][0].length;j++){
							seriesData[i].data[j]= parseFloat(data.rows[0][i][j]);
						}
					}
					/*if(reportKey=="monitorMonthByAreaNew"&&businessType=="wideBandType"){
						for (var i = 0; i < seriesData[3].data.length; i++) {
							seriesData[3].data[i]= (seriesData[3].data[i]/60).toFixed(2);
						}
					}*/
				 }
	});
	//提示信息添加%
	var formatterLine;
	var yname;
	if(reportKey=="monitorMonthByAreaNew"&&businessType=="wideBandType"){
		formatterLine =  '{b}<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1cbd1c"></span>\
        	{a0}：{c0}%<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#cddb34"></span>\
        	{a1}：{c1}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#db9a34"></span>\
        	{a2}：{c2}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#99ff00"></span>\
        	{a3}：{c3}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ff0099"></span>\
        	{a4}：{c4}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2ab6c3"></span>\
        	{a5}：{c5}小时<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#B8860B"></span>\
        	{a6}：{c6}小时<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#CD0000"></span>\
        	{a7}：{c7}小时<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#a53cdf"></span>\
        	{a8}：{c8}%<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c25a19"></span>\
        	{a9}：{c9}%<br />',
        	yname = "单位：小时",
        	leftRate= "1%"
	}else if (reportKey=="monitorMonthByDevelopAreaNew"&&businessType=="wideBandType") {
		formatterLine =  '{b}<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1cbd1c"></span>\
        	{a0}：{c0}%<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#cddb34"></span>\
        	{a1}：{c1}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#db9a34"></span>\
        	{a2}：{c2}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2ab6c3"></span>\
        	{a3}：{c3}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#a53cdf"></span>\
        	{a4}：{c4}%<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c25a19"></span>\
        	{a5}：{c5}%<br />',
        	yname = "",
        	leftRate = "1.5%"
	}else if(businessType=="mobileType"){
        formatterLine =  '{b}<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1cbd1c"></span>\
        	{a0}：{c0}%<br />\
        	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#CD0000"></span>\
        	{a1}：{c1}%<br />\
			<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#db9a34"></span>\
        	{a2}：{c2}%<br />',
            yname = "",
            leftRate= "1%"
	}
	var line = echarts.init(document.getElementById('conRightCon1Top'));
	var optionLine = {
	   /*  title: {
	        text: '折线图堆叠'
	    }, */
	    tooltip: {
	        trigger: 'axis',
	        formatter:formatterLine,
			//指示框位置
            position:function(position){
                //获取容器的宽度
                var chartsWidth = $("#threadtrend").width();
                //判断悬停点落在容器的哪测
                if(position[0] < (chartsWidth/2)){
                    position[0] = position[0];
                }else{
                    position[0] = position[0] - 130;
                }
                return [position[0], position[1]];
            },
	    },
	    //图例
	    legend: {
	        data:legendData,
	        top: '0',
	       /* bottom:'100',*/
	        right:'100',
	        width:'800',
	        textStyle:{//图例文字的样式
	            color:'#fff'
	        },
	        selectedMode:false
	    },
	    grid: {
	    	 /* x:'30px',  // 距离容器X方向距离
	            x2:'40px',*/
	        left: leftRate,
	        right: '2%',
	        top:'20%',
	        bottom:'1%',
	        containLabel: true
	    },
	    /* toolbox: {
	        feature: {
	            saveAsImage: {}
	        }
	    }, */
	    xAxis: {
	        type: 'category',
	       // boundaryGap: true,
	        data: createMonthDate().reverse(),
	        axisLabel  : {    // 轴线上的文字
	            textStyle: {
	                color: '#ffffff',
	                fontStyle: 'normal',
	                fontFamily: '微软雅黑'
	            },
	            rotate: 0,
	            margin: 10,
	            interval: 0
	        },
	        axisLine: { 
	        	onZeroAxisIndex: 0,
	            show: true, // X轴坐标线
	            lineStyle: {
	                color: '#ffffff',
	              	width: 1
	            }
	        },
	    },
	    yAxis: [{
	    	name:"单位：%",
	    	/*nameLocation:'middle',*/
	    	nameTextStyle:{
	            fontSize:12,  
	            right:200,
	        },
	        type: 'value',
	        splitLine:{
                show: 'true',
                lineStyle: {
                    color: '#5a66bd',
                }
            },
            axisTick: {
                show: false
            },
	     	axisLine: {
	              show: true, // Y轴坐标线
	              lineStyle: {
	                  color: '#ffffff',
	                  width: 1
	              }
	         }
	    },{
	    	name:yname,
	    	/*nameLocation:'middle',*/
	    	nameTextStyle:{
	            fontSize:12,  
	        },
	    	 type: 'value',
	    	 splitLine:{
	                show: 'true',
	                lineStyle: {
	                    color: '#5a66bd',
	                }
	            },
	            axisTick: {
	                show: false  //y周坐标是否突出
	            },
		     	axisLine: {
		              show: true, // Y轴坐标线
		              lineStyle: {
		                  color: '#ffffff',
		                  width: 1
		              }
		         }
	    }
	    ],
	    series: seriesData,
	};
	line.setOption(optionLine,true);
	/*setTimeout(function(){
		line.resize()
	}, 200)*/
}

/*柱状图开始  */

$("#conRightCon2Top").css('width',$(document.body).width()*0.6);
function barInit(val) {
	var barData = [];
    var bar4 = echarts.init(document.getElementById('conRightCon2Top'));
    var bar4X;
    var barUrl;
    var barMethod;
    var barPossession=["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云", "怀柔","门头沟","平谷","延庆","重通局","其它"];//属地
    var barDevelop=["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云", "怀柔","门头沟","平谷","延庆","重通局","中台","渠道中心","大客户中心","客服中心","其它"];//发展
    var mobilePossession=["二区","三区","四区","五区","七区","八区","通州","昌平","大兴","顺义","房山","密云", "怀柔","门头沟","平谷","延庆","恒宇","汇顾","凌创","电商自有"]
    if(businessType =='wideBandType'){   //宽带
        if(reportKey=="monitorMonthByAreaNew"){
            bar4X =  barPossession;
        }else if (reportKey=="monitorMonthByDevelopAreaNew") {
            bar4X = barDevelop;
        }
        barUrl = getOutUrl(getRootPath_web(), "/report/findDetail?reportKey="+reportKey +"&saleArea="+encodeURIComponent(saleArea)+"&indexRate="+indexRate+"&areaDate=[4]"+"&userParam="+userParam),
        barMethod = 'post'
    } else if (businessType =='mobileType') {  //移网
        bar4X = mobilePossession;
        barUrl = staticUrl+"/queryColumnar?saleArea="+mobileOffice+"&userParam="+userParam+"&indexRate="+moblieindexRate,
        barMethod = 'get'
    }
	$.ajax({
		type : barMethod, //测试get，正式post
		cache : false,
		dataType: 'json',
		async:false,
		url : barUrl,
		data :  { 
				 },
		error : function(){
					console.error("出现异常");
				},
		success : function(data){
					for(var i = 0 ; i < data.rows[0][0].length; i++){
						barData[i] = parseFloat(data.rows[0][0][i]);
					}
					/*if(val=="订单平均历时"){  //分钟改换为小时
						for(var i = 0 ; i < barData.length; i++){
							barData[i] = (barData[i]/60).toFixed(2);
						}
					}*/
				 }
	});

   	var  formatterData = '{b}<br />\
    	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#99d9ea"></span>\
    	{a}：{c}%<br />';
   	var formatterSeries = '{c}%';
   	var yAxisName = "单位：%";
   	if (indexRate =="comment_avg_hour"||indexRate =="construct_date_avg"||indexRate =="appointment_date_avg") {
		 formatterData = '{b}<br />\
		    	<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#99d9ea"></span>\
		    	{a}：{c}小时<br />';
	     formatterSeries ='{c}';
	     yAxisName = "单位：小时"
	}
	var optionBar = {
	        tooltip : {
	            // trigger: 'axis'
	        	formatter:formatterData
	        		
	        },
	        color: ['#5abfde'],  // 柱子颜色
	        legend: {  // 图例
	         	data: [val,val,val,val,val,val],
	            textStyle: {
	                color: '#fff',
	            },
	            itemWidth: 20,
		        itemHeight: 10,
	            right: '3',
	            top:'10'
	        },
	        grid:{  // 可控制图标大小和位置  
	        	 left: '4.1%',
	 	        right: '4.5%',
	            top: '50px', // 距离容器顶部
	            bottom: '60px',  // X轴位置距离容器底部
	        /*    x:'30px',  // 距离容器X方向距离
	            x2:'40px',*/
	            //y2:20,
	            borderColor:'transparent',
	        },
	    	xAxis : {
				type : 'category',
				data : bar4X,
				nameTextStyle : {
					fontSize : 8
				},
				axisLabel : {
					interval : 0,
					rotate : 60,
					formatter : function(value, index) {
						var rt = "";
						for (var i = 0; i < value.length; i++) {
							rt += value.substr(i, 1) + "\n";
						}
						rt = value;
						return rt;
					},
					textStyle:{
		                fontSize:10 // 让字体变大
		            }
					
				},
				axisLine: { 
	                show: true, // X轴坐标线
	                lineStyle: {
	                    color: '#ffffff',
	                  	width: 1
	                }
	            },	
			},
	        yAxis : [
	            {  
	            	name:yAxisName,
	                type : 'value',
	                axisLabel  : {    // 轴线
	                    textStyle: {
	                        color: '#ffffff',
	                        fontStyle: 'normal',
	                        fontFamily: '微软雅黑',
	                    }
	                },
	                splitLine:{
	                    show: 'true',
	                    lineStyle: {
	                        color: '#5a66bd',
	                    }
	                },
	                axisTick: {
	                    show: false
	                },
	                axisLine: {
	                    show: true, // Y轴坐标线
	                    lineStyle: {
	                        color: '#ffffff',
	                        width: 1
	                    }
	                }
	            },

	        ],
	        series : [
	            {
	                name:val,
	                type:'bar',
	                barGap:0,//柱间距离
	                barWidth: 12,  //柱子宽度
	                itemStyle:{
	                	emphasis: {
	                        barBorderRadius: 4    //显示圆角
	                    },
	                    normal:{
	                    	barBorderRadius: 4,
	                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{   //颜色渐变
	                        	offset: 0,
	                            color: '#99d9ea'
	                        }, {
	                        	offset: 1,
	                            color: '#3fa7dc'
	                        }]),
	                        label: {
	                            show: true,      //开启显示
	                            position: 'top', //在上方显示
	                            textStyle: {     //数值样式
	                                color: '#ffffff',
	                                fontSize: 10
	                            },
	                            formatter:formatterSeries
	                        }
	     
	                    },
	                },
	                data:barData
	            },
	        ]
	      };	
	bar4.setOption(optionBar,true);
}
//获取最近六个月的时间
 function createMonthDate () {
    var datelist = []
    var date = new Date()
    var Y = date.getFullYear()
    var M = date.getMonth()
    for (var i = 0; i < 6; i++) {
      var dateoption = ''
      if (M - 1 !== -1) {
      } else {
        M = 12
        Y = Y - 1
      }
      var m = M
      m = m < 10 ? '0' + m : m
      dateoption = Y + '-' + m
      M--
      datelist.push(dateoption)
    }
    return datelist
  }
 //查找最大值
 function findMax(arr){
	 var maxData = arr[0];
	 for(var i = 1; i< arr.length; i++){
		 if (arr[i]>maxData) {
			maxData = arr[i];
		}
	 }
	 return maxData;
 }
 
//报表链接 
 $("#chooseTable .sel,#mobilechooseTable .sel").click(function(){
	 var uri= $(this).attr("value");
	 if(uri.indexOf('?')>0){
		 window.open(getRootPath_web() + uri + '&userParam='+userParam+'&rand=' + new Date().getTime());
	 }else{
    	 window.open(getRootPath_web() + uri + '?userParam='+userParam+'&rand=' + new Date().getTime());
     }
 })
 

var setting = {
			view: {
				showIcon: showIconForTree
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"父节点1 - 展开", open:true},
			{ id:11, pId:1, name:"父节点11 - 折叠"},
			{ id:111, pId:11, name:"叶子节点111"},
			{ id:112, pId:11, name:"叶子节点112"},
			{ id:113, pId:11, name:"叶子节点113"},
			{ id:114, pId:11, name:"叶子节点114"},
			{ id:12, pId:1, name:"父节点12 - 折叠"},
			{ id:121, pId:12, name:"叶子节点121"},
			{ id:122, pId:12, name:"叶子节点122"},
			{ id:123, pId:12, name:"叶子节点123"},
			{ id:124, pId:12, name:"叶子节点124"},
			{ id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
			{ id:2, pId:0, name:"父节点2 - 折叠"},
			{ id:21, pId:2, name:"父节点21 - 展开", open:true},
			{ id:211, pId:21, name:"叶子节点211"},
			{ id:212, pId:21, name:"叶子节点212"},
			{ id:213, pId:21, name:"叶子节点213"},
			{ id:214, pId:21, name:"叶子节点214"},
			{ id:22, pId:2, name:"父节点22 - 折叠"},
			{ id:221, pId:22, name:"叶子节点221"},
			{ id:222, pId:22, name:"叶子节点222"},
			{ id:223, pId:22, name:"叶子节点223"},
			{ id:224, pId:22, name:"叶子节点224"},
			{ id:23, pId:2, name:"父节点23 - 折叠"},
			{ id:231, pId:23, name:"叶子节点231"},
			{ id:232, pId:23, name:"叶子节点232"},
			{ id:233, pId:23, name:"叶子节点233"},
			{ id:234, pId:23, name:"叶子节点234"},
			{ id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
		];

		function showIconForTree(treeId, treeNode) {
			return !treeNode.isParent;
		};

		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});

