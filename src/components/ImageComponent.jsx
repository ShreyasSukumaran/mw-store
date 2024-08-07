import PropTypes from 'prop-types'
import { useEffect } from 'react'

const ImageComponent = ({
	src,
	alt,
	className,
	onContextMenu,
	onDragStart,
}) => {
	//const [imageUrl, setImageUrl] = useState(src)

	useEffect(() => {
		//const fetchImageUrl = async () => {
		//	const response = await fetch(
		//		src,
		//	)
		//	const data = await response.json()
		//	console.log("Response : "+data);
		//	console.log("url : "+src);
		//	setImageUrl(data.signedUrl)
		//}

		//fetchImageUrl()
	}, [])

	return (
		<img
			src={src}
			alt={alt}
			className={className}
			onContextMenu={onContextMenu}
			onDragStart={onDragStart}
		/>
	)
}



ImageComponent.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	onDragStart: PropTypes.func.isRequired,
}

export default ImageComponent
