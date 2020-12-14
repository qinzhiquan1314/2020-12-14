		    <div class="qryCon" id="oneFrom">
		        <label>${con.label!"订单类型"}:</label>
		        <ul>
		            <li class="searched" value="1">全部</li>
		            <li value="2">新意向单</li>
		            <li value="3">传统订单</li>
		        </ul>
		    </div>
            
			<script type="text/javascript">
				queryCons.push({
					key:'${con.key!"oneFrom"}',
					init:function(){
						addLiClickListener($("#oneFrom ul li"));
					},
					initValue:function(paramObj){
						if(paramObj[this.key]==undefined || paramObj[this.key]==""){
							return;
						}
						var sel = $("#oneFrom ul li[value='"+paramObj[this.key]+"']");
						if(sel.length<=0){
							return ;
						}
						sel.click();
					},
					check:function(){
						if($("#oneFrom ul li.searched").length!=1){
							layer.msg("请选择"+$("#oneFrom label:first").html().replace(":","")+"!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var value = $("#oneFrom ul li.searched").attr("value");
						
						var v = new Object();
						if(value=="1"){
							v["from"] = "1,2,7";
						}else if(value=="2"){
							v["from"] = "7";
						}else if(value=="3"){
							v["from"] = "1,2";
						}else{
							v["from"] = "1,2,7";
						}
						return v;
					}
				});
			</script>
			