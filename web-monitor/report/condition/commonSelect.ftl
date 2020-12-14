            <div class="qryCon" id="CON_${con.key}">
                <label>${con.label}:</label> 
                <ul>
				<#list con.values as value>
					<#if value.default??>
	                 	<li class="searched" value="${value.value}">${value.name}</li>
					<#else>
	                 	<li value="${value.value}">${value.name}</li>
					</#if>
				</#list>
                </ul>
            </div>
            
			<script type="text/javascript">
				queryCons.push({
        			key: '${con.key}',
        			label: '${con.label}',
					init:function(){
						$("#CON_"+this.key+" ul li").click(function (){
							 $(this).siblings('li').removeClass('searched');  
						     $(this).addClass('searched');
						})
					},
					initValue:function(paramObj){
						var sel = $("#CON_"+this.key+" ul li[value="+paramObj[this.key]+"]");
						if(sel.length==1){
							sel.click();
						}
					},
					check:function(){
						var v = $("#CON_"+this.key+" ul li.searched");
						if(v.length!=1){
							layer.msg(this.label+"没有选择!", {time: 2000});
							return false;
						}
						return true;
					},
					makeQeryObj:function(){
						var v = new Object();
						var vv = $("#CON_"+this.key+" ul li.searched").attr("value");
						if(vv!="all"){
							v[this.key] = vv;
						}
						return v;
					}
				});
			</script>