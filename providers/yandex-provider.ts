import Provider from "./provider";
import {BrowserContext} from "playwright";
import CashbackEntity from "../entities/cashback-entity";
import {YandexCashbackResponse} from "../types/yandex";
import yandexCashbackConverter from "../converters/yandex-cashback-converter";
import {expect} from "playwright/test";

class YandexProvider extends Provider {
    public getName(): string {
        return "Яндекс";
    }

    public async getCashbackEntities(browserContext: BrowserContext): Promise<CashbackEntity[]> {
        const page = await browserContext.newPage();
        await page.goto('https://bank.yandex.ru/my');

        const selector = '[class^="LoyaltyWidget-module__loyaltyBlock__"] > button';
        await page.waitForSelector(selector, {
            timeout: 0
        });

        await page.locator(selector)
            .filter({visible: true, has:page.locator('[class^="CashbackButton-module__block__"]')})
            .click({ clickCount: 5, delay: 100 });

        const response = await page.waitForResponse(response =>
            response.request().method() === 'POST' &&
            response.request().postData() !== null &&
            response.request().postData()!.includes("GlobalLoyaltyCalculator") &&
            response.ok()
        );
        const data = await response.json() as YandexCashbackResponse;

        await page.close();

        return data.data.globalSelectorCalculated.groups.flatMap(group => {
            return group.categories.map(c => yandexCashbackConverter(c));
        });
    }
}

export default YandexProvider;