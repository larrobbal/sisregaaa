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
        $this->Image('img/logoUAM.png',50,12,60);
        $this->Image('img/logoExtension.jpg',200,8,30);
        // Arial bold 15
        $this->SetFont('Arial','',11);
        // Movernos a la derecha
        $this->Ln(5);
        $this->Cell(110);
        // Título
        $this->Cell(70,5,utf8_decode('Coordinación de Extensión Universitaria'),0,2,'C');
        $this->Cell(70,5,utf8_decode('Programa de Educación para Adultos'),0,2,'C');
        $this->SetFont('Arial','B',11);
        $this->Cell(70,5,utf8_decode('Lista de asistencia'),0,2,'C');
        // Salto de línea
        $this->Ln(15);
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

    function imprimeDataAsesoría($response)
    {
        include('php/asesoriaDAO.php');
        $daoAsesoria = new asesoriaDAO();
        $res = $daoAsesoria->getListAsesorias($response['idAsesoria'],'idAsesoria');
        $this->Cell(15);
        $this->SetFont('Arial','B',11);$this->Cell(25,5,utf8_decode('Id. Asesoria: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(25,5,utf8_decode($res[0]['idAsesoria']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(20,5,utf8_decode('Materia: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(80,5,utf8_decode($res[0]['nombreMateria']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(20,5,utf8_decode('Asesor: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(30,5,utf8_decode($res[0]['nombreAses']),0,0,'L');
        $this->Ln();
        $this->Cell(15);
        $this->SetFont('Arial','B',11);$this->Cell(20,5,utf8_decode('Salón: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(50,5,utf8_decode($res[0]['salon']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(20,5,utf8_decode('Edificio: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(20,5,utf8_decode($res[0]['edificioSalon']),0,0,'L');
        $this->SetFont('Arial','B',11);$this->Cell(20,5,utf8_decode('Horario: '),0,0,'L');
        $this->SetFont('Courier','',11);$this->Cell(30,5,utf8_decode($res[0]['horarioAsesoria']),0,0,'L');
        $this->Ln(25);
    }

    function imprimeListTable($response)
    {
        include('php/listaAsesoriaDAO.php');
        $daoListaAsesoria = new ListaAsesoriaDAO();
        $res = $daoListaAsesoria->getListDetail($response['idAsesoria']);
        $this->Cell(10);
        $this->SetFont('Arial','B',11);$this->Cell(90,5,utf8_decode(''),0,0,'C');
        for($i=0;$i<28;$i++)
        {
            if($i!=27)
                $this->Cell(6,5,'','LR',0,'C');
            else
                $this->Cell(6,5,'','LR',1,'C');
        }
        $this->Cell(10);
        $this->SetFont('Arial','B',11);$this->Cell(90,5,utf8_decode('Alumno '),'B',0,'C');
        for($i=0;$i<28;$i++)
        {
            if($i!=27)
                $this->Cell(6,5,'','LBR',0,'C');
            else
                $this->Cell(6,5,'','LBR',1,'C');
        }
        foreach($res as $row)
        {
            foreach($row as $row_1)
            {
                $this->Cell(10);
                $this->SetFont('Courier','',11);$this->Cell(90,5,utf8_decode($row_1['nombreAlum']." ".$row_1['apPAlum']." ".$row_1['apMAlum']),'1',0,'C');
                for($i=0;$i<28;$i++)
                {
                    if($i!=27)
                        $this->Cell(6,5,'',1,0,'C');
                    else
                        $this->Cell(6,5,'',1,1,'C');
                }
            }
        }
    }
}

$pdf = new PDF('L','mm','A4');
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->imprimeDataAsesoría($response);
$pdf->imprimeListTable($response);

$pdf->Output('F','temp\report.pdf',true);

echo 'temp/report.pdf';
?>
