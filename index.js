const express = require("express");
const app = express();

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

app.get("/contato", function(req, res){
    res.sendFile(__dirname + "/views/contato.html");
});

app.get("/hoteis", function(req, res){
    res.sendFile(__dirname + "/views/Hotel/hoteis.html");
});

app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/views/sobre.html");
});

app.listen(5500, function(){
    console.log("Operating Server at: http://localhost:5500")
});