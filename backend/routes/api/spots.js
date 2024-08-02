const express = require('express');
const { Spot, SpotImage, User, Review } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require("express-validator");
const { handleValidationErrors } = require('../../utils/validation');

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

// Validation creating a spot
const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be within -180 and 180'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .isFloat({ min: 0 })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors,
];


// GET all spots
router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();

    const spotsInform = spotsInfo(spots);
    res.status(200).json({ Spots: spotsInform });
  } catch (err) {
    next(err);
  }
});

// GET all spots owned by the current user
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

// GET details of a spot by id
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

// POST a new spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
  
    try {
      const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });
  
      res.status(201).json(newSpot);
    } catch (err) {
      next(err);
    }
});  

  

module.exports = router;