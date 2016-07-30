import { connect } from 'preact-redux';
import Landing from '../components/landing';
import { create_session, fetch_session, set_user, add_user } from '../actions';
import guid from '../lib/guid';

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
			let id = guid();
			dispatch(add_user(user, id));
			dispatch(set_user(user, id));
		}
	};
};

const LiveLanding = connect(mapStateToProps, mapDispatchToProps)(Landing);
export default LiveLanding;
