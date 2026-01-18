"use client";

import {CashbackCategory} from "@/lib/types";
import {CashbackCard} from "@/entities/cashback";
import {useContext, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import SwipeForFavorite from "@/shared/SwipeForFavorite";
import {addFavorite, removeFavorite} from "@/entities/cashback/model/cashback-category";
import {FavoriteContext} from "@/shared/FavoriteContext";

type PropsType = {
    cashbackCategory: CashbackCategory;
}

export const CashbackAccordion = ({cashbackCategory}: PropsType) => {
    const [isOpened, setOpened] = useState(false);
    const [favoriteCashback, setFavoriteCashback] = useContext(FavoriteContext);
    const [isLiked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(favoriteCashback.includes(cashbackCategory.category));
    }, [favoriteCashback]);

    async function onLike() {
        if(isLiked) {
            await removeFavorite(cashbackCategory.category);
            setFavoriteCashback(favoriteCashback.filter(c => c !== cashbackCategory.category));
        } else {
            await addFavorite(cashbackCategory.category);
            setFavoriteCashback([...favoriteCashback, cashbackCategory.category]);
        }
    }

    return <article>
        <div className="relative">
            <SwipeForFavorite onLike={onLike} liked={isLiked}>
                <motion.article onClick={() => setOpened(!isOpened)}
                                exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                                transition={{ duration: 0.3 }}
                                layout>
                    <CashbackCard cashback={cashbackCategory.cashback[0]} lg/>
                </motion.article>
            </SwipeForFavorite>
        </div>
        <AnimatePresence initial={false}>
            {isOpened && (
                <motion.div
                    key="accordion"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                    className="mt-1.5 ml-4"
                >
                    <div className="flex flex-col gap-1">
                        {cashbackCategory.cashback.map((c, i) => (
                            <CashbackCard
                                key={c.category.toString() + c.bank}
                                cashback={c}
                                top={i === 0}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </article>
};