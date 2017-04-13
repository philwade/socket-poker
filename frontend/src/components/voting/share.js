/*global: window*/
import { h } from 'preact';
import { connect } from 'preact-redux';

const mapStateToProps = (state) => (
	{ id: state.id }
);

const Share = ({ id }) => (
	<div>
		Send your friends this url to join this session: {window.location.host}/session/{ id }
	</div>
);

export default connect(mapStateToProps)(Share);
