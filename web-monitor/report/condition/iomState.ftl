<script type="text/javascript">
    queryCons.push({
        init: function () {

        },
        initValue: function (paramObj) {
            if (paramObj["acStartDate"]) {
                var stringToDate2 = stringToDate(paramObj["acStartDate"]);
                console.log(stringToDate2);
                $("#acStartDate").val(paramObj["acStartDate"]);
            }
            if (paramObj["bkStartDate"]) {
                stringToDate(paramObj["bkStartDate"])
                $("#bkStartDate").val(paramObj["bkStartDate"]);
            }
        },
        check: function () {
            if ($("#acStartDate").val() != "" && $("#bkStartDate").val() != ""){
                layer.msg("竣工日期不能和退单日期同时选择", {time: 2000});
                return false;
            }
            return true;
        },
        makeQeryObj: function () {
            var v = new Object();
            if ($("#acStartDate").val() != "") {
                v["xxStartDate"]=$("#acStartDate").val();
                v["xxEndDate"]=$("#acStartDate").val();
                v["iomState"] = "2";
            } else if ($("#bkStartDate").val() != "") {
                v["xxStartDate"]=$("#bkStartDate").val();
                v["xxEndDate"]=$("#bkStartDate").val();
                v["iomState"] = "4";
            }
            return v;
        }
    });
</script>
