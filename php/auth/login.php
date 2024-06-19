<?php
include('../util/connection.php');
include('../util/response.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);

    if ($data === null) {
        response(array("error" => "Bad Request", 'code'=>'400'));
        exit;
    }
    
    $username = $data['username'] ?? null;
    $password = $data['password'] ?? null;
    
    if ($username !== 'hkfacilitator') response(array("error" => 'Invalid Username',"code" => '400'));
    if ($password !== 'hk2425') response(array("error" => 'Invalid Password',"code" => '400'));
    
    $_SESSION['authenticated'] = true;
    response(array("message" => 'success', 'code'=>'200'));
    
} else {
    response(array("error" => "Method Not Allowed", 'code'=>'405'));
}
?>
