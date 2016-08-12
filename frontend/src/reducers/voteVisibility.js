import { TOGGLE_VOTE_VISIBILITY, HYDRATE_STATE } from '../actions';

const voteVisibility = (visible = false, action) => {
	switch (action.type) {
		case TOGGLE_VOTE_VISIBILITY:
			return !visible;
		case HYDRATE_STATE:
			return action.state.voteVisibility;
		default:
			return visible;
	}
};
export default voteVisibility;
