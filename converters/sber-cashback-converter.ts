import CashbackEntity from "../entities/cashback-entity";
import titleToCategoryConverter from "./title-to-category-converter";
import {SberCashbackCategory} from "../types/sber";

export default function sberCashbackConverter(cashback: SberCashbackCategory) {
    const titleParts = cashback.title.split("%");
    const amount = Number(titleParts[0]);
    const title = titleParts[1].trim();

    return new CashbackEntity(titleToCategoryConverter(title), amount);
}