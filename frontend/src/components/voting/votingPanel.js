import { connect } from 'preact-redux';
import { vote } from '../../actions';
import { h, Component } from 'preact';
import style from './style';

const VotingPanel = ({ voteValues, userId, voteClick, userVote }) => {
	let votes = Object.keys(voteValues).map((key, index) => {
		let displayClass = voteValues[key] === userVote ? `waves-effect waves-light btn ${style.chosenVote}` : "waves-effect waves-light btn";
		return <a key={index} onClick={() => voteClick(userId, voteValues[key])} className={displayClass}>{key}</a>;
	});

	return (
		<div className="votingPanel">
			{votes}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		voteValues: state.voteValues,
		userVote: state.users.filter((user) => user.id === state.user.id)[0].vote,
		userId: state.user.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		voteClick: (userId, value) => {
			dispatch(vote(userId, value));
		},
	};
};

const VotingPanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(VotingPanel);

export default VotingPanelContainer;
