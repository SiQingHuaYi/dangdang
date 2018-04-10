;(function($){
	//放大镜图片获取
	function fangdajing(){
		var $sf=$('.sf');//小放大镜
		var $bf=$('.bigf');//大放大镜盒子
		var $sbox=$('.smallf');//小放大镜盒子
		var $spic=$('.smallf img');//小图
		var $bpic=$('.bigf img');//大图
		var $box=$('.left_box');//包含块
	
		//1.鼠标移入显示放大块和小放大镜
		$sbox.on('mouseover',function(){
			$bf.css('display','block');
			$sf.css('display','block');
			
			$(this).on('mousemove',function(ev){
				var ev=ev||window.event;
				fangda(ev);//调用放大函数
			})
		});
		$sbox.on('mouseout',function(){
			$bf.css('display','none');
			$sf.css('display','none');
		});
		
		//2.求出放大镜宽高，求出比例
		var $bili=$bf.width()/$sf.width();//大放大镜盒子/小放大镜盒子
		//放大函数封装
		function fangda(ev){
			var $l=ev.pageX-$box.offset().left-$sf.width()/2;
			var $t=ev.pageY-$box.offset().top-$sf.height()/2;
			//移动范围判断
			if($l<0){
				$l=0;
			}else if($l>=$sbox.width()-$sf.width()){
				$l=$sbox.width()-$sf.width();
			}
			//console.log($t);
			if($t<0){
				$t=0;
			}else if($t>=$sbox.height()-$sf.height()){
				$t=$sbox.height()-$sf.height()-2;
			}
			//小放大镜位置赋值
			$sf.css('left',$l);
			$sf.css('top',$t);
			
			//大图赋值
			$bpic.css('left',-$l*$bili);
			$bpic.css('top',-$t*$bili);
		}
	}	
	
	
		
	//放大镜数据获取	
	$.ajax({
		type:"get",
		url:"php/details_cart.php",
		async:true,
		dataType:'json',
		success:function(d){
			var arr=d;
			var $url='';
			//for(var i=0; i<arr.length;i++){
				$url+=`<img class="mixpic" src="${arr[0].url}" alt="" sid="1"/>
				<div class="sf" style="z-index: 20000;"></div>
				`;
			//}
			
			var $bigurl='';
			$bigurl+=`<img src="${arr[0].bigurl}" alt="" sid="1"/>`;
			
			var $title='';
			$title+=`<h1>${arr[0].title}</h1>`;
			
			var $price='';
			$price+=`
			    <p class="t">当当价</p>
				<p class="dd_price">
					<span class="yuan">¥</span>
					${arr[0].price}
				</p>`;
			
			var $rowprice='';
			$rowprice+=`
			    <span class="yuan">¥</span>
                ${arr[0].rowprice}
			`;

			$('.smallf').html($url);
			$('.bigf').html($bigurl);
			$('.name_info').html($title);
			$('.price_d').html($price);
			$('.price_m_r').html($rowprice);
			fangdajing();
		}
		
	});	
	
	
	
	//cookie
	var sidarr=[];//存放sid的值
	var numarr=[];//存放数量的值。
	
	function getcookievlaue(){
		if(getCookie('cartsid')){
			sidarr=getCookie('cartsid').split(',');
		}
		
		if(getCookie('cartsid')){
			numarr=getCookie('cartnum').split(',');
		}
	}

	$('.buy_box_btn .btn_red').on('click', function() {
		//1.先判断当前点击的商品是否存在于cookie中。
		var sid =$('.smallf').find('.mixpic').attr('sid');//当前按钮对应图片的sid
		getcookievlaue();//sidarr:才存在
		if($.inArray(sid,sidarr)!=-1){//存在
			//将原来的值加上我当前的值
			//parseInt(numarr[$.inArray(sid,sidarr)])：通过sid的位置，找到商品数量
			var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($('#buy_count').val());
			numarr[$.inArray(sid,sidarr)]=num;//通过sid的位置，找num的位置
			addCookie('cartnum', numarr.toString(), 7);
		}else{//不存在
			sidarr.push(sid);//将当前sid添加到数组里面。
			addCookie('cartsid',sidarr.toString(),7);
			numarr.push($('#buy_count').val());
			addCookie('cartnum',numarr.toString(),7);
		}
	});
	
	
	
	
	
	
	
	
})(jQuery);
