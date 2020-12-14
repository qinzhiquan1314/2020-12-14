//改变背景颜色
$(".totalEval li").click(function(){
	var id = $(this).attr("id");
	$("#extLevel4").val(id);
	$("#"+id).addClass("li-on").removeClass("li-off");
	$("#"+id).siblings().addClass("li-off").removeClass("li-on");//brother
	
	if(id == 3){
		$("#unsatisfy").removeClass("disBlock").addClass("disNone");
		$(".proposalBox").removeClass("disBlock").addClass("disNone");
	}else if(id == 2){
		$("#unsatisfy").addClass("disBlock").removeClass("disNone");
		$(".proposalBox").addClass("disBlock").removeClass("disNone");
	}else{
		$("#unsatisfy").addClass("disBlock").removeClass("disNone");
		$(".proposalBox").addClass("disBlock").removeClass("disNone");
	}
});


//展开收起
var servicePer = document.getElementsByClassName("servicePer");
for(var i = 0; i < servicePer.length; i++) {
	servicePer[i].onclick = function() {
		$(this).find("span").toggleClass("main");
		$(this).find("ul").toggleClass("Spanshow");
	}
	
}

$('.servicePerSingle').on('click',function(){
	$(this).toggleClass("bcOrange");
	if($(this).hasClass('bcOrange')){
		$(this).find('input').attr('checked','checked')
		event.preventDefault();
	}else{
		$(this).find('input').removeAttr('checked','checked')
		event.preventDefault();
	}
})

//多选按钮样式添加
$('.serviceList').on('click','.labcheckBox',function(event){
	event.stopPropagation();
	if(!$(this).hasClass('checkBox')){
		$(this).addClass('checkBox')
		$(this).find('input').attr('checked','checked')
		event.preventDefault();
	}else{
		$(this).removeClass('checkBox')
		$(this).find('input').removeAttr('checked','checked')
		event.preventDefault();
	}
})


















