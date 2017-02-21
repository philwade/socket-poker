import 'isomorphic-fetch';
import { hydrate_state } from './pure';

export const create_session = () => {
	return (dispatch) => {
		return fetch('/api/session', {method:'POST'})
			.then(response => response.json())
			.then(json => dispatch(hydrate_state(json)));
	};
};

export const fetch_session = (id) => {
	return (dispatch) => {
		return fetch('/api/session/' + id)
			.then(response => response.json())
			.then(json => dispatch(hydrate_state(json)));
	};
};

