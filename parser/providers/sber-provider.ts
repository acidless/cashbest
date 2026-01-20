import Provider from "./provider";
import {BrowserContext} from "playwright";
import CashbackEntity from "../entities/cashback-entity";
import {SberCashbackResponse} from "../types/sber";
import sberCashbackConverter from "../converters/sber-cashback-converter";

class SberProvider extends Provider {
    public static getName(): string {
        return "Сбер";
    }

    public async getCashbackEntities(browserContext: BrowserContext): Promise<CashbackEntity[]> {
        const page = await browserContext.newPage();
        await page.goto('https://web7.online.sberbank.ru/main');

        await page.waitForSelector('[href="/app/loyalty/main"], [href="/loyalty/main"]', {
            timeout: 0
        });

        const cashbackEntities = await page.evaluate(async () => {
            const response= await fetch('https://web-node7.online.sberbank.ru/loyalty_three/v1/mob_bank/workflow-gate?cmd=START&name=myPrivileges', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({})
            });
            return response.json() as Promise<SberCashbackResponse>;
        }).then(cashbackData => {
            return cashbackData.body.output.myPrivilegesResponse.currentPrivilege.privilegesList
                .map(c => sberCashbackConverter(c));
        });

        await page.close();

        return cashbackEntities;
    }
}

export default SberProvider;