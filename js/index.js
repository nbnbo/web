$(document).ready(function(){
	var shouji = "";
	var yzms = "";
	var password ="";
	var chengshi = 0;

	if ($.getUrlParam("cid")) {
		chengshi = $.getUrlParam("cid");
	};

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


	
	// 点击信息以后右边出现
	$(".xx").click(function(){
		if($.cookie("yu_session_id") && $.cookie("yu_session_id").length > 0){
			$(".bd").animate({
		    	left:'-80%'
			})
			$(".quan-1").animate({
			    left:'-80%'
			})
			$(".fc-right").fadeIn(700);
		}else{
			$(".dl").fadeIn(700);
			$(".dls").fadeIn(700);
		}
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

	// 鼠标移动的效果
		$(".by-ul").on("mouseover",".n-li",function(){
		$(this).children().children().next(".sy-neirong").fadeIn(700);
	})

	$(".by-ul").on("mouseleave",".n-li",function(){
		$(this).children().children().next(".sy-neirong").fadeOut(700); 
	})

	// 点击登录页面的注册按钮效果
	$(".dl-zh a").click(function() {
		$(".dls").fadeOut(700);
		$(".zhuce").fadeIn(700);
	});

	// 点击验证码
	$(".yzm").click(function() {
		shouji = $(this).prev(".it-shoujis").val();
		$.ajax({
			url: api + "v1/base/get_verify_code",
			type: 'POST',
			dataType: 'json',
			data: {
				mobile: shouji
			},
			success: function (data){
				if(data.code && data.code != 0){
					alert(data.error.msg);
				}else{
					alert("短信已经发送");
				}
			},
			error: function (xhr){
				httpErrorCallback(xhr);
			}
		})
	})

	// 注册按钮
	$(".zc-an").click(function() {
		shouji = $(this).prev().prev().prev().prev(".yh").children().next(".it-shoujis").val();
		password = $(this).prev(".mm").children().next(".it-mimac").val();
		code = $(this).prev().prev().prev(".mm").children(".yzms").val();
		$.ajax({
			url: api + "wap/v1/users/register",
			type: 'POST',
			dataType: 'json',
			data: {
				mobile: shouji,
				password: password,
				code:code
			},
			success: function (data){
				if(data.code && data.code != 0){
					alert(data.error.msg);
					console.log(data);
				}else{
					$.cookie("yu_session_id",data.user.session_id); 
				}
			},
			error: function (xhr){
				httpErrorCallback(xhr);
			}
		})
	})

	// 登录按钮
	$(".dl-an").click(function(){
		shouji = $("#it-shouji").val();
		password = $("#it-mima").val();
		alert(shouji);
		alert(password);
		$.ajax({
			url: api + "wap/v1/users/login",
			type: 'POST',
			dataType: 'json',
			data: {
				login: shouji,
				password: password,
			},
			success: function (data){
				if(data.code && data.code != 0){
					alert(data.error.msg);
					console.log(data);
				}else{
					$.cookie("yu_session_id",data.user.session_id); 
					$(".dl").fadeOut(700);
					$(".dls").fadeOut(700);
				}
			},
			error: function (xhr){
				httpErrorCallback(xhr);
			}
		})
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