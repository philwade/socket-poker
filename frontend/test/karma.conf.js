require('babel-register');
var webpack = require('../webpack.config.babel.js');

module.exports = function(config) {
	config.set({
		basePath: '../',
		frameworks: ['mocha', 'chai-sinon'],
		reporters: ['mocha'],

		browsers: ['PhantomJS'],

		files: [
			'./node_modules/es6-promise/dist/es6-promise.js',
			'test/browser/**/*.js',
			'test/actions/**/*.js',
			'test/reducers/**/*.js',
		],

		preprocessors: {
			'test/**/*.js': ['webpack'],
			'src/**/*.js': ['webpack'],
			'**/*.js': ['sourcemap']
		},

		webpack: webpack,
		webpackMiddleware: { noInfo: true }
	});
};
