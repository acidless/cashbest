import {chromium} from "playwright";
import YandexProvider from "./providers/yandex-provider";

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await chromium.launchPersistentContext(
        './profile',
        { headless: false }
    );

    const providers = [new YandexProvider()];

    const cashbackEntities = [];
    for(const provider of providers) {
        cashbackEntities.push(...await provider.getCashbackEntities(context));
    }

    console.log(cashbackEntities);

    await browser.close();
})();