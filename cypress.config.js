import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://dragcave.net/',
    specPattern: 'cypress/e2e',
    blockHosts: ["*.google-analytics.com", "pagead2.googlesyndication.com*", "googleads.g.doubleclick.net*"],
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
  },

})