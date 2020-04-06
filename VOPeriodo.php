<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/periodoDAO.php');
    if($response['identificador']==1)
    {
        $daoPeriodo=new periodoDAO();
        $actual_period = $daoPeriodo->consultaIdPeriodo($response['fecha']);
        $json=json_encode($actual_period);
        echo $json;
    }

    if($response['identificador']==2)
    {
        $daoPeriodo=new periodoDAO();
        $reposne=$daoPeriodo->creaPeriodo($response['fechaInicio'],$response['fechaFin']);
        $json=json_encode($reposne);
        echo $json;
    }
?>