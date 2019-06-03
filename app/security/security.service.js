const jwt = require('jsonwebtoken');
const firebaseDatabase = require('firebase-admin').database();
const cryptor = require('bcrypt');
const boom = require('boom');

/**
 * Class in charge of performing the security cheks for the system.
 */
class SecurityService {
	constructor() {
	}

	/**
	 * This function generates a JWT token for the users session.
	 * The function passes the stored document in the database.
	 * @param user User object to give access.
	 */
	async login(user) {
		const userProfile = {
			email: user.email,
			name: user.name,
			lastName: user.lastName
		}
		const token = await jwt.sign(userProfile, '50cd3e348ff2487f888a0b56f90c750a', 
		  { 
			expiresIn: '1d',
			algorithm: 'HS512'
		  }
		);
		return token;
	}

	/**
	 * 
	 * @param {object} user user profile captured in the JWT token
	 */
	async getProfile(user) {
		const userProfile = {
			email: user.email,
			name: user.name,
			lastName: user.lastName
		}
		return userProfile;
	}

	/**
	 * This function registers a new user in the database in case that
	 * the user doesn't exists in the database.
	 * @param {object} newUser new user to add to the database
	 */
	async register(newUser) {
		try {
			var users = await firebaseDatabase.ref('/users')
				.orderByChild('email')
				.equalTo(newUser.email)
				.once('value');
			if (users.numChildren() < 1) {
				const salt = await cryptor.genSalt(10);
				const hashedPassword = await cryptor.hash(newUser.password, salt);
				var users = await firebaseDatabase.ref('/').child('users');
				users.push({
					email: newUser.email,
					name: newUser.name,
					lastName: newUser.lastName,
					password: hashedPassword
				});
				return true;
			} else {
				return false;
				
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	/**
	 * This function returns the user that has the email being passed as a 
	 * parameter. If the user doesn't exists or if it is duplicated, it will
	 * return null as a response.
	 * @param {string} email 
	 */
	async getUserByEmail(email) {
		var users = await firebaseDatabase.ref('/users')
			.orderByChild('email')
			.equalTo(email)
			.once('value');
		if (users.numChildren() !== 1) {
			return undefined;
		} else {
			users.forEach((item) => {
				const user = JSON.parse(JSON.stringify(item));
				user.key = item.key;
				return user;
			});
		}
	}
}


module.exports = new SecurityService();