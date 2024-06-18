<?php
include('../util/response.php');

if (session_status() == PHP_SESSION_NONE) session_start();

if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
    response(array("authenticated" => true));
} else {
    response(array("authenticated" => false));
}
?>
