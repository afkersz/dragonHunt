import { biomes } from '../../../../fixtures/biomes.js';
import { expectedDescriptions } from '../../../../fixtures/expectedDescriptions.js';
import { expectedRareDescriptions } from '../../../../fixtures/expectedRareDescriptions.js';
import { navigateBiome } from '../../../pages/biomePage.ts';

export function executeEggSearch() {  
    cy.log('Searching for eggs in biomes...');
    
    cy.wrap(biomes).each((biome) => {
        navigateBiome[biome]();
        let biomeDescriptionFound = false;

        cy.get('.eggs span[aria-hidden="true"]').each(($span) => {
            const currentDescription = $span.text().trim();

            expectedDescriptions.forEach((expectedDescription) => {
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
                cy.log(`No expected eggs found in ${biome}.`);
            }
        });
    });
}
