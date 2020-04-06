<?php
    interface IAsesoria
    {
        public function addAsesoria(asesoria $asesoria);
        public function getListAsesorias($value,$typeSearch);
        public function getListaByAsesor($idAsesor);
    }
?>