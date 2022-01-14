export interface ICreditPaymentFee {
    creditPaymentFeeId: string;
    creditId: number;
    amount: number;
    expirationDate: {
        expirationDay: number;
        expirationMonth: number;
        expirationYear: number;
    };
    statusFeeId: number;
    createdAt?: Date;
}
