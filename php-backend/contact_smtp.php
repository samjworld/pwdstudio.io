<?php
// Lead handler for PWD template - saves to file, emails, and sends to Google Sheet
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    // Basic fields (from both modal + contact page)
    $name           = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $phone          = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $email          = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
    $message        = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    $propertyType   = isset($_POST['propertyType']) ? strip_tags(trim($_POST['propertyType'])) : '';
    $location       = isset($_POST['propertyLocation']) ? strip_tags(trim($_POST['propertyLocation'])) : '';
    $whatsappOptIn  = isset($_POST['whatsappOptIn']) ? 'Yes' : 'No';

    $payload = array(
        'name'          => $name,
        'phone'         => $phone,
        'email'         => $email,
        'message'       => $message,
        'propertyType'  => $propertyType,
        'location'      => $location,
        'whatsappOptIn' => $whatsappOptIn,
        'created_at'    => date('c')
    );

    // 1) Save locally to leads.txt (simple backup log)
    $entry = $payload['created_at']."\t".json_encode($payload)."\n";
    file_put_contents(__DIR__.'/leads.txt', $entry, FILE_APPEND);

    // 2) Send email (simple PHP mail - configure as needed)
    $to      = 'sales@pearlwhitedesigns.in'; // TODO: change to your email
    $subject = 'New Interior Lead from Website';
    $body    = "New lead details:\n\n"
             . "Name: {$name}\n"
             . "Phone: {$phone}\n"
             . "Email: {$email}\n"
             . "Property Type: {$propertyType}\n"
             . "Location: {$location}\n"
             . "WhatsApp Opt-in: {$whatsappOptIn}\n\n"
             . "Message: {$message}\n";

    $headers  = 'From: no-reply@yourdomain.com' . "\r\n"; // TODO: update domain
    $headers .= 'Reply-To: '.$to . "\r\n";
    @mail($to, $subject, $body, $headers);

    // 3) Send to Google Sheets via Apps Script Web App (optional)
    //    Create an Apps Script Web App and paste its URL below.
    $googleScriptUrl = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
    if ($googleScriptUrl !== 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
        $ch = curl_init($googleScriptUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        @curl_exec($ch);
        curl_close($ch);
    }

    // Response for AJAX
    header('Content-Type: application/json');
    echo json_encode(array('status' => 'ok'));
    exit;
}
?>
