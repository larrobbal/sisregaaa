<?php
    class asesoria
    {
        private $idAsesoria;
        private $horasAsesoria;
        private $idMateria;
        private $idSalon;
        private $matriculaAses;
        private $idPeriodo;
        private $horarioAsesoria;

        public function setIdAsesoria($idAsesoria)
        {
            $this->idAsesoria=$idAsesoria;
        }
        public function getIdAsesoria()
        {
            return $this->idAsesoria;
        }

        public function setHorasAsesorias($horasAsesoria)
        {
            $this->horasAsesoria=$horasAsesoria;
        }
        public function getHorasAsesorias()
        {
            return $this->horasAsesoria;
        }

        public function setIdMateria($idMateria)
        {
            $this->idMateria=$idMateria;
        }
        public function getIdMateria()
        {
            return $this->idMateria;
        }

        public function setIdSalon($idSalon)
        {
            $this->idSalon=$idSalon;
        }
        public function getIdSalon()
        {
            return $this->idSalon;
        }

        public function setMatriculaAsesor($matriculaAses)
        {
            $this->matriculaAses=$matriculaAses;
        }
        public function getMatriculaAsesor()
        {
            return $this->matriculaAses;
        }

        public function setIdPeriodo($idPeriodo)
        {
            $this->idPeriodo=$idPeriodo;
        }
        public function getIdPeriodo()
        {
            return $this->idPeriodo;
        }

        public function setHorarioAsesoria($horarioAsesoria)
        {
            $this->horarioAsesoria=$horarioAsesoria;
        }
        public function getHorarioAsesoria()
        {
            return $this->horarioAsesoria;
        }
    }
?>