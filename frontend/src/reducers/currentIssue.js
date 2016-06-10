import { UPDATE_ISSUE } from '../actions';

const default_issue = {
	title: 'Get started voting!',
	content: 'Click the title or edit button to enter your first issue'
};

const currentIssue = (current_issue = default_issue, action) => {
	switch (action.type) {
		case UPDATE_ISSUE:
			return {
				title: action.title ? action.title : current_issue.title,
				content: action.content ? action.content : current_issue.content
			};
		default:
			return current_issue;
	}
};
export default currentIssue;
