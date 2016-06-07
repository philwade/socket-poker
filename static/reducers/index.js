const defaultState = {
	currentUser: null,
	messages: [],
	users: [],
	issues: [],
	voteValues: [
		'0',
		'1/2',
		'1',
		'2',
		'3',
		'5',
		'8',
		'13',
		'20',
		'40',
		'100',
		'?',
		'💯'
	]
};
const poker = (state = defaultState, action) => {
	switch(action.type) {
		case 'VOTE':
			return  {
				...state,
				users: state.users.map((user) => {
					if(user.id === action.userId) {
						return { ...user, vote: action.vote};
					}
					return user;
				})
			};
		default:
			return state;
	}
}
export default poker;
