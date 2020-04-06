<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/ListaAsesoriaDAO.php');
    if($response['identificador']==1)
    {
        $registroListaAsesoria = new listaAsesoria();
        $daoListaAsesoria = new ListaAsesoriaDAO();
        $registroListaAsesoria->setIdAlumno($response['idAlumno']);
        $registroListaAsesoria->setIdAsesoria($response['idAsesoria']);
        $res=$daoListaAsesoria->addRegistroLista($registroListaAsesoria);
        echo $res;
    }
    if($response['identificador']==2)
    {
        $daoListaAsesoria = new ListaAsesoriaDAO();
        $res=$daoListaAsesoria->getListDetail($response['searchValue']);
        $json=json_encode($res);
        echo $json;
    }
?>