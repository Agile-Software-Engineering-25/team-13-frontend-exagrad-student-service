describe('Weather Page', () => {
  it('should load the weather page', () => {
    cy.visit('/weather');
    cy.contains('Wetter'); // change text as needed
  });

});
