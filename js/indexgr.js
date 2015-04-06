$(document).ready(function(){

	// if ($.getUrlParam("cid")) {
	// 	chengshi = $.getUrlParam("cid");
	// 	alert(chengshi);
	// };

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
		url: api + "wap/v1/activities/"+$.getUrlParam('id'),
		type: 'GET',
		dataType: 'json',
		success: function (data){
			if(data.code && data.code != 0){
				alert(data.error.msg);
			}else{
				console.log(data);
				var imgsTag = "";
				if(data.activity.imgs){
					$.each(data.activity.imgs, function(index, val) {
						 /* iterate through array or object */
						 imgsTag += '<img src="'+val+'"/>';
					});
				}
				$(".by").append('<img class="gr-tou" src="'+data.cook.ads_photo+'"/>'
					+'<div class="gr-zhiliao">'
						+'<img class="geren" src="'+data.cook.avatar+'"/>'
						+'<p class="gr-name"><span>'+data.cook.name+'</span>'+data.cook.cook_rank+'<p>'
						+'<span class="gr-yuyue">'+data.activity.members_count+'人预约</span>'
					+'</div>'
					+'<div class="gr-neirong gr-neirongs">'
						+'<p class="nr-title">'+data.activity.title+'</p>'
						+'<div class="nr-xinxi">'
							+'<p class="xx-title">'+data.activity.activity_desc+'</p>'
							+imgsTag
						+'</div>'
						+'<a class="kankan"><span>展开全部</span><img src="images/deng/jiantou-xia.jpg"/></a>'
						+'<img class="meng" src="images/deng/meng.png"/>'
					+'</div>'
					+'<div class="gr-neirong">'
						+'<div class="gr-qita">'
							+'<img src="images/deng/shijian.jpg"/>'
							+'<span>预约时间：'+data.activity.activity_time+'</span>'
						+'</div>'
						+'<div class="gr-qita">'
							+'<img src="images/deng/didian.jpg"/>'
							+'<span>预约地点：'+data.activity.address+'</span>'
						+'</div>'
						+'<div class="gr-qita">'
							+'<img class="gr-qitas" src="images/deng/qian.jpg"/>'
							+'<span>预约单价：'+data.activity.per_fee+'元/次</span>'
						+'</div>'
					+'</div>'
					+'<div class="gr-neirong">'
						+'<p class="gr-guanyu">关于他</p>'
						+'<img class="gy-img" src="'+data.cook.detail_photo+'"/>'
						+'<p class="gy-jieshao">'+data.cook.editor_note+'</p>'
					+'</div>'
				);
			}
		},
		error: function (xhr){
			httpErrorCallback(xhr);
		}
	})
	// 点击看看以后的效果
	$(".by").on("click",".kankan",function(){
		if($(this).children("span").text() == "展开全部"){
			$(this).children("span").text("收起");
			$(this).children("span").next('img').attr("src","images/deng/jiantou-shang.jpg");
			$(this).children("span").next('img').css("position","relative").css("top","-2px");
			$(this).css("width","45px").css("left","84%");
			$(".by .gr-neirongs").css("padding-bottom","25px");
			$(".by .gr-neirongs").animate({height:'100%'},"slow");
		}else{
			$(this).children("span").text("展开全部");
			$(this).css("width","71px").css("left","77%");
			$(this).children("span").next('img').css("position","relative").css("top","0px");
			$(this).children("span").next('img').attr("src","images/deng/jiantou-xia.jpg");
			$(".by .gr-neirongs").css("padding-bottom","10");
			$(".by .gr-neirongs").animate({height:'134px'},"slow");
		}
	})

	// 点击预约效果
	$(".gr-yy-anniu").click(function() {
		if($.cookie("yu_session_id") && $.cookie("yu_session_id").length > 0){
			$(".dl").fadeIn(700);
			$(".yuyue").fadeIn(700);
			$(".dls").fadeOut(500);
			$(".fc-quxiao").fadeOut(500);
		}else{
			$(".dl").fadeIn(700);
			$(".dls").fadeIn(700);
			$(".yuyue").fadeOut(500);
			$(".fc-quxiao").fadeOut(500);
		}
	})

	// 点击退出按钮
	$('.qx-anniu a').click(function(){
		$(".dl").fadeOut(500);
		$(".fc-quxiao").fadeOut(500);
	});

	$('.xuan').click(function(){
		$.cookie("yu_session_id",'');
		$(".bd").animate({
	    	left:'0%'
		})
		$(".quan-1").animate({
		    left:'0%'
		})
		$(".gr-yy-anniu").animate({
		    left:'80%'
		})
		$(".fc-right").fadeOut(100);
	})

	$(".yy-anniu").click(function(){
		var name = $(".yy-name").val();
		$.ajax({
			url: api + "wap/v1/users/subscribe",
			type: 'POST',
			dataType: 'json',
			data: {
				activity_id: $.getUrlParam('id'),
				session_id: $.cookie("yu_session_id"),
				name:name
			},
			success: function (data){
				console.log(data);
				if(data.code && data.code != 0){
					alert(data.error.msg);
				}else{
					$(".dl").fadeOut(500);
					$(".yuyue").fadeOut(500);
					alert("您的预约我们已经收到了，我们稍后会联系您");
				}
			},
			error: function (xhr){
				httpErrorCallback(xhr);
			}
		})
	});
});