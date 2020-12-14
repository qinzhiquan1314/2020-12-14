/***************************日期处理********************/
/**
 * 获取当前日期
 *
 * str:需要什么样的格式 如：yyyy-mm-dd
 * 返回格式：2015-01-10
 */
function getCurrentDate(str) {
    var clock = getTime("", 0);
    clock = changeDateFomate(clock, str);
    return (clock);
}

function getBeforeDate(str) {
    var clock = getBeforeTime("", 0);
    clock = changeDateFomate(clock, str);
    return (clock);
}

/**
 * 获取时间间隔
 * @param mNum 当前分钟数加几分钟
 * 返回格式：2015-03-30 01:00~01:05
 */
function getTimeInterval(clock1, clock2) {
    var clock = changeDateFomate(clock1, "yyyy-mm-dd hh:mm") + "-" + changeDateFomate(clock2, "hh:mm");
    //console.log(clock);
    return (clock);
}

/**
 * 获取日期(如果time不为空，则获取该时间的5分钟后的时间)
 *
 * @param time:'20150330010001000'
 * @param mNum:当前分钟数加几分钟 如：5：加5分钟   -5：减5分钟
 * 返回格式：20150330010501000
 */
function getTime(time, mNum) {

    var now = null;

    if (time != "" && time != null && time.length == 17) {
        // 手机浏览器不支持parse()方法
        now = new Date(time.substring(0, 4), time.substring(4, 6) - 1, time.substring(6, 8), time.substring(8, 10), time.substring(10, 12), time.substring(12, 14));
    } else {
        now = new Date();
    }

    now.setMinutes(now.getMinutes() + mNum);

    var year = now.getFullYear();       //年   
    var month = now.getMonth() + 1;     //月    0~11 
    var day = now.getDate();            //日
    var hour = now.getHours();
    var minute = now.getMinutes();

    var seconds = now.getSeconds()

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // 数值与字符间隔，否则会相加
    var clock = year + "" + month + "" + day + "" + hour + "" + minute + "" + seconds + "000";

    //console.log(clock);
    return (clock);
}


function getBeforeTime(time, mNum) {

    var now = null;

    if (time != "" && time != null && time.length == 17) {
        // 手机浏览器不支持parse()方法
        now = new Date(time.substring(0, 4), time.substring(4, 6) - 1, time.substring(6, 8), time.substring(8, 10), time.substring(10, 12), time.substring(12, 14));
    } else {
        now = new Date();
    }

    now.setMinutes(now.getMinutes() + mNum);
    var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    var year = date.getFullYear();       //年   
    var month = date.getMonth() + 1;     //月    0~11 
    var day = date.getDate();            //日
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds()

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // 数值与字符间隔，否则会相加
    var clock = year + "" + month + "" + day + "" + hour + "" + minute + "" + seconds + "000";

    //console.log(clock);
    return (clock);
}


/**
 * 将格式：20150330010101000 转为：2015-03-30 01:01:01
 * @param time
 * @param str  转换格式
 * @returns
 */
function changeDateFomate(time, str) {

    if (time.length == 17) {
        if (str == "yyyy-mm-dd hh:mm:ss") {
            time = time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8)
                + " " + time.substring(8, 10) + ":" + time.substring(10, 12) + ":" + time.substring(12, 14);
        } else if (str == "yyyy-mm-dd hh:mm") {
            time = time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8)
                + " " + time.substring(8, 10) + ":" + time.substring(10, 12);
        } else if (str == "yyyy-mm-dd") {
            time = time.substring(0, 4) + "-" + time.substring(4, 6) + "-" + time.substring(6, 8);
        } else if (str == "hh:mm") {
            time = time.substring(8, 10) + ":" + time.substring(10, 12);
        } else if (str == "yyyymmdd000000000") {
            time = time = time.substring(0, 8) + "000000000";
        } else {

        }
    }
    return time;
}

/****************************校验******************/
/**
 * 校验空或null
 * @param str
 * @returns
 */
function checkNullOrEmptyStr(str) {
    return str == "" || str == null || str == "null" ? true : false;
}


/****************************数字处理******************/

/**
 * 保留两个小数
 * @param num
 */
function roundNum(num) {
    if (checkNullOrEmptyStr(num)) return '';
    num = Math.round(num * 100) / 100;
    return num;
}

/***************************String**************/

/**
 * jquery trim() ie8不支持，这里重写
 * 字符串首尾去空格
 * 例：" abc " -> "abc"
 *
 * */
String.prototype.trim = function () {
    var re = /(^\s*)|(\s*$)/ig;
    var newstr = this.replace(re, "");
    return newstr;
}

/**************************table*************/

/**
 * 获取查询条件 返回json格式
 */
function getQueryParams(params, formId) {
    return $("#" + formId).serialize() + "&" + $.param(params);
}

/**
 * bootstrap-table传参,直接可以使用如：<table id="table" data-query-params="queryParams" ....>
 *
 * @param params
 *    searchForm  查询条件form的id 如：<form id="searchForm">
 *
 * @returns
 */
function queryParams(params) {
    return getQueryParams(params, "searchForm");
}

/**********************返回按钮*****************/
/**
 * 【返回】按钮事件
 */
function goBack() {
    //window.history.back();//微信里使用不起作用
    history.back(-1);//微信里使用起作用
}

/**
 * 【提交成功后】返回上一页并刷新
 * 直接传上一页url
 */
function goBackUrl(url) {
    location.href = url;
}


/**
 * 【提交成功后】返回并刷新上一页  浏览器支持，手机不支持
 */
function goBackRefresh() {
    //window.location.href=document.referrer;//浏览器可以，微信不支持
    //history.back();location.reload();//浏览器可以，手机不刷新
    window.location.replace(document.referrer);//浏览器可以，手机不刷新
}

/**
 * 当前页面重新加载
 */
function reloadPage() {
    location.reload();
}

/************************pc**************/

/**
 * 根据screen 设置height
 * div : #div  .div
 */
function setScreenHeight(str, topPX) {
    var screenHeight = document.documentElement.clientHeight;//ie不支持 window.innerHeight;//窗口大小，随着窗口大小变化大小
    screenHeight = screenHeight - topPX;
    $(str).css({minHeight: screenHeight + "px"});
}

function setScreenHeight1(str, str1) {
    var screenHeight = document.documentElement.clientHeight;//ie不支持 window.innerHeight;//窗口大小，随着窗口大小变化大小
    var hh1 = $("#" + str1).height();
    screenHeight = screenHeight - hh1;
    $(str).css({minHeight: screenHeight + "px"});
}

/************************弹出层**************/

/**
 * 弹出层-右边显示
 */
function showRightLayer(layerId, layerTitle, layerUrl) {
    layer.open({
        type: 2,
        id: layerId, //设定一个id，防止重复弹出
        title: layerTitle,//title: false, //不显示标题栏
        shadeClose: true,
        shade: 0,//背景  shade: 0.8
        area: ['490px', '98%'],
        offset: 'r',
        skin: 'a-layer', //
        content: layerUrl //iframe的url
        /*,end: function () {
            location.reload();
        }*/
    });

}


/**********************校验****************/
/**
 * 电话号码转换
 */
function telFormat(tel) {
    var reg = tel.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
    //console.log("转换后的电话号码："+reg);
    return reg;
}

/**
 * placeholder 兼容ie8 解决方式
 * @param target
 */
function placeholder(target) {
    $(target).val($(target).attr("datavalue")).addClass("inpupt-placeholder");

    $(target).focus(function () {
        if ($(this).val() == $(this).attr("datavalue")) {
            $(this).val("").removeClass("inpupt-placeholder");
        }

    })
    $(target).blur(function () {
        if ($(this).val() == "" || $(this).val() == $(this).attr("datavalue")) {
            $(this).val($(target).attr("datavalue")).addClass("inpupt-placeholder");
        }
    })
};

/**
 * place ie8 解决方式
 * @param target
 */
function place(target) {
    if ($(target).val() != $(target).attr("datavalue")) {
        $(target).removeClass("inpupt-placeholder");
    }
};

/*18位身份证有效性校验*/
function checkID(ID) {
    if (typeof ID !== 'string')
        return false;
    var city = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁",
        22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建",
        36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西",
        46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西",
        62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门",
        91: "国外"
    };
    //截出生年月日   1994/4/28
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
    var d = new Date(birthday);   //   1994/4/28
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());

    var currentTime = new Date().getTime();  //当前日期返回距 1970 年 1 月 1 日之间的毫秒数。
    var time = d.getTime();  //出生年月日距 1970 年 1 月 1 日之间的毫秒数。

    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var sum = 0, i, residue;

    if (!/^\d{17}(\d|x)$/i.test(ID)) //输入身份证位数不符
        return false;
    if (city[ID.substr(0, 2)] === undefined)
        return false;  //城市标识代码不存在

    //身份证号的出生年月如果大于当前年月日   或   截取的日期为非法date格式
    if (time >= currentTime || birthday !== newBirthday)
        return false;

    //计算身份证号最后一位
    for (i = 0; i < 17; i++) {
        sum += ID.substr(i, 1) * arrInt[i];
    }
    residue = arrCh[sum % 11];

    if (residue !== ID.substr(17, 1))
        return false;

    return true;
    // return city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女")
}


//手机号码校验
function checkPhoneNum(Str) {
    var b1 = checkNullOrEmptyStr(Str);
    if (b1 == false) {//不为空
        if (/^1\d{10}$/.test(Str)) {
            return true;    //手机号码格式正确
        } else {
            return false;   //手机号码格式错误
        }
    } else {
        return true;
    }
}

//固话号码和宽带号码校验
function checkAccAndTele(Str) {
    if (checkNullOrEmptyStr(Str) == false) {
        if (/^010\d{8}$/.test(Str) || /^(ly|LY)[\d]{8}$/.test(Str) || /^T010\d{8}$/.test(Str)) {
            return true;    //固话和宽带号码格式正确
        } else {
            return false;   //固话和宽带号码错误
        }
    } else {
        return true;
    }
}

//宽带号码校验
function checkAcc(Str) {
    if (checkNullOrEmptyStr(Str) == false) {
        if (Str.length > 5) {
            return true;    //固话和宽带号码格式正确
        } else {
            return false;   //固话和宽带号码错误
        }
    } else {
        return true;
    }
}

//短信验证码校验
function checkcodeNumber(Str) {
    if (checkNullOrEmptyStr(Str) == false) {
        if (/^\d{6}$/.test(Str)) {
            return true;    //固话和宽带号码格式正确
        } else {
            return false;   //固话和宽带号码错误
        }
    } else {
        return true;
    }
}

/**
 * str字符串 按num 截取换行，两行显示
 * @param str
 * @param num
 * @returns {String}
 */
function checkLen(str) {
    var num = 10;
    if (checkNullOrEmptyStr(str)) "";
    //debugger;
    //var len = getStringByteLength(str);//这个不适合换行计算
    var len = str.length;
    if (len > num) {
        num = Math.round(len / 2);
        str = str.substr(0, num) + "\n" + str.substr(num);
    }
    return str;
}

/**
 * 获取字节长度（汉字算两个字符，字母数字算一个）
 * @param str
 * @returns
 */
function getStringByteLength(str) {
    if (str == "") return "";
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) > 255 ? 2 : 1;// Unicode 编码
    }
    return len;
}

/*********************存 取 localStorage****************/

/**
 * 存
 * ItemName ： key值
 * obj ： json对象 如：obj = {type:"",value:""}
 */
function setLocalData(ItemName, obj) {
    var objJson = JSON.stringify(obj)
    localStorage.setItem(ItemName, objJson);
}

//
/**
 * 取
 * ItemName ： key值
 * return obj  json对象 如：obj = {type:"",value:""}
 */
function getLocalData(ItemName) {
    var obj = localStorage.getItem(ItemName);
    obj = JSON.parse(obj);
    return obj;
}


/************PC查询参数的变量存取************/
//存储 对外 订单列表   (查询条件)
function setPcOrderQueryStr(query) {
    sessionStorage.setItem("pcOrderListQueryStr", query);
}

//获取  对外 订单列表  (查询条件)
function getPcOrderQueryStr() {
    var str = sessionStorage.getItem("pcOrderListQueryStr");
    return str;
}

//评价&建议字数实时统计
function countWord() {
    var comment = $('#comment').val();
    var commentNum = getStringByteLength(comment);
    $('#textNum').text(Math.ceil(commentNum / 2));//这句是在键盘按下时，实时的显示字数
    if (commentNum > 200) {
        $('#textNum').text(100);//长度大于100时0处显示的也只是100
        //长度大于200时截取钱200个字符
        var index = 0;
        for (var i = 0; i < comment.length; i++) {
            if (getStringByteLength(comment.substring(0, i)) <= 200)
                index = i;
        }

        $('#comment').val(comment.substring(0, index));
    }
    var serviceComment = $('#serviceComment').val();
    var servicecommentNum = getStringByteLength(serviceComment);
    $('#serviceTextNum').text(Math.ceil(servicecommentNum / 2));//这句是在键盘按下时，实时的显示字数
    if (servicecommentNum > 200) {
        $('#serviceTextNum').text(100);//长度大于100时0处显示的也只是100
        //长度大于200时截取钱200个字符
        var index = 0;
        for (var s = 0; s < serviceComment.length; s++) {
            if (getStringByteLength(serviceComment.substring(0, s)) <= 200)
                index = s;
        }

        $('#serviceComment').val(serviceComment.substring(0, index));
    }
    var productComment = $('#productComment').val();
    var productcommentNum = getStringByteLength(productComment);
    $('#productTextNum').text(Math.ceil(productcommentNum / 2));//这句是在键盘按下时，实时的显示字数
    if (productcommentNum > 200) {
        $('#productTextNum').text(100);//长度大于100时0处显示的也只是100
        //长度大于200时截取钱200个字符
        var index = 0;
        for (var p = 0; p < productComment.length; p++) {
            if (getStringByteLength(productComment.substring(0, p)) <= 200)
                index = p;
        }

        $('#productComment').val(productComment.substring(0, index));
    }
}

/**********************浏览器版本********************/
//判断浏览器版本
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=6
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1;//不是ie浏览器
    }
}


/**************************************/

/**
 * 根据类型获取 members数组中的serialNumber
 * type netTypeCode 单个值 or 数组
 * arr  members:[]
 * 如：40 宽带, 30 固话, 手机
 * 类型是30 getSerialNumberArrByType(30,resData.data.member);
 * 类型是40 getSerialNumberArrByType(40,resData.data.member);
 * 类型既不是30也不是40  getSerialNumberArrByType([30,40],resData.data.member);
 */
function getSerialNumberArrByType(type, arr) {
    if (arr == null || arr.length == 0) return "";
    var str = "";
    $.each(arr, function (index, obj) {
        var netTypeCode = obj.netTypeCode;
        var serialNumber = obj.serialNumber;
        if (!checkNullOrEmptyStr(serialNumber)) {
            if (typeof type == "number") {
                if (type == netTypeCode) {
                    str = str.length == 0 ? "" : str + ",";
                    str = str + serialNumber;
                }
            }
            if (typeof type == "object") {
                if (type.length == 4) {
                    if (type[0] != netTypeCode && type[1] != netTypeCode && type[2] != netTypeCode && type[3] != netTypeCode && netTypeCode != "CP") {
                        str = str.length == 0 ? "" : str + ",";
                        str = str + serialNumber;
                    }

                }

                if (type.length == 3) {
                    if (type[0] == netTypeCode || type[1] == netTypeCode || type[2] == netTypeCode) {
                        str = str.length == 0 ? "" : str + ",";
                        str = str + serialNumber;
                    }
                }
            }

        }
    });
    console.log(str);
    return str;
}

/**
 * 获取数组中所有keyName的值  symbol :"<br/>" or "," or 其它
 *
 * 如：getKeyNameArr("serialNumber",resData.data.member,",");
 *    getKeyNameArr("serialNumber",resData.data.member,"</br>");
 *
 */
function getKeyNameArr(keyName, arr, symbol) {

    if (arr == null || arr.length == 0) return "";
    var str = "";

    $.each(arr, function (index, obj) {
        var v = '';
        for (var k in obj) {
            if (k == keyName) {
                v = obj[k];
            }
        }

        if (!checkNullOrEmptyStr(v)) {
            if ("bssSubscribeId" == keyName && str.indexOf(v) >= 0) {
                return;
            }
            if ("serialNumber" == keyName && obj.netTypeCode == "CP") {
                return;
            }
            str = str.length == 0 ? "" : str + symbol;
            str = str + v;
        }
    });
    //console.log(str);
    return str;
}

//删除数组中指定元素，不改变原数组
function remove(arr, item) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (i != item) {
            result.push(arr[i]);
        }
    }
    return result;
}

function check(exceptFields,isPC) {
    $("#searchForm").each(function () {
        if (this.style.display != 'none') {
            $(this).find(':text').each(function () {
                // 属性的，属性为hidden的时候，有时候visible也可能会返回true; 当不改变display 的时候改变该属性也可以hidden，但不同的是，这个属性不会回收空间，该组件占的空间还在，只不过是空白的
                var visibility = ($(this).css("visibility") && $(this).css("visibility") == "hidden") ? false : true;
                // display 的
                var visible = $(this).is(':visible');
                if(!visibility || !visible) {
                    return true;
                }
                if (exceptFields) {
                    var ss = exceptFields.split(",");
                    if (ss.indexOf($(this).get(0).id) > -1) {
                        return true;
                    }
                }
                var c = $(this).attr('checkType');
                if (!c) return true;
                var array = c.split(',');
                // 将来有需要的话，就不提示了，搞成红色的框，就可以全部都校验了再提示
                for (var i = 0; i < array.length; i++) {
                    var checkType = array[i];
                    switch (checkType) {
                        case "null":
                            if ((($(this).attr('thisQuery') && $(this).attr('thisQuery') == 'true') || !$(this).attr('thisQuery')) && ($(this).val() == '' || $(this).attr('datavalue') == $(this).val())) {
                                var errorMessage = $(this).attr(checkType + '-error-message');
                                errorMessage = errorMessage ? errorMessage : $(this).attr('error-message');
                                if (errorMessage) {
                                    layer.open({
                                        content: errorMessage
                                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                                        , time: isPC ? 2000: 2
                                    });
                                }
                                throw new Error('校验失败');
                            }
                            break;
                        case "checkrel":
                            var rel = $(this).attr('checkrel');
                            if (($(this).val() == '' || $(this).attr('datavalue') == $(this).val()) && ($('#' + rel).val() == '' || $('#' + rel).attr('datavalue') == $('#' + rel).val())) {
                                var errorMessage = $(this).attr(checkType + '-error-message');
                                errorMessage = errorMessage ? errorMessage : $(this).attr('error-message')
                                if (errorMessage) {
                                    layer.open({
                                        content: errorMessage
                                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                                        , time: isPC ? 2000: 2
                                    });
                                }
                                throw new Error('校验失败');
                            }
                            break;
                        default:
                            var f = Function('"use strict";return (' + checkType + ')')();
                            if (!f($(this).val())) {
                                var errorMessage = $(this).attr(checkType + '-error-message');
                                errorMessage = errorMessage ? errorMessage : $(this).attr('error-message')
                                if (errorMessage) {
                                    layer.open({
                                        content: errorMessage
                                        , style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
                                        , time: isPC ? 2000: 2
                                    });
                                }
                                throw new Error('校验失败');
                            }
                    }
                }
            });
        }
    });
}

function checkPC(exceptFields) {
    $("#searchForm").each(function () {
        if (this.style.display != 'none') {
            $(this).find(':text').each(function () {
                // 属性的，属性为hidden的时候，有时候visible也可能会返回true; 当不改变display 的时候改变该属性也可以hidden，但不同的是，这个属性不会回收空间，该组件占的空间还在，只不过是空白的
                var visibility = ($(this).css("visibility") && $(this).css("visibility") == "hidden") ? false : true;
                // display 的
                var visible = $(this).is(':visible');
                if(!visibility || !visible) {
                    return true;
                }
                if (exceptFields) {
                    var ss = exceptFields.split(",");
                    if (ss.indexOf($(this).get(0).id) > -1) {
                        return true;
                    }
                }
                var c = $(this).attr('checkType');
                if (!c) return true;
                var array = c.split(',');
                // 将来有需要的话，就不提示了，搞成红色的框，就可以全部都校验了再提示
                for (var i = 0; i < array.length; i++) {
                    var checkType = array[i];
                    switch (checkType) {
                        case "null":
                            if ((($(this).attr('thisQuery') && $(this).attr('thisQuery') == 'true') || !$(this).attr('thisQuery')) && ($(this).val() == '' || $(this).attr('datavalue') == $(this).val())) {
                                var errorMessage = $(this).attr(checkType + '-error-message');
                                errorMessage = errorMessage ? errorMessage : $(this).attr('error-message');
                                if (errorMessage) {
                                    layer.msg(errorMessage, {
                                        time: 2000
                                    });
                                }
                                throw new Error('校验失败');
                            }
                            break;
                        case "checkrel":
                            var rel = $(this).attr('checkrel');
                            if (($(this).val() == '' || $(this).attr('datavalue') == $(this).val()) && ($('#' + rel).val() == '' || $('#' + rel).attr('datavalue') == $('#' + rel).val())) {
                                var errorMessage = $(this).attr(checkType + '-error-message');
                                errorMessage = errorMessage ? errorMessage : $(this).attr('error-message')
                                if (errorMessage) {
                                    layer.msg(errorMessage, {
                                        time: 2000
                                    });
                                }
                                throw new Error('校验失败');
                            }
                            break;
                        default:
                            var f = Function('"use strict";return (' + checkType + ')')();
                            if (!f($(this).val())) {
                                var errorMessage = $(this).attr(checkType + '-error-message');
                                errorMessage = errorMessage ? errorMessage : $(this).attr('error-message')
                                if (errorMessage) {
                                    layer.msg(errorMessage, {
                                        time: 2000
                                    });
                                }
                                throw new Error('校验失败');
                            }
                    }
                }
            });
        }
    });
}
