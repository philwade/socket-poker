import { connect } from 'preact-redux';
import Join from '../components/join';
import { create_session, fetch_session } from '../actions';

const mapStateToProps = (state) => {
	return {
		isHydrated: state.isHydrated
	};
};

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

const LiveJoin = connect(mapStateToProps, mapDispatchToProps)(Join);
export default LiveJoin;
