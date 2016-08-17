import { combineReducers } from 'redux';
import users from './users';
import voteValues from './voteValues';
import currentIssue from './currentIssue';
import voteVisibility from './voteVisibility';
import isHydrated from './hydrated';
import user from './user';
import id from './id';

const poker = combineReducers({
	id,
	isHydrated,
	voteVisibility,
	currentIssue,
	user,
	users,
	voteValues
});
export default poker;
