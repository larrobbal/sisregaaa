<?php
header("Content-Type: text/html;charset=utf-8");
include 'conect.php';
if($conn!=FALSE)
{
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    $var = $response['nombreMateria'];
    $query = "SELECT nombreMateria from materia where nombreMateria like '%".$var."%'";
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