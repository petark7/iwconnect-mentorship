import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from '../Modal';

const InviteUserModal = ({ toggleModal, isModalShown }) => {
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			await axios.post('https://run.mocky.io/v3/b1855737-fff4-4baa-a207-91f6671a1bf8');
			toast.success('Invite sent successfully!');
			toggleModal(false);
		} catch (error) {
			console.log(error);
			toast.error('There was an issue sending the invite.');
		}
	};

	return (
		<>
			{isModalShown && createPortal(
				<Modal isOpened={toggleModal} title="Invite user">
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="emailAddress">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="name@example.com" />
						</Form.Group>
						<Form.Group className="d-flex justify-content-end" controlId="submitBtn">
							<Button type="submit">Send invitation</Button>
						</Form.Group>
					</Form>
				</Modal>, document.body)}
		</>
	);
};

InviteUserModal.propTypes = {
	toggleModal: PropTypes.func,
	isModalShown: PropTypes.bool
};
export default InviteUserModal;
