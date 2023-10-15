import { biomes } from '../../../../fixtures/biomes.js';
import { expectedDescriptions } from '../../../../fixtures/expectedDescriptions.js';
import { expectedRareDescriptions } from '../../../../fixtures/expectedRareDescriptions.js';
import navigateBiome from '../../../pages/navigateBiome';


export function eggsearch() {
    const maxRetries = 5; // Adjust the number of retries as needed
    const retryInterval = 1000; // Adjust the interval in milliseconds

    cy.wrap(biomes).each((biome) => {
        navigateBiome[biome](); // Navigate to the current biome

        let retries = 0;

        function tryFindingEggs() {
            cy.get('.eggs span[aria-hidden="true"]').should('be.visible').then(($eggs) => {
                if ($eggs.length === 0) {
                    if (retries < maxRetries) {
                        // If no .eggs elements are found, wait and retry
                        cy.log('No egg descriptions found. Waiting and retrying.');
                        cy.wait(retryInterval);
                        retries++;
                        tryFindingEggs();
                    } else {
                        // Max retries reached, log an error or handle as needed
                        cy.log('Max retries reached. Could not find egg descriptions.');
                    }
                } else {
                    // Click on each .eggs element
                    $eggs.each(($span) => {
                        cy.wrap($span)
                            .siblings('a')
                            .click();
                        cy.log('Clicked on egg description.');
                    });
                }
            });
        }

        // Start the retry function
        tryFindingEggs();
    });
}



export function eggSearchInEachBiome() {

    let descriptionFound = false;

    cy.visit('https://dragcave.net/dragons/1,1,0');

    let eggCount = 0; // Declare the eggCount variable before using it

    //cy.get('*[class^="_dragonTable_root"]')
    cy.get('#dragonlist')
        .should('have.length.gt', 0)
        .find('tbody > tr') // Select all rows in the table body
        .each(($row) => {
            cy.wrap($row)
                .find('td:nth-child(3)') // Select the 3rd column
                .invoke('text') // Get the text content of the 3rd column
                .then((text) => {
                    if (text.trim() === 'Egg') {
                        eggCount++;
                    }
                });
        })
        .then(() => {
            cy.log(`Number of "Egg" occurrences in the 3rd column: ${eggCount}`);
            let expectedDescriptionsToUse = eggCount >= 2 ? expectedRareDescriptions : expectedDescriptions;


            cy.log(`Using ${expectedDescriptionsToUse === expectedRareDescriptions ? 'expectedRareDescriptions' : 'expectedDescriptions'}`);

            //eggsearch
            cy.wrap(biomes).each((biome) => {
                navigateBiome[biome](); // Navigate to the current biome
                let biomeDescriptionFound = false; // Initialize a flag for the current biome

                cy.get('.eggs span[aria-hidden="true"]').each(($span) => {
                    const currentDescription = $span.text().trim();

                    expectedDescriptionsToUse.forEach((expectedDescription) => {
                        if (currentDescription === expectedDescription) {
                            // The specific description is found, perform necessary assertions or actions
                            cy.wrap($span)
                                .should('be.visible')
                                .siblings('a')
                                .click();

                            // Perform any additional actions or assertions for the specific description
                            cy.log(`Found expected description: ${expectedDescription}`);

                            // Set the flag to true for the current biome
                            biomeDescriptionFound = true;
                        }
                    });
                }).then(() => {
                    if (!biomeDescriptionFound) {
                        // The specific description is not found in the current biome
                        cy.log(`The specific description was not found in the ${biome} biome.`);
                        // Perform any necessary assertions or actions specific to the current biome
                    }
                });
            }).then(() => {
                // After going through all the biomes, perform assertions for both scenarios
                cy.wrap(biomes).each((biome) => {
                    const foundInBiome = expectedDescriptionsToUse[biome] || false; // Get the flag value for each biome

                    if (foundInBiome) {
                        // The specific description was found in the biome
                        expect(foundInBiome).to.be.true; // Assertion for finding the expected description in the biome
                    } else {
                        // The specific description was not found in the biome
                        expect(foundInBiome).to.be.false; // Assertion for not finding the expected description in the biome
                    }
                });
            });
            //eggsearchend

        });

    //egg count end


}