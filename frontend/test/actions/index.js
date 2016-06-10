import { vote, VOTE } from 'actions';

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
});
