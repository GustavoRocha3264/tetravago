function createHTML(connection) {
    let htmlString = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <title>TetraVago</title>
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="shortcut icon" href="img/logo2.png" type="image/x-icon">
    </head>
    <body>
        <header>
        <div class="logo">
            <li><a href="index"><img src="img/tetralogo.png" alt="Logotipo TetraVago"></a></li>
        </div>

        <nav>
            <ul>
                <li><a href="index">HOME</a></li>
                <li><a href="hoteis">HOTEIS</a></li>
                <li><a href="sobre">SOBRE</a></li>
                <li><a href="cadastro">CADASTRAR</a></li>
                <li><a href="entrar">LOGIN</a></li>   
                <li>
                    <a href="usuario">
                        <i class="fas fa-user user-icon"></i> <!-- Ícone de usuário com a classe "user-icon" -->
                        
                    </a>
                </li>

            </ul>
        </nav>
        </header>
  
        <section class="reservas">
        <h3>Suas Reservas</h3>
        <table>
            <thead>
                <tr>
                    <th style="font-size: 12px; font-family: Arial;">Id</th>
                    <th style="font-size: 12px; font-family: Arial;">Entrada</th>
                    <th style="font-size: 12px; font-family: Arial;">Saida</th>
                    <th style="font-size: 12px; font-family: Arial;">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
            `;
  
    const sql = `SELECT reservas.id_reserva, reservas.data_checkin, reservas.data_checkout, reservas.status FROM cliente
    INNER JOIN reservas ON cliente.email = reservas.cliente_email`;
  
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Erro na consulta:', error);
          reject(error);
          return;
        }
  
        // Adiciona cada reserva à lista
        results.forEach((row) => {
          htmlString += `<td style="font-size: 12px; font-family: Arial;">${row.id_reserva}</td>
          `;
          htmlString += `<td style="font-size: 12px; font-family: Arial;">${row.data_checkin}</td>
          `;
          htmlString += `<td style="font-size: 12px; font-family: Arial;">${row.data_checkout}</td>
          `;
          htmlString += `<td style="font-size: 12px; font-family: Arial;">${row.status}</td>
          `;
        });
  
        // Fecha a seção HTML de reservas
        htmlString += `
              </tr>
              </tbody>
              </table>
          </section>
      </body>
      </html>`;
        
        resolve(htmlString);
      });
    });
  }
  
  module.exports = createHTML;
  