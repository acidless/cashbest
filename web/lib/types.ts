export type Cashback = {
    category: number;
    amount: number;
    bank: string;
}

export type CashbackCategory = {
    category: number;
    cashback: Cashback[];
}