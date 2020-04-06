<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json=file_get_contents('php://input');
    $response=json_decode($str_json,true);
    include ('php/asesorDAO.php');
    if($response['identificador']==1)
    {
        $daoAsesor = new asesorDAO();
        $result=$daoAsesor->searchForIdAsesor($response['matriculaAses']);
        if($result!=null)
        {
            $json = json_encode($result);
            echo $json;
        }
        else
            return -1;
    }
    if($response['identificador']==2)
    {
        $daoAsesor = new asesorDAO();
        $result=$daoAsesor->getDataAsesores($response['matriculaAses']);
        $json = json_encode($result);
        echo $json;
    }

    if($response['identificador']==3)
    {
        $daoAsesor = new asesorDAO();
        $result = $daoAsesor->searchNombres();
        $json = json_encode($result);
        echo $json;
    }

    if($response['identificador']==4)
    {
        $daoAsesor = new asesorDAO();
        $result = $daoAsesor->addAsesor($response);
        $json = json_encode($result);
        echo $json;
    }

    if($response['identificador']==5)
    {
        $daoAsesor = new asesorDAO();
        $result = $daoAsesor->modificaAsesor($response);
        $json = json_encode($result);
        echo $json;
    }
?>