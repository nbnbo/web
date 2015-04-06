var api = "http://api.aiyanyu.cn/";


//公共方法

function httpErrorCallback (xhr) {
	if (xhr.status==400) {
			alert(xhr.responseJSON.error);
	}else if(xhr.status==500){
		alert("系统错误");
	}else if(xhr.status==401){
		alert("您还未登录,快去注册登录");
	}else if(xhr.status==404){
		alert("找不到请求地址");
	}
}


//Jquery扩展
(function($){
	$.getUrlParam = function(name)
{
var reg
 = new RegExp("(^|&)"+
 name +"=([^&]*)(&|$)");
var r
 = window.location.search.substr(1).match(reg);
if (r!=null) return unescape(r[2]); return null;
}
})(jQuery);

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
$(document).ready(function(){
	// 点击登录页面的注册按钮效果
	$(".dl-zh a").click(function() {
		$(".dls").fadeOut(700);
		$(".zhuce").fadeIn(700);
	});

	// 点击信息以后右边出现
	$(".xx").click(function(){
		if($.cookie("yu_session_id") && $.cookie("yu_session_id").length > 0){
			if($(".bd").css("left") == 0 +"px"){
				$(".bd").animate({
		    		left:'-80%'
				})
				$(".quan-1").animate({
				    left:'-80%'
				})
				$(".gr-yy-anniu").animate({
				    left:'0%'
				})
				$(".fc-quxiao").fadeOut(500);
				$(".fc-right").fadeIn(700);
			}else{
				$(".bd").animate({
		    		left:'0%'
				})
				$(".quan-1").animate({
				    left:'0%'
				})
				$(".gr-yy-anniu").animate({
				    left:'80%'
				})
				$(".fc-quxiao").fadeOut(500);
				$(".fc-right").fadeOut(100);
			}
		}else{
			$(".dl").fadeIn(700);
			$(".dls").fadeIn(700);
		}
	})

	// 点击注册按钮的登录
	$(".zc-zh a").click(function(){
		$(".zhuce").fadeOut(500);
		$(".dls").fadeIn(700);
	})

	// 选择完右边以后，消失右边
	$(".fr-li").click(function(){
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

	// 选择左边的城市的时候展示左边浮层
	$(".cs").click(function(){
		if($(".bd").css("left") == 0 + "px"){
			$(".bd").animate({
		    	left:'80%'
			})

			$(".quan-1").animate({
			    left:'80%'
			})

			$(".fc-left").fadeIn(700);
		}else{
			$(".bd").animate({
		    	left:'0%'
			})

			$(".quan-1").animate({
			    left:'0%'
			})

			$(".fc-left").fadeOut(100);
		}
		
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

	// 点击验证码
	$(".yzm").click(function() {
		var shijian = 60;
		if($(this).text() == "发送验证码"){
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
			function a(){
				if(shijian > 0){
					shijian --;
					$(".yzm").text(shijian + "秒");
				}else{
					$(".yzm").text("发送验证码");
				}
			}
			setInterval(a, 1000);
			 
		}else{
			alert("验证码正在发送到您手机，请耐心等待！");
		}
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
					$(".dl").fadeOut(500);
					$(".zhuce").fadeOut(500);
				}
			},
			error: function (xhr){
				httpErrorCallback(xhr);
			}
		})
		alert("您已经注册成功，欢迎使用爱宴遇！");
	})

	// 登录按钮
	$(".dl-an").click(function(){
		shouji = $("#it-shouji").val();
		password = $("#it-mima").val();
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

	// 点击退出那妞
	$('.tc').click(function() {
		$(".yuyue").fadeOut(700);
		$(".dls").fadeOut(700);
		$(".dl").fadeIn(700);
		$(".fc-quxiao").fadeIn(700);
	})


	// 城市的按钮样式和图片
	if ($.getUrlParam("cid")) {
		chengshi = $.getUrlParam("cid");
	}else{
		chengshi = 0;
	}

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
});