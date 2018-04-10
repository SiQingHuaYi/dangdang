
;(function($){
	
var $num=0;//商品数量
var $zhekou=0;//折扣价钱
var $row=0;//节省价钱
var $money=0;//总价


//1.将商品的数据渲染出来。
function createlist(sid,num){
	$.ajax({
		type:'get',
		url: 'php/details_cart.php',//商品数据的接口
	    dataType: 'json'//数据的类型
	}).done(function(data){//data:接口的返回的数据
		var arr=data;
		var $html = '';
		var $rowp='';
		var $rp='';
	    for (var i = 0; i <arr.length; i++) { 
	    	if (sid == data[i].sid) {//图片的sid和数据里面的sid匹配
		        $html += `
		        <tr class='bb_none' goodsid="${arr[i].sid}">
					<td class="row1">
						<a href="javascript:;"></a>
					</td>
					<td class='row_img'>
						<img src="${arr[i].url}"width="80" height="80" sid="${arr[i].sid}"/>
					</td>
					<td class='row_name'>
						<div class="name">
							<a href="javascript:;">${arr[i].title}</a>
						</div>
					</td>
					<td class='row3'>
						<span class="price_n">${arr[i].price}</span>
						<span style='color:red'>限时抢</span>
					</td>
					<td class="row3">
						<span class="amount">
							<a href="javascirpt:;" class="delete">-</a>
							<input type="text" value="${num}" id="counts" min="0" max="99"/>
							<a href="javascirpt:;" class="add">+</a>
						</span>
					</td>
					<td class='row4'>
						<span class="red">￥<i class="allmoney">${(arr[i].price*num).toFixed(2)}</i></span>
					</td>
					<td class="row5">
						<span>
							<a href="javascript:;">删除</a>
						</span>
					</td>
				</tr>`;
				$rowp+=`<span class='cartsum'>已节省:￥</span>
					<span class="row" style="font-size:15px; color:#000">${arr[i].rowprice}</span>`;
				
				//$rp=arr[i].rowprice;
				$money += Number((arr[i].price*num).toFixed(2));//总价
				$zhekou +=Number((arr[i].rowprice*num).toFixed(2));//折扣价
				$row=$zhekou-$money;//计算折扣价
				//$num+=Number(num);
		    }
	    }
	    $('#goodsList').html($html);//将数据追加到商品列表
	    //$('#pay').html($money);//将数据追加到商品总价列表
	    $('.rowp').html($rowp);//将数据追加到商品折扣价列表
	    //$('.row').html($row);//将数据追加到商品折扣价
	   // $('.total_left span em').html($num);//将数据追加到商品数量列表
	   totalprice();
	   jiajian();
	});
}


//选择按钮点击事件			
    $('table').on('click','.row1 a',function(){
		$(this).toggleClass('check_on');
	});
//全选事件
	var $selectAll = $('#selectAll');
	$selectAll.on('click',function(){
		$(this).toggleClass('check_on');
		$('.row1 a').toggleClass('check_on');
	});
	
//3.页面加载检测购物车(cookie里面)是否有数据，有的话创建商品列表
if (getCookie('cartsid') && getCookie('cartnum')) {
    var s = getCookie('cartsid').split(',');//存放sid数组
    var n = getCookie('cartnum').split(',');//存放数量数组
    for (var i = 0; i < s.length; i++) {
        createlist(s[i], n[i]);//遍历创建商品列表
    }
}
//4.商品列表(cookie)不存在，购物车为空
kong();
function kong() {
    if (getCookie('cartsid')) {//cookie存在，有商品，购物车不再为空
        $('.empty-cart').hide();
    } else {
        $('.empty-cart').show();
    }
}
//5.每个商品的总价已经通过创建时求得了。求所有商品的总价和总的商品的个数
function totalprice() {//计算总价
    $('table').each(function() {//可视的商品列表进行遍历，循环叠加
        if ($(this).find('.row1 a').is(':checked')) {//商品的选择框是选中的
            $money += Number((arr[i].price*num).toFixed(2));//总价
            $num+=Number(num);
        }
    });
    //赋值
    $('#pay').html($money.toFixed(2));
    $('.total_left span em').html($num);
    $('.row').html($row.toFixed(2));//将数据追加到商品折扣价
}



//6.修改数量的操作
function jiajian(){
	//改变商品数量++
	$('.add').on('click', function() {
	    var $count = $(this).parent('.amount').find('input').val();
	    $count++;
	    if ($count >= 99) {
	        $count = 99;
	    }
	    var $rowpri=
	    $(this).parent('.amount').find('input').val($count);
	    $('.row4').find('i').html(singlegoodsprice($(this)));//改变后的价格
	    totalprice();
	    setcookie($(this));
	    $('#pay').html(singlegoodsprice($(this)));
	    $('.row').html(rowprices($(this)));//将数据追加到商品折扣价
	});
	
	//改变商品数量--
	$('.delete').on('click', function() {
	    var $count = $(this).parent('.amount').find('input').val();
	    $count--;
	    if ($count <= 1) {
	        $count = 1;
	    }
	    $(this).parent('.amount').find('input').val($count);
	     $('.row4').find('i').html(singlegoodsprice($(this)));//改变后的价格
	    totalprice();
	    setcookie($(this));
	    $('#pay').html(singlegoodsprice($(this)));
	    $('.row').html(rowprices($(this)));//将数据追加到商品折扣价
	});
	
	//直接输入改变数量
	$('.amount input').on('input', function() {
	    var $reg = /^\d+$/g; //只能输入数字
	    var $value = parseInt($(this).val());
	    if ($reg.test($value)) {
	        if ($value >= 99) {//限定范围
	            $(this).val(99);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {
	        $(this).val(1);
	    }
	    $('.row4').find('i').html(singlegoodsprice($(this)));//改变后的价格
	    totalprice();
	    setcookie($(this));
	    $('#pay').html(singlegoodsprice($(this)));
	    $('.row').html(rowprices($(this)));//将数据追加到商品折扣价
	});
	
}


//7.计算数量改变后单个商品的价格
function singlegoodsprice(row) { //row:当前元素
    var $dj = parseFloat(row.parents('.bb_none').find('.row3').find('.price_n').html());
    var $cnum = parseInt(row.parents('.bb_none').find('input').val());
    return ($dj * $cnum).toFixed(2);
}
function rowprices(obj) { //obj:当前元素
    var $cnum = parseInt(obj.parents('.bb_none').find('input').val());
    var $zongjia=parseFloat(obj.parents('.shopping_list').siblings('.shopping_total').find('.rowp').find('.row').html());
    return ($cnum * $zongjia).toFixed(2);
}


//8.获取对应的cookie值，将其转换成数组
var sidarr = [];
var numarr = [];
function cookieToArray(){
	if(getCookie('cartsid')){
		sidarr=getCookie('cartsid').split(',');
	}
	
	if(getCookie('cartnum')){
		numarr=getCookie('cartnum').split(',');
	}
}

//9.将改变后的数量的值存放到cookie
function setcookie(obj) { //obj:当前操作的对象
    cookieToArray();
    var $index = obj.parents('.bb_none').find('img').attr('sid');
    numarr[sidarr.indexOf($index)] = obj.parents('.bb_none').find('.amount input').val();
    addCookie('cartnum', numarr.toString(), 7);
}










})(jQuery);