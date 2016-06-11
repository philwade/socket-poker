import { connect } from 'preact-redux';
import IssueCard from '../components/home/issueCard';
import { update_issue } from '../actions';

const mapStateToProps = (state) => {
	return {
		issue: state.currentIssue
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		saveIssue: (issue) => {
			dispatch(update_issue(issue.title, issue.content));
		}
	};
};

const LiveIssueCard = connect(mapStateToProps, mapDispatchToProps)(IssueCard);

export default LiveIssueCard;
