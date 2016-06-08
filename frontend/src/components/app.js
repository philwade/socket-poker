import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createStore } from 'redux';
import { vote } from '../actions';
import pokerApp from '../reducers';

import Header from './header';
import Home from './home';
import Profile from './profile';

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



export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
