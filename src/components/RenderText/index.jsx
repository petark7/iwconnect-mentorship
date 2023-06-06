import PropTypes from 'prop-types';

const RenderText = ({ textObject }) => {
	const textJSX = textObject.map(sentence => <p key={sentence.id}>{sentence.text}</p>);
	return (
		<>
			{textJSX}
		</>
	);
};

RenderText.propTypes = {
	textObject: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		text: PropTypes.string
	}))
};

export default RenderText;
