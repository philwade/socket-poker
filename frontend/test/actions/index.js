import { vote, VOTE } from 'actions';
import { update_issue, UPDATE_ISSUE } from 'actions';
import { toggle_vote_visibility, TOGGLE_VOTE_VISIBILITY } from 'actions';
import { clear_votes, CLEAR_VOTES } from 'actions';
import { add_user, ADD_USER } from 'actions';
import { hydrate_state, HYDRATE_STATE } from 'actions';
import { create_session, fetch_session } from 'actions';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

const middleWares = [ thunk ];
const mockStore = configureMockStore(middleWares);

/*global sinon,expect*/
describe('Actions', () => {
	describe('create vote', () => {
		it('should create a proper vote action', () => {
			let value = '100';
			let userId = 100;

			let expected = {
				type: VOTE,
				userId: 100,
				vote: '100'
			};

			expect(vote(userId, value)).to.eql(expected);
		});
	});

	describe('update issue', () => {
		it('should create an update issue action', () => {
			let title = 'A new issue';
			let content = 'A description of the issue';

			let expected = {
				type: UPDATE_ISSUE,
				title,
				content
			};

			expect(update_issue(title, content)).to.eql(expected);
		});
	});

	describe('toggle vote visiblity', () => {
		it('should create a toggle action', () => {
			let expected = {
				type: TOGGLE_VOTE_VISIBILITY
			};

			expect(toggle_vote_visibility()).to.eql(expected);
		});
	});

	describe('clear votes', () => {
		it('should create a clear action', () => {
			const expected = {
				type: CLEAR_VOTES
			};

			expect(clear_votes()).to.eql(expected);
		});
	});

	describe('add user', () => {
		it('should create an add user action', () => {
			const expected = {
				type: ADD_USER,
				name: 'test',
				id: 0
			};

			expect(add_user('test', 0)).to.eql(expected);
		});
	});

	describe('hydrate state', () => {
		it('should create a hydrate state action', () => {
			const expected = {
				type: HYDRATE_STATE,
				state: { butts: 'butts' }
			};

			expect(hydrate_state({ butts:'butts'})).to.eql(expected);
		});
	});

	describe('async actions', () => {
		afterEach(() => {
			fetchMock.restore();
		});

		it('should hydrate state after creating a session', () => {
			fetchMock.mock(
				'/api/session',
				'POST',
				{ body: { users: ['hello'] } }
			);

			const expectedActions = [
				{ type: HYDRATE_STATE, state: { users: ['hello'] } }
			];

			const store = mockStore({ users: [] });

			return store.dispatch(create_session())
				.then(() => {
					expect(store.getActions()).to.eql(expectedActions);
				});
		});

		it('should hydrate state after fetching a session', () => {
			fetchMock.mock(
				'/api/session/123',
				{ body: { users: ['hello'] } }
			);

			const expectedActions = [
				{ type: HYDRATE_STATE, state: { users: ['hello'] } }
			];

			const expectedState = {
				users: ['hello']
			};

			const store = mockStore({ users: [] });

			return store.dispatch(fetch_session(123))
				.then(() => {
					expect(store.getActions()).to.eql(expectedActions);
				});
		});
	});
});
