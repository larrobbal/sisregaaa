<?php
/*$v1="localhost";
$v2="root";
$v3="luizmar0cker0";
$v4="sisregaaadb";*/
$v1='130.211.112.62';
$v2='test';
$v3='1234567890';
$v4='sisregaaadb';
$conn = new mysqli($v1,$v2,$v3,$v4);
$conn->set_charset("utf8");
if($conn->connect_error)
{
    die("Conection failed: ".$conn->connect_error);
}
?>