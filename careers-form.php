<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first_name = $_POST['contact-first-name'] ?? "";
    $last_name = $_POST['contact-last-name'] ?? "";
    $email = $_POST['contact-email'] ?? "";
    $cv = $_POST['contact-cv'] ?? "";
 
    $to = "louise.skinner40@gmail.com";  
    $subject = "New Contact Form Message";

    $body = "New enquiry from your website:\n\n";
    $body .= "First name: $first_name\n";
    $body .= "Last name: $last_name\n";
    $body .= "Email: $email\n";
    $body .= "CV: $cv\n";
    
    $headers = "From: noreply@louise-testing.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    

    mail($to, $subject, $body, $headers);

    // Redirect to a thank-you page
    header("Location: thank-you.html");
    exit;
}

?>