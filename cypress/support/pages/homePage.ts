const homePage = {
    inputUserName(){
        return cy.get('[name="username"]');
    },

    inputPassword(){
        return cy.get('[name="password"]');
    },

    selectLogin(){
        return cy.get('._1w_7 > ._4o_f');
    },
};

export { homePage };