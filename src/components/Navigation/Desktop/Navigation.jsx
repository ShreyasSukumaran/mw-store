import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Navigation.scss'
import { CgProfile, CgHeart } from 'react-icons/cg'
import { LuShoppingBag } from 'react-icons/lu'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { FaHeart } from 'react-icons/fa'
import { RiAccountCircleFill } from 'react-icons/ri'
import {
	menProducts,
	womenProducts,
	accessories,
	electronics,
	userOptions,
} from '../product'
import { useState } from 'react'

const handleContextMenu = e => {
	e.preventDefault()
}

const handleDragStart = e => {
	e.preventDefault()
}

export const Navigation = ({ token }) => {
	const [hoverHeart, setOnHoverHeart] = useState(true)
	const [hoverBag, setOnHoverBag] = useState(true)
	const [hoverProfile, setOnHoverProfile] = useState(true)

	return (
		<div className="navigation-container">
			<div className="nav-left flex-gap">
				<Link className="nav-logo" to="/home">
					<img
						src={import.meta.env.CDN_ENDPOINT ? import.meta.env.CDN_ENDPOINT+"/haute-couture-nav-logo-text.svg" : "./src/assets/images/haute-couture-nav-logo-text.svg"}
						alt="Haute Couture Logo"
						className="logo-img"
						onContextMenu={handleContextMenu}
						onDragStart={handleDragStart}
					/>
				</Link>
				<ul className="nav-links flex-gap">
					<li className="hover-links">
						<Link to="/men" className="category-link">
							<p className="category-link-men">MEN</p>
						</Link>
						<div className="link-list-container">
							{menProducts.productList.map((category, categoryIndex) => (
								<div
									className={
										'link-list-' + (categoryIndex + 1) + ' linked-list'
									}
									key={categoryIndex}
								>
									<p className="link-title">{category.title}</p>
									<ul>
										{category.productList.map((product, productIndex) => (
											<li key={productIndex}>
												<Link className="list-link" to={product.link}>
													{product.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</li>
					<li className="hover-links">
						<Link to="/women" className="category-link">
							<p className="category-link-women">WOMEN</p>
						</Link>
						<div className="link-list-container">
							{womenProducts.productList.map((category, categoryIndex) => (
								<div
									className={
										'link-list-' + (categoryIndex + 1) + ' linked-list'
									}
									key={categoryIndex}
								>
									<p className="link-title">{category.title}</p>
									<ul>
										{category.productList.map((product, productIndex) => (
											<li key={productIndex}>
												<Link className="list-link" to={product.link}>
													{product.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</li>
					<li className="hover-links">
						<Link to="/accessories" className="category-link">
							<p className="category-link-accessories">ACCESSORIES</p>
						</Link>
						<div className="link-list-container">
							{accessories.productList.map((category, categoryIndex) => (
								<div
									className={
										'link-list-' + (categoryIndex + 1) + ' linked-list'
									}
									key={categoryIndex}
								>
									<p className="link-title">{category.title}</p>
									<ul>
										{category.productList.map((product, productIndex) => (
											<li key={productIndex}>
												<Link className="list-link" to={product.link}>
													{product.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</li>
					<li className="hover-links">
						<Link to="/electronics" className="category-link">
							<p className="category-link-electronics">ELECTRONICS</p>
						</Link>
						<div className="link-list-container electronics">
							{electronics.productList.map((category, categoryIndex) => (
								<div
									className={
										'link-list-' + (categoryIndex + 1) + ' linked-list'
									}
									key={categoryIndex}
								>
									<p className="link-title">{category.title}</p>
									<ul>
										{category.productList.map((product, productIndex) => (
											<li key={productIndex}>
												<Link className="list-link" to={product.link}>
													{product.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</li>
				</ul>
			</div>
			<div className="nav-right flex-gap">
				<div className="search-container">
					<input
						type="text"
						className="input"
						name="search"
						id="search"
						placeholder="Search for products, brands and more"
					/>
				</div>
				<ul className="flex-gap user-links-container">
					{token !== 'false' && (
						<li
							className="hover-links"
							onMouseEnter={() => setOnHoverProfile(false)}
							onMouseLeave={() => setOnHoverProfile(true)}
						>
							<Link to="/profile" className="user-links category-link">
								<p className="mg-0">
									<span className="user-link-icon">
										{hoverProfile ? <CgProfile /> : <RiAccountCircleFill />}
									</span>
									<span className="user-link-text">Profile</span>
								</p>
							</Link>
							<div className="link-list-container">
								<div className={'link-list-1 linked-list'}>
									{token !== 'false' && (
										<div>
											<p className="txt-bold">Welcome</p>
											<p>To access account and manage orders</p>
											<div className="flex-h-center">
												<Link to="/register" className="register-btn">
													Login/Signup
												</Link>
											</div>
											<div className="divider"></div>
										</div>
									)}
									{token == 'false' && (
										<div>
											<p className="txt-bold">Welcome</p>
											<p>To access account and manage orders</p>
											<div className="flex-h-center">
												<Link to="/register" className="register-btn">
													Login/Signup
												</Link>
											</div>
											<div className="divider"></div>
										</div>
									)}
									<ul>
										{userOptions.map((option, optionIndex) => (
											<li key={optionIndex}>
												<Link className="list-link" to={option.link}>
													{option.text}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>
					)}
					{token !== 'false' && (
						<li>
							<Link
								to="/wishlist"
								className="user-links"
								onMouseEnter={() => setOnHoverHeart(false)}
								onMouseLeave={() => setOnHoverHeart(true)}
							>
								<span className="user-link-icon">
									{hoverHeart ? <CgHeart /> : <FaHeart />}
								</span>
								<span className="user-link-text">Wishlist</span>
							</Link>
						</li>
					)}
					{token !== 'false' && (
						<li>
							<Link
								to="/cart"
								className="user-links"
								onMouseEnter={() => setOnHoverBag(false)}
								onMouseLeave={() => setOnHoverBag(true)}
							>
								<span className="user-link-icon">
									{hoverBag ? <LuShoppingBag /> : <RiShoppingBag3Fill />}
								</span>
								<span className="user-link-text">Bag</span>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	)
}

Navigation.propTypes = {
	token: PropTypes.string,
}
