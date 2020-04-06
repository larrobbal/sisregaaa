<?php
    interface IAlumno
    {
        public function addAlumno(alumno $alumno);
        public function getDetalleAlumno($idAlumno);
        public function getAlumnosActivos();
        public function buscaNombreAlumno($idAlumno);
        public function modificaAlumno(alumno $alumno,$idOriginal,$curpOriginal);
    }
?>