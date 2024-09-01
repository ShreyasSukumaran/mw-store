// src/components/AdminNavigation.js

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './AdminNavigation.scss'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiDashboardFill, RiAccountCircleFill } from 'react-icons/ri'
import { useState } from 'react'
import { ImageComponent } from '../../../ImageComponent'

export const AdminNavigation = ({ token }) => {
	const [hoverProfile, setOnHoverProfile] = useState(true)
	const [dashboardProfile, setOnDashboardProfile] = useState(true)

	return (
		<div className="navigation-container" id="navigation-container">
			<div className="nav-left flex-gap">
				<Link className="nav-logo" to="/home">
					<ImageComponent
						src='/haute-couture-nav-logo-text.svg'
						alt="Haute Couture Logo"
						className="logo-img"
					/>
				</Link>
			</div>
			<div className="nav-right flex-gap">
				<ul className="flex-gap user-links-container">


					<li
						className="hover-links"
						onMouseEnter={() => setOnDashboardProfile(false)}
						onMouseLeave={() => setOnDashboardProfile(true)}
					>
						<Link to="/dashboard" className="user-links category-link">
							<p className="mg-0 admin-links">
								<span>
									{dashboardProfile ? <MdOutlineSpaceDashboard /> : <RiDashboardFill />}
								</span>
								<span>Dashboard</span>
							</p>
						</Link>
					</li>
					{token !== 'false' && (
						<li
							className="hover-links"
							onMouseEnter={() => setOnHoverProfile(false)}
							onMouseLeave={() => setOnHoverProfile(true)}
						>
							<Link to="/profile/details" className="user-links category-link">
								<p className="mg-0">
									<span className="user-link-icon">
										{hoverProfile ? <CgProfile /> : <RiAccountCircleFill />}
									</span>
									<span className="user-link-text">Profile</span>
								</p>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	)
}

AdminNavigation.propTypes = {
	token: PropTypes.string,
}
