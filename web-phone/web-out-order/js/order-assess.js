/************对外-手机-订单评价**********/
// 改版移网
var current = "<img src='../../images/order/star_yellow.png'>"
var onCurrent = "<img src='../../images/order/star_yellow_empty.png'>"
var order_satisfaction = '',
    speed_satisfaction = '',
    attitude_satisfaction = '';
//鼠标移进变实星
/*$("#assessStar-shopping li").on("click",function(){
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
});*/
/*$("#assessStar-shopping li").on("click",function(){
    if($("li.current").length === 0){
        $("#assessStar-shopping li").html(onCurrent);
    }else{
        $("li .current").html(current).prevAll().html(current).end().nextAll().html(onCurrent);
    }
})*/
//鼠标点击保持当前状态
$("#assessStar-shopping li").on("click", function() {
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class", "current").siblings().removeClass("current");
    order_satisfaction = $(this).attr("data-star") ? $(this).attr("data-star") : ''
    if ($(this).attr('data-star') <= 6) {
        $('#shopping-star').text('不满意')
    } else if ($(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8) {
        $('#shopping-star').text('一般')
    } else if ($(this).attr('data-star') > 8) {
        $('#shopping-star').text('满意')
    }
    if ($("#assessStar-shopping li").hasClass('current') || $("#assessStar-cell li").hasClass('current') || $("#assessStar-service li").hasClass('current')) {
        $('#submit_btn').text('提交评价')
        $('#submit_btn').css('background-color', '#f7b135')
    }
})
$("#assessStar-cell li").on("click", function() {
    $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
    $(this).attr("class", "current").siblings().removeClass("current");
    speed_satisfaction = $(this).attr("data-star") ? $(this).attr("data-star") : ''
    if ($(this).attr('data-star') <= 6) {
        $('#cell-star').text('不满意')
    } else if ($(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8) {
        $('#cell-star').text('一般')
    } else if ($(this).attr('data-star') > 8) {
        $('#cell-star').text('满意')
    }
    if ($("#assessStar-shopping li").hasClass('current') || $("#assessStar-cell li").hasClass('current') || $("#assessStar-service li").hasClass('current')) {
        $('#submit_btn').text('提交评价')
        $('#submit_btn').css('background-color', '#f7b135')
    }
})
$("#assessStar-service li").on("click", function() {
        $(this).html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
        $(this).attr("class", "current").siblings().removeClass("current");
        attitude_satisfaction = $(this).attr("data-star") ? $(this).attr("data-star") : ''
        if ($(this).attr('data-star') <= 6) {
            $('#service-star').text('不满意')
        } else if ($(this).attr('data-star') > 6 && $(this).attr('data-star') <= 8) {
            $('#service-star').text('一般')
        } else if ($(this).attr('data-star') > 8) {
            $('#service-star').text('满意')
        }
        if ($("#assessStar-shopping li").hasClass('current') || $("#assessStar-cell li").hasClass('current') || $("#assessStar-service li").hasClass('current')) {
            $('#submit_btn').text('提交评价')
            $('#submit_btn').css('background-color', '#f7b135')
        }
    })
    /*产品评价 extLevel1
    上门服务 extLevel2
    施工速度 constructLevel
    物流服务 extLevel3
    总体评价  extLevel4
    commentType 0：评价，1：建议*/
    //获取路径中参数
var orderNum = getUrlParam("orderNum");
var expNo = getUrlParam("expNo"); //物流单号
var commentType = getUrlParam("commentType");
var flag = getUrlParam("flag");
var phoneNum = getUrlParam("phoneNum");
var productName = getUrlParam("productName");
var broadbandNum = getUrlParam("serialNumber");
var productId = getUrlParam("productId");
var commId = getUrlParam("commId");
var pictures = [];
var state = "";

$(document).ready(function() {
    //初始化【五星评价】
    orderAssessObj.initServiceRaty();
    orderAssessObj.initFashionRaty();
    orderAssessObj.initConstructRaty();
    orderAssessObj.initTotalRaty();
    if (expNo != undefined && !checkNullOrEmptyStr(expNo)) {
        $("#divWLFW").show();
        orderAssessObj.initaaabbbRaty();
    } else {
        $("#divWLFW").hide();
    }
    //初始化评价
    $('#comment').val("");
    var startStr = phoneNum.substring(0, 3);
    var endStr = phoneNum.substring(7, 11);
    var phoneStr = startStr + "****" + endStr;
    if (flag == 0) {
        $(".getCode").css('display', 'none');
        $(".messageInfo").css('display', 'none');
    } else {
        $(".getCode").css('display', 'block');
        $(".messageInfo").css('display', 'block');
        $("#phoneNum").html(phoneStr);
    }
    $('#productName').text(productName);
    $('#productComment').val('')
    $('#serviceComment').val('')
});
$.fn.serializeObject = function(para) {
    var serializeObj = {}; // 目标对象
    var tempObj = {}; //临时对象
    var array = this.serializeArray(); // 转换数组格式
    if (para != null && para != undefined) {
        $.each(para, function(name, value) {
            array.push({ name: name, value: value });
        });
    }
    console.log(para);
    console.log(array);
    $(array).each(function() { // 遍历数组的每个元素 {name : xx , value : xxx}
        if (serializeObj[this.name]) {
            // 判断对象中是否已经存在 name，如果存在name
            if ($.isArray(serializeObj[this.name])) {
                serializeObj[this.name].push(this.value);
                console.log(serializeObj[this.name])
            } else {
                // 将元素变为 数组
                serializeObj[this.name] = String([serializeObj[this.name], this.value]);
                console.log(serializeObj[this.name])
            }
        } else {
            //如果元素name不存在，添加一个属性 name:value
            if (this.name == 'productStaff' || this.name == 'productHall' || this.name == 'productHotline' || this.name == 'serviceStaff' || this.name == 'serviceHall' || this.name == 'serviceHotline' || this.name == 'serviceHotline' || this.name == 'serviceHotline') {
                serializeObj[this.name] = String([this.value]);
            } else {
                serializeObj[this.name] = this.value;
            }
        }
    });
    return serializeObj;
};
//文件上传
var files = [];
var that = this;
var fileList = [];
$("#upload").click(function() {
        // cover.style.display="block";   //显示遮罩层
        // modal.style.display="block";   //显示弹出层
        $("#file").trigger("click");
    })
    // $("#camera").click(function() {
    // 	console.log('index')
    // 	$("#file").trigger("click");
    // 	cover.style.display="none";   //隐藏遮罩层
    // 	modal.style.display="none";   //隐藏弹出层

// })
// $("#camerafile").click(function() {
// 	var file = document.getElementById('#file');
// 	file.removeAttribute("capture");
// 	$("#file").trigger("click");
// 	console.log('index相册')
// 	cover.style.display="none";   //隐藏遮罩层
// 	modal.style.display="none";   //隐藏弹出层

// })
$("#file").change(function(event) {
    var file = document.querySelector('#file');
    var img = document.getElementById("file").files;

    // if (getIos()) {

    // }
    // function getIos() {
    // 	var ua = navigator.userAgent.toLowerCase();
    // 	console.log(ua)
    // 	if (ua.match(/iPhone\sOS/i) == "iphone os") {
    // 		return true;
    // 	} else {
    // 		return false;
    // 	}
    // }

    var totalNum = 0;
    totalNum = img.length + that.fileList.length
    if (totalNum > 5) {
        return layer.open({
            content: '最多只能上传5张图片',
            style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,
            time: 3000
        });
    }
    var input = document.getElementById("file");
    if (!input['value'].match(/.jpg|.jpeg|.gif|.png|.bmp/i)) {　　 //判断上传文件格式
        return layer.open({
            content: '图片格式不正确，请重新选择',
            style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                ,
            time: 3000
        });　　　　　　　　　　
    }
    // if (!checkFileNameBySelf(img)){　　//每次选择多个文件判断上传文件名称重复
    // 	return layer.open({
    // 			content: '选择的文件中有名称重复，请重新选择'
    // 			,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
    // 			,time: 3000
    // 		});　　　　　　　　　　
    // }
    // if (!checkFileName(img)){　　//判断与已有文件名称重复
    // 	return layer.open({
    // 			content: '选择的文件中有名称重复，请重新选择'
    // 			,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
    // 			,time: 3000
    // 		});　　　　　　　　　　
    // }
    for (var i = 0; i < img.length; i++) {

        var file = img[i];
        var url = URL.createObjectURL(file);
        var box = document.createElement("img");
        var imgBox = document.createElement("div");
        var deleteIcon = document.createElement("span");
        box.setAttribute("src", url);
        box.className = 'img';

        imgBox.style.display = 'inline-block';
        imgBox.className = 'img-item';

        //deleteIcon.className = 'delete';
        //deleteIcon.innerText = 'x';
        deleteIcon.dataset.filename = img[i].name;
        imgBox.appendChild(deleteIcon);
        imgBox.appendChild(box);
        document.getElementById("gallery").appendChild(imgBox);
        $(deleteIcon).click(function() {
            var filename = $(this).data("filename");
            $(this).parent().remove();
            var fileList = Array.from(that.fileList);

            for (var j = 0; j < fileList.length; j++) {
                if (fileList[j].fileName = filename) {
                    fileList.splice(j, 1);
                    break;
                }
            }
            that.fileList = fileList
        })
    }

    uploadFile(img, 0)
})

function checkFileNameBySelf(imgs) {
    var fileNameList = [];
    for (var i = 0; i < imgs.length; i++) {
        var fileName = imgs[i].name;
        if (fileNameList.indexOf(fileName) == -1) {
            fileNameList.push(fileName)
            continue;
        }
        return false;
    }
    return true;
}

function checkFileName(imgs) {
    var fileNameList = [];
    for (var i = 0; i < that.fileList.length; i++) {
        fileNameList.push(that.fileList[i].fileName)
    }
    for (var i = 0; i < imgs.length; i++) {
        var fileName = imgs[i].name;
        if (fileNameList.indexOf(fileName) == -1) {
            fileNameList.push(fileName)
            continue;
        }
        return false;
    }
    return true;
}

function uploadFile(files, i, callback) {
    if (i >= files.length) {
        return;
    }
    var file = files[i]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
        var result = this.result;
        var img = new Image();
        var maxsize = 1024
        img.src = result;
        if (result.length <= maxsize) {
            var fileContent = {
                content: result,
                type: file.type,
                fileName: file.name
            }
            fileList.push(fileContent)
            console.log(i)
            console.log(fileList)
            i = i + 1
            uploadFile(files, i)
            return;
        }
        if (img.complete) {
            callback();
        } else {
            img.onload = callback;
        }

        function callback() {
            var data = compress(img);
            var fileContent = {
                content: data,
                type: file.type,
                fileName: file.name
            }
            fileList.push(fileContent)
            console.log(i)
            console.log(fileList)
            i = i + 1;
            uploadFile(files, i)
            img = null;
        }
    }
}

function getBlob(buffer, format, name) {
    try {
        return new Blob(buffer, { type: format, });
    } catch (e) {
        var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        buffer.forEach(function(buf) {
            bb.append(buf);
        });
        return bb.getBlob(format);
    }
}

//    使用canvas对大图片进行压缩
function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    //        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

        //            计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");
        tCanvas.width = nw;
        tCanvas.height = nh;

        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    //进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', 0.1);

    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    return ndata;
}
/**
 * 获取formdata
 */
function getFormData() {
    var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
        ~navigator.vendor.indexOf('Google') &&
        !~navigator.userAgent.indexOf('Chrome') &&
        navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;

    return isNeedShim ? new FormDataShim() : new FormData()
}

/**
 * formdata 补丁, 给不支持formdata上传blob的android机打补丁
 * @constructor
 */
function FormDataShim() {
    console.warn('using formdata shim');

    var o = this,
        parts = [],
        boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
        oldSend = XMLHttpRequest.prototype.send;

    this.append = function(name, value, filename) {
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

        if (value instanceof Blob) {
            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
            parts.push(value);
        } else {
            parts.push('\r\n\r\n' + value);
        }
        parts.push('\r\n');
    };

    // Override XHR send()
    XMLHttpRequest.prototype.send = function(val) {
        var fr,
            data,
            oXHR = this;

        if (val === o) {
            // Append the final boundary string
            parts.push('--' + boundary + '--\r\n');

            // Create the blob
            data = getBlob(parts);

            // Set up and read the blob into an array to be sent
            fr = new FileReader();
            fr.onload = function() {
                oldSend.call(oXHR, fr.result);
            };
            fr.onerror = function(err) {
                throw err;
            };
            fr.readAsArrayBuffer(data);

            // Set the multipart content type and boudary
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        } else {
            oldSend.call(this, val);
        }
    };
}
//本页面对象
var orderAssessObj = {
    //变量-访问路径
    /*	url: getOutUrl(getRootPath_web(),"/evaluation/submitEvaluation?flag=out&commentType="+commentType+"&orderNum="+orderNum+"&code="+code)
    	//获取数据
    	,*/
    assessSubmit: function() {
            //var params = $("#submitForm").serialize();
            //var paramsArr = $("#submitForm").serializeArray();
            var code = $("#codeInput").val();
            if (code == "" && flag != 0) {
                layer.open({
                    content: '验证码不能为空！',
                    style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                        ,
                    time: 3
                });
            } else {
                // 移网校验
                if (commentType == 4 && !($("#assessStar-shopping li").hasClass('current') || $("#assessStar-cell li").hasClass('current') || $("#assessStar-service li").hasClass('current'))) {
                    layer.open({
                        content: '请完成评分',
                        style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                            ,
                        time: 3
                    });
                    return false;
                }
                //宽融校验
                if (commentType == 3 && !($("#doorService li").hasClass('current'))) {
                    layer.open({
                        content: '请完成评分',
                        style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                            ,
                        time: 3000
                    });
                    return false;
                }
                //宽融校验产品评价
                if (commentType == 3 && !($("#PdoorService li").hasClass('current'))) {
                    layer.open({
                        content: '请完成评分',
                        style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                            ,
                        time: 3000
                    });
                    return false;
                }
                if (productId == 'null') {
                    productId = ' ';
                }
                if (commId == 'null') {
                    commId = ' ';
                }
                // 这个地方加一个特定的变量，后面controller去判断，如果将来又需要打开短信验证码的话，直接删除这行
                code = 'web-out-no-certification-code';
                var url = getOutUrl(getRootPath_web(), "/evaluation/submitEvaluation?flag=out&commentType=" + commentType + "&orderNum=" + orderNum + "&code=" + code + "&productName=" + productName + "&broadbandNum=" + broadbandNum + "&productId=" + productId + "&commId=" + commId)
                    // 移网  order_satisfaction,speed_satisfaction,attitude_satisfaction;
                if (commentType == 4) {
                    var url = getOutUrl(getRootPath_web(), "/evaluation/submitEvaluation?flag=out&commentType=" + commentType + "&orderNum=" + orderNum + "&code=" + code + "&orderSatisfaction=" + order_satisfaction + "&speedSatisfaction=" + speed_satisfaction + "&attitudeSatisfaction=" + attitude_satisfaction + "&productName=" + productName + "&broadbandNum=" + broadbandNum + "&productId=" + productId + "&commId=" + commId)
                }
                var paramsArr = $("#submitForm").serializeObject();
                console.log(pictures)
                paramsArr['pictures'] = pictures;
                console.log(paramsArr)
                $.ajax({
                    type: 'POST', //测试  GET  生产POST
                    async: true,
                    url: url,
                    //data: JSON.stringify(paramsArr),
                    data: paramsArr,
                    dataType: 'json',
                    success: function(resData) {
                        if (resData == null) return;
                        if (resData.state == "1") {
                            var str = sessionStorage.getItem("orderListData");
                            if (str) {
                                var arr = JSON.parse(str);
                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].orderNum == orderNum) {
                                        arr[i].commentState = 3;
                                    }
                                }
                                var data = JSON.stringify(arr)
                                sessionStorage.setItem("orderListData", data);
                            }
                            layer.open({
                                content: '评价成功！',
                                style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
                                    ,
                                time: 3,
                                end: function(e) {
                                    var newPage = getUrlParam('newPage');
                                    if (newPage) {
                                        history.back(-1);
                                    } else {
                                        //成功后返回上一页
                                        goBackUrl(getOutUrl(getRootPath_web(), "/web-phone/web-out-order/page/order-list.html?orderNum=" + getUrlParam("orderNum")));
                                    }

                                }
                            });
                        } else {
                            layer.open({
                                content: '评价失败！' + resData.message,
                                style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
                                    ,
                                time: 3
                            });
                        }
                    }
                });
            }
        }
        //校验数据
        ,
    checkData: function() {
            var v1 = $('input[name="extLevel1"]').val();
            var v2 = $('input[name="extLevel2"]').val();
            var v3 = $('input[name="constructLevel"]').val();
            var v4 = $('input[name="extLevel3"]').val();
            var v5 = $('input[name="extLevel4"]').val();
            var comment = $('#comment').val().trim();
            if ($('#serviceComment').attr('id')) {
                var serviceComment = $('#serviceComment').val().trim();
                var productComment = $('#productComment').val().trim();
                $('#serviceComment').val(serviceComment);
                $('#productComment').val(productComment);
            }
            $('#comment').val(comment);
            if (v1 == "" || v2 == "" || v3 == "" || v4 == "" || v5 == "") {
                layer.open({
                    content: '请选择评价内容',
                    style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                        ,
                    time: 3
                });
                return false;
            }
            /*else if (comment == "") {
            	layer.open({
            	  content: '请填写评价内容'
            	  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
            	  ,time: 3
            	});
            	return false;
            } */
            else if (comment != "" && getStringByteLength(comment) > 200) {
                layer.open({
                    content: '您可填写0~200个字符（100个字）！',
                    style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                        ,
                    time: 3
                });
                return false;
            } else if ($('#serviceComment').attr('id')) {
                if (serviceComment != "" && getStringByteLength(serviceComment) > 200) {
                    layer.msg('您可填写0~200个字符（100个字）！', {
                        time: 2000 //2s后自动关闭
                    });
                    return false;
                } else if (productComment != "" && getStringByteLength(productComment) > 200) {
                    layer.msg('您可填写0~200个字符（100个字）！', {
                        time: 2000 //2s后自动关闭
                    });
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }

        }
        //五星评价 -产品评价
        ,
    initServiceRaty: function() {
            $('#demo-service').raty({
                score: 5, //默认选中第5个
                number: 5, //多少个星星设置
                targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
                path: getRootPath_web() + '/web-phone/images/order', //图片路径
                hints: ['非常差', '差', '一般', '好', '非常好'],
                starOff: 'a-off.png',
                starOn: 'a-on.png',
                target: '#hint-service', //目标div
                scoreName: "extLevel1", // 提交表单name
                cancel: false,
                targetKeep: true,
                targetText: '请评分', //无评价提示
                click: function(score, evt) {}
            });
        }
        //五星评价 -上门服务
        ,
    initFashionRaty: function() {
            $('#demo-fashion').raty({
                score: 5, //默认选中第5个
                number: 5, //多少个星星设置
                targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
                path: getRootPath_web() + '/web-phone/images/order', //图片路径
                hints: ['非常差', '差', '一般', '好', '非常好'],
                starOff: 'a-off.png',
                starOn: 'a-on.png',
                target: '#hint-fashion', // 目标div
                scoreName: "extLevel2", // 提交表单name
                cancel: false,
                targetKeep: true,
                targetText: '请评分', //无评价提示
                click: function(score, evt) {}
            });
        }
        //五星评价 -施工速度
        ,
    initConstructRaty: function() {
            $('#demo-construct').raty({
                score: 5, //默认选中第5个
                number: 5, //多少个星星设置
                targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
                path: getRootPath_web() + '/web-phone/images/order', //图片路径
                hints: ['非常差', '差', '一般', '好', '非常好'],
                starOff: 'a-off.png',
                starOn: 'a-on.png',
                target: '#hint-construct', // 目标div
                scoreName: "constructLevel", // 提交表单name
                cancel: false,
                targetKeep: true,
                targetText: '请评分', //无评价提示
                click: function(score, evt) {}
            });
        }
        //五星评价 - 物流服务 extLevel3
        ,
    initaaabbbRaty: function() {
        $('#demo-extLevel1').raty({
            score: 5, //默认选中第5个
            number: 5, //多少个星星设置
            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
            path: getRootPath_web() + '/web-phone/images/order', //图片路径
            hints: ['非常差', '差', '一般', '好', '非常好'],
            starOff: 'a-off.png',
            starOn: 'a-on.png',
            target: '#hint-extLevel1', // 目标div
            scoreName: "extLevel3", // 提交表单name
            cancel: false,
            targetKeep: true,
            targetText: '请评分', //无评价提示
            click: function(score, evt) {}
        });
    },
    initTotalRaty: function() {
        var arr = $("#menu li");
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i];
            $(a).css("background", "#ffffff");
            $(a).css("color", "#000");
        }
    }

}

//【发布】
$(".assessSubmit").click(function() {
    console.log(fileList)
    if (fileList.length == 0) {
        if (orderAssessObj.checkData()) {
            orderAssessObj.assessSubmit();
        }
    } else {
        var paramsArr = $("#submitForm").serializeObject();
        console.log(paramsArr)
        var picturesSubmit = new FormData();
        console.log(fileList)
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            var text = window.atob(file.content.split(",")[1]);
            var buffer = new Uint8Array(text.length);
            for (var a = 0; a < text.length; a++) {
                buffer[a] = text.charCodeAt(a);
            }
            var blob = getBlob([buffer], file.type);
            picturesSubmit.append('pictures', blob, fileList[i].fileName);
            //pictures.append('pictures', blob);
        }

        var commentType = getUrlParam("commentType");
        var url = getOutUrl(getRootPath_web(), "/evaluation/uploadPictures?flag=out&commentType=" + commentType)
        if ("undefined" != typeof(picturesSubmit) && picturesSubmit != null && picturesSubmit != "") {
            $.ajax({
                url: url,
                type: 'POST',
                data: picturesSubmit,
                async: false,
                cache: false,
                contentType: false, //不设置内容类型
                processData: false, //不处理数据
                success: function(data) {
                    console.log(data.pictures)
                    pictures = data.pictures
                    state = data.state
                    if (data.state == '1') {
                        if (orderAssessObj.checkData()) {
                            orderAssessObj.assessSubmit();
                        }
                    } else {
                        layer.open({
                            content: data.message,
                            style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                                ,
                            time: 3000
                        });
                    }
                },
                error: function() {
                    layer.open({
                        content: '请重新选择图上传的图片',
                        style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
                            ,
                        time: 3000
                    });
                }
            })
        }
    }
});

//改变背景颜色
$(".totalEval li").click(function() {
    var id = $(this).attr("id");
    $("#extLevel4").val(id);
    $("#" + id).addClass("li-on").removeClass("li-off");
    $("#" + id).siblings().addClass("li-off").removeClass("li-on"); //brother
});
//获取验证码
$(".codeButton").click(function() {
    var orderListUrl = getOutUrl(getRootPath_web(), "/evaluation/sendMessage?flag=out&phoneNumber=" + phoneNum);
    $.ajax({
        type: 'POST', //测试  GET  生产POST
        async: true,
        url: orderListUrl,
        dataType: 'json',
        beforeSend: function() {
            showLoader();
        },
        complete: function() {
            hideLoader();
        },
        success: function(resData) {
            if (resData == null) return;
            var state = resData.state;
            if (state == 1) {
                layer.open({
                    content: resData.message,
                    style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        ,
                    time: 3
                });
                countdown();
            } else if (state == 0) {
                layer.open({
                    content: resData.message,
                    style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                        ,
                    time: 3
                });
            }
        },
        error: function() { // 未成功发送，提醒发送不成功
            layer.open({
                content: '系统原因',
                style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                    ,
                time: 3
            });
        }
    });
})

/*验证码发送倒计时start*/
function countdown() {

    var obj = $("#CodeBtn");
    messageCodeMinute = 60;
    settime(obj);
}

function settime(obj) { //发送验证码倒计时
    if ((messageCodeMinute == 0) || (messageCodeMinute == 61)) {
        obj.attr('disabled', false);
        //obj.removeattr("disabled");
        $("#CodeBtn").css('backgroundColor', '#f7b135');
        obj.val("重新获取验证码");
        return;
    } else {
        obj.attr('disabled', true);
        $("#CodeBtn").css('backgroundColor', '#ccc');
        obj.val("还剩" + messageCodeMinute + "秒");
        messageCodeMinute--;
    }
    setTimeout(function() {
        settime(obj)
    }, 1000)
}
/*验证码发送倒计时end*/