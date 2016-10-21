import { HYDRATE_STATE } from '../actions';
export const createActionDistributor = socket => store => next => action => {
	switch(action.type) {
		case HYDRATE_STATE:
			socket.emit('join', action.state._id);
		default:
			if(!action.local && !action.distributed) {
				let state = store.getState();
				socket.emit('action', {...action, id: state.id});
			}
	}
	return next(action);
}
