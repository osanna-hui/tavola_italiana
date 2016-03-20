<?php

//require_once('./DBConnector.php');

//$um = new ProductManager();

// Facade
class ProductManager {

    private $db;


    public function __construct() {
        $this->db = DBConnector::getInstance();
    }

    public function listProducts() {
        $sql = "SELECT item_img, SKU, item_price, description, item_qnty FROM product";
        $rows = $this->db->query($sql);
        return $rows;
    }

    public function findProduct($SKU) {
        $params = array(":sku" => $SKU);
        $sql = "SELECT SKU, item_price, description FROM product WHERE SKU = :sku";

        $rows = $this->db->query($sql, $params);
        if(count($rows) > 0) {
            return $rows[0];
        }

        return null;
    }

    public function updateProductQnty() {
        $sql = "UPDATE product SET item_qnty =  WHERE ID = ".$_POST['ID']."";
        $rows = $this->db->query($sql);
    }

    public function updateProducts($sku, $desc, $price, $qty){
       $params = array(":sku" => $sku, ":desc" => $desc, ":price" => $price, ":qty" => $qty);
        $sql ="UPDATE product SET item_price = :price, item_qnty = :qty, description = :desc WHERE SKU = :sku";

        $rows = $this->db->query($sql, $params);
        
            return $rows;
        


    }

}

?>
