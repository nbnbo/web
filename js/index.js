$(document).ready(function(){
	jQuery.cookie = function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	}

	var api = "http://api.yc.peij.cn/";
	var shouji = "";
	var yzms = "";
	var password ="";
	var chengshi = 0;

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

	

	// 左边导航加载
	$.ajax({
		url: api + 'wap/v1/activities',
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

	// 点击男女效果
	$(".xz-on").click(function() {
		$(".xz-on").css("display","inline");
		$(".xz-ok").css("display","none");
		$(this).css("display","none");
		$(this).next().css("display","inline");
	});

	// 点击预约效果
	$(".gr-yy-anniu").click(function() {
		$(".dl").fadeIn(700);
		$(".yuyue").fadeIn(700);
	})

	// 鼠标移动的效果
	$(".n-li").mouseover(function() {
		$(this).children().children().next(".sy-neirong").fadeIn(700);
	})

	$(".n-li").mouseleave(function(){
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
	
	function httpErrorCallback (xhr) {
		if (xhr.status==400) {
				alert(xhr.responseJSON.error);
		}else if(xhr.status==500){
			alert("系统错误");
		}else if(xhr.status==401){
			alert("您还未登录");
		}else if(xhr.status==404){
			alert("找不到请求地址");
		}
	}

});