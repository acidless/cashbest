import CashbackEntity from "./entities/cashback-entity";

export default async function cashbackUpload(cashback: CashbackEntity[]) {
    const response = await fetch("http://localhost:3000/api/sync/cashback", {
        method: "POST",
        body: JSON.stringify(cashback),
    });
}