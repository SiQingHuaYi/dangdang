


function changeDis(obj1,obj2){//登录界面切换
	obj1.css('display','block');
	obj2.css('display','none');
}

function toDou(n){	//倒计时加0函数封装
	return n<10?"0"+n:""+n;	
}

function loadScript(url){		//动态加载JS文件
var script = document.createElement("script");
script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}
function tb(data){//搜索链接回调函数
var oUl = document.getElementById('keyword');
var arr = data.result;
var str = '';
arr.forEach(function(v){
	str+='<li><a href="https://s.taobao.com/search?initiative_id=tbindexz_20170823&ie=utf8&spm=a21bo.50862.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q='+v[0]+'">'+v[0]+'</a></li>';
	});
	oUl.innerHTML = str;
}



















