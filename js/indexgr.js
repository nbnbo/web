$(document).ready(function(){

	if ($.getUrlParam("cid")) {
		chengshi = $.getUrlParam("cid");
	};

	$.ajax({
			url: api + "wap/v1/activities/"+$.getUrlParam('id'),
			type: 'GET',
			dataType: 'json',
			success: function (data){
				if(data.code && data.code != 0){
					alert(data.error.msg);
					
				}else{
					console.log(data);
					alert(data.cook.ads_photo);
					alert(data.activity.title);
				}
			},
			error: function (xhr){
				httpErrorCallback(xhr);
			}
		})


	// 点击信息以后右边出现
	$(".xx").click(function(){
		$(".bd").animate({
	    	left:'-80%'
		})
		$(".quan-1").animate({
		    left:'-80%'
		})
		$(".fc-right").fadeIn(700);
	})

	// 选择完右边以后，消失右边
	$(".fr-li").click(function(){
		$(".bd").animate({
		    left:'0%'
		})

		$(".quan-1").animate({
		    left:'0%'
		})

		$(".fc-right").fadeOut(100);
	})

	// 选择左边的城市的时候展示左边浮层
	$(".cs").click(function(){
		$(".bd").animate({
		    left:'80%'
		})

		$(".quan-1").animate({
		    left:'80%'
		})
		$(".fc-left").fadeIn(700);
	})

	// 选择城市后隐藏浮层
	$(".fc-left li").click(function(){
		$(".fc-left li a").removeClass("chen");
		$(".jian").attr('src','images/deng/jian-bai.jpg');
		$(this).children("a").addClass("chen");
		$(this).children("a").children(".jian").attr('src','images/deng/jian.jpg');
		$(".bd").animate({
		    left:'0%'
		})

		$(".quan-1").animate({
		    left:'0%'
		})

		$(".fc-left").fadeOut(100);
	})

	// 隐藏浮层
	$(".dl-no").click(function() {
		$(this).parent().parent().fadeOut(700); 
	});

	// 点击看看以后的效果
	$(".kankan").click(function() {
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
		$(".dl").fadeIn(700);
		$(".yuyue").fadeIn(700);
	})
});