import React from 'react';
import ReactDOM from 'react-dom';
import Chat from 'components/chat.jsx!';
import UserList from 'components/userList.jsx!';
import IssueList from 'components/issueList.jsx!';
import VotingPanel from 'components/votingPanel.jsx!';

import { createStore } from 'redux';
import { vote } from './actions/index.js';
import pokerApp from './reducers/index.js';

let initialState = {
	currentUser: 'guy',
	messages: [
		{ id: 1, author: 'guy', content: 'hello' },
		{ id: 0, author: 'someoneelse', content: 'whattaup' }
	],
	users: [
		{ id: 1, name: 'guy', vote: '' },
		{ id: 0, name: 'someoneelse', vote: 10 }
	],
	issues: [
		{ id: 1, title: 'Add Socket Support', description: 'Update the UI via socket responses', score: '' },
		{ id: 0, title: 'Custom Votes', description: 'Allow custom voting numbers', score: '' }
	],
	voteValues: [
		'0',
		'1/2',
		'1',
		'2',
		'3',
		'5',
		'8',
		'13',
		'20',
		'40',
		'100',
		'?',
		'💯'
	]
};
let store = createStore(pokerApp, initialState);

store.subscribe(() => {
	console.log(store.getState());
});

let state = store.getState();
store.dispatch(vote(0, '40'));


ReactDOM.render(
	<div className="cyan darken-1">
		<div className="row">
			<div className="col s6">
				<IssueList issues={state.issues} />
			</div>
			<div className="col s6">
				<Chat messages={state.messages} />
				<UserList users={state.users} />
				<VotingPanel values={state.voteValues} />
			</div>
		</div>
	</div>
	, document.querySelector('.root'));
