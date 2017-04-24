import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { update_issue, toggle_vote_visibility, clear_votes } from '../../actions';

const IssueCard = ({ saveIssue, toggleVotes, votesVisible, clearVotes, votes, issue }) => {
	let consensus = (!!votes.reduce((a, b) => (a === b) ? a : false) && votesVisible) &&
				<div class="row">
					<h4 class="light-green-text">Consensus!</h4>
				</div>;
	return (
		<div class="card blue-grey darken-1 issue">
			<div class="card-content white-text activator">
				<div class="row">
				<span class="card-title activator">{issue.title}<i class="material-icons right">mode edit</i></span>
				<p>{issue.content}</p>
				</div>
				<div class="row">
					<div class="col s4">High: <span class="userVote">{votesVisible ? votes[votes.length - 1] : '?'}</span></div>
					<div class="col s4">Low: <span class="userVote">{votesVisible ? votes[0] : '?'}</span></div>
					<div class="col s4">Average: <span class="userVote">{(votesVisible && votes.length) ? votes.reduce((previous, current) => previous + current, null) / votes.length : '?'}</span></div>
				</div>
				{consensus}
			</div>
			<div class="card-reveal">
				<span class="card-title">Edit Issue <i class="material-icons right">close</i></span>
				<div class="row">
					<div class="input-field col s6">
						<input type="text" value={issue.title} onChange={(e) => saveIssue({'title': e.target.value})}/>
					</div>
					<div class="input-field col s6">
						<textarea value={issue.content} onChange={(e) => saveIssue({'content': e.target.value})}></textarea>
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

const mapStateToProps = (state) => {
	return {
		issue: state.currentIssue,
		votesVisible: state.voteVisibility,
		votes: state.users
			.map((user) => user.vote)
			.sort((a, b) => a > b)
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
