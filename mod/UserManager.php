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
    
    public function createCustomer($usr = ""){
      $params = array(":cust" => $usr);
      
      $sql = "INSERT INTO customers (firstName, lastName, phone, email, deliveryAddress, city, transaction_id) VALUES (:cust, 'none', '123', 'email', '123 test', 'vancouver', '1' )";
      $rows = $this->db->query($sql, $params);
      
      $sql = "SELECT * FROM customers WHERE firstName = :cust";
      
        $rows = $this->db->query($sql, $params);
        if(count($rows) > 0) {
            return $rows[0];
        }

        return null;
      
    }

    public function updateCustomer($first = ""){
      $params = array(":firstname" => $custFirstName, ":lastname" => $custLastName, ":phone" => $custPhone, ":email"=> $custEmail, ":address" => $custAddress, ":city"=> $custCity, ":cust_id" => $custID);
      
      $sql = "UPDATE customers SET firstName = :firstname, lastName = :lastname, phone = :phone, email = :email, deliveryAddress = :address, city = :city WHERE cust_id = :cust_id";
      $rows = $this->db->query($sql, $params);

        return null;
      
    }

}

?>
