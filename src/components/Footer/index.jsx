import { createPortal } from 'react-dom';
import { useState } from 'react';
import Modal from '../Modal';
import privacyPolicyTextData from '../../data/privacyPolicy.json';
import termsAndCondTextData from '../../data/termsAndConditions.json';
import RenderText from '../RenderText';
import './footer.scss';

const Footer = () => {
	const [showTerms, setShowTerms] = useState(false);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

	return (
		<footer className="bg-dark text-dark text-center py-3">
			<div className="d-flex justify-content-center gap-3">
				{showPrivacyPolicy && createPortal(
					<Modal title="Privacy Policy" isOpened={setShowPrivacyPolicy}>
						<RenderText textObject={privacyPolicyTextData} />
					</Modal>,
					document.body
				)}
				<button
					type="button" className="footerButtonLinks" onClick={() => {
						setShowPrivacyPolicy(true);
					}}
				>
					Privacy Policy
				</button>
				{showTerms && createPortal(
					<Modal title="Terms and Conditions" isOpened={setShowTerms}>
						<RenderText textObject={termsAndCondTextData} />
					</Modal>,
					document.body
				)}
				<button
					type="button" className="footerButtonLinks" onClick={() => setShowTerms(true)}

				>
					Terms and Conditions
				</button>
			</div>
		</footer>
	);
};

export default Footer;
