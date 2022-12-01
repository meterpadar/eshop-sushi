module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"quotes": ["warn", "double"],
		"semi": ["warn", "always"],
		"indent": ["warn", "tab"],
		"no-multi-spaces": ["warn"],
		"no-unused-vars": ["warn"],
		"react/prop-types": ["warn"]
	}
};
