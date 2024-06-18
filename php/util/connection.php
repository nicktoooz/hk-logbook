<?php
if (session_status() == PHP_SESSION_NONE) session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "hk_logbook";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
