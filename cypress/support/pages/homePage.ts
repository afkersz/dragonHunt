const homePage = {
    inputUserName() {
        return cy.get('[name="username"]');
    },

    inputPassword() {
        return cy.get('[name="password"]');
    },

    selectLogin() {
        return cy.get('._29_7 > ._5v_f');
    },
};

export { homePage };