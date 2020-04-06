<?php
$v1="localhost";
$v2="root";
$v3="luizmar0cker0";
$v4="sisregaaadb";
$conn = new mysqli($v1,$v2,$v3,$v4);
$conn->set_charset("utf8");
if($conn->connect_error)
{
    die("Conection failed: ".$conn->connect_error);
}
?>