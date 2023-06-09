import * as data from '../../../../fixtures/common_data.json';
import { homePage } from '../../../pages/homePage';

export function fillOutLoginAndPassword() {
  const username = data.Data.account_details.username;
  const { password } = data.Data.account_details;

  homePage.inputUserName().type(username);
  homePage.inputPassword().type(password);
  homePage.selectLogin().click();

}

export function checkTimeAndRefresh() {

  // Get the current time in milliseconds
  const currentTime = parseFloat(Cypress.env('CURRENT_TIME')); // Convert to a float

  // Calculate the timestamp for the next 5-minute interval
  const nextInterval = Math.ceil(currentTime / (5 * 60 * 1000)) * (5 * 60 * 1000);

  // Calculate the remaining time until the next interval
  const remainingTime = nextInterval - currentTime;

  // Wait for the remaining time
  cy.wait(remainingTime);

  // Refresh the page
  cy.reload();

  cy.get('div._4h_3 a._4h_4').invoke('text').then((timestamp) => {
    const trimmedTimestamp = timestamp.trim(); // Remove leading/trailing whitespace
    const inBrowserTime = trimmedTimestamp.substring(trimmedTimestamp.indexOf(' ') + 1); // Extract the time portion

    // Double check with the in-browser timestamp
    cy.window().then((win) => {
      const inBrowserTime = win.Date.now();
      expect(inBrowserTime).to.be.closeTo(nextInterval, 1000000); // Adjust the tolerance as needed
    });
  });
}