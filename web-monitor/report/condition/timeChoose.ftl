<script type="text/javascript">
    queryCons.push({
        require:'${con.require!true}',
        init: function () {

        },
        check: function () {
            //   来单日期和发送日期至少选择1个才能查询
            if (this.require && $("#startDate").val() != "" && $("#endDate").val() != "") {
                if ($("#acStartDate").val() != "" && $("#acEndDate").val() != "") {
                    // 选中来单日期后发送日期必须要大于等于来单日期
                    if ($("#startDate").val() < $("#acStartDate").val()) {
                        layer.msg("发送日期大于等于来单日期", {time: 2000});
                        return false;
                    }
                    return true;
                }
            }
            if(this.require && $("#startDate").val() == "" && $("#endDate").val() == ""){
                if ($("#acStartDate").val() == "" && $("#acEndDate").val() == "") {
                    layer.msg("请选择日期", {time: 2000});
                    return false;
                }
            }
            if(!this.require && $("#startDate").val() == "" && $("#acStartDate").val() == ""){
                layer.msg("请选择日期", {time: 2000});
                return false;
            }
            return true;
        },
        makeQeryObj: function () {

        }
    });
</script>
