<?php
	
	include("../mod/users.php");

//ADMIN
	if($_POST['method'] == "login"){
		adminLogin();
		echo json_encode($data, JSON_FORCE_OBJECT);
	}
	if($_POST['method'] == "logout"){
		adminLogout();
		echo json_encode($data, JSON_FORCE_OBJECT);
	}

//CUSTOMER
	if($_POST['method'] == "insertCustomer"){
		insertCustomer();
		echo json_encode($data, JSON_FORCE_OBJECT);
	} 


?>