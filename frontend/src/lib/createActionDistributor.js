export const createActionDistributor = socket => store => next => action => {
	socket.emit('action', action);
	return next(action);
}
