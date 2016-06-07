import React from 'react';

class Chat extends React.Component{
    render() {
		let messages = this.props.messages.map((message) => {
			return <div key={message.id} className="message"><strong>{ message.author }</strong>: { message.content }</div>
		});
		return (
		<div className="chatWindow">
			{ messages }
		</div>
		);
    }
}
export default Chat;
