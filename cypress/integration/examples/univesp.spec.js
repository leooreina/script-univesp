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
        .then(res => {
            // cy.visit('https://cursos.univesp.br/simplesaml/module.php/core/loginuserpass.php?AuthState=_106fc02920d697261542702f0116517e576cc9bb24%3Ahttps%3A%2F%2Flogin.univesp.br%2Fsimplesaml%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttp%253A%252F%252Fcursos1.univesp.br%252Fsaml2%26cookieTime%3D1589588198')
            
            cy.wait(5000)

            cy.get('#global_nav_courses_link').click()

            cy.wait(2000)

            cy.get('a').contains('Todos os Cursos').click()

            cy.contains('AAG002').click()

            cy.contains('Poder e Cultura Organizacional').next().click()

            cy.get('span').contains('Plano de Ensino').should('be.visible')
        })
    })
})