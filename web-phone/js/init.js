
/**********手机端 页面初始前加载事件**********/
//页面加载前执行
autoAdapt();   //2018-04 页面增加广告轮播，window.onresize增加了其它事件，顾下面统一处理

/*
 * 自适应设置
 * html里设置换算单位   font-size=20px;
 * clientWidth*20/720 表示按720px宽度设计图开发页面，然后把css中px  换算成rem 实现响应式   
 */
function autoAdapt(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth*20/720+'px';
	/*这段代码放入了web-util.js里，统一window resize时执行事件
	 window.onresize=function(){
	  document.documentElement.style.fontSize=document.documentElement.clientWidth*20/720+'px';       
	};*/
}
