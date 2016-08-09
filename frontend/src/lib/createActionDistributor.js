export const createActionDistributor = socket => store => next => action => {
	let state = store.getState();
	socket.emit('action', {...action, id: state._id});
	return next(action);
}
