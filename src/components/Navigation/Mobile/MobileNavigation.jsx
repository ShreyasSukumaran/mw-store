import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './MobileNavigation.scss'
import { LuShoppingBag } from 'react-icons/lu'
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu'
import { IoIosSearch } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export const MobileNavigation = ({ token }) => {
	const [searchState, setSearchState] = useState(false)
	const searchInputRef = useRef(null)
	const handleContextMenu = e => {
		e.preventDefault()
	}

	const handleDragStart = e => {
		e.preventDefault()
	}

	const searchStateHandler = () => {
		setSearchState(true)
	}

	useEffect(() => {
		if (searchState && searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [searchState])

	useEffect(() => {
		const body = document.querySelector('body')
		const handleClick = e => {
			if (
				![
					'bottom-search',
					'search-input',
					'search-button',
					'search-icon',
				].includes(e.target.classList.value)
			) {
				setSearchState(false)
			}
		}
		body.addEventListener('click', handleClick)

		if (document.getElementById('bottom-search')) {
			console.log(document.getElementById('bottom-search'))
			const searchInput = document.getElementById('bottom-search')
			searchInput.focus()
		}

		return () => {
			if (body) {
				body.removeEventListener('click', handleClick)
			}
		}
	}, [])

	return (
		<>
			<div className="navigation-container">
				<HamburgerMenu />
				<Link className="nav-logo absolute-center" to="/home">
					<img
						src="./src/assets/images/haute-couture-nav-logo-text.svg"
						alt="Haute Couture Logo"
						className="logo-img"
						onContextMenu={handleContextMenu}
						onDragStart={handleDragStart}
					/>
				</Link>
				<div className="nav-right flex-gap absolute-v-center">
					<ul className="flex-gap user-links-container">
						{token !== 'false' && (
							<li>
								<Link to="/cart" className="user-links">
									<span className="user-link-icon">
										<LuShoppingBag />
									</span>
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
			{searchState ? (
				<div className="search-input">
					<motion.input
						type="text"
						className="bottom-search"
						name="search"
						id="bottom-search"
						placeholder="Search for products, brands and more"
						{...framer_key_search}
						ref={searchInputRef}
					/>
				</div>
			) : (
				//<motion.div {...framer_key_search}>
				//</motion.div>
				<div className="search-button" onClick={searchStateHandler}>
					<IoIosSearch className="search-icon" onClick={searchStateHandler} />
				</div>
				//<motion.div {...framer_key_button}>
				//</motion.div>
			)}
		</>
	)
}

const framer_key_search = {
	initial: {
		width: 0,
		height: 'auto',
		borderRadius: '50%',
		opacity: 0,
		bottom: '3%',
		right: '5%',
	},
	animate: {
		width: '100%',
		height: 'auto',
		borderRadius: 0,
		opacity: 1,
		bottom: 0,
		right: 0,
	},
	exit: {
		width: 0,
		height: 'auto',
		borderRadius: '50%',
		opacity: 0,
		bottom: '3%',
		right: '5%',
	},
	transition: { duration: 0.4 },
}

//const framer_key_button = {
//	intial: {
//		width: '100%',
//		height: 'auto',
//		borderRadius: 0,
//		opacity: 1,
//		bottom: 0,
//		right: 0,
//	},
//	animate: {
//		width: 45,
//		height: 45,
//		borderRadius: '50%',
//		opacity: 0,
//		bottom: '3%',
//		right: '5%',
//	},
//	exit: {
//		width: '100%',
//		height: 'auto',
//		borderRadius: 0,
//		opacity: 1,
//		bottom: 0,
//		right: 0,
//	},
//	transition: { duration: 0.4 },
//}

MobileNavigation.propTypes = {
	token: PropTypes.string,
}
