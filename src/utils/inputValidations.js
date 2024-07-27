export const firstName_validation = {
	name: "firstName",
	label: "First Name",
	type: "text",
	id: "firstName",
	placeholder: "Enter your first name",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		maxLength: {
			value: 30,
			message: "30 characters max",
		},
	},
};

export const lastName_validation = {
	name: "lastName",
	label: "Last Name",
	type: "text",
	id: "lastName",
	placeholder: "Enter your last name",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		maxLength: {
			value: 30,
			message: "30 characters max",
		},
	},
};

export const password_validation = {
	name: "password",
	label: "password",
	type: "password",
	id: "password",
	placeholder: "Password",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		minLength: {
			value: 6,
			message: "min 6 characters",
		},
	},
};

export const email_validation = {
	name: "email",
	label: "Email address",
	type: "email",
	id: "email",
	placeholder: "Email address",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: "not valid",
		},
	},
};
