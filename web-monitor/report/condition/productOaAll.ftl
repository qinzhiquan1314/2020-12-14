<style type="text/css">
    .ui-multiselect {

        background-color: #fff;

        height: 34px;
        font-size: 14px;
        color: #555;
        width: 200px !important;
    }

    .ui-multiselect span {
        color: #555;
        margin-left: 6px;
        font-weight: 400;
        font-family: 'Verdana', '', sans-serif;
        font-size: 14px;
    }

    .ui-multiselect-checkboxes label input {
        top: 1px;
    }

    .ui-helper-reset span {
        font-weight: 400;
        font-size: 14px;
        color: #555;
    }

    .ui-multiselect-checkboxes label input {
        margin-right: 3px;
    }
</style>
<div class="qryCon2" id="productOa">
    <label>${con.label!"产品类型"}:</label>
    <div>
        <select class="form-control" id="productMain" name="productMain" multiple="multiple" autocomplete="off">

        </select>
    </div>
</div>

            <script type="text/javascript">

                queryCons.push({
                    name: 'productOa',
                    label: '${con.label!"产品类型"}',
                    key: '${con.key!"productMain"}',
                    require:${con.require!"false"},
                    init: function () {
                        // 产品类型一

                        var options = '';
                        var arr = [];
                        $('#productMain').multiselect({
                            header: true,
                            height: 175,
                            minWidth: 200,
                            classes: '',
                            checkAllText: '选中全部',
                            uncheckAllText: '取消全选',
                            noneSelectedText: '',
                            selectedText: '# 选中',
                            selectedList: 0,
                            show: null,
                            hide: null,
                            autoOpen: false,
                            multiple: true,
                            position: {},
                            appendTo: "body",
                            menuWidth: null
                        });
                        /*var arr = ['all']
                        $('#productType').val(arr);*/
                        // $('#productMain').multiselect("refresh");
                        $.post("/queryCenter/product/findFourLevelAll",
                                function (data) {
                                    if (data.state != 1) {
                                        layer.msg(data.message, {time: 2000});
                                    } else {
                                        var arrData = data.rows
                                        for (var i = 0; i < arrData.length; i++) {
                                            options = '<option  checked  value=' + arrData[i].secondLevel + '>' + arrData[i].secondLevel + '</option>'
                                            $('#productMain').append(options)
                                        }
                                        $('#productMain').multiselect("refresh");
                                    }
                                }
                        );
                    },
                    initValue: function () {

                    },
                    reset: function () {

                    },
                    check: function () {
                        return true;
                    },
                    makeQeryObj: function () {
                        var v = new Object();
                        var secondLevel = new Object();
                        console.log(typeof $('#productMain').val());

                        secondLevel = $('#productMain').val() ? $('#productMain').val().join(',') : '';
                        v[this.key] = secondLevel;
                        return v;
                    }
                });
            </script>
