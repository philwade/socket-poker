import { h, Component } from 'preact';
import { route } from 'preact-router';
import Join from '../join';
import Voting from '../voting';

export default class Landing extends Component {
	constructor() {
		super();
		this.state.session = '';
	}

	redirectToJoin() {
		route('session/join/' + this.state.session);
	}

	onChange(e) {
		this.setState({ session: e.target.value});
	}

	render({ isHydrated, user, createSession, fetchSession, setUser, session }) {
		if(isHydrated && user) {
			return <Voting />
		}

		if(isHydrated && !user) {
			return <Join setUser={setUser}/>
		}

		return (
			<div class="row">
				<div class="col s8 offset-s2">
					<div class="card blue-grey darken-1 white-text">
						<div class="card-content">
							<h3>Welcome to Socket Poker</h3>
							<p>To get started create a new session or join one.</p>
							<p><a class="waves-effect waves-light btn"
								onClick={() => createSession()}><i class="material-icons left">play_arrow</i>Start a new session</a></p>
							<p>
								<a class="waves-effect waves-light btn"
									onClick={() => fetchSession(this.state.session)}>
									<i class="material-icons left">play_for_work</i>
									Join a session
								</a>
								<input type="text" value={this.state.session}
									onChange={(e) => this.onChange(e)}
									placeholder="Enter a session Id"/>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
