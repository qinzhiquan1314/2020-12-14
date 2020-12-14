
/*************对外-手机-政企障碍流程查询*********/

$(document).ready(function(){
    flowListObj.getDate();
});

//获取路径中参数
var balkNo = getUrlParam("balkNo");//订单号
var secCode = getUrlParam("secCode");
var status = getUrlParam("status");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");
var message = getUrlParam("message");

//本页面对象
var flowListObj = {
    //获取数据
    getDate: function () {
        $.ajax({
            type: 'POST',//测试  GET  生产POST
            async: true,
            /*   url: "https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkFlowList?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
            url: "https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/balkFlowList?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "balkNo": balkNo
            }),
            dataType: 'json',
            beforeSend: function () {
                showLoader();
            },
            complete: function () {
                hideLoader();
            },
            success: function (resData) {
                console.log(resData)
                if (resData == null) return;
                var state = resData.respCode;
                var state2 = resData.hasEngineer;
                var state3 = resData.urgeEnable;
                console.log(state3);
                if (state == 200) {
                    var str ='';
                    if(state2==true){
                        console.log(111);
                        $('#frontDesc').css("display","block");
                        resData.engineerInfo.forEach(function (ele, index) {
                            console.log(ele)
                            console.log(ele.engineerType)
                            if(ele.engineerType=="上门工程师:"){
                                str+=
                                    `<div class="t2 pd-left-10 mg-top-10 serialNumber">`+
                                    `<div class="ll2">`+ `<span style="background-color: black;height: .5rem;width: .5rem;display:inline-block;border-radius: .5rem;"></span> `+
                                    ` <span class="ft2" style="white-space: normal">${ele.engineerType}</span>`+
                                    ` <span class="ft2" id="engineerTypeDesc" style="white-space: normal">${ele.engineerTypeDesc},</span>`+
                                    ` <span class="ft2" id="engineerInfoDesc" style="white-space: normal">${ele.engineerInfoDesc}</span>`+ `</div>`+
                                    `</div> `
                            }
                        })
                    }
                    str += '<div class="t2 pd-left-10 mg-top-10 serialNumber">'+
                        '<div class="ll2">'+'<span style="background-color: black;height: .5rem;width: .5rem;display:inline-block;border-radius: .5rem;"></span> '+
                        '<span class="ft2" >故障单状态：</span>'+
                        '<span class="ft2" >'+status+'</span>'+ '</div>'+
                        '</div> '
                    var  strA = '<div class="cx" style="cursor: pointer;" onclick="urge()" style="display: block"><span class="hcxa">催修</span></div>';
                    var strB = '<div class="hcx" style="cursor: pointer;" onclick="hurge()" style="display: block"><span class="hcxa">已催修</span></div>';
                    if(status!="已办结"){
                        /*  if(state3 == true){str+=strA;}
                          else if(state3 == false){str+=strB;}*/
                        if(state3 == "1"){str+=strA;}
                        else if(state3 == "2"){str+=strB; console.log(222222222222222)}
                        else if(state3 == "0"){str+="";}
                        else{console.log(555555555555)}
                    }
                    $('#con').html(str);
                    var rdata = {data: []};
                    rdata.data = resData.data.jobInsts;
                    console.log(rdata.data);
                    flowListObj.makeFlowArea(rdata);
                } else {
                    layer.open({
                        content: resData.respDesc
                        , style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                        , time: 3
                    });
                }


            }

        });
    },

    //展示数据
    makeFlowArea: function (data) {
        var opt = {
            "jsonDate": data,//json数据
            "imgPath": "../../../web-phone/images/order/flow/", //图片路径
            "imgType": "png" //图片类型
        };

        $(".flowtest").flowplugin(opt);

        //单页面特殊处理广告位重新加载
        advertPosition();
    },

}

//催修弹框
function urge() {
    /*console.log(111)*/
    layer.open({
        type: 1,
        area: ['600px', '360px'],
        shadeClose: true, //点击遮罩关闭
        content: `<div style="padding:20px;">` +`<div style="text-align:left">`+`<span class="ft2">请选择催修原因：</span>`+`<br />`+`<input type="radio" class="reason" name="type" value="0"/>预约未到`+`<br />`+
            `<input type="radio" name="type" value="1"/>用户特急`+`<br />`+
            /*  `<input type="radio" name="type" value="2"/>长时间未好`+`<br />`+*/
            `<input type="radio" name="type" value="3"/>要求局方联系`+`<br />`+`</div>`+
            `<div class="text">`+
            `<textarea class="a-textarea font-space-2px" id="remark" name="comment" placeholder="其他原因" onkeyup="countWord()">`+
            `</textarea>`+
            `</div>`+
            `<div class="cx" style="cursor: pointer;" onclick="getRadio()" ><span class="hcxa">确定催修</span></div>`+
            `<div class="cx" style="cursor: pointer;" onclick="closeRadio()" ><span class="hcxa">取消催修</span></div>`+`<br />`+
            `</div>`
    });
}

//已催修弹框
function hurge() {
    console.log(222)
    layer.open({
        type: 1,
        area: ['600px', '360px'],
        shadeClose: true, //点击遮罩关闭
        content: '\<\div style="padding:20px;">1小时内催修数据已经存在\<\/div>',
        style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;',//自定风格
        time: 3
    });
}

function getRadio(){
    var reason = $("input[name='type']:checked").val();
    console.log(reason);
    var balkNo=getUrlParam("balkNo");
    console.log(balkNo);
    var remark=$('#remark').val().trim();
    console.log(remark);
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
        /*url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/ifmGovUserUrge?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
        url:"https://wxzc.bjunicom.com.cn/queryCenter/web-phone/web-out-order/page/ifmGovUserUrge?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "balkno": balkNo ,
            "remark" : remark,
            "reason": reason ,
        }),
        dataType : 'json',
        success : function(resData) {
            if(resData == null) return;
            var state = resData.respCode;
            var desc = resData.respDesc;
            var href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/flow-zqza-list.html?balkNo="+balkNo+"&secCode="+secCode);//故障处理详情
            console.log(desc);
            if(state == 200) {
                layer.open({
                    content: '催修成功'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
                window.location.href=href;
            }else{
                layer.open({
                    content: '请选择催修原因'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,time: 3
                });
            }
            /*   flowListObj.getDate();*/
        }
    });
};

function closeRadio(){
    layer.closeAll('dialog');
};


function tzmessage(){
    if (message == 1) {
        var href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-zqza-search-validate.html");
        window.location.href = href;
    }else{
        goBack();
    }
}
