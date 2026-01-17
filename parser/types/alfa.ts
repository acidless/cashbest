export type AlfaCashbackCategory = {
    cashbackPercentRate: number;
    title: string;
}

export type AlfaCashbackResponse = {
    categoriesSection: {
        categories: AlfaCashbackCategory[]
    }
}

export type AlfaSuperCashback = {
    discount: string;
    partner: string;
}

export type AlfaSuperCashbackResponse = {
    winnerOffer: AlfaSuperCashback
}