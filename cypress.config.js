import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    CURRENT_TIME: "123456789"
  },

  pageLoadTimeout: 120000, // Increase the timeout value

  e2e: {
    baseUrl: 'https://dragcave.net/',
    specPattern: 'cypress/e2e',
    blockHosts: [
      "*.google-analytics.com",
      "pagead2.googlesyndication.com",
      "googleads.g.doubleclick.net",
      "fastlane.rubiconproject.com",
      "securepubads.g.doubleclick.net",
      "aax.amazon-adsystem.com",
      "gum.criteo.com",
      "static.criteo.net",
      "api.btloader.com",
      "c.amazon-adsystem.com",
      "hbopenbid.pubmatic.com",
      "btlr.sharethrough.com",
      "hb-api.omnitagjs.com",
      "prebid.media.net"
    ],
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    video: false,
  },

})