import axios from 'axios'

const uploadFileToR2 = async (file, fileName, contentType) => {
	//const blob = await new Response(file).blob()
	//const formData = new FormData();
	//formData.append('file', file);
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_APP_R2_ENDPOINT}`,
			file,
			{
				headers: {
					'Content-Type': contentType,
					'X-Custom-Auth-Key': `${import.meta.env.VITE_APP_R2_AUTH}`,
					filename: fileName,
				},
			},
		)
		return response.data
	} catch (error) {
		console.error('An error occurred during the file upload:', error)
	}
}

export default uploadFileToR2
