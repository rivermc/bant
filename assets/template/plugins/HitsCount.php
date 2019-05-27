<?php

switch ($modx->event->name) {
    case 'OnLoadWebDocument':
        if ($modx->resource->get('template') == 8) {
            $page = $modx->getObject('modResource', $modx->resource->get('id'));
            $hits = $page->getTVValue('HitsPage');
            $page->setTVValue('HitsPage', intval($hits) + 1);
        }
		break;
}