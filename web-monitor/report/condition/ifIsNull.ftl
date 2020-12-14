		    <div class="qryCon" id="ifIsNull">
		        <label>${con.label!"订单类型"}:</label>
		        <ul>
		            <li class="searched" value="1">全部</li>
		            <li value="2">新意向单</li>
		            <li value="3">传统订单</li>
		        </ul>
		    </div>
            
			<script type="text/javascript">
				queryCons.push({
					key:'${con.key!"ifIsNull"}',
					init:function(){
						addLiClickListener($("#ifIsNull ul li"));
					},
					initValue:function(paramObj){
						if(paramObj[this.key]==undefined || paramObj[this.key]==""){
							return;
						}
						var sel = $("#ifIsNull ul li[value='"+paramObj[this.key]+"']");
						if(sel.length<=0){
							return ;
						}
						sel.click();
					},
					check:function(){
						if($("#ifIsNull ul li.searched").length!=1){
							layer.msg("请选择"+$("#ifIsNull label:first").html().replace(":","")+"!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){;
						var value = $("#ifIsNull ul li.searched").attr("value");
						
						var v = new Object();
						if(value=="1"){
							v["ifIsNull"] = "all";
						}else if(value=="2"){
							v["ifIsNull"] = "notNul";
						}else if(value=="3"){
							v["ifIsNull"] = "isNull";
						}else{
							v["ifIsNull"] = "all";
						}
						
						return v;
					}
				});
			</script>
			