import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './AdminMobileNavigation.scss'
import { GrUser } from 'react-icons/gr'
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu'
import { IoIosSearch } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import { ImageComponent } from '../../../ImageComponent'
import { motion } from 'framer-motion'

const AdminMobileNavigation = ({ token }) => {
	const [searchState, setSearchState] = useState(false)
	const searchInputRef = useRef(null)

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
			<div className="navigation-container" id="navigation-container">
				<HamburgerMenu />
				<Link className="nav-logo absolute-center" to="/home">
					<ImageComponent
						src="/haute-couture-nav-logo-text.svg"
						alt="Haute Couture Logo"
						className="logo-img"
					/>
				</Link>
				<div className="nav-right flex-gap absolute-v-center">
					<ul className="flex-gap user-links-container">
						{token !== 'false' && (
							<li>
								<Link to="/profile" className="user-links">
									<span className="user-link-icon">
										<GrUser />
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
				<div className="search-button" onClick={searchStateHandler}>
					<IoIosSearch className="search-icon" onClick={searchStateHandler} />
				</div>
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

AdminMobileNavigation.propTypes = {
	token: PropTypes.string,
}


export default AdminMobileNavigation;