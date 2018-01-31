module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
    },
    "parser": "babel-eslint",
    "rules": {
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
          }],
    },
};
