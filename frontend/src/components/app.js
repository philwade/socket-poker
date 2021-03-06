import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'preact-redux';
import thunkMiddleWare from 'redux-thunk';
import pokerApp from '../reducers';

import Header from './header';
import Voting from './voting';
import About from './about';
import LiveLanding from '../containers/liveLanding';
import { createActionDistributor } from '../lib/createActionDistributor';

import io from 'socket.io-client';

let socket = io('', {path: '/api/socket'});
let actionDistributor = createActionDistributor(socket);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(pokerApp,
	composeEnhancers(
		applyMiddleware(
			thunkMiddleWare,
			actionDistributor
		)
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
						<LiveLanding path="/session/:session_id" />
						<LiveLanding path="/" />
						<About path="/about" />
					</Router>
				</Provider>
			</div>
		);
	}
}
