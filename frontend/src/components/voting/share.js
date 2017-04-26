/*global: window*/
import { h } from 'preact';
import { connect } from 'preact-redux';
import style from './style';

const mapStateToProps = (state) => (
	{ id: state.id }
);

const Share = ({ id }) => (
	<div class="card cyan darken-3 white-text">
		<div class="card-content">
			Send your friends this url to join this session: {window.location.host}/session/{ id }
		</div>
	</div>
);

export default connect(mapStateToProps)(Share);
