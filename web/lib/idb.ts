import { openDB } from "idb";

export const db = await openDB("cashback-db", 1, {
    upgrade(db) {
        db.createObjectStore("favorites", {
            keyPath: ["category"]
        });
    }
});