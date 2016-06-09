import { h, Component } from 'preact';

class VotingPanel extends Component {
	render({ voteValues, userId, voteClick }) {
		let votes = voteValues.map((value, index) => {
			return <a key={index} onClick={() => voteClick(userId, value)} className="waves-effect waves-light btn">{value}</a>;
		});
		return (
			<div className="votingPanel">
				{votes}
			</div>
		);
	}
}
export default VotingPanel;
