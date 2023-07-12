async function createReservation(connection, reservationID, status, checkInDate, checkOutDate, clientEmail, idQuarto, res) {
    // Insert the reservation data into the database
    connection.query(
      'INSERT INTO reservas (id_reserva, status, data_checkin, data_checkout, cliente_email, quartos_id_quarto) VALUES (?, ?, ?, ?, ?, ?)',
      [reservationID, status, checkInDate, checkOutDate, clientEmail, idQuarto]
    );

    console.log('Reserva criada com sucesso');
}

module.exports = createReservation;