export type Cashback = {
    category: number;
    amount: number;
    bank: string;
    expires: Date;
}

export type CashbackCategory = {
    category: number;
    cashback: Cashback[];
}