import http from 'http';
import express from 'express';
import { createStore } from 'redux';
import pokerApp from '../reducers';
import { toggle_vote_visibility } from '../actions';

var app = express();
app.server = http.createServer(app);

let store = createStore(pokerApp);

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(toggle_vote_visibility());

app.get('/', (req, res) => {
	res.send('<h1>eyo whaatup</h1>');
});

app.server.listen(process.env.PORT || 8080);
console.log(`Started on port ${app.server.address().port}`);
