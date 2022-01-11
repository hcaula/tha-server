/// <reference types="cypress" />

const ROUTE = '/financial/health'

describe(ROUTE, () => {
  context('when the annual cost ratio is less or equal than 25%', () => {
    const annualIncome = 1000
    const monthlyCosts = 10
    const expectedStatus = 'HEALTHY'

    it('returns status HEALTHY', () => {
      cy.request({ url: ROUTE, qs: { annualIncome, monthlyCosts } }).then(
        (response) => {
          expect(response).property('status').to.equal(200)
          expect(response).property('body').to.equal(expectedStatus)
        }
      )
    })
  })

  context(
    'when the annual cost ratio is greater than 25% and less or equal than 75%',
    () => {
      const annualIncome = 1000
      const monthlyCosts = 30
      const expected_status = 'MEDIUM'

      it('returns status MEDIUM', () => {
        cy.request({ url: ROUTE, qs: { annualIncome, monthlyCosts } }).then(
          (response) => {
            expect(response).property('status').to.equal(200)
            expect(response).property('body').to.equal(expected_status)
          }
        )
      })
    }
  )

  context('when the annual cost ratio is greater than 75%', () => {
    const annualIncome = 1000
    const monthlyCosts = 75
    const expected_status = 'LOW'

    it('returns status LOW', () => {
      cy.request({ url: ROUTE, qs: { annualIncome, monthlyCosts } }).then(
        (response) => {
          expect(response).property('status').to.equal(200)
          expect(response).property('body').to.equal(expected_status)
        }
      )
    })
  })

  context('when the client sends invalid parameters', () => {
    context('when annualIncome is not passed', () => {
      const monthlyCosts = 30

      it('returns an error', () => {
        cy.request({
          url: ROUTE,
          qs: { monthlyCosts },
          failOnStatusCode: false
        }).then((response) => {
          expect(response).property('status').to.equal(400)
          expect(response.body.message).to.equal('Is required')
          expect(response.body.value).to.equal('annualIncome')
        })
      })
    })

    context('when monthlyCosts is not passed', () => {
      const annualIncome = 1000

      it('returns an error', () => {
        cy.request({
          url: ROUTE,
          qs: { annualIncome },
          failOnStatusCode: false
        }).then((response) => {
          expect(response).property('status').to.equal(400)
          expect(response.body.message).to.equal('Is required')
          expect(response.body.value).to.equal('monthlyCosts')
        })
      })
    })

    context('when annualIncome is less than 0', () => {
      const annualIncome = -1
      const monthlyCosts = 30

      it('returns an error', () => {
        cy.request({
          url: ROUTE,
          qs: { annualIncome, monthlyCosts },
          failOnStatusCode: false
        }).then((response) => {
          expect(response).property('status').to.equal(400)
          expect(response.body.message).to.equal('Must be greater than zero')
          expect(response.body.value).to.equal('annualIncome')
        })
      })
    })

    context('when monthlyCosts is less than 0', () => {
      const annualIncome = 1000
      const monthlyCosts = -1

      it('returns an error', () => {
        cy.request({
          url: ROUTE,
          qs: { annualIncome, monthlyCosts },
          failOnStatusCode: false
        }).then((response) => {
          expect(response).property('status').to.equal(400)
          expect(response.body.message).to.equal('Must be greater than zero')
          expect(response.body.value).to.equal('monthlyCosts')
        })
      })
    })
  })
})
