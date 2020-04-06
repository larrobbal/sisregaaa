<?php
    header("Content-Type: text/html;charset=utf-8");
    require_once('dataSource.php');
    require_once('IListaAsesoria.php');
    require_once('listaAsesoria.php');

    class ListaAsesoriaDAO implements IListaAsesoria
    {
        public function addRegistroLista(listaAsesoria $registroListaAsesoria)
        {
            $data_source=new DataSource();
            $result = Array();
            $idAlumno = $registroListaAsesoria->getIdAlumno();
            $idAsesoria = $registroListaAsesoria->getIdAsesoria();
            $query_duplicate="select * from listaasesoria where idAsesoria=".$idAsesoria." AND idAlumno='".$idAlumno."'";
            $result_duplicate=$data_source->exeConsulta($query_duplicate);
            if($result_duplicate==null)
            {
                $sql="INSERT INTO listaasesoria (idAlumno,idAsesoria) values ('".$idAlumno."',".$idAsesoria.")";
                $result=$data_source->exeCUD($sql);
                return $result;
            }
            else
            return 'duplicate';
        }


        public function getListDetail($idAsesoria)
        {
            $data_source=new DataSource();
            $result = Array();
            include('alumnoDAO.php');
            $daoAlumno = new alumnoDAO();
            $sql_id_alumno = "select idAlumno from listaasesoria where idAsesoria = ".$idAsesoria."";
            $result_sql_id_alumno = $data_source->exeConsulta($sql_id_alumno);
            foreach($result_sql_id_alumno as $row)
            {
                $ArrayNombreAlumno[]=$daoAlumno->buscaNombreAlumno($row['idAlumno']);
            }
            return $ArrayNombreAlumno;          
        }
    }
?>