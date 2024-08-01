"use strict";
const { query } = require("express");
const { Spot } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate([
			{
				ownerId: 1,
				address: "173 Disney Lane",
				city: "San Francisco",
				state: "California",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "App Academy",
				description: "Place where web developers are created",
				price: 123,
			},
			{
				ownerId: 2,
				address: "193 Disney Lane",
				city: "San Francisco",
				state: "California",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "App Academy",
				description: "Place where web developers are created",
				price: 123,
			},
			{
				ownerId: 3,
				address: "153 Disney Lane",
				city: "San Francisco",
				state: "California",
				country: "United States of America",
				lat: 37.7645358,
				lng: -122.4730327,
				name: "App Academy",
				description: "Place where web developers are created",
				price: 123,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    await queryInterface.bulkDelete([])
	},
};
