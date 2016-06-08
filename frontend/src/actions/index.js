export const vote = (userId, value) => {
	return {
		type: 'VOTE',
		userId: userId,
		vote: value
	}
}
