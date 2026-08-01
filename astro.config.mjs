import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://votre-domaine.exemple',
  build: {
    format: 'directory' // URLs propres: /categorie/question/ au lieu de /categorie/question.html
  }
});
