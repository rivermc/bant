<?php

$phone=trim($_POST["phone"]);
$phone=strip_tags($phone);
$IDForm=trim($_POST["IDForm"]);
$IDForm=strip_tags($IDForm);
$thanks = "Спасибо! Ваша заявка отправлена!";
$theme = 'Пришла заявка Bant';

//-------------------------------------------------------------------------//
    // Send To Email //
//-------------------------------------------------------------------------//

if ( $phone != '' ) {
          
  $emailTo = "web@2f-vsk.ru, tyrina_svetlana@mail.ru, bant_floristic@mail.ru, info@bant-buket.ru, m_protasev@mail.ru";
  $emailFrom ="web@2f-vsk.ru";

  $emailTitle = $theme;
  $emailTitle = iconv("utf-8","windows-1251",$emailTitle);
  $emailTitle = convert_cyr_string($emailTitle, "w", "k");

  $emailText="<html><head></head><body>";
  $emailText.="<p><b>Тема:</b> {$theme}</p>";
  $emailText.="<p><b>Телефон:</b> {$phone}</p>";
  $emailText.="</body></html>";
  $emailText=iconv("utf-8","windows-1251",$emailText);
  $emailText=convert_cyr_string($emailText, "w", "k");

  $emailHeaders="MIME-Version: 1.0\r\n";
  $emailHeaders.="Content-Type: text/html; charset=koi8-r\r\n";
  $emailHeaders.="From: $emailFrom\r\n";

  mail($emailTo, $emailTitle, $emailText, $emailHeaders);
  echo 'true';
}

?>