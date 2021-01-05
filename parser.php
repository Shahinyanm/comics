<?php
$request = json_decode(file_get_contents('php://input'));
$response = [];
if (isset($request->url)){
    $response = file_get_contents($request->url);
}
echo $response;

