import { h, Component } from 'preact';

class IssueCard extends Component {
	render({ saveIssue }) {
		return (
			<div class="card blue-grey darken-1 issue">
				<div class="card-content white-text activator">
					<span class="card-title activator">{this.props.issue.title}<i class="material-icons right">mode edit</i></span>
					<p><b>Score:</b>{this.props.issue.score}</p>
					<p>{this.props.issue.content}</p>
				</div>
				<div class="card-reveal">
					<span class="card-title">Edit Issue <i class="material-icons right">close</i></span>
					<div class="row">
						<div class="input-field col s6">
							<input type="text" value={this.props.issue.title} onChange={(e) => saveIssue({'title': e.target.value})}/>
						</div>
						<div class="input-field col s6">
							<textarea value={this.props.issue.content} onChange={(e) => saveIssue({'content': e.target.value})}></textarea>
						</div>
					</div>
				</div>
				<div class="card-action">
					<a href>Show Votes</a>
					<a href>Clear Votes</a>
				</div>
			</div>
		);
	}
}
export default IssueCard;
