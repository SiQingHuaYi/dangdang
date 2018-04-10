;(function($){
	
	
	//获取轮播图数据
	$.ajax({
		type:"get",
		url:"php/maxlunbo.php",
		async:true,
		dataType:'json',
		success:function(d){
			var arr=d;
			var $html='<li>';
			for(var i=0; i<arr.length;i++){
				$html+=`<img src="${arr[i].img}" />`;
			}
			$html+='</li>';
			$('.lunbo_ul').html($html);
			//调用轮播图函数
			lunbo();
		},
	});
	//封装轮播图函数代码
	function lunbo(){
		var $lunbo = $('.lunbo');
		var $dots = $('.lunbo_top_box ol li');//小圆点
		var $imgs = $('.lunbo_top_box ul li img');//图片
		var $left = $('.left');
		var $right = $('.right');//左右按钮
		var Astop = false;//开关
		var $num = 0;//图片索引
		var timer = null;
		$dots.mouseover(function(){//小圆点与图片连接
			$(this).addClass('hover').siblings('ol li').removeClass('hover');
			if($(this).index()!=$num){
				small();
				$imgs.eq($num).fadeOut(300);
				$num = $(this).index();
				$imgs.eq($num).fadeIn(300);
			}
		});
		$lunbo.hover(function(){//鼠标经过，停止自动轮播
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				tab(false);
			},3000);
		});
		$left.click(function(){
			tab(true);
		});
		$right.click(function(){
			tab(false);
		});
		timer = setInterval(function(){
			tab(false);
		},3000);
		function tab(n){
			small();
			$imgs.eq($num).fadeOut(300);
			n?$num--:$num++;
			if($num<0){
				$num = 7;
			}
			if($num>7){
				$num = 0;
			}
			$dots.eq($num).addClass('hover').siblings('ol li').removeClass('hover');
			$imgs.eq($num).fadeIn(300);
		}
		function small(){//下面轮播图和上面联动
			var small = $('.lunbo_bottom ul');
			if(Astop){
				small.eq(0).stop().fadeOut(300);
				small.eq(1).stop().fadeIn(300);
				Astop = false;
			}else{
				small.eq(0).stop().fadeIn(300);
				small.eq(1).stop().fadeOut(300);
				Astop = true;
			}
		}
	}
	
	
	
	//A-左边选项卡切换
   $('.new_menu>li').on('mouseover',function(){
		$(this).addClass('on').siblings('.new_menu>li').removeClass('on');
		$('.new_showList').css('display','block');
		$('.new_showList>li').eq($(this).index('.new_menu>li')).css('display','block').siblings('.new_showList>li').css('display','none');
	});
	$('.new_type1').on('mouseout',function(){
		$('.new_menu>li').removeClass('on');
		$('.new_showList>li').css('display','none');
		$('.new_showList').css('display','none');
	});
	
	//A-右边状态栏切换
    var $tab=$('.tab_gg li');
    var $tab_content=$('.tab_content .tab_content_text');
    $tab.on('mouseover',function(){
    	$(this).addClass('on').siblings().removeClass('on');
    	$tab_content.eq($(this).index()).css('display','block').siblings().css('display','none');
    })
	
	//图书区、服装区上面切换
	    tab_DE('#tab_box_ts');
		tab_DE('#tab_box_fz');//调用函数
		function tab_DE(id){
			var $tabs = $(id+' .con .tabs');//切换内容
			var $boxs = $(id+' .head li');//切换选项
			$boxs.on('mouseover',function(){
				$(this).addClass('on').siblings().removeClass('on');
				$($tabs).eq($(this).index()).css('display','block').siblings().css('display','none');
			});
		};
		
		
		var $bang_headers = $('.bang_header li');
		var $ts = $('.tab');
		$bang_headers.on('mouseover',function(){
			$(this).addClass('on').siblings().removeClass('on');
			$ts.eq($(this).index()).css('display','block').siblings().css('display','none');
		});
		bang('#bang1');
		bang('#bang2');//调用切换函数
		function bang(id){
			$(id+' .bar').on('mouseover',function(){
				$(this).css('display','none').siblings($(id+' .bar')).css('display','block');
				$(id+' .item').eq($(this).index(id+' .bar')).css('display','block').siblings(id+' .item').css('display','none');
			});
		}
	
	
	
	
	//商品秒杀栏拼接
    $.ajax({
		type:"get",
		url:"php/miaosha.php",
		async:true,
		dataType:'json',
		success:function(d){
			var arr=d;
			var $html='<ul>';
			for(var i=0; i<arr.length;i++){
				$html+=`<li>
					<a href="details.html" class="pic"><img src="${arr[i].url}"/></a>
					
					<p><a href="details.html">${arr[i].title}</a></p>
					<div class="price">秒杀价：¥<span>${arr[i].price}</span><i>${arr[i].zhekou}</i></div>
					
				</li>`;
			}
			$html+='</ul>';
			$('.miaosha_con').html($html);
		},
		error:function(d){
			console.log('你错了')
		}
	});
    
    //秒杀时间代码
	var $changeTime = $('#miaoshaTime span');
	var $changTime = $('#changeTime li');
	var starttime = new Date();
	var h = starttime.getHours();//获取当前时间的小时值
	if(h>=0&&h<10){
		$changTime.find('a').removeClass('now');
		$changTime.eq(0).find('a').addClass('now');
	}else if(h>=10&&h<12){
		$changTime.find('a').removeClass('now');
		$changTime.eq(1).find('a').addClass('now');
	}else if(h>=12&&h<17){
		$changTime.find('a').removeClass('now');
		$changTime.eq(2).find('a').addClass('now');
	}else if(h>=17&&h<22){
		$changTime.find('a').removeClass('now');
		$changTime.eq(3).find('a').addClass('now');
	}
	starttime.setHours(starttime.getHours()+2);//倒计时间
	setInterval(function(){//定时器，每一秒减一
    	var nowtime = new Date();
    	var time = starttime - nowtime;
    	var hour = parseInt(time / 1000 / 60 / 60 % 24);
    	var minute = parseInt(time / 1000 / 60 % 60);
    	var seconds = parseInt(time / 1000 % 60);
    	$changeTime.eq(0).html(toDou(hour));
    	$changeTime.eq(1).html(toDou(minute));
    	$changeTime.eq(2).html(toDou(seconds));
	}, 1000);	
    

    
    //商品秒杀右边切换栏
	var $B_btns = $('.week_head li');
	var $B_shows = $('.week_con>li');
	$B_btns.on('mousemove',function(){
		$(this).addClass('on').siblings().removeClass('on');
		$B_shows.eq($(this).index()).css('display','block').siblings().css('display','none');
	});
		
	//悬浮搜索栏出现及表单输入
	var $fixText = $('#topText');
	var $fixTop=$('#fixTop');
	$fixText.on('focus',function(){
		if($(this).prop('value')=='十万童书 每满100减50'){
			$(this).prop('value','');
		}
	});
	$fixText.on('blur',function(){
		if($(this).prop('value')==''){
			$(this).prop('value','十万童书 每满100减50');
		}
	});
	
    //电梯效果
	
	var $dianti = $('#siderleft');
	var $d_btns = $('li',$dianti);
	var $d_list = $('.fix_screen_list');
	var $fixTop = $('#fixTop');
	$d_btns.hover(function(){
		$(this).addClass('on').css('width','auto').siblings().removeClass('on').css('width','38px');
		$d_list.css('width','auto');
	},function(){
		$d_btns.removeClass('on').css('width','38px');
	});
	$(window).on('scroll',function(){
		$(this).scrollTop()>800?$fixTop.css('display','block'):$fixTop.css('display','none');
		$(this).scrollTop()>1900?$('.fix_box').removeClass('broaden').addClass('reduce'):$('.fix_box').removeClass('reduce').addClass('broaden');
		$('.dianti').each(function(index,value){
			if($(window).scrollTop()<$(this).offset().top+200){
				$d_btns.eq($(this).index('.dianti')).addClass('on').siblings().removeClass('on');
				return false;
			}
		});
	});
	$d_btns.on('click',function(){
    	$('html,body').animate({scrollTop:$('.dianti').eq($(this).index()).offset().top-200}, 500);
		$d_btns.eq($(this).index()-1).addClass('on').siblings().removeClass('on');
	});
			
	//侧边栏
	$('.siderbar_t a').hover(function(){
		$(this).find('span').css('display','block').animate({
			'left':'-79px'
		},300)
	},function(){
		$(this).find('span').css('display','none').animate({
			'left':'0'
		},300);
	})
	$('.code2s').hover(function(){
		$('.code2b').css('display','block');
	},function(){
		$('.code2b').css('display','none');
	});
	
	$('.back_top').hover(function(){
		$(this).find('span').css('display','block').animate({
			'left':'-79px'
		},300);
	},function(){
		$(this).find('span').css('display','none').animate({
			'left':'0'
		},300);
	})
	$('.back_top').on('click',function(){
		$('html,body').animate({scrollTop:0}, 500);
	});
	
	
})(jQuery);
