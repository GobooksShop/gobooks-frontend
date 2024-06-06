module.exports = {
  parser: '@babel/eslint-parser', // Babel을 사용하여 최신 JavaScript 문법을 지원
  extends: [
    'eslint:recommended', // ESLint의 기본 규칙 세트
    'plugin:react/recommended', // 리액트 규칙 세트
    'plugin:react-hooks/recommended', // 리액트 훅 규칙 세트
  ],
  settings: {
    react: {
      version: 'detect', // 자동으로 리액트 버전 감지
    },
  },
  env: {
    browser: true, // 브라우저 전역 변수
    es2021: true, // ES2021 문법 지원
    node: true, // Node.js 전역 변수
  },
  parserOptions: {
    ecmaVersion: 12, // ES12 문법 지원
    sourceType: 'module', // 모듈 시스템 사용 설정
    ecmaFeatures: {
      jsx: true, // JSX 지원
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17+ 자동 import 지원
    'react/prop-types': 'off', // propTypes 사용을 강제하지 않음
    'no-unused-vars': 'warn', // 사용하지 않는 변수 경고
    'react-hooks/rules-of-hooks': 'error', // 훅의 규칙을 강제
    'react-hooks/exhaustive-deps': 'warn', // 훅의 의존성 목록을 철저히 관리
    'no-irregular-whitespace': 'off',
  },
};
