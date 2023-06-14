import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import useScrollBlock from '../../hooks/useScrollBlock';
import './index.scss';

const Modal = ({ isOpened, title, children, customStyling }) => {
	const [blockScroll, allowScroll] = useScrollBlock();
	useEffect(() => {
		blockScroll();
		return () => {
			allowScroll();
		};
	}, []);

	return (
		<Portal>
			<div className="modal-overlay" onClick={() => isOpened(false)} />
			<div className={`modal-container ${customStyling}`}>
				<div className="modal-closeButton">
					<GrClose onClick={() => {
						isOpened(false);
					}} />
				</div>
				<h1 className="modal-heading">{title}</h1>
				{children}
			</div>
		</Portal>
	);
};

Modal.propTypes = {
	customStyling: PropTypes.string,
	isOpened: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.node
};

export default Modal;
