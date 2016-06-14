import http from 'http';
import express from 'express';

var app = express();
app.server = http.createServer(app);

app.get('/', (req, res) => {
	res.send('<h1>eyo whaatup</h1>');
});

app.server.listen(process.env.PORT || 8080);
console.log(`Started on port ${app.server.address().port}`);
