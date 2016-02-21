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

        $rows = $this->db->query("select * from user where user_name = :name",
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
        $sql = "SELECT * FROM user WHERE user_name = :usr AND password = :pwd";

        $rows = $this->db->query($sql, $params);
        if(count($rows) > 0) {
            return $rows[0];
        }

        return null;
    }


}

?>
