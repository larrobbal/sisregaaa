<?php
    interface IAsesor
    {
        public function getNombreAsesor($matriculaAsesor);
        public function getDataAsesores(asesor $asesor);
        public function searchNombres();
        public function addAsesor($response);
        public function modificaAsesor($response);
    }
?>