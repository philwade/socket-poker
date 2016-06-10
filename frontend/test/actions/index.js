import { vote, VOTE } from 'actions';
import { update_issue, UPDATE_ISSUE } from 'actions';

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
});
