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
  res.json({ Bookings });
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
      const e = new Error("Cannot modify past bookings");
      e.status = 403;
      next(e);
    }
    if (toEdit.userId === user.id) {
      const { startDate, endDate } = req.body;
      toEdit.set({ startDate, endDate });
      const edited = await toEdit.save();
      res.json(edited);
    } else {
      const e = new Error("Forbidden");
      e.status = 320;
      next(e);
    }
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const currBooking = await Booking.findByPk(bookingId);
  currBooking.destroy();

  res.json({ message: "success" });
});

module.exports = router;
