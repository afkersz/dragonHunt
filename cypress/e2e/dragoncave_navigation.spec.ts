import { fillOutLoginAndPassword } from "../support/utils/dragoncave/login_flow/login_util"
import navigateBiome from "../../cypress/support/pages/navigateBiome";
import { checkTestEggDescriptionFirstEgg, storeAllEggDescriptions, easyCompareaEgg } from "../support/utils/dragoncave/egg_flow/egg_util"
import * as expectedEggDescription from "../../../dragoncave/cypress/fixtures/all_egg_message.json"

describe('User wants to be able to navigate and login into Dragon Cave successfully', () => {
  context('Given that we know our credentials for DragonCave', () => {
    before('Navigates to DragonCave and Login', () => {
      cy.visit('/');
      cy.wait(100)
      cy.clearCookies()
      cy.reload()
      fillOutLoginAndPassword();


      // Get the current time in milliseconds
      const currentTime = Date.now();

      // Calculate the timestamp for the next 5-minute interval
      const nextInterval = Math.ceil(currentTime / (5 * 60 * 1000)) * (5 * 60 * 1000);

      // Calculate the remaining time until the next interval
      const remainingTime = nextInterval - currentTime;

      // Wait for the remaining time
      cy.wait(remainingTime);

      // Refresh the page
      cy.reload();

      cy.get('div._4h_3 a._4h_4').invoke('text').then((timestamp) => {
        const trimmedTimestamp = timestamp.trim(); // Remove leading/trailing whitespace
        const inBrowserTime = trimmedTimestamp.substring(trimmedTimestamp.indexOf(' ') + 1); // Extract the time portion

        // Double check with the in-browser timestamp
        cy.window().then((win) => {
          const inBrowserTime = win.Date.now();
          expect(inBrowserTime).to.be.closeTo(nextInterval, 1000000); // Adjust the tolerance as needed
        });
      });


    });

    it('should navigate to different biomes, verify the specific description, and navigate to the next biome if it fails', () => {
      const biomes = ['alpine', 'coast', 'desert', 'forest', 'jungle', 'volcano'];
      const expectedDescription = 'Mana flows like a current through this glassy egg.';
      //const expectedDescription = 'This blue and bronze egg piques your curiosity.';
      let descriptionFound = false;

      cy.wrap(biomes).each((biome) => {
        navigateBiome[biome](); // Navigate to the current biome
        cy.get('.eggs span[aria-hidden="true"]').each(($span) => {
          const currentDescription = $span.text().trim();

          if (currentDescription === expectedDescription) {
            // The specific description is found, perform any necessary assertions or actions
            // For example, you can assert its visibility:
            cy.wrap($span)
              .should('be.visible')
              .siblings('a') // Select the sibling 'a' element
              .click(); // Click on the image linking to the matching description

            descriptionFound = true;
            return false; // Exit the loop since the description is found
          }
        }).then(() => {
          if (!descriptionFound) {
            // The specific description is not found, navigate to the next biome
            cy.log(`The specific description was not found in the ${biome} biome.`);
            // Perform any necessary assertions or actions specific to the current biome
          }
        });
      }).then(() => {
        // After going through all the biomes, check if the description was found
        if (!descriptionFound) {
          // The specific description was not found in any biome, force the test to fail
          expect(descriptionFound).to.equal(true); // Force the test to fail
        }
      });
    });
  });
});


