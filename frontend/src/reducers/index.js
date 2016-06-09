import { combineReducers } from 'redux';
import users from './users';
import voteValues from './voteValues';

const defaultState = {
	currentUser: null,
	messages: [],
	users: [],
	issues: [],
	voteValues: []
};
const poker = combineReducers({
	users,
	voteValues
});
export default poker;
