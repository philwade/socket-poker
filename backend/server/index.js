import http from 'http';
import express from 'express';
import { createStore } from 'redux';
import pokerApp from '../reducers';
import { toggle_vote_visibility } from '../actions';

import monk from 'monk';

let app = express();
app.server = http.createServer(app);

let store = createStore(pokerApp);

store.subscribe(() => {
	console.log(store.getState());
});

let db = monk('localhost:27017/poker');
let sessions = db.get('sessions');
//sessions.insert(store.getState());
store.dispatch(toggle_vote_visibility());

app.get('/api/session/:id', (req, res) => {
	let id = req.params.id;
	sessions.findById(id, (err, doc) => {
		if(!err) {
			res.send('errrr ' + err);
			return;
		}
		res.send(doc);
	});
});

app.post('/api/session', (req, res) => {
	res.send('create session');
});


app.server.listen(process.env.PORT || 8080);
console.log(`Started on port ${app.server.address().port}`);
