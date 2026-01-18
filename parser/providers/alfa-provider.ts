import Provider from "./provider";
import {BrowserContext} from "playwright";
import {AlfaCashbackResponse, AlfaSuperCashbackResponse} from "../types/alfa";
import CashbackEntity from "../entities/cashback-entity";
import alfaCashbackConverter from "../converters/alfa-cashback-converter";
import alfaSuperCashbackConverter from "../converters/alfa-super-cashback-converter";

class AlfaProvider extends Provider {
    public static getName(): string {
        return "Альфа-Банк";
    }

    public async getCashbackEntities(browserContext: BrowserContext): Promise<CashbackEntity[]> {
        const page = await browserContext.newPage();
        await page.goto('https://web.alfabank.ru/marketplace');

        await page.waitForSelector('[data-test-id="cashback-program-card"]', {
            timeout: 0
        });

        const cashbackPromise = page.evaluate(async () => {
            const response = await fetch('https://web.alfabank.ru/api/v1/loyalty-promoted-cashback/summary/categorical-cashback?basketOfferId=15854');
            return response.json() as Promise<AlfaCashbackResponse>;
        }).then(cashbackData => {
            return cashbackData.categoriesSection.categories.map(c => alfaCashbackConverter(c));
        });

        const superCashback = page.evaluate(async () => {
            const response = await fetch('https://web.alfabank.ru/api/v1/loyalty-view/wheel-of-fortune/winner?basketOfferId=15970');
            return response.json() as Promise<AlfaSuperCashbackResponse>;
        }).then(superCashback => {
            return alfaSuperCashbackConverter(superCashback.winnerOffer);
        });

        const cashbackEntities = (await Promise.all([cashbackPromise, superCashback])).flat();

        await page.close();

        return cashbackEntities;
    }
}

export default AlfaProvider;