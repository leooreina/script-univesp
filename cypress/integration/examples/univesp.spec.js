// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  let disciplinas = [
    'AAG002',
    'EIR201',
    'EID002'
  ]

describe("Teste básico de login no portal do Canvas", () => {
    it("Deve logar com usuário válido", () => {
        cy.login().then(res => {
            disciplinas.map(disciplina => cy.verificaDesbloqueio(disciplina, '.semana-4'))
        })
    })
})