<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/carreraDAO.php');
    if($response['identificador']==1)
    {
        $result = Array();
        $DAOcarrera = new carreraDAO();
        $result=$DAOcarrera->getCarrerasValues($response['nombreCarrera']);
        $json=json_encode($result);
        echo $json;
    }
?>