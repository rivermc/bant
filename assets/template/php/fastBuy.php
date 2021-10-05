<?php

define('MODX_API_MODE', true);
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/index.php';
$modx->getService('error','error.modError');
$modx->getRequest();
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
$modx->error->message = null;


$output = array();
$output['success'] = true;
// проверяем, что идет ajax запрос
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    // проверяем антиспам поля и ID ресурса
    if ($_REQUEST["user"]=='' && $_REQUEST["username"]=='' && $_REQUEST['id']) {
        // проверяем поле name
        /* if ($_REQUEST['name']=='') {
            $output['success'] = false;
            $output['message'] = "Заполните все обязательные поля";
            $output['fields'][] = "name";
        } */
        // проверяем поле email
        /*if($_REQUEST['email']==''){
            $output['success'] = false;
            $output['message'] = "Заполните все обязательные поля";
            $output['fields'][] = "email";
        }*/
        // проверяем поле phone
        if($_REQUEST['phone']==''){
            $output['success'] = false;
            $output['message'] = "Заполните все обязательные поля";
            $output['fields'][] = "phone";
        }
        // если проверка прошла успешно - оформляем заказ
        if($output['success']){
            // инициализируем miniShop2
            $scriptProperties = array(
        	  'json_response' => true,
        	  'max_count' => 1000,
        	  'allow_deleted' => false,
        	  'allow_unpublished' => false
        	);

        	$miniShop2 = $modx->getService('minishop2','miniShop2', MODX_CORE_PATH . 'components/minishop2/model/minishop2/', $scriptProperties);

        	// опции товара, если они необходимы
        	$option = array();
        	/*$option = array(
        	  "option1" => "value1",
        	  "option2" => "value2",
        	);*/
        	// инициализируем miniShop2 в текущем контексте
        	$miniShop2->initialize($modx->context->key, $scriptProperties);
        	// чистим корзину
        	$miniShop2->cart->clean();
        	// добавляем товар в корзину
        	$arr = json_decode($miniShop2->cart->add($_REQUEST["id"],1,$option), true);

        	// логируем каждый шаг
        	$modx->log(E_ERROR, print_r($arr,1));
        	// формируем заказ
        	$miniShop2->order->add('receiver', $_REQUEST['name']);
        	//$miniShop2->order->add('email', $_REQUEST["email"]);
        	$miniShop2->order->add('phone', $_REQUEST["phone"]);
        	$miniShop2->order->add('comment', $_REQUEST["text"]);
        	$miniShop2->order->add('index', $_REQUEST["index"]);
        	$miniShop2->order->add('region', $_REQUEST["region"]);
        	$miniShop2->order->add('city', $_REQUEST["city"]);
        	$miniShop2->order->add('street', $_REQUEST["street"]);
        	$miniShop2->order->add('building', $_REQUEST["building"]);
        	$miniShop2->order->add('room', $_REQUEST["room"]);
        	$miniShop2->order->add('payment', $_REQUEST["payment"]);
        	$miniShop2->order->add( 'delivery', $_REQUEST["delivery"]);
        	$miniShop2->order->add( 'pickupA', $_REQUEST["pickupA"]);
        	$miniShop2->order->add( 'nameShipping', $_REQUEST["nameShipping"]);
        	$miniShop2->order->add( 'phoneShipping', $_REQUEST["phoneShipping"]);
        	$miniShop2->order->add( 'dateShipping', $_REQUEST["dateShipping"]);
        	$miniShop2->order->add( 'addressShipping', $_REQUEST["addressShipping"]);
        	$miniShop2->order->add( 'textPostCard', $_REQUEST["textPostCard"]);
	        $orderfeed = $miniShop2->order->submit();

        	$arr = json_decode($orderfeed,true);

        	// логируем каждый шаг
        	$modx->log(E_ERROR, print_r($arr,1));

	        if($arr['success'] == true && $arr["data"]["msorder"]){
	            $output["order"] = $arr["data"]["msorder"];
	        }

            $output['success'] = true;
            $output['message'] = "Ваш заказ оформлен";
        	$modx->log(E_ERROR, print_r($output,1));
        }
    }
    else{
        $output['success'] = false;
        $output['message'] = "Данные не прошли проверку валидности или у вас не указан ID товара";
    }
}
else{
    $output['success'] = false;
    $output['message'] = "Данные не прошли проверку валидности, попробуйте позже";
}

echo json_encode($output);
