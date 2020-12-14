<div class="qryCon" id="smsWarnSend">
    <label>${con.label!"告警短信发送情况"}:</label>
    <ul>
        <li class="searched" value="all">全部</li>
        <li value="true">发送成功</li>
        <li value="false">发送失败</li>
        <li value="0">不需发送</li>
    </ul>
</div>

<script type="text/javascript">
    queryCons.push({
        key:'${con.key!"sendResult"}',
        init:function(){
            $("#smsWarnSend ul li").click(function () {
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
            if(paramObj[this.key]==undefined || paramObj[this.key]=="" || paramObj[this.key]=="true,false,0"){
                return ;
            }
            $.each( paramObj[this.key].split(","), function(index, v){
                var sel = $("#smsWarnSend ul li[value='"+v+"']");
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
            var selected = $("#smsWarnSend ul li.searched");
            var val = "";
            if(selected!=""){
                selected.each(function(){
                    val += (val==""?"":",") + $(this).attr("value");
                });
            }
            if(val=="all"){
                val = "true,false,0";
            }
            var v = new Object();
            v[this.key] = val;
            return v;

        }
    });
</script>
