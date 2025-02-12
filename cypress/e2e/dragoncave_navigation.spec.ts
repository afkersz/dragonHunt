import { fillOutLoginAndPassword } from "../support/utils/dragoncave/login_flow/login_util"


describe('Given User wants to be able to navigate and able to find specific eggs into Dragon Cave', {
}, () => {
  context('When that we want to verify our credentials for DragonCave', () => {
    it('Then user navigates to DragonCave and Logs in', () => {
      fillOutLoginAndPassword();
    });
  });
  
});



