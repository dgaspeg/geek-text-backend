/*eslint-env node*/

const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
	res.json(res.resultPayload = {
		test: 'OKAY'
	});
});

router.post('/authenticate', (req, res, next) => {
	
});

module.exports = router;