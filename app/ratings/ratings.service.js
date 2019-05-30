/**
 * Class in charge of performing the security cheks for the system.
 */
class RatingsService {
	constructor() {
	}

	/**
	 * This function generates a JWT token for the users session.
	 * The function passes the stored document in the database.
	 * @param user User object to give access.
	 */
	async getRatingForBook(bookTitle) {
		return {
			test: 'test'
		};
	}
}

module.exports = new RatingsService();