import { openDB, IDBPDatabase } from "idb";

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDb() {
    if (typeof window === "undefined") {
        throw new Error("IndexedDB is only available in browser");
    }

    if (!dbPromise) {
        dbPromise = openDB("cashback-db", 1, {
            upgrade(db) {
                const store = db.createObjectStore("favorites", {
                    keyPath: ["category"]
                });
            }
        });
    }

    return dbPromise;
}