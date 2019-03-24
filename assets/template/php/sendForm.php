<?php

$phone=trim($_POST["phone"]);
$phone=strip_tags($phone);
$name=trim($_POST["name"]);
$name=strip_tags($name);
$check=trim($_POST["check"]);
$check=strip_tags($check);
$theme = 'Пришла заявка на обратный звонок с сайта Senator.ru';




if ( ($_POST['check'] == 'on')  AND ($phone != '') ) {

//-------------------------------------------------------------------------//
    // Send To Email //
//-------------------------------------------------------------------------//
          
  $emailTo = "web@2f-vsk.ru";
  $emailFrom ="web@2f-vsk.ru";

  $emailTitle = $theme;
  $emailTitle = iconv("utf-8","windows-1251",$emailTitle);
  $emailTitle = convert_cyr_string($emailTitle, "w", "k");

  $emailText="<html><head></head><body>";
  $emailText.="<b>Имя:</b> {$name}<br>";
  $emailText.="<b>Телефон:</b> {$phone}"; 
  $emailText.="</body></html>";
  $emailText=iconv("utf-8","windows-1251",$emailText);
  $emailText=convert_cyr_string($emailText, "w", "k");

  $emailHeaders="MIME-Version: 1.0\r\n";
  $emailHeaders.="Content-Type: text/html; charset=koi8-r\r\n";
  $emailHeaders.="From: $emailFrom\r\n";

  mail($emailTo, $emailTitle, $emailText, $emailHeaders);
  echo 'true';
}

else {
   if ($_POST['check'] != "on") {
       echo 'policy';
   }
   else {
      echo 'phone';
   }
}



//-------------------------------------------------------------------------//
    // Send To Sheets//
//-------------------------------------------------------------------------//

/*
      $phone = preg_replace('~\D~','',$phone);
      $sheet = '1ke-9Y5n8wqaIptJ2oCPc_x2IJsr_YzpzPYm5f6q13sU';
      $themeSheets = 'PromoCode';

      $sendToSheets = fopen("https://script.google.com/macros/s/AKfycbxeoJP5ImxIb73dJbMOPcYhj_lXNdk2kAgW5Qjw/exec?p1={$code}&p2={$phone}&p3={$sheet}&p4={$themeSheets}","r");
*/

//-------------------------------------------------------------------------//
    // Send To SMSAero//
//-------------------------------------------------------------------------//

  
  /*
      $loginSms = 'ychiginceva@ya.ru';
      $passwordSms = md5('Zse750zse750');
      $toSms = preg_replace('~\D~','',$phone);
      $textSms = 'Промо-код от Steam-Tailor.ru на скидку 10%: ' . $code . ', действует 3 месяца' ;
      $fromSms = 'SMS Aero';

      $sendToSms = fopen("https://gate.smsaero.ru/send/?user={$loginSms}&password={$passwordSms}&to={$toSms}&text={$textSms}&from={$fromSms}","r");

*/



//-------------------------------------------------------------------------//
    // Send To Telegram//
//-------------------------------------------------------------------------//

      /*
        http://smartlanding.biz/otpravka-dannyx-formy-v-telegram.html
        https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates
       */

/*

          $token = "669717612:AAFj7WrO39W9HDIkOnlQ5PNdOH-PY0dNP44";
          $chat_id = "-263514402";
          $arr = array(
            "Тема: " => $theme,
            "Продукт: " => $product,
            "Телефон: " => $phone
          );
          foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b> ".$value."%0A";
          };

          $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

*/






?>
