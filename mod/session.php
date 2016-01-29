<?php
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "$methodType");

    $DBHost = "localhost";
    $dblogin = "upark_oh";
    $DBpassword = "uParkOH123";
    $DBname = "upark";

    if ($methodType === 'GET') {

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            if (isset($_SESSION['loggedin']) && ($_SESSION['loggedin'] === true)
                //&& isset($_SESSION['username']) && !empty(($_SESSION['username']))
                //&& isset($_SESSION['picture']) && !empty(($_SESSION['picture']))
                //&& isset($_SESSION['user_id']) && !empty(($_SESSION['user_id']))
                ) {

                $username = $_SESSION['username'];

                try {
                    $conn = new PDO("mysql:host=$DBHost;dbname=$DBname", $dblogin, $DBpassword);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    $sql = "SELECT * FROM users WHERE username = :usr";

                    $statement = $conn->prepare($sql);
                    $statement->execute(array(":usr" => $username));

                    $count = $statement->rowCount();

                    if($count > 0) {

                        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                        $data = array("status" => "success", "userProfile" => $rows[0], "username" => $rows[0]['username'], "userID" => $rows[0]['user_id'], "picture" => $rows[0]['img_url']);

                    } else {
                        $data = array("status" => "fail", "msg" => "User name and/or password not correct.");
                    }


                } catch(PDOException $e) {
                    $data = array("status" => "fail", "msg" => $e->getMessage());
                }

            } else {
                $data = array("status" => "fail", "msg" => "Not logged in.");
            }

        } else {

            $data = array("status" => "fail", "msg" => "Has to be an AJAX call.");

        }

    } else {

        $data = array("status" => "fail", "msg" => "Error: only GET allowed.");

    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>
