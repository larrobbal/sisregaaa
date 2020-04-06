<?php
    class asesor
    {
        private $matriculaAses;
        private $nombreAses;
        private $appAses;
        private $apmAses;
        private $idCarrera;
        private $telAses;
        private $mailAses;
        private $fechaInicio;
        private $fechaFin;
        private $idEstatusServ;

        public function setMatriculaAses($matriculaAses)
        {
            $this->matriculaAses=$matriculaAses;
        }
        public function getMatriculaAses()
        {
            return $this->matriculaAses;
        }

        public function setNombreAses($nombreAses)
        {
            $this->nombreAses=$nombreAses;
        }
        public function getNombreAses()
        {
            return $this->nombreAses;
        }

        public function setAppAses($appAses)
        {
            $this->appAses=$appAses;
        }
        public function getAppAses()
        {
            return $this->appAses;
        }

        public function setApmAses($apmAses)
        {
            $this->apmAses=$apmAses;
        }
        public function getApmAses()
        {
            return $this->apmAses;
        }

        public function setIdCarrera($idCarrera)
        {
            $this->idCarrera=$idCarrera;
        }
        public function getIdCarrera()
        {
            return $this->idCarrera;
        }

        public function setTelAses($telAses)
        {
            $this->telAses=$telAses;
        }
        public function getTelAses()
        {
            return $this->telAses;
        }

        public function setMailAses($mailAses)
        {
            $this->mailAses=$mailAses;
        }
        public function getMailAses()
        {
            return $this->mailAses;
        }

        public function setFechaInicio($fechaInicio)
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

        public function setIdEstatusServ($idEstatusServ)
        {
            $this->idEstatusServ=$idEstatusServ;
        }
        public function getIdEstatusServ()
        {
            return $this->idEstatusServ;
        }
    }
?>