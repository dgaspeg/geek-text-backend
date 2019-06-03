var Strategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const firebaseDatabase = require('firebase-admin').database();
const cryptor = require('bcrypt');

module.exports = (passport) => {
	passport.serializeUser((user, callback) => {
		callback(null, user);
	});

	passport.deserializeUser((user, callback) => {
		callback(null, user);
	});

	passport.use(new Strategy(
		async function(username, password, callback) {
			if (!username) {
				return done(null, false);
			}
			if (!password) {
				return callback(null, false);
			}
			var users = await firebaseDatabase.ref('/users')
				.orderByChild('email')
				.equalTo(username)
				.once('value');
			if (users.numChildren() !== 1) {
				return callback(null, false);
			} else {
				users.forEach((item) => {
					const user = JSON.parse(JSON.stringify(item));
					user.key = item.key;
					cryptor.compare(password, user.password, (err, same) => {
						if (same) {
							return callback(null, user);
						} else {
							return callback(null, false);
						}
					});
				});
			}
		})
	);
	
	passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '50cd3e348ff2487f888a0b56f90c750a'
    },
		function (jwtPayload, callback) {
			return callback(null, jwtPayload);
		}
	));
};