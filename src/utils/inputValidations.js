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
		}
	},
}

export const hintName_validation = {
	name: 'hintName',
	label: 'hint Name',
	type: 'text',
	id: 'hintName',
	placeholder: 'Enter your hint name',
	validation: {
		required: {
			value: true,
			message: 'hint name is required',
		},
		maxLength: {
			value: 30,
			message: '30 characters max',
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


export const old_password_validation = {
	name: 'old_password',
	label: 'old password',
	type: 'password',
	id: 'old_password',
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

export const mobile_validation = {
	name: 'mobile',
	label: 'Mobile Number',
	type: 'tel',
	id: 'mobile',
	placeholder: 'Enter your Mobile Number here',
	validation: {
		required: {
			value: true,
			message: 'Mobile number is required',
		},
		pattern: {
			value: /^[0-9]{10,15}$/,
			message: 'Mobile number is not valid',
		},
	},
};

export const alt_mobile_validation = {
	name: 'alt_mobile',
	label: 'ALternate Mobile Number',
	type: 'tel',
	id: 'alt_mobile',
	placeholder: 'Enter your Alternate Mobile Number here',
	validation: {
		required: {
			value: true,
			message: 'Alternate Mobile number is required',
		},
		pattern: {
			value: /^[0-9]{10,15}$/,
			message: 'Alternate Mobile number is not valid',
		},
	},
};

export const gender_validation = {
	name: 'gender',
	label: 'Gender',
	type: 'select',
	id: 'gender',
	placeholder: 'Select your Gender',
	options: [
		{label: 'Select your Gender' ,value: ""},
		{ label: 'Male', value: 'Male' },
		{ label: 'Female', value: 'Female' },
		{ label: 'Other', value: 'Other' },
		{ label: 'Prefer not to say', value: 'Prefer not to say' },
	],
	validation: {
		required: {
			value: true,
			message: 'Gender is required',
		},
		pattern: {
			value: /^(Male|Female|Other|Prefer not to say)$/,
			message: 'Gender is not valid',
		},
	},
}


export const dob_validation = {
	name: 'dateOfBirth',
	label: 'Date of Birth',
	type: 'date',
	id: 'dob',
	placeholder: 'Enter your Date of Birth here',
	validation: {
		required: {
			value: true,
			message: 'Date of Birth is required',
		},
		pattern: {
			value: /^\d{4}-\d{2}-\d{2}$/,
			message: 'Date of Birth is not valid',
		},
	},
}

export const location_validation = {
    name: 'location',
    label: 'Location',
    type: 'text',
    id: 'location',
    placeholder: 'Enter your Location here',
    validation: {
        required: {
            value: false, // Optional field
            message: 'Location is required',
        },
        minLength: {
            value: 2,
            message: 'Location must be at least 2 characters long',
        },
        maxLength: {
            value: 100,
            message: 'Location must be less than 100 characters',
        },
    },
};
