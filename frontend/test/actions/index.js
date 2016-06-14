import { vote, VOTE } from 'actions';
import { update_issue, UPDATE_ISSUE } from 'actions';
import { toggle_vote_visibility, TOGGLE_VOTE_VISIBILITY } from 'actions';
import { clear_votes, CLEAR_VOTES } from 'actions';
import { add_user, ADD_USER } from 'actions';

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
});
