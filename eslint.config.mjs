import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginImport from "eslint-plugin-import"; // Example for import plugin

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    plugins: {
      import: pluginImport, // Adding import plugin
    },
    rules: {
      "import/no-unresolved": ["error"], // Ensure imports point to a file/module that can be resolved
      "import/named": ["error"], // Ensure named imports correspond to a named export in the remote file
      "indent": ["error", 2], // 2-space indentation
      "linebreak-style": ["error", "unix"], // Unix linebreaks
      "quotes": ["error", "single"], // Single quotes for strings
      "semi": ["error", "always"], // Semicolons at the end of statements
      "no-unused-vars": ["warn"], // Warning for unused variables
      "no-console": "off", // Allow console statements
      "react/prop-types": "off", // Disable prop-types rule for React
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type in TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off", // Allow implicit return types
      "no-trailing-spaces": ["error"], // Disallow trailing spaces at the end of lines
      "eol-last": ["error", "always"], // Enforce newline at the end of files
      "react/jsx-uses-react": "off", // React 17+ does not require 'React' in scope
      "react/react-in-jsx-scope": "off", // React 17+ does not require 'React' in scope
      "arrow-spacing": ["error", { "before": true, "after": true }], // Enforce consistent spacing before and after the arrow in arrow functions
    },
  },
];
