<?php

class UpdateProductsAction{

	private $ProductManager;
	private $params;

	public function __construct(){
		$this->ProductManager = new ProductManager();
	}

	public function setParameters($params){
		$this->params = $params;
	}

	public function updateProducts(){
		$response = array();

		$sku = $this->params->getValue('sku');
		$desc = $this->params->getValue('desc');
		$price = $this->params->getValue('price');
		$qty = $this->params->getValue('qty');

		if($sku !=null && $desc != null && $price != null &&  $qty != null){

			$product = $this->ProductManager->updateProducts($sku, $desc, $price, $qty);

			
				return $product;
			
        } else {
            Messages::addMessage("warning", "parameters missing.");
            return null;
        }
		

	}



}


?>