import http from 'http';
import express from 'express';
import { createStore } from 'redux';
import pokerApp from '../reducers';
import { toggle_vote_visibility } from '../actions';

import monk from 'monk';

let app = express();
app.server = http.createServer(app);

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


app.server.listen(process.env.PORT || 5000);
console.log(`Started on port ${app.server.address().port}`);
