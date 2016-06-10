export const VOTE = 'VOTE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
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
