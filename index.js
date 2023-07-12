const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const compareDates = require('./dateUtils');
const generateUniqueReservationId = require('./reservationUtils');
const createReservation = require('./reservationService');
const createHTML = require('./reservaUI');

let connection = mysql.createConnection({
  "user": "root",
  "password": "123",
  "database": "trabalho_hotel",
  "host": "localhost",
  "port": 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }

  console.log('Connected to MySQL database');
});

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/css', express.static(__dirname + '/views/css'));

app.use('/img', express.static(__dirname + '/views/img'));

app.use('/images', express.static(__dirname + '/views/images'));

app.use('/js', express.static(__dirname + '/views/js'));

app.use(session({secret: 'd321y9831hd10923uhjhnl', resave: true, saveUninitialized: true}))

app.get('/', function(req, res){
    if(req.session.login){
      res.redirect('/usuario');
    }
    else{
      res.redirect('/index');
    }
})

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/views/index.html')
})

app.get("/cadastro", function(req, res){
    res.sendFile(__dirname + "/views/cadastro.html");
});

app.post("/cadastro", (req, res) =>{
  const { nome, email, senha } = req.body;
  if(nome && email && senha){
    connection.query('SELECT email FROM cliente WHERE email = ?', [email], async (error, results)=>{
      if(results > 0){
        console.log('email ja cadastrado');
      }
      else{
        const hashSenha = await bcrypt.hash(senha, 10);
        connection.query('INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashSenha], (error, results) =>{
          if(error) {return res.status(500).send({error: error})}

          req.session.login = email;
          res.redirect('/');
        })
      }
    })
  }
  else{
    res.redirect('/cadastro');
  }
})

app.get("/entrar", function(req, res){
    res.sendFile(__dirname + "/views/entrar.html");
});

app.post('/entrar', (req, res) => {
  const { email, senha } = req.body;

  if (email && senha) {
      connection.query('SELECT * FROM cliente WHERE email = ?', [email], async (error, results)=>{
        if(error) {return res.status(500).send({error: error})}

        else{

          if (results.length > 0){
            const cliente = results[0];
            const senha_bd = cliente.senha;

            if(await bcrypt.compare(senha, senha_bd)){
              req.session.login = email;
              res.redirect('/');
            }
            else{
              res.redirect('/entrar');
            }

          }
          else{
            res.redirect('/entrar')
            console.log('usuario não encontrado');
          }

        }

      })
  } else {
    res.redirect('/entrar');
  }
});

app.get('/usuario', (req, res) => {
  if(req.session.login){
    connection.query('SELECT * FROM cliente WHERE email = ?', [req.session.login], (error, results) =>{
      if(error) {return res.status(500).send({error: error})}

      if (results.length > 0){
        const nome = results[0].nome;
        res.render(__dirname + '/views/usuario', {login: nome});
      }
    })
  }
  else{
    res.redirect('/entrar');
  }
});

app.post('/logout', function(req, res){
  req.session.login = null;
  res.redirect('/entrar');
})

app.get("/contato", function(req, res){
    res.sendFile(__dirname + "/views/contato.html");
});

app.get("/hoteis", function(req, res){
    res.sendFile(__dirname + "/views/hoteis.html");
});

app.get('/reserva1', function(req, res){
  if(req.session.login){
    res.sendFile(__dirname + "/views/vilamar1.html");
  }
  else{
    res.redirect('/entrar');
  }
})

app.post('/reserva1', async function(req, res) {
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;
  const roomId = req.body.roomId;

  if(compareDates(checkIn, checkOut)){
    try {
      const reservationID = await generateUniqueReservationId(connection);
  
      await createReservation(connection, reservationID, "efetuada", checkIn, checkOut, req.session.login, roomId);
      res.redirect('/confirma');
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).send('Error creating reservation.');
    }
  }
});

app.get('/reserva2', function(req, res){
  if(req.session.login){
    res.sendFile(__dirname + "/views/vilamar2.html");
  }
  else{
    res.redirect('/entrar');
  }
})

app.post('/reserva2', async function(req, res){
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;
  const roomId = req.body.roomId;
  
  if(compareDates(checkIn, checkOut)){
    try {
      const reservationID = await generateUniqueReservationId(connection);
  
      await createReservation(connection, reservationID, "efetuada", checkIn, checkOut, req.session.login, roomId);
      res.redirect('/confirma');
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).send('Error creating reservation.');
    }
  }
})

app.get('/reserva3', function(req, res){
  if(req.session.login){
    res.sendFile(__dirname + "/views/vilamar3.html");
  }
  else{
    res.redirect('/entrar');
  }
})

app.post('/reserva3', async function(req, res){
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;
  const roomId = req.body.roomId;
  
  if(compareDates(checkIn, checkOut)){
    try {
      const reservationID = await generateUniqueReservationId(connection);
  
      await createReservation(connection, reservationID, "efetuada", checkIn, checkOut, req.session.login, roomId);
      res.redirect('/confirma');
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).send('Error creating reservation.');
    }
  }
})

app.get("/sobre", function(req, res){
    res.sendFile(__dirname + "/views/sobre.html");
});

app.get("/reservas", function(req, res){
  createHTML(connection).then((htmlString) => {
    res.send(htmlString);
  }).catch((error) => {
    console.error('Erro ao criar HTML:', error);
  });
})

app.listen(5500, function(){
    console.log("Operating Server at: http://localhost:5500")
});