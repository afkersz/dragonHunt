import { fillOutLoginAndPassword } from "../support/utils/dragoncave/login_flow/login_util"
import { navigateBiome } from "cypress/support/pages/navigateBiome"
import { checkTestEggDescriptionFirstEgg, storeAllEggDescriptions } from "../support/utils/dragoncave/egg_flow/egg_util"

describe('User wants to be able to navigate and to login into Dragon Cave succesfully', () => {
  context(`Given that we know our credentials for DragonCave`, () => {
    before('Navigates to Dragoncave and Login', () => {
      cy.visit('/');
      fillOutLoginAndPassword();
    });

    it('Navigates to Alpine and select First Egg Image', () => {
      navigateBiome.alphine();
      storeAllEggDescriptions();
      //checkTestEggDescriptionFirstEgg();
      //cy.get('.eggs');
    });
  });
});
