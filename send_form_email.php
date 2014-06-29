<?php
require_once dirname(__FILE__)."/PHPMailer/class.phpmailer.php";

function sendEmail($fromAdd, $toAdd, $subject, $body)
{
    $mail = new PHPMailer(); // create a new object
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465;
    $mail->IsHTML(true);
    $mail->Username = "notify.anztc@gmail.com";
    $mail->Password = "625518cz";
    $mail->SetFrom("notify.anztc@gmail.com");
    $mail->FromName = $fromAdd;
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($toAdd);

/* Multiple cc add */
//    foreach ($ccAdd as $ca) {
//        $mail->AddCC($ca);
//    }
/* Attachment */
//    if (isset($attachment)) {
//        $mail->AddStringAttachment($attachment["file_string"], $attachment["file_name"], $attachment["file_encoding"], $attachment["file_type"]);
//    }

    if (!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "sent";
    }
}
/* Attachment post data process */
//if (isset($_POST['string_attach'])) {
//    $str_att = substr($_POST['string_attach'], strpos($_POST['string_attach'], ","));
//    $string_attachment = array(
//        "file_string" => base64_decode($str_att),
//        "file_name" => "document.png",
//        "file_encoding" => "base64",
//        "file_type" => "image/png"
//    );
//}

$fromAdd = $_POST['fromAdd'];
$fromName = $_POST['fromName'];
$toAdd = "joechang0314@hotmail.com";
$subject = $_POST['fromName'] ." "."are interested in your portfolio";
$content = $_POST['content'];

sendEmail($fromAdd, $toAdd, $subject, $content);
