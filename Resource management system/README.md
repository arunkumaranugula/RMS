# Resource Management System

This project is a React application bootstrapped with Vite.js, using Material-UI (MUI) for UI components and Redux for state management.

## Features
- Signup and Login pages with validation
- Side menu bar with "Member Info" and "Member List"
- Top bar with Login and Profile links
- Member Info and Member List views
- User info stored in a JSON file on signup
- Member list rendered from JSON file

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
- `src/components` - Reusable UI components
- `src/pages` - Page components (Login, Signup, etc.)
- `src/redux` - Redux store and slices
- `src/data` - JSON data files
- `src/types` - TypeScript types

## Customization
Update the code in `src/` as needed to extend functionality.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
