$(document).ready(function(){

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