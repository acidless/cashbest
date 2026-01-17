export default function langCodeToTitleConverter(key: string) {
    const keyToTitle: {[key: string]: string} = {
        "loyalty.gs.groups.restorans.title": "Кафе и рестораны",
        "loyalty.gs.groups.all_purchases.title": "На все покупки",
        "loyalty.gs.groups.supermarket.title": "Супермаркеты",
        "loyalty.gs.groups.books.title": "Книги",
        "loyalty.gs.groups.clothing_shoes.title": "Одежда и обувь",
        "loyalty.gs.groups.taxi.title": "Яндекс Такси",
        "loyalty.gs.categories.osago_kasko.title": "Полис ОСАГО",
        "loyalty.gs.groups.rive_gauche.title": "РИВ ГОШ"
    }

    return keyToTitle[key] || key;
}