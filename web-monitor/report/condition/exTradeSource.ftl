			<div class="qryCon" id="exTradeSource">
		        <label>${con.label!"订单来源"}:</label>
		        <ul>
		            <li class="searched" value="all" from="">全部</li>
		            <li class="" value="sub1" from="3">集团商城</li>
		            <li class="" value="sub2" from="4,5,8">沃易售</li>
		            <li class="" value="sub3" from="5,8">第三方</li>
		            <li class="" value="sub4" from="">线下实体（预留）</li>
		        </ul>
		    </div>
		    <div class="qryCon hiddenItem" id="exTradeSourceSub1">
		        <label>集团商城:</label>
		        <ul>
		            <li class="searched" value="">全部</li>
		            <li value="BOMO">营业厅微厅</li>
		            <li value="CCS">电子沃店</li>
		            <li value="DANGDANG">当当商城</li>
		            <li value="EMAL">网上商城</li>
		            <li value="ENG">英文商城</li>
		            <li value="GUMA">估吗平台</li>
		            <li value="MENG">英文手机商城</li>
		            <li value="MOBILE">手机商城</li>
		            <li value="O2M">码上购</li>
		            <li value="O2O">华盛O2O</li>
		            <li value="PAIPAI">拍拍商城</li>
		            <li value="PDD">拼多多商城</li>
		            <li value="PERIPHERY">省份商城</li>
		            <li value="PMALL">省份电商</li>
		            <li value="SKYLINE">社会化电商</li>
		            <li value="SMA">中小规模应用</li>
		            <li value="SSHS">助销系统</li>
		            <li value="TAOBAO">天猫商城</li>
		            <li value="ZXQY">中小企业</li>
		        </ul>
		    </div>
		    <div class="qryCon hiddenItem" id="exTradeSourceSub2">
		        <label>沃易售:</label>
		        <ul>
		            <li class="searched" value="A3,A4">全部</li>
		            <li value="A4">意向单</li>
		            <li value="A3">码销</li>
		            <li value="--">行销（预留）</li>
		        </ul>
		    </div>
		    <div class="qryCon hiddenItem" id="exTradeSourceSub3">
		        <label>第三方:</label>
		        <ul>
		            <li class="searched" value="A1,A2,A5,A6,A7">全部</li>
		            <li value="A6">校园</li>
		            <li value="A1,A2,A5,A7">其他</li>
		        </ul>
		    </div>
		    <div class="qryCon hiddenItem" id="exTradeSourceSub4">
		        <label>线下实体:</label>
		        <ul>
		            <li class="searched" value="">全部</li>
		            <li value="">营业厅</li>
		            <li value="">社会渠道</li>
		        </ul>
		    </div>
            
            <script type="text/javascript">
				queryCons.push({
					init:function(){
						$("#exTradeSource ul li").click(function (){
							var v = $(this).attr("value");
							$("#exTradeSourceSub1").css("display", "none");
							$("#exTradeSourceSub2").css("display", "none");
							$("#exTradeSourceSub3").css("display", "none");
							$("#exTradeSourceSub4").css("display", "none");
							if(v=="sub1"){
								$("#exTradeSourceSub1").css("display","block");
							}else if(v=="sub2"){
								$("#exTradeSourceSub2").css("display","block");
							}else if(v=="sub3"){
								$("#exTradeSourceSub3").css("display", "block");
							}else if(v=="sub4"){
								$("#exTradeSourceSub4").css("display", "block");
							}
						});
						addLiClickListener($("#exTradeSource ul li"));
						addLiClickListener($("#exTradeSourceSub1 ul li"));
						addLiClickListener($("#exTradeSourceSub2 ul li"));
						addLiClickListener($("#exTradeSourceSub3 ul li"));
						addLiClickListener($("#exTradeSourceSub4 ul li"));
						
						$("#exTradeSource ul li.searched").click();
					},
					check:function(){
						if("sub4"==$("#exTradeSource ul li.searched").attr("value")){
							layer.msg("暂不支持选择【线下实体（预留）】查询!", {time: 2000});
							return false;
						}
						if("--"==$("#exTradeSourceSub2 ul li.searched").attr("value")){
							layer.msg("暂不支持选择【行销（预留）】查询!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var selected = $("#exTradeSource ul li.searched").attr("value");
						var v1 = "";
						var v2 = "";
						if(selected=="sub1"){
							v1 = $("#exTradeSourceSub1 ul li.searched").attr("value");
							if(v1=="1"){
								v1 = "";
							}
						}else if(selected=="sub2"){
							v2 = $("#exTradeSourceSub2 ul li.searched").attr("value");
						}else if(selected=="sub3"){
							v2 = $("#exTradeSourceSub3 ul li.searched").attr("value");
						}
						var v = new Object();
						v["from"] = $("#exTradeSource ul li.searched").attr("from");
						v["exTradeSource"] = v1;
						v["inmodeCatalog"] = v2;
						return v;
					}
				});
			</script>