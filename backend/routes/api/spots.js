const express = require('express');
const { Spot, SpotImage, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const spotsInfo = (spots) => {
    return spots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: 4.5, //placeholder
        previewImage: "image url" //placeholder
      }));
};

// Get all spots
router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();

    const spotsInform = spotsInfo(spots);
    res.status(200).json({ Spots: spotsInform });
  } catch (err) {
    next(err);
  }
});

// Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
      const currentUserId = req.user.id;
      const spots = await Spot.findAll({
        where: { ownerId: currentUserId }
      });
      const spotsInform = spotsInfo(spots);
      res.status(200).json({ Spots: spotsInform });
    } catch (err) {
      next(err);
    }
  });



module.exports = router;