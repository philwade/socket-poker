import { h, Component } from 'preact';
import style from './style';
import IssueCard from './issueCard';
import VotingUsers from '../../containers/votingUsers';
import VotingPanelContainer from '../../containers/votingPanelContainer';

let state = {
	currentUser: 'guy',
	currentIssue: { title: 'Add Socket Support', description: 'Update the UI via socket responses', score: '' }
};

export default class Home extends Component {
	render() {
		return (
			<div className="cyan darken-1">
				<div className="row">
					<div className="col s8 offset-s2">
						<IssueCard issue={state.currentIssue} />
						<VotingUsers />
						<VotingPanelContainer />
					</div>
				</div>
			</div>
		);
	}
}
