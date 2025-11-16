describe.skip('Exagrad Student Home Page', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('Semester');
  });
});
