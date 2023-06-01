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
const TermsModal = ({ toggleModal }) => (
	<>
		<div style={OVERLAY_STYLES} onClick={toggleModal} />
		<div style={MODAL_STYLES}>
			<div style={CLOSE_BUTTON}>
				<GrClose onClick={toggleModal} />
			</div>
			<h1 style={HEADING_STYLES}>Terms and Conditions</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet nulla facilisi morbi. Eget duis at tellus at urna condimentum mattis pellentesque id. Posuere urna nec tincidunt praesent semper.
			</p>
			<p>
				Etiam erat velit scelerisque in dictum. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Sodales neque sodales ut etiam sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Placerat in egestas erat imperdiet sed euismod nisi porta. Vel risus commodo viverra maecenas. Dolor sit amet consectetur adipiscing elit.
			</p>
			<p>
				Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Sit amet facilisis magna etiam. Amet volutpat consequat mauris nunc. Quam lacus suspendisse faucibus interdum posuere. Pretium lectus quam id leo in vitae turpis.
			</p>
			<p>
				Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Quis hendrerit dolor magna eget est lorem ipsum. Proin libero nunc consequat interdum varius sit amet.
			</p>
			<p>
				In mollis nunc sed id semper risus in hendrerit gravida. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Fringilla est ullamcorper eget nulla. Quisque egestas diam in arcu cursus euismod quis.
			</p>
			<p>
				Sit amet consectetur adipiscing elit pellentesque habitant morbi. Egestas sed sed risus pretium quam vulputate dignissim. Ullamcorper eget nulla facilisi etiam dignissim diam. Quis varius quam quisque id. Urna duis convallis convallis tellus id.
			</p>
			<p>
				Diam phasellus vestibulum lorem sed risus. In tellus integer feugiat scelerisque varius. Arcu non odio euismod lacinia.
			</p>
			<p>
				Sed risus pretium quam vulputate. Nisl nunc mi ipsum faucibus vitae. Dui accumsan sit amet nulla facilisi. Viverra mauris in aliquam sem fringilla. Arcu non odio euismod lacinia at quis risus. Eget magna fermentum iaculis eu non. Et ultrices neque ornare aenean. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.
			</p>
			<p>
				Aenean sed adipiscing diam donec adipiscing tristique. Sit amet nulla facilisi morbi. Senectus et netus et malesuada fames ac. Sodales ut etiam sit amet nisl purus.
			</p>
		</div>
	</>
);

export default TermsModal;
