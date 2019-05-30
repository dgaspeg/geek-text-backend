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
	
	router.post('/authenticate', passport.authenticate('local', { }), (req, res, next) => {
		const token = await securityService.login(req.user);
		console.log(JSON.stringify(token));
		res.json({
			token: "test"
		});
	});

	router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
		res.json({
			test: 'test'
		});
	});

	return router;
};