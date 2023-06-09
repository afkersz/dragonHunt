const homePage = {
    inputUserName() {
        return cy.get('[name="username"]');
    },

    inputPassword() {
        return cy.get('[name="password"]');
    },

    selectLogin() {
        return cy.get('button[name="submit"]');
    },
};

export { homePage };