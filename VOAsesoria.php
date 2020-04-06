<?php
    header("Content-Type: text/html;charset=utf-8");
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    include ('php/asesoriaDAO.php');
    if($response['identificador']==1)
    {
        include ('php/materiaDAO.php');
        include ('php/periodoDAO.php');
                    
        $daoAsesoria=new asesoriaDAO();
        $asesoria=new asesoria();
        $daoMateria=new materiaDAO();
        $daoPeriodo=new periodoDAO();

        $idMateria=$daoMateria->consultaIdMateria($response['nombreMateria']);
        $idPeriodo=$daoPeriodo->consultaIdPeriodo($response['periodo']);

        $asesoria->setIdAsesoria($response['idAsesoria']);
        $asesoria->setHorasAsesorias($response['horasAsesoria']);
        $asesoria->setIdMateria($idMateria);
        $asesoria->setIdSalon($response['salon']);
        $asesoria->setIdPeriodo($idPeriodo);
        $asesoria->setMatriculaAsesor($response['matriculaAses']);
        $asesoria->setHorarioAsesoria($response['horario']);
        
        $result=$daoAsesoria->addAsesoria($asesoria);
        echo $result;
    }
    else if($response['identificador']==2)
    {
        $daoAsesoria=new asesoriaDAO();
        $result=$daoAsesoria->getListAsesorias(null,null);
        $json=json_encode($result);
        echo $json;
    }

    else if($response['identificador']==3)
    {
        $daoAsesoria=new asesoriaDAO();
        $result=$daoAsesoria->getListAsesorias($response['searchValue'],$response['typeSearch']);
        $json=json_encode($result);
        echo $json;
    }

    else if($response['identificador']==4)
    {
        $daoAsesoria=new asesoriaDAO();
        $result=$daoAsesoria->getListaByAsesor($response['idAsesor']);
        $json=json_encode($result);
        echo $json;
    }
?>