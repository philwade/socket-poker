export const VOTE = 'VOTE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const TOGGLE_VOTE_VISIBILITY = 'TOGGLE_VOTE_VISIBLITY';
export const CLEAR_VOTES = 'CLEAR_VOTES';
export const vote = (userId, value) => {
	return {
		type: VOTE,
		userId,
		vote: value
	};
};

export const update_issue = (title, content) => {
	return {
		type: UPDATE_ISSUE,
		title,
		content
	};
};

export const toggle_vote_visibility = () => {
	return {
		type: TOGGLE_VOTE_VISIBILITY
	};
};

export const clear_votes = () => {
	return {
		type: CLEAR_VOTES
	};
};
