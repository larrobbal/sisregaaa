<?php
    class salon
    {
        private $idSalon;
        private $salon;
        private $edificioSalon;

        public function setIdSalon($idSalon)
        {
            $this->idSalon=$idSalon;
        }
        public function getIdSalon()
        {
            return $this->idSalon;
        }

        public function setSalon($salon)
        {
            $this->salon=$salon;
        }
        public function getSalon()
        {
            return $this->salon;
        }

        public function setEdificioSalon($edificioSalon)
        {
            $this->edificioSalon=$edificioSalon;
        }
        public function getEdificioSalon()
        {
            return $this->edificioSalon;
        }
    }
?>