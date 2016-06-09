import { connect } from 'preact-redux';
import { vote } from '../actions';
import VotingPanel from '../components/home/votingPanel';

const mapStateToProps = (state) => {
	return {
		votingUsers: state.voteValues.map((value) => {
			return { userId: 0, value };
		})
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		voteClick: (userId, value) => dispatch(vote(userId, value))
	};
}

const VotingPanelContainer = connect({
	mapStateToProps,
	mapDispatchToProps
})(VotingPanel);

export default VotingPanelContainer;
