import { h, Component } from 'preact';

class IssueCard extends Component {
	render() {
		return (
			<div className="card">
				<h1>{this.props.issue.title}</h1>
				<b>Score:</b>{this.props.issue.score}
				<p>{this.props.issue.description}</p>
			</div>
		);
	}
}
export default IssueCard;
