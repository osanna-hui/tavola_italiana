<?php
	require_once('../init.php');
	loadScripts();

	$data = array("status" => "not set!");

	if(Utils::isPOST()){
		if(Utils::isAJAX()){

			$parameters = new Parameters("POST");

			$upa = new UpdateProductsAction();
			$upa->setParameters($parameters);

			$response = $upa->updateProducts();

			if($response) {
				$data = array("status" => "success", "product" =>$response);
			} else {
				$data = array ("status" => "error", "msg" => 
					Messages::getMessages());
			}
/*
			$sku = $_POST['sku'];
			$price = $_POST['price'];
			$qty = $_POST['qty'];
			$desc = $_POST['desc'];
*/

		} else {
			$data = array("status" => "error", "msg" => "AJAX REquired.");
		}
		
	} else {
        $data = array("status" => "error", "msg" => "Only POST allowed.");

    }

    echo json_encode($data, JSON_FORCE_OBJECT);




?>