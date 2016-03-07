<?php

//require_once('./UserManager.php');
//require_once('./Session.php');
//require_once('./Messages.php');
//require_once('./Utils.php');

// Command
class CustomerInAction {

    private $userManager;
    private $params;

    public function __construct() {
        $this->userManager = new UserManager();
    }

    public function setParameters($params) {
        $this->params = $params;
    }

    public function customerIn() {

        if(Session::get('isLoggedIn')) {
            Messages::addMessage("info", "You are already in.");
            return;
        } else {
            $response = array();

            // params have to be there
            $user_name = $this->params->getValue('user_name');
            //$user_password = $this->params->getValue('password');
            if($user_name != null) {
                // check if user name and password are correct
                $usr = $this->userManager->createCustomer($user_name);
                if($usr != null) {
                    // log user in
                    //Session::set("user_name", $usr['username']);
                    Session::set("id", $usr['cust_id']);
                    //Session::set("isLoggedIn", true);
                    Session::set("isCustomer", true);
                    return $usr;

                } else {
                    Messages::addMessage("info", "Log in user and/or password incorrect.");
                    return null;
                }
            } else {
                Messages::addMessage("warning", "'user_name' and/or 'password' parameters missing.");
                return null;
            }
        }

    }


}

?>
