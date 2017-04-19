// TODO: this file should be middleware
import { HYDRATE_STATE, SET_USER } from '../actions';
export const createActionDistributor = socket => store => next => action => {
	switch (action.type) {
		case HYDRATE_STATE:
			socket.emit('join', action.state._id);
			break;
		case SET_USER:
			socket.emit('setuser', action.user.id);
			break;
		default:
			if (!action.local && !action.distributed) {
				let state = store.getState();
				socket.emit('action', {...action, id: state.id});
			}
	}
	return next(action);
};
