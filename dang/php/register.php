<?php 
	header('content-type:text/html;charset=utf-8');
	
	if(isset($_POST['username'])){
		$name = $_POST['username'];
		$pwd =$_POST['password'];
		$tel = $_POST['tel'];
		$email = $_POST['email'];
		$conn=@mysql_connect('localhost','root','') or die('你可能没连上'.mysql_error());
		mysql_select_db('dangdang');
		mysql_query('SET NAMES UTF8');
		$arr = mysql_fetch_array(mysql_query('select max(id) from goodslist'),MYSQL_NUM);
		$max = ++$arr[0];
		$sqlinsert="insert into goodslist(id,username,password,tel,email) values(null,'{$name}','{$pwd}','{$tel}','{$email}')";
		$a=mysql_query($sqlinsert);
		echo '<script>alert("注册成功");window.location.href="../login.html";</script>';
	}else{
		$conn=@mysql_connect('localhost','root','') or die('你可能没连上'.mysql_error());
		mysql_select_db('dangdang');
		mysql_query('SET NAMES UTF8');
		$result = mysql_query('select * from goodslist');
		$arr = array();
		for($i=0;$i<mysql_num_rows($result);$i++){
			$arr[$i]=mysql_fetch_array($result,MYSQL_NUM);
		}
		echo json_encode($arr);
	}
	mysql_close($conn);
	
	
	
?>