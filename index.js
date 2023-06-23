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



app.listen(5500, function(){
    console.log("Operating Server at: http://localhost:5500")
});