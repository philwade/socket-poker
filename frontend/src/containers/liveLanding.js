import { connect } from 'preact-redux';
import Landing from '../components/landing';
import { create_session, fetch_session, set_user, add_user } from '../actions';

const mapStateToProps = (state) => {
	return {
		isHydrated: state.isHydrated,
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createSession: () => {
			dispatch(create_session());
		},
		fetchSession: (id) => {
			dispatch(fetch_session(id));
		},
		setUser: (user) => {
			dispatch(add_user(user));
			dispatch(set_user(user));
		}
	};
};

const LiveLanding = connect(mapStateToProps, mapDispatchToProps)(Landing);
export default LiveLanding;
