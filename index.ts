import {chromium} from "playwright";
import SberProvider from "./providers/sber-provider";

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    const providers = [new SberProvider()];

    const cashbackEntities = [];
    for(const provider of providers) {
        cashbackEntities.push(...await provider.getCashbackEntities(context));
    }

    console.log(cashbackEntities);

    await browser.close();
})();