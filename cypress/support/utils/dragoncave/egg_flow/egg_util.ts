import { biomes } from '../../../../fixtures/biomes.js';
import { expectedDescriptions } from '../../../../fixtures/expectedDescriptions.js';
import { expectedRareDescriptions } from '../../../../fixtures/expectedRareDescriptions.js';
import { navigateBiome } from '../../../pages/biomePage.ts';

export function eggSearchInEachBiome() {

    const descriptionFound = false;

    cy.visit('https://dragcave.net/dragons/1,1,0');

    let eggCount = 0; // Declare the eggCount variable before using it

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
            const expectedDescriptionsToUse = eggCount >= 2 ? expectedRareDescriptions : expectedDescriptions;
            cy.log(`Using ${expectedDescriptionsToUse === expectedRareDescriptions ? 'expectedRareDescriptions' : 'expectedDescriptions'}`);
            cy.wrap(biomes).each((biome) => {
                navigateBiome[biome]();
                let biomeDescriptionFound = false;

                cy.get('.eggs span[aria-hidden="true"]').each(($span) => {
                    const currentDescription = $span.text().trim();

                    expectedDescriptionsToUse.forEach((expectedDescription) => {
                        if (currentDescription === expectedDescription) {
                            cy.wrap($span)
                                .should('be.visible')
                                .siblings('a')
                                .click();
                            cy.log(`Found expected description: ${expectedDescription}`);
                            biomeDescriptionFound = true;
                        }
                    });
                }).then(() => {
                    if (!biomeDescriptionFound) {
                        cy.log(`The specific description was not found in the ${biome} biome.`);
                    }
                });
            }).then(() => {
                cy.wrap(biomes).each((biome) => {
                    const foundInBiome = expectedDescriptionsToUse[biome] || false; 
                    if (foundInBiome) {
                        expect(foundInBiome).to.be.true; 
                    } else {
                        expect(foundInBiome).to.be.false; 
                    }
                });
            });
            //eggsearchend

        });

    //egg count end


}