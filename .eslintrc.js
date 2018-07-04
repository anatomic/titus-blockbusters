module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [ "react" ],
  "rules": {
    "eqeqeq": [ "error", "always" ],
    "no-else-return": [ "error" ],
    "no-empty-function": [ "error" ],
    "no-lone-blocks": [ "error" ],
    "no-multi-assign": [ "error" ],
    "no-new": [ "error" ],
    "no-new-func": [ "error" ],
    "no-param-reassign": [ "error" ],
    "no-return-assign": [ "error" ],
    "no-self-compare": [ "error" ],
    "no-void": [ "error" ],
    "no-with": [ "error" ],
    "no-useless-return": [ "error" ],
    "yoda": [ "error" ]
  }
};