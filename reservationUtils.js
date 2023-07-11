// reservationUtils.js
async function generateUniqueReservationId(connection) {
  return new Promise((resolve, reject) => {
    let reservationId = null;
    let isDuplicate = true;

    (function generateId() {
      reservationId = Math.floor(Math.random() * 100000);

      connection.query(
        'SELECT id_reserva FROM reservas WHERE id_reserva = ?',
        [reservationId],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length === 0) {
            isDuplicate = false;
            resolve(reservationId);
          } else {
            generateId();
          }
        }
      );
    })();
  });
}

module.exports = generateUniqueReservationId;