<?php
header("Content-Type: text/html;charset=utf-8");
include 'conect.php';
if($conn!=FALSE)
{
    $query = "SELECT idAlumno,nombreAlum,apPAlum,apMAlum from alumno where idEstatusAlumn = 1";
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
    header('Location:home.html');
}
?>