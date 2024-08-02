const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { Review, User, Spot, ReviewImage } = require("../../db/models");

router.delete('/:imageId', async (req, res) => {
    const img = await ReviewImage.findByPk(req.params.imageId);
    
})

module.exports = router;