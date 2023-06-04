import { GrClose } from 'react-icons/gr';

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 1000,
	width: '60%',
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
const Modal = ({ toggleModal, title, children }) => (
	<>
		<div style={OVERLAY_STYLES} onClick={() => toggleModal(false)} />
		<div style={MODAL_STYLES}>
			<div style={CLOSE_BUTTON}>
				<GrClose onClick={() => toggleModal(false)} />
			</div>
			<h1 style={HEADING_STYLES}>{title}</h1>
			{children}
		</div>
	</>
);

export default Modal;
