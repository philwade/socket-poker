import http from 'http';
import Server from 'socket.io';
import express from 'express';
import { createStore } from 'redux';
import pokerApp from '../reducers';
import { toggle_vote_visibility } from '../actions';

import monk from 'monk';

let app = express();
let db = monk('localhost:27017/poker');
let sessions = db.get('sessions');

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

let server = http.Server(app);
server.listen(process.env.PORT || 5000);
let socket = Server(server);


socket.on('connection', (socket) => {
	console.log('whattttupp');
});


console.log(`Started on port ${server.address().port}`);
