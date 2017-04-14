import { connect } from 'preact-redux';
import { vote, remove_user } from '../actions';
import VotingPanel from '../components/voting/votingPanel';

const mapStateToProps = (state) => {
	return {
		voteValues: state.voteValues,
		userId: state.user.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		voteClick: (userId, value) => {
			dispatch(vote(userId, value));
		},
		removeUser: (id) => dispatch(remove_user(id))
	};
};

const VotingPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(VotingPanel);

export default VotingPanelContainer;
