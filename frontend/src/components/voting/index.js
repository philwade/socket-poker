import { h, Component } from 'preact';
import style from './style';
import IssueCard from '../issueCard';
import VotingUsers from '../../containers/votingUsers';
import VotingPanelContainer from '../../containers/votingPanelContainer';
import Share from './share';

export default class Voting extends Component {
	render() {
		return (
			<div class="cyan darken-1">
				<div class="row">
					<div class="col s8 offset-s2">
						<IssueCard />
						<VotingPanelContainer />
						<VotingUsers />
						<Share />
					</div>
				</div>
			</div>
		);
	}
}
