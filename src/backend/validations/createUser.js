
module.exports.createUser = () => {
	return {

			first_name: {
				presence: {
						message: "^First Name can't be blank"
				},
				format: {
					pattern: "[a-zA-Z]+",
					flags: "i",
					message: "^Only characters are allowed"
				},
				length: {
					mimimum: 2,
					maximum: 40
				}
			},
			last_name: {
				presence: {
						message: "^Last Name can't be blank"
				},
				format: {
					pattern: "[a-zA-Z]+",
					flags: "i",
					message: "^Only characters are allowed"
				},
				length: {
					mimimum: 2,
					maximum: 40
				}
			},
			mobile_no: {
				presence: {
						message: "^Mobile Number can't be blank"
				},
				length: {
					minimum: 7,
					maximum: 14,
					message: "^Invalid Phone number"
				}
		},
			emailid: {
				presence: {
				 		message: "^Email can't be blank"
				},
				email: {
					email: true,
					message: "^Email is not valid"
				},
				length: {
					minimum: 5,
					maximum: 40
				}
			},
			password: {
				presence: {
					message: "^Password can't be blank"
				},
				length: {
					mimimum: 6,
					maximum: 40
				}
			}
	}
}