import users from 'reducers/users';
import currentIssue from 'reducers/currentIssue';
import { VOTE, UPDATE_ISSUE } from 'actions';

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
	});
});
