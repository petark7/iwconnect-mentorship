import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from '../Modal';

const EditDataModal = ({ onClose, data, onSubmit }) => {
	const [formData, setFormData] = useState({});
	const [formJSX, setFormJSX] = useState([]);

	const handleChange = event => {
		setFormData(previousData => ({
		  ...previousData,
		  [event.target.id]: event.target.value
		}));
	  };

	useEffect(() => {
		const mappedData = data.map(element => (
			<Form.Group key={element.id} className="mb-3">
				<Form.Label>{element.name}</Form.Label>
				<Form.Control
					id={element.id}
					placeholder={element.value}
					onChange={handleChange} />
			</Form.Group>
		));
		setFormJSX(mappedData);
	}, [data]);

	return (
		<Modal isOpened={onClose} title="Edit information">
			<Form>
				{formJSX}
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

export default EditDataModal;
