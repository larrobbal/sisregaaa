<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/alumnoDAO.php');
    if($response['identificador']==1)
    {
        $daoAlumno=new alumnoDAO();
        $alumno=new alumno();

        $alumno->setIdAlumno($response['idAlumno']);
        $alumno->setNombreAlumno($response['nombreAlum']);
        $alumno->setAppAlumno($response['apPAlum']);
        $alumno->setApmAlumno($response['apMAlum']);
        $alumno->setCurpAlum($response['curpAlum']);
        $alumno->setTelAlumno($response['telAlum']);
        $alumno->setMailAlumno($response['mailAlum']);
        $alumno->setDireccionAlumno($response['direccionAlum']);
        $alumno->setFechaInicio($response['fechaInicio']);
        $alumno->setIdPlanEstudio($response['idPlanEstud']);
        
        $result=$daoAlumno->addAlumno($alumno);
        echo $result;
    }
    else if($response['identificador']==2)
    {
        $daoAlumno=new alumnoDAO();
        $result=$daoAlumno->getDetalleAlumno($response['idAlumno']);
        $json=json_encode($result);
        echo $json;
    }
    else if($response['identificador']==4)
    {
        $daoAlumno=new alumnoDAO();
        $result=$daoAlumno->getAlumnosActivos();
        $json=json_encode($result);
        echo $json;
    }
    else if($response['identificador']==5)
    {
        $daoAlumno=new alumnoDAO();
        $alumno=new alumno();

        $alumno->setIdAlumno($response['idAlumno']);
        $alumno->setNombreAlumno($response['nombreAlum']);
        $alumno->setAppAlumno($response['apPAlum']);
        $alumno->setApmAlumno($response['apMAlum']);
        $alumno->setCurpAlum($response['curpAlum']);
        $alumno->setTelAlumno($response['telAlum']);
        $alumno->setMailAlumno($response['mailAlum']);
        $alumno->setDireccionAlumno($response['direccionAlum']);
        $alumno->setFechaInicio($response['fechaInicio']);
        $alumno->setFechaFin($response['fechaFin']);
        $alumno->setIdPlanEstudio($response['idPlanEstud']);
        $alumno->setIdEstatusAlumno($response['idEstatusAlum']);
        $idOriginal=$response['idOriginal'];
        $curpOriginal=$response['curpOriginal'];
        $result=$daoAlumno->modificaAlumno($alumno,$idOriginal,$curpOriginal);
        echo $result;
    }
?>