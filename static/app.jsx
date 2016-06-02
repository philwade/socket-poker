import React from 'react';
import ReactDOM from 'react-dom';
import Chat from 'components/chat.jsx!';
let messages = [
	{ id: 1, author: 'guy', content: 'hello' },
	{ id: 0, author: 'someoneelse', content: 'whattaup' }
];
ReactDOM.render(<Chat messages={messages} />, document.querySelector('.root'));
