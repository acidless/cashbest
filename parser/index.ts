import {chromium} from "playwright";
import OzonProvider from "./providers/ozon-provider";
import YandexProvider from "./providers/yandex-provider";
import AlfaProvider from "./providers/alfa-provider";
import SberProvider from "./providers/sber-provider";
import cashbackUpload from "./cashback-upload";

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

    await cashbackUpload(cashbackEntities);

    await browser.close();
})();