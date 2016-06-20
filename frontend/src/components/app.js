import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createStore } from 'redux';
import { Provider } from 'preact-redux';
import { hydrate_state } from '../actions';
import pokerApp from '../reducers';

import Header from './header';
import Voting from './voting';
import Landing from './landing';

let initialState = {
	currentUser: 0,
	users: [
		{ id: 1, name: 'guy', vote: '' },
		{ id: 0, name: 'someoneelse', vote: 20 },
		{ id: 2, name: 'me', vote: 20 }
	]
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
						<Voting path="/session/:id" />
						<Landing path="/" />
					</Router>
				</Provider>
			</div>
		);
	}
}
