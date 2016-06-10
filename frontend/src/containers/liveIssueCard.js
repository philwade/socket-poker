import { connect } from 'preact-redux';
import IssueCard from '../components/home/issueCard';

const mapStateToProps = (state) => {
	return {
		issue: state.currentIssue
	};
}

const LiveIssueCard = connect(mapStateToProps)(IssueCard);

export default LiveIssueCard;
