export interface ICredit {
    //creditId: string;
    customerId: number;
    creditNumber: number;
    productName: string;
    amount: number;
    currency: string;
    interestRate: number;
    period: number;
    balance: number;
    startDate: {
        startDay: number;
        startMonth: number;
        startYear: number;
    };
    endDate: {
        endDay: number;
        endMonth: number;
        endYear: number;
    };
    statusCredit: string;
    createdAt?: Date;
}
