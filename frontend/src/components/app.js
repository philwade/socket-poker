import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'preact-redux';
import thunkMiddleWare from 'redux-thunk';
import pokerApp from '../reducers';

import Header from './header';
import Voting from './voting';
import LiveLanding from '../containers/liveLanding';
import { createActionDistributor } from '../lib/createActionDistributor';

import io from 'socket.io-client';

let socket = io('', {path: '/api/socket'});
let actionDistributor = createActionDistributor(socket);

let store = createStore(pokerApp,
	applyMiddleware(
		thunkMiddleWare,
		actionDistributor
	)
);

store.subscribe(() => {
	console.log(store.getState());
});

socket.on('action', (action) => {
	store.dispatch(action);
	console.log('received action on socket: ', action);
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
						<LiveLanding path="/" />
					</Router>
				</Provider>
			</div>
		);
	}
}
