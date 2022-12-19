module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/function-component-definition": "off",
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        "react/no-unused-prop-types": "off",
        "implicit-arrow-linebreak": "off",
        "react/prop-types": "off",
        "no-nested-ternary": "off",
        "indent": [
            "error",
            2
        ],
        "quotes": [
            2,
            "double",
            {
                "avoidEscape": true
            }
        ],
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "react/jsx-filename-extension": [
            2,
            {
                "extensions": [
                    ".js", ".jsx", ".ts", ".tsx"
                ]
            }
        ],
    },
}
