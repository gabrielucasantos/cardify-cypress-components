import React from 'react'
import AddCard from './AddCard'

describe('AddCard', () => {
  // Funções para gerar dados aleatórios
  const generateRandomCardNumber = () => {
    const prefixes = ['4242424242424242', '5555555555554444', '378282246310005', '6011111111111117']
    return prefixes[Math.floor(Math.random() * prefixes.length)]
  }

  const generateRandomName = () => {
    const names = [
      'Gabriel Andrade', 'Maria Silva', 'João Santos', 'Ana Costa', 
      'Pedro Oliveira', 'Lucia Ferreira', 'Carlos Lima', 'Fernanda Rocha',
      'Roberto Alves', 'Patricia Souza', 'Marcos Costa', 'Juliana Lima'
    ]
    return names[Math.floor(Math.random() * names.length)]
  }

  const generateRandomExpirationDate = () => {
    const currentYear = new Date().getFullYear()
    const randomYear = currentYear + Math.floor(Math.random() * 10) + 1
    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    return `${randomMonth}${randomYear.toString().slice(-2)}`
  }

  const generateRandomCVV = () => {
    const cvvLength = Math.random() > 0.5 ? 3 : 4
    return String(Math.floor(Math.random() * Math.pow(10, cvvLength))).padStart(cvvLength, '0')
  }

  const generateRandomBank = () => {
    const banks = ['neon', 'nubank', 'inter', 'c6bank', 'willbank', 'outro']
    return banks[Math.floor(Math.random() * banks.length)]
  }

  // Gerar dados aleatórios para cada execução
  const generateRandomCard = () => ({
    number: generateRandomCardNumber(),
    holderName: generateRandomName(),
    expirationDate: generateRandomExpirationDate(),
    cvv: generateRandomCVV(),
    bank: generateRandomBank()
  })

  // Dados aleatórios para esta execução
  const myCard = generateRandomCard()

  // Array de mensagens de erro obrigatórias
  const requiredFieldErrors = [
    'Número do cartão é obrigatório',
    'Nome do titular é obrigatório',
    'Data de expiração é obrigatória',
    'CVV é obrigatório',
    'Selecione um banco'
  ]

  // Array de cenários de erro com dados aleatórios
  const errorScenarios = [
    {
      scenario: 'nome do titular com menos de 2 caracteres',
      card: { ...myCard, holderName: 'G' },
      expectedError: 'Nome deve ter pelo menos 2 caracteres'
    },
    {
      scenario: 'data de expiração inválida',
      card: { ...myCard, expirationDate: '1840' },
      expectedError: 'Data de expiração inválida ou vencida'
    },
    {
      scenario: 'CVV com menos de 3 dígitos',
      card: { ...myCard, cvv: '6' },
      expectedError: 'CVV deve ter 3 ou 4 dígitos'
    }
  ]

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)
    
    // Log dos dados aleatórios para debug
    cy.log(`Executando teste com cartão ${JSON.stringify(myCard)}`)
  })

  it('exibe erros quando os campos não são preenchidos', () => {
    cy.get('[data-cy=saveMyCard]').click()

    // Usando dados dinâmicos para verificar todos os erros obrigatórios
    requiredFieldErrors.forEach((errorMessage) => {
      cy.alertErrorHaveText(errorMessage)
    })
  })

  it('deve cadastrar um novo cartão com sucesso', () => {
    // Interceptar a requisição ANTES de preencher o formulário
    cy.intercept('POST', '**/api/cards', (req) => {
      req.reply({
        statusCode: 201,
        body: myCard
      })
    }).as('addCard')

    cy.fillCardForm(myCard)
    cy.submitCardForm()

    // Aguardar a requisição ser feita
    cy.wait('@addCard')

    cy.get('.notice-success')
      .should('be.visible')
      .and('contain.text', 'Cartão cadastrado com sucesso!')
  })

  // Teste dinâmico para todos os cenários de erro
  errorScenarios.forEach(({ scenario, card, expectedError }) => {
    it(`valida ${scenario}`, () => {
      cy.fillCardForm(card)
      cy.submitCardForm()

      cy.alertErrorHaveText(expectedError)
    })
  })
})
