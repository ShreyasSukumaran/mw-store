import './HamburgerMenu.scss'
import MenuItem from '../MenuItem'
import { motion, AnimatePresence } from 'framer-motion'
import { GrUser, GrUserFemale } from 'react-icons/gr'
import { PiWatchLight } from 'react-icons/pi'
import { LuMonitorSmartphone } from 'react-icons/lu'
import { useState } from 'react'

import {
	menProducts,
	womenProducts,
	accessories,
	electronics,
	userOptions,
} from '../../../product'

export const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="hamburger-menu absolute-center">
			<AnimatePresence>
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
					<motion.div className="menu-content" {...framer_key} key="dropdown">
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
							{userOptions.map((option) => (
								<a key={option.link} href={option.link}>
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