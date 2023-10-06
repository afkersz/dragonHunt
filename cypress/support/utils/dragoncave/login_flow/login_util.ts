import * as data from '../../../../fixtures/common_data.json';
import { homePage } from '../../../pages/homePage';
import moment from 'moment'

export function fillOutLoginAndPassword() {

  const username = data.Data.account_details.username;
  const { password } = data.Data.account_details;

  cy.visit('/');
  cy.clearCookies();

  homePage.inputUserName().type(username);
  homePage.inputPassword().type(password);
  homePage.selectLogin().click();

}

export function checkTimeAndLogin() {
  const currentTime = Cypress.env('CIRCLECI') ? Date.now() : moment().valueOf();
  cy.log(`Current Time: ${currentTime}`);

  const nextInterval = Math.ceil(currentTime / (5 * 60 * 1000)) * (5 * 60 * 1000);
  const remainingTime = nextInterval - currentTime;

  Cypress.env('remainingTime', remainingTime.toString());

  fillOutLoginAndPassword();

  // cy.wait(remainingTime); add
}
