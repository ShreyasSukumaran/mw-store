import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdminAccess } from '../../../ApiRequests/Admin/AdminAccess';
import { useDialogTrigger } from '../../../../hooks/Dialog/useDialog'

const SellerDetails = ({ seller, refreshSellers }) => {
	const triggerDialog = useDialogTrigger()
	const verifySeller = async () => {
		try {
			const response = await AdminAccess({ id: seller._id }, 'verify-seller');
			if (!response.isUpdated) {
				triggerDialog(response.message);
			} else {
				triggerDialog(seller.pickupAddress.brandName + " has been activated seller access");
				refreshSellers();
			}
		} catch (error) {
			console.error("Failed to verify seller:", error);
		}
	};

	const deactivateSeller = async () => {
		try {
			const response = await AdminAccess({ id: seller._id }, 'deactivate-seller');
			if (response.isUpdated) {
				refreshSellers();
			}
		} catch (error) {
			console.error("Failed to deactivate seller:", error);
		}
	};

	useEffect(() => { }, [seller])
	return (
		<>
			<div className="seller-details seller-detail-containers">
				<div className="supplier-detail-container seller-info-container">
					<h4>Supplier Details</h4>
					<p><strong>Supplier Name:</strong> {seller.supplierDetails.supplierName}</p>
					<p><strong>Supplier Business:</strong> {seller.supplierDetails.supplierBusiness}</p>
					<p><strong>Contact No:</strong> {seller.supplierDetails.supplierContactNo}</p>
					<p><strong>Email ID:</strong> {seller.supplierDetails.supplierEmailId}</p>
				</div>
				<div className="supplier-address-container seller-info-container">
					<h4>Supplier Address</h4>
					<p><strong>Address Line 1:</strong> {seller.supplierDetails.supplierAddress.address_line_1}</p>
					<p><strong>Address Line 2:</strong> {seller.supplierDetails.supplierAddress.address_line_2}</p>
					<p><strong>City:</strong> {seller.supplierDetails.supplierAddress.city}</p>
					<p><strong>State:</strong> {seller.supplierDetails.supplierAddress.state}</p>
					<p><strong>Country:</strong> {seller.supplierDetails.supplierAddress.country}</p>
					<p><strong>Zipcode:</strong> {seller.supplierDetails.supplierAddress.zipcode}</p>
				</div>
				<div className="pickup-address-container seller-info-container">
					<h4>Pickup Address</h4>
					<p><strong>Address Line 1:</strong> {seller.pickupAddress.address_line_1}</p>
					<p><strong>Address Line 2:</strong> {seller.pickupAddress.address_line_2}</p>
					<p><strong>City:</strong> {seller.pickupAddress.city}</p>
					<p><strong>State:</strong> {seller.pickupAddress.state}</p>
					<p><strong>Country:</strong> {seller.pickupAddress.country}</p>
					<p><strong>Zipcode:</strong> {seller.pickupAddress.zipcode}</p>
				</div>
				<div className="bank-details-container seller-info-container">
					<h4>Bank Details</h4>
					<p><strong>Account Holder:</strong> {seller.bankDetails.accountHolder}</p>
					<p><strong>Account Number:</strong> {seller.bankDetails.accountNumber}</p>
					<p><strong>Bank Name:</strong> {seller.bankDetails.bankName}</p>
					<p><strong>IFSC Code:</strong> {seller.bankDetails.ifscCode}</p>
				</div>

			</div>
			<div className="seller-verify-container">
				{seller.isActive
					? <button className="verify-button" onClick={() => deactivateSeller(seller)}>Deactivate</button>
					: <button className="verify-button" onClick={() => verifySeller(seller)}>Activate</button>}
			</div>
		</>
	);
}

SellerDetails.propTypes = {
	seller: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		supplierDetails: PropTypes.shape({
			supplierName: PropTypes.string.isRequired,
			supplierBusiness: PropTypes.string.isRequired,
			supplierContactNo: PropTypes.string.isRequired,
			supplierEmailId: PropTypes.string.isRequired,
			supplierAddress: PropTypes.shape({
				address_line_1: PropTypes.string.isRequired,
				address_line_2: PropTypes.string,
				city: PropTypes.string.isRequired,
				state: PropTypes.string.isRequired,
				country: PropTypes.string.isRequired,
				zipcode: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		pickupAddress: PropTypes.shape({
			brandName: PropTypes.string.isRequired,
			address_line_1: PropTypes.string.isRequired,
			address_line_2: PropTypes.string,
			city: PropTypes.string.isRequired,
			state: PropTypes.string.isRequired,
			country: PropTypes.string.isRequired,
			zipcode: PropTypes.string.isRequired
		}).isRequired,
		bankDetails: PropTypes.shape({
			accountHolder: PropTypes.string.isRequired,
			accountNumber: PropTypes.string.isRequired,
			bankName: PropTypes.string.isRequired,
			ifscCode: PropTypes.string.isRequired
		}).isRequired,
		uin: PropTypes.string,
		gstin: PropTypes.string,
		isActive: PropTypes.bool.isRequired
	}).isRequired,
	refreshSellers: PropTypes.func.isRequired,
};

export default SellerDetails