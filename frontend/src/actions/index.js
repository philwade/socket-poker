export const vote = (userId, value) => {
	return {
		type: 'VOTE',
		userId,
		vote: value
	};
};
