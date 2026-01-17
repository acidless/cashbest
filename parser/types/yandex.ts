export type YandexCashbackCategory = {
    title: string;
    sale: {
        value: string;
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