<?php
$inputVal=trim($_POST["inputVal"]);
$inputVal=strip_tags($inputVal);
$inputName=trim($_POST["inputName"]);
$inputName=strip_tags($inputName);

if ($inputName != '') {

    $paramName = 'kre_' . $inputName;
    $obj = $modx->getObject('modResource', 1);

    if ($obj) {
        $arra = array();
        $obj_param = $obj->getTVValue($paramName);
        $obj_param = json_decode($obj_param);

        $k = 0;
        foreach ($obj_param as $key => $value) {
            foreach ($value as $i => $val) {
                $arra[$k][$i] =  $val;
            }
            $k++;
        }

        for ($i=0; $i < count($arra); $i++) {
            if ($arra[$i]['title'] == $inputVal) {
                $priceItem = $arra[$i]['price'];
                return $priceItem;
            }
        }
    }
}
else {
    return 0;
}