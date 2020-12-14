           <div class="qryCon" id="smsWarnLevel">
                <label>${con.label!"告警级别"}:</label>
            	<ul>
	                <li class="searched" value="all">全部</li>
	                <li value="6">六级</li>
	                <li value="5">五级</li>
	                <li value="4">四级</li>
	                <li value="3">三级</li>
	                <li value="2">二级</li>
	                <li value="1">一级</li>
	            </ul>
	        </div>
            
            <script type="text/javascript">
            
            	//li 的value不能为空，也不能有逗号，否者ie浏览器有问题
            	
				queryCons.push({
					key:'${con.key!"warnLevel"}',
					init:function(){
						$("#smsWarnLevel ul li").click(function () {
							if ($(this).hasClass("searched")) {
								$(this).removeClass("searched")
							} else {
								if ($(this).index() == 0) {
									$(this).siblings('li').removeClass('searched');
									$(this).addClass('searched');
								} else {
									$(this).addClass('searched');
									$(this).siblings('li').eq(0).removeClass('searched');
								}
							}
						});
					},
					initValue:function(paramObj){
						if(paramObj[this.key]==undefined || paramObj[this.key]=="" || paramObj[this.key]=="6,5,4,3,2,1"){
							return ;
						}
						$.each( paramObj[this.key].split(","), function(index, v){
							var sel = $("#smsWarnLevel ul li[value='"+v+"']");
							if(sel.length<=0){
								return ;
							}
							sel.click();
						})
					},
					check:function(){
						return true;
					},
					makeQeryObj:function(){
						var selected = $("#smsWarnLevel ul li.searched");
						var val = "";
						if(selected!=""){
							selected.each(function(){
								val += (val==""?"":",") + $(this).attr("value");
							});
						}
						if(val=="all"){
							val = "6,5,4,3,2,1";
						}
						var v = new Object();
						v[this.key] = val;
						return v;

					}
				});
			</script>
			