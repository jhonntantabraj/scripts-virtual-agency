export interface ICreditPaymentFee {
    creditId: number;
    amount: number;
    expirationDate: {
        expirationDay: number;
        expirationMonth: number;
    };
    statusPayment: string;
    createdAt?: Date;
}
