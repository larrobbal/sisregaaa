<?php
    class alumno
    {
        private $idAlumno;
        private $nombreAlum;
        private $appAlum;
        private $apmAlum;
        private $curpAlum;
        private $telAlum;
        private $mailAlum;
        private $direccionAlum;
        private $fechaInicio;
        private $fechaFin;
        private $idEstatusAlum;
        private $idPlanEstud;

        public function setIdAlumno($idAlumno)
        {
            $this->idAlumno=$idAlumno;
        }

        public function getIdAlumno()
        {
            return $this->idAlumno;
        }

        public function setNombreAlumno($nombreAlum)
        {
            $this->nombreAlum=$nombreAlum;
        }
        public function getNombreAlumno()
        {
            return $this->nombreAlum;
        }

        public function setAppAlumno($appAlum)
        {
            $this->appAlum=$appAlum;
        }
        public function getAppAlumno()
        {
            return $this->appAlum;
        }

        public function setApmAlumno($apmAlum)
        {
            $this->apmAlum=$apmAlum;
        }
        public function getApmAlumno()
        {
            return $this->apmAlum;
        }

        public function setCurpAlum($curpAlum)
        {
            $this->curpAlum=$curpAlum;
        }
        public function getCurpAlum()
        {
            return $this->curpAlum;
        }

        public function setTelAlumno($telAlum)
        {
            $this->telAlum=$telAlum;
        }
        public function getTelAlumno()
        {
            return $this->telAlum;
        }

        public function setMailAlumno($mailAlum)
        {
            $this->mailAlum=$mailAlum;
        }
        public function getMailAlumno()
        {
            return $this->mailAlum;
        }

        public function setDireccionAlumno($direccionAlum)
        {
            $this->direccionAlum=$direccionAlum;
        }
        public function getDireccionAlumno()
        {
            return $this->direccionAlum;
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

        public function setIdEstatusAlumno($idEstatusAlum)
        {
            $this->idEstatusAlum=$idEstatusAlum;
        }
        public function getIdEstatusAlumno()
        {
            return $this->idEstatusAlum;
        }

        public function setIdPlanEstudio($idPlanEstud)
        {
            $this->idPlanEstud=$idPlanEstud;
        }
        public function getIdPlanEstudio()
        {
            return $this->idPlanEstud;
        }
    }
?>