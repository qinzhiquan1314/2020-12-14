

/***
 * pc与手机开始都使用隐藏div输入 兼容ie8与手机
 * 
 * 测试阶段：小米手机 输入密码keyCode=229,无法输入正确的数字
 * 修改手机端策略：隐藏input框 type="text"  (type="number" 输入限制还是有问题)
 * 
 */


/******定义常量*******/
var myNum = 0;//记录实际输入个数
var myLen = 6;//目标输入个数

/******************6位验证码输入js区域******************/
//显示div -> 隐藏输入框获取焦点(div或input)
$("#dv").click(function(){
 	$(".pwd-input").focus();
 	
});

/*******PC	隐藏div	添加键盘事件keypress keydown keyup*****/
$("#pwd-input").keydown(function(event){ 
	noNumbers(event);
});

/*******手机	隐藏input	 添加input事件*********/
var $input = $(".fake-box p"); 
var oldPwd = "";//记录上一次输入框的所有数字

$("#pwd-input-phone").on("input", function() { 
	//真正的输入框
    var pwd = $(this).val().trim();
    //输入数字校验
    if (/^\d+$/.test(pwd)) {
    	oldPwd = pwd;
    } else {
    	//输入不是数字则还原到上一次的记录
    	$(this).val(oldPwd);
    	//当删除时，删到第一个时特殊处理
    	if(pwd == "") { 
    		$(".fake-box p:first-child").html("");  
    		$(this).val("");
    		oldPwd = "";
    	}
    	return;
    }
    //限制长度  (type="number" maxlength="6"失效)
    if(pwd.length > myLen) {
    	pwd = pwd.slice(0,myLen);
    	$(this).val(pwd);
    }
    
    //输入时赋值
    for (var i = 0, len = pwd.length; i < len; i++) {  
        $input.eq("" + i + "").html(pwd[i]);  
    }
    //删除时清空
    $input.each(function() {  
        var index = $(this).index();  
        if (index >= len) { 
            $(this).html("");  
        }  
    });  
    //等于6时执行跳转
    if (len == 6) {  
        //执行其他操作 
        var str = getInputStr();
     	//console.log("6位数字："+str);
     	checkData(str);// 调用业务方法
    }  
});


/************公共方法*************/

//PC 数字输入键盘事件
function noNumbers(e){
    var keynum;//键盘值（数字48到57）
    var keychar="";//键盘值对应的字符（数字0到9）
    var ev = e || window.event;  
    keynum = ev.keyCode || ev.which;//某些手机中文输入法keyCode=229
    keychar = String.fromCharCode(keynum);
    //alert(33+":"+keynum+":"+keychar);
    //键盘值BackSpace
    if(keynum == 8){
    	//window.history.forward(1);//屏蔽浏览器自带的后退键  
        /*if(window.event.srcElement.tagName.toUpperCase()!="INPUT" && window.event.srcElement.tagName.toUpperCase()!="TEXTAREA" && window.event.srcElement.tagName.toUpperCase()!="TEXT"){    
		    stopDefault(ev);
	    } */
	   
	    //阻止默认行为
	    stopDefault(ev);
	    
	    $(".pwd-input").html("");
	    //重新定义该键的作用
	    if(myNum > myLen) {myNum = myLen;}
        $(".dvp"+myNum).html("");
        if(myNum > 0){
        	myNum--;
        }
        
    	return;
    	 
    }
    //console.log(keynum+':'+keychar);
    //只存数字
    if(keynum<47 || keynum>58){
    	return;
    }else{
    	if(myNum > myLen) return;
    	
    	myNum++;
      	if(myNum <= myLen){
      		//console.log("当前输入：" + keychar);
	   	    $(".dvp"+myNum).html(keychar);
	   	    if (myNum == myLen) {
	   	     	var str = getInputStr();
	   	     	//console.log("6位数字："+str);
	   	     	checkData(str);// 调用业务方法
	   	    }
    	} 
    
    }
        
}

//获取输入的内容
function getInputStr() {
	var $input = $("#dv p");
	var pwd = "";
	$input.each(function(index,item) {  
        var value = item.innerText;
        pwd += value;
    });  
    return pwd;
}

//获取输入的内容
function cleanData() {
	var $input = $("#dv p");
	$input.each(function(index,item) {  
        item.innerText = "";
    });  
    myNum = 0;
    oldPwd = "";
    $("#pwd-input").html('');//PC
    $("#pwd-input-phone").val('');//手机
}

//阻止元素发生默认的行为
function stopDefault(ev) { 
	ev.keyCode=0;//取消等于keyCode值的键的作用
	
    if (ev.preventDefault) {  
        //preventDefault()方法阻止元素发生默认的行为  
        ev.preventDefault();  
    }  
    if (ev.returnValue) {  
        //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为  
        ev.returnValue = false;  
    }  
    return false;  
} 


/***
 * 6位验证码输入html区域
 * <div id="pwd-input" class="pwd-input" tabindex="0" contenteditable="true"></div>
   <!--<input  id="pwd-input-phone" class="pwd-input" type="text"/>-->
	<div class="pwd-box">
		<div id="dv" class="fake-box">
			<p class="dvp1"></p>
			<p class="dvp2"></p>
			<p class="dvp3"></p>
			<p class="dvp4"></p>
			<p class="dvp5"></p>
			<p class="dvp6"></p>
		</div>
	</div>
 * 
 */
		 	