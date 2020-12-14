			<div class="qryCon2">
		        <label>${con.label!"查询条件"}:</label>        
	    		<div>
					<input type="text" value="" class="form-control dateInput" id="${con.key!"qStr"}" name="${con.key!"qStr"}"/>
				</div>
		    </div>
		    
		    <script type="text/javascript">
				queryCons.push({
					key:'${con.key!"qStr"}',
					label:'${con.label!"查询条件"}',
					initSpecMethod:'${con.initSpecMethod!""}',
					require:${con.require!"false"},
					init:function(){
						if(this.initSpecMethod!=""){
							this[this.initSpecMethod](this.key);
						}
					},
					initValue:function(paramObj){
						if(paramObj[this.key]!=undefined){
							$("#"+this.key).val(paramObj[this.key]);
						}
					},
					check:function(){
						if (this.require && $("#"+this.key).val()=="") { 
							layer.msg(this.label+"不能为空!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var v = new Object();
						v[this.key] = $("#"+this.key).val();
						return v;
					}
				});
			</script>