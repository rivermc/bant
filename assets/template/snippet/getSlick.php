<?php

$ids_array = explode(',', $ids);
$output;

foreach ($ids_array as $value) {
    $output .= $modx->getChunk('SlickCatalog',array(
       'idParent' => $value,
       'class' => 'slick__main'
    ));
}
return $output;