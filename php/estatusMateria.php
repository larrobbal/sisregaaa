<?php
    class estatusMateria
    {
        private $idAlumno;
        private $idMateria;
        private $calificacion;
        private $idEstatus;
        private $fechaExamen;

        public function setIdAlumno($idAlumno)
        {
            $this->idAlumno = $idAlumno;
        }
        public function getIdAlumno()
        {
            return $this->idAlumno;
        }

        public function setIdMateria($idMateria)
        {
            $this->idMateria=$idMateria;
        }
        public function getIdMateria()
        {
            return $this->idMateria;
        }

        public function setCalificacion($calificacion)
        {
            $this->calificacion=$calificacion;
        }
        public function getCalificacion()
        {
            return $this->calificacion;
        }

        public function setIdEstatus($idEstatus)
        {
            $this->idEstatus=$idEstatus;
        }
        public function getIdEstatus()
        {
            return $this->idEstatus;
        }

        public function setFechaExamen($fechaExamen)
        {
            $this->fechaExamen=$fechaExamen;
        }
        public function getFechaExamen()
        {
            return $this->fechaExamen;
        }
    }
?>