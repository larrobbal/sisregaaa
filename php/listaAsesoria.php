<?php
    class listaAsesoria
    {
        private $idAlumno;
        private $idAsesoria;

        public function setIdAlumno($idAlumno)
        {
            $this->idAlumno=$idAlumno;
        }

        public function getIdAlumno()
        {
            return $this->idAlumno;
        }

        public function setIdAsesoria($idAsesoria)
        {
            $this->idAsesoria=$idAsesoria;
        }

        public function getIdAsesoria()
        {
            return $this->idAsesoria;
        }
    }
?>