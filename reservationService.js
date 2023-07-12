async function createReservation(connection, reservationID, status, checkInDate, checkOutDate, clientEmail, idQuarto) {
    // Insert the reservation data into the database
    connection.query(
      'INSERT INTO reservas (id_reserva, status, data_checkin, data_checkout, cliente_email, quartos_id_quarto) VALUES (?, ?, ?, ?, ?, ?)',
      [reservationID, status, checkInDate, checkOutDate, clientEmail, idQuarto]
    );

    console.log('Reservation created successfully.');
}

module.exports = createReservation;