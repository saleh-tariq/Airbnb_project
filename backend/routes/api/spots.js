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

// Get details of a spot by id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
    try {
      const spot = await Spot.findByPk(spotId, {
        include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: SpotImage, attributes: ['id', 'url', 'preview'] },
        { model: Review }
        ]
      });
  
      if (!spot) {
        res.status(404).json({
          message: "Spot couldn't be found"
        });
      } else {
        const spotInformed = {
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
          numReviews: 5, //placeholder
          avgStarRating: 4.5, //placeholder
          SpotImages: spot.SpotImages,
          Owner: spot.User
        };
  
        res.status(200).json(spotInformed);
      }
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;