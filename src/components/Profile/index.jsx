import PropTypes from 'prop-types';

const Profile = ({ actor }) => (
	<div key={actor.id} className="card mb-4">
		<div className="card-body text-center">
			<img
				src={actor.image}
				alt="avatar"
				className="rounded-circle img-fluid"
				style={{ height: '150px', width: '150px', objectFit: 'fill' }}
			/>
			<h5 className="my-3">{actor.name}</h5>
			<p className="text-muted mb-1">{actor.company}</p>
			<p className="text-muted mb-4">{actor.address}</p>
		</div>
	</div>
);

Profile.propTypes = {
	actor: PropTypes.objectOf(PropTypes.shape(
		{
			id: PropTypes.number.isRequired,
			image: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			company: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired
		}
	))
};

export default Profile;
