import { fillOutLoginAndPassword } from "../support/utils/dragoncave/login_flow/login_util"
import { executeEggSearch} from "../support/utils/dragoncave/egg_flow/egg_util"


describe('Given user wants successfully find specific eggs in each biome', {
}, () => {
  context('When user has the correct credentials for DragonCave', () => {
    before('Then user navigates to DragonCave to lgoin', () => {
      fillOutLoginAndPassword();
    });

    it('And user navigates to dragon page', () => {
      cy.visit('/dragons/1,1,0');
    });

    it('And should verify that there are avaliable egg slots', () => {
      executeEggSearch();
    });

  });
});


