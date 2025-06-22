describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('[data-testid="login-form"]').should('be.visible')
    cy.get('[data-testid="email-input"]').should('be.visible')
    cy.get('[data-testid="password-input"]').should('be.visible')
    cy.get('[data-testid="submit-button"]').should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="email-error"]').should('be.visible')
    cy.get('[data-testid="password-error"]').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('invalid@example.com')
    cy.get('[data-testid="password-input"]').type('wrongpassword')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="login-error"]').should('be.visible')
  })

  it('should successfully login with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('[data-testid="submit-button"]').click()
    
    // Vérifier la redirection vers le dashboard
    cy.url().should('include', '/dashboard')
    
    // Vérifier que l'utilisateur est connecté
    cy.get('[data-testid="user-menu"]').should('be.visible')
  })

  it('should handle 2FA if enabled', () => {
    cy.get('[data-testid="email-input"]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('[data-testid="submit-button"]').click()
    
    // Vérifier l'affichage du formulaire 2FA
    cy.get('[data-testid="2fa-form"]').should('be.visible')
    
    // Simuler l'entrée du code 2FA
    cy.get('[data-testid="2fa-input"]').type('123456')
    cy.get('[data-testid="2fa-submit"]').click()
    
    // Vérifier la redirection après 2FA
    cy.url().should('include', '/dashboard')
  })

  it('should remember user if remember me is checked', () => {
    cy.get('[data-testid="email-input"]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('[data-testid="remember-me"]').check()
    cy.get('[data-testid="submit-button"]').click()
    
    // Vérifier la redirection
    cy.url().should('include', '/dashboard')
    
    // Rafraîchir la page
    cy.reload()
    
    // Vérifier que l'utilisateur est toujours connecté
    cy.get('[data-testid="user-menu"]').should('be.visible')
  })
}) 