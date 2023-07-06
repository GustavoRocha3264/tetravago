document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Verifica as credenciais de login
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Lógica de verificação de login
    if (username === "admin" && password === "admin123") {
        window.location.href = "dashboard.html"; // Redireciona para o dashboard
    } else {
        alert("Credenciais inválidas. Por favor, tente novamente."); // Exibe uma mensagem de erro
    }
});