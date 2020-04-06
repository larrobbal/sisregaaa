<?php
    require_once('dataSource.php');
    require_once('ISalon.php');
    require_once('salon.php');

    class salonDAO implements ISalon
    {
        public function getSalon($idSalon)
        {
            $result = Array();
            $data_source=new DataSource();
            $sql="SELECT salon, edificioSalon FROM salon WHERE idSalon LIKE ".$idSalon."";
            $result=$data_source->exeConsulta($sql);
            return $salones=Array('salon'=>$result[0]['salon'],'edificioSalon'=>$result[0]['edificioSalon']);
        }
    }
?>