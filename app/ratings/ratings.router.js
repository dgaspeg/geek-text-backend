/*eslint-env node*/

const express = require('express');
const router = express.Router();
const ratingsService = require('./ratings.service');

module.exports = () => {
	router.get('/get-ratings', async (req, res, next) => {
		const rating = await ratingsService.getRatingForBook("Test");
		res.json({
			result: rating
		});
	});

	return router;
};