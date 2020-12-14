			<div class="qryCon2">
		        <label>${con.label}:</label>
		        <span>${con.subLabel1!"来单日期"}：</span>	        
	    		<div style="margin-left:4px;">
					<i> 
						<img onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" src="${request.contextPath}/js/plugins/My97DatePicker/skin/datePicker.gif" class="datePic"/>
					</i> 
					<input type="text" value="" class="form-control dateInput" id="${con.key1!"startDate"}" name="${con.key1!"startDate"}" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
				</div>
		        <span>${con.subLabel2!"激活日期"}：</span>
	    		<div style="margin-left:4px;">
					<i> 
						<img onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" src="${request.contextPath}/js/plugins/My97DatePicker/skin/datePicker.gif" class="datePic"/>
					</i> 
					<input type="text" value="" class="form-control dateInput" id="${con.key2!"acStartDate"}" name="${con.key2!"acStartDate"}" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
				</div>
		        <span>${con.subLabel3!"退单日期"}：</span> 
	    		<div style="margin-left:4px;">
					<i> 
						<img onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" src="${request.contextPath}/js/plugins/My97DatePicker/skin/datePicker.gif" class="datePic"/>
					</i> 
					<input type="text" value="" class="form-control dateInput" id="${con.key3!"bkStartDate"}" name="${con.key3!"bkStartDate"}" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
				</div>
		    </div>
		    
		    <script type="text/javascript">
				queryCons.push({
					key1:'${con.key1!"startDate"}',
					key2:'${con.key2!"acStartDate"}',
					key3:'${con.key3!"bkStartDate"}',
					initSpecMethod1:'${con.initSpecMethod1!""}',
					initSpecMethod2:'${con.initSpecMethod2!""}',
					initSpecMethod3:'${con.initSpecMethod3!""}',
					subLabel1:'${con.subLabel1!"来单日期"}',
					subLabel2:'${con.subLabel2!"激活日期"}',
					subLabel3:'${con.subLabel3!"退单日期"}',
					require:${con.require!true},
					init:function(){
						if(this.initSpecMethod1!=""){
							this[this.initSpecMethod1](this.key1);
						}else{
							$("#"+this.key1).val((new Date()).format("yyyy-MM-dd"));
						}
						if(this.initSpecMethod2!=""){
							this[this.initSpecMethod2](this.key2);
						}else{
							$("#"+this.key2).val((new Date()).format("yyyy-MM-dd"));
						}
						if(this.initSpecMethod3!=""){
							this[this.initSpecMethod3](this.key3);
						}else{
							$("#"+this.key3).val((new Date()).format("yyyy-MM-dd"));
						}
					},
					initValue:function(paramObj){
						if(paramObj[this.key1]){
							$("#"+this.key1).val(paramObj[this.key1]);
						}
						if(paramObj[this.key2]){
							stringToDate(paramObj[this.key2])
							$("#"+this.key2).val(getLastDate(paramObj[this.key2]));
						}
						if(paramObj[this.key3]){
							stringToDate(paramObj[this.key3])
							$("#"+this.key3).val(getLastDate(paramObj[this.key3]));
						}
					},
					initYestoday:function(key){
						$("#"+key).val((new Date(new Date().getTime() - 24 * 60 * 60 * 1000)).format("yyyy-MM-dd"));
					},
                    initNull:function(){
                        $("#"+this.key).val("");
                    },
					initFirstDayOfMonth:function(key){
						$("#"+key).val((new Date()).format("yyyy-MM") + "-01");
					},
					check:function(){
						var a = /^(\d{4})-(\d{2})-(\d{2})$/;
						if (this.require && !a.test($("#"+this.key1).val())) {
							layer.msg(this.subLabel1+"格式不正确!", {time: 2000});
							return false;
						}else if (this.require && !a.test($("#"+this.key2).val())) {
							layer.msg(this.subLabel2+"格式不正确!", {time: 2000});
							return false;
						}else if (this.require && !a.test($("#"+this.key3).val())) {
							layer.msg(this.subLabel3+"格式不正确!", {time: 2000});
							return false;
						}
						if (!this.require && !a.test($("#"+this.key1).val()) && !a.test($("#"+this.key2).val()) && !a.test($("#"+this.key3).val())){
							layer.msg("日期至少要有一项不为空", {time:2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var v = new Object();
						$.extend( v, this.makeSubQueryObj(this.key1) );
						$.extend( v, this.makeSubQueryObj(this.key2) );
						$.extend( v, this.makeSubQueryObj(this.key3) );
						return v;
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