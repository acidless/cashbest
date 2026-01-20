export type YandexCashbackCategory = {
    title: string;
    sale: {
        value: string;
    };
    timeline?: {
        daysLeft: number;
    }
}

export type YandexCashbackResponse = {
    data: {
        globalSelectorCalculated: {
            groups: {
                categories: YandexCashbackCategory[];
            }[]
        }
    }
}