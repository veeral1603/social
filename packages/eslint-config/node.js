// packages/eslint-config/node.js
import base from "./base.js";

export default [
  ...base,
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },
];
