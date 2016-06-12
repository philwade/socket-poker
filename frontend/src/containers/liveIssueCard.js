import { connect } from 'preact-redux';
import IssueCard from '../components/home/issueCard';
import { update_issue, toggle_vote_visibility, clear_votes } from '../actions';

const mapStateToProps = (state) => {
	return {
		issue: state.currentIssue,
		votesVisible: state.voteVisibility
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		saveIssue: (issue) => {
			dispatch(update_issue(issue.title, issue.content));
		},
		toggleVotes: () => {
			dispatch(toggle_vote_visibility());
		},
		clearVotes: () => {
			dispatch(clear_votes());
		}
	};
};

const LiveIssueCard = connect(mapStateToProps, mapDispatchToProps)(IssueCard);

export default LiveIssueCard;
