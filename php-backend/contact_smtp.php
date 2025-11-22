<?php
// Simple contact handler for PWD template
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $name = isset($_POST['name'])? strip_tags(trim($_POST['name'])):'';
    $phone = isset($_POST['phone'])? strip_tags(trim($_POST['phone'])):'';
    $email = isset($_POST['email'])? strip_tags(trim($_POST['email'])):'';
    $message = isset($_POST['message'])? strip_tags(trim($_POST['message'])):'';
    $entry = date('c')."\t".json_encode(['name'=>$name,'phone'=>$phone,'email'=>$email,'message'=>$message])."\n";
    file_put_contents(__DIR__.'/leads.txt', $entry, FILE_APPEND);
    echo 'ok';
    exit;
}
?>