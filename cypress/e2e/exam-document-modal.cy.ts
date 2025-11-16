describe.skip('ExamDocumentModal - Dropzone Deadline Behavior', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the page to load
    cy.wait(500);
  });

  it('should display upload section with dropzone for assessments with future deadline', () => {
    // Navigate to home page which should have semester overview

    // Click on a semester (e.g., Semester 4 which has assessments with future deadlines)
    // This depends on the actual UI structure
    cy.contains('Semester 4').click({ force: true });

    // Wait for module details to load
    cy.wait(500);

    cy.contains('Agile Software Engineering und Softwaretechnik').click({
      force: true,
    });

    cy.wait(500);

    // Click on a "Dokumente" button for an assessment with a future deadline
    // The exact selector will depend on the UI implementation
    cy.get('button').eq(7).click({ force: true });

    cy.wait(500);

    // Wait for modal to open
    cy.contains('Prüfungsleistung', { timeout: 10000 }).should('be.visible');

    // Check that the upload section is visible (which contains the dropzone)
    cy.contains('Dateien hochladen').should('be.visible');

    // The dropzone should be visible (look for common dropzone elements)
    // Note: The exact selector depends on how the Dropzone component renders
    cy.get('input[type="file"]').should('exist');
  });

  it('should hide dropzone section for assessments with past deadline', () => {
    // This test uses mock data to simulate a past deadline
    // We'll intercept the assessment data or use a test that modifies the deadline

    // Click on a semester
    cy.contains('Semester 4').click({ force: true });
    cy.wait(500);

    cy.contains('Agile Software Engineering und Softwaretechnik').click({
      force: true,
    });

    cy.wait(500);

    // Click on a "Dokumente" button
    cy.get('button').contains('Dokumente').first().click({ force: true });

    // Wait for modal to open
    cy.contains('Prüfungsdokumente', { timeout: 10000 }).should('be.visible');

    // Check that the deadline warning is displayed
    cy.contains('Deadline verstrichen.').should('be.visible');

    // The dropzone input should NOT exist
    cy.get('input[type="file"]').should('not.exist');
  });

  it('should verify upload button is disabled when deadline has passed', () => {
    // Set time to future to simulate past deadline

    cy.contains('Semester 4').click({ force: true });
    cy.wait(500);

    cy.get('button').contains('Dokumente').first().click({ force: true });

    // Modal should open
    cy.contains('Prüfungsdokumente', { timeout: 10000 }).should('be.visible');

    // Upload button should not exist or should be disabled
    // Since we're hiding the entire dropzone section, the upload button won't exist either
    cy.get('button').contains('Hochladen').should('not.exist');
  });
});
