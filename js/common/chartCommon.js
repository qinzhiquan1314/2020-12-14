
/***************************echarts 公用方法********************/

var A_CLASS = "NUM";

/**
 * 查询整个页面配置的图形数据 
 * 返回多个 {"1489657804328101#LINE":{},"1489657804328102#LINE":{}}
 * 
 * @param chartType  'GROUP LINE BARV BARH PIE PIEONE GAUGE MAPCHINA TREEMAP RADAR' 
 * @param uriParams  传参：'chartId=&query1=&query2=&query3='
 *                    chartId为数据库中p_chart_id or chart_id
 * @param echartsVersion echarts版本:echarts2 or echarts3 
 */
function analysisLoadAllData(chartType,uriParams,echartsVersion) {
	// http://10.13.8.7:9800/show-manage/chartValue/GROUP?chartId=1489657804328&query2=2017-02-23&query3=2017-03-23&token=CHALLENGEEVERYTHING
	var url = getSisterUrl(web_service_url,"/show-manage/chartValue/"+ chartType +"?"+uriParams);
	$.ajax({
	    type : "GET",
	    async : true,
	    url : url,
	    dataType : "json",
	    success : function(resData) {   
	        if(resData == null) return;
	        
	        // 循环遍历后台返回的map， key （chartid#chartType）
	        for(var key in resData){
	
	          var tempArr = key.split("#");
	          var chartId = tempArr[0];
	          var chartType = tempArr[1];
	          var sData = resData[key];
	          
	          //if(sData == null || sData == "") return;
	          if(sData != null && sData != "") {
	        	  if (chartType == "DIV") {// 单独DIV块儿
		        	  reSetDIV(chartId,sData);
		          } else if (chartType == "DIVWARN") {// 单独DIV块儿 告警 替换背景图
		        	  reSetDIVWARN(chartId,sData);
		          } else if (chartType == "UL") {// 单独UL块儿
		        	  reSetUL(chartId,sData);
		          } else if (chartType == "TABLE") {// 单独TABLE块儿
		        	  reSetTable(chartId,sData);
		          } else {//echarts类型					
                if (echartsVersion != null && echartsVersion != "") {
                  reSetEcharts3(chartId,chartType,sData);
                }	else {// 默认echarts2
                  reSetEcharts(chartId,chartType,sData);
                }		
		          }
	          }
	          
	        }
	          
	    },
	    error : function(errorMsg) {
	    }
	});
    
}


/*********************************************************************/

/**
 * 查询单个图形的数据 (某个图形需要特殊处理数据，拷贝使用该ajax即可)
 * 返回一个 {"1489657804328104#LINE":{}}
 * 
 * @param chartId    数据库中chart_id
 * @param chartType  'LINE BARV BARH PIE PIEONE GAUGE MAPCHINA TREEMAP RADAR' (除了 GROUP)
 * @param uriParams  传参：'chartId=&query1=&query2=&query3='
 * @param echartsVersion echarts版本:echarts2 or echarts3 
 */
function analysisLoadOneChatData(chartId,chartType,uriParams,echartsVersion) {
	// http://10.13.8.7:9800/show-manage/oneChartValue/UL?chartId=1489657804328101&token=CHALLENGEEVERYTHING
	var url = getSisterUrl(web_service_url,"/show-manage/oneChartValue/"+ chartType + "?" + uriParams);
	$.ajax({
	    type : "GET",
	    async : true,
	    url : url,
	    dataType : "json",
	    success : function(resData) {   
	        if(resData == null) return;
	        
	        // 循环遍历后台返回的map， key （chartid#chartType）
	        for(var key in resData){
	
	          var tempArr = key.split("#");
	          var chartType = tempArr[1];
	          var sData = resData[key];
	          
	          //if(sData == null || sData == "") return;
	          if(sData != null && sData != "") {
	        	  if (chartType == "DIV") {// 单独DIV块儿
		        	  reSetDIV(chartId,sData);
		          } else if (chartType == "DIVWARN") {// 单独DIV块儿 告警 替换背景图
		        	  reSetDIVWARN(chartId,sData);
		          } else if (chartType == "UL") {// 单独UL块儿
		        	  reSetUL(chartId,sData);
		          } else if (chartType == "TABLE") {// 单独TABLE块儿
		        	  reSetTable(chartId,sData);
		          } else {//echarts类型					
		        	  if (echartsVersion != null && echartsVersion != "") {
                  reSetEcharts3(chartId,chartType,sData);
                } else {// 默认echarts2
                  reSetEcharts(chartId,chartType,sData);
                }   
		          }
	          }
	        }
	          
	    },
	    error : function(errorMsg) {
	    }
	});
    
}

/*******************************************************************/
/**
 * 给DIV赋值
 * 
 * 前台配置 class='NUM_6' 要展示数值固定长度,不够用0前补齐数值
 * 
 * @param chartId
 * @param sData
 */
function reSetDIV(chartId,sData){
	
	// div是否定义
    if($("#main"+chartId).length > 0) { 
    	var imgclass = $("#main"+chartId).attr('class');

        // 如果设置了该class则替换图片，没有设置则直接显示
        if (imgclass != undefined && imgclass.indexOf(A_CLASS) > -1){
            
            var len = Number(imgclass.split('_')[1]);// 要展示数值固定长度
            var theNum = sData + '';// 数值
            var len2 = theNum.length;// 数值长度
            // 用0前补齐数值，达到lenNum长度
            var replaceStr = 0 + '';
                for(var j=0;j<len - len2;j++) {
                  theNum = replaceStr + theNum;
                }
                theNum = theNum + '';

            // 获取第一个img的样式
            var imgFirst = $("#main"+chartId+" img:first");
            var imgObj= imgFirst.clone(true);
            $("#main"+chartId).empty();

            // 循环数字替换图片
            for (var i=0;i<len;i++){
              var imgClone = imgObj.clone(true);
              var curNum = theNum[i]
              //var aImg = "<img src='my-img/"+curNum+".png'/>";
              var srcStr =imgClone.attr("src");
              srcStr = srcStr.substr(0,srcStr.lastIndexOf("/")+1) + curNum + srcStr.substr(srcStr.lastIndexOf(".png"),srcStr.length);
              imgClone.attr("src",srcStr);

              $("#main"+chartId).append(imgClone);
            }
        } else {
          $("#main"+chartId).text(sData);
        } 
    }
}

/**
 * 给DIVWARN 赋值并告警替换背景图
 * 
 * 前台配置 .divImg-0 .divImg-1 .... (sData告警是几就配一个css按规则)
 * 
 * 例如：后台数据告警 	 1：绿 2：黄 3：红
 *     前台css分别写样式： .divImg-1 .divImg-2 .divImg-3
 *     初始配置css:      .divImg-0 
 * @param chartId
 * @param sData
 */
function reSetDIVWARN(chartId,sData){
	if (sData[0] == undefined || sData[0] == null) return;
	// div是否定义
    if($("#main"+chartId).length > 0) { 
    		var divValue = sData[0].value;
        var warnValue = sData[0].warn;
        var oldClass = $("#main"+chartId).attr('class');
        var imgClass = oldClass.split('-')[0];// .divImg-0 .divImg-1 ....
        var imgWarn = imgClass + '-' + warnValue;

        $("#main"+chartId).removeClass(oldClass).addClass(imgWarn);
        $("#main"+chartId).text(divValue);
    }
    
}

/**
 * 给UL赋值
 * 
 * 前台配置 class='NUM_span_3' 每一行3个span元素
 * 
 * @param chartId
 * @param sData
 */
function reSetUL(chartId,sData){
	
	// div是否定义
    if($("#main"+chartId).length > 0) { 
		$("#main"+chartId).empty();
		var strClass = $("#main"+chartId).attr('class');
	
	    // 如果设置了class='NUM_span_3' 每一行3个span元素
	    if (strClass != undefined && strClass.indexOf(A_CLASS) > -1){
	    	var arr = strClass.split('_');
	    	var ll = arr[1];
	    	var llNum = arr[2];
	    
			for(var i = 0 ;i<sData.length;i++) {
	            /* 循环第一行li里面的子元素，分别改变内容并追加到ul里*/
	            var strHtml = "<li>";
	            for (var j = 0;j<llNum;j++){
	            	strHtml = strHtml + "<"+ll+">"+sData[i]['value'+(j+1)]+"</"+ll+">";
	            }
	            strHtml = strHtml + "</li>";
	            $("#main"+chartId).append(strHtml);
	        }
	    }
    }
}


/**
 * 给table赋值
 * 
 * 前台配置 class='TABLE_4' 每一行4个td元素
 * 
 * @param chartId
 * @param sData
 */
function reSetTable(chartId,sData){
	// div是否定义
    if($("#main"+chartId).length > 0) {
    	$("#main"+chartId+" tbody").empty();
    	var strClass = $("#main"+chartId).attr('class');

    	
        // 如果设置了class='TABLE_4' 每一行4个td元素
        if (strClass != undefined){
        	var arr = strClass.split('_');
        	var tdNum = arr[1];
    		for(var i = 0 ;i<sData.length;i++) {
                var strHtml = "<tr>";
                for (var j = 0;j<tdNum;j++){
                	strHtml = strHtml + "<td>"+sData[i]['value'+(j+1)]+"</td>";
                }
                strHtml = strHtml + "</tr>";
                $("#main"+chartId+" tbody").append(strHtml);
            }
    		
        }
        
    }
}

/**
 *  给echarts图赋值
 *  
 * @param chartId
 * @param chartType 
 * @param sData
 */
function reSetEcharts(chartId,chartType,sData){
	
	// div是否定义
    if($("#main"+chartId).length > 0) {
    	var mc = eval("myChart"+chartId);
        var op = eval("option"+chartId);
        if(undefined == mc || undefined == op) return;
        
        var tempStr = "";
        // PIEONE 饼图单环单值特殊处理
        if(chartType == 'PIEONE'){

            for(var i = 0;i < sData.series.length;i++){  
                var s_name = sData.series[i].name;
                var s_data=sData.series[i].data;
                //var s_type=sData.series[i].type;

                for(var j = 0;j<op.series.length;j++) {
                   // 前台必须定义全局变量labelFromatter，数据有值时的样式
                   if ("undefined" != typeof labelFromatter){
                          op.series[j].itemStyle = labelFromatter;
                    }
                   if (op.series[j].name == s_name) {
                      var ooData = op.series[j].data;
                      var aName = s_data[0].name; 
                      var aValue = s_data[0].value; 
                      var otherValue = 100 - Number(aValue);// 剩余百分数

                      /*循环series的data ，分别给两个赋值，其中一个name:other固定写法*/
                      for(var k = 0;k<ooData.length;k++){
                        if (ooData[k].name == "other") {
                           op.series[j].data[k].value = otherValue;
                        } else {
                           op.series[j].data[k].name = aName;
                           op.series[j].data[k].value = aValue;
                        }
                      }

                      
                   }
                }

            }
        // PIE 饼图特殊处理
        } else if(chartType == 'PIE'){
            for(var i = 0;i < sData.series.length;i ++){  
                var s_name = sData.series[i].name;
                var s_data=sData.series[i].data;
                
                // 处理s_data. 值为0时新增样式 pie_labelFromatter
                if("undefined" != typeof pie_zero_labelFromatter){
                    
    									for(var k = 0;k<s_data.length;k++){
    									   if( Number(s_data[k].value)<=0.00){
    										  s_data[k].itemStyle=pie_zero_labelFromatter;
    									   }else{
    										   //s_data[k].itemStyle=pie_noZero_labelFromatter;
    									   }
    									}
                }

                for(var j = 0;j<op.series.length;j++) {
                   if (op.series[j].name == s_name) {
                      op.series[j].data = s_data;
                   }
                }

            }
        // PIE 饼图特殊处理
        } else if(chartType == 'MAPCHINA_RLT'){
            for(var i = 0;i < sData.series.length;i ++){  
                var s_name = sData.series[i].name;
                var s_makePoint_data = sData.series[i].data;
                
                for(var j = 0;j<op.series.length;j++) {
                   if (op.series[j].name == s_name) {
                      op.series[j].markPoint.data = s_makePoint_data;
                   }
                }

            }
        } else {// echart其他类型图
            if(chartType == 'BARV' || chartType == 'LINE') op.xAxis[0].data = sData.category;
            if(chartType == 'BARH') op.yAxis[0].data = sData.category;
            
            for(var i = 0;i < sData.series.length;i ++){  
                var s_name = sData.series[i].name;
                var s_data=sData.series[i].data;
                //var s_type=sData.series[i].type;

                for(var j = 0;j<op.series.length;j++) {
                   if (op.series[j].name == s_name) {
                      op.series[j].data = s_data;
                   }
                }

            }
        }
        
        // subtext展示数据
        if(op.title != undefined && op.title.subtext != undefined) op.title.subtext = sData.subtext;//tempStr;

        //mc.clear();
        mc.hideLoading();
        mc.setOption(op,true);//notMerger参数为true阻止与上次option的合并
        //mc.refresh();
    	
    }
	
}

/**
 * 给echarts3 图赋值
 *  
 * @param chartId
 * @param chartType 
 * @param sData
 */
function reSetEcharts3(chartId,chartType,sData){
  
  // div是否定义
    if($("#main"+chartId).length > 0) {
        var mc = eval("myChart"+chartId);
        var op = eval("option"+chartId);
        if(undefined == mc || undefined == op) return;
        
        var tempStr = "";
        // PIEONE 饼图单环单值特殊处理
        if(chartType == 'PIEONE'){

            for(var i = 0;i < sData.series.length;i++){  
                var s_name = sData.series[i].name;
                var s_data=sData.series[i].data;
                //var s_type=sData.series[i].type;

                for(var j = 0;j<op.series.length;j++) {
                   // 前台必须定义全局变量labelFromatter，数据有值时的样式
                   if ("undefined" != typeof labelFromatter){
                          op.series[j].itemStyle = labelFromatter;
                    }
                   if (op.series[j].name == s_name) {
                      var ooData = op.series[j].data;
                      var aName = s_data[0].name; 
                      var aValue = s_data[0].value; 
                      var otherValue = 100 - Number(aValue);// 剩余百分数

                      /*循环series的data ，分别给两个赋值，其中一个name:other固定写法*/
                      for(var k = 0;k<ooData.length;k++){
                        if (ooData[k].name == "other") {
                           op.series[j].data[k].value = otherValue;
                        } else {
                           op.series[j].data[k].name = aName;
                           op.series[j].data[k].value = aValue;
                        }
                      }

                      
                   }
                }

            }
        // PIE 饼图特殊处理
        } else if(chartType == 'PIE'){
            for(var i = 0;i < sData.series.length;i ++){  
                var s_name = sData.series[i].name;
                var s_data=sData.series[i].data;
                
                // 处理s_data. 值为0时新增样式 pie_labelFromatter
                if("undefined" != typeof pie_zero_labelFromatter){
                    
                      for(var k = 0;k<s_data.length;k++){
                         if( Number(s_data[k].value)<=0.00){
                          s_data[k].itemStyle=pie_zero_labelFromatter;
                         }else{
                           //s_data[k].itemStyle=pie_noZero_labelFromatter;
                         }
                      }
                }

                for(var j = 0;j<op.series.length;j++) {
                   if (op.series[j].name == s_name) {
                      op.series[j].data = s_data;
                   }
                }

            }
        // PIE 饼图特殊处理
        } else if(chartType == 'MAPCHINA_RLT'){
            for(var i = 0;i < sData.series.length;i ++){  
                var s_name = sData.series[i].name;
                var s_makePoint_data = sData.series[i].data;
                
                for(var j = 0;j<op.series.length;j++) {
                   if (op.series[j].name == s_name) {
                      op.series[j].markPoint.data = s_makePoint_data;
                   }
                }

            }
        } else {// echart其他类型图
            if(chartType == 'BARV' || chartType == 'LINE') op.xAxis.data = sData.category;
            if(chartType == 'BARH') op.yAxis.data = sData.category;
            
            for(var i = 0;i < sData.series.length;i ++){  
                var s_name = sData.series[i].name;
                var s_data=sData.series[i].data;
                //var s_type=sData.series[i].type;

                for(var j = 0;j<op.series.length;j++) {
                   if (op.series[j].name == s_name) {
                      op.series[j].data = s_data;
                   }
                }

            }
        }
        
        // subtext展示数据
        if(op.title != undefined && op.title.subtext != undefined) op.title.subtext = sData.subtext;//tempStr;

        //mc.clear();
        mc.hideLoading();
        mc.setOption(op,true);//notMerger参数为true阻止与上次option的合并
        //mc.refresh();
      
    }
  
}
