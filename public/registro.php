<?php
include './http:/localhost/alevosia_webservice/conexion.php';

$usuario=$_POST['username'];
$nombre=$_POST['nombre'];
$CP=$_POST['codigopostal'];
$txtestado=$_POST['estado'];
$txtmunicipio=$_POST['municipio'];
$txtcolonia=$_POST['colonia'];
$Calle=$_POST['calle'];
$Numero_Interior=$_POST['numinterior'];
$Numero_Exterior=$_POST['numexterior'];
$password=$_POST['passwords'];
$correo=$_POST['email'];
$telefono=$_POST['telefono'];


$consulta="CALL spaddcliente ('$usua','$nom' , '$cp',  '$esta', '$mun', '$col', '$ave', '$nuint', '$nuext', '$contra','$correo', '$cel')";

$resultado=mysqli_query($conexion,$consulta);

?>

<!--
function insertarUsuario($usua, $nom , $cp,  $esta, $mun, $col, $ave, $nuint, $nuext, $contra,$correo, $cel) {
    global $pdo;
    $sql = "INSERT INTO alevosia_prueba.usuarios (username, nombre, codigopostal, estado, municipio,colonia,calle,numinterior,numexterior,passwords,email,telefono) VALUES (?, ?, ?)";
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$usua,$nom , $cp,  $esta, $mun, $col, $ave, $nuint, $nuext, $contra,$correo, $cel]);
        
        $rowCount = $stmt->rowCount();
        if ($rowCount > 0) {
            $expiration = strtotime("+168 hours"); // Obtener la fecha y hora actual más 7 días
            $expirationFormatted = date('d/m/Y H:i:s', $expiration);
            enviarRespuesta(true, null, null, $expirationFormatted);
        } else {
            enviarRespuesta(false, "No se pudo insertar el usuario.", null, null);
        }
    } catch (PDOException $e) {
        enviarRespuesta(false, "Error de SQL: " . $e->getMessage(), null, null);
    }
}-->