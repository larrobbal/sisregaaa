<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IEstatus.php');
    require_once('estatus.php');
    class estatusDAO implements IEstatus
    {
        public function getNombreEstatus($idEstatus)
        {
            $data_source=new DataSource();

            $sql="SELECT estatusMateria FROM estatus where idEstatus = '".$idEstatus."'";
            $result=$data_source->exeConsulta($sql);
            return $result[0]['estatusMateria'];
        }

        public function getEstatusData()
        {
            $data_source=new DataSource();

            $sql="SELECT * FROM estatus";
            $result=$data_source->exeConsulta($sql);
            return $result;
        }
    }
?>