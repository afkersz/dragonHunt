const navigateBiome = {
    alphine(){
        return cy.visit(`https://dragcave.net/locations/5`)
    },
    coast(){
        return cy.get('https://dragcave.net/locations/1')
    },
    desert(){
        return cy.get('https://dragcave.net/locations/2')
    },
    forest(){
        return cy.get('https://dragcave.net/locations/3')
    },
    jungle(){
        return cy.get('https://dragcave.net/locations/4')
    },
    volcano(){
        return cy.get('https://dragcave.net/locations/6')
    },

};

export {navigateBiome};