import { ICustomer } from '../interfaces/customer';
import { CollectionQueries } from './../queries/collection-queries';
import faker from 'faker';
import { TYPE_DOCUMENT } from '../consts/type-document';
import { GENDERS } from '../consts/genders';
import { AGENCIES } from '../consts/acencies';
import { ICredit } from './../interfaces/credit';
import { CURRENCIES } from '../consts/currencies';
import { PRODUCT_NAMES } from '../consts/product-names';
import { STATUS_CREDIT } from '../consts/status-credit';
import { ICreditPaymentFee } from '../interfaces/credit-payment-fee';
import { STATUS_CREDIT_PAYMENT_FEE } from '../consts/status-credit-payment-fee';
import { FileSystemService } from '../helpers/file-system.service';
import { Service } from 'typedi';
import { BUSINESS_NAMES } from '../consts/business-names';
import { GeneratorNumberService } from '../helpers/aleatory-number.service';
import dayjs from 'dayjs';
import { ICreditMetadata } from '../interfaces/credit-metadata';
import { CalculateTotalPaymentService } from '../helpers/calculate-total-payment.service';

@Service()
export class Generator {
    private totalCustomers!: number;

    constructor(
        private readonly collectionQueries: CollectionQueries,
        private generatorNumber: GeneratorNumberService,
        private ctps: CalculateTotalPaymentService,
        private fs: FileSystemService,
    ) {}
    generateQueries(totalCustomers: number) {
        this.totalCustomers = totalCustomers;
        this.generateCustomers();
    }

    private generateCustomers() {
        let customer: ICustomer, query: string, documentTypeIndex;
        const comment = '/* Customers */ \n';
        this.fs.appendContentInFile(comment);
        for (let x = 0; x < this.totalCustomers; x++) {
            documentTypeIndex = Math.floor(Math.random() * TYPE_DOCUMENT.length);
            customer = {
                customerCode: this.generatorNumber.aleatory(100000000000000000, 190000000000000000),
                documentNumber: 0,
                documentType: TYPE_DOCUMENT[documentTypeIndex],
                email: faker.internet.email(),
                phone: this.generatorNumber.aleatory(900000000, 999999999),
                gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
                agency: AGENCIES[Math.floor(Math.random() * AGENCIES.length)],
            };
            console.log(customer.customerCode);

            if (documentTypeIndex === 0) {
                let maxDNI = 90000000,
                    minDNI = 80000000;
                customer.name = `'${faker.name.firstName()}'`;
                customer.lastName = `'${faker.name.lastName()}'`;
                customer.bussinesName = null;
                customer.documentNumber = Math.floor(Math.random() * (maxDNI - minDNI + 1) + minDNI);
            } else if (documentTypeIndex === 1) {
                let base = '10';

                customer.name = null;
                customer.lastName = null;
                customer.bussinesName = `'${BUSINESS_NAMES[x]}'`;
                customer.documentNumber = parseInt(base + this.generatorNumber.aleatory(900000000, 999999999));
            }

            query = this.collectionQueries.insertCustomer(customer);
            this.fs.appendContentInFile(query);
        }

        const space = '\n\n';
        this.fs.appendContentInFile(space);

        this.generateCredits();
    }

    private generateCredits() {
        const comment = '/* Credits */ \n';
        this.fs.appendContentInFile(comment);
        let credit: ICredit, query: string;

        const metadata: ICreditMetadata[] = [];
        let creditMetatada: ICreditMetadata;
        for (let x = 1; x <= this.totalCustomers; x++) {
            creditMetatada = {
                creditId: x,
                amountMoney: this.generatorNumber.withoutHundreds(5000, 20000),
                interestRate: this.generatorNumber.aleatory(12, 20),
                dayStartDate: this.generatorNumber.aleatory(1, 29),
                amountMonths: this.generatorNumber.aleatory(6, 11),
            };

            credit = {
                customerId: x,
                creditNumber: this.generatorNumber.aleatory(111111111111, 999999999999),
                productName: PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)],
                amount: creditMetatada.amountMoney,
                currency: CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)],
                interestRate: creditMetatada.interestRate,
                period: creditMetatada.amountMonths,
                startDate: {
                    startDay: creditMetatada.dayStartDate,
                    startMonth: 1,
                },
                endDate: {
                    endDay: creditMetatada.dayStartDate,
                    endMonth: creditMetatada.amountMonths + 1,
                },
                statusCredit: STATUS_CREDIT[Math.floor(Math.random() * STATUS_CREDIT.length)],
            };

            query = this.collectionQueries.insertCredit(credit);
            this.fs.appendContentInFile(query);

            metadata.push(creditMetatada);
        }

        const space = '\n\n';
        this.fs.appendContentInFile(space);

        this.generateCreditPaymentFees(metadata);
    }

    private generateCreditPaymentFees(metadata: ICreditMetadata[]) {
        const comment = '/* CreditPaymentFees */ \n';
        this.fs.appendContentInFile(comment);
        for (let x = 0; x < metadata.length; x++) {
            this.generatePaymentFeesByCredit(metadata[x], x);
        }
    }
    private generatePaymentFeesByCredit(metaCred: ICreditMetadata, x: number) {
        let creditPaymentFee: ICreditPaymentFee, query: string;

        const comment = '/* CreditPaymentFees */ \n';
        this.fs.appendContentInFile(comment);

        let pees;
        for (let x = 0; x < metaCred.amountMonths; x++) {
            pees = this.ctps.calculateTotalPayment(metaCred.amountMoney, metaCred.interestRate, metaCred.amountMonths);

            creditPaymentFee = {
                creditId: metaCred.creditId,
                amount: pees,
                expirationDate: {
                    expirationDay: metaCred.dayStartDate,
                    expirationMonth: x + 2,
                },
                statusPayment: STATUS_CREDIT_PAYMENT_FEE[Math.floor(Math.random() * STATUS_CREDIT_PAYMENT_FEE.length)],
            };
            query = this.collectionQueries.insertCreditPaymentFee(creditPaymentFee);
            this.fs.appendContentInFile(query);
        }
    }
}
