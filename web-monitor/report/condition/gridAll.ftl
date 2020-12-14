            <div class="qryCon2" id="gridAll">
                <label>${con.label!"网格"}:</label>
                <div>
                    <select class="form-control" id="gridMain" autocomplete="off">
                        <option value="">全部属地分公司</option>
                        <#list gridAreas as gridArea>
                        <option value="${gridArea.sourceCode}">${gridArea.srouceName}</option>
						</#list>
                    </select>
                </div>
                <div>
                    <select class="form-control" id="gridSub" autocomplete="off">
                         <option value="">请选择网格</option>
                    </select>
                </div>
            </div>
            
            <script type="text/javascript">
            
				queryCons.push({
					name:'gridAll',
					key:'${con.key!"gridId"}',
					require:${con.require!"false"},
					gridInfos:"${gridInfos}",
					init:function(){					
						var tmpGridInfos = this.gridInfos;  
						$("#gridMain").change(function (){
							var val = $(this).val();
							$("#gridSub option:gt(0)").remove();
							$.each(tmpGridInfos.split(','),function(index,value){
								var tmp = value.split('|');
								if(val==tmp[0]){
							    	$("#gridSub").append("<option value='"+tmp[1]+"'>"+tmp[2]+"</option>");
								}
							});
						});		
					},
					initValue:function(paramObj){
						var gridVal = paramObj[this.key];
						if(gridVal==undefined){
							return;
						}
						
						var gridAreaVal = "";
						$.each(this.gridInfos.split(','),function(index,value){
							var tmp = value.split('|');
							if(gridVal==tmp[1]){
						    	gridAreaVal = tmp[0];
							}
						});
						if(gridAreaVal==""){
							return;
						}
						
						$("#gridMain").val(gridAreaVal);						
						$("#gridSub option:gt(0)").remove();
						$.each(this.gridInfos.split(','),function(index,value){
							var tmp = value.split('|');
							if(gridAreaVal==tmp[0]){
						    	$("#gridSub").append("<option value='"+tmp[1]+"'"+(tmp[1]==gridVal?"selected":"")+">"+tmp[2]+"</option>");
							}
						});
					},
					reset:function(gridShow){
						if(gridShow==true || gridShow=="true"){
							$("#gridAll").css("display", "block");
						}else{
							$("#gridAll").css("display", "none");
						}
					},
					check:function(){
						if($("#gridAll").css("display")=="block" && $("#gridMain").val()!="" && $("#gridSub").val()==""){						
							layer.msg("请选择网格!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var v = new Object();
						if($("#gridAll").css("display")=="block"){
							v[this.key] = $("#gridSub").val();
						}
						return v;
					}
				});
			</script>
