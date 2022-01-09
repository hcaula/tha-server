import express from 'express'

import { httpStatusCodes } from '../../common/httpStatus'

import FinancialHealthService from './service'

class FinancialHealthController {
  getHealthStatus(req: express.Request, res: express.Response) {
    const { monthlyCosts, annualIncome } = req.query

    const financialStatus = FinancialHealthService.calculateStatus({
      monthlyCosts: parseFloat(monthlyCosts as string),
      annualIncome: parseFloat(annualIncome as string)
    })

    res.status(httpStatusCodes.SUCCESS).send(financialStatus)
  }
}

export default new FinancialHealthController()
