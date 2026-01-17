import CashbackCategory from "./cashback-category";

class CashbackEntity {
    public constructor(private category: CashbackCategory, private amount: number, private bank: string) {}

    public getCategory() {
        return this.category;
    }

    public getAmount() {
        return this.amount;
    }

    public getBank() {
        return this.bank;
    }
}

export default CashbackEntity;