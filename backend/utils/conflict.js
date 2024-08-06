const { Booking, Spot } = require("../db/models");
async function checkConflict(booking) {
  const { spotId, startDate, endDate } = booking;
  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [Booking],
  });
  const bookings = spot.Bookings;
  const res = {};
  for (let i = 0; i < bookings.length; i++) {
    const [min, max, start, end] = [
      new Date(bookings[i].startDate).getTime(),
      new Date(bookings[i].endDate).getTime(),
      new Date(startDate).getTime(),
      new Date(endDate).getTime(),
    ];
    if (
      bookings[i].id !== booking.id &&
      (start === end ||
        (min >= start && min <= end) ||
        (max >= start && max <= end))
    ) {
      res.startDate = "Start date conflicts with an existing booking";
      res.endDate = "End date conflicts with an existing booking";
    }
    if (bookings[i].id !== booking.id && start >= min && start <= max) {
      res.startDate = "Start date conflicts with an existing booking";
    }
    if (bookings[i].id !== booking.id && end >= min && end <= max) {
      res.endDate = "End date conflicts with an existing booking";
    }
  }
  return res.startDate || res.endDate ? res : false;
}
module.exports = checkConflict;
