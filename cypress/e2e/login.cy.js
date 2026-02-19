describe('Login Flow', () => {
  it('should login successfully', () => {

    // Mock POST login
    cy.intercept('POST', '**/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: 'fake-token'
        }
      }
    }).as('loginRequest');

    // Mock GET current user
    cy.intercept('GET', '**/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'E2E User',
            email: 'e2e@test.com'
          }
        }
      }
    }).as('getUser');

    cy.visit('http://localhost:3000/login');

    // Sesuai AuthForm lo
    cy.get('input[type="email"]').type('e2e@test.com');
    cy.get('input[type="password"]').type('123456');

    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@getUser');

    // Pastikan tidak lagi di halaman login
    cy.url().should('not.include', '/login');
  });
});
