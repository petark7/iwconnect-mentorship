import PropTypes from 'prop-types';

// EXPECTS PROPS IN FORMAT:
//     {
//         id: 1,
//         image: "https://robohash.org/etquosnon.png?size=500x500&set=set1",
//         company: "Babbleopia",
//         address: "6 Almo Park"
//     }

const UserProfile = ({ user }) => (
	<div key={user.id} className="card mb-4">
		<div className="card-body text-center">
			<img
				src={user.image} alt="avatar"
				className="rounded-circle img-fluid" style={{ width: '150px' }} />
			<h5 className="my-3">{user.name}</h5>
			<p className="text-muted mb-1">{user.company}</p>
			<p className="text-muted mb-4">{user.address}</p>
		</div>
	</div>
);

UserProfile.propTypes = {
	user: PropTypes.objectOf(PropTypes.shape(
		{
			id: PropTypes.number.isRequired,
			image: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			company: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired
		}
	))
};
export default UserProfile;
