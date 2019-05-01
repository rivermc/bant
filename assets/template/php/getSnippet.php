<?php

// Если запрос не AJAX или не передано действие, выходим
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest' || empty($_REQUEST['action'])) {exit();}


$action = $_REQUEST['action'];
$snippet = $_REQUEST['snippet'];
$tpl = $_REQUEST['tpl'];
$id = $_REQUEST['id'];
$tv = $_REQUEST['tv'];
$parents = $_REQUEST['parents'];


define('MODX_API_MODE', true);
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/index.php';
$modx->getService('error','error.modError');
$modx->getRequest();
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
$modx->error->message = null;
/*
$modx->log(1, print_r($action, 1));
$modx->log(1, print_r($snippet, 1));
$modx->log(1, print_r($tpl, 1));
$modx->log(1, print_r($id, 1));
$modx->log(1, print_r($tv, 1));
$modx->log(1, print_r($parents, 1));
*/

switch ($action) {
    case 'getCard':
        // Если не передан id страницы, тоже выходим
        $id = isset($_REQUEST['id']) ? (int) $_REQUEST['id'] : 0;
        if (empty($id)) {
            exit();
        };

        $runParams = array(
           'resources' => $id,
           'chunk' => $tpl,
           'includeTVs' => $tv,
           'parents' => $parents,
           'tpl' => $tpl,
           'includeContent' => '1'
        );

        //$modx->log(1, print_r($runParams, 1));

        $output = $modx->runSnippet($snippet, $runParams);


        //$output = $modx->getChunk($tpl, $runParams);
        //$object = $modx->getObject('modResource',$id);
        //$modx->log(1, print_r($output, 1));


        // Парсим теги MODX
       /* $maxIterations= (integer) $modx->getOption('parser_max_iterations', null, 10);
        $modx->getParser()->processElementTags('', $output, false, false, '[[', ']]', array(), $maxIterations);
        $modx->getParser()->processElementTags('', $output, true, true, '[[', ']]', array(), $maxIterations);*/
}

@session_write_close();
exit($output);