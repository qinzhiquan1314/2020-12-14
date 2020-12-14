
//校验标识
var userId = getUrlParam("userParam");
//var userId = "luwb1";
var excode= getUrlParam("exCode");
var dt = getUrlParam("userName");
var callcode = getUrlParam("callCode");
//查询时间
var queryDate;
//是否显示网格0（不显示） 1（显示）
var queryGHFlag=0;
//分公司
var queryAreaCode="";
var testStr;
//生产  http://132.90.101.202/lbsapi/dloc/dskpi
//测试  http://132.77.114.86:8050/dloc/dskpi
var reportUrldev = "http://132.90.101.202/lbsapi/dloc/dskpi";
var reportUrlpram = "&userId="+userId
/*界面点击进来的展示*/
$(function () {
	$("#searchDate").val(new Date().format("yyyy-MM-dd"));
	$.each( $("#selectBranch option"),function(index,item){
		$(this).hide();
	});
	$.ajax({
		type : 'get', //测试get，正式post
		cache : false,
		async:false, 
		dataType: 'json',  //luwb1&excode=dloc&dt=1565344245&callcode=12131abc133qeeeee
		url : reportUrldev+"/queryRoles?userId="+userId,
		data :  {
			
				 },
		error : function(){
				console.error("出现异常");
				},
		success : function(data){
			console.log(data)
			if (data.respCode==5002) {
                layer.msg(data.respDesc, {
                    time: 2000 //2s后自动关闭
                });
                $("#exportBtn").attr("disabled", true);
                $("#searchBtn").attr("disabled", true);
                $("#searchDate").val("");
                $("#searchDate").attr("disabled","disabled");
                $("#ifshow1").css('pointer-events','none')    //

			}
			if(data.respCode==0000){
				testStr = data.data.userRoles.split(",");
				$.each(testStr, function (index,item) {
					$("#selectBranch option[value='"+item+"']").show();
			    });
			}else{
				layer.msg(data.respDesc, {
		 			time: 2000 //2s后自动关闭
				 });
			}
		}
	});
});
/*判断网格是否显示，隐藏相应列*/
$("#ifshow1").click(function(){
	var len = $("input[name='color-input-red']:checked").length;
	if(len==0){
		queryGHFlag = 1;
		$(".wangge").addClass("hide");
		$(".wangge1").removeClass("hide");
	}
	if(len==1){
		queryGHFlag = 0;
		
		$(".wangge").removeClass("hide");
		$(".wangge1").addClass("hide");
	}
	dateTabel();
})

/*查询按钮点击方法*/
$("#searchBtn").click(function(){
	queryAreaCode = $("#selectBranch").find("option:selected").val();
	queryDate = $("#searchDate").val().replace(/-/g,"");
		if (queryAreaCode=="") {
			layer.msg('请选择销售线！', {
	 			time: 2000 //2s后自动关闭
			});
		}
	dateTabel();
})
/*导出按钮点击方法*/
$("#exportBtn").click(function(){
    queryAreaCode = $("#selectBranch").find("option:selected").val();
    queryDate = $("#searchDate").val().replace(/-/g,"");
    if (queryAreaCode=="") {
        layer.msg('请选择销售线！', {
            time: 2000 //2s后自动关闭
        });
    }else{
        window.open(reportUrldev+"/queryExport?&userId="+userId+"&queryAreaCode="+queryAreaCode+"&queryDate="+queryDate+"&queryGHFlag="+queryGHFlag);
	}

})

function dateTabel(){
	$("#assessTable").bootstrapTable('destroy')
	$('#assessTable').bootstrapTable({    //132.77.114.86:8050    //132.80.180.230:8050
		    url : reportUrldev+ "/queryRpt?&userId="+userId+"&queryAreaCode="+queryAreaCode+"&queryDate="+queryDate+"&queryGHFlag="+queryGHFlag
			//url:"backcount.json"
			,toggle: "table"
			//,height: 400
			,method: 'get'  //测试get 正式用post
			,contentType: "application/x-www-form-urlencoded"
			,queryParams: "queryParams"
			,pagination: false
			,sidePagination: "server"
			,pageNumber: "1"
			,pageSize: "10"
			/*,pageList: "[5, 10, 20, 50 ]"*/
			,showRefresh: false 
			,showToggle: false
			,showPaginationSwitch: false
			,showColumns: false
			,search: false
			,searchAlign: "left"
			,sortName: "menuid"
			,sortOrder: "asc"
			,queryParams: function (params) { 
				/*return {
					userParam:locHref
				}*/
			}
			,onLoadSuccess: function(){  //加载成功时执行
				console.info("加载成功");
				var len = $("input[name='color-input-red']:checked").length;
					if(len==0){
						
						$(".wangge").removeClass("hide");
						$(".wangge1").addClass("hide");
						
					}
					if(len==1){
						
						$(".wangge").addClass("hide");
						$(".wangge1").removeClass("hide");
						
						
					}
			}
			,onLoadError: function(){  //加载失败时执行
				console.info("加载数据失败");
			}
			,responseHandler: function(res){//获取数据解析
				//根据数据的返回格式解析这里可能需要修改
				console.log(res)
				var obj = {total:0,rows:[]};//table表格需要
				if(res.respCode=="0000"){
					obj.total = res.data.length;
					for(var i = 0; i< res.data.length; i++){
                        if(res.data[i].dK2URL!="#"){   //https://www.baidu.com/
                            res.data[i].dk2="<a class='bssSubscribe' href="+reportUrldev+res.data[i].dK2URL+reportUrlpram+" target='_blank'>" + res.data[i].dk2+"</a>";
                        }
                        if(res.data[i].pok1url!="#"){
                            res.data[i].pok1="<a class='bssSubscribe' href="+reportUrldev+res.data[i].pok1url+reportUrlpram+" target='_blank'>" + res.data[i].pok1+"</a>";
                        }
                        if(res.data[i].pok2url!="#"){
                            res.data[i].pok2="<a class='bssSubscribe' href="+reportUrldev+res.data[i].pok2url+" target='_blank'>" + res.data[i].pok2+"</a>";
                        }
                        if(res.data[i].t72k1url!="#"){
                            res.data[i].t72k1="<a class='bssSubscribe' href="+reportUrldev+res.data[i].t72k1url+" target='_blank'>" + res.data[i].t72k1+"</a>";
                        }
                        if(res.data[i].t72k2url!="#"){
                            res.data[i].t72k2="<a class='bssSubscribe' href="+reportUrldev+res.data[i].t72k2url+" target='_blank'>" + res.data[i].t72k2+"</a>";
                        }
                        if(res.data[i].t72k4url!="#"){
                            res.data[i].t72k4="<a class='bssSubscribe' href="+reportUrldev+res.data[i].t72k4url+" target='_blank'>" + res.data[i].t72k4+"</a>";
                        }
                        if(res.data[i].tdk1url!="#"){
                            res.data[i].tdk1="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tdk1url+" target='_blank'>" + res.data[i].tdk1+"</a>";
                        }
                        if(res.data[i].tdk2url!="#"){
                            res.data[i].tdk2="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tdk2url+" target='_blank'>" + res.data[i].tdk2+"</a>";
                        }
                        if(res.data[i].tdk4url!="#"){
                            res.data[i].tdk4="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tdk4url+" target='_blank'>" + res.data[i].tdk4+"</a>";
                        }
                        if(res.data[i].tmk1url!="#"){
                            res.data[i].tmk1="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tmk1url+" target='_blank'>" + res.data[i].tmk1+"</a>";
                        }
                        if(res.data[i].tmk2url!="#"){
                            res.data[i].tmk2="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tmk2url+" target='_blank'>" + res.data[i].tmk2+"</a>";
                        }
                        if(res.data[i].tmk4url!="#"){
                            res.data[i].tmk4="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tmk4url+" target='_blank'>" + res.data[i].tmk4+"</a>";
                        }
                        if(res.data[i].tmk7url!="#"){
                            res.data[i].tmk7="<a class='bssSubscribe' href="+reportUrldev+res.data[i].tmk7url+" target='_blank'>" + res.data[i].tmk7+"</a>";
                        }
					}
					obj.rows = res.data;
				}	
				return obj;	
			}
	});
}
