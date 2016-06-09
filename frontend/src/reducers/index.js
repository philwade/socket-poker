import { combineReducers } from 'redux';
import users from './users';
import voteValues from './voteValues';

const poker = combineReducers({
	users,
	voteValues
});
export default poker;
