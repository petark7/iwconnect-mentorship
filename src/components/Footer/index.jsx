import { createPortal } from 'react-dom';
import { useState } from 'react';
import TermsModal from '../../components/TermsModal';
import PrivacyPolicyModal from '../PrivacyPolicyModal';
import './footer.scss';

const Footer = () => {
	const [showTerms, setShowTerms] = useState(false);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

	return (
		<footer className="bg-dark text-dark text-center py-3">
			<div className="container">
				<div>
					{showPrivacyPolicy && createPortal(
						<PrivacyPolicyModal
							modalVisible={showPrivacyPolicy} toggleModal={event => {
								event.preventDefault();
								setShowPrivacyPolicy(false);
							}} />,
						document.body
					)}
					<a
						href="#" className="text-light me-3" onClick={() => {
							setShowPrivacyPolicy(true);
						}}
					>
						Privacy Policy
					</a>
					{showTerms && createPortal(
						<TermsModal modalVisible={showTerms} toggleModal={() => setShowTerms(false)} />,
						document.body
					)}
					<a
						href="#" className="text-light me-3" onClick={() => setShowTerms(true)}

					>
						Terms and Conditions
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
