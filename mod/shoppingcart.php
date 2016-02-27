<?php

require_once('../libs/PHPTAL-1.3.0/PHPTAL.php');
require_once('../init.php');
loadScripts();

    $data = array("status" => "not set!");

    if(Utils::isPOST()) {
        $scm = new ShoppingCartManager();

        $parameters = new Parameters("POST");

        $action = $parameters->getValue('action');

        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        switch($action) {
            case "startcart":
                // start the cart, so start session, create cart table in DB
                if(isset($_SESSION['started'])) {
                    $data = array("status" => "fail", "msg" => "You already have a cart started.");
                    echo json_encode($data, JSON_FORCE_OBJECT);
                    return;
                }

                $id = $scm->startCart();
                if(!empty($id)) {

                    $_SESSION['started'] = "true";
                    $_SESSION['id'] = $id;
                    //$data = array("status" => "success", "s_id", => session_id(),
                    //    "cart_id" => $id, "msg" => "Cart started.");
                    $data = array("status" => "success", "cart_id" => $id, "msg" => "Cart started.");


                } else {
                    $data = array("status" => "fail", "msg" => "Cart NOT started.");
                }

                break;
            case "cancelcart":
                // cancel the cart, end session, set cart row to 'cancelled'

                if(!isset($_SESSION['started'])) {
                    $data = array("status" => "fail", "msg" => "There is no cart to cancel.");
                    echo json_encode($data, JSON_FORCE_OBJECT);
                    return;
                }
                $affectedRows = $scm->cancelCart($_SESSION['id']);

                if($affectedRows > 0) {

                    session_unset();
                    session_destroy();
                    $data = array("status" => "success", "msg" => "Cart cancelled.");

                } else {
                    $data = array("status" => "fail", "msg" => "Cart NOT cancelled.");
                }

                break;
            case "checkoutcart":
                // check out the cart

                if(!isset($_SESSION['started'])) {
                    $data = array("status" => "fail", "msg" => "There is no cart to check out.");
                    echo json_encode($data, JSON_FORCE_OBJECT);
                    return;
                }

                // turn the JSON into an array of arrays (true means arrays and not objects)
                $items = json_decode($_POST['items'], true);
                $scm->addItemsToCart($items, $_SESSION['id']);

                $affectedRows = $scm->checkoutCart($_SESSION['id']);

                if($affectedRows > 0) {

                    session_unset();
                    session_destroy();
                    $data = array("status" => "success", "msg" => "Cart successfully checked out.");

                } else {
                    $data = array("status" => "fail", "msg" => "Cart was NOT checked out.");
                }
                break;


        }


    } else {
        $data = array("status" => "error", "msg" => "Only POST allowed.");

    }

    echo json_encode($data, JSON_FORCE_OBJECT);

    // here's where we can choose how to render: AJAX or non-AJAX
    // this might affect how we output the data (i.e., JSON vs HTML)
    $profile = $this->userManager->getUserProfile(Session::get('user_name'));
    if(Utils::isAJAX()) {
        $data = array();
        // AJAX means that we'll send it as JSON - at least for this call
        if($profile == null) {
            // didn't find a profile with that name
            $data = array("status" => "error", "msg" => Messages::getMessages());
        } else {
            $data = array("status" => "success", "profile" => $profile);
        }
        echo json_encode($data, JSON_FORCE_OBJECT);
        return;

    } else {
        // render the whole page using PHPTAL

        // finally, create a new template object
        $template = new PHPTAL('../index.xhtml');

        // now add the variables for processing and that you created from above:
       $template->page_title = "Tavola Italiana";
        $template->profile = $profile;

        // messages last
        $template->messages = Messages::getMessages();

        // execute the template
        try {
            echo $template->execute();
        }
        catch (Exception $e){
            // not much else we can do here if the template engine barfs
            echo $e;
        }

    }

?>
