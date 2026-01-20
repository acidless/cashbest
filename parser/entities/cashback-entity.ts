import CashbackCategory from "./cashback-category";

class CashbackEntity {
    private expires: Date;

    public constructor(private category: CashbackCategory, private amount: number, private bank: string, expires?: Date) {
        if(expires) {
            this.expires = expires;
        } else {
            this.expires = new Date();
            this.expires.setMonth(this.expires.getMonth() + 1, 1);
            this.expires.setHours(0, 0, 0, 0);
        }
    }
}

export default CashbackEntity;