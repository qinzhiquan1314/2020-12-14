<div class="qryCon2" id="dateRange">
    <label>${con.label!"处理日期"}:</label>
    <span>${con.subLabel1!"起始日期"}：</span>
    <div style="margin-left:4px;">
        <i>
            <img onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                 src="${request.contextPath}/js/plugins/My97DatePicker/skin/datePicker.gif" class="datePic"/>
        </i>
        <input type="text" value="" class="form-control dateInput" id='${con.key1!"startDate"}'
               name='${con.key1!"startDate"}' onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
    </div>
    <span>${con.subLabel2!"结束日期"}：</span>
    <div style="margin-left:4px;">
        <i>
            <img onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                 src="${request.contextPath}/js/plugins/My97DatePicker/skin/datePicker.gif" class="datePic"/>
        </i>
        <input type="text" value="" class="form-control dateInput" id='${con.key2!"endDate"}'
               name='${con.key2!"endDate"}' onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
    </div>
</div>

<script type="text/javascript">
    queryCons.push({
        label: '${con.label!"处理日期"}',
        key1: '${con.key1!"startDate"}',
        key2: '${con.key2!"endDate"}',
        initSpecMethod1: '${con.initSpecMethod1!""}',
        initSpecMethod2: '${con.initSpecMethod2!""}',
        subLabel1: '${con.subLabel1!"起始日期"}',
        subLabel2: '${con.subLabel2!"结束日期"}',
        checkSpecMethod: '${con.checkSpecMethod!""}',
        require:${con.require!true},
        init: function () {
            if (this.initSpecMethod1 != "") {
                this[this.initSpecMethod1](this.key1);
            } else {
                $("#" + this.key1).val((new Date()).format("yyyy-MM-dd"));
            }
            if (this.initSpecMethod2 != "") {
                this[this.initSpecMethod2](this.key2);
            } else {
                $("#" + this.key2).val((new Date()).format("yyyy-MM-dd"));
            }
            if (this.label == "") {
                $("#dateRange label:first").css("display", "none");
            }
        },
        initValue: function (paramObj) {
            if (paramObj[this.key1]) {
                $("#" + this.key1).val(paramObj[this.key1]);
            }
            if (paramObj[this.key2]) {
                stringToDate(paramObj[this.key2])
                $("#" + this.key2).val(getLastDate(paramObj[this.key2]));
            }
        },
        check: function () {
            var a = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (this.require && !a.test($("#" + this.key1).val())) {
                layer.msg(this.subLabel1 + "格式不正确!", {time: 2000});
                return false;
            }
            if (this.require && !a.test($("#" + this.key2).val())) {
                layer.msg(this.subLabel2 + "格式不正确!", {time: 2000});
                return false;
            }
            if (!this.require && !a.test($("#" + this.key1).val()) && a.test($("#" + this.key2).val())) {
                layer.msg(this.subLabel1 + "格式不正确!", {time: 2000});
                return false;
            }
            if (!this.require && a.test($("#" + this.key1).val()) && !a.test($("#" + this.key2).val())) {
                layer.msg(this.subLabel2 + "格式不正确!", {time: 2000});
                return false;
            }
            if (!this.require && !a.test($("#" + this.key1).val()) && !a.test($("#" + this.key2).val())) {
                var date1 = "";
                var date2 = "";
                return true;
            }
            if (this.checkSpecMethod != "" && !this[this.checkSpecMethod]()) {
                return;
            }
            return true;
        },
        makeQeryObj: function () {
            var v = new Object();
            v[this.key1] = $("#" + this.key1).val();
            v[this.key2] = $("#" + this.key2).val();
            return v;
        },
        initYestoday: function (key) {
            $("#" + key).val((new Date(new Date().getTime() - 24 * 60 * 60 * 1000)).format("yyyy-MM-dd"));
        },
        initNull:function(){
            $("#"+this.key).val("");
        },
        initFirstDayOfMonth: function (key) {
            $("#" + key).val((new Date()).format("yyyy-MM") + "-01");
        },
        checkLength31: function () {
            var date1 = stringToDate($("#" + this.key1).val());
            var date2 = stringToDate($("#" + this.key2).val());
            if (parseInt(Math.abs(date2 - date1) / 1000 / 60 / 60 / 24) > 31) {
                layer.msg("最多可连续选择31天!", {time: 2000});
                return false;
            }
            return true;
        }
    });
</script>