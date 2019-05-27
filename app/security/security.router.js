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
		const token = securityService.login(req.user);
		res.json({
			token: token
		});
	});

	router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
		res.json({
			test: 'test'
		});
	});

	return router;
};