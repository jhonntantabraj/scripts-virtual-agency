export interface ICredit {
    customerId: number;
    creditNumber: number;
    productName: string;
    amount: number;
    currency: string;
    interestRate: number;
    period: number;
    startDate: {
        startDay: number;
        startMonth: number;
    };
    endDate: {
        endDay: number;
        endMonth: number;
    };
    statusCredit: string;
    createdAt?: Date;
}
