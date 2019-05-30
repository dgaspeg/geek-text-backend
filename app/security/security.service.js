const jwt = require('jsonwebtoken');

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
		const token = jwt.sign({
			data: user
		  }, '50cd3e348ff2487f888a0b56f90c750a', 
		  { 
			expiresIn: '1d',
			algorithm: 'HS512'
		  }
		);
		return token;
	}
}


module.exports = new SecurityService();