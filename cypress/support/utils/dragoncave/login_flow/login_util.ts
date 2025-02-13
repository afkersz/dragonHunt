import { homePage } from '../../../pages/homePage';
import moment from 'moment'


export function fillOutLoginAndPassword() {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  cy.visit('/');
  cy.clearCookies();

  cy.get('body').then(($body) => {
      if ($body.find('._p_3').length > 0) {
          cy.get('._p_3').invoke('text').then((text) => {
              if (text.includes('Logged in as')) {
                  cy.log('User already logged in. Logging out first...');
                  cy.get('[href="/logout"]').click();
                  cy.visit('/');
              }
          });
      }

      homePage.inputUserName().type(username);
      homePage.inputPassword().type(password);
      homePage.selectLogin().click();
  });
}


export function checkTimeAndLogin() {
  const currentTime = Cypress.env('CIRCLECI') ? Date.now() : moment().valueOf();
  const displayCurrentTime = Cypress.env('CIRCLECI') ? Date.now() : moment().format('LT').valueOf();
  cy.log(`Current Time: ${displayCurrentTime}`);

  const nextInterval = Math.ceil(currentTime / (5 * 60 * 1000)) * (5 * 60 * 1000);
  const remainingTime = nextInterval - currentTime;

  Cypress.env('remainingTime', remainingTime.toString());

  fillOutLoginAndPassword();
  cy.log(`Waiting for: ${remainingTime}`);
  cy.wait(remainingTime);
}
