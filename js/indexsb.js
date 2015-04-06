$(document).ready(function(){

	// var chengshi = 0;

	// 城市的按钮样式和图片
	// if ($.getUrlParam("cid")) {
	// 	chengshi = $.getUrlParam("cid");
	// };

	// if(chengshi == 0){
	// 	$(".cs2").children("a").removeClass("chen");
	// 	$(".cs2").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
	// 	$(".cs3").children("a").removeClass("chen");
	// 	$(".cs3").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
	// 	$(".cs1").children("a").addClass("chen");
	// 	$(".cs1").children("a").children('img').attr("src","images/deng/jian.jpg");
	// }else if(chengshi == 1){
	// 	$(".cs1").children("a").removeClass("chen");
	// 	$(".cs1").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
	// 	$(".cs3").children("a").removeClass("chen");
	// 	$(".cs3").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
	// 	$(".cs2").children("a").addClass("chen");
	// 	$(".cs2").children("a").children('img').attr("src","images/deng/jian.jpg");
	// }else if(chengshi == 2){
	// 	$(".cs1").children("a").removeClass("chen");
	// 	$(".cs1").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
	// 	$(".cs2").children("a").removeClass("chen");
	// 	$(".cs2").children("a").children('img').attr("src","images/deng/jian-bai.jpg");
	// 	$(".cs3").children("a").addClass("chen");
	// 	$(".cs3").children("a").children('img').attr("src","images/deng/jian.jpg");
	// } 	

	$.ajax({
		url: api + "wap/v1/users/activity",
		type: 'POST',
		dataType: 'json',
		data:{
			session_id: $.cookie('yu_session_id')
		},
		success: function (data){
			if(data.code && data.code != 0){
				alert(data.error.msg);
			}else{
				console.log(data);
				var imgsTag = "";
				$.each(data.activity_list, function(index, val) {
					 /* iterate through array or object */
					 imgsTag += '<li class="n-li">'
					 	+'<a href="indexgr.html?id='+val.activity_id+'">'
							+'<img class="shibai-img" src="'+val.photo+'"/>'
							+'<div class="shibai-right">'
								+'<p class="sb-shijian">时间:'+val.activity_time+'</p>'
								+'<p class="sb-didian">地点:'+val.address+'</p>'
								+'<p class="sb-jiage">单价:'+val.per_fee+'/次<span>'+val.subscribe_info+'</span></p>'
							+'</div>'
						+'</a>'
					+'</li>';
				});

				if(imgsTag.length == 0){
					imgsTag += '<p class="jy-meiyou">您还没有预约的家宴</p>'
				}

				$(".by-ul").append(
					imgsTag
				);
			}
		},
		error: function (xhr){
			httpErrorCallback(xhr);
		}
	})

	$('.tc').click(function() {
		$(".yuyue").fadeOut(700);
		$(".dls").fadeOut(700);
		$(".dl").fadeIn(700);
		$(".fc-quxiao").fadeIn(700);
	});
});