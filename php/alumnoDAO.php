<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IAlumno.php');
    require_once('alumno.php');

    class alumnoDAO implements IAlumno
    {
        public function addAlumno($alumno)
        {
            $data_source=new DataSource();
            $idAlumno=$alumno->getIdAlumno();
            $query_duplicate="select * from alumno where idAlumno=".$idAlumno."";
            $result_duplicate=$data_source->exeConsulta($query_duplicate);
            if($result_duplicate==null)
            {
                $sql="INSERT INTO alumno VALUES ('".$alumno->getIdAlumno()."','".$alumno->getNombreAlumno()."',
                '".$alumno->getAppAlumno()."','".$alumno->getApmAlumno()."','".$alumno->getCurpAlum()."',
                '".$alumno->getTelAlumno()."','".$alumno->getMailAlumno()."','".$alumno->getDireccionAlumno()."',
                '".$alumno->getFechaInicio()."',NULL,1,".$alumno->getIdPlanEstudio().")";
                $resultado=$data_source->exeCUD($sql);
                return $resultado;
            }
            else
            {
                return 'duplicate';
            }
        }

        public function getDetalleAlumno($idAlumno)
        {
            $data_source = new DataSource();
            include('estatusAlumnoDAO.php');
            include('planDeEstudioDAO.php');
            $daoEstatusAlumno = new estatusAlumnoDAO();
            $daoPlanDeEstudio = new planDeEstudioDAO();

            $sql_alumno="SELECT * FROM alumno WHERE idAlumno = '".$idAlumno."'";
            $result_sql_alumno = $data_source->exeConsulta($sql_alumno);
            foreach($result_sql_alumno as $row)
            {
                $planEstu=$daoPlanDeEstudio->buscaNombrePlan($row['idPlanEstud']);
                $estatAlum=$daoEstatusAlumno->buscaEstatusAlumno($row['idEstatusAlumn']);
            }
            unset($row);
            foreach($result_sql_alumno as $row)
            {
                $result[]=Array('idAlumno'=>$row['idAlumno'],'nombreAlum'=>$row['nombreAlum'],'apPAlum'=>$row['apPAlum'],'apMAlum'=>$row['apMAlum'],'curpAlum'=>$row['curpAlum'],
                                'telAlum'=>$row['telAlum'],'mailAlum'=>$row['mailAlum'],'direccionAlum'=>$row['direccionAlum'],'fechaInicio'=>$row['fechaInicio'],'fechaFin'=>$row['fechaFin'],
                                'estAlum'=>$estatAlum,'planEstud'=>$planEstu);
            }
            unset($row);
            return $result;
        }

        public function getAlumnosActivos()
        {
            $data_source = new DataSource();
            $sql="SELECT idAlumno,nombreAlum,apPAlum,apMAlum FROM alumno";
            $result_alumno=$data_source->exeConsulta($sql);
            foreach($result_alumno as $row)
            {
                $result[]=Array('idAlumno'=>$row['idAlumno'],'nombreAlum'=>$row['nombreAlum'],'apPAlum'=>$row['apPAlum'],'apMAlum'=>$row['apMAlum']);
            }
            unset($row);
            return $result;
        }

        public function buscaNombreAlumno($idAlumno)
        {
            $data_source = new DataSource();
            $sql="SELECT idAlumno,nombreAlum,apPAlum,apMAlum FROM alumno WHERE idAlumno=".$idAlumno."";
            $result_alumno=$data_source->exeConsulta($sql);
            foreach($result_alumno as $row)
            {
                $result[]=Array('idAlumno'=>$row['idAlumno'],'nombreAlum'=>$row['nombreAlum'],'apPAlum'=>$row['apPAlum'],'apMAlum'=>$row['apMAlum']);
            }
            unset($row);
            return $result;
        }

        public function modificaAlumno($alumno,$idOriginal,$curpOriginal)
        {
            $data_source=new DataSource();
            if($idOriginal!=null&$curpOriginal!=null)
            {
                $sql="update alumno set idAlumno='".$alumno->getIdAlumno()."', nombreAlum='".$alumno->getNombreAlumno()."', 
                apPAlum='".$alumno->getAppAlumno()."', apMAlum='".$alumno->getApmAlumno()."', curpAlum='".$alumno->getCurpAlum()."', 
                telAlum='".$alumno->getTelAlumno()."', mailAlum='".$alumno->getMailAlumno()."', direccionAlum='".$alumno->getDireccionAlumno()."', 
                fechaInicio='".$alumno->getFechaInicio()."', fechaFin='".$alumno->getFechaFin()."', idEstatusAlumn=".$alumno->getIdEstatusAlumno().", 
                idPlanEstud=".$alumno->getIdPlanEstudio()." where idAlumno = '".$idOriginal."' and curpAlum = '".$curpOriginal."'";
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