            <div class="qryCon" id="tradeCatalog">
                <label>${con.label!"服务类型"}:</label>
                <ul>
                    <li class="searched"  value="0,1">全部</li>
                    <li value="1">装机</li>
                    <li value="0">移机</li>
                </ul>
            </div>
            
			<script type="text/javascript">
				queryCons.push({
					key:'${con.key!"tradeCatalog"}',
					init:function(){
						addLiClickListener($("#tradeCatalog ul li"));
					},
					initValue:function(paramObj){
						if(paramObj[this.key]==undefined || paramObj[this.key]==""){
							return;
						}
						var sel = $("#tradeCatalog ul li[value='"+paramObj[this.key]+"']");
						if(sel.length<=0){
							return ;
						}
						sel.click();
					},
					check:function(){
						if($("#tradeCatalog ul li.searched").length!=1){
							layer.msg("请选择"+$("#tradeCatalog label:first").html().replace(":","")+"!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var v = new Object();
						v[this.key] = $("#tradeCatalog ul li.searched").attr("value");
						return v;
					}
				});
			</script>
			