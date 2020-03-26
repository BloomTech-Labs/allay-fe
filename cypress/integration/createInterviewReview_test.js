describe('Creates a new interview review', function() {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit('http://localhost:3000');
  });
  it('should navigate to add review form after logging in', function() {
    // select elements and alias them
    cy.get('input[name="username"]').as('usernameText');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('[data-cy=loginSubmit]').as('loginSubmit');
    // interact with elements
    cy.get('@usernameText').type('testuser1');
    cy.get('@passwordText').type('12345678');
    cy.get('@loginSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
    // select elements and alias them
    cy.get('[data-cy=addReviewButton]').as('addReviewButton');
    // interact with elements
    cy.get('@addReviewButton').click();
    // wait until pushed to dashboard/add-review
    cy.url().should('include', '/add-review');
    // select elements and alias them
    cy.wait(1000);
    cy.get('[data-cy=interviewReviewClick]').as('interviewReviewClick');
    // interact with elements
    cy.get('@interviewReviewClick').click();
  });
  it('should complete and submit interview review', function() {
    cy.wait(5000);
    // select elements and alias them
    cy.get('input[name="company_name"]').as('company_nameText');
    cy.get('input[name="job_title"]').as('job_titleText');
    cy.get('input[name="Company Headquarters"]').as('companyHeadquartersText');
    cy.get('select[name=interview_rounds').as('interview_rounds');
    // cy.get('input[type=checkbox').as('interview_rounds');
    cy.get('input[name="comment"]').as('commentText');
    cy.get('select[name=difficulty_rating').as('difficulty_rating');
    cy.get('input[name="salary"]').as('salary');
    cy.get('[data-cy=interviewReviewSubmit]').as('interviewReviewSubmit');

    // interact with elements
    cy.get('@company_name').type('Amazon Web Services');
    cy.get('@job_title').type('Senior Web Developer');
    cy.get('@companyHeadquartersText').type('Denver, CO');
    cy.get('@interview_rounds').select('3');
    cy.get('[type="checkbox"]').check([
      'Phone interview',
      'Online coding tests'
    ]);
    cy.get('@commentText').type(
      'There were many questions asked. We talked about computer stuff, food and long walks on the beach at sunset. I was pretty sweet.'
    );
    cy.get('@difficulty_rating').select('Average');
    cy.get('@offer_status_id').select('Average');
    cy.get('[type="checkbox"]').check(['Accepted']);
    cy.get('@salary').type('98000');
    cy.get('#stars')
      .scrollTo('center')
      .click();
    cy.get('@interviewReviewSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
});
