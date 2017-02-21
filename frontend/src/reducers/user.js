import { SET_USER } from '../actions';
const user = (user = null, action) => {
	switch (action.type) {
		case SET_USER:
			return action.user;
		default:
			return user;
	}
};
export default user;
