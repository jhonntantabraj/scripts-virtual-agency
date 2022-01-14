import { Service } from 'typedi';
import dayjs from 'dayjs';
import { STATUS_CREDIT_PAYMENT_FEE } from '../consts/status-credit-payment-fee';

@Service()
export class StatusFeesPaymentService {
    generateStatusPaymentFee(month: number, day: number, minimunfeesPaid: number) {
        //['Cancelado', 'Cuota actual', 'Vigente', 'Reprogramado', 'Vencido'];
        // console.log('----------minimunfeesPaid', minimunfeesPaid);
        const startMonthOfCredit = 6; //June
        const minimunMonthWithFeesPaid = startMonthOfCredit + minimunfeesPaid; //month 11
        const decemberMonth = 12;

        if (month == decemberMonth) {
            return this.paymentStatusForDecember(day);
        }

        //cancelled
        if (minimunMonthWithFeesPaid >= month) {
            return STATUS_CREDIT_PAYMENT_FEE[0].id;
        }

        //cancelled
        if (month < decemberMonth) {
            return STATUS_CREDIT_PAYMENT_FEE[0].id;
        }

        return STATUS_CREDIT_PAYMENT_FEE[1].id; //month 13 or more
    }
    private paymentStatusForDecember(day: number) {
        const startDayWithPaymentBeaten = 5,
            endDayWithPaymentBeaten = 13;

        //cancelled
        if (day < startDayWithPaymentBeaten) {
            return STATUS_CREDIT_PAYMENT_FEE[0].id;
        }

        //beaten
        if (day >= startDayWithPaymentBeaten && day <= endDayWithPaymentBeaten) {
            return STATUS_CREDIT_PAYMENT_FEE[2].id;
        }

        //vigente
        return STATUS_CREDIT_PAYMENT_FEE[1].id;
    }
}
