import { VOTE, CLEAR_VOTES, ADD_USER, REMOVE_USER, HYDRATE_STATE } from '../actions';

const users = (users = [], action) => {
	switch (action.type) {
		case VOTE:
			return users.map((user) => {
				if (user.id === action.userId) {
					return { ...user, vote: action.vote};
				}
				return user;
			});
		case CLEAR_VOTES:
			return users.map((user) => {
				return { ...user, vote: ''};
			});
		case ADD_USER:
			return [...users, { name: action.name, id: action.userId, vote: '' }];
		case REMOVE_USER:
			return users.filter((user) => user.id !== action.userId);
		case HYDRATE_STATE:
			return action.state.users;
		default:
			return users;
	}
};
export default users;
