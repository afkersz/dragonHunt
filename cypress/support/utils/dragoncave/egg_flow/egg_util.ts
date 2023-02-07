import * as eggMessage from "../../../../fixtures/egg_message.json";
import { eggPage, elCommon } from "../../../pages/eggPage";

const eggOne = eggMessage.Message.testegg.egg1;

const checkTestEggDescriptionFirstEgg = () => {
    eggPage.eggDescriptionFirstEgg().contains(eggOne);
    eggPage.eggFirstIcon().click();
};

const storeAllEggDescriptions = () => {
    elCommon
        .cardEggs().each((el) => {
            const tempEggDescriptionArray: string[] = [];
            cy.wrap(el)
                .invoke('text')
                .as('eggDescription')
                .then((text) => {
                    const eggDescrip = text.split(".");
                    cy.log(`egg Description: ${eggDescrip}`);
                    tempEggDescriptionArray.push(eggDescrip);
                    cy.wrap(tempEggDescriptionArray).as(`tempEggDescriptionArray`);
                });
            cy.get(`@tempEggDescriptionArray`).then((tempEggDescriptionArray) => {
                tempEggDescriptionArray.forEach(element => {
                    cy.log(JSON.stringify(element[0]));
                    cy.log(JSON.stringify(element[1]));
                    cy.log(JSON.stringify(element[2]));
                });

            })


        });
};



export { checkTestEggDescriptionFirstEgg, storeAllEggDescriptions };