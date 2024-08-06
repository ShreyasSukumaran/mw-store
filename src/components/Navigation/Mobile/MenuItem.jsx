import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { MdKeyboardArrowRight } from 'react-icons/md'

const MenuItem = ({ title, items, icon }) => {
	const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
	const [openIndex, setOpenIndex] = useState(null)

	const toggleSubmenu = () => {
		setIsSubmenuOpen(!isSubmenuOpen)
	}

	const toggleSubmenuItem = index => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className="menu-item">
			<div className="menu-title" onClick={toggleSubmenu}>
				<div className="title-container">
					{icon}
					{title}
				</div>
				<motion.div
					initial={{ rotate: 0 }}
					animate={isSubmenuOpen ? { rotate: 90 } : { rotate: 0 }}
					transition={{ duration: 0.3 }}
				>
					<MdKeyboardArrowRight />
				</motion.div>
			</div>
			<AnimatePresence>
				{isSubmenuOpen && (
					<motion.div className="submenu-titles" {...framer_key}>
						{items.map((item, index) => (
							<div key={index}>
								<div
									className="submenu-title"
									onClick={() => toggleSubmenuItem(index)}
								>
									{item.title}
									<motion.div
										initial={{ rotate: 0 }}
										animate={
											openIndex === index ? { rotate: 90 } : { rotate: 0 }
										}
										transition={{ duration: 0.3 }}
									>
										<MdKeyboardArrowRight />
									</motion.div>
								</div>
								<AnimatePresence>
									{openIndex === index && (
										<motion.div className="submenu" {...framer_key}>
											{item.productList.map((product, subIndex) => (
												<a key={subIndex} href={product.link}>
													{product.title}
												</a>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

const framer_key = {
	initial: { height: 0, opacity: 0 },
	animate: { height: 'auto', opacity: 1 },
	exit: { height: 0, opacity: 0 },
	transition: { duration: 0.4 },
}

//const framer_key_arrow = {
//	initial: { rotate: 0 },
//	animate: { rotate: 90 },
//	exit: { rotate: 0 },
//	transition: { duration: 0.4 },
//}

MenuItem.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	items: PropTypes.element,
}

export default MenuItem
