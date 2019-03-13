/**
 * 扩展jQuery
 * Created by aires on 2016/5/23.
 */
(function(ctx, factory){

})(window, function($){
	document.onkeydown = function(e){
		e = e || window.event;
		switch(e.keyCode){
			case 13:
			if(e.target && $(e.target).closest('textarea')<1) return false; //增加文本域支持换行功能
		}
	}
  //登录超时检测
    var ajaxUrlCache = {}, formatUrl = function(opts){
    	var url = opts.url, data = opts.data;
    	if(data){
    		url += (url.indexOf("?") == -1 ? "?" : "&") + data;
    	}
    	return url;
    };
	$(document).on("eachAjaxStop", function(event, jqXHR, opts){
		delete ajaxUrlCache[formatUrl(opts)];
		if(!window.hasLoggedOut){
			var logout = jqXHR.getResponseHeader("logout"), url = jqXHR.getResponseHeader("target");
			if(logout){
				var msg = jqXHR.getResponseHeader("msg");
				window.hasLoggedOut = true;
				if(msg != "logout"){//主动调用退出功能标识，兼容退出功能
					function exit(){
						if( (!window.Shell || !Shell.logout()) && url)Safety.redirect(url);//会话过期的时候直接注销到登录页面;
					}
					msg == "false" ? exit() : alert(msg || "会话已注销，点击“关闭”按钮退出！", exit)
					return false;
				}
			}
			if(url)Safety.redirect(url);//当ajax请求且需要整体页面跳转时使用
		}
	}).on("eachAjaxStart", function(event, jqXHR, opts){
		var url = formatUrl(opts);
		if(ajaxUrlCache[url]){
			//tips("系统正在努力加载中，请稍等片刻，不要频繁操作！");
			return false;
		}
		if(window.hasLoggedOut){
			tips("当前会话已失效，请重新登录后再试！");
			return false;
		}
		ajaxUrlCache[url] = !0;
	});
	//禁用缓存
	$.ajaxSetup({cache: false});
});