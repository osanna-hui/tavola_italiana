<?php

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

        if(Session::get('isLoggedIn')) {
            Messages::addMessage("warning", "Not customer");
            return;
        } else {
            
            $response = array();

            // params have to be there
            //$user_name = $this->params->getValue('user_name');
            $custFirstName = $this->params->getValue('firstname');
            $custLastName = $this->params->getValue('lastname');
            $custPhone = $this->params->getValue('phone');
            $custEmail = $this->params->getValue('email');
            $custAddress = $this->params->getValue('address');
            $custCity = $this->params->getValue('city');
            $cartID = $_SESSION['cart_id'];


            if($custFirstName != null && 
                $custLastName != null && 
                $custPhone != null &&
                $custEmail != null &&
                $custAddress != null &&
                $custCity != null &&
                $cartID != null) {

            //if($custFirstName != null) {
                
                $cust = $this->userManager->createCustomer($custFirstName, $custLastName, $custPhone, $custEmail, $custAddress, $custCity, $cartID );
                
                return $cust;
                
            } else {
                Messages::addMessage("warning", " parameters missing.");
                return null;
            }
        }

    }


}

?>
