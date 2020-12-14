            <div class="qryCon" id="inmodeCatalog">
                <label>${con.label!"订单来源"}:</label>
                <ul>
                    <li class="searched" value="all">全部</li>
                    <li value="sub1">线上</li>
                    <li value="sub2">线下</li>
                </ul>
            </div>
            <div class="qryCon" id="inmodeCatalogSub1">
                <label>互联网化:</label>
                <ul>
                    <li class="searched" value="A1,A2,A3,A5,A6,A7,B3">全部</li>
                    <li value="A1">集团商城</li>
                    <li value="A2">北京网厅</li>
                    <li value="A3">沃易售(码销)</li>
                    <li value="B3">沃易售(行销)</li>
                    <li value="A5">电话营销</li>
                    <li value="A6">第三方合作</li>
                    <li value="A7">其他</li>
                </ul>
            </div>
            <div class="qryCon" id="inmodeCatalogSub2">
                <label>实体渠道:</label>
                <ul>
                    <li class="searched" value="B1,B2">全部</li>
                    <li value="B1">营业厅</li>
                    <li value="B2">社会渠道</li>
                </ul>
            </div>
            
            <script type="text/javascript">
				queryCons.push({
					key:'${con.key!"inmodeCatalog"}',
					init:function(){
						$("#inmodeCatalog ul li:first").click(function (){
							$("#inmodeCatalogSub1").css("display", "none");
							$("#inmodeCatalogSub2").css("display", "none");
						});
						$("#inmodeCatalog ul li:eq(1)").click(function (){
							$("#inmodeCatalogSub1").css("display","block");
							$("#inmodeCatalogSub2").css("display", "none");
							$("#inmodeCatalogSub1 ul li:first").click();
						});
						$("#inmodeCatalog ul li:eq(2)").click(function (){
							$("#inmodeCatalogSub1").css("display", "none");
							$("#inmodeCatalogSub2").css("display","block");
							$("#inmodeCatalogSub2 ul li:first").click();
						});
						
						$("#inmodeCatalog ul li, #inmodeCatalogSub1 ul li:first, #inmodeCatalogSub2 ul li:first").click(function (){
							$(this).siblings('li').removeClass('searched');  
							$(this).addClass('searched');   
						});
						
						$("#inmodeCatalogSub1 ul li:gt(0),#inmodeCatalogSub2 ul li:gt(0)").click(function (){
							$(this).siblings('li:first').removeClass('searched');  
							$(this).toggleClass('searched');   
							if($("#inmodeCatalog ul li.searched").length==0){
								$(this).siblings('li:first').addClass('searched');  
							}
						});
						
						$("#inmodeCatalog ul li:first").click();
					},
					initValue:function(paramObj){
						var val = paramObj[this.key];
						if(val==undefined || val==""){
							return;
						}
						var inmodeCatalogSeq = 0;
						if($("#inmodeCatalogSub1 ul li:first").attr("value")==val){
							$("#inmodeCatalogSub1 ul li:first").click();
							inmodeCatalogSeq = 1;
						}else if($("#inmodeCatalogSub2 ul li:first").attr("value")==val){
							$("#inmodeCatalogSub2 ul li:first").click();
							inmodeCatalogSeq = 2;
						}else{
							$("#inmodeCatalogSub1 ul li").each(function (){
								if(val.indexOf($(this).attr("value"))>=0){
									$(this).click();
									inmodeCatalogSeq = 1;
								}
							});
							$("#inmodeCatalogSub2 ul li").each(function (){
								if(val.indexOf($(this).attr("value"))>=0){
									$(this).click();
									inmodeCatalogSeq = 2;
								}
							});
						}
						$("#inmodeCatalog ul li").removeClass('searched');
						if(inmodeCatalogSeq == 1){
							$("#inmodeCatalogSub1").css("display","block");
							$("#inmodeCatalog ul li:eq(1)").addClass('searched');
						}else if(inmodeCatalogSeq == 2){
							$("#inmodeCatalogSub2").css("display","block");
							$("#inmodeCatalog ul li:eq(2)").addClass('searched');
						}else{
							$("#inmodeCatalog ul li:first").addClass('searched');
						}
						
					},
					check:function(){
						return true;
					},
					makeQeryObj:function(){
						var selected = $("#inmodeCatalog ul li.searched").attr("value");
						if(selected=="sub1"){
							selected = $("#inmodeCatalogSub1 ul li.searched");
						}else if(selected=="sub2"){
							selected = $("#inmodeCatalogSub2 ul li.searched");
						}else{
							selected = "";
						}
						
						var val = "";
						if(selected!=""){
							selected.each(function(){
								val += (val==""?"":",") + $(this).attr("value");
							});
						}
						var v = new Object();
						v[this.key] = val;
						return v;
					}
				});
			</script>