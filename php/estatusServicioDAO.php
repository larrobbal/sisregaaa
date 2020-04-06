<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IEstatusServicio.php');
    require_once('estatusServicio.php');

    class estatusServicioDAO implements IEstatusServicio
    {
        public function getEstatusServicio($idEstatusServ)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT estServ FROM estatusServicio WHERE idEstatusServ = ".$idEstatusServ."";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['estServ'];
        }

        public function getIdEstatus($EstatusServ)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT idEstatusServ FROM estatusServicio WHERE estServ = ".$EstatusServ."";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['idEstatusServ'];
        }

        public function getEstatus()
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT * FROM estatusServicio";
            $result = $data_source->exeConsulta($sql);
            return $result;
        }
    }
?>