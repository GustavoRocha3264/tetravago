<?php

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "trabalho_hotel";


//estabelecer a conexão
try {
    $conexao = new mysqli($host, $usuario, $senha, $banco);
    
    if ($conexao->connect_errno) {
        throw new Exception("Erro de conexão com o banco de dados: " . $conexao->connect_error);
    } else {
        error_log("Conexão efetuada com sucesso!");

    }
} catch (Exception $e) {
    error_log( "Ocorreu um erro: " . $e->getMessage());
}

?>
