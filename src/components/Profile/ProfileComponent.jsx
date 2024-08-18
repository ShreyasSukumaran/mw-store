import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect'
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';


import { ChangePassword } from './ProfileSubComponents/ChangePassword'
import { ProfileDetail } from './ProfileSubComponents/ProfileDetail'
import { useContent } from '../../hooks/UserContext/useContent'
import './profile.scss'
import { ProfileImage } from './ProfileSubComponents/ProfileImage';

export const ProfileComponent = () => {
	let match = useMatch('/profile/*')
	const { getUserDetails, setUserDetails } = useContent()
	const navigate = useNavigate();
	const [selectedOption, setSelectedOption] = useState('');
	const [profileHeight, setProfileHeight] = useState(0)

	const [user, setUser] = useState(getUserDetails());


	const updateUser = (data) => {


		console.log("UPDATE USER PART : ", data)
		let updatedUser = {
			...user,
			...data
		}
		setUser(updatedUser)

		console.log("UPDATED USER : ", updatedUser)

		setUserDetails(updatedUser)
	}

	const options = [
		{
			label: "Profile Details",
			value: "/details"
		}, {
			label: "Change Password",
			value: "/change-password"
		}
	]


	const changeOption = (e) => {
		const option = e.currentTarget.value;
		setSelectedOption(option);
		navigate(`${match?.pathnameBase}${option}`);
	};


	useEffect(() => {
		const height = document.getElementById("body").offsetHeight - 71;
		setProfileHeight(height);
	}, [])

	useEffect(() => {
		const currentPath = match?.pathname.replace(match?.pathnameBase, '');
		setSelectedOption(currentPath);
	}, [match]);

	return (
		<div id="profile" style={{ height: profileHeight }}>
			<div className="profile-container">
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
						<li className={(match && match.pathname.includes('/change-password')) ? "active" : ""}>
							<Link
								to={
									match
										? match.pathname.includes('/change-password')
											? `${match.pathname}`
											: `${match.pathnameBase}/change-password`
										: ''
								}
							>
								Change Password
							</Link>
						</li>
						<li className={(match && match.pathname.includes('/details')) ? "active" : ""}>
							<Link to={`${match?.pathnameBase}/details`}>Profile Details</Link>
						</li>
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
								{options?.map(option => (
									<option key={option.value} value={option.value} >
										{option.label}
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
						<Route path="/change-password" element={<ChangePassword />} />
						<Route path="/details" element={<ProfileDetail user={user} setUserDetails={updateUser} />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default ProfileComponent
