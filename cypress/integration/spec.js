/// <reference types="cypress" />
describe('Decorator', () => {
  it('has app action via decorator', () => {
    cy.visit('/')

    // the page automatically sets created singleton instances
    // via TypeScript decorator

    // an instance of class "O"
    cy.window().its('O').should('deep.equal', {
      foo: 'nice'
    })

    // another instance from class "Person"
    cy.window().its('Person')
      .should('have.property', 'name', 'Mike')
  })
})
