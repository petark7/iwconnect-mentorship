import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import './index.css';

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 1000,
	maxWidth: '800px',
	height: 'fit-content',
	backgroundColor: 'white',
	padding: '50px',
	overflowY: 'auto',
	overflowX: 'hidden',
	maxHeight: '80%'
};

const OVERLAY_STYLES = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgb(0, 0, 0, .4)'
};

const CLOSE_BUTTON = {
	fontSize: 20,
	position: 'sticky',
	top: 0,
	transform: 'translate(100%, -100%)',
	cursor: 'pointer'
};

const HEADING_STYLES = {
	marginBottom: 25
};
const Modal = ({ isOpened, title, children }) => (
	<>
		<div className="modal-overlay" style={OVERLAY_STYLES} onClick={() => isOpened(false)} />
		<div className="modal-container" style={MODAL_STYLES}>
			<div className="modal-closeButton" style={CLOSE_BUTTON}>
				<GrClose onClick={() => isOpened(false)} />
			</div>
			<h1 className="modal-heading" style={HEADING_STYLES}>{title}</h1>
			{children}
		</div>
	</>
);

Modal.propTypes = {
	isOpened: PropTypes.bool.isRequired

};
export default Modal;
