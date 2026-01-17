import {AlfaCashbackCategory} from "../types/alfa";
import CashbackEntity from "../entities/cashback-entity";
import titleToCategoryConverter from "./title-to-category-converter";
import AlfaProvider from "../providers/alfa-provider";

export default function alfaCashbackConverter(cashback: AlfaCashbackCategory) {
    const amount = cashback.cashbackPercentRate;
    const title = cashback.title.split("%")[1].trim();

    return new CashbackEntity(titleToCategoryConverter(title), amount, AlfaProvider.getName());
}