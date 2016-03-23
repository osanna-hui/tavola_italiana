<?php

//require_once('./DBConnector.php');

//$um = new ShoppingCartManager();

// Facade
class ShoppingCartManager {

    private $db;

    public function __construct() {
        $this->db = DBConnector::getInstance();
    }

    public function startCart() {
        $sql = "INSERT INTO cart (state, total) values ('started', 0.00)";
        $id = $this->db->getTransactionID($sql);
        // return id of the cart that was started
        return $id;
    }

    public function cancelCart($id) {
        $sql = "UPDATE cart SET state = 'cancelled' WHERE ID = $id";
        $count = $this->db->affectRows($sql);
        return $count;
    }

    public function checkQty($items, $cart_id) {
        foreach($items as $item) {
            $sku = $item['sku'];
            $qty = $item['qty'];
            //return $qty;

            $sql = "SELECT * FROM product WHERE item_qnty < '$qty' AND SKU = '$sku'";
            $rows = $this->db->query($sql);
            return $rows;
            
        }

    }

    public function checkoutCart($id) {
        $sql = "UPDATE cart SET state = 'checked out' WHERE ID = $id";
        $count = $this->db->affectRows($sql);
        return $count;
    }

    public function addItemsToCart($items, $cart_id) {

        foreach($items as $item) {
            $sku = $item['sku'];
            $qty = $item['qty'];

            // need to look up the ID of the product based on the SKU
            $sql = "SELECT ID, item_qnty FROM product WHERE SKU = '$sku'";
            $rows = $this->db->query($sql);
            $product_id = $rows[0]['ID'];
            
            $sql = "INSERT INTO cart_product (product_id, cart_id, quantity)
                VALUES ($product_id, $cart_id, $qty)";
            $this->db->affectRows($sql);

            $product_qty = $rows[0]['item_qnty'];
            $new_qty = $product_qty-$qty;

            $sql = "UPDATE product SET item_qnty = $new_qty WHERE SKU = '$sku'";
            $this->db->affectRows($sql);

        }

    }
    
    public function updateCart($items) {
        foreach($items as $item) {
            $sku = $item['sku'];
            $qty = $item['qty'];
            $date = $item['date'];
            
            //$sql = "SELECT ID FROM product WHERE SKU = '$sku'";
            $rows = $this->db->query($sql);
            $product_id = $rows[0]['ID'];
            $sql = "UPDATE cart_product SET quantity = $qty, time = $date WHERE SKU = $sku";
            $this->db->affectRows($sql);
        }
    }

}

?>
