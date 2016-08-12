import { HYDRATE_STATE } from '../actions';
const isHydrated = (hydrated = false, action) => {
	switch (action.type) {
		case HYDRATE_STATE:
			return true;
		default:
			return hydrated;
	}
};
export default isHydrated;
