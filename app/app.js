/*eslint-env node*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var helmet = require('helmet');
const errorHandler = require('./middleware/error-handler.middleware');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorize');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	next();
});

const securityRoutes = require('./security/security.router');
app.use('/oauth', securityRoutes);
app.use(errorHandler);

module.exports = app;