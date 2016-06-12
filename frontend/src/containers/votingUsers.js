import { connect } from 'preact-redux';
import UserList from '../components/home/userList';

const mapStateToProps = (state) => {
	return {
		users: state.users,
		votesVisible: state.voteVisibility
	};
};

const votingUsers = connect(mapStateToProps)(UserList);

export default votingUsers;
