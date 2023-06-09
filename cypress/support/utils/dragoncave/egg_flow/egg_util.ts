import { biomes } from '../../../../fixtures/biomes.js';
import { expectedDescriptions } from '../../../../fixtures/expectedDescriptions.js';
import navigateBiome from '../../../pages/navigateBiome';

export function eggSearchInEachBiome() {
    let descriptionFound = false;

    cy.wrap(biomes).each((biome) => {
        navigateBiome[biome](); // Navigate to the current biome
        let biomeDescriptionFound = false; // Initialize a flag for the current biome

        cy.get('.eggs span[aria-hidden="true"]').each(($span) => {
            const currentDescription = $span.text().trim();

            expectedDescriptions.forEach((expectedDescription) => {
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
            const foundInBiome = expectedDescriptions[biome] || false; // Get the flag value for each biome

            if (foundInBiome) {
                // The specific description was found in the biome
                expect(foundInBiome).to.be.true; // Assertion for finding the expected description in the biome
            } else {
                // The specific description was not found in the biome
                expect(foundInBiome).to.be.false; // Assertion for not finding the expected description in the biome
            }
        });
    });
}
