<?php
header("Content-Type: text/html;charset=utf-8");
$str_json = file_get_contents('php://input');
$response = json_decode($str_json, true);
require('fpdf.php');

class PDF extends FPDF
{
    // Cabecera de página
    function Header()
    {
        // Logo
        $this->Image('img/logoUAM.png',12,12,45);
        $this->Image('img/logoExtension.jpg',160,8,30);
        // Arial bold 15
        $this->SetFont('Arial','',11);
        // Movernos a la derecha
        $this->Ln(5);
        $this->Cell(60);
        // Título
        $this->Cell(70,5,utf8_decode('Coordinación de Extensión Universitaria'),0,2,'C');
        $this->Cell(70,5,utf8_decode('Programa de Educación para Adultos'),0,2,'C');
        $this->SetFont('Arial','B',11);
        $this->Cell(70,5,utf8_decode('Contabilización de Horas'),0,2,'C');
        // Salto de línea
        $this->Ln(10);
    }

    // Pie de página
    function Footer()
    {
        // Posición: a 1,5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        $this->Cell(0,0,utf8_decode('Universidad Autónoma Metropolitana - Extensión Universitaria - Programa de Educación par Adultos'),0,1,'C');
        // Número de página
        $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
    }

    function imprimeDataAsesor($response)
    {
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,'Asesor: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(90,5,utf8_decode($response['nombreAses']." ".$response['apPAses']." ".$response['apMAses']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(22,5,utf8_decode('Matrícula: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,$response['matriculaAses'],0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,utf8_decode('Teléfono: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(30,5,$response['telAses'],0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(20,5,'E-mail: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(60,5,utf8_decode($response['mailAses']),0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,utf8_decode('División: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,utf8_decode($response['division']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(22,5,'Carrera: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(45,5,utf8_decode($response['carrera']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(32,5,'Fecha de Inicio: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,$response['fechaInicio'],0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(50,5,utf8_decode('Fecha de Finalización: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(80,5,utf8_decode($response['fechaFin']),0,0,'L');
    }
    function imprimeDetails($response)
    {
        $horas=0;
        $minutos=0;
        include('php/asesoriaDAO.php');
        $daoAsesoria = new asesoriaDAO();
        $response = $daoAsesoria->getListaByAsesor($response['matriculaAses']);
        $this->Ln(8);
        $this->Cell(190,3,'','T',2);
        $this->Cell(6);
        $this->SetFont('Arial','B',10);$this->Cell(5,5,'ID',0,0,'C');$this->Cell(20,5,'Periodo',0,0,'C');
        $this->Cell(30,5,utf8_decode('Fecha Inicio'),0,0,'C');$this->Cell(18,5,'Fecha Fin',0,0,'C');
        $this->Cell(95,5,'Materia',0,0,'C');$this->Cell(5,5,'Horas',0,0,'C');
        $this->Ln(5);
        foreach($response as $row)
        {
            $this->Cell(6);
            $this->SetFont('Courier','',8);$this->Cell(5,3,$row['idAsesoria'],0,0,'C');$this->Cell(20,3,$row['idPeriodo'],0,0,'C');
            $this->Cell(30,3,$row['fechaInicio'][0],0,0,'C');$this->Cell(15,3,$row['fechaFin'][0],0,0,'L');
            $this->Cell(100,3,utf8_decode($row['nombreMateria']),0,0,'C');$this->Cell(1,2,$row['horasAsesoria'],0,0,'C');
            $this->Ln(3);
        }
        unset($row);
        //Calcular horas totales
        foreach($response as $row)
        {
            $time = explode(":",$row['horasAsesoria']);
            $horas+=$time[0];
            $minutos+=$time[1];
        }
        $minutos=$minutos/60;
        $cast_min=explode(".",$minutos);
        $horas=$horas+$cast_min[0];
        if(sizeof($cast_min)>1)
        {
            $minutos = $cast_min[1]*60;
        }
        else
        {
            $minutos='00';
        }
        $total=$horas.":".$minutos.":00";
        $this->Ln(10);
        $this->Cell(130);
        $this->SetFont('Arial','B',10);$this->Cell(37,2,'Horas Totales: ',0,0,'L');
        $this->SetFont('Courier','',10);$this->Cell(15,2,$total,0,0,'L');
    }
}


$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->imprimeDataAsesor($response);
$pdf->imprimeDetails($response);

$pdf->Output('F','temp\report.pdf',true);

echo 'temp/report.pdf';
?>