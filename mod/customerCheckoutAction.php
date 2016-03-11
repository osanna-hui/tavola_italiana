<?php

//require_once('./UserManager.php');
//require_once('./Session.php');
//require_once('./Messages.php');
//require_once('./Utils.php');

// Command
class CustomerCheckoutAction {

    private $userManager;
    private $params;

    public function __construct() {
        $this->userManager = new UserManager();
    }

    public function setParameters($params) {
        $this->params = $params;
    }

    public function customerCheckout() {

        if(Session::get('isCustomer')) {
            
            $response = array();

            // params have to be there
            $custFirstName = $this->params->getValue('custFirstName');
            $custLastName = $this->params->getValue('custLastName');
            $custPhone = $this->params->getValue('custPhone');
            $custEmail = $this->params->getValue('custEmail');
            $custAddress = $this->params->getValue('custAddress');
            $custCity = $this->params->getValue('custCity');
            $custID = Session::get("id");

            //$user_password = $this->params->getValue('password');
            if($custFirstName != null && 
                $custLastName != null && 
                $custPhone != null &&
                $custEmail != null &&
                $custAddress != null &&
                $custCity != null &&
                $custID != null) {
                // check if user name and password are correct
                $first = $this->userManager->updateCustomer($custFirstName, $custLastName, $custPhone, $custEmail, $custAddress, $custCity, $custID );
                
                
            } else {
                Messages::addMessage("warning", "'user_name' and/or 'password' parameters missing.");
                return null;
            }
        }

    }


}

?>
