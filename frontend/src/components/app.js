import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'preact-redux';
import thunkMiddleWare from 'redux-thunk';
import pokerApp from '../reducers';

import Header from './header';
import Voting from './voting';
import Landing from './landing';
import LiveJoin from '../containers/liveJoin';

let store = createStore(pokerApp,
	applyMiddleware(
		thunkMiddleWare
	)
);

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
						<LiveJoin path="/session/join/:id" />
						<Voting path="/session/:id" />
						<Landing path="/" />
					</Router>
				</Provider>
			</div>
		);
	}
}
