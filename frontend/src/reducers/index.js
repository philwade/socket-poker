import { combineReducers } from 'redux';
import users from './users';
import voteValues from './voteValues';
import currentIssue from './currentIssue';
import voteVisibility from './voteVisibility';

const poker = combineReducers({
	voteVisibility,
	currentIssue,
	users,
	voteValues
});
export default poker;
