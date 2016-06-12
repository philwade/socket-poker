import { VOTE, CLEAR_VOTES } from '../actions';

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
		default:
			return users;
	}
};
export default users;
