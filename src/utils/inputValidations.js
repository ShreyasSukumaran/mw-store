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
	maxLength: 10,
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
	maxLength: 10,
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

export const gst_radio_config = {
	name: "identity_choice",
	labe: "ID Choice",
    type: "radio",
    id: "gst",
    validation: {
        required: {
            value: true,
            message: 'Enrolment ID is required',
        },
    },
};


export const non_gst_radio_config = {
    type: "radio",
    id: "non-gst",
    name: "tax-option",
	label: "Tax Options",
    defaultChecked: true,
};

export const non_gst_input_config = {
	name: "uin",
	label: "Enrolment ID/UIN",
    type: "text",
	id: "uin",
    placeholder: "Enter Enrolment ID / UIN",
    validation: {
        required: {
            value: true,
            message: 'Enrolment ID is required',
        },
        pattern: {
            value: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[A-Z\d]{2}$/,
            message: 'Enrolment ID is not valid',
        },
    },
};

export const gstin_validation = {
	name: 'gstin',
	label: 'GSTIN',
	type: 'text',
	id: 'gstin',
	placeholder: 'Enter your GSTIN',
	validation: {
		required: {
			value: true,
			message: 'GSTIN is required',
		},
		pattern: {
			value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
			message: 'GSTIN is not valid',
		},
	},
};

export const pan_validation = {
	name: 'pan',
	label: 'PAN',
	type: 'text',
	id: 'pan',
	placeholder: 'Enter your PAN',
	validation: {
		required: {
			value: true,
			message: 'PAN is required',
		},
		pattern: {
			value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
			message: 'PAN is not valid',
		},
	},
};

export const brand_name_validation = {
    name: 'brandName',
    label: 'Brand Name',
    type: 'text',
    id: 'brandName',
    placeholder: 'Enter Brand Name',
    validation: {
        required: {
            value: true,
            message: 'Brand Name is required',
        },
    },
};

export const address_line1_validation = {
    name: 'addressLine1',
    label: 'Address Line 1',
    type: 'text',
    id: 'address_line_1',
    placeholder: 'Enter Address Line 1',
    validation: {
        required: {
            value: true,
            message: 'Address Line 1 is required',
        },
    },
};
export const supplier_address_line1_validation = {
	...address_line1_validation,
    name: 'supplierAddressLine1',
};

export const address_line2_validation = {
    name: 'addressLine2',
    label: 'Address Line 2',
    type: 'text',
    id: 'address_line_2',
    placeholder: 'Enter Address Line 2',
    validation: {
        required: {
            value: false,
        },
    },
};
export const supplier_address_line2_validation = {
	...address_line2_validation,
    name: 'supplierAddressLine2',
};

export const city_validation = {
    name: 'city',
    label: 'City',
    type: 'text',
    id: 'city',
    placeholder: 'Enter City',
    validation: {
        required: {
            value: true,
            message: 'City is required',
        },
    },
};
export const supplier_city_validation = {
	...city_validation,
    name: 'supplierCity',
};

export const state_validation = {
    name: 'state',
    label: 'State',
    type: 'text',
    id: 'state',
    placeholder: 'Enter State',
    validation: {
        required: {
            value: true,
            message: 'State is required',
        },
    },
};
export const supplier_state_validation = {
	...state_validation,
    name: 'supplierState',
};

export const zipcode_validation = {
    name: 'zipcode',
    label: 'Zip Code',
    type: 'text',
    id: 'zipcode',
    placeholder: 'Enter Zip Code',
    validation: {
        required: {
            value: true,
            message: 'Zip Code is required',
        },
        pattern: {
            value: /^[0-9]{5,6}$/,
            message: 'Zip Code is not valid',
        },
    },
};
export const supplier_zipcode_validation = {
	...zipcode_validation,
    name: 'supplierZipcode',
};

export const country_validation = {
    name: 'country',
    label: 'Country',
    type: 'text',
    id: 'country',
    placeholder: 'Enter Country',
    validation: {
        required: {
            value: true,
            message: 'Country is required',
        },
    },
};
export const supplier_country_validation = {
	...country_validation,
    name: 'supplierCountry',
};

export const account_holder_validation = {
    name: 'accountHolder',
    label: 'Account Holder Name',
    type: 'text',
    id: 'accountHolder',
    placeholder: 'Enter Account Holder Name',
    validation: {
        required: {
            value: true,
            message: 'Account Holder Name is required',
        },
    },
};

export const account_number_validation = {
    name: 'accountNumber',
    label: 'Account Number',
    type: 'number',
    id: 'accountNumber',
    placeholder: 'Enter Account Number',
    validation: {
        required: {
            value: true,
            message: 'Account Number is required',
        },
        pattern: {
            value: /^[0-9]{9,18}$/,
            message: 'Account Number is not valid',
        },
    },
};

export const bank_name_validation = {
    name: 'bankName',
    label: 'Bank Name',
    type: 'text',
    id: 'bankName',
    placeholder: 'Enter Bank Name',
    validation: {
        required: {
            value: true,
            message: 'Bank Name is required',
        },
    },
};

export const ifsc_code_validation = {
    name: 'ifscCode',
    label: 'IFSC Code',
    type: 'text',
    id: 'ifscCode',
    placeholder: 'Enter IFSC Code',
    validation: {
        required: {
            value: true,
            message: 'IFSC Code is required',
        },
        pattern: {
            value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
            message: 'IFSC Code is not valid',
        },
    },
};

export const supplier_name_validation = {
    name: 'supplierName',
    label: 'Supplier Name',
    type: 'text',
    id: 'supplierName',
    placeholder: 'Enter Supplier Name',
    validation: {
        required: {
            value: true,
            message: 'Supplier Name is required',
        },
    },
};

export const business_type_validation = {
    name: 'supplierBusiness',
    label: 'Business Type',
    type: 'text',
    id: 'supplierBusiness',
    placeholder: 'Enter Business Type',
    validation: {
        required: {
            value: true,
            message: 'Business Type is required',
        },
    },
};

export const contact_number_validation = {
    name: 'supplierContactNo',
    label: 'Contact Number',
    type: 'tel',
    id: 'supplierContactNo',
	maxLength: 10,
    placeholder: 'Enter Contact Number',
    validation: {
        required: {
            value: true,
            message: 'Contact Number is required',
        },
        pattern: {
            value: /^[0-9]{10}$/,
            message: 'Contact Number is not valid',
        },
    },
};

export const supplier_email_validation = {
	...email_validation,
	name: "supplierEmailId",
	id: "supplierEmailId"
}

export const supplier_address_validation = {
    name: 'supplierAddress',
    label: 'Supplier Address',
    type: 'text',
    id: 'supplierAddress',
    placeholder: 'Enter Supplier Address',
    validation: {
        required: {
            value: true,
            message: 'Supplier Address is required',
        },
    },
};