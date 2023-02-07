const elCommon = {
    cardEggs() {
        return cy.get(
            `.eggs`)
    },

    eachEgg() {
        return cy.get(
            cy.get('.eggs >')
        )
    },


};

const eggPage = {
    eggDescriptionFirstEgg() {
        return cy.get('.eggs > :nth-child(1)')
    },
    eggFirstIcon() {
        return cy.get('.eggs > :nth-child(1) > a > img')
    },

};

export { eggPage, elCommon };