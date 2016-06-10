import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createStore } from 'redux';
import { Provider } from 'preact-redux';
import { vote } from '../actions';
import pokerApp from '../reducers';

import Header from './header';
import Home from './home';
import Profile from './profile';

let initialState = {
	currentUser: 0,
	users: [
		{ id: 1, name: 'guy', vote: '' },
		{ id: 0, name: 'someoneelse', vote: 10 },
		{ id: 2, name: 'me', vote: 101 }
	],
	issues: [
		{ id: 1, title: 'Add Socket Support', description: 'Update the UI via socket responses', score: '' },
		{ id: 0, title: 'Custom Votes', description: 'Allow custom voting numbers', score: '' }
	],
};
let store = createStore(pokerApp, initialState);
store.subscribe(() => {
	console.log(store.getState());
});

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
			<div id="app" class="cyan darken-1">
				<Header />
				<Provider store={store}>
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
				</Provider>
			</div>
		);
	}
}
