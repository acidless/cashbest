import CashbackCategory from "../entities/cashback-category";

export default function titleToCategoryConverter(title: string) {
    switch (title) {
        case "На все покупки":
            return CashbackCategory.ALL;
        case "Супермаркеты":
            return CashbackCategory.SUPERMARKETS;
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
        case "Медицинские услуги":
            return CashbackCategory.MEDICINE;
        case "Парфюмерия и косметика":
            return CashbackCategory.BEAUTY;
        case "Хобби и развлечения":
            return CashbackCategory.ENTERTAINMENT;
        case "Книги":
            return CashbackCategory.BOOKS;
        case "Одежда и обувь":
            return CashbackCategory.CLOTHES;
        default:
            return CashbackCategory.NO_CATEGORY;
    }
}