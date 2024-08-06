export const firstName_validation = {
	name: 'firstName',
	label: 'First Name',
	type: 'text',
	id: 'firstName',
	placeholder: 'Enter your first name',
	validation: {
		required: {
			value: true,
			message: 'First name is required',
		},
		maxLength: {
			value: 30,
			message: '30 characters max',
		},
	},
}

export const lastName_validation = {
	name: 'lastName',
	label: 'Last Name',
	type: 'text',
	id: 'lastName',
	placeholder: 'Enter your last name',
	validation: {
		required: {
			value: true,
			message: 'Last name is required',
		},
		maxLength: {
			value: 30,
			message: '30 characters max',
		},
		pattern: {
			value:
				/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
			message:
				'Password must contain at least one uppercase letter, one number, and one special character',
		},
	},
}

export const password_validation = {
	name: 'password',
	label: 'password',
	type: 'password',
	id: 'password',
	placeholder: 'Enter your password here',
	validation: {
		required: {
			value: true,
			message: 'Password is required',
		},
		minLength: {
			value: 8,
			message: 'Minimum 8 characters',
		},
		pattern: {
			value:
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&/*()_+\\\\])[A-Za-z\d!@#$%^&/*()_+\\\\]{7,19}$/,
			message:
				'Password must contain at least one uppercase letter, one number, and one special character',
		},
	},
}

export const repeat_password_validation = {
	name: 'repeat_password',
	label: 'repeat password',
	type: 'password',
	id: 'repeat_password',
	placeholder: 'Enter the password again',
	validation: {
		required: {
			value: true,
			message: 'Password is required',
		},
		minLength: {
			value: 8,
			message: 'Minimum 8 characters',
		},
		pattern: {
			value:
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&/*()_+\\\\])[A-Za-z\d!@#$%^&/*()_+\\\\]{7,19}$/,
			message:
				'Password must contain at least one uppercase letter, one number, and one special character',
		},
	},
}

export const email_validation = {
	name: 'email',
	label: 'Email address',
	type: 'email',
	id: 'email',
	placeholder: 'Enter your Email here',
	validation: {
		required: {
			value: true,
			message: 'Email is required',
		},
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Email is not valid',
		},
	},
}
