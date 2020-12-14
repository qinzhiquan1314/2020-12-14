            <div class="qryCon" id="prodCatalog">
                <label>${con.label!"业务类型"}:</label>
                <ul>
                    <li class="searched" value="">全部</li>
                    <li value="CP">融合业务</li>
                    <li value="40">单宽业务</li>
                    <li value="41">快线业务(云/光)</li>
                </ul>
            </div>
            
			<script type="text/javascript">
				queryCons.push({
					key:'${con.key!"prodCatalog"}',
					init:function(){
						addLiClickListener($("#prodCatalog ul li"));
					},
					initValue:function(paramObj){
						if(paramObj[this.key]==undefined || paramObj[this.key]==""){
							return;
						}
						var sel = $("#prodCatalog ul li[value='"+paramObj[this.key]+"']");
						if(sel.length<=0){
							return ;
						}
						sel.click();
					},
					check:function(){
						if($("#prodCatalog ul li.searched").length!=1){
							layer.msg("请选择"+$("#prodCatalog label:first").html().replace(":","")+"!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var value = $("#prodCatalog ul li.searched").attr("value");
						if(value=="1"){
							value = "";
						}
						var v = new Object();
						v[this.key] = value;
						return v;
					}
				});
			</script>
			