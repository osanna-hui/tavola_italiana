<?php
    include("con.php");

    function adminLogin(){
        $methodType = $_SERVER['REQUEST_METHOD'];
        $data = array("status" => "fail", "msg" => "$methodType");
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            if(isset($_POST["usrname"]) && !empty($_POST["usrname"])
                && isset($_POST["pwd"]) && !empty($_POST["pwd"])){

                $username = $_POST["usrname"];
                $password = $_POST["pwd"];

                $sql = "SELECT * FROM users WHERE username = :usr AND password = :pwd";

                $statement = $conn->prepare($sql);
                $statement->execute(array(":usr" => $username, ":pwd" => $password));

                $count = $statement->rowCount();

                if($count > 0) {

                    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                    $returnedUsername = $rows[0]['username'];
                    $returnedPassword = $rows[0]['password'];
                    $returnedUserID = $rows[0]['user_id'];

                    $_SESSION['username'] = $returnedUsername;
                    $_SESSION['loggedin'] = true;
                    $_SESSION['user_id'] = $returnedUserID;

                    $sid= session_id();
                    $data = array("status" => "success", "sid" => $sid);


                } else {
                    $data = array("status" => "fail", "msg" => "User name and/or password not correct.");
                }

            } else {
                $data = array("status" => "fail", "msg" => "Either login or password were absent.");
            }
        } else {

            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }       
    }

    function adminLogout(){
        $methodType = $_SERVER['REQUEST_METHOD'];
        $data = array("status" => "fail", "msg" => "$methodType");
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            if(isset($_POST["logout"]) && !empty($_POST["logout"]) ){

                $logout = $_POST["logout"];

                session_unset();
                session_destroy();

                $data = array("status" => "success", "msg" => "You were successfully logged out.");

            } else {
                $data = array("status" => "fail", "msg" => "No logout request made");
            }
        } else {
            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }
    }
    
    function insertCustomer(){
        $methodType = $_SERVER['REQUEST_METHOD'];
        $data = array("status" => "fail", "msg" => "$methodType");
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            if(isset($_POST["c_firstname"]) && !empty($_POST["c_firstname"])
                && isset($_POST["c_lastname"]) && !empty($_POST["c_lastname"])
                && isset($_POST["c_email"]) && !empty($_POST["c_email"])
                && isset($_POST["c_phone"]) && !empty($_POST["c_phone"])
                && isset($_POST["c_address"]) && !empty($_POST["c_address"])
                && isset($_POST["c_transactionID"]) && !empty($_POST["c_transactionID"])
                ){

                $c_firstname = $_POST["c_firstname"];
                $c_lastname = $_POST["c_lastname"];
                $c_email = $_POST["c_email"];
                $c_phone = $_POST["c_phone"];
                $c_address = $_POST["c_address"];
                $c_transactionID = $_POST["c_transactionID"];


                $sql = "INSERT INTO customers (firstname, lastname, email, phone, address, transactionID) VALUES  (:fName,  :lName, :eMail, :phone, :add, :tranID)";

                $statement = $conn->prepare($sql);
                $statement->execute(array(":fName" => $c_firstname, ":lName" => $c_lastname, ":eMail" => $c_email, ":phone" => $c_phone, ":add" => $c_address, ":tranID" => $c_transactionID));

            } else {
                $data = array("status" => "fail", "msg" => "Either login or password were absent.");
            }
        } else {

            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");
        }       

    }

?>
