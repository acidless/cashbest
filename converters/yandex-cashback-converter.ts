import CashbackEntity from "../entities/cashback-entity";
import titleToCategoryConverter from "./title-to-category-converter";
import {YandexCashbackCategory} from "../types/yandex";
import langCodeToTitleConverter from "./lang-code-to-title-converter";

export default function yandexCashbackConverter(cashback: YandexCashbackCategory) {
    const amount = Number(cashback.sale.value);
    const title = langCodeToTitleConverter(cashback.title);

    return new CashbackEntity(titleToCategoryConverter(title), amount);
}