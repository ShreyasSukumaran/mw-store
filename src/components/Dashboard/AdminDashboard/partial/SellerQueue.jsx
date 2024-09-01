//import { useEffect, useState } from 'react';
//import { AdminAccess } from '../../../ApiRequests/Admin/AdminAccess';
//import SellerCard from './SellerCard';


const SellerQueue = () => {
	//const [sellersApplicationQueue, setSellersApplicationQueue] = useState([]);
	//const [sellersActiveQueue, setSellersActiveQueue] = useState([]);

	//const fetchSellers = async () => {
	//	try {
	//		const sellersData = await AdminAccess({}, "get-all-seller");
	//		const activeQueue = sellersData.filter(seller => seller.isActive);
	//		setSellersActiveQueue(activeQueue);

	//		const applicationQueue = sellersData.filter(seller => !seller.isActive);
	//		setSellersApplicationQueue(applicationQueue);
	//	} catch (error) {
	//		console.error("Failed to fetch sellers:", error);
	//	}
	//};

	//useEffect(() => {
	//	fetchSellers();
	//}, []);

	return (
		<div className="admin-dashboard">
			{/*<h2>Seller Applications Queue</h2>
			{sellersApplicationQueue.length > 0 ? (
				sellersApplicationQueue.map((seller) => (
					<SellerCard key={seller._id} seller={seller} refreshSellers={fetchSellers} />
				))
			) : (
				<p>No seller applications in the queue.</p>
			)}

			<h2>Seller List</h2>
			{sellersActiveQueue.length > 0 ? (
				sellersActiveQueue.map((seller) => (
					<SellerCard key={seller._id} seller={seller} refreshSellers={fetchSellers} />
				))
			) : (
				<p>No seller applications in the queue.</p>
			)}*/}
		</div>
	);
}

export default SellerQueue;

