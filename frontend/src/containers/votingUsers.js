import { connect } from 'preact-redux';
import UserList from '../components/voting/userList';

const mapStateToProps = (state) => {
	return {
		users: state.users,
		votesVisible: state.voteVisibility
	};
};

const votingUsers = connect(mapStateToProps)(UserList);

export default votingUsers;
