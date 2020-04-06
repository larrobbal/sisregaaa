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
        $this->Image('img/logoPrepaAbierta.png',12,12,45);
        $this->Image('img/logoExtension.jpg',160,8,30);
        // Arial bold 15
        $this->SetFont('Arial','',11);
        // Movernos a la derecha
        $this->Ln(5);
        $this->Cell(60);
        // Título
        $this->Cell(70,5,utf8_decode('Programa de Educación para Adultos'),0,2,'C');
        $this->Cell(70,5,'Preparatoria Abierta',0,2,'C');
        $this->SetFont('Arial','B',11);
        $this->Cell(70,5,utf8_decode('Historial Académico'),0,2,'C');
        // Salto de línea
        $this->Ln(10);
    }

    // Pie de página
    function Footer()
    {
        // Posición: a 1,5 cm del final
        $this->SetY(-17);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        $this->Cell(0,5,utf8_decode('Programa de Educación par Adultos. Extensión Universitaria.'),0,1,'C');
        $this->Cell(0,0,utf8_decode('Este documento es de carácter informativo y carece de validez oficial.'),0,1,'C');
        // Número de página
        $this->Cell(0,7,'Page '.$this->PageNo().'/{nb}',0,0,'C');
    }

    function imprimeDataAlumno($response)
    {
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,'Alumno: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(80,5,utf8_decode($response['nombreAlum']." ".$response['apPAlum']." ".$response['apMAlum']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(22,5,utf8_decode('Matrícula: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,$response['idAlumno'],0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,'CURP: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(80,5,$response['curpAlum'],0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(22,5,utf8_decode('Teléfono: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,$response['telAlum'],0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,'E-mail: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(80,5,$response['mailAlum'],0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(32,5,'Fecha de Inicio: ',0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,$response['fechaInicio'],0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(22,5,utf8_decode('Dirección: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(120,5,utf8_decode($response['direccionAlum']),0,0,'L');
        $this->Ln();
        $this->Cell(12);
        $this->SetFont('Arial','B',11);$this->Cell(35,5,utf8_decode('Plan de estudios: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(12,5,$response['planEstud'],0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(20,5,utf8_decode('Estatus: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(35,5,$response['estAlum'],0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(35,5,utf8_decode('Fecha de Egreso: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,$response['fechaFin'],0,0,'L');
    }
    function imprimeDetails($response)
    {
        include('php/estatusMateriaDAO.php');
        $daoEstatusMateria = new estatusMateriaDAO();
        $response = $daoEstatusMateria->getInfoMaterias($response['idAlumno']);
        $this->Ln(9);
        $this->Cell(190,5,'','T',2);
        $this->Cell(10);
        $this->SetFont('Arial','B',10);$this->Cell(1,2,'Clave',0,0,'C');$this->Cell(110,2,'Materia',0,0,'C');
        $this->Cell(10,2,utf8_decode('Calif'),0,0,'C');$this->Cell(25,2,'Estatus',0,0,'C');
        $this->Cell(25,2,'Fecha Examen',0,0,'C');
        $this->Ln(5);
        foreach($response as $row)
        {
            $this->Cell(10);
            $this->SetFont('Courier','',8);$this->Cell(1,3,$row['idMateria'],0,0,'C');$this->Cell(110,3,utf8_decode($row['nombreMateria']),0,0,'C');
            $this->Cell(10,3,$row['calificacion'],0,0,'C');$this->Cell(25,3,$row['estatus'],0,0,'C');
            $this->Cell(25,3,$row['fechaExamen'],0,0,'C');
            $this->Ln();
        }

    }
}


$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->imprimeDataAlumno($response);
$pdf->imprimeDetails($response);
$pdf->Output('F','temp\report.pdf',true);

echo 'temp/report.pdf';
?>