import { Schema } from 'express-validator'

const getHealthStatusSchema: Schema = {
  annualIncome: {
    in: ['query'],
    exists: { errorMessage: 'Is required' },
    isFloat: {
      options: { gt: 0 },
      errorMessage: 'Must be greater than zero'
    }
  },
  monthlyCosts: {
    in: ['query'],
    exists: { errorMessage: 'Is required' },
    isFloat: { options: { gt: 0 }, errorMessage: 'Must be greater than zero' }
  }
}

export default getHealthStatusSchema
