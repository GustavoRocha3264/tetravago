<!-- Conteúdo do PHP -->
<?php
include_once('conectar.php');

if (isset($_POST['submit'])) {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Verificar se o email já está cadastrado
    $stmt = $conexao->prepare("SELECT COUNT(*) FROM cliente WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo "O email já está sendo utilizado. Por favor, tente com um email diferente.";
    } else {
        // O email não está cadastrado, realizar o cadastro
        $hashSenha = password_hash($senha, PASSWORD_DEFAULT);

        $stmt = $conexao->prepare("INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nome, $email, $hashSenha);

        if ($stmt->execute()) {
            // Cadastro realizado com sucesso, redirecionar para a página de confirmação
            header("Location: cadastro.php");
            echo "Cadastro realizado com sucesso";
            exit(); // Termina a execução do script após o redirecionamento
        } else {
            echo "Erro ao cadastrar: ";
            
        }

        $stmt->close();
    }

    $conexao->close();
}
?>

</html>
