<?php


function loadScripts() {

$scripts = array('DBConnector.php',
                 'Messages.php',
                 'Parameters.php',
                 'ProductManager.php',
                 //'products.php',
                 //'shoppingcart.php',
                 'ShoppingCartManager.php',
                 'Session.php',
                 'ShowUserProfileAction.php',
                 'UserLoginAction.php',
                 'UserLogoutAction.php',
                 
                 'customerInAction.php',
                 'UserManager.php',
                 'Utils.php');

    $subDir = "mod";

    foreach($scripts as $script) {
        require_once($subDir . DIRECTORY_SEPARATOR. $script);
    }

}




?>
