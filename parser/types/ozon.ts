export type OzonCashbackCategory = {
    title: string;
    cashbackPromotionParams: {
        percent: number;
    }
}

export type OzonCashbackResponse = {
    data: {
        me: {
            client: {
                loyaltyV2: {
                    currentMonthlyPromotionsV2: {
                        categories: OzonCashbackCategory[];
                    }
                }
            }
        }
    }
}