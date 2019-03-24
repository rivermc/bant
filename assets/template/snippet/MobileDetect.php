<?php
include_once './assets/template/php/Mobile_Detect.php';
    $detect = new Mobile_Detect;

    if ($detect->isTablet() && $detect->isMobile()) {
         echo $tablet;
    }

    elseif  ($detect->isMobile()) {
        echo $mobile;
    }

    else {
        echo $desktop;
    }