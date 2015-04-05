var api = "http://api.yc.peij.cn/";


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
$.getUrlParam
 = function(name)
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