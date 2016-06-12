import { TOGGLE_VOTE_VISIBILITY } from '../actions';

const voteVisibility = (visible = false, action) => {
	switch (action.type) {
		case TOGGLE_VOTE_VISIBILITY:
			return !visible;
		default:
			return visible;
	}
};
export default voteVisibility;
