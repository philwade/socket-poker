import { h, Component } from 'preact';

class UserList extends Component {
	render({ users }) {
		let displayUsers = users.map((user) => {
			return (
			<div key={user.id} className="user">
				<strong>{ user.vote ? 'X' : '?'}</strong> { user.name }
			</div>
			);
		});

		return (
			<div className="userList">
				{ displayUsers }
			</div>
		);
	}
}
export default UserList;
