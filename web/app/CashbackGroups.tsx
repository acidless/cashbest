"use client";

import {CashbackGroup} from "@/widgets/cashback-group";
import {CashbackCategory} from "@/lib/types";
import {FavoriteContext} from "@/shared/FavoriteContext";
import {useEffect, useMemo, useState} from "react";
import {getAllFavorites} from "@/entities/cashback/model/cashback-category";

type PropsType = {
    cashbackData: CashbackCategory[];
}

const CashbackGroups = ({cashbackData}: PropsType) => {
    const [favoriteCategories, setFavoriteCategories] = useState<number[]>([]);

    useEffect(() => {
        getAllFavorites().then(favs => setFavoriteCategories(favs));
    }, []);

    const likedCashback = useMemo(() => {
        return cashbackData.filter(c => favoriteCategories.includes(c.category));
    }, [favoriteCategories]);

    const otherCashback= useMemo(() => {
        return cashbackData.filter(c => !favoriteCategories.includes(c.category));
    }, [favoriteCategories]);

    return <FavoriteContext.Provider value={[favoriteCategories, setFavoriteCategories]}>
        <CashbackGroup title="Любимые категории кэшбэка" categories={likedCashback}/>
        <CashbackGroup title="Остальные категории кэшбэка" categories={otherCashback}/>
    </FavoriteContext.Provider>
}

export default CashbackGroups;