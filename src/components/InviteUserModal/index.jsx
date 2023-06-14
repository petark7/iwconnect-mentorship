import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../axiosInterceptors';
import Modal from '../Modal';

const InviteUserModal = ({ toggleModal, isModalShown }) => {
	const handleSubmit = async event => {
		event.preventDefault();
		await axiosInstance.post('https://run.mocky.io/v3/df1f042a-5a26-4460-8524-e0bbc0f00812');
		toast.success('Invite sent successfully!');
		toggleModal(false);
	};

	return (
		<>
			{isModalShown
				&& <Modal isOpened={toggleModal} title="Invite user">
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="emailAddress">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="name@example.com" />
						</Form.Group>
						<Form.Group className="d-flex justify-content-end" controlId="submitBtn">
							<Button type="submit">Send invitation</Button>
						</Form.Group>
					</Form>
       </Modal>}
		</>
	);
};

InviteUserModal.propTypes = {
	toggleModal: PropTypes.func,
	isModalShown: PropTypes.bool
};
export default InviteUserModal;
