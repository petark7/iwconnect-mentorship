import { useParams } from 'react-router';
import Layout from '../../components/Layout';

const VenueDetails = () => {
	const { venueID } = useParams();

	return (
		<Layout>
			<h1>Venue details {venueID}</h1>
		</Layout>
	);
};

export default VenueDetails;
