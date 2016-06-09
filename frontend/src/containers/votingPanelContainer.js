import { connect } from 'preact-redux';
import { vote } from '../actions';
import VotingPanel from '../components/home/votingPanel';

const mapStateToProps = (state) => {
	return {
		voteValues: state.voteValues,
		userId: 1
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
