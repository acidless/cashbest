import Provider from "./provider";
import {BrowserContext} from "playwright";
import CashbackEntity from "../entities/cashback-entity";
import {OzonCashbackResponse} from "../types/ozon";
import ozonCashbackConverter from "../converters/ozon-cashback-converter";

class OzonProvider extends Provider {
    public static getName(): string {
        return "Озон";
    }

    public async getCashbackEntities(browserContext: BrowserContext): Promise<CashbackEntity[]> {
        const page = await browserContext.newPage();
        await page.goto('https://finance.ozon.ru/lk');

        await page.waitForSelector('.operations', {
            timeout: 0
        });

        const cashbackEntities = await page.evaluate(async () => {
            const response = await fetch('https://finance.ozon.ru/apps/loyalty/api/loyalty/bonusState/cashbackProgram', {
                method: "POST",
                body: JSON.stringify({})
            });

            return response.json() as Promise<OzonCashbackResponse>;
        }).then(cashbackData => {
            return cashbackData.data.me.client.loyaltyV2.currentMonthlyPromotionsV2.categories.map(c => ozonCashbackConverter(c));
        });

        await page.close();

        return cashbackEntities;
    }
}

export default OzonProvider;