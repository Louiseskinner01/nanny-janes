<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['contact-name'] ?? "";
    $email = $_POST['contact-email'] ?? "";
    $childs_age = $_POST['contact-childs-age'] ?? "";
    $reason = $_POST['contact-reason'] ?? "";
    $message = $_POST['contact-message'] ?? "";

    $to = "louise.skinner40@gmail.com";  
    $subject = "New Contact Form Message";

    $body = "New enquiry from your website:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Child's Age: $childs_age\n";
    $body .= "Reason for Contact: $reason\n\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    mail($to, $subject, $body, $headers);

    // Redirect to a thank-you page
    header("Location: thank-you.html");
    exit;
}

?>