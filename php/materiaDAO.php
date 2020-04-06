<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IMateria.php');
    require_once('materia.php');

    class materiaDAO implements IMateria
    {
        public function consultaIdMateria($nombreMateria)
        {
            $result = Array();
            $data_source=new DataSource();
            $sql="SELECT idMateria FROM materia WHERE nombreMateria LIKE '".$nombreMateria."'";
            $result=$data_source->exeConsulta($sql);
            return $result[0]["idMateria"];
        }

        public function consultaNombreMateria($idMateria)
        {
            $result = Array();
            $data_source=new DataSource();
            $sql="SELECT nombreMateria FROM materia WHERE idMateria = '".$idMateria."'";
            $result=$data_source->exeConsulta($sql);
            if($result!=null)
            return $result[0]["nombreMateria"];
        }
    }
?>