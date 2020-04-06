<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IAsesor.php');
    require_once('asesor.php');

    class asesorDAO implements IAsesor
    {
        public function getNombreAsesor($matriculaAsesor)
        {
            $result= Array();
            $data_source=new DataSource();
            $sql = "SELECT nombreAses FROM asesor WHERE matriculaAses LIKE '".$matriculaAsesor."'";
            $result=$data_source->exeConsulta($sql);
            return $result[0]['nombreAses'];
        }

        public function searchForIdAsesor($matriculaAsesor)
        {
            $result=Array();
            $data_source=new DataSource();
            $sql = "SELECT nombreAses,apPAses,apMAses from asesor where matriculaAses = '".$matriculaAsesor."'";
            $result=$data_source->exeConsulta($sql);
            return $result;
        }

        public function searchNombres()
        {
            $result=Array();
            $data_source=new DataSource();
            $sql = "SELECT matriculaAses,nombreAses,apPAses,apMAses from asesor";
            $result=$data_source->exeConsulta($sql);
            return $result;
        }

        public function getDataAsesores($matriculaAsesor)
        {
            $data_source=new DataSource();
            include('php/carreraDAO.php');
            include('php/estatusServicioDAO.php');
            $daoCarrera = new carreraDAO();
            $daoEstatusServicio = new estatusServicioDAO();
            $result=Array();
            $sql = "SELECT * FROM asesor WHERE matriculaAses= '$matriculaAsesor' ";
            $result_sql=$data_source->exeConsulta($sql);
            foreach($result_sql as $row)
            {
                $nombreCarrea=$daoCarrera->getNombreCarrera($row['idCarrera']);
                $division=$daoCarrera->getDivisionCarrera($row['idCarrera']);
                $estatus=$daoEstatusServicio->getEstatusServicio($row['idEstatusServ']);
            }
            unset($row);
            foreach($result_sql as $row)
            {
                $result[]=Array('matriculaAses'=>$row['matriculaAses'],'nombreAses'=>$row['nombreAses'],'apPAses'=>$row['apPAses'],'apMAses'=>$row['apMAses'],'carrera'=>$nombreCarrea,
                                    'division'=>$division,'telAses'=>$row['telAses'],'mailAses'=>$row['mailAses'],'fechaInicio'=>$row['fechaInicio'],'fechaFin'=>$row['fechaFin'],
                                    'estServ'=>$estatus);
            }
            unset($row);
            return $result;
        }

        public function addAsesor($response)
        {
            $data_source=new DataSource();
            include('php/carreraDAO.php');
            include('php/estatusServicioDAO.php');
            $data_source=new DataSource();
            $daoCarrera=new carreraDAO();

            $matricula=$response['matriculaAsesor'];
            $nombre=$response['nombreAses'];
            $app=$response['apPAses'];
            $apm=$response['apMAses'];
            $telefono=$response['telAses'];
            $mail=$response['mailAses'];
            $fechaInicio=$response['fechaInicio'];

            $idCarrera=$daoCarrera->getIdCarrera($response['carrera']);
            $sql_duplicate = "SELECT * FROM asesor WHERE matriculaAses='".$matricula."'";
            $result_duplicate=$data_source->exeConsulta($sql_duplicate);
            if($result_duplicate==NULL)
            {
                $sql="INSERT INTO asesor VALUES ('".$matricula."','".$nombre."','".$app."','".$apm."',".$idCarrera.",'".$telefono."','".$mail."','".$fechaInicio."','0000-00-00',1)";
                $result=$data_source->exeCUD($sql);
                return $result;
            }
            else
                return 'duplicate';

        }
        public function modificaAsesor($response)
        {
            $data_source=new DataSource();
            if($response['matriculaOriginal']!=null)
            {
                include('php/carreraDAO.php');
                $daoCarrera=new carreraDAO();
                $idCarrera=$daoCarrera->getIdCarrera($response['nombreCarrera']);

                $matricula=$response['matriculaAses'];
                $nombre=$response['nombreAses'];
                $app=$response['apPAses'];
                $apm=$response['apMAses'];
                $telefono=$response['telAses'];
                $mail=$response['mailAses'];
                $fechaInicio=$response['fechaInicio'];
                $fechaFin=$response['fechaFin'];
                $idEstatus=$response['idEstatusServ'];
                $matriculaOriginal = $response['matriculaOriginal'];

                $sql="UPDATE asesor SET matriculaAses='".$matricula."', nombreAses='".$nombre."', apPAses='".$app."', 
                apMAses='".$apm."', idCarrera=".$idCarrera.", telAses='".$telefono."', mailAses='".$mail."', fechaInicio='".$fechaInicio."', 
                fechaFin='".$fechaFin."', idEstatusServ=".$idEstatus." WHERE matriculaAses='".$matriculaOriginal."'";
                $resultado=$data_source->exeCUD($sql);
                return $resultado;
            }
            else
            {
                return 'not_alumn';
            }
        }
    }
?>