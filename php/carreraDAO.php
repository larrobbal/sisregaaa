<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('ICarrera.php');
    require_once('carrera.php');

    class carreraDAO implements ICarrera
    {
        public function getNombreCarrera($idCarrera)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT nombreCarrera FROM carrera WHERE idCarrera = ".$idCarrera."";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['nombreCarrera'];
        }
        public function getDivisionCarrera($idCarrera)
        {
            include('php/divisionDAO.php');
            $data_source = new DataSource();
            $daoDivision = new divisionDAO();
            $sql_idDivision = "SELECT idDivision FROM carrera WHERE idCarrera=".$idCarrera."";
            $result_idDivision = $data_source->exeConsulta($sql_idDivision);
            foreach($result_idDivision as $row)
            {
                $divisionCarrera = $daoDivision->getNombreDivision($row['idDivision']);                
            }
            unset($row);
            return $divisionCarrera;
        }
        public function getCarrerasValues($var)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT nombreCarrera FROM carrera WHERE nombreCarrera LIKE '%".$var."%'";
            $result = $data_source->exeConsulta($sql);
            return $result;
        }

        public function getIdCarrera($nombreCarrera)
        {
            $result = Array();
            $data_source = new DataSource();
            $sql = "SELECT idCarrera FROM carrera WHERE nombreCarrera ='".$nombreCarrera."'";
            $result = $data_source->exeConsulta($sql);
            return $result[0]['idCarrera'];
        }
    }
?>