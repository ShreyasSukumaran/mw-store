import { MdEdit, MdDone } from 'react-icons/md'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { isMobile } from 'react-device-detect'

import { Input } from '../../Input/Input'
import { InputError } from '../../Input/InputError'
import { generateProfileItems } from './detail'
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types'
import { ProfileImage } from './ProfileImage'

export const ProfileDetail = ({ user, setUserDetails }) => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')

	const [editState, setEditState] = useState({
		nameEdit: false,
		mobileEdit: false,
		emailEdit: false,
		genderEdit: false,
		dobEdit: false,
		locationEdit: false,
		alternateMobileEdit: false,
		hintNameEdit: false,
	})

	const { profileItemOne, profileItemTwo } = generateProfileItems(user)

	const onSubmit = methods.handleSubmit(async data => updateUser(data))

	const updateUser = async (data) => {
		await setUserDetails(data).then(response => {
			if (response && response.error) {
				setIsInvalid(true)
				setInputError(response.message)
			}
		})
	}

	const setInvalidFalse = () => setIsInvalid(false)

	const toggleEdit = field => {
		setEditState(prevState => ({
			...prevState,
			[field]: !prevState[field],
		}))
	}

	return (
		<div className="profile-details">
			{!isMobile &&
				<ProfileImage user={user} setUserDetails={setUserDetails}/>
			}
			<FormProvider {...methods}>
				<form
					onSubmit={e => e.preventDefault()}
					noValidate
					className="form-container"
				>
					<AnimatePresence mode="wait">
						{isInvalid && (
							<motion.div className="form-error-container">
								<InputError message={inputError} key={inputError} />
							</motion.div>
						)}
					</AnimatePresence>
					<div className="detail-column-container form-inputs">
						<div className="detail-column">
							{profileItemOne.map((item, index) => (
								<div key={index} className="profile-item">
									<div className='profile-options'>
										<span className="label">{item.label}</span>
										{editState[item.editKey] ? (
											<motion.div className='profile-option-icons select' {...framer_key} >
												<MdDone onClick={onSubmit} className='done-icon' />
												<IoMdClose onClick={() => toggleEdit(item.editKey)} className='cancel-icon' />
											</motion.div>
										) : (
											<motion.div className='profile-option-icons edit' onClick={() => toggleEdit(item.editKey)} {...framer_key} >
												<MdEdit className='edit-icon' />
											</motion.div>
										)}
									</div>
									{!editState[item.editKey] ? (
										<span className="value">{item.value}</span>
									) : (
										<motion.div {...framer_key}>
											{item.inputs.map((input, i) => (
												<Input
													key={i}
													{...input}
													setInvalidFalse={setInvalidFalse}
													
												/>
											))}
										</motion.div>
									)}
								</div>
							))}
						</div>
						<div className="detail-column">
							{profileItemTwo.map((item, index) => (
								<div key={index} className="profile-item">
									<div className='profile-options'>
										<span className="label">{item.label}</span>
										{editState[item.editKey] ? (
											<div className='profile-option-icons select' >
												<MdDone onClick={onSubmit} className='done-icon' />
												<IoMdClose onClick={() => toggleEdit(item.editKey)} className='cancel-icon' />
											</div>
										) : (
											<div className='profile-option-icons edit' onClick={() => toggleEdit(item.editKey)} >
												<MdEdit className='edit-icon' />
											</div>
										)}
									</div>
									{!editState[item.editKey] ? (
										<span className="value">{item.value}</span>
									) : (
										<motion.div {...framer_key}>
											{item.inputs.map((input, i) => (
												<Input
													key={i}
													{...input}
													setInvalidFalse={setInvalidFalse}
													
												/>
											))}
										</motion.div>
									)}
								</div>
							))}
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

const framer_key = {
	initial: { opacity: 0, },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.4 },
}

ProfileDetail.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string
	}),
}
