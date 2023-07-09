const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/cadastro", function(req, res){
    res.sendFile(__dirname + "/views/cadastro.html");
});

app.get("/entrar", function(req, res){
    res.sendFile(__dirname + "/views/entrar.html");
});

app.post('/entrar', (req, res) => {
  const { email, senha } = req.body;

  if (email && senha) {
    // Simulação de consulta ao banco de dados
    const cliente = {
      email: 'cliente@example.com',
      senhaHash: '$2b$10$a2E.wdOxTGtJ9v1cbJ9nSeLY28rGM9oneTcd1kaS6a5Mhx4bTInbi' // Senha: 'senha123'
    };

    bcrypt.compare(senha, cliente.senhaHash).then((result) => {
        if (result) {
          res.redirect('/usuario');
        } else {
          res.redirect('/entrar');
        }
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/entrar');
      });
  } else {
    res.redirect('/entrar');
  }
});

// Rota para a página do usuário (usuario.php)
app.get('/usuario', (req, res) => {
  res.sendFile(__dirname + "/views/usuario.html");
});

app.get("/contato", function(req, res){
    res.sendFile(__dirname + "/views/contato.html");
});

app.get("/hoteis", function(req, res){
    res.sendFile(__dirname + "/views/Hotel/hoteis.html");
});

app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/views/sobre.html");
});

app.get("/admin", function(req, res){
    res.sendFile(__dirname + "/views/admin/login.html");
});

app.listen(5500, function(){
    console.log("Operating Server at: http://localhost:5500")
});