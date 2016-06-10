import { VOTE } from '../actions';

const users = (users = [], action) => {
	switch (action.type) {
		case VOTE:
			return users.map((user) => {
				if (user.id === action.userId) {
					return { ...user, vote: action.vote};
				}
				return user;
			});
		default:
			return users;
	}
};
export default users;
