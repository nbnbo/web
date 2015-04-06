$(document).ready(function(){
	var shouji = "";
	var yzms = "";
	var password ="";
	var chengshi = 0;

	// 城市的按钮样式和图片
	if ($.getUrlParam("cid")) {
		chengshi = $.getUrlParam("cid");
	};

	if(chengshi == 0){
		$(".cs2").children("a").removeClass("chen");
		$(".cs2").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
		$(".cs3").children("a").removeClass("chen");
		$(".cs3").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
		$(".cs1").children("a").addClass("chen");
		$(".cs1").children("a").children('img').attr("src","images/deng/jian.jpg");
	}else if(chengshi == 1){
		$(".cs1").children("a").removeClass("chen");
		$(".cs1").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
		$(".cs3").children("a").removeClass("chen");
		$(".cs3").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
		$(".cs2").children("a").addClass("chen");
		$(".cs2").children("a").children('img').attr("src","images/deng/jian.jpg");
	}else if(chengshi == 2){
		$(".cs1").children("a").removeClass("chen");
		$(".cs1").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
		$(".cs2").children("a").removeClass("chen");
		$(".cs2").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
		$(".cs3").children("a").addClass("chen");
		$(".cs3").children("a").children('img').attr("src","images/deng/jian.jpg");
	} 

	// 首页最上方广告图片
	$.ajax({
		url: api + 'wap/v1/ads',
		type: 'GET',
		dataType: 'json',
		success: function (data){
			if(data.code && data.code != 0){
				alert(data.error.msg);
			}else{
				if(data.ads){
					$(".tus_gg").attr("src",data.ads.img);
				}else{
					$(".tus_gg").parents(".top-tu").css("display","none");
				}
			}
		},
		error: function (xhr){
			httpErrorCallback(xhr);
		}
	})

	// $(".fc-left li").click(function() {
	// 	chengshi = $(this).children("input").val();
	// });

	// 左边导航加载
	getListByCityCode(chengshi);
	// 鼠标移动的效果
		$(".by-ul").on("mouseover",".n-li",function(){
		$(this).children().children().next(".sy-neirong").fadeIn(700);
	})

	$(".by-ul").on("mouseleave",".n-li",function(){
		$(this).children().children().next(".sy-neirong").fadeOut(700); 
	})

	function getListByCityCode(code){
		$.ajax({
			url: api + 'wap/v1/activities',
			type: 'GET',
			dataType: 'json',
			data:{
				area_id: code
		},
		success: function (data){
			if(data.code && data.code != 0){
				alert(data.error.msg);
			}else{
				$.each($(".by-ul").children(), function(index, val) {
					 /* iterate through array or object */
					 if (index>0) {
					 	val.remove();
					 };
				});
				$.each(data.activity_list, function(index, val) {
					$(".by-ul").append('<li class="n-li">'
							+'<a href="indexgr.html?id='+val.activity_id+'">'
								+'<img class="tus" src="'+val.photo+'"/>'
								+'<div class="sy-neirong">'
									+'<div class="sy-neirongs">'
										+'<img src="'+val.avatar+'"/>'
										+'<p class="sy-name">'+val.name+'</p>'
										+'<p class="sy-jibie">'+val.cook_rank+'</p>'
										+'<p class="sy-jieshao">'+val.editor_note+'</p>'
									+'</div>'
								+'</div>'
							+'</a>'
						+'</li>'
					);
				});
			}
		},
		error: function (xhr){
			httpErrorCallback(xhr);
		}
	})
	}
});