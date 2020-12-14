		    <div class="qryCon" id="pointType">
		        <label>${con.label!"交付点类型"}:</label>
		        <ul>
		            <li class="searched" value="">全部</li>
		            <li value="00">物流上门</li>
		            <li value="02">营业厅</li>
		            <li value="03">综合网格</li>
		            <li value="04">电商自有</li>
		            <li value="05">电商交付2队</li>
		            <li value="06">分公司团队</li>
		            <li value="99">退单管理</li>
		            <li value="999,,9999">其他</li>
		        </ul>
		    </div>
            
			<script type="text/javascript">
				queryCons.push({
					key:'${con.key!"pointType"}',
					init:function(){
						addLiClickListener($("#pointType ul li"));
					},
					initValue:function(paramObj){
						if(paramObj[this.key]==undefined || paramObj[this.key]==""){
							return;
						}
						var sel = $("#pointType ul li[value='"+paramObj[this.key]+"']");
						if(sel.length<=0){
							return ;
						}
						sel.click();
					},
					check:function(){
						if($("#pointType ul li.searched").length!=1){
							layer.msg("请选择"+$("#pointType label:first").html().replace(":","")+"!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var value = $("#pointType ul li.searched").attr("value");
						if(value=="1"){
							value = "";
						}
						var v = new Object();
						v[this.key] = value;
						return v;
					}
				});
			</script>
			