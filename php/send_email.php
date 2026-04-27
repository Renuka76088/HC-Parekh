<?php
// --- CORS HEADERS ---
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

header("Content-Type: application/json");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

$name = strip_tags(trim($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$subject_key = $data['subject'];
$message = nl2br(strip_tags(trim($data['message']))); // nl2br handles line breaks in HTML

// --- DYNAMIC ROUTING ---
// Use the 'to' address from the payload if provided, otherwise default to hcparekh.associates@gmail.com
$to = !empty($data['to']) ? filter_var($data['to'], FILTER_SANITIZE_EMAIL) : "hcparekh.associates@gmail.com";

$email_subject = "New Inquiry: " . ucfirst($subject_key) . " from $name";

// --- PROFESSIONAL HTML EMAIL TEMPLATE ---
$html_content = "
<html>
<head>
    <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .header { background-color: #0f172a; color: #ffffff; padding: 25px; text-align: center; }
        .content { padding: 30px; line-height: 1.6; background-color: #ffffff; }
        .footer { background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .field-label { font-weight: bold; color: #e11d48; text-transform: uppercase; font-size: 11px; margin-bottom: 4px; display: block; }
        .field-value { margin-bottom: 20px; font-size: 16px; color: #1e293b; background: #f1f5f9; padding: 10px; border-radius: 6px; }
        .message-box { background: #fff1f2; padding: 15px; border-left: 4px solid #e11d48; border-radius: 4px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin:0;'>H.C. Parekh & Co.</h2>
            <p style='margin:5px 0 0; opacity:0.8; font-size:14px;'>New Website Inquiry Received</p>
        </div>
        <div class='content'>
            <span class='field-label'>Full Name</span>
            <div class='field-value'>$name</div>

            <span class='field-label'>Email Address</span>
            <div class='field-value'>$email</div>

            <span class='field-label'>Inquiry Type</span>
            <div class='field-value'>" . ucfirst($subject_key) . "</div>

            <span class='field-label'>Message</span>
            <div class='message-box'>$message</div>
        </div>
        <div class='footer'>
            This email was sent from the contact form on hcparekh.com<br>
            &copy; " . date("Y") . " H.C. Parekh & Co. All rights reserved.
        </div>
    </div>
</body>
</html>
";

// --- HTML HEADERS ---
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: H.C. Parekh Web <noreply@hcparekh.com>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// --- SEND EMAIL ---
if (mail($to, $email_subject, $html_content, $headers)) {
    echo json_encode(["success" => true, "message" => "Your message has been sent to our $subject_key team."]);
} else {
    echo json_encode(["success" => false, "message" => "Server error. Mail could not be sent."]);
}
?>