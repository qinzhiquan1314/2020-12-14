<div class="qryCon2" id="buttonQueryDirect">
    <label> </label>
    <div class="btnGrp2">
        <button id="searchBtn" type="button" class="btn btn-orange submitBtn">查询</button>
        <button id="exportBtn" type="button" class="btn btn-orange resetBtn">导出</button>
    </div>
</div>

<script type="text/javascript">
	queryCons.push({
	    name:"buttonQueryDirect",
		merge2Top:${con.merge2Top!false}, 	//模板设置true or false;
		init:function(){		
			$("#searchBtn").click(function(){
				doQueryDirect();
			});
			
			$("#exportBtn").click(function(){
				doDownloadDirect();
			});
			
			this.reset();
		},
		reset:function(){
			if(this.merge2Top){
				var target = $("#buttonQueryDirect").prevAll().filter("div").filter(
					function(index) {
						return $(this).css("display")=="block";
					}
				).first();
				if(target!=null){
					$("#buttonQueryDirect").css("display","none");
					target.children("ul").css("width", "50%");
					target.append($(".btnGrp2"));
					$(".btnGrp2").css("margin-right","20px");
				}
			}
		},
		check:function(){
			return true;
		},
		makeQeryObj:function(){
			return new Object();
		}
	});
	
	function doQueryDirect(){
		//校验
		var isOk = true;
		$.each(queryCons ,function(index,queryCon){
		  	isOk = isOk && queryCon.check();
		});
		if(!isOk){
			return;
		}
		
		//生成查询条件
        var params = {"userParam":userParam};
        $.each(queryCons ,function(index,queryCon){
			$.extend( params, queryCon.makeQeryObj() );
		});

        $.each(params, function(key, value) {
            if (reportKey=="monitorMonthByAreaNew"&&key=="saleArea"&&value!="") {
                params["reportKey"] = "monitorMonthByGrid";
            }else if (reportKey=="monitorDayByAreaNew"&&key=="saleArea"&&value!="") {
                params["reportKey"] = "monitorDayByGrid";
            }else {
                params["reportKey"] = reportKey;
            }
        });
        console.log("params[\"reportKey\"]"+params["reportKey"]);
        //生成查询字符串
		var paramsStr = "";
		$.each(params, function(key, value) {
            paramsStr += "&" + key + "=" + encodeURIComponent(value);
		});
		console.log(paramsStr);
		if(typeof reportKeyTmp!="undefined" && reportKeyTmp != params["reportKey"]) {         //判断reportKey是否修改，修改的话重新加载展示表头
            console.log("需要调用后台查询展示");
            $.ajax({
                type: 'post',
                cache: false,
                dataType: 'json',
                url: getOutUrl(getRootPath_web(), "/report/getReportColumns?reportKey=" + params["reportKey"] + "&userParam=" + userParam),
                data: params,
                error: function () {
                    console.error("出现异常");
                },
                success: function (data) {
                    reportColumnsStr=data.rst;
                    f(paramsStr);
                }
            });
        }else {
            console.log("一切正常");
            f(paramsStr);
        }
        reportKeyTmp=params["reportKey"];
    }
	function f(paramsStr) {
        $("#detailTable").bootstrapTable('destroy');
        var tableColumns = columnsDisplay(JSON.parse(reportColumnsStr), reportKey);
        $('#detailTable').bootstrapTable({
            url: getOutUrl(getRootPath_web(), "/report/find?"+paramsStr)
            , toggle: "table"
            , height: tableHight
            , columns: tableColumns
            , method: 'post'
            , contentType: "application/x-www-form-urlencoded"
            , queryParams: "queryParams"
            , pagination: false
            , sidePagination: "server"
            , pageNumber: "1"
            , pageSize: "10"
            , showRefresh: false
            , showToggle: false
            , showPaginationSwitch: false
            , showColumns: false
            , search: false
            , searchAlign: "left"
            , sortName: "menuid"
            , sortOrder: "asc"
            , queryParams: function (params) {
                return params;
            }
            , onLoadSuccess: function () {  //加载成功时执行
                //columns:tableColumns;
            }
            , onLoadError: function () {  //加载失败时执行
                //columns:tableColumns
            }
            , responseHandler: function (res) {//获取数据解析,	根据数据的返回格式解析这里可能需要修改
                var obj = {total: 0, rows: []};//table表格需要
                obj.total = res.state=="0"? "0": res.total;
                $(".totalDiv").css('display', 'block');
                $("#totalDate").html(obj.total);
                obj.rows = res.rows;
                return obj;
            }
            ,onPostBody: function(){
                initTableHeight();
            }
        });
    }
	function doDownloadDirect(){
		//校验
		var isOk = true;
		$.each(queryCons ,function(index,queryCon){
		  	isOk = isOk && queryCon.check();
		});
		if(!isOk){
			return;
		}


		//生成查询条件
		var params = {"userParam":userParam,"reportKey":reportKey};
		$.each(queryCons ,function(index,queryCon){
			$.extend( params, queryCon.makeQeryObj() );
		});

        $.each(params, function(key, value) {
            if (reportKey=="monitorMonthByAreaNew"&&key=="saleArea"&&value!="") {
                params["reportKey"] = "monitorMonthByGrid";
            }else if (reportKey=="monitorDayByAreaNew"&&key=="saleArea"&&value!="") {
                params["reportKey"] = "monitorDayByGrid";
            }else {
                params["reportKey"] = reportKey;
            }
        });
		
		//生成查询字符串
		var paramsStr = "";
		$.each(params, function(key, value) {
			paramsStr += "&" + key + "=" + encodeURIComponent(value);
		});
		console.log(paramsStr);
		
		$.download(getOutUrl(getRootPath_web(), "/report/export?"+paramsStr), 'post');
	}
</script>