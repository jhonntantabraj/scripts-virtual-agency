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
import { v4 as uuidv4 } from 'uuid';
import { StatusFeesPaymentService } from '../helpers/status-fees-payment.service';
import { BalanceService } from '../helpers/balance.service';
import { queryTypes, statusFees } from '../queries/const-queries';

faker.locale = 'es';
@Service()
export class Generator {
    private totalCustomers!: number;
    private startId!: number;
    private endId!: number;

    constructor(
        private readonly collectionQueries: CollectionQueries,
        private generatorNumber: GeneratorNumberService,
        private ctps: CalculateTotalPaymentService,
        private fs: FileSystemService,
        private sfps: StatusFeesPaymentService,
        private bs: BalanceService,
    ) {}
    generateQueries(totalCustomers: number, startId: number, endId: number) {
        this.totalCustomers = totalCustomers;
        this.startId = startId;
        this.endId = endId;
        this.generateRequiredQueries();
        this.generateCustomers();
    }

    private generateRequiredQueries() {
        const commentQueryTypes = '/* queryTypes */ \n';
        this.fs.appendContentInFile(commentQueryTypes);
        for (let x = 0; x < queryTypes.length; x++) {
            this.fs.appendContentInFile(queryTypes[x]);
        }

        const commentStatusFees = '\n/* statusFees */ \n';
        this.fs.appendContentInFile(commentStatusFees);
        for (let x = 0; x < statusFees.length; x++) {
            this.fs.appendContentInFile(statusFees[x]);
        }
    }

    private generateCustomers() {
        let customer: ICustomer, query: string, documentTypeIndex;
        const comment = '\n/* Customers */ \n';
        this.fs.appendContentInFile(comment);
        console.log(`Started with ${this.totalCustomers} !!!`);
        //const idsUsed = [];
        let idUsed;
        for (let x = 1; x <= this.totalCustomers; x++) {
            if (
                x == 10000 ||
                x == 20000 ||
                x == 30000 ||
                x == 40000 ||
                x == 49999 ||
                x == 600000 ||
                x == 700000 ||
                x == 750000 ||
                x == 800000 ||
                x == 850000 ||
                x == 900000 ||
                x == 950000 ||
                x == 1000000
            ) {
                console.log(x);
            }

            documentTypeIndex = Math.floor(Math.random() * TYPE_DOCUMENT.length);
            idUsed = uuidv4();
            //idsUsed.push(x);
            customer = {
                customerId: idUsed,
                customerCode: this.generatorNumber.aleatory(100000000000000000, 190000000000000000),
                documentNumber: 0,
                documentType: TYPE_DOCUMENT[documentTypeIndex],
                email: faker.internet.email().toLowerCase(),
                phone: this.generatorNumber.aleatory(900000000, 999999999),
                agency: AGENCIES[Math.floor(Math.random() * AGENCIES.length)],
            };

            if (documentTypeIndex === 0) {
                let maxDNI = 90000000,
                    minDNI = 80000000;
                customer.name = `'${faker.name.firstName()}'`;
                customer.lastName = `'${faker.name.lastName()}'`;
                customer.bussinesName = null;
                customer.documentNumber = Math.floor(Math.random() * (maxDNI - minDNI + 1) + minDNI);
                customer.gender = `'${GENDERS[Math.floor(Math.random() * GENDERS.length)]}'`;
            } else if (documentTypeIndex === 1) {
                let base = '10';

                customer.name = null;
                customer.lastName = null;
                customer.bussinesName = `'${BUSINESS_NAMES[this.generatorNumber.aleatory(0, 49)]}'`;
                customer.documentNumber = parseInt(base + this.generatorNumber.aleatory(900000000, 999999999));
                customer.gender = null;
            }

            query = this.collectionQueries.insertCustomer(customer);
            this.fs.appendContentInFile(query);
        }

        const space = '\n\n';
        this.fs.appendContentInFile(space);
        console.log('Mid !!!');

        this.generateCredits();
    }

    private generateCredits() {
        const comment = '/* Credits */ \n',
            startMonth = 6;
        this.fs.appendContentInFile(comment);
        let credit: ICredit, query: string;

        const metadata: ICreditMetadata[] = [];
        let creditMetatada: ICreditMetadata;
        for (let x = this.startId; x <= this.endId; x++) {
            creditMetatada = {
                id: x,
                creditId: x,
                amountMoney: this.generatorNumber.withoutHundreds(5000, 20000),
                interestRate: this.generatorNumber.aleatory(12, 20),
                dayStartDate: this.generatorNumber.aleatory(1, 28),
                amountMonths: this.generatorNumber.aleatory(6, 11),
                startMonth: startMonth,
                other: {
                    minimunfeesPaid: this.generatorNumber.aleatory(4, 6),
                },
            };

            credit = {
                //creditId: uuidv4(),
                customerId: x,
                creditNumber: this.generatorNumber.aleatory(111111111111, 999999999999),
                productName: PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)],
                amount: creditMetatada.amountMoney,
                currency: CURRENCIES[0],
                interestRate: creditMetatada.interestRate,
                period: creditMetatada.amountMonths,

                balance: parseFloat(
                    this.bs
                        .calculateBalance(
                            creditMetatada.amountMoney,
                            creditMetatada.amountMonths,
                            creditMetatada.dayStartDate,
                            creditMetatada.other.minimunfeesPaid,
                        )
                        .toFixed(2),
                ),
                startDate: {
                    startDay: creditMetatada.dayStartDate,
                    startMonth: creditMetatada.startMonth,
                    startYear: 2021,
                },
                endDate: {
                    endDay: creditMetatada.dayStartDate,
                    endMonth: this.calculateMonthEndPayment(startMonth, creditMetatada.amountMonths),
                    endYear: this.calculateYearEndPayment(creditMetatada.amountMonths),
                },
                statusCredit: STATUS_CREDIT[1], //STATUS_CREDIT[Math.floor(Math.random() * STATUS_CREDIT.length)],
            };
            query = this.collectionQueries.insertCredit(credit);
            this.fs.appendContentInFile(query);

            metadata.push(creditMetatada);
        }
        console.log('credits generated sucessly!!!');

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
        console.log('Finished !!!');
    }
    private generatePaymentFeesByCredit(metaCred: ICreditMetadata, x: number) {
        let creditPaymentFee: ICreditPaymentFee, query: string;

        // const comment = '/* CreditPaymentFees */ \n';
        // this.fs.appendContentInFile(comment);

        let fee;
        for (let x = 0; x < metaCred.amountMonths; x++) {
            fee = this.ctps.calculateTotalPayment(metaCred.amountMoney, metaCred.interestRate, metaCred.amountMonths);

            creditPaymentFee = {
                creditPaymentFeeId: uuidv4(),
                creditId: metaCred.id,
                amount: fee,
                expirationDate: {
                    expirationDay: metaCred.dayStartDate,
                    expirationMonth: this.calculateMonthExpirationFee(metaCred.startMonth, x + 1),
                    expirationYear: this.calculateYearEndPayment(x + 1),
                },
                statusFeeId: this.sfps.generateStatusPaymentFee(
                    metaCred.startMonth + x + 1,
                    metaCred.dayStartDate,
                    metaCred.other.minimunfeesPaid,
                ),
            };
            query = this.collectionQueries.insertCreditPaymentFee(creditPaymentFee);
            this.fs.appendContentInFile(query);
        }
    }

    //move to other class
    calculateYearEndPayment(amountMonths: number) {
        return amountMonths > 6 ? 2022 : 2021;
    }
    calculateMonthEndPayment(startMonth: number, amountMonths: number) {
        return amountMonths > 6 ? amountMonths - startMonth : startMonth + amountMonths;
    }
    calculateMonthExpirationFee(startMonth: number, nextMonth: number) {
        return startMonth + nextMonth > 12 ? nextMonth - startMonth : startMonth + nextMonth;
    }
}
