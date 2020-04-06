<?php
    require_once('dataSource.php');
    require_once('IPlanDeEstudio.php');
    require_once('planDeEstudio.php');

    class planDeEstudioDAO implements IPlanDeEstudio
    {
        public function buscaNombrePlan($idPlanDeEstudio)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT planEstud FROM planDeEstudio WHERE idPlanEstud = ".$idPlanDeEstudio."";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['planEstud'];
        }

        public function getPlanEstudio()
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT * FROM planDeEstudio";
            $result = $data_source->exeConsulta($sql);
            return $result;
        }
    }
?>