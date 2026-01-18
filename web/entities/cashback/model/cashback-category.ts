import {db} from "@/lib/idb";
import {Cashback} from "@/lib/types";

export const cashbackCategory: {[key: number]: {title: string, icon: string}} = {
    0: {title: "Неизвестно", icon: "❓"},
    1: {title: "На все покупки", icon: "💵"},
    2: {title: "Супермаркеты", icon: "🧺"},
    3: {title: "Фастфуд", icon: "🍔"},
    4: {title: "Кафе и рестораны", icon: "🍽️"},
    5: {title: "Цветы", icon: "💐"},
    6: {title: "Активный отдых", icon: "⚽"},
    7: {title: "Транспорт", icon: "🚌"},
    8: {title: "Аптеки", icon: "💊"},
    9: {title: "Парфюмерия и косметика", icon: "💄"},
    10: {title: "Хобби и развлечения", icon: "🍿"},
    11: {title: "Книги", icon: "📕"},
    12: {title: "Одежда и обувь", icon: "👔"},
    13: {title: "Такси", icon: "🚕"},
    14: {title: "Искусство", icon: "🖌️"},
}

export async function addFavorite(category: number) {
    await db.put("favorites", {category});
}

export async function removeFavorite(category: number) {
    await db.delete("favorites", [category]);
}

export async function getAllFavorites(): Promise<number[]> {
    return (await db.getAll("favorites")).map(c => c.category);
}
