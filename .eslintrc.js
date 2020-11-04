module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    jest: true,
    browser: true
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jest'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  rules: {
    'no-console': 2,
    'max-len': ['error', { 'code': 200 }],

    'jest/expect-expect': ['error', { 'assertFunctionNames': ['expect'] }],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 2,

    // note you must disable the base rule as it can report incorrect errors
    'no-undef': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off"
      }
    }
  ],
  parserOptions: {
    project: './tsconfig.json'
  }
}