<?php
    class materia
    {
        private $idMateria;
        private $nombreMateria;
        private $idPlanEstud;

        public function setIdMateria($idMateria)
        {
            $this->idMateria=$idMateria;
        }
        public function getIdMateria()
        {
            return $this->idMateria;
        }

        public function setNombreMateria($nombreMateria)
        {
            $this->nombreMateria=$nombreMateria;
        }
        public function getNombreMateria()
        {
            return $this->nombreMateria;
        }

        public function setIdPlanEstud($idPlanEstud)
        {
            $this->idPlanEstud=$idPlanEstud;
        }
        public function getIdPlanEstud()
        {
            return $this->idPlanEstud;
        }
    }
?>