// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  let disciplinas = ['EES201', 'EES301', 'EEI201', 'EPA001', 'DGE001', 'EPP302', 'EPP401', 'EEE001', 'EEP101', 
  'EEP001', 'EEO001', 'EPE501', 'AGI001', 'AGC001', 'EPP002', 'MCN001', 'SEJ001', 'SEB001', 'SMT001', 'EEC101', 
  'EET001', 'EPG001', 'EIC001', 'EPO002', 'EPP001', 'RST001', 'MEE001', 'BMT001', 'FEG002', 'EMA002', 'MCA003', 
  'MGD001', 'SDE001', 'SFG001', 'SHT001', 'SAL002', 'ECP001', 'GCP001', 'AGF020', 'ESP022', 'AMB011', 'JLG008', 
  'SAA001', 'LIN101', 'SPE001', 'LET100', 'MMB002', 'INT100']

describe("Teste de verificação das páginas das semanas", () => {
    it("Deve logar com usuário válido", () => {
        cy.login().then(res => {
            disciplinas.map(disciplina => cy.verificaDesbloqueio(disciplina, '.semana-4'))
        })
    })
})