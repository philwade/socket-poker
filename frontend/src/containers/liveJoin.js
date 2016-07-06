import { connect } from 'preact-redux';
import Join from '../components/join';
import { create_session, fetch_session } from '../actions';

const mapDispatchToProps = (dispatch) => {
	return {
		createSession: () => {
			dispatch(create_session());
		},
		fetchSession: (id) => {
			dispatch(fetch_session(id));
		}
	};
};

const LiveJoin = connect(() => { return {}; }, mapDispatchToProps)(Join);
export default LiveJoin;
