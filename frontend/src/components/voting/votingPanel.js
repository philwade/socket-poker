import { h, Component } from 'preact';

class VotingPanel extends Component {

	render({ voteValues, userId, voteClick }) {
		let votes = Object.keys(voteValues).map((key, index) => {
			return <a key={index} onClick={() => voteClick(userId, voteValues[key])} className="waves-effect waves-light btn">{key}</a>;
		});
		return (
			<div className="votingPanel">
				{votes}
			</div>
		);
	}
}
export default VotingPanel;
