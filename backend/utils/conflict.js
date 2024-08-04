const { Booking, Spot } = require("../db/models");
async function checkConflict(booking) {
  const { spotId, startDate, endDate } = booking;
  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [Booking],
  });
  const bookings = spot.Bookings;
  const bookingTimeline = [];
  for (let i = 0; i < booking.length; i++) {
    const [min, max, start, end] = [
      new Date(booking[i].startDate),
      new Date(booking[i].endDate),
      new Date(startDate),
      new Date(endDate),
    ];
    if ((start >= min && start <= max) || (end >= min, end <= max)) {
      return false;
    }
  }
  return true;
}
module.exports = checkConflict;
