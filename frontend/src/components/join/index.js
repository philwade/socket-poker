import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Join extends Component {
	constructor() {
		super();
		this.state.username = '';
	}

	onChange(e) {
		route('session/' + this.props.id);
	}

	render({ createSession }, props, state) {
		return (
			<div class="row">
				<div class="col s8 offset-s2">
					<div class="card blue-grey darken-1 white-text">
						<div class="card-content">
							<h3>Joining session {props.id}</h3>
							<input type="text" value={state.username}
								disabled={props.isHydrated}
								onChange={(e) => this.onChange(e)}
								placeholder="Enter your username"/>
							<a class="waves-effect waves-light btn"
								disabled={props.isHydrated}
								onClick={() => createSession()}>
								<i class="material-icons left">flight_takeoff</i>
								Let's goooooo
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
