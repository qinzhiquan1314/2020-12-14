<div class="qryCon2" id="codeAll">
    <label>${con.label!"评价触点"}:</label>
    <div>
        <select class="form-control" id="codeMain" autocomplete="off">
            <option value="">请选择评价触点</option>
            <#list codeInfos as code>
                <option value="${code.exCode}">${code.exName}</option>
            </#list>
        </select>
    </div>
</div>

<script type="text/javascript">
    queryCons.push({
        key:'${con.key!"codeAll"}',
        init:function(){

        },
        check:function(){
            // if($("#codeMain").val()==""){
            //     layer.msg("请选择评价触点!", {time: 2000});
            //     return false;
            // }
            return true;
        },
        makeQeryObj:function(){
            var v = new Object();
            v[this.key] = $("#codeMain").val();
            return v;
        }
    });
</script>
			