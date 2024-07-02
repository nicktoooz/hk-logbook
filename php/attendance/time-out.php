<?php
include '../util/connection.php';
include '../util/response.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);

    if ($data === null) {
        response(array("error" => "Invalid JSON data", "code" => "400"));
        exit;
    }

    $id = (int) $data['id']; 
    $timeOut = $data['timeOut'];
    $status = "CONFIRMED";

    $query = "UPDATE attendance SET time_out = ?, `status` = ? WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("ssi", $timeOut, $status, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            response(array('message' => 'Time out recorded successfully', 'code' => '200'));
        } else {
            response(array('message' => 'No record was updated. Check the ID.', 'code' => '500'));
        }
        $stmt->close();
    } else {
        response(array('message' => 'Error preparing SQL statement.', 'code' => '500'));
    }

    $conn->close();
} else {
    response(array('message' => 'Method Not Allowed', 'code' => '405'));
}
?>
