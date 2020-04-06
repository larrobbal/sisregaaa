<?php
header("Content-Type: text/html;charset=utf-8");
include 'conect.php';
if($conn!=FALSE)
{
    $str_json = file_get_contents('php://input');
    $response = json_decode($str_json, true);
    $nombre = $response['nombreAses'];
    $appa = $response['apPAses'];
    $apma = $response['apMAses'];
    $query = "SELECT matriculaAses from asesor where nombreAses='".$nombre."' and apPAses='".$appa."' and apMAses='".$apma."'";
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