import CashbackEntity from "../entities/cashback-entity";

function cashbackGrouping(cashback: CashbackEntity[]): {category: string, cashback: any}[] {
    const groups = {};

    for (const c of cashback) {
        if (!groups[c.getCategory()]) {
            groups[c.getCategory()] = [];
        }

        groups[c.getCategory()].push({category: c.getCategory(), amount: c.getAmount(), bank: c.getBank()});
    }


    return Object.keys(groups).map(key => {
        return {
            category: key,
            cashback: groups[key].sort((a, b) => b.amount - a.amount)
        }
    });
}

export default cashbackGrouping;