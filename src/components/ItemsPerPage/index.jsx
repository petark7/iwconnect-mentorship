import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './index.scss';

const ItemsPerPage = ({ itemsPerPage }) => (
	<div className="showItemsDiv">
		<p className="showPerPageText">Show per page</p>
		<Form.Select
			className="showPerPageSelect"
			aria-label="Items per page"
			onChange={event => itemsPerPage(event.target.value)}
		>
			<option value="20">20</option>
			<option value="40">40</option>
			<option value="60">60</option>
		</Form.Select>
	</div>
);

ItemsPerPage.propTypes = {
	itemsPerPage: PropTypes.func
};

export default ItemsPerPage;
