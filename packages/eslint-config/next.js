// packages/eslint-config/next.js
import base from "./base.js";
import next from "eslint-config-next";

export default [
  ...base,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  ...next,
];
