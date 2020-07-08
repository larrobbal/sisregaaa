-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2020 a las 20:04:14
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sisregaaadb`
--
CREATE DATABASE IF NOT EXISTS `sisregaaadb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `sisregaaadb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE IF NOT EXISTS `alumno` (
  `idAlumno` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `nombreAlum` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apPAlum` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apMAlum` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `curpAlum` varchar(18) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telAlum` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mailAlum` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `direccionAlum` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `idEstatusAlumn` int(2) NOT NULL DEFAULT 0,
  `idPlanEstud` int(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idAlumno`),
  KEY `fk_estatus` (`idEstatusAlumn`),
  KEY `fk_planEst` (`idPlanEstud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`idAlumno`, `nombreAlum`, `apPAlum`, `apMAlum`, `curpAlum`, `telAlum`, `mailAlum`, `direccionAlum`, `fechaInicio`, `fechaFin`, `idEstatusAlumn`, `idPlanEstud`) VALUES
('', '', '', '', '', '', '', '', '0000-00-00', NULL, 1, 1),
('000000000000', 'El', 'Ejemplo', 'Pruebas', 'XAXX010101XXXXXX00', '5555555555', 'example@mail.com', 'calle numero colonia delegación país', '1986-05-01', '0000-00-00', 1, 1),
('098978675643', 'Hector Hugo', 'Manriquez', 'Gómez', 'MAGH010129HDFNMC98', '5589034276', 'hh.mango@hotmail.com', 'Calz. Camarones #4590 Col. Refinería C.P. 02450 Azcapotzalco CDMX', '2019-11-04', NULL, 1, 1),
('120903014002', 'David', 'Rojas', 'Espejel', 'ROED930923HDFJSV07', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('120914000843', 'Mónica', 'Meneses', 'Montaño', 'MEMM940307MDFNNN07', NULL, NULL, NULL, '2012-01-01', NULL, 1, 1),
('123456789000', 'Saul Emmanuel', 'Briseño', 'Cortes', 'BXXX000614HDFRRL02', '5598076543', 'saul123456@hotmail.com', 'Matamoros #98 Int. 1 Col. Morelos C.P. 06200 Cuauhtemoc CDMX', '2019-03-11', '0000-00-00', 1, 1),
('130914000138', 'Tonatiuh', 'Daniel', 'Rojas', 'DART940617HDFNJN04', NULL, NULL, NULL, '2013-01-01', NULL, 1, 1),
('130921003744', 'Marco Uriel ', 'Rosas', 'Olmedo', 'ROOM950824HDFSLR06', NULL, NULL, NULL, '2013-01-01', NULL, 1, 1),
('130923005483', 'Moises', 'Sánchez', 'Calderón', 'SACM940301HDFNLS03', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('140914000995', 'Luisa Valeria', 'Vallines', 'Romero', 'VARL960323MDFLMS00', NULL, NULL, NULL, '2014-01-01', NULL, 1, 1),
('140923000454', 'Carolina', 'Olivares', 'Ledezma', 'OILC800304MVZLDR00', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('141503011833', 'Fernando Manuel', 'Reyna', 'Sánchez', 'RESF921127HMCYNR08', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('150923000453', 'Guadalupe Dolores', 'Noguez', 'Álvarez', 'NOAG941228MMCGLD02', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('150925001348', 'Ivonne Adoniram', 'Jardon', 'López', 'JALI970413MMCRPV02', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('150925002840', 'Victor Hugo', 'González', 'Galván', 'GPGV960429HDFNLC00', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('150925003551', 'Mario', 'González', 'Rosales', 'GORM720129HPLNSR04', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('150925008501', 'Nancy Virginia', 'López', 'Burian', 'LOBN970130MMCPRN05', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('150925011792', 'Diana', 'Rodríguez', 'Corona', 'ROCD760320MDFDRN02', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('150925024026', 'Misael Abraham', 'Arroyo', 'Mosqueda', 'AOMM671120HDFRSS05', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('150925024037', 'Maria Guadalupe', 'Ferrer', 'González', 'FEGG581211MMCRND06', NULL, NULL, NULL, '2015-01-01', NULL, 1, 1),
('160925001709', 'Luisa Rosenda', 'Zagal', 'Mancebo', 'ZAML990206MDFGNS00', NULL, NULL, NULL, '2016-01-01', NULL, 1, 1),
('160925007240', 'David', 'Alvarado', 'Arévalo', 'AAAD860824HDFLRV01', NULL, NULL, NULL, '2016-01-01', NULL, 1, 1),
('160925017584', 'Beatriz Lizbet', 'Anaya ', 'Torres', 'AATB990208MDFNRT04', NULL, NULL, NULL, '2016-01-01', NULL, 1, 1),
('160925020335', 'Adrián Salvador', 'Rivas', 'López', 'RILA990314HMCVPD07', NULL, NULL, NULL, '2016-01-01', NULL, 1, 1),
('170923000055', 'Sergio', 'Guerrero', 'Gervacio', 'GUGS770812HGRRRR07', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('170923000121', 'Adrián Misael ', 'Angel ', 'Reyes', 'AERA990818HDFNYD00', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('170923000550', 'Cynthia Noemi', 'Isidoro', 'García', 'IIGC980704MDFSRY02', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('170923000561', 'Lizbbette Susana', 'Buzo', 'Hachec', 'BUHL870520MDFZCZ07', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('170925002002', 'Norma Angélica', 'Esquivel', 'Martínez', 'EUMN821109MDFSRR04', NULL, NULL, NULL, '2017-01-01', NULL, 1, 1),
('170925007250', 'Jesús Alfredo', 'Herrera', 'Licona', 'HELJ010221HDFRCSA9', NULL, NULL, NULL, '2017-01-01', NULL, 1, 1),
('170925008015', 'Mariana', 'Sánchez', 'Calderón', 'SACM000712MDFNLRA1', NULL, NULL, NULL, '2017-01-01', NULL, 1, 1),
('170925013080', 'Ingrid Sofia', 'Jiménez', 'Martínez', 'JIMI010711MDFMRNA3', '555555555', 'mail@mail.com', '', '2017-01-01', '0000-00-00', 5, 1),
('170925014197', 'Charbeli', 'Cárdenas', 'Luna', 'CALC020614MDFRNHA0', NULL, NULL, NULL, '2017-01-01', NULL, 1, 1),
('180923000054', 'Angela Valeria', 'Rodríguez', 'Flores', 'ROFA000711MDFDLNA0', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000098', 'Brenda Paulina', 'Saldívar', 'García', 'SAGB980906MDFLRR06', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000142', 'Marco Antonio', 'Romero', 'Tonix', 'ROTM951021HTLMNR01', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000230', 'Elisabeth', 'Cruz', 'Castellanos', 'CUCE990106MMCRSL06', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000416', 'Esda Alejandra', 'Mayorga', 'Vega', 'MAVE940501MSRYGS07', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000483', 'Argelia', 'Rangel', 'Maciel', 'RAMA890305MJCNCR09', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000494', 'Alan Kalid', 'López', 'Yocupicio', 'LOYA961211HDFPCL02', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000504', 'José Agustín', 'Alcántara', 'Flores', 'AAFA700102HDFLLG09', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180923000548', 'Carlos Giovani', 'Anaya', 'Resendiz', 'AARC990118HDFNSR04', '', '', '', '0000-00-00', '0000-00-00', 4, 2),
('180923000560', 'Luis Ramón', 'Peña', 'López', 'PELL870828HMCXPS07', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('180925000492', 'Hugo Enrique', 'Rubio', 'Mondragón', 'RUMH980903HDFBNG04', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925000502', 'Liseth Guadalupe', 'Agapito', 'Cruz', 'AACL980403MMCGRS01', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925000690', 'Miguel Ángel', 'Pantoja', 'González', 'PAGM000929HDFNNGA4', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925007150', 'Alejandra', 'Esparza ', 'García', 'EAGA940512MDFSRL04', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925012466', 'Eulalia Anai', 'Segundo', 'Solis', 'SESE001215MDFGLLA3', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925012697', 'Armando Yahel ', 'Ramírez', 'Resendíz', 'RARA010804HDFMSRA4', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925012730', 'Jorge Luis', 'López', 'García', 'LOGJ920223HDFPRR02', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925013935', 'Joel Emiliano', 'Domínguez', 'Márquez', 'DOMJ020718HDFMRLA7', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('180925016497', 'Silvia Mireya', 'Rubio', 'Balderas', 'RUBS010122MDFBLLA7', NULL, NULL, NULL, '2018-01-01', NULL, 1, 1),
('190923000031', 'Maria Fernanda', 'Ruiz', 'Silva', 'RUSF011204MDFZLRAZ', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('190923000217', 'Stephany Lizbeth', 'Jardon ', 'López', 'JALS020306MMCRPTA8', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('190923000316', 'Edgar Vicente', 'López', 'Galindo', 'LOGE020804HDFPLDA1', NULL, NULL, NULL, '0000-00-00', NULL, 1, 2),
('190925001003', 'Sara', 'Campos', '', 'CAXS701203MDFMXR09', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925001047', 'Gaby Stephanny', 'Martínez', 'Palacios', 'MAPG010426MDFRLBA3', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925001070', 'Brandon', 'Ornelas', 'León', 'OELB940509HDFRNR04', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925001081', 'Nataly Michelle', 'Nogal', 'Hernández', 'NOHN020517MDFGRTA1', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925005155', 'Jesús', 'Nájera ', 'Lagunas', 'NALJ920804HMCJGS01', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006042', 'Angélica', 'Díaz', 'Montaño', 'DIMA010514MDFZNNA6', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006613', 'Hugo', 'Téllez', 'Rivera', 'TERH891121HDFLVG00', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006668', 'Maribel', 'Morales', 'Chavarria', 'MOCM680420MDFRHR06', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006712', 'Gerardo', 'Trejo', 'Torres', 'TETG800723HDFRRR03', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006767', 'Darien Alejandro', 'Campos', 'Castañeda', 'CACD061120HDFMSRA9', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006778', 'Jorge', 'García', 'Hernández', 'GAHJ530508HDFRRR06', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006800', 'Esteban de Jesús', 'Salinas', 'Montiel', 'SAME771226HDFLNS08', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006811', 'José Santiago', 'López', 'Luna', 'LOLS020225HMCPNNA0', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925006844', 'Maria', 'Mandujano', 'Aguirre', 'MAAM740421MDFNGR01', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925007258', 'Blanca Estela', 'Guerrero ', 'Domínguez', 'GUDB700305MDFRML08', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925007281', 'Juan Carlos', 'Gutiérrez', 'Robles', 'GURJ670923HDFTBN01', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925007292', 'Juan Manuel', 'Gómez', 'Carmona', 'GOCJ950125HDFMRN05', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925007731', 'Mayra Alejandra', 'Vidal ', 'Martínez', 'VIMM0109MDFDRYA0', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('190925007742', 'Ana Lilia', 'Velasco', 'Flores', 'VEFA830124MDFLLN03', NULL, NULL, NULL, '2019-01-01', NULL, 1, 1),
('235623651351', 'Saul Emmanuel', 'Briseño', 'Cortes', 'OISA9740513HDFPL00', '', '', '', '0000-00-00', NULL, 1, 1),
('70903061664', 'Sara Alejandra', 'Martínez', 'Quintero', 'MAQS920226MDFRNR06', NULL, NULL, NULL, '0000-00-00', NULL, 2, 2),
('70912049101', 'Hugo Héctor', 'Ramírez', 'Álvarez', 'RAAH791118HDFMLG10', NULL, NULL, NULL, '0000-00-00', NULL, 4, 2),
('960910006892', 'Maria de la Luz', 'Granados', 'Santa Cruz', 'GASL690414MDFRNZ05', NULL, NULL, NULL, '1996-01-01', NULL, 1, 1),
('982103980197', 'Marcos', 'Gómez', 'Cárdenaz', 'GOCM010211HDFUWI33', '5567890987', 'marcos_gomez@gmail.com', 'Av. Reforma #45 Col. Industrial Ciudad de México', '2019-11-04', NULL, 1, 2),
('983429834274', 'Ana Daniela', 'Cornejo', 'Landavazo', 'CXLA971221MDFRNN02', '5525315519', 'anadaniela@mail.com', 'Calle calle numero numero colonia colonia', '2019-04-15', '2020-02-28', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesor`
--

CREATE TABLE IF NOT EXISTS `asesor` (
  `matriculaAses` varchar(12) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `nombreAses` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apPAses` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apMAses` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idCarrera` int(11) NOT NULL DEFAULT 1001,
  `telAses` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mailAses` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `idEstatusServ` int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`matriculaAses`),
  KEY `fk_carrera` (`idCarrera`),
  KEY `fk_estatusServ` (`idEstatusServ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `asesor`
--

INSERT INTO `asesor` (`matriculaAses`, `nombreAses`, `apPAses`, `apMAses`, `idCarrera`, `telAses`, `mailAses`, `fechaInicio`, `fechaFin`, `idEstatusServ`) VALUES
('000087563', 'Liliana ', 'Escobedo', 'Lopez', 4001, '5526748158', 'liescobedol@gmail.com', NULL, NULL, 1),
('2082118119', 'Cristian Ernesto', 'Osses', 'Sanchez', 1004, '55 2363 67', 'cristianosses@live.com', NULL, NULL, 1),
('209215028', 'Victor Hugo', 'Betanzos', 'Garcia', 3001, '5529197991', 'hause.arq@gmail.com', NULL, NULL, 1),
('209333923', 'Jesus Alberto', 'Munoz', 'Olgin', 1004, NULL, NULL, NULL, NULL, 1),
('209367493', 'Wendy Barbara', 'Lopez', 'Flores', 1004, '5584846161', 'wen_templeted@hotmail.com', NULL, NULL, 1),
('2122003170', 'Annuar', 'De Jesus', 'Primero', 2002, '55 5800190', 'al2122003170@hotmail.com', NULL, NULL, 1),
('2123037732', 'Jorge Gerardo', 'Perez', 'Vidrio', 1004, '5617262427', 'jgpv92@gmail.com', NULL, NULL, 1),
('2133004076', 'Luis Roberto', 'Valencia', 'Briseño', 2003, '5588012829', 'robb.strike@gmail.com', '2018-09-10', '2020-03-18', 4),
('213300595409', 'Miguel', 'Alcantara', 'Minges', 2009, '5566478228', 'legolas1010@gmail.com', '2020-02-24', '0000-00-00', 1),
('2133070552', 'Miriam', 'Xocua', 'Posadas', 2007, NULL, NULL, NULL, NULL, 1),
('2142006533', 'Rodrigo Jonas', 'Salazar', 'Arellano', 1004, '5555555555', NULL, NULL, NULL, 1),
('2152002985', 'Ruben Alexander', 'Correo', 'Marquez', 2007, '5513198792', 'acmez_252@hotmail.com', NULL, NULL, 1),
('2152005995', 'Hector', 'Martinez', 'Hernandez', 1004, NULL, NULL, NULL, NULL, 1),
('2153037259', 'Jesus Eduardo', 'Adame', 'Memije', 2002, '55 2497275', 'eduardo.memije@gmaiol.com', NULL, NULL, 1),
('2153038372', 'Marco', 'Anguiano', 'Montero', 1004, '55 3016 99', 'marco.anguiano.montero@gmail.com', NULL, NULL, 1),
('2162012788', 'Ana Daniela', 'Cornejo', 'Landavazo', 3002, '5525253535', 'danielacornejo@mail.com', '2020-02-03', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesoria`
--

CREATE TABLE IF NOT EXISTS `asesoria` (
  `idAsesoria` int(4) NOT NULL DEFAULT 0,
  `horasAsesoria` time DEFAULT NULL,
  `idMateria` int(11) NOT NULL DEFAULT 0,
  `idSalon` int(11) NOT NULL DEFAULT 0,
  `matriculaAses` varchar(12) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `idPeriodo` int(11) NOT NULL DEFAULT 0,
  `horarioAsesoria` time DEFAULT NULL,
  PRIMARY KEY (`idAsesoria`),
  KEY `fk_materia` (`idMateria`),
  KEY `fk_salon` (`idSalon`),
  KEY `fk_asesor` (`matriculaAses`),
  KEY `fk_periodo` (`idPeriodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `asesoria`
--

INSERT INTO `asesoria` (`idAsesoria`, `horasAsesoria`, `idMateria`, `idSalon`, `matriculaAses`, `idPeriodo`, `horarioAsesoria`) VALUES
(900, '12:00:00', 300, 103, '2133004076', 36, '13:30:00'),
(909, '02:00:00', 6, 101, '209333923', 3, '10:00:00'),
(987, '09:00:00', 130, 102, '209215028', 38, '14:00:00'),
(1010, '02:00:00', 2, 103, '000087563', 2, '13:00:00'),
(1011, '02:00:00', 3, 101, '2152002985', 2, '09:30:00'),
(1020, '02:00:00', 200, 104, '209333923', 2, '10:00:00'),
(1111, '03:00:00', 3, 101, '2133070552', 2, '12:00:00'),
(1234, '02:00:00', 120, 101, '209215028', 2, '12:00:00'),
(1305, '02:00:00', 115, 103, '000087563', 2, '11:30:00'),
(1313, '01:30:00', 12, 102, '209215028', 2, '13:00:00'),
(1685, '02:00:00', 14, 101, '2153037259', 2, '10:00:00'),
(2020, '02:00:00', 22, 105, '2133004076', 2, '14:00:00'),
(2030, '02:00:00', 3, 102, '2133070552', 2, '12:00:00'),
(3421, '02:00:00', 7, 104, '209333923', 2, '12:30:00'),
(3490, '02:00:00', 113, 103, '000087563', 2, '10:30:00'),
(4098, '02:00:00', 6, 105, '2133004076', 2, '12:00:00'),
(4099, '02:00:00', 6, 101, '2133004076', 2, '12:00:00'),
(4444, '02:00:00', 22, 105, '2133004076', 2, '14:00:00'),
(5476, '13:30:00', 160, 101, '2133004076', 35, '10:00:00'),
(6645, '02:00:00', 1, 102, '209215028', 4, '12:00:00'),
(7799, '02:00:00', 2, 101, '000087563', 35, '14:00:00'),
(7890, '01:30:00', 3, 101, '2133070552', 2, '16:00:00'),
(8900, '02:00:00', 2, 103, '209333923', 3, '12:00:00'),
(8963, '20:00:00', 22, 105, '2133004076', 37, '14:00:00'),
(9087, '20:00:00', 110, 101, '209215028', 38, '12:00:00'),
(9089, '02:00:00', 22, 105, '2133004076', 3, '14:00:00'),
(9876, '01:30:00', 130, 104, '2133004076', 3, '13:30:00'),
(9990, '02:00:00', 22, 105, '2133004076', 34, '14:00:00'),
(9999, '01:30:00', 1, 101, '209367493', 3, '10:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE IF NOT EXISTS `carrera` (
  `idCarrera` int(11) NOT NULL DEFAULT 0,
  `nombreCarrera` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idDivision` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCarrera`),
  KEY `fk_division` (`idDivision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`idCarrera`, `nombreCarrera`, `idDivision`) VALUES
(1001, 'Administración', 1),
(1002, 'Derecho', 1),
(1003, 'Economía', 1),
(1004, 'Sociología', 1),
(2001, 'Ing. Ambiental', 2),
(2002, 'Ing. Civil', 2),
(2003, 'Ing. Computación', 2),
(2004, 'Ing. Eléctrica', 2),
(2005, 'Ing. Electrónica', 2),
(2006, 'Ing. Física', 2),
(2007, 'Ing. Industrial', 2),
(2008, 'Ing. Mecánica', 2),
(2009, 'Ing. Metalúrgica', 2),
(2010, 'Ing. Química', 2),
(3001, 'Arquitectura', 3),
(3002, 'Diseño Gráfico', 3),
(3003, 'Diseño Industrial', 3),
(4001, 'OTRO', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `division`
--

CREATE TABLE IF NOT EXISTS `division` (
  `idDivision` int(11) NOT NULL DEFAULT 0,
  `division` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDivision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `division`
--

INSERT INTO `division` (`idDivision`, `division`) VALUES
(1, 'CSH'),
(2, 'CBI'),
(3, 'CyAD'),
(4, 'EXT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatus`
--

CREATE TABLE IF NOT EXISTS `estatus` (
  `estatusMateria` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idEstatus` int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idEstatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estatus`
--

INSERT INTO `estatus` (`estatusMateria`, `idEstatus`) VALUES
('No presentado', 0),
('Presentado', 1),
('Aprobado', 2),
('Reprobado', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatusalumno`
--

CREATE TABLE IF NOT EXISTS `estatusalumno` (
  `idEstatusAlum` int(2) NOT NULL DEFAULT 0,
  `estAlum` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idEstatusAlum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estatusalumno`
--

INSERT INTO `estatusalumno` (`idEstatusAlum`, `estAlum`) VALUES
(1, 'Activo'),
(2, 'Activo Asistiendo'),
(3, 'Baja'),
(4, 'Flotante'),
(5, 'Egresado'),
(6, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatusmateria`
--

CREATE TABLE IF NOT EXISTS `estatusmateria` (
  `idAlumno` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `idMateria` int(11) NOT NULL DEFAULT 0,
  `calificacion` int(2) DEFAULT NULL,
  `idEstatus` int(2) NOT NULL DEFAULT 0,
  `fechaExamen` date DEFAULT NULL,
  KEY `fk_materiaEst` (`idMateria`),
  KEY `fk_alumnoMat` (`idAlumno`),
  KEY `fk_estatusMat` (`idEstatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estatusmateria`
--

INSERT INTO `estatusmateria` (`idAlumno`, `idMateria`, `calificacion`, `idEstatus`, `fechaExamen`) VALUES
('123456789000', 22, 7, 2, '2020-02-20'),
('123456789000', 22, 5, 1, '2020-02-29'),
('123456789000', 5, 0, 1, '2020-03-07'),
('983429834274', 4, 8, 2, '2020-02-29'),
('123456789000', 18, 8, 2, '2020-03-21'),
('982103980197', 110, 7, 2, '2020-02-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatusservicio`
--

CREATE TABLE IF NOT EXISTS `estatusservicio` (
  `idEstatusServ` int(2) NOT NULL,
  `estServ` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idEstatusServ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estatusservicio`
--

INSERT INTO `estatusservicio` (`idEstatusServ`, `estServ`) VALUES
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'Baja'),
(4, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaasesoria`
--

CREATE TABLE IF NOT EXISTS `listaasesoria` (
  `idAlumno` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idAsesoria` int(4) NOT NULL DEFAULT 0,
  `pk_idLista` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`pk_idLista`),
  KEY `fk_alumnoLista` (`idAlumno`),
  KEY `fk_asesoriaLista` (`idAsesoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `listaasesoria`
--

INSERT INTO `listaasesoria` (`idAlumno`, `idAsesoria`, `pk_idLista`) VALUES
('140914000995', 9990, 1),
('123456789000', 7799, 2),
('180923000548', 7799, 3),
('123456789000', 900, 4),
('180923000548', 900, 5),
('120914000843', 900, 6),
('190925007281', 900, 7),
('123456789000', 8963, 8),
('130921003744', 8963, 9),
('140923000454', 8963, 10),
('170925013080', 8963, 11),
('170925013080', 9087, 12),
('180923000548', 9087, 13),
('130921003744', 9087, 14),
('180923000054', 9087, 15),
('140914000995', 9087, 16),
('150925002840', 9087, 17),
('123456789000', 987, 18),
('983429834274', 987, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE IF NOT EXISTS `materia` (
  `idMateria` int(3) NOT NULL,
  `nombreMateria` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idPlanEstud` int(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idMateria`),
  KEY `fk_idPlan` (`idPlanEstud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`idMateria`, `nombreMateria`, `idPlanEstud`) VALUES
(1, 'De la informacion al conocimiento', 1),
(2, 'El lenguaje en la relacion del hombre con el mundo', 1),
(3, 'Representaciones simbolicas y algoritmos', 1),
(4, 'Ser social y sociedad', 1),
(5, 'Mi mundo en otra lengua', 1),
(6, 'Tecnologia de informacion y comunicacion', 1),
(7, 'Textos y visiones del mundo', 1),
(8, 'Matematicas y representaciones del sistema natural', 1),
(9, 'Universo natural', 1),
(10, 'Sociedad mexicana contemporanea', 1),
(11, 'Transformaciones en el mundo contemporaneo', 1),
(12, 'Mi vida en otra lengua', 1),
(13, 'Argumentacion', 1),
(14, 'Variacion en procesos sociales', 1),
(15, 'Calculo en fenomenos naturales y procesos sociales', 1),
(16, 'Hacia un desarrollo sustentable', 1),
(17, 'Evolucion y sus repercusiones sociales', 1),
(18, 'Estadisticas en fenomenos naturales y procesos sociales', 1),
(19, 'Dinamica en la naturaleza. El movimiento', 1),
(20, 'Optimizacion en sistemas naturales', 1),
(21, 'Impacto de la ciencia y la tecnologia', 1),
(22, 'Informatica', 1),
(110, 'Ingles I', 2),
(111, 'Matematicas I', 2),
(112, 'Taller de Redaccion I', 2),
(113, 'Metodologia de la Lectura', 2),
(114, 'Historia Moderna de Occidente', 2),
(115, 'Metodologia del Aprendizaje', 2),
(120, 'Ingles II', 2),
(121, 'Matematicas II', 2),
(122, 'Taller de Redaccion II', 2),
(123, 'Textos Literarios I', 2),
(124, 'Historia Mundial Contemporanea', 2),
(125, 'Apreciacion Estetica Pintura', 2),
(130, 'Ingles III', 2),
(131, 'Matematicas III', 2),
(132, 'Taller de Redaccion III', 2),
(133, 'Textos Literarios II', 2),
(134, 'Logica', 2),
(140, 'Ingles IV', 2),
(141, 'Matematicas IV', 2),
(142, 'Textos Filosoficos I', 2),
(143, 'Textos Literarios III', 2),
(144, 'Fisica I', 2),
(145, 'Principios de Quimica', 2),
(146, 'Principios de Fisica', 2),
(147, 'Quimica', 2),
(150, 'Ingles V', 2),
(151, 'Matematicas V', 2),
(152, 'Textos Filosoficos II', 2),
(153, 'Textos Politicos y Sociales I', 2),
(154, 'Fisica II', 2),
(155, 'Principios de Quimica General', 2),
(156, 'Biologia', 2),
(160, 'Ingles VI', 2),
(161, 'Matematicas VI', 2),
(162, 'Textos Cientificos', 2),
(163, 'Textos Politicos y Sociales II', 2),
(164, 'Historia de Mexico del Siglo XX', 2),
(165, 'Apreciacion Estetica Musica', 2),
(166, 'Biologia', 2),
(167, 'Bioetica', 2),
(200, 'INEA', 3),
(300, 'Horas de Taller', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

CREATE TABLE IF NOT EXISTS `periodo` (
  `idPeriodo` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  PRIMARY KEY (`idPeriodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `periodo`
--

INSERT INTO `periodo` (`idPeriodo`, `fechaInicio`, `fechaFin`) VALUES
(2, '2019-10-21', '2019-11-03'),
(3, '2019-11-04', '2019-11-17'),
(4, '2019-11-18', '2019-12-01'),
(34, '2020-02-24', '2020-03-08'),
(35, '2020-03-09', '2020-03-22'),
(36, '2020-03-23', '2020-04-05'),
(37, '2020-04-13', '2020-04-26'),
(38, '2020-04-27', '2020-05-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plandeestudio`
--

CREATE TABLE IF NOT EXISTS `plandeestudio` (
  `idPlanEstud` int(3) NOT NULL DEFAULT 0,
  `planEstud` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idPlanEstud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `plandeestudio`
--

INSERT INTO `plandeestudio` (`idPlanEstud`, `planEstud`) VALUES
(1, '22'),
(2, '33'),
(3, 'INEA'),
(4, 'Talleres');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salon`
--

CREATE TABLE IF NOT EXISTS `salon` (
  `idSalon` int(11) NOT NULL DEFAULT 0,
  `salon` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `edificioSalon` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idSalon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `salon`
--

INSERT INTO `salon` (`idSalon`, `salon`, `edificioSalon`) VALUES
(101, 'Aula A', 'T'),
(102, 'Aula B', 'T'),
(103, 'Cubiculo CEU', 'C'),
(104, 'CEU', 'C'),
(105, 'Sala de Computo', 'C'),
(106, '206', 'F'),
(107, '207', 'F');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `user` varchar(16) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `pass` varchar(16) COLLATE utf8_unicode_ci NOT NULL DEFAULT '123456789',
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`user`, `pass`) VALUES
('cristinaAC', 'pea2019*');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_estatus` FOREIGN KEY (`idEstatusAlumn`) REFERENCES `estatusalumno` (`idEstatusAlum`),
  ADD CONSTRAINT `fk_planEst` FOREIGN KEY (`idPlanEstud`) REFERENCES `plandeestudio` (`idPlanEstud`);

--
-- Filtros para la tabla `asesor`
--
ALTER TABLE `asesor`
  ADD CONSTRAINT `fk_carrera` FOREIGN KEY (`idCarrera`) REFERENCES `carrera` (`idCarrera`),
  ADD CONSTRAINT `fk_estatusServ` FOREIGN KEY (`idEstatusServ`) REFERENCES `estatusservicio` (`idEstatusServ`);

--
-- Filtros para la tabla `asesoria`
--
ALTER TABLE `asesoria`
  ADD CONSTRAINT `fk_asesor` FOREIGN KEY (`matriculaAses`) REFERENCES `asesor` (`matriculaAses`),
  ADD CONSTRAINT `fk_materia` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`idMateria`),
  ADD CONSTRAINT `fk_periodo` FOREIGN KEY (`idPeriodo`) REFERENCES `periodo` (`idPeriodo`),
  ADD CONSTRAINT `fk_salon` FOREIGN KEY (`idSalon`) REFERENCES `salon` (`idSalon`);

--
-- Filtros para la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD CONSTRAINT `fk_division` FOREIGN KEY (`idDivision`) REFERENCES `division` (`idDivision`);

--
-- Filtros para la tabla `estatusmateria`
--
ALTER TABLE `estatusmateria`
  ADD CONSTRAINT `fk_alumnoMateria` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`),
  ADD CONSTRAINT `fk_estatusMat` FOREIGN KEY (`idEstatus`) REFERENCES `estatus` (`idEstatus`),
  ADD CONSTRAINT `fk_materiaEst` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`idMateria`);

--
-- Filtros para la tabla `listaasesoria`
--
ALTER TABLE `listaasesoria`
  ADD CONSTRAINT `fk_alumnoLista` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`),
  ADD CONSTRAINT `fk_asesoriaLista` FOREIGN KEY (`idAsesoria`) REFERENCES `asesoria` (`idAsesoria`);

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `fk_idPlan` FOREIGN KEY (`idPlanEstud`) REFERENCES `plandeestudio` (`idPlanEstud`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
