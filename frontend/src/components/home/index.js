import { h, Component } from 'preact';
import style from './style';
import LiveIssueCard from '../../containers/liveIssueCard';
import VotingUsers from '../../containers/votingUsers';
import VotingPanelContainer from '../../containers/votingPanelContainer';

export default class Home extends Component {
	render() {
		return (
			<div class="cyan darken-1">
				<div class="row">
					<div class="col s8 offset-s2">
						<LiveIssueCard />
						<VotingUsers />
						<VotingPanelContainer />
					</div>
				</div>
			</div>
		);
	}
}
