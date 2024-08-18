//import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types'
import './HamburgerMenu.scss'
import MenuItem from '../MenuItem'
//import { RxHamburgerMenu } from 'react-icons/rx'
//import { IoCloseOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import { GrUser, GrUserFemale } from 'react-icons/gr'
import { PiWatchLight } from 'react-icons/pi'
//import { MdOutlineContactSupport } from "react-icons/md"
//import { CgHeart } from 'react-icons/cg'
//import { LuShoppingBag } from 'react-icons/lu'
import { LuMonitorSmartphone } from 'react-icons/lu'
import { useState } from 'react'

import {
	menProducts,
	womenProducts,
	accessories,
	electronics,
	userOptions,
} from '../../product'

//const handleContextMenu = e => {
//	e.preventDefault()
//}

//const handleDragStart = e => {
//	e.preventDefault()
//}

export const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="hamburger-menu absolute-center">
			<AnimatePresence mode="wait" initial={false}>
				<div className="menu-icon" onClick={toggleMenu}>
					<motion.div
						className="bar"
						animate={
							isOpen
								? { rotate: 45, y: 7, transition: { duration: 0.3 } }
								: { rotate: 0, y: 0, transition: { duration: 0.3 } }
						}
					/>
					<motion.div
						className="bar"
						animate={
							isOpen
								? { opacity: 0, transition: { duration: 0.3 } }
								: { opacity: 1, transition: { duration: 0.3 } }
						}
					/>
					<motion.div
						className="bar"
						animate={
							isOpen
								? { rotate: -45, y: -7, transition: { duration: 0.3 } }
								: { rotate: 0, y: 0, transition: { duration: 0.3 } }
						}
					/>
					{/*{isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}*/}
				</div>
				{isOpen && (
					<motion.div className="menu-content" {...framer_key}>
						<MenuItem
							title="Men"
							items={menProducts.productList}
							icon={<GrUser />}
						/>
						<MenuItem
							title="Women"
							items={womenProducts.productList}
							icon={<GrUserFemale />}
						/>
						<MenuItem
							title="Accessories"
							items={accessories.productList}
							icon={<PiWatchLight />}
						/>
						<MenuItem
							title="Electronics"
							items={electronics.productList}
							icon={<LuMonitorSmartphone />}
						/>
						<div className="user-options">
							{userOptions.map((option, index) => (
								<a key={index} href={option.link}>
									{option.text}
								</a>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

const framer_key = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: { duration: 0.5 },
}

//MobileNavigation.propTypes = {
//	token: PropTypes.string,
//}
