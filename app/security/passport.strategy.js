var Strategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
	passport.serializeUser((user, callback) => {
		callback(null, user);
	});

	passport.deserializeUser((user, callback) => {
		callback(null, user);
	});

	passport.use(new Strategy(
		function(username, password, callback) {
			if (!username) {
				return done(null, false);
			}
			if (!password) {
				return callback(null, false);
			}
			return callback(null, {
				user: "Arian"
			});
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