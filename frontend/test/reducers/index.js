import users from 'reducers/users';
import { VOTE } from 'actions';

/*global sinon,expect*/
describe('Reducers', () => {
	describe('apply vote', () => {

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
});
