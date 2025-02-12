import { checkTimeAndLogin, fillOutLoginAndPassword } from "../support/utils/dragoncave/login_flow/login_util"
import { eggSearchInEachBiome } from "../support/utils/dragoncave/egg_flow/egg_util"


describe('Given User wants to be able to navigate and login into Dragon Cave successfully', {
}, () => {
  context('When that we want to verify our credentials for DragonCave', () => {
    before('Then user navigates to DragonCave and Logs in', () => {
      //checkTimeAndLogin();
      fillOutLoginAndPassword();
    });

    it('and should navigate to each biome and looks for specific eggs', () => {
      eggSearchInEachBiome();
    });

  });
});


