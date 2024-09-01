import { VscAccount } from 'react-icons/vsc'
import { MdDone, MdOutlineCameraAlt } from 'react-icons/md'
import { useState, useRef } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";

import { usePromptTrigger } from '../../../hooks/Prompt/usePrompt'
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types'
import uploadFileToR2 from '../upload-to-r2'
import { isMobile } from 'react-device-detect';
import { useDialogTrigger } from '../../../hooks/Dialog/useDialog'

export const ProfileImage = ({ user, setUserDetails }) => {
	const initialProfileImage = user.profileImage ? user.profileImage : null

	const triggerPrompt = usePromptTrigger()
	const fileInputRef = useRef(null)
	const [profileImage, setProfileImage] = useState(initialProfileImage || null)
	const [imageChange, setImageChange] = useState(false)
	const [extension, setExtension] = useState(null)
	const [contentType, setContentType] = useState(null)
	const [imageFile, setImageFile] = useState(null)
	const triggerDialog = useDialogTrigger()

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
		fileInputRef.current.click();
	}

	const clearImageSelected = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
			setImageChange(false)
			setProfileImage(null)
		}
	}

	const handleImageChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImageChange(true)
				setExtension((file.name).split('.')[1])
				setProfileImage(URL.createObjectURL(file))
				setContentType(file.type)
				setImageFile(file)

				if (isMobile) {
					triggerDialog('Click tick(✓) symbol to set profile photo');
				}
			}
			reader.readAsDataURL(file)
		}
	}



	const uploadProfileImage = () => {
		const imageName = `${import.meta.env.VITE_APP_R2_ENDPOINT}/profile/profile-photo-${user._id}.${extension}`;
		uploadFileToR2(imageFile, imageName, contentType).then(data => {
			if (data.isUploaded) {
				setImageChange(false)
				setProfileImage(imageName)
				setUserDetails({ ...user, profileImage: imageName })
			}
		})
	}


	const deleteProfileImage = () => {
		triggerPrompt('This will delte your image', 'Go ahead', 'No', (decision) => {
			if (decision) {
				setProfileImage(null)
				setImageChange(false)
				setUserDetails({ ...user, profileImage: null })
			}
		})
	}

	return (
		<>
			<h1>Profile Details</h1>
			<div className="profile-card">
				{
					isMobile &&
					<div className="edit-photo-container">
						{profileImage && <img src={profileImage} alt="Profile" className="profile-photo" />}
						{!profileImage && <VscAccount className="account-icon" />}

						{imageChange &&
							(
								<div className="edit-button-container">
									<button className="edit-button" onClick={uploadProfileImage}>
										<MdDone width="12px" height="12px" />
									</button>
									{profileImage && <button className="edit-button" onClick={clearImageSelected}>
										<IoMdClose width="12px" height="12px" />
									</button>}
								</div>
							) 
						}
						{!imageChange &&
							<div className="edit-button-container">
								<button className="edit-button" onClick={handleImageClick}>
									<MdOutlineCameraAlt width="12px" height="12px" />
								</button>
								{profileImage &&
									<button className='delete-button' onClick={deleteProfileImage}>
										<RiDeleteBinLine width="12px" height="12px" />
									</button>
								}
							</div>
						}
					</div>
				}
				{
					!isMobile &&
					<>
						{profileImage && <img src={profileImage} alt="Profile" className="profile-photo" />}
						{!profileImage && <VscAccount className="account-icon" />}
					</>
				}
				<div className="profile-card-detail">
					<h2>{`${user.firstName} ${user.lastName}`}</h2>
					<h3>{user.email}</h3>
					{!isMobile && <div className="profile-photo-edit">
						{imageChange ?
							(
								<>
									<button className="edit-button" onClick={uploadProfileImage}>
										<MdDone width="12px" height="12px" />
										<span>Confirm Profile Image</span>
									</button>
									{profileImage && <button className="edit-button" onClick={clearImageSelected}>
										<IoMdClose width="12px" height="12px" />
										<span>Clear Selection</span>
									</button>}
								</>
							) :
							<>
								<button className="edit-button" onClick={handleImageClick}>
									Update Profile Image
								</button>
								{profileImage && <RiDeleteBinLine className='delete-button' onClick={deleteProfileImage} width="12px" height="12px" />}
							</>
						}
					</div>}
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: 'none' }}
						onChange={handleImageChange}
						id="profile-input"
					/>
				</div>
			</div>
		</>
	)
}

ProfileImage.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string
	}),
}
