<?php
    class periodo
    {
        private $idPeriodo;
        private $fechaInicio;
        private $fechaFin;

        public function setIdPeriodo($idPeriodo)
        {
            $this->idPeriodo = $idPeriodo;
        }
        public function getIdPeriodo()
        {
            return $this->idPeriodo;
        }

        public function setfechaInicio($fechaInicio)
        {
            $this->fechaInicio=$fechaInicio;
        }
        public function getFechaInicio()
        {
            return $this->fechaInicio;
        }

        public function setFechaFin($fechaFin)
        {
            $this->fechaFin=$fechaFin;
        }
        public function getFechaFin()
        {
            return $this->fechaFin;
        }
    }
?>