<?php
$dir = './assets/template/images/' . $url_img;
    $imagesCollection = scandir($dir);
    $removeDotter = array_shift($imagesCollection);
    $removeDoubleDotter = array_shift($imagesCollection);
    $imagesCollection = json_encode($imagesCollection);
    $imagesCollection = str_replace('[', '', $imagesCollection);
    $imagesCollection = str_replace('"', '', $imagesCollection);
    $imagesCollection = str_replace(']', '', $imagesCollection);
    $imagesCollection = explode(',',$imagesCollection);
    foreach ($imagesCollection as $value) {
      echo '<img src="' . $dir . $value . '">';
    }