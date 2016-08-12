export const createActionDistributor = socket => store => next => action => {
	if(!action.local && !action.distributed) {
		let state = store.getState();
		socket.emit('action', {...action, id: state._id});
	}
	return next(action);
}
