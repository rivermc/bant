<?php

$phone=trim($_POST["phone"]);
$phone=strip_tags($phone);
$expert=trim($_POST["expert"]);
$expert=strip_tags($expert);
$email=trim($_POST["mail"]);
$email=strip_tags($email);
$IDForm=trim($_POST["IDForm"]);
$IDForm=strip_tags($IDForm);
$check=trim($_POST["check"]);
$check=strip_tags($check);
$fileTmp=trim($_FILES["file"]['tmp_name']);
$fileTmp=strip_tags($fileTmp);
$fileName=trim($_FILES["file"]['name']);
$fileName=strip_tags($fileName);





if ( ($_POST['check'] == 'on')  AND ($phone != '') ) {


/* ----------------------------------------------------------------------- */
/* Files Send */
/* ----------------------------------------------------------------------- */


          $newFilename = dirname(dirname(__FILE__)). '/upload/1' . uniqid();
          $uploadInfo = $_FILES['file'];

            switch ($uploadInfo['type']) {
                case 'text/plain':
                    $newFilename .= '.txt';
                    break;

                case 'application/pdf':
                    $newFilename .= '.pdf';
                    break;

                case 'application/vnd.ms-excel':
                    $newFilename .= '.xls';
                    break;

                case 'application/vnd.ms-excel':
                    $newFilename .= '.xlsx';
                    break;

                case 'application/msword':
                    $newFilename .= '.doc';
                    break;

                case 'application/msword':
                    $newFilename .= '.docx';
                    break;

                case 'image/gif':
                    $newFilename .= '.gif';
                    break;

                case 'image/jpeg':
                    $newFilename .= '.jpeg';
                    break;

                case 'image/jpeg':
                    $newFilename .= '.jpg';
                    break;

                case 'image/png':
                    $newFilename .= '.png';
                    break;

                default:
                    ?>
                    <script>
                      $('.error.' + '<?php echo $IDForm; ?>').html('<p class="thanks">Данный тип файла не поддерживается</p>');
                    </script>
                    <?php
                    exit;
            }

          //Перемещаем файл из временной папки в указанную
          if (move_uploaded_file($fileTmp, $newFilename)) {

              ?>
              <script>
                $('.error.' + '<?php echo $IDForm; ?>').html('<p class="thanks">Файл сохранен под именем <?php echo $newFilename; ?></p>');
              </script>
              <?php

          } else {
              ?>
              <script>
                $('.error.' + '<?php echo $IDForm; ?>').html('<p class="thanks">Не удалось осуществить сохранение файла</p>');
              </script>
              <?php
          }  





/* ----------------------------------------------------------------------- */
/* Email Send */
/* ----------------------------------------------------------------------- */

        
          $thanks = "Спасибо! Ваша заявка отправлена!";
          $theme = "Пришла заявка на экспертизу: " . $expert;
          $emailTo= "web@2f-vsk.ru";
          $emailFrom="web@2f-vsk.ru";

          $emailTitle = iconv("utf-8","windows-1251",$theme);
          $emailTitle = convert_cyr_string($emailTitle, "w", "k");
          
          $emailText="<html><head></head><body>";
          $emailText.="<b>Тема:</b> {$theme}<br>";
          $emailText.="<b>Телефон:</b> {$phone}<br>";  
          $emailText.="<b>Почта:</b> {$email}<br>";  
          $emailText.="<b>Экспертиза:</b> {$expert}<br>";  
          $emailText.="</body></html>";

          $emailText=iconv("utf-8","windows-1251",$emailText);
          $emailText=convert_cyr_string($emailText, "w", "k");

          function xmail( $from, $to, $subj, $text, $filename) {
            $f         = fopen($filename,"rb");
            $un        = strtoupper(uniqid(time()));
            $head      = "From: $from\n";
            $head     .= "Subject: $subj\n";
            $head     .= "X-Mailer: PHPMail Tool\n";
            $head     .= "Mime-Version: 1.0\n";
            $head     .= "Content-Type:multipart/mixed;";
            $head     .= "boundary=\"----------".$un."\"\n\n";
            $zag       = "------------".$un."\nContent-Type:text/html;\n";
            $zag      .= "Content-Transfer-Encoding: 8bit\n\n$text\n\n";
            $zag      .= "------------".$un."\n";
            $zag      .= "Content-Type: application/octet-stream;";
            $zag      .= "name=\"".basename($filename)."\"\n";
            $zag      .= "Content-Transfer-Encoding:base64\n";
            $zag      .= "Content-Disposition:attachment;";
            $zag      .= "filename=\"".basename($filename)."\"\n\n";
            $zag      .= chunk_split(base64_encode(fread($f,filesize($filename))))."\n";
             
            return @mail("$to", "$subj", $zag, $head);
          };

          xmail($emailFrom, $emailTo, $emailTitle, $emailText, $newFilename);
    



//-------------------------------------------------------------------------//
    // Send To Telegram//
//-------------------------------------------------------------------------//

      /*
        http://smartlanding.biz/otpravka-dannyx-formy-v-telegram.html
        https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates
       */



          $token = "690840385:AAG8HjfPgrJcauluETg2ew3gGmdPjz6uGwI";
          $chat_id = "-229379777";
          $arr = array(
            "Тема: " => $theme,
            "Телефон: " => $phone,
            "Почта: " => $email,
            "Экспертиза: " => $expert,
            "Вложение: " => $newFilename
          );
          foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b> ".$value."%0A";
          };

          $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


          ?>
          <script>
            $('#' + '<?php echo $IDForm; ?>').hide();
            $('.error.' + '<?php echo $IDForm; ?>').html('<p class="thanks"><?php echo $thanks;?></p>');
          </script>
          <?php


}


else {
         if ($_POST['check'] != "on") {

              ?>
               <script>
                  $('#' + '<?php echo $IDForm; ?>' + ' .policy-check').addClass('shake').delay(800).queue(function(next){ $('.policy-check').removeClass('shake');  next(); });
                </script>
              <?php

         }
         else {

              ?> 
               <script>
                  $('#' + '<?php echo $IDForm; ?>' + ' input.phone').addClass('shake').delay(800).queue(function(next){ $('#' + '<?php echo $IDForm; ?> input.phone').removeClass('shake');  next(); });
                </script>
              <?php

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








?>
