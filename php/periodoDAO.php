<?php
    require_once('dataSource.php');
    require_once('IPeriodo.php');
    require_once('periodo.php');

    class periodoDAO implements IPeriodo
    {
        public function consultaIdPeriodo($fecha)
        {
            $data_source=new DataSource();
            $sql = "select idPeriodo from periodo where '".$fecha."' between fechainicio and fechafin";
            $result=$data_source->exeConsulta($sql);
            if($result==null)
                return 'not_period';
            else
                return $result[0]['idPeriodo'];
        }

        public function creaPeriodo($fechaInicio,$fechaFin)
        {
            if($fechaInicio!=""&$fechaFin!="")
            {
                $data_source = new DataSource();
                $duplicate_period_sql="SELECT * FROM periodo WHERE fechaInicio = '".$fechaInicio."' OR fechaFin = '".$fechaFin."'";
                $result_duplicate = $data_source->exeConsulta($duplicate_period_sql);
                if($result_duplicate==null)
                {
                    $sql = "INSERT INTO periodo (fechaInicio,fechaFin) values('".$fechaInicio."','".$fechaFin."')";
                    $result = $data_source->exeCUD($sql);
                    return $result;
                }
                else
                    return 'duplicate';
            }
            else
                return 'error';
            
        }
        public function getFechasPeriodo($idPeriodo)
        {
            $data_source=new DataSource();
            $sql="SELECT fechaInicio, fechaFin FROM periodo where idPeriodo=$idPeriodo";
            $result=$data_source->exeConsulta($sql);
            return $result;
        }
    }
?>