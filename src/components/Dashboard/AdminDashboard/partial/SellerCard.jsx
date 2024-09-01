import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from 'framer-motion'
import SellerDetails from './SellerDetails';

const SellerCard = ({ seller, refreshSellers }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<AnimatePresence mode='wait'>
			<div className="seller-card">
				<div className="seller-minimal-info" onClick={handleToggleExpand}>
					<div className="brand-container">
						<h2>Brand Name : </h2>
						<h3>{seller.pickupAddress.brandName}</h3>
					</div>
					<div className="seller-info-container seller-info-container">
						{seller.uin && <p><strong>UIN:</strong> {seller.uin}</p>}
						{seller.gstin && <p><strong>GSTIN:</strong> {seller.gstin}</p>}
						<p><strong>Status:</strong> {seller.isActive ? 'Active' : 'Inactive'}</p>
					</div>
					<div className='view-btn'>
						{isExpanded ? 'view less' : 'view more'}
						<motion.div
							className='arrow'
							initial={{ rotate: 0 }}
							animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
							transition={{ duration: 0.3 }}
						>
							<IoIosArrowDown className='arrow-svg' />
						</motion.div>
					</div>
				</div>
				{isExpanded && <motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
				>
					<SellerDetails seller={seller} refreshSellers={refreshSellers} />
				</motion.div>}
			</div>
		</AnimatePresence>
	);
}

SellerCard.propTypes = {
	seller: PropTypes.shape({
		pickupAddress: PropTypes.shape({
			brandName: PropTypes.string.isRequired,
		}).isRequired,
		supplierDetails: PropTypes.shape({
			supplierName: PropTypes.string.isRequired
		}).isRequired,
		uin: PropTypes.string,
		gstin: PropTypes.string,
		isActive: PropTypes.bool.isRequired
	}).isRequired,
	refreshSellers: PropTypes.func.isRequired,
};

export default SellerCard;