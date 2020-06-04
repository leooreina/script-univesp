// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('verificaDesbloqueio',
 (codigo, classe) => {
    cy.get('#global_nav_courses_link').click()

    cy.wait(5000)

    cy.get('a').contains('Todos os Cursos').click()

    cy.contains(codigo).click({force: true})

    cy.get(classe).click()

    cy.get('span').contains('Plano de Ensino').should('be.visible')
 }) 

 Cypress.Commands.add('login', () => {
   // visitando o site de login da univesp
   cy.visit('https://cursos.univesp.br')

   // seleciona o campo de login e digita o username
   cy.get('#username').type(Cypress.env('USERNAME'))

   // Clica no botão "próximo"
   cy.get('.step-footer button:first').click()

   // seleciona o campo de login e digita a senha
   cy.get('#password').type(Cypress.env('PASSWORD'))

   // Clica no botão "enviar"
   cy.get('.btn-red').contains('Enviar').click()

   cy.request('POST', 'https://cursos.univesp.br/login/saml', 
   { username: Cypress.env('USERNAME'),
       password: Cypress.env('PASSWORD')
   })
 })
            
