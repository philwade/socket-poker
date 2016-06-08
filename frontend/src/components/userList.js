import { h, Component } from 'preact';

class UserList extends Component {
	render() {
		let users = this.props.users.map((user) => {
			return (
			<div key={user.id} className="user">
				<strong>{ user.vote ? 'X' : '?'}</strong> { user.name }
			</div>
			);
		});

		return (
			<div className="userList">
				{ users }
			</div>
		);
	}
}
export default UserList;
