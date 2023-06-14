import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from '../Modal';

const EditDataModal = ({ onClose, data, onSubmit }) => {
	const [formData, setFormData] = useState({});

	const handleChange = event => {
		setFormData(previousData => ({
			...previousData,
			[event.target.id]: event.target.value
		}));
	};

	const mappedData = data.map(element => (
		<Form.Group key={element.id} className="mb-3">
			<Form.Label>{element.name}</Form.Label>
			<Form.Control
				id={element.id}
				placeholder={element.value}
				onChange={handleChange}
			/>
		</Form.Group>
	));

	return (
		<Modal isOpened={onClose} title="Edit information">
			<Form>
				{mappedData}
			</Form>
			<div className="d-flex justify-content-end">
				<Button
					style={{ width: '100%' }} onClick={() => {
						onSubmit(formData);
					}}
				>Submit
				</Button>
			</div>
		</Modal>
	);
};

EditDataModal.propTypes = {
	onClose: PropTypes.func,
	data: PropTypes.arrayOf(PropTypes.shape(
		{
			id: PropTypes.number,
			name: PropTypes.string,
			value: PropTypes.string
		}
	)),
	onSubmit: PropTypes.func
};

EditDataModal.defaultProps = {
	data: []
};
export default EditDataModal;
