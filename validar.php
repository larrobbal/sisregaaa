<?php
$usuario = $_POST['user'];
$pass = $_POST['pass'];
if(empty($usuario) || empty($pass))
{
    header("Location: index.html");
    exit();
}
include 'conect.php';
$query = "SELECT * FROM usuario where user='" .$usuario. "' and pass='" .$pass. "'";
$result = mysqli_query($conn,$query);
$cont = mysqli_num_rows($result);
if($row = mysqli_fetch_assoc($result))
{ 
    if($row['pass'] == $pass)
    {
        session_start();
        $_SESSION['user'] = $usuario;
        header("Location: home.html");
        return true;
    }
    else
    {
        header("Location: index.html");
        exit();
    }
}
else
{
    header("Location: index.html");
    exit();
}
?>