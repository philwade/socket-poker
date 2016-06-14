import { h, Component } from 'preact';

class UserList extends Component {
	render({ users, votesVisible }) {
		let displayUsers = users.map((user) => {
			let voteStatus = votesVisible ? (user.vote ? user.vote : '?') : <i class="material-icons white-text">{ user.vote ? 'check' : 'timelapse'}</i>;
			return (
			<div key={user.id} class="collection-item cyan darken-3">
				  <span class='userVote'>{voteStatus}</span> { user.name }
			</div>
			);
		});

		return (
			<div class="userlist collection with-header white-text cyan darken-3">
				<div class="collection-header cyan darken-3">
					<h5>Your team</h5>
				</div>
				{ displayUsers }
			</div>
		);
	}
}
export default UserList;
