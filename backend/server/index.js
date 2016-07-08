import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
import { createStore } from 'redux';
import pokerApp from '../reducers';
import { toggle_vote_visibility } from '../actions';

import monk from 'monk';

let db = monk('localhost:27017/poker');
let sessions = db.get('sessions');

let app = express();
let server = http.Server(app);
let socket = new SocketIO(server, { path: '/socket' });

app.get('/session/:id', (req, res) => {
	let id = req.params.id;
	sessions.findById(id, (err, doc) => {
		if(err) {
			res.json(err);
			return;
		}
		res.json(doc);
	});
});

app.post('/session', (req, res) => {
	let store = createStore(pokerApp);
	let state = store.getState();
	sessions.insert(state);
	res.json(state);
});

socket.on('connection', (socket) => {
	console.log('whattttupp');
});

server.listen(process.env.PORT || 5000);
console.log(`Started on port ${server.address().port}`);
