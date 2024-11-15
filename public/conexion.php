<?php

$host = "localhost";
$usuario = "root";
$contrasena = "";
$database = "alevosia_prueba";

$conexion = mysqli_connect($host,$usuario,$contrasena,$database);

if(!$conexion)
   {
    echo "No se pudo conectar";
    exit();
   }


?>



<!-- 
   try{
	$pdo = new PDO('mysql:host=localhost;dbname=alevosia_prueba', 'root', '');
	$pdo->setAttribute (PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
	$pdo->exec('SET NAMES "utf8"');
}
catch (PDOException $e){
	echo "ERROR CONECTING TO DATABASE " . $e->getMessage();
	exit();
}
    -->