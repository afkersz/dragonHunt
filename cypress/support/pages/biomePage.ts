const navigateBiome = {
    coast() {
        return cy.visit('https://dragcave.net/locations/1');
    },
    desert() {
        return cy.visit('https://dragcave.net/locations/2');
    },
    alpine() {
        return cy.visit('https://dragcave.net/locations/5');
    },
    forest() {
        return cy.visit('https://dragcave.net/locations/3');
    },
    jungle() {
        return cy.visit('https://dragcave.net/locations/4');
    },
    volcano() {
        return cy.visit('https://dragcave.net/locations/6');
    },
};

export { navigateBiome };
