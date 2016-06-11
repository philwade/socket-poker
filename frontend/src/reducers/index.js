import { combineReducers } from 'redux';
import users from './users';
import voteValues from './voteValues';
import currentIssue from './currentIssue';

const poker = combineReducers({
	currentIssue,
	users,
	voteValues
});
export default poker;
