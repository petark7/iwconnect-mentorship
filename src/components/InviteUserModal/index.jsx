import { createPortal } from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from '../Modal';

const InviteUserModal = ({ toggleModal, isModalShown }) => {
	const handleSubmit = event => {
		event.preventDefault();
		// Handle sending email here.
		// if successfull -> close modal + show toast,
		// unsuccessful -> show toast
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

export default InviteUserModal;
