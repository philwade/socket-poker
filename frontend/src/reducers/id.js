import { HYDRATE_STATE } from '../actions';

const id = (id = null, action) => {
	switch (action.type) {
		case HYDRATE_STATE:
			return action.state.id || action.state._id || id;
		default:
			return id;
	}
};
export default id;
