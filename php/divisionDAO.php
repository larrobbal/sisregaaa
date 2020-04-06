<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IDivision.php');
    require_once('division.php');

    class divisionDAO implements IDivision
    {
        public function getNombreDivision($idDivision)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT division FROM division WHERE idDivision = ".$idDivision."";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['division'];
        }
    }
?>