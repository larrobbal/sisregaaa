<?php
$v1="35.222.252.247";
$v2="root";
$v3="s1sr3g44";
$v4="sisregaadb";
$conn = mysqli_connect($v1,$v2,$v3,$v4);
if($conn->connect_error)
{
    die("Conection failed: ".$conn->connect_error);
}
?>