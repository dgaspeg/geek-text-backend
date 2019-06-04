/*eslint-env node*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var helmet = require('helmet');
const errorHandler = require('./middleware/error-handler.middleware');

const firebase = require('firebase-admin');
const firebaseAccountConfig = require('../firebase-config.json');
firebase.initializeApp({
	credential: firebase.credential.cert(firebaseAccountConfig),
	databaseURL: 'https://geektext002.firebaseio.com'
});

const passport = require('passport');
require('./security/passport.strategy')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorize');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	next();
});

const securityRoutes = require('./security/security.router')(passport);
app.use('/oauth', securityRoutes);
const ratingsRoutes = require('./ratings/ratings.router')();
app.use('/ratings', ratingsRoutes);

const commentRoutes = require('./comments/comments.router')();
app.use('/comments', commentRoutes);

app.use(errorHandler);

module.exports = app;