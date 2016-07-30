import { h, Component } from 'preact';

class IssueCard extends Component {
	render({ saveIssue, toggleVotes, votesVisible, clearVotes, votes }) {
		let consensus = (!!votes.reduce((a, b) => (a === b) ? a : false, null) && votesVisible) ?
					<div class="row">
						<h4 class="light-green-text">Consensus!</h4>
					</div>
					: '';
		return (
			<div class="card blue-grey darken-1 issue">
				<div class="card-content white-text activator">
					<div class="row">
					<span class="card-title activator">{this.props.issue.title}<i class="material-icons right">mode edit</i></span>
					<p>{this.props.issue.content}</p>
					</div>
					<div class="row">
						<div class="col s4">High: <span class="userVote">{votesVisible ? votes.sort()[votes.length - 1] : '?'}</span></div>
						<div class="col s4">Low: <span class="userVote">{votesVisible ? votes.sort()[0] : '?'}</span></div>
						<div class="col s4">Average: <span class="userVote">{votesVisible ? votes.reduce((previous, current) => previous + current) / votes.length : '?'}</span></div>
					</div>
					{consensus}
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
					<a href onClick={(e) => { e.preventDefault(); toggleVotes(); }}>{ votesVisible ? 'Hide Votes' : 'Show Votes' }</a>
					<a href onClick={(e) => { e.preventDefault(); clearVotes(); }}>Clear Votes</a>
				</div>
			</div>
		);
	}
}
export default IssueCard;
