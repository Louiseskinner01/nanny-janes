<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['contact-name'] ?? "";
    $email = $_POST['contact-email'] ?? "";
    $childs_age = $_POST['contact-childs-age'] ?? "";
    $reason = $_POST['contact-reason'] ?? "";
    $message = $_POST['contact-message'] ?? "";

    $mail = new PHPMailer(true);

    try {
        // ✅ CORRECT SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host = 'localhost';
        $mail->SMTPAuth = false;
        $mail->Username = 'info@nannyjanesnursery.co.uk';
        $mail->Password = '';
        $mail->SMTPSecure = 'false';
        $mail->Port = 25;


        // Email setup
        $mail->setFrom('info@nannyjanesnursery.co.uk', 'Website Contact');
        $mail->addAddress('info@nannyjanesnursery.co.uk');
        $mail->addReplyTo($email, $name);

        $mail->Subject = "New Contact Form Message";

        $body = "New enquiry from your website:\n\n";
        $body .= "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Child's Age: $childs_age\n";
        $body .= "Reason for Contact: $reason\n\n";
        $body .= "Message:\n$message\n";

        $mail->Body = $body;

        $mail->send();

        
        header("Location: thank-you.html");  // re-enable after testing
        exit;

    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
}