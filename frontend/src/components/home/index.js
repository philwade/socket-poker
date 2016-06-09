import { h, Component } from 'preact';
import style from './style';
import Chat from './chat';
import VotingUsers from '../../containers/votingUsers';
import IssueList from './issueList';
import VotingPanelContainer from '../../containers/votingPanelContainer';

let state = {
	currentUser: 'guy',
	messages: [
		{ id: 1, author: 'guy', content: 'hello' },
		{ id: 0, author: 'someoneelse', content: 'whattaup' }
	],
	issues: [
		{ id: 1, title: 'Add Socket Support', description: 'Update the UI via socket responses', score: '' },
		{ id: 0, title: 'Custom Votes', description: 'Allow custom voting numbers', score: '' }
	]
};

export default class Home extends Component {
	render() {
		return (
			<div className="cyan darken-1">
				<div className="row">
					<div className="col s6">
						<IssueList issues={state.issues} />
					</div>
					<div className="col s6">
						<Chat messages={state.messages} />
						<VotingUsers />
						<VotingPanelContainer />
					</div>
				</div>
			</div>
		);
	}
}
