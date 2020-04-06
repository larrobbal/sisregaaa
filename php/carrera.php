<?php
    class carrera
    {
        private $idCarrera;
        private $nombreCarrera;
        private $idDivision;

        public function getIdCarrera()
        {
            return $this->idCarrera;
        }

        public function getNombreCarrera()
        {
            return $this->nombreCarrera;
        }

        public function getIdDivision()
        {
            return $this->idDivision;
        }
    }
?>