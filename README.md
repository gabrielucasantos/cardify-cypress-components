# Cardify - Automação de Testes com Cypress

![Cardify Logo](https://img.shields.io/badge/Cardify-QA%20Automation-lime?style=for-the-badge&logo=cypress)

🎥 **Assista ao vídeo de demonstração** *(em breve)*

Este projeto é uma automação completa de testes para a aplicação web Cardify, focada em **Quality Assurance (QA)**. Aqui você encontra uma implementação robusta de testes de componentes que cobre todo o fluxo de gerenciamento de cartões, desde a validação de formulários até a integração com APIs.

## 🎯 O que este projeto faz

- **Testa formulários de cartão** - Valida se todos os campos obrigatórios estão funcionando
- **Valida regras de negócio** - Verifica validações de CVV, data de expiração e número do cartão usando algoritmo de Luhn
- **Simula cadastros completos** - Testa todo o processo de adição de cartões com validações robustas
- **Valida integração com APIs** - Garante que as requisições HTTP estão funcionando corretamente
- **Gera dados aleatórios** - Executa testes com dados dinâmicos para maior cobertura e detecção de edge cases
- **Testa responsividade** - Valida o comportamento em diferentes resoluções (1440x900)

## 🛠️ Tecnologias de QA que usei

**Framework de automação:**
- **Cypress** - Framework moderno e poderoso para automação web
- **Cypress Component Testing** - Para testes de componentes isolados
- **JavaScript ES6+** - Linguagem para escrita dos testes

**Ferramentas de teste:**
- **Cypress Commands** - Comandos customizados reutilizáveis
- **Interceptação de APIs** - Mock de requisições HTTP para testes isolados
- **Geração de dados dinâmicos** - Testes com dados aleatórios para maior cobertura
- **Page Objects** - Padrão de arquitetura para organização dos testes

## 🚀 Como usar

### Pré-requisitos
- Node.js 16 ou superior
- npm ou yarn
- Git

### Passo a passo

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/cardify-cypress-components.git
cd cardify-cypress-components

# Instale as dependências
npm install

# Execute os testes Cypress (modo interativo)
npx cypress open

# Ou execute os testes em modo headless
npx cypress run --component

# Execute testes específicos
npx cypress run --component --spec "src/pages/AddCard.cy.jsx"

# Execute apenas testes de fumaça
npx cypress run --component --env grepTags=@smoke

# Execute testes com relatórios detalhados
npx cypress run --component --reporter html
```

## 🏗️ Como está organizado

```
cardify-cypress-components/
├── src/
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── CardPreview.jsx   # Preview do cartão em tempo real
│   │   ├── Header.jsx        # Cabeçalho da aplicação
│   │   └── Footer.jsx        # Rodapé da aplicação
│   ├── pages/                # Páginas da aplicação
│   │   ├── Landing.jsx       # Página inicial com landing page
│   │   ├── AddCard.jsx       # Formulário de adição de cartão
│   │   └── Upgrade.jsx       # Página de upgrade de plano
│   ├── services/             # Serviços de API
│   │   └── cardService.js    # Serviço de gerenciamento de cartões
│   └── utils/                # Utilitários e validações
│       ├── cardValidation.js # Validações de cartão com algoritmo de Luhn
│       └── bankColors.js     # Cores e estilos dos bancos digitais
├── cypress/
│   ├── support/              # Configurações do Cypress
│   │   ├── commands.js       # Comandos customizados para testes
│   │   └── component.js      # Suporte para testes de componente
│   └── fixtures/             # Dados de teste
├── src/pages/
│   └── AddCard.cy.jsx        # Testes automatizados do formulário de cartão
└── cypress.config.js         # Configuração do Cypress para testes de componente
```

## 💡 Boas práticas de QA que implementei

### Arquitetura de Testes
- **Component Testing** - Testes isolados de componentes React para maior confiabilidade
- **Custom Commands** - Comandos reutilizáveis para manutenção facilitada dos testes
- **Data Driven Testing** - Testes com dados parametrizados e aleatórios para maior cobertura
- **Page Objects** - Estrutura organizada para elementos da interface usando data-cy

### Estratégias de Teste
- **Validações robustas** - Cobertura completa de cenários de erro e sucesso com mensagens específicas
- **Geração de dados dinâmicos** - Testes com dados aleatórios para detectar edge cases e cenários imprevistos
- **Interceptação de APIs** - Mock de requisições HTTP para testes isolados e determinísticos
- **Assertions inteligentes** - Verificações específicas e descritivas para melhor debugging e manutenção

### Configurações de QA
- **Viewport responsivo** - Testes em resolução 1440x900 para garantir comportamento consistente
- **Timeouts otimizados** - Espera inteligente por elementos para testes mais estáveis
- **Relatórios automáticos** - Evidências visuais dos testes para auditoria e debugging
- **Configuração de ambiente** - Setup otimizado para execução em CI/CD com Cypress Component Testing

## 📝 Exemplo de como escrevi os testes

```javascript
// Teste de validação de campos obrigatórios
it('exibe erros quando os campos não são preenchidos', () => {
  cy.get('[data-cy=saveMyCard]').click()

  requiredFieldErrors.forEach((errorMessage) => {
    cy.alertErrorHaveText(errorMessage)
  })
})

// Teste de cadastro com sucesso
it('deve cadastrar um novo cartão com sucesso', () => {
  cy.intercept('POST', '**/api/cards', (req) => {
    req.reply({ statusCode: 201, body: myCard })
  }).as('addCard')

  cy.fillCardForm(myCard)
  cy.submitCardForm()
  cy.wait('@addCard')

  cy.get('.notice-success')
    .should('be.visible')
    .and('contain.text', 'Cartão cadastrado com sucesso!')
})
```

## 👨‍💻 Meu trabalho como QA Engineer neste projeto

Como **QA Engineer** especializado em automação, fui responsável por:

- **Criar toda a estratégia de testes** do zero com Cypress Component Testing
- **Implementar comandos customizados** para reutilização e manutenção facilitada
- **Escrever testes robustos** com validações completas de formulários e regras de negócio
- **Configurar interceptação de APIs** para testes isolados e determinísticos
- **Implementar geração de dados dinâmicos** para maior cobertura e detecção de edge cases
- **Preparar para CI/CD** com configurações otimizadas para pipelines de qualidade

### Habilidades de QA que demonstrei
- **Automação web com Cypress** - Framework moderno e poderoso para testes E2E e de componentes
- **Testes de componentes** - Isolamento e performance para testes mais rápidos e confiáveis
- **JavaScript ES6+** - Código limpo e moderno para manutenção facilitada
- **Arquitetura de testes** - Estrutura escalável e organizada para crescimento sustentável
- **Git e controle de versão** - Trabalho colaborativo e rastreabilidade de mudanças
- **Metodologias ágeis** - Integração contínua de qualidade no desenvolvimento

## 📊 Resultados

✅ **100% dos fluxos críticos** do formulário de cartão cobertos por testes  
✅ **Validações completas** implementadas com algoritmo de Luhn e regras de negócio  
✅ **Testes com dados dinâmicos** para maior cobertura e detecção de edge cases  
✅ **Interceptação de APIs** para testes isolados e determinísticos  
✅ **Código escalável** para novos testes com arquitetura bem estruturada  
✅ **Integração com Cypress Component Testing** para testes rápidos e confiáveis  



## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar!

---

**Desenvolvido com 💚 e muito carinho para demonstrar excelência em Quality Assurance com Cypress**

⭐ **Se gostou do projeto, deixe uma estrela!**
