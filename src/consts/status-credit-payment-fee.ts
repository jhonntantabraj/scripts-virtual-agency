interface IStatusFee {
    id: number;
    name: string;
}

export const STATUS_CREDIT_PAYMENT_FEE: IStatusFee[] = [
    {
        id: 1,
        name: 'Cancelado',
    },
    {
        id: 2,
        name: 'Vigente',
    },
    {
        id: 3,
        name: 'Vencido',
    },
    {
        id: 4,
        name: 'Reprogramado',
    },
];
