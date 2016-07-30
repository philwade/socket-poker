import { connect } from 'preact-redux';
import { vote } from '../actions';
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
		}
	};
};

const VotingPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(VotingPanel);

export default VotingPanelContainer;
