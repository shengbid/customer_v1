module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ['react-hooks'],
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/array-type': 'off',
  },
}
