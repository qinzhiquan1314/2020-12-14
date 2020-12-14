	/*************对外-手机-订单评价-查看*********/
	/*产品评价 extLevel1
	上门服务 extLevel2
	施工速度 constructLevel
	物流服务 extLevel3
	总体评价 extLevel4*/

	//获取路径中参数
	var orderNum = getUrlParam("orderNum"); //订单号
	var productName = getUrlParam("productName");
	//本页面对象
	var orderAssessObj = {
	    //变量-访问路径
	    //url: getOutUrl(getRootPath_web(),"/js/data/order-assess.json?flag=out&orderNum="+orderNum)
	    url: getOutUrl(getRootPath_web(), "/evaluation/queryEvaluation?flag=out&orderNum=" + orderNum)
	        //获取数据
	        ,
	    assessAjax: function() {
	            $.ajax({
	                type: 'POST', //测试  GET  生产POST
	                async: true,
	                url: orderAssessObj.url,
	                dataType: 'json',
	                success: function(resData) {
	                    if (resData == null) return;
	                    if (resData.state == "1") {
	                        if (resData.data != null || resData.data != undefined) {
	                            console.log(resData.data[0].pictures)
	                            var pictures = resData.data[0].pictures;
	                            if (resData.data[0].pictures) {
	                                for (var i = 0; i < pictures.length; i++) {
	                                    if (pictures[i].pictureState == '1') {
	                                        var fileName = pictures[i].picture;
	                                        console.log(fileName)
	                                        var locHref = 'CUpmqVgkWgGhWZOHRm5PXv7EvcZsiFKKjKM2W1Kq3U4%3D'
	                                        var goalUrl = getOutUrl(getRootPath_web(), "/report/getPicture?userParam=" + locHref + "&timestamp=" + Date.parse(new Date()) + "&fileName=" + fileName);
	                                        var tem = "<img class='processImg' src=" + goalUrl + ">";
	                                        $(".imgShow").append(tem);
	                                    }
	                                }
	                            }
	                            orderAssessObj.initData(resData.data[0]);
	                        } else {
	                            if (layer && layer.msg) {
	                                layer.msg('获取信息失败！', {
	                                    time: 2000 //2s后自动关闭
	                                        ,
	                                    shadeClose: false,
	                                    shade: 0.8
	                                });
	                            } else {
	                                layer.open({
	                                    content: resData.message,
	                                    style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
	                                        ,
	                                    time: 2
	                                });
	                            }
	                        }
	                    } else {
	                        if (layer && layer.msg) {
	                            layer.msg(resData.message, {
	                                time: 2000 //2s后自动关闭
	                            }, function() {
	                                var index = parent.layer.getFrameIndex(window.name);
	                                parent.layer.close(index);
	                            });
	                        } else {
	                            layer.open({
	                                content: resData.message,
	                                style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
	                                    ,
	                                time: 2
	                            });
	                        }

	                    }
	                }
	            });
	        }
	        //五星评价 -施工速度
	        ,
	    initConstructRaty: function(num) {
	            $('#demo-construct').raty({
	                score: num, //默认选中第5个
	                number: 5, //多少个星星设置
	                readOnly: true, //只读
	                targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	                path: getRootPath_web() + '/images/order', //图片路径
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
	        //五星评价 -产品评价
	        ,
	    initServiceRaty: function(num) {
	            $('#demo-service').raty({
	                score: num, //默认选中第5个
	                number: 5, //多少个星星设置
	                readOnly: true, //只读
	                targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	                path: getRootPath_web() + '/images/order', //图片路径
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
	    initFashionRaty: function(num) {
	            $('#demo-fashion').raty({
	                score: num, //默认选中第5个
	                number: 5, //多少个星星设置
	                readOnly: true, //只读
	                targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	                path: getRootPath_web() + '/images/order', //图片路径
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
	        //五星评价 - 物流服务 -extLevel3
	        ,
	    initaaabbbRaty: function(num) {
	        $('#demo-extLevel1').raty({
	            score: num, //默认选中第5个
	            number: 5, //多少个星星设置
	            readOnly: true, //只读
	            targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	            path: getRootPath_web() + '/images/order', //图片路径
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
	    initTotalRaty: function(num) {
	            $("#" + num).addClass("li-on").removeClass("li-off");
	        }
	        //初始化数据
	        ,
	    initData: function(data) {
	        var v1 = data.extLevel1; //产品评价
	        var v2 = data.extLevel2; //上门服务
	        var v3 = data.constructLevel; //施工速度
	        var v4 = data.extLevel3; //物流服务
	        // var v5 = data.extLevel4;
	        var contentState = data.contentState;
	        var comment = data.comment;
	        var serviceComment = data.serviceComment;
	        var productComment = data.productComment;
	        var serviceStaff = data.serviceStaff; //服务人员
	        var productStaff = data.productStaff; //Pq2
	        var installedTime = data.installedTime; //装机时长   单选
	        var serviceHall = data.serviceHall; ////营业厅
	        var productHall = data.productHall; ////Pq3
	        var serviceHotline = data.serviceHotline; //客服热线
	        var productHotline = data.productHotline; //Pq4
	        var websiteAndApp = data.websiteAndApp; //网站及应用  单选
	        var productQuality = data.productQuality; //产品质量
	        var corporatePolicy = data.corporatePolicy; //公司政策
	        var otherAspectsImprovement = data.otherAspectsImprovement; //其他方面改进   单选
	        // 移网改版
	        var order_satisfaction = data.orderSatisfaction;
	        var speed_satisfaction = data.speedSatisfaction;
	        var attitude_satisfaction = data.attitudeSatisfaction;
	        if (!productName) {
	            var prodName = data.prodName
	            $('#productName').text(prodName);
	        }
	        var current = "<img src='../../images/order/star_yellow.png'>"
	        var onCurrent = "<img src='../../images/order/star_yellow_empty.png'>"

	        function star(fn1, fn2) {
	            if (fn1 <= 6) {
	                $(fn2).text('不满意')
	            } else if (fn1 > 6 && fn1 <= 8) {
	                $(fn2).text('一般')
	            } else if (fn1 > 8) {
	                $(fn2).text('满意')
	            }
	        }
	        if (order_satisfaction != "undefined" && order_satisfaction) {
	            $('#assessStar-shopping li:nth-child(' + order_satisfaction + ')').html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
	            star(order_satisfaction, '#shopping-star')
	        }
	        if (speed_satisfaction != "undefined" && speed_satisfaction) {
	            $('#assessStar-cell li:nth-child(' + speed_satisfaction + ')').html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
	            star(speed_satisfaction, '#cell-star')

	        }
	        if (attitude_satisfaction != "undefined" && attitude_satisfaction) {
	            $('#assessStar-service  li:nth-child(' + attitude_satisfaction + ')').html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
	            star(attitude_satisfaction, '#service-star')
	        }
	        // 宽融改版
	        var extLevel4 = data.extLevel4;
	        var extLevel5 = data.extLevel5;
	        if (extLevel4 != undefined && extLevel4) {
	            $('#doorService li:nth-child(' + extLevel4 + ')').html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
	            star(extLevel4, '#doorService-star')
	                // q2-q3 q4回显
	            if (extLevel4 <= 6) {
	                //$('#q2').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
	                $('#q2').addClass('disBlock').removeClass('disNone')
	                $('#q3').addClass('disNone').removeClass('disBlock')
	                $('#q4').addClass('disNone').removeClass('disBlock')
	                if (!checkNullOrEmptyStr(serviceStaff) && serviceStaff != undefined) {
	                    if (serviceStaff.indexOf(",") == -1) {
	                        $("input:checkbox[name=serviceStaff][value=" + parseInt(serviceStaff) + "]").parent('.labcheckBox').addClass('checkBox');
	                    } else {
	                        for (var i = 0; i < serviceStaff.split(',').length; i++) {
	                            $("input:checkbox[name=serviceStaff][value=" + parseInt(serviceStaff.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                        }
	                    }
	                }

	            } else if (extLevel4 > 6 && extLevel4 <= 8) {
	                //$('#q3').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
	                $('#q2').addClass('disNone').removeClass('disBlock')
	                $('#q3').addClass('disBlock').removeClass('disNone')
	                $('#q4').addClass('disNone').removeClass('disBlock')
	                if (!checkNullOrEmptyStr(serviceHall) && serviceHall != undefined) {
	                    if (serviceHall.indexOf(",") == -1) {
	                        $("input:checkbox[name=serviceHall][value=" + parseInt(serviceHall) + "]").parent('.labcheckBox').addClass('checkBox');
	                    } else {
	                        for (var i = 0; i < serviceHall.split(',').length; i++) {
	                            $("input:checkbox[name=serviceHall][value=" + parseInt(serviceHall.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                        }
	                    }
	                }
	            } else if (extLevel4 > 8) {
	                //$('#q4').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
	                $('#q2').addClass('disNone').removeClass('disBlock')
	                $('#q3').addClass('disNone').removeClass('disBlock')
	                $('#q4').addClass('disBlock').removeClass('disNone')
	                if (!checkNullOrEmptyStr(serviceHotline) && serviceHotline != undefined) {
	                    if (serviceHotline.indexOf(",") == -1) {
	                        $("input:checkbox[name=serviceHotline][value=" + parseInt(serviceHotline) + "]").parent('.labcheckBox').addClass('checkBox');
	                    } else {
	                        for (var i = 0; i < serviceHotline.split(',').length; i++) {
	                            $("input:checkbox[name=serviceHotline][value=" + parseInt(serviceHotline.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                        }
	                    }
	                }
	            }
	        }
	        if (extLevel5 != undefined && extLevel5) {
	            $('#PdoorService li:nth-child(' + extLevel5 + ')').html(current).prevAll("li").html(current).end().nextAll().html(onCurrent);
	            star(extLevel5, '#doorService-star')
	                // q2-q3 q4回显
	            if (extLevel5 <= 6) {
	                // $('#q2').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
	                $('#Pq2').addClass('disBlock').removeClass('disNone')
	                $('#Pq3').addClass('disNone').removeClass('disBlock')
	                $('#Pq4').addClass('disNone').removeClass('disBlock')
	                if (!checkNullOrEmptyStr(productStaff) && productStaff != undefined) {
	                    if (productStaff.indexOf(",") == -1) {
	                        $("input:checkbox[name=productStaff][value=" + parseInt(productStaff) + "]").parent('.labcheckBox').addClass('checkBox');
	                    } else {
	                        for (var i = 0; i < productStaff.split(',').length; i++) {
	                            $("input:checkbox[name=productStaff][value=" + parseInt(productStaff.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                        }
	                    }
	                }

	            } else if (extLevel5 > 6 && extLevel5 <= 8) {
	                // $('#q3').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
	                $('#Pq2').addClass('disNone').removeClass('disBlock')
	                $('#Pq3').addClass('disBlock').removeClass('disNone')
	                $('#Pq4').addClass('disNone').removeClass('disBlock')
	                if (!checkNullOrEmptyStr(productHall) && productHall != undefined) {
	                    if (productHall.indexOf(",") == -1) {
	                        $("input:checkbox[name=productHall][value=" + parseInt(productHall) + "]").parent('.labcheckBox').addClass('checkBox');
	                    } else {
	                        for (var i = 0; i < productHall.split(',').length; i++) {
	                            $("input:checkbox[name=productHall][value=" + parseInt(productHall.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                        }
	                    }
	                }
	            } else if (extLevel5 > 8) {
	                //$('#q4').addClass('disBlock').removeClass('disNone').siblings('.servicePer').addClass('disNone').removeClass('disBlock')
	                $('#Pq2').addClass('disNone').removeClass('disBlock')
	                $('#Pq3').addClass('disNone').removeClass('disBlock')
	                $('#Pq4').addClass('disBlock').removeClass('disNone')
	                if (!checkNullOrEmptyStr(productHotline) && productHotline != undefined) {
	                    if (productHotline.indexOf(",") == -1) {
	                        $("input:checkbox[name=productHotline][value=" + parseInt(productHotline) + "]").parent('.labcheckBox').addClass('checkBox');
	                    } else {
	                        for (var i = 0; i < productHotline.split(',').length; i++) {
	                            $("input:checkbox[name=productHotline][value=" + parseInt(productHotline.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                        }
	                    }
	                }
	            }
	        }
	        var flag = (v1 != undefined && v2 != undefined && v3 != undefined);
	        if (flag) {
	            //初始化【五星评价】
	            orderAssessObj.initServiceRaty(v1);
	            orderAssessObj.initFashionRaty(v2);
	            orderAssessObj.initConstructRaty(v3);
	            orderAssessObj.initTotalRaty(extLevel4);
	        }
	        if (extLevel4 == '3') {
	            $('#unsatisfy').css('display', 'none')
	            $('.proposalBox').css('display', 'none')
	        }
	        //总体评价
	        if (extLevel4 != undefined && !checkNullOrEmptyStr(extLevel4)) {
	            orderAssessObj.initTotalRaty(extLevel4);
	        }
	        //产品评价
	        if (v1 == undefined || checkNullOrEmptyStr(v1)) {
	            $("#service").hide();
	        } else {
	            $("#service").show();
	            orderAssessObj.initServiceRaty(v1);
	        }
	        //服务水平
	        if (v3 == undefined || checkNullOrEmptyStr(v3)) {
	            $("#construct").hide();
	        } else {
	            $("#construct").show();
	            orderAssessObj.initConstructRaty(v3);
	        }
	        //物流服务
	        if (v4 == undefined || checkNullOrEmptyStr(v4)) {
	            $("#divWLFW").hide();
	        } else {
	            $("#divWLFW").show();
	            orderAssessObj.initaaabbbRaty(v4);
	        }

	        if (!checkNullOrEmptyStr(serviceComment) && serviceComment != undefined) {
	            $('#Stxc-txt').addClass('disBlock').removeClass('disNone')
	            $("#serviceComment").val(serviceComment);
	        }
	        if (!checkNullOrEmptyStr(productComment) && productComment != undefined) {
	            $('#Ptxc-txt').addClass('disBlock').removeClass('disNone')
	            $("#productComment").val(productComment);
	        }
	        if (contentState == '1') {
	            if (!checkNullOrEmptyStr(comment) && comment != undefined) {
	                $("#comment").val(comment);
	            }
	        } else if (contentState == '2') {
	            $('#txc-txt').hide()
	        }
	        //产品质量
	        if (!checkNullOrEmptyStr(productQuality) && productQuality != undefined) {
	            $('#productQuality').find("span").addClass("main");
	            $('#productQuality').find("ul").addClass("Spanshow")
	            if (productQuality.indexOf(",") == -1) {
	                $("input:checkbox[name=productQuality][value=" + parseInt(productQuality) + "]").parent('.labcheckBox').addClass('checkBox');
	            } else {
	                for (var i = 0; i < productQuality.split(',').length; i++) {
	                    $("input:checkbox[name=productQuality][value=" + parseInt(productQuality.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                }
	            }
	        }
	        //公司政策
	        if (!checkNullOrEmptyStr(corporatePolicy) && corporatePolicy != undefined) {
	            $('#corporatePolicy').find("span").addClass("main");
	            $('#corporatePolicy').find("ul").addClass("Spanshow")
	            if (corporatePolicy.indexOf(",") == -1) {
	                $("input:checkbox[name=corporatePolicy][value=" + parseInt(corporatePolicy) + "]").parent('.labcheckBox').addClass('checkBox');
	            } else {
	                console.log(corporatePolicy.split(','))
	                for (var i = 0; i < corporatePolicy.split(',').length; i++) {
	                    $("input:checkbox[name=corporatePolicy][value=" + parseInt(corporatePolicy.split(',')[i]) + "]").parent('.labcheckBox').addClass('checkBox');
	                }
	            }
	        }
	        //装机时长 
	        if (!checkNullOrEmptyStr(installedTime) && installedTime != undefined) {
	            $("#installedTime").addClass('bcOrange');
	        }
	        //网站及应用
	        if (!checkNullOrEmptyStr(websiteAndApp) && websiteAndApp != undefined) {
	            $("#websiteAndApp").addClass('bcOrange');
	        }
	        //网站及应用
	        if (!checkNullOrEmptyStr(otherAspectsImprovement) && otherAspectsImprovement != undefined) {
	            $("#otherAspectsImprovement").addClass('bcOrange');
	        }
	        $("#installedTime").find('p').removeClass('checkBox');
	        $("#websiteAndApp").find('p').removeClass('checkBox');
	        $("#otherAspectsImprovement").find('p').removeClass('checkBox');
	    }
	}


	$(document).ready(function() {
	    $('#productName').text(productName);
	    orderAssessObj.assessAjax();
	});