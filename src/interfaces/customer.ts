export interface ICustomer {
    customerId: string;
    name?: string | null;
    customerCode: number;
    lastName?: string | null;
    bussinesName?: string | null;
    documentType: string;
    documentNumber: number;
    email: string;
    phone: number;
    gender?: string | null;
    agency: string;
}
