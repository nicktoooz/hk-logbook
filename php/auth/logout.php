<?php
include('../util/response.php');
if (session_status() == PHP_SESSION_NONE) session_start();
$_SESSION['authenticated'] = false;
response(array("message"=>"Logged Out"));
?>  