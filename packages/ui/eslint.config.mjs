import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
// export default config;

module.exports = {
    root: true,
    extends: ["@repo/eslint-config/react-internal.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.lint.json",
      tsconfigRootDir: __dirname,
    },
  };