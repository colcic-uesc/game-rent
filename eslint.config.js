import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
   { files: ["**/*.{js,mjs,cjs}"] },
   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
   {
      files: ["**/*.{js,mjs,cjs}"],
      plugins: { js },
      extends: ["js/recommended"],
   },
   {
      rules: {
         "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
         "no-undef": "error",
         "arrow-body-style": ["error", "as-needed"],
         "no-console": ["error", { allow: ["warn", "error", "log"] }],
         "no-alert": "warn",
         "no-duplicate-imports": "error",
         "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
         "no-trailing-spaces": "error",
         "prefer-const": "warn",
         camelcase: "off",
         "no-param-reassign": "off",
      },
   },
]);
