import { vote, VOTE } from 'actions';

/*global sinon,expect*/
describe('Actions', () => {
	describe('create vote', () => {
		it('should create a proper vote action', () => {
			let value = '100';
			let userId = 100;

			let expected = {
				type: VOTE,
				userid: 100,
				value: '100'
			};

			expect(vote(userId, value)).toEqual(expected);
		});
	});
});
