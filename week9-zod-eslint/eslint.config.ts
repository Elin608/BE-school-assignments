import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    rules: {

      //This rule understands TypeScript better. 
      "@typescript-eslint/no-unused-vars": "error",
      "no-undef": "error",
      curly: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-console": "off", //används för att hitta fel i backend. 
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],

    },
  },
]);
