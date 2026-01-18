"use client";

import {CashbackCategory} from "@/lib/types";
import {CashbackCard} from "@/entities/cashback";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

type PropsType = {
    cashbackCategory: CashbackCategory;
}

export const CashbackAccordion = ({cashbackCategory}: PropsType) => {
    const [isOpened, setOpened] = useState(false);

    return <article onClick={() => setOpened(!isOpened)}>
        <CashbackCard cashback={cashbackCategory.cashback[0]} lg/>
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