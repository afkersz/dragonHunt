import { fillOutLoginAndPassword } from "../support/utils/dragoncave/login_flow/login_util"
import { executeEggSearch} from "../support/utils/dragoncave/egg_flow/egg_util"


describe('Given user wants successfully find specific eggs in each biome', {
}, () => {
  context('When user has the correct credentials for DragonCave', () => {
    before('User navigates to DragonCave to login', () => {
      fillOutLoginAndPassword();
    });

    it('Then search for specific eggs in each biome', () => {
      executeEggSearch();
    });

  });
});


