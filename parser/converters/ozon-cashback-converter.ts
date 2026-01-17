import CashbackEntity from "../entities/cashback-entity";
import titleToCategoryConverter from "./title-to-category-converter";
import {OzonCashbackCategory} from "../types/ozon";
import OzonProvider from "../providers/ozon-provider";

export default function ozonCashbackConverter(cashback: OzonCashbackCategory) {
    const amount = cashback.cashbackPromotionParams.percent;
    const title = cashback.title;

    return new CashbackEntity(titleToCategoryConverter(title), amount, OzonProvider.getName());
}