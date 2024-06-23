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

    $data = sanitizeInputData($data);
    $result = insertAttendanceRecord($conn, $data);

    response($result);
} else {
    response(array('error' => 'Method Not Allowed', 'code' => '405'));
}

function sanitizeInputData($data) {
    foreach ($data as $key => $value) {
        $value = trim($value);
        if ($key == 'firstName' || $key == 'lastName') {
            $value = ucwords(strtolower($value)); 
        }
        $data[$key] = $value;
    }
    $data['year'] = (int) $data['year']; 
    return $data;
}

function insertAttendanceRecord($conn, $data) {
    $query = "INSERT INTO attendance (`first_name`, `last_name`, `year` ,`teacher`, `area`, `course`, `time_in`, `time_out`, `date`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        response(array('error' => 'Failed to prepare statement', 'code' => '500'));
        return;
    }

    $time = null;

    $stmt->bind_param('ssissssss',
        $data['firstName'],
        $data['lastName'],
        $data['year'],
        $data['teacher'],
        $data['area'],
        $data['course'],
        $data['timeIn'],
        $time,
        $data['date']
    );

    $stmt->execute();

    if ($stmt->error) {
        $stmt->close();
        return array('error' => 'Execution error: ' . $stmt->error, 'code' => '500');
    }

    $stmt->close();
    return array('message' => 'Record created', 'code' => '201', 'payload' => $data);
}

?>
