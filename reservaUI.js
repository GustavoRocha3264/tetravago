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
        <!-- Resto do código HTML -->
  
        <section class="reservas">
            <h3>Suas Reservas</h3>
            <ul>`;
  
    const sql = `SELECT reservas.id_reserva FROM cliente
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
          htmlString += `<li>${row.id_reserva}</li>`;
        });
  
        // Fecha a seção HTML de reservas
        htmlString += `
              </ul>
            </section>`;
        
        resolve(htmlString);
      });
    });
  }
  
  module.exports = createHTML;
  