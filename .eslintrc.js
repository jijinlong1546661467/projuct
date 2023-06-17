/* eslint-disable no-tabs */
module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
		es6: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 2023,
		sourceType: 'module',
	},
	plugins: [
		'vue',
	],
	rules: {
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'no-console': 'off',
		'no-debugger': 'off',
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'] }],
	},
};
