<?php
// Verificar se houve uma ação dentro da página entrar.php
if (isset($_POST['submit']) && !empty($_POST['email'])) {
    // Não está vazio o campo de email
    // Conectar ao banco de dados
    include_once('conectar.php');

    // Variáveis de armazenamento
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Consulta para obter o registro do cliente com base no email
    $sql_code = "SELECT * FROM cliente WHERE email = '$email' LIMIT 1";
    $result = mysqli_query($conexao, $sql_code);

    if ($result && mysqli_num_rows($result) > 0) {
        $cliente = mysqli_fetch_assoc($result);
        $senha_hash = $cliente['senha'];

        // Verificar se a senha digitada corresponde à senha armazenada
        if (password_verify($senha, $senha_hash)) {
            header("Location: usuario.php");
            exit();
        }
    }

    header("Location: entrar.php");
    exit();
}
?>
