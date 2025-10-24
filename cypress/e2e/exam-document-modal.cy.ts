describe('ExamDocumentModal - Dropzone Deadline Behavior', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the page to load
    cy.wait(500);
  });

  it('should display upload section with dropzone for assessments with future deadline', () => {
    // Navigate to home page which should have semester overview
    cy.visit('/');

    // Click on a semester (e.g., Semester 3 which has assessments with future deadlines)
    // This depends on the actual UI structure
    cy.contains('Semester 3').click({ force: true });

    // Wait for module details to load
    cy.wait(500);

    // Click on a "Dokumente" button for an assessment with a future deadline
    // The exact selector will depend on the UI implementation
    cy.get('button').contains('Dokumente').first().click({ force: true });

    // Wait for modal to open
    cy.contains('Prüfungsdokumente', { timeout: 10000 }).should('be.visible');

    // Check that the upload section is visible (which contains the dropzone)
    cy.contains('Dateien hochladen').should('be.visible');

    // The dropzone should be visible (look for common dropzone elements)
    // Note: The exact selector depends on how the Dropzone component renders
    cy.get('input[type="file"]').should('exist');
  });

  it('should hide dropzone section for assessments with past deadline', () => {
    // This test uses mock data to simulate a past deadline
    // We'll intercept the assessment data or use a test that modifies the deadline

    cy.visit('/');

    // For this test, we need to modify the mock data or use cy.clock() to simulate time
    // Let's use cy.clock() to move time forward past the deadline
    const futureDate = new Date('2026-01-01').getTime();
    cy.clock(futureDate);

    // Click on a semester
    cy.contains('Semester 3').click({ force: true });
    cy.wait(500);

    // Click on a "Dokumente" button
    cy.get('button').contains('Dokumente').first().click({ force: true });

    // Wait for modal to open
    cy.contains('Prüfungsdokumente', { timeout: 10000 }).should('be.visible');

    // Check that the deadline warning is displayed
    cy.contains('Abgabefrist ist abgelaufen').should('be.visible');

    // The dropzone input should NOT exist
    cy.get('input[type="file"]').should('not.exist');

    // The upload files section might still have the title, but no dropzone
    cy.contains('Dateien hochladen').should('be.visible');
  });

  it('should verify upload button is disabled when deadline has passed', () => {
    cy.visit('/');

    // Set time to future to simulate past deadline
    const futureDate = new Date('2026-01-01').getTime();
    cy.clock(futureDate);

    cy.contains('Semester 3').click({ force: true });
    cy.wait(500);

    cy.get('button').contains('Dokumente').first().click({ force: true });

    // Modal should open
    cy.contains('Prüfungsdokumente', { timeout: 10000 }).should('be.visible');

    // Upload button should not exist or should be disabled
    // Since we're hiding the entire dropzone section, the upload button won't exist either
    cy.get('button').contains('Hochladen').should('not.exist');
  });
});
