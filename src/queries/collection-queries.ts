import { Service } from 'typedi';
import { ICredit } from '../interfaces/credit';
import { ICreditPaymentFee } from '../interfaces/credit-payment-fee';
import { ICustomer } from '../interfaces/customer';

@Service()
export class CollectionQueries {
    insertCustomer(c: ICustomer) {
        return `INSERT INTO [db_virtualagency].[Customers] VALUES(NEWID(), ${c.customerCode},  ${c.name}, ${c.lastName}, ${c.bussinesName}, '${c.documentType}', '${c.documentNumber}', ${c.phone}, '${c.email}', ${c.gender}, '${c.agency}', 'APP SISMACT CMAC', GETDATE());\n`;
    }

    /* 
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

        */
    insertCredit(cr: ICredit) {
        return `INSERT INTO [db_virtualagency].[Credits] VALUES(${cr.customerId}, NEWID(), ${cr.creditNumber}, '${cr.productName}', ${cr.amount}, '${cr.currency}', ${cr.interestRate}, ${cr.period}, ${cr.balance}, DATETIMEFROMPARTS(${cr.startDate.startYear}, ${cr.startDate.startMonth}, ${cr.startDate.startDay},1,1,1,1), DATETIMEFROMPARTS(${cr.endDate.endYear}, ${cr.endDate.endMonth}, ${cr.endDate.endDay},1,1,1,1), '${cr.statusCredit}', GETDATE());\n`;
    }
    /* 
        creditId: number;
        amount: number;
        expirationDate: {
            expirationDay: number;
            expirationMonth: number;
        };
        statusPayment: string;
        createdAt?: Date;
    */
    insertCreditPaymentFee(cpf: ICreditPaymentFee) {
        return `INSERT INTO [db_virtualagency].[CreditPaymentFees] VALUES(${cpf.creditId}, ${cpf.statusFeeId}, NEWID(), ${cpf.amount}, DATETIMEFROMPARTS(${cpf.expirationDate.expirationYear}, ${cpf.expirationDate.expirationMonth}, ${cpf.expirationDate.expirationDay},1,1,1,1), GETDATE());\n`;
    }
}
