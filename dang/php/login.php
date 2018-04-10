<?php
	$conn=@mysql_connect('localhost','root','') or die('你可能没连上'.mysql_error());
	mysql_select_db('dangdang');
	mysql_query('SET NAMES UTF8');
	$result = mysql_query('select * from goodslist');
	$arr = array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$arr[$i]=mysql_fetch_array($result,MYSQL_NUM);
	}
	echo json_encode($arr);
	mysql_close($conn);
	

?>