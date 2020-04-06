<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/estatusMateriaDAO.php');
    if($response['identificador']==1)
    {
        $result = Array();
        $DAOestatusMateria = new estatusMateriaDAO();
        $result=$DAOestatusMateria->getInfoMaterias($response['idAlumno']);
        $json=json_encode($result);
        echo $json;
    }

    if($response['identificador']==2)
    {
        $result = Array();
        $DAOestatusMateria = new estatusMateriaDAO();
        $estatusMateria = new estatusMateria();
        $estatusMateria->setIdAlumno($response['idAlumno']);
        $estatusMateria->setIdMateria($response['idMateria']);
        $estatusMateria->setCalificacion($response['calificacion']);
        $estatusMateria->setIdEstatus($response['idEstatus']);
        $estatusMateria->setFechaExamen($response['fechaExamen']);
        $result=$DAOestatusMateria->addEstatusMateria($estatusMateria);
        $json=json_encode($result);
        echo $json;
    }
?>