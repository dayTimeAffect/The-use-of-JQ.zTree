define(["jquery", "dateutil", "window"], function($, dateutil, wJsObject){
	return {
        //简化ajax,可以直接用jqury.ajax
    	ajax:function(){
    		var opts={
    		      url:typeof(arguments[0]) == 'string'? arguments[0]:'',
    		      async:typeof(arguments[1]) == 'boolean'? arguments[1]:true,
    		      data:typeof(arguments[2]) == 'object'? arguments[2]:{},
    		      succcallback:typeof(arguments[3]) == 'function'? arguments[3]:function(){}
    		};
    		$.ajax({
    			 url:opts.url,
    			 type:'post',
    			 async:opts.async,
    			 cache:false,
    			 timeout:10000,
    			 dataType:'text',
    			 data:opts.data,
    			 success:function(rst){if(rst) opts.succcallback.call(this, (function(){try{ return  Safety.exec("("+rst+")") }catch(e){alert('请求返回数据解析异常:'+e.message); return null } })()); else opts.succcallback.call(this,null)},
    			 error:function(){alert("请求繁忙,请稍后再试！");}
    			});
    	},
    	//‘同步’请求并返回数据
    	po:function(url,data){
    		 var result;
  		     this.ajax(url,false,data,function(rst){
    			 result=rst;
    		 });
    		 return result;
    	 },
    	 //表单数据序列化json
    	serializeJson:function(fmObj){
			var serializeObj = {};
			var array = $(fmObj).serializeArray();
			$(array).each(function(){
				if(serializeObj[this.name]){
					if($.isArray(serializeObj[this.name])){
						serializeObj[this.name].push(this.value);
					}else{
						serializeObj[this.name] = [serializeObj[this.name],this.value];
					}
				}else{
					serializeObj[this.name] = this.value;
				}
			});
			return serializeObj;
		},
		//日期格式化
		dateFormat:function(dateStr,fmt){
		    return  dateutil.format(new Date(dateStr), fmt);
		},
        trim:function(str){//去除首尾空格
        	return ''.replace.call(str,/(^\s*)|(\s*$)/g,'');
        },
        isBlank:function(str){
           return $.trim(str).length == 0; 
        },
        //电子邮箱验证
//        verfiy_email:function(value){
//        	var parren = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//        	return parren.test($.trim(value));
//        },
        //电话验证
//        verfiy_phone:function(value){
//        	var parren = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
//        	return parren.test($.trim(value));
//        },
        /*//特殊字符校验
        special:function(value){
        	var pattern = new RegExp("[`~#$^&*=+|{}\&+%''\\[\\]<>/?~#￥……&* ——|{}【】‘”“'？]");
        	if($.trim(value).length<1)return true;
        	for(var i = 0;i<value.length;i++){
        		if(pattern.test(value.substr(i,1))) return true;
        	}
        	return false;
        },
        //敏感字符校验
        sensitivity:function(value){
        	var pattern =/null|_|-|document|window|where|and|exec|insert|drop|select|delete|update|count|chr|mid|master|truncate|char|declare|or|javascript|script|jscript|onfocus|alert|location|onclick|eval/g;
    		return pattern.test(''.toLowerCase.call($.trim(value)));
        },*/
//        Reg_elx:function(el,msg){
//        	return $(el).val('').focus().next().text(msg+',请重新输入!!');
//        },
		//根据form的Id，和 表单元素的name 返回 表单对象
		getInput:function(fm ,name){
            var input  = $('#'+fm).find(":input[name ='"+name+"']");
            return input.length > 0 ? input:null;  
        },
       //信息提示
       alert:function(message,result){
    	   return !result?error(message, "提示"):success(message, "提示");
       },
       //加载 数据 到表单元素
	   loadToForm:function(fm,data,fn){
		   var that = this;
		   $.each(data,function(name,value){
				 var  input  = that.getInput(fm,name);
				 if(input){
					 if(input[0].type == 'checkbox'){
						 $(input).each(function(){
							 value.indexOf(this.value+"") !==-1 && $(this).prop("checked",true); 
						 });
					 }else if(['text','textarea','hidden'].indexOf(input[0].type) !== -1 ){
						 input.val(value);
					 }else if(input[0].type == 'select-one'){
						 $('#'+fm).find('input[type=radio][value=\''+value+'\']').click()
					 }
				 }
			})
            typeof(fn) === 'function'&&fn();
		}
	}
});