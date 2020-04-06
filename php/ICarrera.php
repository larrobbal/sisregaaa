<?php
    interface ICarrera
    {
        public function getNombreCarrera($idCarrera);
        public function getDivisionCarrera($idCarrera);
        public function getCarrerasValues($var);
        public function getIdCarrera($nombreCarrera);
    }
?>