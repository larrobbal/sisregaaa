<?php
header("Content-Type: text/html;charset=utf-8");
include 'conect.php';
$str_json = file_get_contents('php://input');
$response = json_decode($str_json, true);
if($conn!=FALSE)
{
    $query = "SELECT idMateria,nombreMateria from materia where idPlanEstud = (select idPlanEstud from planDeEstudio where planEstud='".$response['planEstud']."')";
    $arreglo = array();
    $json = array();
    $result = mysqli_query($conn,$query);
    while($data=mysqli_fetch_assoc($result))
    {
            $arreglo[]=$data;
    }
    $json=json_encode($arreglo);
    echo $json;
}
else
{
    header('Location:asesoria.html');
}
?>