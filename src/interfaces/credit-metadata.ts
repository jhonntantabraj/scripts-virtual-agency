export interface ICreditMetadata {
    id: number;
    creditId: number;
    amountMoney: number;
    interestRate: number;
    dayStartDate: number;
    amountMonths: number;
    startMonth: number;
    other: {
        minimunfeesPaid: number;
    };
}
