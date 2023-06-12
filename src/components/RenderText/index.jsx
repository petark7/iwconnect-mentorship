import PropTypes from 'prop-types';

const RenderText = ({ textObject }) => textObject.map(sentence => <p key={sentence.key}>{sentence.text}</p>);

RenderText.propTypes = {
	textObject: PropTypes.arrayOf(
		PropTypes.shape(
			{
				id: PropTypes.number,
				text: PropTypes.string
			}))
};

export default RenderText;
