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
		saveIssue: (title = false, content = false) => {
			dispatch(update_issue(title, content));
		}
	};
};

const LiveIssueCard = connect(mapStateToProps)(IssueCard);

export default LiveIssueCard;
