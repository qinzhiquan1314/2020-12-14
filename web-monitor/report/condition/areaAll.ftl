            <div class="qryCon2" id="areaAll">
                <label>${con.label!"销售线"}:</label>
                <div>
                    <select class="form-control" id="areaMain" name="areaMain" autocomplete="off">
                                        <option value="all">请选择归属销售线</option>
                                        <option value="1">市区</option>
                                        <option value="2">近郊</option>
                                        <option value="3">远郊</option>
                                        <option value="4">部门中心</option>
                    </select>
                </div>
                <div>
                    <select class="form-control area hiddenItem" id="area1" autocomplete="off">
                                        <option value="">请选择市区部门</option>
                                        <option value="2">二区</option>
                                        <option value="3">三区</option>
                                        <option value="4">四区</option>
                                        <option value="5">五区</option>
                                        <option value="7">七区</option>
                                        <option value="8">八区</option>
                    </select>
                    <select class="form-control area hiddenItem" id="area2" autocomplete="off">
                                        <option value="">请选择近郊部门</option>
                                        <option value="802">通州</option>
                                        <option value="801">昌平</option>
                                        <option value="804">大兴</option>
                                        <option value="806">顺义</option>
                                        <option value="803">房山</option>
                    </select>
                    <select class="form-control area hiddenItem" id="area3" autocomplete="off">
                                        <option value="">请选择远郊部门</option>
                                        <option value="809">密云</option>
                                        <option value="808">怀柔</option>
                                        <option value="805">门头沟</option>
                                        <option value="807">平谷</option>
                                        <option value="810">延庆</option>
                    </select>
                    <select class="form-control area hiddenItem" id="area4" autocomplete="off">
                                        <option value="">请选择部门中心</option>
                                        <option value="10">重通局</option>
                                        <option value="9999">其他</option>
                    </select>
                    <select class="form-control area devArea hiddenItem" id="devArea1" autocomplete="off">
                                        <option value="">请选择市区部门</option>
                                        <option value="225">二区</option>
                                        <option value="226">三区</option>
                                        <option value="211">四区</option>
                                        <option value="212">五区</option>
                                        <option value="213">七区</option>
                                        <option value="214">八区</option>
                    </select>
                    <select class="form-control area devArea hiddenItem" id="devArea2" autocomplete="off">
                                        <option value="">请选择近郊部门</option>
                                        <option value="217">通州</option>
                                        <option value="219">昌平</option>
                                        <option value="220">大兴</option>
                                        <option value="218">顺义</option>
                                        <option value="216">房山</option>
                    </select>
                    <select class="form-control area devArea hiddenItem" id="devArea3" autocomplete="off">
                                        <option value="">请选择远郊部门</option>
                                        <option value="223">密云</option>
                                        <option value="221">怀柔</option>
                                        <option value="215">门头沟</option>
                                        <option value="222">平谷</option>
                                        <option value="224">延庆</option>
                    </select>
                    <select class="form-control area devArea hiddenItem" id="devArea4" autocomplete="off">
                                        <option value="">请选择部门中心</option>
                                        <option value="227">重通局</option>
                                        <option value="11a0al">中台</option>
                                        <option value="11a01s">渠道中心</option>
                                        <option value="dkhzx">大客户中心</option>
                                        <option value="11a01q">客服中心</option>
                                        <option value="11a08x">其他</option>
                    </select>
                </div>
            </div>
            
            <script type="text/javascript">
            
				queryCons.push({
					name:'areaAll',
					label:'${con.label!"销售线"}',
					key:'${con.key!"areaCode"}',
					require:${con.require!"false"},
					areaType:'${con.areatype!"area"}',
					init:function(){					
						var _self = this;    
						$("#areaMain").change(function (){
							var v = $(this).val();
							$(".area").css("display", "none");
							if(v!="all"){
								$("#"+_self.areaType+v).css("display", "block");
							}
						});		
					},
					initValue:function(paramObj){
						var v = paramObj[this.key];
						if(v==undefined){
							v = this.areaType=="area"? authQueryArea: authQueryDevArea;
						}
						if(v==""){
							$("#areaMain option[value=all]").attr("selected",true);
							$("#areaMain").change();
						}else{
							this.setAreaValue(v);
						}			
						if(authQueryArea!="all" && authQueryDevArea!="all"){
							$("#areaMain").attr("disabled",true);
							$(".area").attr("disabled",true);							
							if(authQueryArea!=v && authQueryDevArea!=v){	//如果没有当前选择区域的权限，禁止所有页面其他查询按钮点击
								$.each(queryCons ,function(index,queryCon){	
							     	if(queryCon.name=="buttonQueryAll"){
							     		queryCon.disabled();
							     	}
								});
							}
						}
					},
					reset:function(targetAreaType){
						this.areaType = targetAreaType;
						$("#areaMain").change();
					},
					check:function(){
						var item = $("select.area").filter(function(index) {
							return $(this).css("display")=="block";
						})
						if(this.require && item.length!=1){						
							layer.msg("请选择"+this.label, {time: 2000});
							return false;
						}

						//过滤指定报表发展口径销售线

                        //重点监控指标(发展-日、月累计)
                        if (reportKey=="monitorMonthByDevelopAreaNew" || reportKey=="monitorDayByDevelopAreaNew"){
                            return true;
                        }

                        //订单全流程监控总表（包含）发展口径
                        if (reportKey=="flowMonitorTotalDev1") {
                            return true;
                        }

                        //订单全流程监控总表（整体）
                        if ("flowMonitorTotalDev2"==reportKey){
                            return true;
                        }

                        //订单转化监控表
                        if ("OrderConvertByDevelop"==reportKey){
                            return true;
                        }

                        //在途工单监控表
                        if ("OrderOnProcessByDevelop"==reportKey){
                            return true;
                        }

                        //超时工单监控表
                        if ("overCountMonitorDev"==reportKey){
                            return true;
                        }

                        //竣工量监控表
                        if ("OrderFinishByDevelop"==reportKey){
                            return true;
                        }

                        //撤单量监控表
                        if ("OrderBackByDevelop"==reportKey){
                            return true;
                        }

						if($("#areaMain").val()!="all" && (item.val()=="" || item.val()=="1")){
							layer.msg("请选择"+this.label, {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var item = $("select.area").filter(function(index) {
							return $(this).css("display")=="block";
						})
						var value = "";
						if(item.length==1){
							value = item.val();
						}
						if(value=="1"){
							value = "";
						}
						var v = new Object();
						v[this.key] = value;
						return v;
					},
					setAreaValue:function(areaCode){
						var option = $("select.area option[value="+areaCode+"]");
						if(option.length<=0){
							$("#areaMain option[value=all]").attr("selected",true);
							$("#areaMain").change();
						}else{
							option.attr("selected",true);
							
							$(".area").css("display", "none");
							var item = option.parent();
							item.css("display", "block");
							
							var tmpId = item.attr("id");
							$("#areaMain").val(tmpId.substr(tmpId.length-1));
							
							this.areaType = item.hasClass("devArea")? "devArea": "area";
						}
					}
				});
			</script>
