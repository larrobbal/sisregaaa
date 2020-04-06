<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/estatusAlumnoDAO.php');
    if($response['identificador']==1)
    {
        $estatus = Array();
        $DAOestatusAlumno = new estatusAlumnoDAO();
        $estatus=$DAOestatusAlumno->getEstatusAlumno();
        $json=json_encode($estatus);
        echo $json;
    }
?>