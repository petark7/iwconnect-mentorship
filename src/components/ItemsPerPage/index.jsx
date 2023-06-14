import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { itemsPerPage } from '../../constants/itemsPerPage';
import './index.scss';

const ItemsPerPage = ({ onSelect }) => {
	const selectOptions = itemsPerPage.map(element => (
		<option
			key={element.id}
			value={element.value}
		>
			{element.label}
		</option>
	));

	return (
		<div className="showItemsDiv">
			<p className="showPerPageText">Show per page</p>
			<Form.Select
				className="showPerPageSelect"
				aria-label="Items per page"
				onChange={event => onSelect(event.target.value)}
			>
				{selectOptions}
			</Form.Select>
		</div>
	);
};

ItemsPerPage.propTypes = {
	onSelect: PropTypes.func
};

export default ItemsPerPage;
