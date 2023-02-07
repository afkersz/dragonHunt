import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://dragcave.net/',
    specPattern: 'cypress/e2e',
  },
})