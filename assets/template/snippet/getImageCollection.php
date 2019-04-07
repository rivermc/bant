<?php
$inputVal=trim($_POST["inputVal"]);
$inputVal=strip_tags($inputVal);
$inputName=trim($_POST["inputName"]);
$inputName=strip_tags($inputName);

if ($inputName != '') {
    $dir    = './assets/template/images/properties/upholdery/'. $inputVal;
    $imagesCollection = scandir($dir);
    $removeDotter = array_shift($imagesCollection);
    $removeDoubleDotter = array_shift($imagesCollection);
    $imagesCollection = json_encode($imagesCollection);
    return $imagesCollection;
}
else {
    return 0;
}