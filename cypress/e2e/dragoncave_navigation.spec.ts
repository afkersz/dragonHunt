import { checkTimeAndLogin } from "../support/utils/dragoncave/login_flow/login_util"
import { eggSearchInEachBiome } from "../support/utils/dragoncave/egg_flow/egg_util"


describe('User wants to be able to navigate and login into Dragon Cave successfully', {
}, () => {
  context('Given that we know our credentials for DragonCave', () => {
    beforeEach('Navigates to DragonCave and Login', () => {
      checkTimeAndLogin();
    });

    it('should navigate to different biomes, verify the specific description, and navigate to the next biome if it fails', () => {
      eggSearchInEachBiome();
    });
  });
});


