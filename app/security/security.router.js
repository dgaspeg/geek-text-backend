/*eslint-env node*/

const express = require('express');
const router = express.Router();
const securityService = require('./security.service');

module.exports = (passport) => {
	router.post('/authenticate', passport.authenticate('local', { }), async (req, res, next) => {
		const token = await securityService.login(req.user);
		res.json({
			token: token
		});
	});

	router.post('/signup', async (req, res, next) => {
		const result = await securityService.register(req.body.newUser);
		res.json({
			payload: result
		});
	});

	router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
		const profile = await securityService.getProfile(req.user);
		res.json({
			payload: profile
		});
	});

	return router;
};