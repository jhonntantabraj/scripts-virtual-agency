import { Service } from 'typedi';

@Service()
export class CalculateTotalPaymentService {
    calculateTotalPayment(capital: number, interestRate: number, totalMonths: number) {
        const payemntByMonth = (capital + capital * (interestRate / 100)) / totalMonths;
        return parseFloat(payemntByMonth.toFixed(2));
    }
}
