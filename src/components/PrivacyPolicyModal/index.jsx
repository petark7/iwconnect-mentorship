import { GrClose } from 'react-icons/gr';

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 1000,
	width: '800px',
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
const PrivacyPolicyModal = ({ toggleModal, modalVisible }) => (
	<>
		<div style={OVERLAY_STYLES} onClick={toggleModal} />
		<div style={MODAL_STYLES}>
			<div style={CLOSE_BUTTON}>
				<GrClose onClick={toggleModal} />
			</div>
			<h1 style={HEADING_STYLES}>Privacy Policy</h1>
			<p>
				Dignissim convallis aenean et tortor at risus. Est velit egestas dui id ornare. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Mi ipsum faucibus vitae aliquet.
			</p>
			<p>
				Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Semper quis lectus nulla at volutpat diam ut. Urna nunc id cursus metus aliquam.
			</p>
			<p>
				Sed risus pretium quam vulputate. Nisl nunc mi ipsum faucibus vitae. Dui accumsan sit amet nulla facilisi. Viverra mauris in aliquam sem fringilla. Arcu non odio euismod lacinia at quis risus. Eget magna fermentum iaculis eu non. Et ultrices neque ornare aenean. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.
			</p>
			<p>
				Diam phasellus vestibulum lorem sed risus. In tellus integer feugiat scelerisque varius. Arcu non odio euismod lacinia.
			</p>
			<p>
				Sit amet consectetur adipiscing elit pellentesque habitant morbi. Egestas sed sed risus pretium quam vulputate dignissim. Ullamcorper eget nulla facilisi etiam dignissim diam. Quis varius quam quisque id. Urna duis convallis convallis tellus id.
			</p>
			<p>
				In mollis nunc sed id semper risus in hendrerit gravida. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Fringilla est ullamcorper eget nulla. Quisque egestas diam in arcu cursus euismod quis.
			</p>
			<p>
				Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Quis hendrerit dolor magna eget est lorem ipsum. Proin libero nunc consequat interdum varius sit amet.
			</p>
		</div>
	</>
);

export default PrivacyPolicyModal;
