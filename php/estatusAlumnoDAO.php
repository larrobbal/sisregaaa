<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IEstatusAlumno.php');
    require_once('estatusAlumno.php');

    class estatusAlumnoDAO implements IEstatusAlumno
    {
        public function buscaEstatusAlumno($idEstatusAlum)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT estAlum FROM estatusAlumno WHERE idEstatusAlum = ".$idEstatusAlum."";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['estAlum'];
        }

        public function getEstatusAlumno()
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT * FROM estatusAlumno";
            $result = $data_source->exeConsulta($sql);
            return $result;
        }
    }
?>