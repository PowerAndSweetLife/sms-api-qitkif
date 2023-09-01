module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
