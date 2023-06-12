import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import './index.scss';

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
			<div className={`modal-container ${customStyling}`}>
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
	customStyling: PropTypes.string,
	isOpened: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.node
};
export default Modal;
