<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IAsesoria.php');
    require_once('asesoria.php');

    class asesoriaDAO implements IAsesoria
    {
        public function addAsesoria(asesoria $asesoria)
        {
            $data_source=new DataSource();
            $idAsesoria=$asesoria->getIdAsesoria();
            $query_duplicate="select * from asesoria where idAsesoria=".$idAsesoria."";
            $result_duplicate=$data_source->exeConsulta($query_duplicate);
            if($result_duplicate==null)
            {
                $sql="INSERT INTO asesoria VALUES (".$idAsesoria=$asesoria->getIdAsesoria().",
                '".$horasAsesoria=$asesoria->getHorasAsesorias()."',
                ".$idMateria=$asesoria->getIdMateria().",
                ".$idSalon=$asesoria->getIdSalon().",
                '".$matriculaAses=$asesoria->getMatriculaAsesor()."',
                ".$idPeriodo=$asesoria->getIdPeriodo().",
                '".$horarioAsesoria=$asesoria->getHorarioAsesoria()."')";
                $resultado=$data_source->exeCUD($sql);
                return $resultado;
            }
            else
            {
                return 'duplicate';
            }
        }

        public function getListAsesorias($value,$typeSearch)
        {
            $data_source=new DataSource();
            include ('materiaDAO.php');
            include ('periodoDAO.php');
            include ('salonDAO.php');
            include ('asesorDAO.php');
            $daoMateria=new materiaDAO();
            $daoPeriodo=new periodoDAO();
            $daoSalon=new salonDAO();
            $daoAsesor=new asesorDAO();
            
            if($value==null)
            {
                $hoy = getdate();
                $fecha="".$hoy['year']."-".$hoy['mon']."-".$hoy['mday']."";
                $periodo=$daoPeriodo->consultaIdPeriodo($fecha);
                $sql_lista="SELECT * FROM asesoria WHERE idPeriodo=".$periodo."";
                $lista=$data_source->exeConsulta($sql_lista);
                $result=Array();
                $nombresMateria=Array();
                $nombresAsesor=Array();
                $salones=Array();
                $i=0;
                foreach($lista as $row)
                {
                    $nombresMateria[]=$daoMateria->consultaNombreMateria($row['idMateria']);
                    $nombresAsesor[]=$daoAsesor->getNombreAsesor($row['matriculaAses']);
                    $salones[]=$daoSalon->getSalon($row['idSalon']);
                }
                unset($row);
                $salon=array_column($salones,'salon');
                $edificio=array_column($salones,'edificioSalon');
                foreach($lista as $row) 
                {
                    $result[]=Array('idAsesoria'=>$row['idAsesoria'],'nombreMateria'=>$nombresMateria[$i],'nombreAses'=>$nombresAsesor[$i],'salon'=>$salon[$i],'edificioSalon'=>$edificio[$i],'horarioAsesoria'=>$row['horarioAsesoria']);
                    $i++;
                }
                unset($row);
                return $result;
            }

            else
            {
                if($typeSearch=='idMateria')
                {
                    $sql_lista="SELECT * FROM asesoria WHERE idMateria=".$value."";
                    $lista=$data_source->exeConsulta($sql_lista);
                }
                else if($typeSearch=='idAsesor')
                {
                    $sql_lista="SELECT * FROM asesoria WHERE matriculaAses='".$value."'";
                    $lista=$data_source->exeConsulta($sql_lista);
                }
                else if($typeSearch=='idAsesoria')
                {
                    $sql_lista="SELECT * FROM asesoria WHERE idAsesoria='".$value."'";
                    $lista=$data_source->exeConsulta($sql_lista);
                }
                $result=Array();
                $nombresMateria=Array();
                $nombresAsesor=Array();
                $salones=Array();
                $i=0;
                foreach($lista as $row)
                {
                    $nombresMateria[]=$daoMateria->consultaNombreMateria($row['idMateria']);
                    $nombresAsesor[]=$daoAsesor->getNombreAsesor($row['matriculaAses']);
                    $salones[]=$daoSalon->getSalon($row['idSalon']);
                }
                unset($row);
                $salon=array_column($salones,'salon');
                $edificio=array_column($salones,'edificioSalon');
                foreach($lista as $row) 
                {
                    $result[]=Array('idAsesoria'=>$row['idAsesoria'],'nombreMateria'=>$nombresMateria[$i],'nombreAses'=>$nombresAsesor[$i],'salon'=>$salon[$i],'edificioSalon'=>$edificio[$i],'horarioAsesoria'=>$row['horarioAsesoria']);
                    $i++;
                }
                unset($row);
                return $result;
            }
        }
        public function getListaByAsesor($idAsesor)
        {
            include('php/periodoDAO.php');
            include('php/materiaDAO.php');
            $data_source=new DataSource();
            $daoMateria=new materiaDAO();
            $daoPeriodo=new periodoDAO();

            $sql_asesorias="SELECT * FROM asesoria WHERE matriculaAses='".$idAsesor."' ORDER BY idPeriodo DESC";
            $result_sql_asesorias=$data_source->exeConsulta($sql_asesorias);
            $result = Array();
            $nombresMateria = Array();
            $fechasPeriodo = Array();
            $i=0;

            foreach($result_sql_asesorias as $row)
            {
                $nombresMateria[]=$daoMateria->consultaNombreMateria($row['idMateria']);
                $fechasPeriodo[]=$daoPeriodo->getFechasPeriodo($row['idPeriodo']);
            }
            unset($row);
            $nombreMateria=array_column($nombresMateria,'nombreMateria');
            foreach($fechasPeriodo as $row)
            {
                $fechaInicio[]=array_column($row,'fechaInicio');
                $fechaFin[]=array_column($row,'fechaFin');
            }
            unset($row);
            foreach($result_sql_asesorias as $row)
            {
                $result[]=Array('idAsesoria'=>$row['idAsesoria'],'idPeriodo'=>$row['idPeriodo'],'nombreMateria'=>$nombresMateria[$i],'fechaInicio'=>$fechaInicio[$i],'fechaFin'=>$fechaFin[$i],'horasAsesoria'=>$row['horasAsesoria']);
                $i++;
            }
            unset($row);
            return $result;
        }
    }
?>