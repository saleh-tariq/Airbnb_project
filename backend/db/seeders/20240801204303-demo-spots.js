"use strict";
const { query } = require("express");
const { Spot } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const bulkSpots = [
	{
		"id": 1,
		"ownerId": 1,
		"address": "123 Disney Lane",
		"city": "San Francisco",
		"state": "California",
		"country": "United States of America",
		"lat": 37.7645358,
		"lng": -122.4730327,
		"name": "App Academy",
		"description": "Place where web developers are created",
		"price": 123
	  },
	  {
		"id": 2,
		"ownerId": 2,
		"address": "456 Code Road",
		"city": "New York",
		"state": "New York",
		"country": "United States of America",
		"lat": 40.712776,
		"lng": -74.005974,
		"name": "Hack Reactor",
		"description": "Immersive coding",
		"price": 150
	  },
	  {
		"id": 3,
		"ownerId": 3,
		"address": "789 Silicon Blvd",
		"city": "Austin",
		"state": "Texas",
		"country": "United States of America",
		"lat": 30.267153,
		"lng": -97.743057,
		"name": "Galvanize",
		"description": "Tech learning community",
		"price": 130
	  },
	  {
		"id": 4,
		"ownerId": 1,
		"address": "1010 Startup Ave",
		"city": "Seattle",
		"state": "Washington",
		"country": "United States of America",
		"lat": 47.606209,
		"lng": -122.332071,
		"name": "General Assembly",
		"description": "Transform tech education",
		"price": 145
	  },
	  {
		"id": 5,
		"ownerId": 2,
		"address": "1112 Dev Lane",
		"city": "Los Angeles",
		"state": "California",
		"country": "United States of America",
		"lat": 34.052235,
		"lng": -118.243683,
		"name": "Le Wagon",
		"description": "Coding for entrepreneurs",
		"price": 135
	  }
	];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Spots", bulkSpots, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    await queryInterface.bulkDelete(bulkSpots)
	},
};
