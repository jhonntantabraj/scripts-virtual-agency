import { Service } from 'typedi';

@Service()
export class CalculateTotalPaymentService {
    calculateTotalPayment(capital: number, interestRate: number, totalMonths: number) {
        return (capital + capital * (interestRate / 100)) / totalMonths;
    }
}
