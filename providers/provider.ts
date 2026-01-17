import CashbackEntity from "../entities/cashback-entity";
import {BrowserContext} from "playwright";

abstract class Provider {
    public static getName() {
        return "PROVIDER";
    }

    public async getCashbackEntities(browserContext: BrowserContext): Promise<CashbackEntity[]> {
        return [];
    }
}

export default Provider;