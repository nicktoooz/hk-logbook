<?php

include '../util/connection.php';
include '../util/response.php';

$query = 'SELECT * FROM attendance';
$result = $conn->query($query);

if ($result === false) {
    response(array('error' => 'Failed to execute query', 'code' => '500'));
} else {
    $attendanceRecords = $result->fetch_all(MYSQLI_ASSOC);
    response(array('message' => 'Records retrieved successfully', 'code' => '200', 'data' => $attendanceRecords));
}

?>
