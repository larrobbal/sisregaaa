<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IEstatusMateria.php');
    require_once('estatusMateria.php');

    class estatusMateriaDAO implements IEstatusMateria
    {
        public function getInfoMaterias($idAlumno)
        {
            include('materiaDAO.php');
            include('estatusDAO.php');
            $daoMateria = new materiaDAO();
            $daoEstatus = new estatusDAO();
            $data_source=new DataSource();

            $sql_lista_materias="SELECT * FROM estatusmateria where idAlumno = '".$idAlumno."'";
            $lista=$data_source->exeConsulta($sql_lista_materias);
            $result=Array();
            $nombresMateria=Array();
            $estatusMateria=Array();
            $i=0;
            foreach($lista as $row)
            {
                $nombresMateria[]=$daoMateria->consultaNombreMateria($row['idMateria']);
                $estatusMateria[]=$daoEstatus->getNombreEstatus($row['idEstatus']);
            }
            unset($row);
            foreach($lista as $row)
            {
                $result[]=Array('idAlumno'=>$row['idAlumno'],'idMateria'=>$row['idMateria'],'nombreMateria'=>$nombresMateria[$i],'calificacion'=>$row['calificacion'],'estatus'=>$estatusMateria[$i],'fechaExamen'=>$row['fechaExamen']);
                $i++;
            }
            unset($row);
            return $result;
        }
        public function addEstatusMateria(estatusMateria $estatusMateria)
        {
            $data_source=new DataSource();
            $sql="INSERT INTO estatusMateria VALUES('".$estatusMateria->getIdAlumno()."',".$estatusMateria->getIdMateria().",
                 ".$estatusMateria->getCalificacion().",".$estatusMateria->getIdEstatus().",'".$estatusMateria->getFechaExamen()."')";
            $result=$data_source->exeCUD($sql);
            return $result;
        }
    }
?>