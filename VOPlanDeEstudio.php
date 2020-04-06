<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/planDeEstudioDAO.php');
    if($response['identificador']==1)
    {
        $estatus = Array();
        $DAOplanDeEstudioDAO = new planDeEstudioDAO();
        $estatus=$DAOplanDeEstudioDAO->getPlanEstudio();
        $json=json_encode($estatus);
        echo $json;
    }
?>