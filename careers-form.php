<?php

// use the classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// load PHPMailer files
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Your existing code starts here
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first_name = $_POST['contact-first-name'] ?? "";
    $last_name = $_POST['contact-last-name'] ?? "";
    $email = $_POST['contact-email'] ?? "";

    $cv_tmp = $_FILES['contact-cv']['tmp_name'];
    $cv_name = $_FILES['contact-cv']['name'];

    $mail = new PHPMailer(true);

    try {

// Use SMTP
        $mail->isSMTP();
        $mail->Host = 'smtpout.secureserver.net';
        $mail->SMTPAuth = true;
        $mail->Username = 'noreply@nannyjanesnursery.co.uk';
        $mail->Password = 'YOUR_EMAIL_PASSWORD';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('noreply@nannyjanesnursery.co.uk', 'Nanny Janes Website');
        $mail->addAddress('info@nannyjanesnursery.co.uk');
        $mail->addReplyTo($email);

        $mail->Subject = "New Career Form Message";

        $mail->Body = "New enquiry from your website:\n\n";
        $mail->Body .= "First name: $first_name\n";
        $mail->Body .= "Last name: $last_name\n";
        $mail->Body .= "Email: $email\n";

        $mail->Body = $body;

        // Attach CV
        if (!empty($cv_tmp)) {
            $mail->addAttachment($cv_tmp, $cv_name);
        }

        $mail->send();

        header("Location: thank-you.html");
        exit;

    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
}