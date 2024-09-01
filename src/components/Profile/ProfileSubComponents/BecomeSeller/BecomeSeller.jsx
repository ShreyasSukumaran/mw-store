import PropTypes from 'prop-types'
import { FormProvider, useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CiLocationOn, CiBank } from "react-icons/ci";
import { AiFillBank } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from 'react-icons/md'
import { IoMdClose } from "react-icons/io";
import { HiReceiptTax, HiOutlineReceiptTax } from "react-icons/hi";


import './BecomeSeller.scss'
import { Input } from '../../../Input/Input'
import { AuthHandling } from '../../../ApiRequests/Auth/AuthHandling'
import { InputError } from '../../../Input/InputError'
import {
	non_gst_input_config,
	gstin_validation,
	address_line1_validation,
	address_line2_validation,
	city_validation,
	state_validation,
	zipcode_validation,
	country_validation,
	brand_name_validation,
	supplier_address_line1_validation,
	supplier_address_line2_validation,
	supplier_city_validation,
	supplier_state_validation,
	supplier_zipcode_validation,
	supplier_country_validation,
	supplier_email_validation,
	account_holder_validation,
	account_number_validation,
	bank_name_validation,
	ifsc_code_validation,
	supplier_name_validation,
	business_type_validation,
	contact_number_validation,
} from '../../../../utils/inputValidations'
import { MdDone } from 'react-icons/md'
import { isMobile } from 'react-device-detect'
import { useDialogTrigger } from '../../../../hooks/Dialog/useDialog'

export const BecomeSeller = ({ user, setUserDetails }) => {
	const [activeTab, setActiveTab] = useState(user.sellerApplicationStatus || 'tax-details')
	const [edit, setEdit] = useState(false)
	const triggerDialog = useDialogTrigger()

	const onEdit = (activeTab) => {
		triggerDialog('Please, do not update the seller info frequently or excessively.');
		setActiveTab(activeTab)
		setEdit(true)
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'tax-details':
				return <TaxOptions setActiveTab={setActiveTab} user={user} setUserDetails={setUserDetails} />
			case 'pickup-address':
				return <PickupAddress setActiveTab={setActiveTab} user={user} setUserDetails={setUserDetails} />
			case 'bank-details':
				return <BankDetails setActiveTab={setActiveTab} user={user} setUserDetails={setUserDetails} />
			case 'supplier-details':
				return <SupplierDetails setActiveTab={setActiveTab} user={user} setUserDetails={setUserDetails} />
			case 'submited':
				return <Submited />
			default:
				return <TaxOptions setActiveTab={setActiveTab} user={user} setUserDetails={setUserDetails} />
		}
	}

	return (
		<div className="tax-details-section">
			<div className="navigation">
				<ul>
					<li
						className={activeTab === 'tax-details' ? 'active' : ''}
						onClick={() => user.sellerApplicationStatus === "submited" && !(edit && activeTab === 'tax-details') ? onEdit('tax-details') : setActiveTab("submited")}
					>
						{isMobile ? (activeTab === 'tax-details') ? <HiReceiptTax /> : <HiOutlineReceiptTax /> : ''}
						Tax Details
						{user.sellerInfo && (user.sellerInfo.gstin || user.sellerInfo.uin) ? (edit && activeTab === 'tax-details' ? <IoMdClose className='cancel-icon' /> : <MdEdit className='edit-icon hide' />): ""}
					</li>
					<li
						className={activeTab === 'pickup-address' ? 'active' : ''}
						onClick={() => user.sellerApplicationStatus === "submited" && !(edit && activeTab === 'pickup-address') ? onEdit('pickup-address') : setActiveTab("submited")}
					>
						{isMobile ? (activeTab === 'pickup-address') ? <FaLocationDot /> : <CiLocationOn /> : ''}
						Pickup Address
						{(user.sellerInfo && user.sellerInfo.pickupAddress) ? (edit && activeTab === 'pickup-address' ? <IoMdClose className='cancel-icon' /> : <MdEdit className='edit-icon hide' />) : ''}
					</li>
					<li
						className={activeTab === 'bank-details' ? 'active' : ''}
						onClick={() => user.sellerApplicationStatus === "submited" && !(edit && activeTab === 'bank-details') ? onEdit('bank-details') : setActiveTab("submited")}
					>
						{isMobile ? (activeTab === 'bank-details') ? <AiFillBank /> : <CiBank /> : ''}
						Bank Details
						{(user.sellerInfo && user.sellerInfo.bankDetails) ? (edit && activeTab === 'bank-details' ? <IoMdClose className='cancel-icon' /> : <MdEdit className='edit-icon hide' />) : ""}
					</li>
					<li
						className={activeTab === 'supplier-details' ? 'active' : ''}
						onClick={() => user.sellerApplicationStatus === "submited" && !(edit && activeTab === 'supplier-details') ? onEdit('supplier-details') : setActiveTab("submited")}
					>
						{isMobile ? (activeTab === 'supplier-details') ? <FaTruck /> : <CiDeliveryTruck /> : ''}
						Supplier Details
						{(user.sellerInfo && user.sellerInfo.supplierDetails) ? edit && activeTab === 'supplier-details' ? <IoMdClose className='cancel-icon' /> : <MdEdit className='edit-icon hide' /> : ""}
					</li>
				</ul>
			</div>

			<div className="content">
				{renderContent()}
			</div>
		</div>
	)
}

const TaxOptions = ({ setActiveTab, user, setUserDetails }) => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')

	const onSubmit = methods.handleSubmit(async data => {
		data.selectedOption = selectedOption;
		data.email = user.email;
		data.sellerApplicationStatus = (user.sellerApplicationStatus == 'submited') ? 'submited' : 'pickup-address';
		const response = await AuthHandling(data, 'become-seller')
		if (response.error) {
			setIsInvalid(true)
			setInputError(response.message)
		}
		let userData = {...user}
		console.log("User data : ".userData)
		console.log("User seller info : ".user.sellerInfo)
		delete data.email;
		if (user.sellerInfo) data = {...user.sellerInfo, ...data}
		console.log("data : ".data)
		userData.sellerInfo = {...data}
		console.log("User data sellerInfo : ".userData.sellerInfo)
		console.log("User data (sellerInfo) : ".userData)
		setUserDetails({ ...user, ...userData })
		console.log("User after update: ".user)
		setActiveTab(data.sellerApplicationStatus)
	})

	const [selectedOption, setSelectedOption] = useState((user.sellerInfo && user.sellerInfo.gstin) ? 'gstin' : 'non_gst');

	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
		setIsInvalid(false);
	};

	return (
		<>
			<AnimatePresence mode="wait">
				{isInvalid && (
					<motion.div className="form-error-container">
						<InputError message={inputError} key={inputError} />
					</motion.div>
				)}
			</AnimatePresence>
			<div className="form-inputs">
				<div className="section">
					<div className="radio-buttons">
						<label className='custom-radio'>
							<input
								type="radio"
								name="tax_option"
								value="non_gst"
								checked={selectedOption === 'non_gst'}
								onChange={handleOptionChange}
							/>
							<span className="radio-checkmark"></span>
							Enrolment ID / UIN (for Non-GST Sellers)
						</label>
						<p>
							Register with Enrolment ID / UIN and sell locally in your registered state without GST.
						</p>
					</div>
					{selectedOption === 'non_gst' && (
						<AnimatePresence mode="wait" initial={false}>
							<motion.div className="option" {...framer_input}>
								<FormProvider {...methods}>
									<form onSubmit={onSubmit} noValidate className="tax-options-form">
										<Input {...non_gst_input_config} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.uin) ? user.sellerInfo.uin : null} />
										<button className='submit-btn' type="submit">Continue</button>
									</form>
								</FormProvider>
								<p>
									Don’t have Enrolment ID / UIN (for Non-GST Sellers)?
									<a href="https://reg.gst.gov.in/registration/generateuid" className='tax-link'>
										Apply Now
									</a>
								</p>
							</motion.div>
						</AnimatePresence>
					)}
				</div>
				<div className="section">
					<div className="radio-buttons">
						<label className='custom-radio'>
							<input
								type="radio"
								name="tax_option"
								value="gstin"
								checked={selectedOption === 'gstin'}
								onChange={handleOptionChange}
							/>
							<span className="radio-checkmark"></span>
							GSTIN number
						</label>
						<p>
							for Regular and Composition GST sellers.
						</p>
					</div>
					{selectedOption === 'gstin' && (
						<AnimatePresence mode="wait">
							<motion.div className="option" {...framer_input}>
								<FormProvider {...methods}>
									<form onSubmit={onSubmit} noValidate className="tax-options-form">
										<Input {...gstin_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.gstin) ? user.sellerInfo.gstin : null} />
										<button className='submit-btn' type="submit">Continue</button>
									</form>
								</FormProvider>
								<p>
									Don’t have GSTIN?
									<a href="https://reg.gst.gov.in/registration/" className='tax-link'>Apply Now</a>
								</p>
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			</div>

		</>
	);
}

const PickupAddress = ({ setActiveTab, user, setUserDetails }) => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')

	const onSubmit = methods.handleSubmit(async data => {
		let altData = {}
		altData.pickupAddress = { ...data }
		altData.email = user.email
		altData.sellerApplicationStatus = (user.sellerApplicationStatus == 'submited') ? 'submited' : "bank-details"
		const response = await AuthHandling(altData, 'become-seller')
		if (response.error) {
			setIsInvalid(true)
			setInputError(response.message)
		}
		let userData = {...user}
		delete altData.email;
		if (user.sellerInfo) altData = {...user.sellerInfo, ...altData}
		userData.sellerInfo = {...altData}
		setUserDetails({ ...user, ...userData })
		setActiveTab(altData.sellerApplicationStatus)
	})

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate className="pickup-address-form fill-form">
				<AnimatePresence mode="wait">
					{isInvalid && (
						<motion.div className="form-error-container">
							<InputError message={inputError} key={inputError} />
						</motion.div>
					)}
				</AnimatePresence>
				<p className='sub-text'>Provide the complete street address, including building number, street name, and any relevant details (e.g., Floor, Unit, or Apartment Number).</p>
				<div className="form-group">
					<Input {...brand_name_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.brandName) ? user.sellerInfo.pickupAddress.brandName : null} />
					<Input {...address_line1_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.address_line_1) ? user.sellerInfo.pickupAddress.address_line_1 : null} />
					<Input {...address_line2_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.address_line_2) ? user.sellerInfo.pickupAddress.address_line_2 : null} />
					<Input {...city_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.city) ? user.sellerInfo.pickupAddress.city : null} />
					<Input {...state_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.state) ? user.sellerInfo.pickupAddress.state : null} />
					<Input {...zipcode_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.zipcode) ? user.sellerInfo.pickupAddress.zipcode : null} />
					<Input {...country_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.pickupAddress && user.sellerInfo.pickupAddress.country) ? user.sellerInfo.pickupAddress.country : null} />
				</div>
				<button className='submit-btn' type="submit">Save Pickup Address</button>
			</form>
		</FormProvider>
	)
}

const BankDetails = ({ setActiveTab, user, setUserDetails }) => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')

	const onSubmit = methods.handleSubmit(async data => {
		let altData = {}
		altData.bankDetails = { ...data }
		altData.email = user.email
		altData.sellerApplicationStatus = (user.sellerApplicationStatus == 'submited') ? 'submited' : "supplier-details"
		const response = await AuthHandling(altData, 'become-seller')
		if (response.error) {
			setIsInvalid(true)
			setInputError(response.message)
		}
		setUserDetails({ ...user, sellerApplicationStatus: altData.sellerApplicationStatus })
		setActiveTab(altData.sellerApplicationStatus)
	})

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate className="bank-details-form fill-form">
				<AnimatePresence mode="wait">
					{isInvalid && (
						<motion.div className="form-error-container">
							<InputError message={inputError} key={inputError} />
						</motion.div>
					)}
				</AnimatePresence>
				<p className='sub-text'>Carefully input your bank account number. Double-check this number to avoid any errors.</p>
				<div className="form-group">
					<Input {...account_holder_validation} setInvalidFalse={setIsInvalid} value={user.sellerInfo && user.sellerInfo.bankDetails && user.sellerInfo.bankDetails.accountHolder ? user.sellerInfo.bankDetails.accountHolder : ''} />
					<Input {...account_number_validation} setInvalidFalse={setIsInvalid} value={user.sellerInfo && user.sellerInfo.bankDetails && user.sellerInfo.bankDetails.accountNumber ? user.sellerInfo.bankDetails.accountNumber : ''} />
					<Input {...bank_name_validation} setInvalidFalse={setIsInvalid} value={user.sellerInfo && user.sellerInfo.bankDetails && user.sellerInfo.bankDetails.bankName ? user.sellerInfo.bankDetails.bankName : ''} />
					<Input {...ifsc_code_validation} setInvalidFalse={setIsInvalid} value={user.sellerInfo && user.sellerInfo.bankDetails && user.sellerInfo.bankDetails.ifscCode ? user.sellerInfo.bankDetails.ifscCode : ''} />
				</div>
				<button className='submit-btn' type="submit">Save Bank Details</button>
			</form>
		</FormProvider>
	)
}

const SupplierDetails = ({ setActiveTab, user, setUserDetails }) => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')

	const onSubmit = methods.handleSubmit(async data => {
		let altData = {}
		let supplierAddress = {
			address_line_1: data.address_line_1,
			address_line_2: data.address_line_2,
			city: data.city,
			state: data.state,
			country: data.country,
			zipcode: data.zipcode
		}
		delete data.address_line_1
		delete data.address_line_2
		delete data.city
		delete data.state
		delete data.country
		delete data.zipcode
		altData.supplierDetails = { ...data, supplierAddress }
		altData = { ...altData, email: user.email, sellerApplicationStatus: "submited" }
		const response = await AuthHandling(altData, 'become-seller')
		if (response.error) {
			setIsInvalid(true)
			setInputError(response.message)
		}
		setUserDetails({ ...user, sellerApplicationStatus: altData.sellerApplicationStatus })
		setActiveTab('submited')
	})

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate className="supplier-details-form fill-form">
				<AnimatePresence mode="wait">
					{isInvalid && (
						<motion.div className="form-error-container">
							<InputError message={inputError} key={inputError} />
						</motion.div>
					)}
				</AnimatePresence>
				<p className='sub-text'>Provide the name of the primary contact person at the supplier’s company.</p>
				<div className="form-group">
					<Input {...supplier_name_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierName) ? user.sellerInfo.supplierDetails.supplierName : null} />
					<Input {...business_type_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierBusiness) ? user.sellerInfo.supplierDetails.supplierBusiness : null} />
					<Input {...contact_number_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierContactNo) ? user.sellerInfo.supplierDetails.supplierContactNo : null} />
					<Input {...supplier_email_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierEmailId) ? user.sellerInfo.supplierDetails.supplierEmailId : null} />
					<Input {...supplier_address_line1_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierAddress.address_line_1) ? user.sellerInfo.supplierDetails.supplierAddress.address_line_1 : null} />
					<Input {...supplier_address_line2_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierAddress.address_line_2) ? user.sellerInfo.supplierDetails.supplierAddress.address_line_2 : null} />
					<Input {...supplier_city_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierAddress.city) ? user.sellerInfo.supplierDetails.supplierAddress.city : null} />
					<Input {...supplier_state_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierAddress.state) ? user.sellerInfo.supplierDetails.supplierAddress.state : null} />
					<Input {...supplier_zipcode_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierAddress.zipcode) ? user.sellerInfo.supplierDetails.supplierAddress.zipcode : null} />
					<Input {...supplier_country_validation} setInvalidFalse={setIsInvalid} value={(user.sellerInfo && user.sellerInfo.supplierDetails && user.sellerInfo.supplierDetails.supplierAddress.country) ? user.sellerInfo.supplierDetails.supplierAddress.country : null} />
				</div>
				<button className='submit-btn' type="submit">Save Supplier Details</button>
			</form>
		</FormProvider>
	)
}

const Submited = () => {

	return (
		<div className="submit-done">
			<MdDone />
			<p>Your request has been queued</p>
			<p>We will get back to you as soon as possible</p>
		</div>
	)
}

BecomeSeller.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string,
		sellerApplicationStatus: PropTypes.string,
		sellerInfo: PropTypes.shape({
			gstin: PropTypes.string,
			uin: PropTypes.string,
			pickupAddress: PropTypes.shape({}),
			bankDetails: PropTypes.shape({}),
			supplierDetails: PropTypes.shape({}),
		})
	}).isRequired,
}

TaxOptions.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	setActiveTab: PropTypes.func,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string,
		sellerApplicationStatus: PropTypes.string,
		sellerInfo: PropTypes.shape({
			gstin: PropTypes.string,
			uin: PropTypes.string
		})
	}).isRequired,
}

PickupAddress.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	setActiveTab: PropTypes.func,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string,
		sellerApplicationStatus: PropTypes.string,
		sellerInfo: PropTypes.shape({
			pickupAddress: PropTypes.shape({
				brandName: PropTypes.string,
				address_line_1: PropTypes.string,
				address_line_2: PropTypes.string,
				city: PropTypes.string,
				state: PropTypes.string,
				zipcode: PropTypes.string,
				country: PropTypes.string,
			})
		})
	}).isRequired,
}

BankDetails.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	setActiveTab: PropTypes.func,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string,
		sellerApplicationStatus: PropTypes.string,
		sellerInfo: PropTypes.shape({
			bankDetails: PropTypes.shape({
				accountHolder: PropTypes.string,
				accountNumber: PropTypes.string,
				bankName: PropTypes.string,
				ifscCode: PropTypes.string,
			})
		})
	}).isRequired,
}

SupplierDetails.propTypes = {
	setUserDetails: PropTypes.func.isRequired,
	setActiveTab: PropTypes.func,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		profileImage: PropTypes.string,
		sellerApplicationStatus: PropTypes.string,
		sellerInfo: PropTypes.shape({
			supplierDetails: PropTypes.shape({
				supplierName: PropTypes.string,
				supplierBusiness: PropTypes.string,
				supplierContactNo: PropTypes.string,
				supplierEmailId: PropTypes.string,
				supplierAddress: PropTypes.shape({
					address_line_1: PropTypes.string,
					address_line_2: PropTypes.string,
					city: PropTypes.string,
					state: PropTypes.string,
					zipcode: PropTypes.string,
					country: PropTypes.string,
				})
			})
		})
	}).isRequired,
}



const framer_input = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.4 },
}

export default BecomeSeller