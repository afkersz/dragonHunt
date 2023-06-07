import { biomes } from '../../../../fixtures/biomes.js';
import { expectedDescriptions } from '../../../../fixtures/expectedDescriptions.js';
import navigateBiome from '../../../pages/navigateBiome';

export function eggSearchInEachBiome() {
    let descriptionFound = false;

    cy.wrap(biomes).each((biome) => {
        navigateBiome[biome](); // Navigate to the current biome
        cy.get('.eggs span[aria-hidden="true"]').each(($span) => {
            const currentDescription = $span.text().trim();

            expectedDescriptions.forEach((expectedDescription) => {
                if (currentDescription === expectedDescription) {
                    // The specific description is found, perform any necessary assertions or actions
                    // For example, you can assert its visibility:
                    cy.wrap($span)
                        .should('be.visible')
                        .siblings('a') // Select the sibling 'a' element
                        .click(); // Click on the image linking to the matching description

                    // Perform any additional actions or assertions for the specific description
                    cy.log(`Found expected description: ${expectedDescription.description}`);

                    descriptionFound = true;
                    return false; // Exit the loop since the description is found
                }
            });
        }).then(() => {
            if (!descriptionFound) {
                // The specific description is not found, navigate to the next biome
                cy.log(`The specific description was not found in the ${biome} biome.`);
                // Perform any necessary assertions or actions specific to the current biome
            }
        });
    }).then(() => {
        // After going through all the biomes, check if the description was found
        if (!descriptionFound) {
            // The specific description was not found in any biome, force the test to fail
            expect(descriptionFound).to.equal(true); // Force the test to fail
        }
    });
}
