import {
	firstName_validation,
	lastName_validation,
	mobile_validation,
	email_validation,
	hintName_validation,
	gender_validation,
	dob_validation,
	location_validation,
	alt_mobile_validation,
} from '../../../utils/inputValidations'

export const generateProfileItems = (user) => {
	const profileItemOne = [
		{
			label: 'Full Name',
			editKey: 'nameEdit',
			value: `${user.firstName} ${user.lastName}`,
			inputs: [
				{ ...firstName_validation, value: user.firstName },
				{ ...lastName_validation, value: user.lastName },
			],
		},
		{
			label: 'Mobile Number',
			editKey: 'mobileEdit',
			value: user.mobile || '- not added -',
			inputs: [{ ...mobile_validation, value: user.mobile }],
		},
		{
			label: 'Email ID',
			editKey: 'emailEdit',
			value: user.email,
			inputs: [{ ...email_validation, value: user.email }],
		},
		{
			label: 'Gender',
			editKey: 'genderEdit',
			value: user.gender || '- not added -',
			inputs: [{ ...gender_validation, value: user.gender }],
		}
	]

	const profileItemTwo = [
		{
			label: 'Date of Birth',
			editKey: 'dobEdit',
			value: user.dateOfBirth || '- not added -',
			inputs: [{ ...dob_validation, value: user.dateOfBirth }],
		},
		{
			label: 'Location',
			editKey: 'locationEdit',
			value: user.location || '- not added -',
			inputs: [{ ...location_validation, value: user.location }],
		},
		{
			label: 'Alternate Mobile',
			editKey: 'alternateMobileEdit',
			value: user.alternateMobile || '- not added -',
			inputs: [{ ...alt_mobile_validation, value: user.alternateMobile }],
		},
		{
			label: 'Hint Name',
			editKey: 'hintNameEdit',
			value: user.hintName || '- not added -',
			inputs: [{ ...hintName_validation, value: user.hintName }],
		},
	]

	return { profileItemOne, profileItemTwo }
}
