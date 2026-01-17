import {chromium} from "playwright";
import OzonProvider from "./providers/ozon-provider";
import YandexProvider from "./providers/yandex-provider";
import cashbackGrouping from "./converters/cashback-grouping";
import AlfaProvider from "./providers/alfa-provider";
import SberProvider from "./providers/sber-provider";

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await chromium.launchPersistentContext(
        './profile',
        { headless: false }
    );

    await context.addInitScript(() => {
        delete (Object.getPrototypeOf(navigator) as any).webdriver;
    });

    const providers = [new SberProvider(), new AlfaProvider(), new YandexProvider(), new OzonProvider()];

    const cashbackEntities = [];
    for(const provider of providers) {
        cashbackEntities.push(...await provider.getCashbackEntities(context));
    }

    const groupedCashback = cashbackGrouping(cashbackEntities)

    console.log(groupedCashback);

    await browser.close();
})();