import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import './index.css';

const Modal = ({ isOpened, title, children }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	return (
		<>
			<div
				className="modal-overlay" onClick={() => {
					document.body.style.overflow = 'unset';
					isOpened(false);
				}} />
			<div className="modal-container">
				<div className="modal-closeButton">
					<GrClose onClick={() => {
						document.body.style.overflow = 'unset';
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
	isOpened: PropTypes.bool.isRequired,
	title: PropTypes.string,
	children: PropTypes.node
};
export default Modal;
