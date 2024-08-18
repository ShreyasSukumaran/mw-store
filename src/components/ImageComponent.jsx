import PropTypes from 'prop-types'

const handleContextMenu = e => {
	e.preventDefault()
}

const handleDragStart = e => {
	e.preventDefault()
}

export const ImageComponent = ({ src, alt, className, id }) => {
	const localPath = "/src/assets/images"
	src = import.meta.env.VITE_ENV == "production" ? import.meta.env.VITE_APP_R2_ENDPOINT+src : localPath+src
	return (
		<img
			src={src}
			alt={alt}
			className={className}
			id={id ? id : ''}
			onContextMenu={handleContextMenu}
			onDragStart={handleDragStart}
		/>
	)
}

ImageComponent.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	id: PropTypes.string,
}
