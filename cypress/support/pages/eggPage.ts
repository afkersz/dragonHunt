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

export { elCommon };