// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Teste básico de login no portal do Canvas", () => {
    it("Deve logar com usuário válido", () => {
        cy.login().then(res => {
            cy.verificaDesbloqueio('AAG002', '.semana-4')
            cy.verificaDesbloqueio('EIR201', '.semana-4')
            cy.verificaDesbloqueio('EID002', '.semana-4')
        })
    })
})