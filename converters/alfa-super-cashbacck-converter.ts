import {AlfaSuperCashback} from "../types/alfa";
import CashbackEntity from "../entities/cashback-entity";
import titleToCategoryConverter from "./title-to-category-converter";

export default function alfaSuperCashbackConverter(cashback: AlfaSuperCashback) {
    const amount = parseInt(cashback.discount);
    const title = cashback.partner;

    return new CashbackEntity(titleToCategoryConverter(title), amount);
}