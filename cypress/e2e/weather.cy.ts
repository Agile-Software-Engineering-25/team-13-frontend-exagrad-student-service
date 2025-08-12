describe('Weather Page', () => {
  it('should load the weather page', () => {
    cy.visit('/weather');
    cy.contains('Wetter'); // change text as needed
  });
  it('should display the current temperature', () => {
    cy.visit('/weather');

    cy.get('#root > div > div > button').click();
    cy.wait('@getCurrentWeather');

    cy.get('p.MuiTypography-root:nth-child(5)')
      .should('exist')
      .should('contain.text', '20.2 °C'); // change selector as needed
  });
});
