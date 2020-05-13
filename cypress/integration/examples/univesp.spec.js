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
        
        // visitando o site de login da univesp
        cy.visit('https://login.univesp.br')

        // clica no primeiro link (direciona para a página de login)
        cy.get('ul li:first').click()

        // seleciona o campo de login e digita o username
        cy.get('#username').type(Cypress.env('USERNAME'))

        // Clica no botão "próximo"
        cy.get('.step-footer button:first').click()

        // seleciona o campo de login e digita a senha
        cy.get('#password').type(Cypress.env('PASSWORD'))

        // Clica no botão "enviar"
        cy.get('.btn-red').contains('Enviar').click()

        cy.visit('https://cursos.univesp.br/courses/3028')
    })
})