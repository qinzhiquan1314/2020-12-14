
/*************对外-PC-流程查询*********/

$(document).ready(function(){
    flowListObj.getDate();
});

//获取路径中参数
var orderNum = getUrlParam("orderNum");//订单号
var secCode = getUrlParam("secCode");
var status = getUrlParam("status");
var userName = getUrlParam("userName");
var exCode = getUrlParam("exCode");
var callCode = getUrlParam("callCode");
//本页面对象
var flowListObj = {
    //获取数据
    getDate: function () {
            $.ajax({
                type: 'POST',//测试  GET  生产POST
                async: true,
              /*  url: "https://wxzc.bjunicom.com.cn/queryCenter/ifm/balkFlowList?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
                url: "https://wxzc.bjunicom.com.cn/queryCenter/web-pc/out-order/page/balkFlowList?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({
                    "balkNo": orderNum
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
                            if(ele.engineerType=="上门工程师:") {
                                str +=
                                    `<div class="t2 pd-left-10 mg-top-10 serialNumber">` +
                                    `<div class="ll2">` + `<span class="ft" style="background-color: black;height: 8px;width:8px;border-radius:4px;display: inline-block;margin-left: 20px"></span> ` +
                                    ` <span class="ft2" style="font-size:16px;color: #434343;word-wrap: break-word">${ele.engineerType}</span>` +
                                    ` <span class="ft2" id="engineerTypeDesc" style="font-size:16px;color: #434343;word-wrap: break-word">${ele.engineerTypeDesc},</span>` +
                                    ` <span class="ft2" id="engineerInfoDesc" style="font-size:16px;color: #434343;word-wrap: break-word">${ele.engineerInfoDesc}</span>` + `</div>` +
                                    `</div> `
                            }
                        })
                    }
                    str += '<div class="t2 pd-left-10 mg-top-10 serialNumber">'+
                        '<div class="ll2">'+'<span class="ft" style="background-color: black;height: 8px;width:8px;border-radius:4px;display: inline-block;margin-left: 20px"></span> '+
                        '<span class="ft2" style="font-size:16px;color: #434343;word-wrap: break-word">故障单状态：</span>'+
                        '<span class="ft2" style="font-size:16px;color: #434343;word-wrap: break-word">'+status+'</span>'+ '</div>'+
                        '</div> '
                        var  strA = '<div style="cursor: pointer;background-color: #f3780c;padding: 0px 7px;border-radius:5px;text-align:center;width:80px;margin-left: 20px;" onclick="urge()" style="display: block"><span style="font-size:16px;color: #fff">催修</span></div>';
                        var strB = '<div style="cursor: pointer;background-color: #C2C2C2;padding: 0px 7px;border-radius:5px;text-align:center;width:80px;margin-left: 20px;"  onclick="hurge()" style="display: block"><span style="font-size:16px;color: #fff">已催修</span></div>';
                        if(status!="已办结"){
                            /*if(state3 == true){str+=strA;}
                            else if(state3 == false){str+=strB;}*/
                            if(state3 == "1"){str+=strA;}
                            else if(state3 == "2"){str+=strB; console.log(22222222)}
                            else if(state3 == "0"){str=str;}
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
        }
    //展示数据
    ,makeFlowArea: function (data) {
            var opt = {
                "jsonDate": data,//json数据
                "imgPath": "../../../web-phone/images/order/flow/", //图片路径
                "imgType": "png" //图片类型
            };
            $(".flowtest").flowplugin(opt);
        }
};
//催修弹框
function urge() {
    layer.open({
        type: 1,
        area: ['220px', '280px'],
        shadeClose: true, //点击遮罩关闭
        style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;',
        content: `<div style="padding:20px;">` +`<div style="text-align:left">`+`<span class="ft2" style="font-size:16px;color: #434343;word-wrap: break-word">请选择催修原因：</span>`+`<br />`+`<input type="radio" class="reason" name="type" value="0"/>预约未到`+`<br />`+
        `<input type="radio" name="type" value="1"/>用户特急`+`<br />`+
     /*   `<input type="radio" name="type" value="2"/>长时间未好`+`<br />`+*/
        `<input type="radio" name="type" value="3"/>要求局方联系`+`<br />`+`</div>`+
        `<div class="text">`+
        `<textarea class="a-textarea font-space-2px" id="remark" name="comment" placeholder="其他原因" onkeyup="countWord()" style="margin:5px 0px 0px 0px;">`+
        `</textarea>`+ `</div>`+
        `<div>`+ `<div style="cursor: pointer;background-color: #f3780c;padding: 0px 7px;border-radius:5px;text-align:center;width:80px;margin:5px 5px 5px 0px;display: inline-block"  onclick="getRadio()" ><span style="font-size:16px;color: #fff">确定催修</span></div>`+
        `<div style="cursor: pointer;background-color: #f3780c;padding: 0px 7px;border-radius:5px;text-align:center;width:80px;margin:5px;display: inline-block" onclick="closeRadio()"" ><span style="font-size:16px;color: #fff">取消催修</span></div>`+ `</div>`+
        `</div>`
    });
}

//已催修弹框
function hurge() {
    console.log(222)
    layer.open({
        type: 1,
        area: ['220px', '110px'],
        shadeClose: true, //点击遮罩关闭
        content: '\<\div style="padding:20px;">1小时内催修数据已经存在\<\/div>',
        style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;',//自定风格
    });
}

function getRadio(){
    var reason = $("input[name='type']:checked").val();
    console.log(reason);
    var remark=$('#remark').val().trim();
    console.log(remark);
    $.ajax({
        type : 'POST',// 测试  GET , 生成 POST
        async : true,
       /* url:"https://wxzc.bjunicom.com.cn/queryCenter/ifm/ifmGovUserUrge?userName=oNj7k5BOTQzETEawNmT_jlfNaaI8&exCode=kbxcx&callCode=3ac4dd4f4798c2c562a830e9ee2d7a07",*/
        url:"https://wxzc.bjunicom.com.cn/queryCenter/web-pc/in-order/page/ifmGovUserUrge?userName="+userName+"&exCode="+exCode+"&callCode="+callCode,
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify({
            "balkno": orderNum ,
            "remark" : remark,
            "reason": reason ,
        }),
        dataType : 'json',
        success : function(resData) {
            if(resData == null) return;
            var state = resData.respCode;
            var desc = resData.respDesc;
            var href=getOutUrl(getRootPath_web(),"/web-pc/in-order/page/flow-zqza-list.html?orderNum="+orderNum+"&secCode="+secCode);//故障处理详情
            console.log(desc);
            if(state == 200) {
                layer.open({
                    content: '催修成功'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                });
                window.location.href=href;
            }else{
                layer.open({
                    content: '请选择催修原因'
                    ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                });
            }
            /*   flowListObj.getDate();*/
        }
    });
};

function closeRadio(){
    layer.closeAll();
}




