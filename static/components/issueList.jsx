import React from 'react';
import IssueCard from 'components/issueCard.jsx!';

class IssueList extends React.Component {
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
