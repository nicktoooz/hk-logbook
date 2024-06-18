<?php
include('../util/connection.php');
include('../util/response.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);

    if ($data === null) response(array("error" => "Invalid JSON data"));
    
    $username = $data['username'] ?? null;
    $password = $data['password'] ?? null;
    
    if ($username !== 'hkfacilitator') response(array("error" => 'Invalid Username',"code" => '403'));
    if ($password !== 'hk2425') response(array("error" => 'Invalid Password',"code" => '403'));
    
    $_SESSION['authenticated'] = true;
    response(array("message" => 'Success', 'code'=>'200'));
    

} else {
    response(array("error" => "Invalid Method"));
}
?>
