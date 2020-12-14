/*------------------------
 * 
 * JAVASCRIPT "flowplugin.js"
 * 
 * show flow on date
 * 
 ----------------------------------*/

(function($) {
    $.fn.flowplugin = function(opt) {
        opt = $.extend({
            jsonDate: [], //json数据
            imgPath: "img/", //img/f1.png
            imgType: "png" //图片后缀名
                //			imgSrcStart:"img/f1.png",//最新流程节点图片
                //			imgSrcOther:"img/f2.png",//其它流程节点图片
                //			imgWidth:"20px",//图片宽  设置第一个图片的宽度
                //			imgHeight:"20px",//图片高  设置第一个图片的高度
                //			imgClass: undefined//图片宽高样式   （如果传入imgClass 则不需要设置imgHeight,imgHeight）
        }, opt);

        var flowHtml = '<div class="flowSwrap"><div class="hidden-line flow-line" ></div ></div > ';
        var cellHtml = '<div id="CELL_ID" class="flowCell"><div class="cell-center"></div><div class="cell-right"></div></div>';

        //组织流程内容区域
        function _makeContent(obj) {
            if (opt.jsonDate == null) return;
            if (opt.jsonDate.data == null) return;
            if (opt.jsonDate.data.length == 0) return;

            var data = opt.jsonDate.data; //流程节点数组数据
            var cellSize = data.length; //定义流程节点的个数

            //创建外层框架
            obj.append(flowHtml);

            //遍历生成一行一行 流程信息
            $.each(data, function(index, item) {
                //var v_date = (item.createDate == undefined || item.createDate == null) ? "" : item.createDate.split(/\s/)[0];
                var v_time = (item.createDate == undefined || item.createDate == null) ? "" : item.createDate;
                var v_name = (item.jobName == undefined || item.jobName == null) ? "" : item.jobName;
                //var v_other_arr = item.jobOther == undefined ? [] : item.jobOther;// 判空处理
                var v_other_arr = (item.jobOther == undefined || item.jobOther == null) ? "" : item.jobOther.split(/,/); // 判空处理
                var v_imgname = (item.jobImgName == undefined || item.jobImgName == null || item.jobImgName == "") ? "f1" : item.jobImgName;
                var imgurl = opt.imgPath + v_imgname + "." + opt.imgType;

                //console.log(index+" "+v_date+" "+v_time);

                //添加cell外层元素
                var cell_id = "cell_" + index;
                var flowCellHtml = cellHtml.replace("CELL_ID", cell_id);
                $(".flowSwrap").append(flowCellHtml);

                //左边时间
                /*var cellLeftHtml = '<p class="t1">'+v_time+'</p><p class="t2">'+v_date+'</p>';
                var $cellLeft = $("#"+cell_id+" .cell-left");
                $cellLeft.append(cellLeftHtml);*/

                //中间节点图片
                var cellCenterHtml = '<img id="img' + index + '" src="' + imgurl + '"/>';
                $("#" + cell_id + " .cell-center").append(cellCenterHtml);


                //右边内容
                var cellRightHtml = index == 0 ? '<p class="t1_start">' + v_name + '</p>' : '<p class="t1">' + v_name + '</p>';
                var $cellRight = $("#" + cell_id + " .cell-right")
                $cellRight.append(cellRightHtml);
                //右边其它内容
                $.each(v_other_arr, function(index_sub, item_sub) {
                    //var cellRightOtherHtml = '<p class="t2">'+item_sub+'</p>';
                    var cellRightOtherHtml = '<p class="t2">' + parsePhoneStr(item_sub) + '</p>';
                    $cellRight.append(cellRightOtherHtml);
                });
                //右边时间内容
                var cellRightTimeHtml = index == 0 ? '<p class="t1_start">' + v_name + '</p>' : '<p class="t1">' + v_name + '</p>';
                $cellRight.append('<p class="t3">' + v_time + '</p>');


                //字体颜色设置
                //index == 0 ? $cellLeft.addClass("fc-orange") : $cellLeft.addClass("fc-grey");
                index == 0 ? $cellRight.addClass("fc-orange") : $cellRight.addClass("fc-grey");

            });

            // 两个以上节点才画线
            if (cellSize > 1) {
                //生成的流程节点画线
                toMakeLine();
            }

        }

        //jobOther其中电话转换<a></a>
        function parsePhoneStr(str) {
            return str == null ? "" : str.replace(/@[0-9]*@/, function(word) {
                var callNum = word.substring(1, word.length - 1);
                return "<a href='tel:" + callNum + "'>" + callNum + "</a>";
            });
        }

        //获取所有左列图片
        function toMakeLine() {
            var $imgs = $(".cell-center img");
            //console.log($imgs.length);
            if ($imgs.length > 1) {
                var fromObj //下面图片对象
                    , toObj; //上面图片对象
                $.each($imgs, function(index, obj) {
                    //console.log(index,obj);
                    var imgId = obj.id;
                    if (index != 0) {
                        fromObj = getImgPosition(imgId);
                        makeLine(".flowSwrap", fromObj, toObj);
                    }

                    toObj = getImgPosition(imgId);
                });
            }

        }

        /**
         * 获取imgId对象位置
         * @param {Object} imgId
         */
        function getImgPosition(imgId) {
            //获取相对(父元素)位置  class="flowSwrap"
            var x = $('#' + imgId).position().left;
            var y = $('#' + imgId).position().top;
            var w = $('#' + imgId).width(); // 第一个图片尚未加载成功时，取值为0，所以需要设置第一个img的height,width
            var h = $('#' + imgId).height();
            return { x: x, y: y, w: w, h: h }
        }

        /**
         * 两个对象间画线
         * 
         * @param {Object} parentDiv
         * @param {Object} formObj  下面对象
         * @param {Object} toObj	上面对象
         */
        function makeLine(parentDiv, formObj, toObj) {
            var lineDiv = document.createElement("div");
            $(lineDiv).addClass("flow-line"); //外面设计宽度、颜色
            var lineWidth = $(".hidden-line").width(), //隐藏线，为动态获取线宽度
                lineHeight = formObj.y - toObj.y - toObj.h,
                lineTop = toObj.y + toObj.h,
                lineLeft = toObj.x + toObj.w / 2 - lineWidth / 2;
            $(lineDiv).css({
                position: "absolute",
                height: lineHeight,
                top: lineTop,
                left: lineLeft
            });
            $(lineDiv).appendTo(parentDiv);
        }

        /*var thisTestDate = {
        	  "data": [
        	    {
        	      "jobName":"订单已竣工"//t1
        	      ,"jobOther":"感谢"//t2 【","英文逗号分隔换行】
        	      ,"createDate":"2018-01-01 22:00"//t3
        	      ,"jobImgName":"job_logistics"//图片名称
        	    }]
        	};
        var thisTestOpt = {
        	"jsonDate":thisTestDate,//json数据
        	"imgPath":"img/",//图片路径
        	"imgType":"png"
        };*/


        //最后返回
        return $.each(this, function() {
            var obj = $(this); //必须

            // 根据数据内容填充html
            _makeContent(obj);

        });
    }
})(jQuery);