export function findInputError(errors, id) {
	let filtered = Object.keys(errors)
		.filter(key => key == id)
		.reduce((cur, key) => Object.assign(cur, { error: errors[key] }), {})
	
	return filtered
}
