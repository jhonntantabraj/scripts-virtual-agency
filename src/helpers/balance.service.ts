import { Service } from 'typedi';

@Service()
export class BalanceService {
    calculateBalance(totalAmount: number, amountMonths: number, day: number, totalFeesPaid: number) {
        const startMonthOfCredit = 6; //June
        const minimunMonthWithFeesPaid = startMonthOfCredit + totalFeesPaid;
        const decemberMonth = 12;

        if (minimunMonthWithFeesPaid === decemberMonth) {
            return this.balanceForDecember(totalAmount, amountMonths, day, totalFeesPaid);
        }

        return (totalAmount / amountMonths) * totalFeesPaid;
    }
    private balanceForDecember(totalAmount: number, amountMonths: number, day: number, totalFeesPaid: number) {
        const startDayWithPaymentBeaten = 5,
            endDayWithPaymentBeaten = 13;
        if (day >= startDayWithPaymentBeaten || day <= endDayWithPaymentBeaten) {
            return (totalAmount / amountMonths) * totalFeesPaid - 1;
        }
        return (totalAmount / amountMonths) * totalFeesPaid;
    }
}
