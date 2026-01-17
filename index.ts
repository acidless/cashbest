import {chromium} from "playwright";
import {AlfaCashbackResponse, AlfaSuperCashbackResponse} from "./types/alfa";
import CashbackEntity from "./entities/cashback-entity";
import alfaCashbackConverter from "./converters/alfa-cashback-converter";
import alfaSuperCashbackConverter from "./converters/alfa-super-cashbacck-converter";

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://web.alfabank.ru/marketplace');

    await page.waitForSelector('[data-test-id="cashback-program-card"]', {
        timeout: 0
    });

    const cashbackPromise = page.evaluate(async () => {
        const response = await fetch('https://web.alfabank.ru/api/v1/loyalty-promoted-cashback/summary/categorical-cashback?basketOfferId=15854');
        return response.json() as Promise<AlfaCashbackResponse>;
    }).then(cashbackData => {
        const cashback: CashbackEntity[] = [];
        for(const category of cashbackData.categoriesSection.categories) {
            cashback.push(alfaCashbackConverter(category));
        }

        return cashback;
    });

    const superCashback = page.evaluate(async () => {
        const response = await fetch('https://web.alfabank.ru/api/v1/loyalty-view/wheel-of-fortune/winner?basketOfferId=15970');
        return response.json() as Promise<AlfaSuperCashbackResponse>;
    }).then(superCashback => {
        return alfaSuperCashbackConverter(superCashback.winnerOffer);
    });

    const cashbackEntities = (await Promise.all([cashbackPromise, superCashback])).flat();
    console.log(cashbackEntities);

    await browser.close();
})();