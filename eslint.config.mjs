import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ["docs/**", "notes/**", "content/**", "public/**", ".next/**"],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
