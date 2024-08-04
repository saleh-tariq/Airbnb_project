const express = require("express");

const { Booking, Spot } = require("../../db/models");

const router = express.Router();

const { requireAuth } = require("../../utils/auth");

router.get("/current", async (req, res) => {
  const userId = req.user.id;
  const Bookings = await Booking.findAll({
    where: { userId },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
          //"previewImg",
        ],
      },
    ],
  });
  res.status(200).json({ Bookings });
});

router.post("/", async (req, res, next) => {});

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  try {
    const { user } = req;
    const { bookingId } = req.params;
    const toEdit = await Booking.findByPk(bookingId);
    if (!toEdit) {
      const e = new Error("Booking couldn't be found");
      e.status = 404;
      next(e);
    }

    if (new Date(toEdit.startDate).getTime() < Date.now()) {
      return res
        .status(403)
        .json({ message: "Past bookings can't be modified" });
    }

    if (toEdit.userId === user.id) {
      const { startDate, endDate } = req.body;
      const isConflicting = await checkConflict({
        spotId: toEdit.spotId,
        startDate,
        endDate,
      });

      if (isConflicting) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.errors = isConflicting;
        err.status = 403;
        throw err;
      }
      toEdit.set({ startDate, endDate });
      const edited = await toEdit.save();
      res.json(edited);
    } else {
      return res.status(320).json({ message: "Forbidden" });
    }
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const currBooking = await Booking.findByPk(bookingId);
  if (!currBooking) {
    res.status(404).json({ message: "Booking couldn't be found" });
  }
  if (currBooking.userId !== req.user.id) {
    return res.status(320).json({ message: "Forbidden" });
  }
  currBooking.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
