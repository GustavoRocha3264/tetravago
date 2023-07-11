function compareDates(checkInDate, checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn < checkOut) {
      return true;
    } else if (checkIn > checkOut) {
      return false;
    } else {
      return false;
    }
  }

module.exports = compareDates;