
//顶部二级地点菜单！
	var $arrive = $('.top_area');	//地点
	var $arrive_one = $('.area_a');
	var $arriveList = $('.arrive_list');//地点列表
	var $curent_area = $('#curent_area');//目的地
	var $places = $('.arrive_list a');//所有地点
	$arrive.hover(function(){
		
		$arrive_one.addClass('hover');
		$arriveList.css('display','block');
		
	},function(){
		$arriveList.css('display','none');
		$arrive_one.removeClass('hover');
	});
	$places.on('click',function(){
		$curent_area.html($(this).html());
		$arriveList.css('display','none');
		$arrive_one.removeClass('hover');
	});
	

//顶部二级菜单栏
	var $menu_btn = $('.top_nav li:has(.menu_btn)');
	$menu_btn.hover(function(){
		$(this).find('ul').css('display','block');
		$(this).find('.menu_btn').addClass('hover');
	},function(){
		$(this).find('ul').css('display','none');
		$(this).find('.menu_btn').removeClass('hover');
	});
	
	

//搜索框代码
//搜索框获得焦点
var $text = $('.text');
var $select = $('.select');
$text.on('focus',function(){
	if($(this).prop('value')=='十万童书 每满100减50'){
		$(this).prop('value','');
	}
});
$text.on('blur',function(){
	if($(this).prop('value')==''){
		$(this).prop('value','十万童书 每满100减50');
	}
});

//搜索内容显示
$text.on('input',function(){
	var $con = $(this).val();
	if(!$con){
		$('#sug_key').css('display','none');
	}else{
		$('#sug_key').css('display','block');
	}
	var url = 'https://suggest.taobao.com/sug?code=utf-8&q='+$con+'&_ksTS=1503478755097_902&callback=tb';
	//tb回调函数封装
	loadScript(url);//调用封装函数	
});

//搜索框旁-全部分类显示
$select.hover(function(){
	$('.select_pop',this).css({
		'height':'286px',
		'padding':'1px',
		'border-width':'1px'
	});
},function(){
	$('.select_pop',this).css({
		'height':'0',
		'padding':'0',
		'border-width':'0'
	});
});

//添加cookie的函数
		function addCookie(key,value,day){
			var date=new Date();//创建日期对象
			date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
			document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
		}
//得到cookie
		function getCookie(key){
			var str=decodeURI(document.cookie);
			var arr=str.split('; ');
			for(var i=0;i<arr.length;i++){
				var arr1=arr[i].split('=');
 				if(arr1[0]==key){
					return arr1[1];
				}
			}
		}
//删除cookie
		
		function delCookie(key,value){
			addCookie(key,value,-1);//添加的函数,将时间设置为过去时间
		}		







