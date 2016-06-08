import { h, Component } from 'preact';
import IssueCard from 'components/issueCard.js';

class IssueList extends Component {
	render() {
		let cards = this.props.issues.map((issue) => {
			return <IssueCard key={issue.id} issue={issue}/>;
		});
		return (
			<div className="issueList">
				{cards}
			</div>
		);
	}
}
export default IssueList;
