import { h, Component } from 'preact';

class Chat extends Component{
    render(props, state) {
		let messages = props.messages.map((message) => {
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
