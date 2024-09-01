import { useEffect, useState } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import './AdminDashboard.scss';
import { IoIosArrowDown } from "react-icons/io";
import { isMobile } from 'react-device-detect'
import { FaUsersCog, FaClipboardList } from 'react-icons/fa'
import { MdProductionQuantityLimits, MdPayment } from 'react-icons/md'
import { RiDashboardFill } from 'react-icons/ri'
import { GiCargoShip } from 'react-icons/gi'
import { BsFileEarmarkText } from 'react-icons/bs'
import '../../Profile/profile.scss'
import { ProfileImage } from '../../Profile/ProfileSubComponents/ProfileImage';
import { useContent } from '../../../hooks/UserContext/useContent'
//import SellerQueue from './partial/SellerQueue';


function AdminDashboardComponent() {
	let match = useMatch('/dashboard/*')
	const navigate = useNavigate();
	const { getUserDetails, setUserDetails } = useContent()
	const [profileHeight, setProfileHeight] = useState(0)
	const [selectedOption, setSelectedOption] = useState('');

	const [user] = useState(getUserDetails());


	const changeOption = (e) => {
		const option = e.currentTarget.value;
		setSelectedOption(option);
		navigate(`${match?.pathnameBase}${option}`);
	};



	const adminOptions = [
		{ link: '/dashboard', text: 'Dashboard', icon: <RiDashboardFill /> },
		{ link: '/user-management', text: 'User Management', icon: <FaUsersCog /> },
		{ link: '/order-management', text: 'Order Management', icon: <FaClipboardList /> },
		{ link: '/product-management', text: 'Product Management', icon: <MdProductionQuantityLimits /> },
		{ link: '/customer-management', text: 'Customer Management', icon: <FaUsersCog /> },
		{ link: '/content-management', text: 'Content Management', icon: <BsFileEarmarkText /> },
		{ link: '/payment-transactions', text: 'Payment Transactions', icon: <MdPayment /> },
		{ link: '/shipping-logistics', text: 'Shipping & Logistics', icon: <GiCargoShip /> },
	]

	useEffect(() => {
		const height = document.getElementById("body").offsetHeight - 75;
		setProfileHeight(height);
	}, []);


	return (
		<div id="profile" style={{ height: profileHeight }}>
			<div className="profile-container admin">
				<div className="sidebar" >
					{!isMobile &&
						<>
							<h3>Account</h3>
							<h4>{user.firstName}</h4>
						</>
					}
					{isMobile &&
						<div className="profile-content">
							<div className="profile-details">
								<ProfileImage user={user} setUserDetails={setUserDetails} />
							</div>
						</div>
					}
					{!isMobile && <ul>
						{adminOptions.map(option => (
							<li key={option.link} className={(match && match.pathname.includes(option.link)) ? "active sidelink" : "sidelink"}>
								{option.icon}
								<Link to={`${match.pathname}${option.link}`}>{option.text}</Link>
							</li>
						))}
					</ul>}
					{isMobile &&
						<div style={{ position: 'relative', width: '80%', height: 'min-content', margin: "15px auto 0" }}>
							<select
								id="option"
								name="option"
								className="input"
								onChange={changeOption}
								value={selectedOption}
							>
								{adminOptions?.map(option => (
									<option key={option.text} value={option.text} >
										{option.text}
									</option>
								))}
							</select>
							<IoIosArrowDown className='dropdown-arrow' />
						</div>
					}
				</div>

				<div className="profile-content" >
					<Routes>
						<Route path="/" element={<h3>Please select a sub-component.</h3>} />
						{/*<Route path="/user-management" element={<SellerQueue />} />*/}
						<Route path="/user-management" element={<h1>User Management</h1>} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboardComponent;

