import { GetFinancialHealthArgs } from './args'
import FinancialHealthStatusEnum from './enum'

const ANNUAL_INCOME_TAX = 0.08

const { HEALTHY, MEDIUM, LOW } = FinancialHealthStatusEnum

const HEALTH_SCORE_MAX_RATIO = {
  [HEALTHY]: 0.25,
  [MEDIUM]: 0.75,
  [LOW]: 1
}

class FinancialHealthService {
  calculateStatus(options: GetFinancialHealthArgs): FinancialHealthStatusEnum {
    const { annualIncome, monthlyCosts } = options

    const annualNetCompensation = annualIncome * (1 - ANNUAL_INCOME_TAX)
    const annualCosts = monthlyCosts * 12
    const annualCostRatio = annualCosts / annualNetCompensation

    if (annualCostRatio <= HEALTH_SCORE_MAX_RATIO[HEALTHY]) return HEALTHY
    else if (annualCostRatio <= HEALTH_SCORE_MAX_RATIO[MEDIUM]) return MEDIUM
    else return LOW
  }
}

export default new FinancialHealthService()
