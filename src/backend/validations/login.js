
module.exports.login = () => {
	return {

			email: { // Email Rule
					presence: {
							message: "^email: Email can't be blank"
					},
					email: {
							message: '^email: Please enter a valid email'
					}
			},
			password: { // Password rule
					presence: {
							message: "^password: Password can't be blank"
					}
			}
	}
}