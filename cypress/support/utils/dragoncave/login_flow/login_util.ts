import * as data from '../../../../fixtures/common_data.json';
import {homePage} from '../../../pages/homePage';

export function fillOutLoginAndPassword() {
    const username = data.Data.account_details.username;
    const { password } = data.Data.account_details;

    homePage.inputUserName().type(username);
    homePage.inputPassword().type(password);
    homePage.selectLogin().click();
    
  }