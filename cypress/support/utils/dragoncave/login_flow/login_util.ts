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
  cy.visit('https://www.timeanddate.com/worldclock/canada/toronto')
    .get('#ct').invoke('text')
    .then((timestamp) => {
      const currentTime = moment(timestamp, 'h:mm:ss a').valueOf();
      cy.log(`Current Time: ${currentTime}`);

      // Calculate the timestamp for the next 5-minute interval
      const nextInterval = Math.ceil(currentTime / (5 * 60 * 1000)) * (5 * 60 * 1000);

      // Calculate the remaining time until the next interval
      const remainingTime = nextInterval - currentTime;

      // Set the remainingTime as an environment variable
      Cypress.env('remainingTime', remainingTime.toString()); // Convert to string

      fillOutLoginAndPassword();

      // Wait for the remaining time
      cy.wait(remainingTime);

      // Refresh the page
      cy.reload();

      cy.get('a._relicHeader_clock').invoke('text').then((timestamp) => {
        const trimmedTimestamp = timestamp.trim(); // Remove leading/trailing whitespace
        const inBrowserTime = trimmedTimestamp.substring(trimmedTimestamp.indexOf(' ') + 1); // Extract the time portion

        // Double check with the in-browser timestamp
        cy.window().then((win) => {
          const inBrowserTime = win.Date.now();
          expect(inBrowserTime).to.be.closeTo(nextInterval, 1000000); // Adjust the tolerance as needed
        });
      });
    })
}