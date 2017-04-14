import { h } from 'preact';

const About = () => (
	<div class="row">
		<div class="col s8 offset-s2">
			<div class="card blue-grey darken-1 white-text">
				<div class="card-content">
					<h3>About Socket Poker</h3>
					<p>I built Socket Poker to learn about preact, redux and websockets. I ended up learning about node and express too. If you'd like to get in touch, my email address is phil at philwade dot org. I'm also on twitter <a href="https://twitter.com/phil_wade">@phil_wade</a></p>
					<p>It is also open source software, on github here: <a href="https://github.com/philwade/socket-poker">https://github.com/philwade/socket-poker</a>
					<h3>About Pointing Poker</h3>
					<p>Pointing poker is a way for agile teams to size tickets for inclusion in sprints. For more, look at <a href="https://en.wikipedia.org/wiki/Planning_poker">https://en.wikipedia.org/wiki/Planning_poker</a></p>
				</div>
			</div>
		</div>
	</div>
);

export default About;
