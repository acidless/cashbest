import CashbackCategory from "./cashback-category";

class CashbackEntity {
    public constructor(private category: CashbackCategory, private amount: number) {}

    public getCategory() {
        return this.category;
    }

    public getAmount() {
        return this.amount;
    }
}

export default CashbackEntity;