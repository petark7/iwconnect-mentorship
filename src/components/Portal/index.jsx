import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children }) => (
	<>
		{createPortal(children, document.body)}
	</>
);

Portal.propTypes = {
	children: PropTypes.node
};

export default Portal;

