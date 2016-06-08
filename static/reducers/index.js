import { combineReducers } from 'redux';
import users from 'reducers/users.js';

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
const poker = combineReducers({
	users
});
export default poker;
