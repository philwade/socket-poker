import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<nav>
					<div class="nav-wrapper">
						<a href="/" class="brand-logo">Socket Poker</a>
						<ul id="nav-mobile"  class="right hide-on-med-and-down">
							<Link href="/about">About</Link>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
}
