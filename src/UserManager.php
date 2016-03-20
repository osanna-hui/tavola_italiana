<?php

//require_once('./DBConnector.php');

//$um = new UserManager();

// Facade
class UserManager {

    private $db;

    public function __construct() {
        $this->db = DBConnector::getInstance();
    }

    public function getUserProfile($userName = "") {

        $rows = $this->db->query("select * from admins where username = :name",
            array(':name' => $userName));
        //var_dump($rows[0]);
        if(count($rows) == 1) {
            return $rows[0];
        }
        // otherwise
        return null;
    }

    public function findUser($usr = "", $pwd = "") {
        $params = array(":usr" => $usr, ":pwd" => $pwd);
        $sql = "SELECT * FROM admins WHERE username = :usr AND password = :pwd";

        $rows = $this->db->query($sql, $params);
        if(count($rows) > 0) {
            return $rows[0];
        }

        return null;
    }
    
    public function createCustomer($first = "", $last = "", $phone = "", $email = "", $address = "", $city = "", $cartID =""){
      $params = array(":first" => $first, ":last" => $last, ":phone" => $phone, ":email" => $email, ":address" => $address, ":city" => $city, ":cartID" => $cartID);
      
      $sql = "INSERT INTO customers (firstName, lastName, phone, email, deliveryAddress, city,  transaction_id) VALUES (:first, :last, :phone, :email, :address, :city, :cartID)";
      $rows = $this->db->query($sql, $params);
      
      //$sql = "SELECT * FROM customers WHERE firstName = :first";
      
       // $rows = $this->db->query($sql, $params);
        
        return $rows;
      
    }
   

}

?>
