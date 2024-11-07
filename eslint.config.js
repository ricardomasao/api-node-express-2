import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,  // Adicionando também os globais do Node.js
        es6: true         // No ES6, você pode configurar recursos de linguagem diretamente se necessário
      },
    },
    rules: {
      quotes: ["error", "double"],
      indent: ["error", 2],
    },
  },
  pluginJs.configs.recommended,
];