<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  requare "phpmailer/src/PHPMailer.php";
  requare "phpmailer/src/Exception.php;";

  $mail = new PHPMailer(true);
  $mail->CharSet = "UTF-8";
  $mail->setLanguage("ru", "phpmailer/language/");
  $mail->IsHTML(true);

  //От кого письмо
  $mail->setFrom("tiurinad2003@gmail.com", "Тюрин Саша");
  //Кому отправить
  $mail->addAddress("tadtda2003@gmail.com");
  //Тема письма
  $mail->Subject = "Проверка отправной формы";

  //Тело письма
  $body = '<h1>Встречайте супер письмо!</h1>';

  if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['phone']))){
  $body.='<p><strong>Телефон:</strong>'.$_POST['phone'].'</p>';
  }
  if(trim(!empty($_POST['message']))){
  $body.='<p><strong>Сообщение:</strong>'.$_POST['message'].'</p>';
  }

  $mail->Body = $body;

  //отправляем
  if (!$mail->send()){
    $message = "Ошибка";
  } else {
    $message = "Данные отправлены"
  }

  $response = ["message" => $message];

  header("Content-type: application/json");
  echo json_encode($response);
?>

