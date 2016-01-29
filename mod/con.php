<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$DBHost = "localhost";
$dblogin = "root";
$DBpassword = "root";
$DBname = "TI"; 

try {
    $conn = new PDO("mysql:host=$DBHost;dbname=$DBname", $dblogin, $DBpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    $data = array("status" => "fail", "msg" => $e->getMessage());
}
?>