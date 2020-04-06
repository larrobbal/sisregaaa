<?php
header("Content-Type: text/html;charset=utf-8");
include 'conect.php';
if($conn!=FALSE)
{
    $query = "SELECT * from salon";
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