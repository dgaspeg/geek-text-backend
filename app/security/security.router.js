/*eslint-env node*/

const express = require('express');
const router = express.Router();
const securityService = require('./security.service');

module.exports = (passport) => {
	router.get('/test', (req, res, next) => {
		res.json(res.resultPayload = {
			test: 'OKAY'
		});
	});
	
	router.post('/authenticate', passport.authenticate('local', { }), async (req, res, next) => {
		const token = await securityService.login(req.user);
		res.json({
			token: token
		});
	});

	router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
		res.json({
			test: 'Arian Profile'
		});
	});

	return router;
};