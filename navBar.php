<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: index.html');
    exit();
}
?>    
  <nav class="main-menu">
            <ul>
                <li>
                    <a href="home.html">
                    <i class="fas fa-home"></i>
                        <span class="nav-text">
                            Inicio
                        </span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="alumno.html">
                    <i class="fas fa-user-graduate"></i>
                        <span class="nav-text">
                            Alumno
                        </span>
                    </a>
                </li>
                <li>
                    <a href="asesor.html">
                    <i class="fas fa-chalkboard-teacher"></i>
                        <span class="nav-text">
                            Asesor
                        </span>
                    </a>
                </li>                
                <li>
                   <a href="asesoria.html">
                   <i class="fas fa-book-reader"></i>
                        <span class="nav-text">
                            Asesorías
                        </span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="listas.html">
                    <i class="fas fa-list"></i>
                        <span class="nav-text">
                            Listas de Asesoría
                        </span>
                    </a>
                </li>
                <li>
                    <a href="reportes.html">
                       <i class="fas fa-history fa-2x"></i>
                        <span class="nav-text">
                            Reportes
                        </span>
                    </a>
                </li>
            </ul>
            <ul class="logout">
                <li>
                <a href="#">
                        <i class="fas fa-user fa-2x"></i>
                        <span class="nav-text">
                            Bienvenido <?php echo $_SESSION['user']?>
                        </span>
                </a>
                </li> 
                <li>
                   <a href="logout.php">
                         <i class="fas fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Salir
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>