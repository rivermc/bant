<?php
$children = $modx->getParentIds($parent,1);
$children = array_reverse($children);
return $children[$count];