describe('who user information', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/profile/:id');
  });
  it('should diplay user profile on profile page', function () {
    // Select element and alias them
    cy.get('input[name="firstName"]').as('firstnameText');
    cy.get('input[name="lastName"]').as('lastnameText');
    cy.get('select[name=track_id').as('track_id');
    cy.get('input[name="cohort"]').as('cohort');
    cy.get('[data-cy=editProfile]').as('editProfile');
    // interact with element
    cy.get('@firstnameText').type('test1');
    cy.get('@lastnameText').type('user1');
    cy.get('@track_id').select('WEB');
    cy.get('@cohort').type('FT-100');
    cy.get('@editProfile').click();
  });
});
