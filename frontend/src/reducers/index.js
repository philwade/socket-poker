import { combineReducers } from 'redux';
import users from './users';
import voteValues from './voteValues';
import currentIssue from './currentIssue';
import voteVisibility from './voteVisibility';
import isHydrated from './hydrated';

const poker = combineReducers({
	isHydrated,
	voteVisibility,
	currentIssue,
	users,
	voteValues
});
export default poker;
