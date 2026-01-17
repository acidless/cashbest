import CashbackCategory from "../entities/cashback-category";

export default function titleToCategoryConverter(title: string) {
    switch (title) {
        case "Фастфуд":
            return CashbackCategory.FASTFOOD;
        case "Кафе и рестораны":
            return CashbackCategory.CAFES_AND_RESTAURANTS;
        case "Цвeты":
            return CashbackCategory.FLOWERS;
        case "Активный отдых":
            return CashbackCategory.ACTIVE_RECREATION;
        case "Транспорт":
            return CashbackCategory.TRANSPORT;
        default:
            return CashbackCategory.NO_CATEGORY;
    }
}