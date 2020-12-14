var userParam = window.location.href.substr(window.location.href.indexOf("?") + 1);

function getOutUrl(uri, query) {
    var str = "userParam=" + userParam;
    if (query.indexOf("?") > 0) {
        str = '&' + str;
    } else {
        str = '?' + str;
    }
    var url = uri + query + str;
    return url;
}

function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

function orderStyle(orderStyle) {
    var str = "userParam=" + userParam;
    var url = getRootPath_web() + '/web-monitor/page/echartResult?' + str + '&orderStyle=' + orderStyle;
    window.open(url, '_blank')
}

function success(index) {
    $.ajax({
        method: "post",
        url: getOutUrl(getRootPath_web(), '/product/getReportMenuNew'),
        // url: 'http://10.124.147.88/queryCenter/product/getReportMenuNew',
        data: {
            type: 'mobileNew',
            userParam: userParam
        },

        success: function(res) {
            var data = res;

            //获取数据后进行页面渲染
            var el_box1 = $("#box1");
            var el_box2 = $("#box2");
            var el_box3 = $("#box3");
            var el_box4 = $("#box4");

            //渲染导航菜单
            var menu = $("#menu");
            menu.empty();
            // data.rows.forEach((item, index) => {
            //     var txt = '<div class="size1" onclick="success(' + index + ')">' + item.menuName + '</div>';
            //     var el = $(txt);
            //     menu.append(el);
            // });
            data.rows.forEach(function(item, index) {
                var txt = '<div class="size1" onclick="success(' + index + ')">' + item.menuName + '</div>';
                var el = $(txt);
                menu.append(el);
            });
            $(".size1").eq(index).addClass("active").siblings().removeClass("active").addClass("passive");

            //渲染之前清空之前的数据
            el_box1.empty();
            el_box2.empty();
            el_box3.empty();
            el_box4.empty();

            //获取数据后进行页面渲染
            //-----宽容
            // data.rows[index].subMenu[0].subMenu.forEach(item => {
            //         var url = getOutUrl(getRootPath_web(), item.menuUrl);
            //         var txt = '<div class="qinni"><a href="' + url + '" target="_Blank" class="ahref">' + item.menuName + '</a></div>';
            //         var el = $(txt);
            //         el_box1.append(el);
            //     })
            //     //-----移网
            // data.rows[index].subMenu[1].subMenu.forEach(item => {
            //         var url = getOutUrl(getRootPath_web(), item.menuUrl);
            //         var txt = '<div class="qinni"><a href="' + url + '" target="_Blank" class="ahref">' + item.menuName + '</a></div>';
            //         var el = $(txt);
            //         el_box2.append(el);
            //     })
            //     //-----政企
            // data.rows[index].subMenu[2].subMenu.forEach(item => {
            //         var url = getOutUrl(getRootPath_web(), item.menuUrl);
            //         var txt = '<div class="qinni"><a href="' + url + '" target="_Blank" class="ahref">' + item.menuName + '</a></div>';
            //         var el = $(txt);
            //         el_box3.append(el);
            //     })
            //     //-----修障
            // data.rows[index].subMenu[3].subMenu.forEach(item => {
            //     var url = getOutUrl(getRootPath_web(), item.menuUrl);
            //     var txt = '<div class="qinni"><a href="' + url + '" target="_Blank" class="ahref">' + item.menuName + '</a></div>';
            //     var el = $(txt);
            //     el_box4.append(el);
            // })

            data.rows[index].subMenu[0].subMenu.forEach(function(item) {
                var url = getOutUrl(getRootPath_web(), item.menuUrl);
                var txt = '<div class="qinni"><a href="' + url + '" target="_blank" class="ahref">' + item.menuName + '</a></div>';
                var el = $(txt);
                el_box1.append(el);
            });
            //-----移网
            data.rows[index].subMenu[1].subMenu.forEach(function(item) {
                var url = getOutUrl(getRootPath_web(), item.menuUrl);
                var txt = '<div class="qinni"><a href="' + url + '" target="_blank" class="ahref">' + item.menuName + '</a></div>';
                var el = $(txt);
                el_box2.append(el);
            });
            //-----政企
            data.rows[index].subMenu[2].subMenu.forEach(function(item) {
                var url = getOutUrl(getRootPath_web(), item.menuUrl);
                var txt = '<div class="qinni"><a href="' + url + '" target="_blank" class="ahref">' + item.menuName + '</a></div>';
                var el = $(txt);
                el_box3.append(el);
            });
            //-----修障
            data.rows[index].subMenu[3].subMenu.forEach(function(item) {
                var url = getOutUrl(getRootPath_web(), item.menuUrl);
                var txt = '<div class="qinni"><a href="' + url + '" target="_blank" class="ahref">' + item.menuName + '</a></div>';
                var el = $(txt);
                el_box4.append(el);
            });
        }
    })
}

$(document).ready(function() {
    success(0);
});