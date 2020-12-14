            <div class="qryCon2" id="dateSelectMouth">
				<label>${con.label}:</label>
				<div style="margin-left:4px;">
					<i>
						<img onclick="WdatePicker({dateFmt:'yyyy-MM'})" src="${request.contextPath}/js/plugins/My97DatePicker/skin/datePicker.gif" class="datePic"/>
					</i>
					<input type="text" value="" class="form-control dateInput" id="${con.key!"startDate"}" name='${con.key!"startDate"}' onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
				</div>
			</div>
            
			<script type="text/javascript">
				queryCons.push({
					key:'${con.key!"startDate"}',
					initSpecMethod:'${con.initSpecMethod!""}',
					require:'${con.require!true}',
					merge2Top:'${con.merge2Top!false}', 	//模板设置true or false;
					init:function(){
						$("#"+this.key).val((new Date()).format("yyyy-MM"));
						if(this.initSpecMethod!=""){
							this[this.initSpecMethod]();
						}
			
						this.reset();
					},
					initValue:function(paramObj){
						if(paramObj[this.key]){
							$("#"+this.key).val(paramObj[this.key]);
						}
					},
					initLastMouth:function(){
						var now = new Date();
						if (now.getMonth() == 0){
							$("#"+this.key).val(now.getFullYear()-1+'-12');
						}else {
							$("#"+this.key).val(1900+now.getYear()+"-"+ ("0" + (now.getMonth())).slice(-2));
						}
					},
					initNull:function(){
						$("#"+this.key).val("");
					},
					reset:function(){
						if(this.merge2Top){
							var target = $("#dateSelectMouth").prevAll().filter("div").filter(
								function(index) {
									return $(this).css("display")=="block";
								}
							).first();
							if(target!=null){
								$("#dateSelectMouth").css("display","none");
								target.children("ul").css("width", "50%");
								target.append($("<div style='width:30px'></div>"));
								target.append($("#dateSelectMouth").children());
							}
						}
					},
					check:function(){
						var a = /^(\d{4})-(\d{2})$/;
						if (this.require && !a.test($("#"+this.key).val())) {
							layer.msg("${con.label}格式不正确!", {time: 2000});
							return false;
						}
						if(!this.require && !a.test($("#"+this.key).val())){
							return true;
						}
						return true;
					},
					makeQeryObj:function(){
						return this.makeSubQueryObj(this.key);
					},
					makeSubQueryObj:function(key){
						var v = new Object();
						v[key] = $("#"+key).val();
						if(key=="startDate"){
							v["endDate"] = v[key];
						}else if(key.endWith("StartDate")){
							v[key.substr(0, key.length-9)+"EndDate"] = v[key];
						}
						return v;
					}
				});
			</script>