import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import './index.css';

const Modal = ({ isOpened, title, children, customStyling }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	return (
		<>
			<div
				className="modal-overlay" onClick={() => {
					isOpened(false);
				}} />
			<div className="modal-container">
				<div className="modal-closeButton">
					<GrClose onClick={() => {
						isOpened(false);
					}} />
				</div>
				<h1 className="modal-heading">{title}</h1>
				{children}
			</div>
		</>
	);
};

Modal.propTypes = {
	isOpened: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.node
};
export default Modal;
