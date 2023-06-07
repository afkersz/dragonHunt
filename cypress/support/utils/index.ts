Cypress.on('window:before:load', (win) => {
    win.Element.prototype.animate = null;
});