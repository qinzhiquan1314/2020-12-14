<div class="qryCon2" id="buttonQueryAll">
    <label> </label>
    <div class="btnGrp">
        <button id="searchBtn" type="button" class="btn btn-orange submitBtn">查询</button>
        <button id="exportBtn" type="button" class="btn btn-orange resetBtn">导出</button>
        <span id="historySearch" class="hisSearch">历史查询</span>
    </div>
</div>

<script type="text/javascript">
	queryCons.push({
	    name:"buttonQueryAll",
	    disabledAll: false,
		merge2Top:${con.merge2Top!false},	//模板设置true or false;
		init:function(){		
			$("#searchBtn").click(function(){
				doQuery();
			});
			
			$("#exportBtn").click(function(){
				doDownload();
			});
			
			$("#historySearch").click(function(){
				doHistory();
			});
			
			$("#exportBtn").attr('disabled', true);
			
			this.reset();
		},
		reset:function(){
			if(this.merge2Top){
				var target = $("#buttonQueryAll").prevAll().filter("div").filter(
					function(index) {
						return $(this).css("display")=="block";
					}
				).first();
				if(target!=null){
					$("#buttonQueryAll").css("display","none");
					target.children("ul").css("width", "50%");
					target.append($(".btnGrp"));
				}
			}
		},
		disabled:function(){
			$("#searchBtn").attr('disabled', true);
			$("#exportBtn").attr('disabled', true);
			this.disabledAll = true;
		},
		check:function(){
			return true;
		},
		makeQeryObj:function(){
			return new Object();
		},
		callBack:function(){
			if(!this.disabledAll){
				$("#exportBtn").attr('disabled', false);
			}
		}
	});
</script>