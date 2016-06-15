import { h, Component } from 'preact';

export default class Landing extends Component {
	render() {
		return (
			<div class="row">
				<div class="col s8 offset-s2">
					<div class="card blue-grey darken-1 white-text">
						<div class="card-content">
							<h3>Welcome to Socket Poker</h3>
							<p>To get started create a new session or join one.</p>
							<p><a class="waves-effect waves-light btn"><i class="material-icons left">play_arrow</i>Start a new session</a></p>
							<p><a class="waves-effect waves-light btn"><i class="material-icons left">play_for_work</i>Join a session</a><input type="text" placeholder="Enter a session Id"/></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
