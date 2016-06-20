import users from 'reducers/users';
import currentIssue from 'reducers/currentIssue';
import voteVisibility from 'reducers/voteVisibility';
import isHydrated from 'reducers/hydrated';
import { VOTE, UPDATE_ISSUE, TOGGLE_VOTE_VISIBILITY, CLEAR_VOTES, ADD_USER, HYDRATE_STATE } from 'actions';

/*global sinon,expect*/
describe('Reducers', () => {
	describe('vote', () => {

		it('should return the initial state', () => {
			expect(users(undefined, {})).to.eql([]);
		});

		it('should change the users vote', () => {
			const initialState = [
				{ userId: 0, vote: 100 }
			];
			const action = {
				type: VOTE,
				id: 0,
				vote: 300
			};
			const expected = [
				{ userId: 0, vote: 300 }
			];

			expect(users(initialState, action)).to.eql(expected);
		});

		it('should clear users votes', () => {
			const initial = [
				{ userId: 0, vote: 100 },
				{ userId: 1, vote: '' },
				{ userId: 2, randomInfo: 'yey', vote: 'test'}
			];

			const expected = [
				{ userId: 0, vote: '' },
				{ userId: 1, vote: '' },
				{ userId: 2, randomInfo: 'yey', vote: ''}
			];

			const action = {
				type: CLEAR_VOTES
			};

			expect(users(initial, action)).to.eql(expected);
		});

		it('should add a new user', () => {
			const initial = [
				{ userId: 0, vote: 100 },
				{ userId: 1, vote: '' },
				{ userId: 2, randomInfo: 'yey', vote: 'test'}
			];

			const expected = [
				{ userId: 0, vote: 100 },
				{ userId: 1, vote: '' },
				{ userId: 2, randomInfo: 'yey', vote: 'test'},
				{ id: 100, name: 'name', vote: ''}
			];

			const action = {
				type: ADD_USER,
				name: 'name',
				id: 100
			};

			expect(users(initial, action)).to.eql(expected);
		});

		it('should hydrate the users from server state', () => {
			const given = [];
			const action = {
				type: HYDRATE_STATE,
				state: {
					users: [
						{ userId: 0, vote: 100 },
						{ userId: 1, vote: '' },
						{ userId: 2, randomInfo: 'yey', vote: 'test'},
						{ id: 100, name: 'name', vote: ''}
					]
				}
			};

			const expected = [
				{ userId: 0, vote: 100 },
				{ userId: 1, vote: '' },
				{ userId: 2, randomInfo: 'yey', vote: 'test'},
				{ id: 100, name: 'name', vote: ''}
			];

			expect(users(given, action)).to.eql(expected);
		});

	});

	describe('currentIssue', () => {

		it('should return a default initial state', () => {
			const expected = {
				title: 'Test title',
				content: 'Test content'
			};

			expect(currentIssue(expected, {})).to.eql(expected);
		});

		it('should modify the current issue', () => {
			const expected = {
				title: 'New title',
				content: 'New content'
			};

			const given = {
				title: 'Test title',
				content: 'Test content'
			};

			const action = {
				type: UPDATE_ISSUE,
				title: 'New title',
				content: 'New content'
			};

			expect(currentIssue(given, action)).to.eql(expected);
		});

		it('should only modify the title when given the only the title', () => {
			const expected = {
				title: 'New title',
				content: 'Test content'
			};

			const given = {
				title: 'Test title',
				content: 'Test content'
			};

			const action = {
				type: UPDATE_ISSUE,
				title: 'New title'
			};

			expect(currentIssue(given, action)).to.eql(expected);
		});

		it('should only modify the content when given the only the content', () => {
			const expected = {
				title: 'Test title',
				content: 'New content'
			};

			const given = {
				title: 'Test title',
				content: 'Test content'
			};

			const action = {
				type: UPDATE_ISSUE,
				content: 'New content'
			};

			expect(currentIssue(given, action)).to.eql(expected);
		});

		it('should pull the issue out of state given on hydration', () => {
			const given = 'old issue';
			const expected = 'test';
			const action = {
				type: HYDRATE_STATE,
				state: {
					currentIssue: 'test'
				}
			};

			expect(currentIssue(given, action)).to.eql(expected);
		});
	});

	describe('vote visibility', () => {
		it('should return not visible as a default', () => {
			expect(voteVisibility(undefined, {})).to.equal(false);
		});

		it('should toggle the visibility when given a toggle action', () => {
			const action = {
				type: TOGGLE_VOTE_VISIBILITY
			};

			expect(voteVisibility(false, action)).to.equal(true);
			expect(voteVisibility(true, action)).to.equal(false);
		});

		it('should hydrate with visibility from server state', () => {
			const given = false;
			const expected = true;
			const action = {
				type: HYDRATE_STATE,
				state: {
					voteVisibility: true
				}
			};

			expect(voteVisibility(given, action)).to.equal(expected);
		});
	});

	describe('hydrate state', () => {
		it('should update the isHydrated value', () => {
			const action = {
				type: HYDRATE_STATE,
				state: {}
			};

			expect(isHydrated(false, action)).to.equal(true);
		});
	});
});
