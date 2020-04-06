<?php
    interface IPeriodo
    {
        public function consultaIdPeriodo($fecha);
        public function creaPeriodo($fechaInicio,$fechaFin);
        public function getFechasPeriodo($idPeriodo);
    }
?>