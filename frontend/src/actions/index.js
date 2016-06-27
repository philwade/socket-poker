import 'isomorphic-fetch';

export const VOTE = 'VOTE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const TOGGLE_VOTE_VISIBILITY = 'TOGGLE_VOTE_VISIBLITY';
export const CLEAR_VOTES = 'CLEAR_VOTES';
export const ADD_USER = 'ADD_USER';
// receive state from the server
export const HYDRATE_STATE = 'HYDRATE_STATE';

export const vote = (userId, value) => {
	return {
		type: VOTE,
		userId,
		vote: value
	};
};

export const update_issue = (title, content) => {
	return {
		type: UPDATE_ISSUE,
		title,
		content
	};
};

export const toggle_vote_visibility = () => {
	return {
		type: TOGGLE_VOTE_VISIBILITY
	};
};

export const clear_votes = () => {
	return {
		type: CLEAR_VOTES
	};
};

export const add_user = (name, id) => {
	return {
		type: ADD_USER,
		name,
		id
	};
};

export const hydrate_state = (state) => {
	return {
		type: HYDRATE_STATE,
		state
	};
};

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
